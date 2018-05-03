<template>
  <div class="edit">
  	<template v-if="edit">
  		<div @click="onEdit">完成</div>
  	</template>
  	<template v-else>
  		<div  @click="onEdit">编辑</div>
  	</template>
  </div>
</template>
<script>

export default {
  props: {
  	edit: {
  		type: Boolean,
  		default: false
  	}
  },
  computed: {

  },
  methods: {
    onEdit() {
      this.$emit('edit');
    }
  }
}	
</script>
<style scoped>
.edit {
  height: 40px;
  line-height: 40px;
  text-align: right;
  padding-right: 15px;
  margin-bottom: 10px;
  border-bottom: 1px solid #6666666e;
} 
.edit div {
  color: #3c88f3
}
</style>
