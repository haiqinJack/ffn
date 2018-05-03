<template>
  <div v-if="goods.length >=1 ">
    <myedit 
      :edit="edit"
      @edit="onEdit"
    />
    <div v-if="edit" >
      <van-checkbox-group v-model="result" @change="onSelect">
      <editcard v-for="(item, index) in goods"
        :key="index"
        :id="item.id"
        :desc="item.desc"
        :num="item.num"
        :price="formatPrice(item.price)"
        :picture="item.picture"
        @delete="onDelete"
        @increase="onIncrease"
        @decrease="onDecrease"
      />
      </van-checkbox-group>    
    </div>
    <div v-else >
      <van-checkbox-group v-model="checkedGoods">
        <van-checkbox
          class="card-goods__item"
          v-for="item in goods"
          :key="item.id"
          :name="item.id"
        >
          <van-card
            :title="item.title"
            :desc="item.desc"
            :num="item.num"
            :price="formatPrice(item.price)"
            :thumb="item.picture"
          />
        </van-checkbox>
      </van-checkbox-group>
    </div>

    <div v-if="!edit">
      <van-submit-bar
        :price="totalPrice"
        :disabled="!checkedGoods.length"
        :button-text="submitBarText"
        @submit="onSubmit"
      >
        <van-checkbox v-model="checked" @change="checkedAll"  class="card-goods__item checkebox">
          <van-cell title="全选"></van-cell>
        </van-checkbox>
        <template slot="tip">
          不含快递费用
        </template>
      </van-submit-bar>        
    </div>
    <div v-else>
      <van-submit-bar
        :price="totalPrice"
        :disabled="!result.length"
        :button-text="submitBarText"
        @submit="onSubmit"
      >
        <van-checkbox v-model="checked" @change="checkedAll"  class="card-goods__item checkebox">
          <van-cell title="全选"></van-cell>
        </van-checkbox>
      </van-submit-bar>
    </div>

  </div>
  <div v-else class="Zero">
    <h3>购物车空空如也～</h3>
    <van-button tag="a" @click="gotoShoping">
      去逛逛
    </van-button>
  </div>
</template>

<script>
import { Checkbox, CheckboxGroup, Card, SubmitBar, Toast, Button, Dialog } from 'vant';
import { mapState } from 'vuex'
import myedit  from '~/components/edit.vue'
import editcard from '~/components/edit-card.vue'

export default {
  data() {
    return {
      edit: false,
      checked: false,
      checkedGoods: [],
      result: []
    };
  },
  components: {
    myedit,
    editcard
  },
  computed: {
    submitBarText() {
      const count = this.checkedGoods.length;
      return this.edit ? '删除' : '结算' + (count ? `(${count})` : '');
    },
    totalPrice() {
      if(!this.edit) {
        return this.goods.reduce((total, item) => total + (this.checkedGoods.indexOf(item.id) !== -1 ? (item.price * item.num) : 0), 0);        
      }else{
        return this.goods.reduce((total, item) => total + (this.result.indexOf(item.id) !== -1 ? (item.price * item.num) : 0), 0);        
      }
    },
    ...mapState({
      'goods': 'cartList'
    })
  },
  methods: {
    onSelect(val) {

    },
    onEdit() {
      this.checked = false,
      this.checkedGoods = [],
      this.result = []
      this.edit = !this.edit
    },
    gotoShoping() {
      this.$router.push({ path: '/shoping' })
    },
    formatPrice(price) {
      return (price / 100).toFixed(2);
    },
    onSubmit() {
      if(!this.edit) {
        let payment = []
        this.goods.forEach((value, index) => {
          this.checkedGoods.forEach((v) => {
            if(value.id === v){
              payment.push(value)
            }
          })
        })
        this.$store.commit('SET_PAYMENT', payment)
        this.$router.push({ path: '/deal' })
      }else {
        Dialog.confirm({
          title: '确定删除所选的'+ this.result.length + '个商品吗？'
        }).then(() => {
          this.$store.commit('DEL_CARTLIST', this.result)
        }).catch(() => {
          
        });
      }
    },
    checkedAll(value) {
      if(!this.edit){
        value? this.checkedGoods = this.onAll() : this.checkedGoods = []
      }else{
        value? this.result = this.onAll() : this.result = []  
      }
    },
    onAll() {
      let arr = []
      this.goods.forEach(function(value, index) {
        arr.push(value.id)
      })
      return arr
    },
    onDelete(val) {
        Dialog.confirm({
          title: '确定删除该商品吗？'
        }).then(() => {
          this.$store.commit('DEL_CARTLIST', [val])
        }).catch(() => {
          
        });      
    },
    onIncrease(index) {
      let num = this.goods[index].num
      if(num < 10){
        this.goods[index].num++
      }else{
        Toast('就这么几件啦～')
      }
    },
    onDecrease(index) {
      let num = this.goods[index].num
      if(num > 1) {
        this.goods[index].num--
      }
    }
  },
  beforeCreate () {
    this.$store.dispatch('fetchCartList')
  },
};
</script>

<style lang="less">
.card-goods {
  padding: 10px 0;
  margin-bottom: 100px;
  background-color: #fff;
  &__item {
    position: relative;
    background-color: #fafafa;
    .van-checkbox__label {
      width: 100%;
      padding: 0 10px 0 15px;
      box-sizing: border-box;
    }
    .van-checkbox__icon {
      top: 50%;
      left: 10px;
      z-index: 1;
      position: absolute;
      margin-top: -10px;
    }
    .van-card__price {
      color: #f44;
    }
  }
}
.Zero {
  text-align: center;
  padding-top: 50px;
  button {
    margin-top: 30px;
  }
}
.checkebox{
  background-color: #fff;
}
.CardTitle{
  width: 70%;
  max-height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.btn {
  height: 100%
}
</style>
