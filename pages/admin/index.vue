<template>
<van-row>
	<van-col span="4" offset="1">
		<admin-nav />
	</van-col>
	<van-col span="16">
    <h3>商品详细信息</h3>
    <van-row>
      <van-col span="22" offset="1">
        <el-form :model="form" ref="form" label-width="100px" size="medium">
          <el-form-item label="商品标题">
            <el-input v-model="form.title" />
          </el-form-item>
          <el-form-item label="商品描述">
            <el-input v-model="form.info" type="textarea" rows="6"/>
          </el-form-item>
          <el-form-item label="运费价格">
            <el-input v-model="form.expressPrice" :value="form.expressPrice">
              <template slot="prepend">￥</template>
            </el-input>
          </el-form-item>          
          <el-form-item label="商品轮播图">
            <el-upload
              action="http://upload-z2.qiniu.com/"
              list-type="picture-card"
              :on-preview="handlePreview"
              :before-upload="beforeAvatarUpload"
              :on-remove="handleSwipeImgRemove"
              :on-success="handelSwipeImgSuccess"
              :data="qiniuToken">
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="商品详细图">
            <el-upload 
              action="http://upload-z2.qiniu.com/"
              list-type="picture-card"
              :on-preview="handlePreview"
              :before-upload="beforeAvatarUpload"
              :on-success="handelImageListSuccess"
              :on-remove="handleImageListRemove"
              :data="qiniuToken">
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="商品缩略图">
            <el-upload
              action="http://upload-z2.qiniu.com/"
              list-type="picture-card"
              :show-file-list="false"
              :on-preview="handlePreview"
              :before-upload="beforeAvatarUpload"
              :on-success="handelPictureSuccess"
              :on-remove="handlePictureRemove"
              :data="qiniuToken"
            >
              <img 
                v-if="picture" 
                :src="picture" 
                class="picture"
              >
              <i v-else class="el-icon-plus uploader-picture-icon"></i>
            </el-upload>
          </el-form-item>                    
        </el-form>
      </van-col>
    </van-row>
    <h3>商品规格与库存</h3>
    <van-row>
      <van-col span="22" offset="1">
        <div class="skuCheckedBox">
          <el-button v-for="(item ,index) in buttonBox" 
            :key="item + index" 
            @click="onSKU(index)">
            <i :class="{'active':ind === index}"/> 
            {{ item }}
          </el-button>
        </div>

        <div v-if="sku_length === 1">
          <el-select v-model="value" placeholder="请选择" filterable>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
           <el-checkbox 
             v-model="checked" 
             label="添加规格图片" 
             border 
             size="mini"
           />
          <br>

          <el-tag 
            class="tag"
            v-for="tag in tags"
            :key="tag.name"
            closable
            color="#fff"
            :disable-transitions="false"
            @close="delTag(tag)"
          >
            {{tag.name}}
          </el-tag>

          <el-popover
            placement="top"
            width="160"
            v-model="visible2">
            <div style="text-align: right; margin: 0">
              <el-input v-model="input" placeholder="请输入内容"></el-input>
              <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
              <el-button type="primary" size="mini" @click="addTag(0)">确定</el-button>
            </div>
            <el-button size="mini" type="text" slot="reference">+添加</el-button>
          </el-popover> 
          <br>

          <el-upload
            v-if="checked"
            v-for="(item, index) in tags"
            :key="index"
            class="avatar-uploader"
            action="http://upload-z2.qiniu.com/"
            :show-file-list="false"
            :on-success="(res, file, fileList) => handleSKUSuccess(index, res, file, fileList)"
            :before-upload="beforeAvatarUpload"
            :data="qiniuToken"
          >
            <img 
              v-if="item.imgUrl" 
              :key="('SKU' + item.imgUrl)"
              :src="item.imgUrl" 
              class="avatar"
            >
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

          <el-table
            class="mytop"
            key='aTable'
            :data="getSkusList"
            style="width: 100%">
            <el-table-column
              prop="s1Name"
              :label="value"
              width="180">
            </el-table-column>
            <el-table-column label="单价">
              <template slot-scope="scope">
                <el-input 
                  :value="price"
                  size="small" 
                  type="number"
                  @change="tableInputByPrice(scope.row,$event,scope.column, scope.$index)"
                >
                <template slot="prepend">￥</template>
                </el-input>
              </template>
            </el-table-column>
            <el-table-column label="库存">
              <template slot-scope="scope">
                <el-input
                  :value="stock" 
                  size="small" 
                  type="number" 
                  @change="tableInputByStock(scope.row,$event,scope.column, scope.$index)"
                >
                </el-input>
              </template>
            </el-table-column>            
          </el-table>
        </div> 

        <div v-else-if="sku_length === 2">
          <el-select v-model="value" placeholder="请选择" filterable>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
           <el-checkbox 
             v-model="checked" 
             label="添加规格图片" 
             border 
             size="mini"
           />
          <br>

          <el-tag 
            class="tag"
            v-for="tag in tags"
            :key="('tag' + tag.name + 2)"
            closable
            color="#fff"
            :disable-transitions="false"
            @close="delTag(tag)"
          >
            {{tag.name}}
          </el-tag>

          <el-popover
            placement="top"
            width="160"
            v-model="visible">
            <div style="text-align: right; margin: 0">
              <el-input v-model="input" placeholder="请输入内容"></el-input>
              <el-button size="mini" type="text" @click="visible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="addTag(0)">确定</el-button>
            </div>
            <el-button size="mini" type="text" slot="reference">+添加</el-button>
          </el-popover> 
          <br>

          <van-row>
            <van-col span="24">
            <el-upload
              v-if="checked"
              v-for="(item, index) in tags"
              :key="('bUpload' + index)"
              class="avatar-uploader"
              action="http://upload-z2.qiniu.com/"
              :show-file-list="false"
              :on-success="(res, file, fileList) => handleSKUSuccess(index, res, file, fileList)"
              :before-upload="beforeAvatarUpload"
              :data="qiniuToken"
            >
              <img 
                v-if="item.imgUrl" 
                :src="item.imgUrl" 
                class="avatar"
              >
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            </van-col>
          </van-row>


          <div style="margin-top: 20px;"></div>
          <el-select v-model="value2" placeholder="请选择" filterable>
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <br>

          <el-tag 
            class="tag"
            v-for="tag in tags2"
            :key="('tag2' + tag.name+ 2)"
            closable
            color="#fff"
            :disable-transitions="false"
            @close="delTag(tag, 1)"
          >
            {{tag.name}}
          </el-tag>

          <el-popover
            placement="top"
            width="160"
            v-model="visible2">
            <div style="text-align: right; margin: 0">
              <el-input v-model="input2" placeholder="请输入内容"></el-input>
              <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
              <el-button type="primary" size="mini" @click="addTag(2)">确定</el-button>
            </div>
            <el-button size="mini" type="text" slot="reference">+添加</el-button>
          </el-popover> 
          <br>


          <el-table
            class="mytop"
            key='aTable'
            :data="getSkusList"
            style="width: 100%">
            <el-table-column
              prop="s1Name"
              :label="value"
              width="180">
            </el-table-column>
            <el-table-column
              prop="s2Name"
              :label="value2"
              width="180">
            </el-table-column>            
            <el-table-column label="单价">
              <template slot-scope="scope">
                <el-input 
                  :value="price"
                  size="small" 
                  type="number"
                  @change="tableInputByPrice(scope.row,$event,scope.column, scope.$index)"
                >
                <template slot="prepend">￥</template>
                </el-input>
              </template>
            </el-table-column>
            <el-table-column label="库存">
              <template slot-scope="scope">
                <el-input
                  :value="stock" 
                  size="small" 
                  type="number" 
                  @change="tableInputByStock(scope.row,$event,scope.column, scope.$index)"
                >
                </el-input>
              </template>
            </el-table-column>            
          </el-table>

        </div>

