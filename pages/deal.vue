<template>
	<div>
		<myaddress 
			:type="cardType1"
			:name="currentContact1.name"
			:tel="currentContact1.tel"
			:province="currentContact1.province"
			:city="currentContact1.city"
			:county="currentContact1.county"
			:address="currentContact1.address"
			@click="openaddress"
		/>

		<van-cell-group class="shop">
		  <van-cell title="法弗纳商城" icon="shop" />
		</van-cell-group>

    <van-card v-for="(item, index) in cartList" :key="index"
      :title="item.title"
      :desc="item.desc"
      :num="item.num"
      :price="formatPrice(item.price)"
      :thumb="item.picture"
    />
    
		<van-cell-group>
		  <van-cell title="配送方式" is-link @click="showExpressList = true">
		  	<template slot>
		  		<label v-if="currentExpress.price !== 0">¥:{{ formatPrice(currentExpress.price) }}</label>
          <label v-else>免运费</label><br>          
		  		<label>{{ currentExpress.name }}</label>
		  	</template>
		  </van-cell>
		</van-cell-group>

    <van-popup v-model="showExpressList" position="bottom">
      <myexpress
       :lists="expressList"
       @select="OnExpress" 
      />
    </van-popup>

		<van-cell-group>
		  <van-field
		  	v-model="message"
		    label="留言"
		    type="textarea"
		    placeholder="点击给商家留言"
		    rows="1"
		    autosize
		  />
		</van-cell-group>	

		<van-cell-group>
		  <van-cell title="合计">
		  	<template slot>
		  		<span class="red">¥:{{ formatPrice(total) }}</span>
		  	</template>
		  </van-cell>
		</van-cell-group>

		<template>
			<van-submit-bar v-if="loading"
				loading
			  :price="total"
			  button-text="提交订单"
			  @submit="payHandle"
			/>
			<van-submit-bar v-else
			  :price="total"
			  button-text="提交订单"
			  @submit="payHandle"
			/>
			
		</template>

		<!-- 联系人列表 -->
		<van-popup v-model="showList" position="bottom">
			<van-address-list
			  v-model="chosenAddressId"
			  :list="list"
			  @add="onAdd"
			  @edit="onEdit"
			  @select="onSelect"
			/>
		</van-popup>

		<!-- 联系人编辑 -->
		<van-popup v-model="showEdit" position="bottom">
			<van-address-edit
			  :area-list="areaList"
			  show-delete
			  show-set-default
			  :address-info="addressInfo"
			  @save="onSave"
			  @delete="onDelete"
			/>
		</van-popup>	
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { 
  Toast, 
  Area,
  Popup, 
  AddressEdit, 
  AddressList, 
  SubmitBar, 
  Cell, 
  CellGroup, 
  Card,
  Field 
} from 'vant'
import myaddress from '~/components/address.vue'
import myexpress from '~/components/express.vue'
import areaList from '../static/ared.js'
import wechat from '~/static/mixins/wechat.js'

