<template>
  <div> 
    <div class="card">
      <van-checkbox v-model="checked" class="card_checkd" :name="name"/>
      <div class="card_picture">
        <img :src="picture" >
      </div>
      <div class="card_content">
        <div class="card_row">
          <van-stepper 
            :default-value="num" 
            @plus="onIncrease"
            @minus="onDecrease"
          />
        </div>
        <div class="card_row">
          <div v-if="desc" class="desc">{{ desc }}</div>
        </div> 
        <div class="card_row">
          <div v-if="isDef(price)" class="card_price">{{ currency }} {{ price }}</div>
        </div> 
      </div>
      <div class="card_footer">
        <van-button type="danger" @click="onDelete">删除</van-button>
      </div>
    </div>

  </div>
</template>
<script>
import { Button, Stepper } from 'vant';

export default {
  components: {
    Button,
    Stepper
  },
  data() {
    return {
      checked: false,
      checkedGoods: [],

    }
  },
  props: {
    id: [Number, String],
    name: [String],
    picture: String,
    desc: String,
    num: [Number, String],
    price: [Number, String],
    currency: {
      type: String,
      default: '¥'
    }
  },
  methods: {
    isDef(val) {
      return val ? true : false
    },
    onDelete() {
      this.$emit('delete',this.id)
    },
    onIncrease() {
      this.$emit('increase', this.$vnode.key, this.id)
    },
    onDecrease() {
      this.$emit('decrease', this.$vnode.key, this.id)
    }
  }
}
</script>
<style scoped>
.card {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  color: #333;
  height: 100px;
  font-size: 16px;
  background: #fafafa;
  position: relative;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 5px 15px 5px 115px;
}
.card_checkd {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  top: 5px;
  left: 10px;
  height: 90px;
  position: absolute;  
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;  
}
.card_picture {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 90px;
  height: 90px;
  position: absolute; 
  top: 5px;
  left: 40px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;  
}
.card_picture img {
  border: none;
  max-width: 100%;
  max-height: 100%;
}
.card_content {
  width: 75%;
  position: inherit; 
  left: 20px;
}
.card_row {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;  
}
.card_price {
  color: #f44;
}
.card_footer {
  width: 25%;
}
.card_footer button {
  height: 100%;
}
</style>