<el-form :inline="true" :model="formInline" class="demo-form-inline mytop">
  <el-form-item label="统一价格">
    <el-input v-model="formInline.price"></el-input>
  </el-form-item>
  <el-form-item label="统一库存">
    <el-input v-model="formInline.stock"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="danger" @click="onSubmit">确定</el-button>
  </el-form-item>
</el-form>

      </van-col>
    </van-row>
	  
    <br>
    <div class="foot">
      <el-button type="danger" round @click="onSave">
        提交<i class="el-icon-success el-icon--right"></i>
      </el-button>
    </div>
    <el-dialog :visible.sync="dialogVisibleImg">
      <img width="100%" :src="chooseCurrentImg" alt="">
    </el-dialog>

	</van-col>
</van-row>
</template>
<script>
import { mapState } from 'vuex'
import { Row, Col, Popup } from 'vant'
import AdminNav from '~/components/admin/admin-nav.vue'
import Selectmock from '~/static/Selectmock.js'

export default {
  data() {
    return {
      ind: 0,
      buttonBox: ['无规格','单一规格', '两种规格'],
      value: '规格',
      value2: '套餐',
      input: '',
      input2: '',
      tags: [],
      tags2: [],
      options: Selectmock,
      options2: Selectmock,
      visible: false,
      visible2: false,
      sku_length:0,
      dialogImageUrl: '',
      dialogVisible: false,
      checked: false,
      fileList2: [],
      skus: {
        tree: [],
        list: [],
      },
      price: 0,
      stock: 0,
      qiniuToken: {
        token: ''
      },
      form: {
        title: '',
        info: '',
        expressPrice: 0
      },
      thumb: [],//商品轮播图
      imageList: [],//商品详细图
      picture: '',//商品缩略图
      chooseCurrentImg: '',
      dialogVisibleImg: false,
      formInline: {
        price: 0,
        stock: 0
      }      
    }
  },
  methods: {
    async onSave() {     
      if(!this.form.title) {
        this.$message.error('请填写标题');
        return
      }
      if(!this.thumb.length) {
        this.$message.error('请上传一张商品轮播图')
        return
      }
      if(!this.imageList) {
        this.$message.error('请上传一张商品详细图')
      }
      if(!this.picture) {
        this.$message.error('请上传一张商品缩略图')
        return
      }
      if(!this.skus.list[0].price) {
        this.$message.error('请填写单价')
        return
      }
      if(!this.skus.list[0].stock_num) {
        this.$message.error('请填写库存')
        return
      }
      let goods = {
        title: this.form.title,
        info: this.form.info,
        expressPrice: this.form.expressPrice,
        thumb: this.thumb,
        imageList: this.imageList,
        picture: this.picture,
        stock_num: (this.formInline.stock || this.stock || this.skus.list[0].stock_num),
        price: (this.formInline.price || this.price || this.skus.list[0].price),
        sku: this.skus
      }
      const res = await this.$store.dispatch('saveGoods', goods)
    },
    onSubmit() {
      let formInline = this.formInline
      this.price = formInline.price
      this.skus.list.forEach((item) => {
        item.price = formInline.price
      })
      this.stock = formInline.stock
      this.skus.list.forEach((item) => {
        item.stock_num = formInline.stock
      })
    },
    onSKU(value) {
      this.$confirm('改变规格之前数据无效')
        .then(_ => {
          this.skus = {
            tree: [],
            list: [],
          } 
          this.tags = []
          this.tags2 = []
          this.sku_length =  value
          this.ind = value;
          done();
        })
        .catch(_ => {});      
    },
    addTag(value) {
      let input
      if(!value){
        input = this.input
        this.tags.push({name: input, imgUrl: ''})
        this.handelSkuList()
      }else{
        input = this.input2
        this.tags2.push({name: input})
        this.handelSkuList()       
      }
      this.input = ''
      this.input2 = ''
      this.visible2 = false        
      this.visible = false
    },
    delTag(tag, value) {
      if(!value){
        this.tags.splice(this.tags.indexOf(tag), 1)
      }else{
        this.tags2.splice(this.tags2.indexOf(tag), 1)
      }
      this.handelSkuList()
    },       
    handleSwipeImgRemove(file, fileList) {
      let imgs = []

      fileList.forEach((item, index) => {
        imgs[index] = this.imageCDN + item.response.key
      })
      this.thumb = imgs
    },
    handleImageListRemove(file, fileList) {
      let imgs = []

      fileList.forEach((item, index) => {
        imgs[index] = this.imageCDN + item.response.key
      })
      this.thumb = imgs
    },
    handlePictureRemove(file, fileList) {
      console.log(fileList, file)
    },         
    handelSwipeImgSuccess(res, file, fileList) {
      let imgs = []

      fileList.forEach((item, index) => {
        imgs[index] = this.imageCDN + item.response.key
      })
      this.thumb = imgs
    },  
    handelImageListSuccess(res, file, fileList) {
      this.imageList.push(this.imageCDN + res.key)
    },     
    handelPictureSuccess(res, file, fileList) {
      this.picture = this.imageCDN + res.key
    },
    handlePreview(file) {
      this.chooseCurrentImg = file.url;
      this.dialogVisibleImg = true;
    },
    handleSKUSuccess(index, res, file, fileList) {   
      const url = this.imageCDN + res.key
      this.skus.tree[0].v[index].imgUrl = url
      this.tags[index].imgUrl = url
    },
    async beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      const res =  await this.$store.dispatch('fetchQiniuToken')
      this.qiniuToken.token = res.token
      return isJPG && isLt2M;
    },   
    handelSkuList() {          
      this.formatTree(this.value, this.tags, 's1')
      this.formatTree(this.value2, this.tags2, 's2')     
      this.formatList(this.skus.tree) 
    },
    formatTree(value, tags, ks) {
      let v = []
      if(ks === 's1'){
        tags.forEach((value, index) => {
          v.push({id: index, name: value.name, imgUrl: tags[index].imgUrl})
        })

        this.skus.tree[0] = {
          k: value,
          v: v,
          k_s: ks
        }
      }else if(ks === 's2' && tags.length > 0){
        tags.forEach((value, index) => {
          v.push({id: index, name: value.name})
        })  

        this.skus.tree[1] = {
          k: value,
          v: v,
          k_s: ks
        }      
      }
    },
    formatList(tree) {
      let s1Len = tree[0] ? tree[0].v.length : 0
      let s2Len = tree[1] ? tree[1].v.length : 0
      let list = []
      for(let i = 0; i < s1Len; i++ ) {
        if(s2Len > 0) {
          for(let j = 0; j < s2Len; j++ ) {
            list.push({
              s1:tree[0].v[i].id,
              s1Name:tree[0].v[i].name,
              s2:tree[1].v[j].id,
              s2Name:tree[1].v[j].name
            })
          }
        }else{
          list.push({
            s1:tree[0].v[i].id,
            s1Name:tree[0].v[i].name
          })       
        }
      }
      this.skus.list = list
    },
    tableInputByPrice(row, event, column, index) {
      this.skus.list[index].price = event
    },
    tableInputByStock(row, event, column, index) {
      this.skus.list[index].stock_num = event
    }
  },
  computed: {
    ...mapState([
      'imageCDN'
    ]),
    getSkusList() {
      return this.skus.list
    }
  },
  components: {
  	AdminNav
  }
}
</script>
<style>
.tag{
  min-width: 78px;
  margin-right: 20px; 
}
.el-checkbox.is-bordered {
  border: 0 ;
}
.skuCheckedBox {
  margin-bottom: 20px;
}
.skuCheckedBox button {
  position: relative;
  width: 100px;
}
.active {
  position: absolute;
  background-image: url('~/static/icon/active.png'); 
  background-size:20px 20px;
  background-repeat: no-repeat;
  left: 78px;
  bottom: 0;
  width:100%;
  height:20px;
}
.avatar {
  width: 78px;
  height: 78px;
  margin-right: 20px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    float: left;
    width: 78px;
    margin-right: 20px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 8px;
  color: #8c939d;
  width: 78px;
  height: 78px;
  line-height: 78px;
  text-align: center;
}
h3 {
  border-left: 2px solid red;
  background-color: #fff;
  padding: 15px;
  margin: 0px 0 20px;
  font-weight: 400;
  color: #1f2f3d;
  font-size: 22px;
}
.upload-picture {
  width: 148px;
  height: 300px;
  line-height: 300px;
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
}
.mytop {
  margin-top: 20px;
}

.picture {
  width: 148px;
  height: 148px;
}
.foot { 
  margin-bottom: 200px;
}
</style>