export default {
  middleware: 'wechat-auth',
  head() {
    return {
      title: '待付款的订单'
    }
  },
  data() {
    return {
    	message: '',
    	areaList: areaList,
      chosenAddressId: null, 
      addressInfo:{},
    	showExpressList: false,
    	loading: false,
      showList: false,
      showEdit: false,
      cardType1: 'add',
      currentContact1: {},
      isEdit: false,
      expressList:[
      	{
      		id: 1,
      		name: '普通快递',
      		price: 0,
      		desc: '由商家选择合作快递为您服务'
      	}
      ]
    };
  },

  computed: {
    ...mapState({
      'cartList': 'payment',
      'list': 'address'
    }),
    cardType() {
      return this.chosenAddressId !== null ? 'edit' : 'add';
    },
    currentContact() {
      let id = this.chosenAddressId;
      return id !== null ? this.list.filter(item => item.id === id)[0] : {}
    },
    currentExpress() {
      return this.expressList.filter(item => item.id === 1)[0]
    },
    total() {
      let price = this.expressList[0].price
      
      price += getPrice(this.cartList)

      return price
    }
  },

  methods: {
    async openaddress() {
      let obj = {}
      window.wx.openAddress({
        success: (res) => this.a(res)
        // success: function (res) {
        //   obj.name = res.userName// 收货人姓名
        //   obj.tel = res.telNumber // 收货人手机号码
        //   obj.postal_code = res.postalCode // 邮编
        //   obj.province = res.provinceName // 国标收货地址第一级地址（省）
        //   obj.city = res.cityName // 国标收货地址第二级地址（市）
        //   obj.county = res.countryName // 国标收货地址第三级地址（国家）
        //   obj.address = res.detailInfo // 详细收货地址信息
        // }
      })
      //this.cardType1 = 'edit'
      //this.currentContact1 = obj
    },
    a(res) {
      alert('??????')
    }
    async payHandle() {
      const total = this.total
      const message = this.message
      const contact = this.currentContact
      const products = this.cartList

      if(JSON.stringify(contact) === "{}"){
        Toast('请选择订单联系人')
        return 
      }
      const res = await this.$store.dispatch('createOrder', {total, message, contact, products})
      const data = res.data.data

      window.wx.chooseWXPay({
        timestamp: data.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
        package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
        signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: data.paySign, // 支付签名
        success: (res) => {
        // 支付成功后的回调函数
          try {
            window.WeixinJSBridge.log(res.err_msg)
          } catch(e) {
            console.error(e)
          }
        }        
      })
      // this.loading = true

      // WeixinJSBridge.invoke('getBrandWCPayRequest', res.data.data, function(res){
      //   if(res.err_msg == "get_brand_wcpay_request:ok"){
      //     alert("支付成功");
      //     // 这里可以跳转到订单完成页面向用户展示
      //   }else{
      //     alert("支付失败，请重试");
      //   }
      // });

    },    
    // 添加联系人
    onAdd() {
      this.editingContact = { id: this.list.length };
      this.isEdit = false;
      this.showEdit = true;
    },

    // 编辑联系人
    onEdit(item) {
      this.isEdit = true;      
      this.showEdit = true;
      this.addressInfo = item
    },

    // 选中联系人
    onSelect(item) {
      this.showList = false;
      this.chosenAddressId = item.id;
    },

    // 保存联系人
    onSave(info) {
      this.showEdit = false;
      this.showList = false;
      
      if (this.isEdit) {
        this.list = this.list.map(item => item.id === info.id ? info : item);
      } else {
        this.list.push(formatAddress(info));
      }
      this.chosenAddressId = info.id;
      const data = this.$store.dispatch('saveUserAddress', info)
      console.log(data)
    },

    // 删除联系人
    onDelete(info) {
      this.showEdit = false;
      this.list = this.list.filter(item => item.id !== info.id);
      if (this.chosenAddressId === info.id) {
        this.chosenAddressId = null;
      }
    },
    OnExpress(item, index) {
    	this.showExpressList = false
    },
    formatPrice(price) {
      return (price / 100).toFixed(2)
    }
  },
  mixins: [wechat],
  components: {
    [Field.name]: Field,
    [Toast.name]: Toast, 
    [Popup.name]: Popup, 
    [AddressEdit.name]: AddressEdit, 
    [AddressList.name]: AddressList, 
    [SubmitBar.name]: SubmitBar,
    [Cell.name]: Cell, 
    [Area.name]: Area,
    [CellGroup.name]: CellGroup, 
    [Card.name]: Card,
  	[myaddress.name]: myaddress,
  	[myexpress.name]: myexpress
  },
  beforeCreate() {
    this.$store.dispatch('fetchUserAddress')
  },
  async beforeMount() {
    this.expressList[0].price = getPrice(this.cartList, 'express')

    const url = window.location.href
    await this.wechatInit(url)

  }
}	
function  getopenaddress() {
      new Promise((resolve, reject) => {

        
      })
    }
function chosenAddressIsDefault(list) {
	let id = null
	list.forEach(item => item.is_default === true ? id = item.id : null) 
	return id
}

function formatAddress(info) {
	info.address = info.province + info.city + info.county + info.address_detail
	return info
}

function getPrice(list, express) {
  let price = 0
  if(express === 'express'){
    for(let i = 0; i < list.length; i++) {
      price += parseInt((list[i].expressPrice * list[i].num))
    }
  }else{
    for(let i = 0; i < list.length; i++) {
  		price += parseInt((list[i].price * list[i].num))
  	}
  }
	return price
}

</script>
<style>
.shop {
	margin-top: 10px;
}	
.red{
	color: red;
}
</style>
