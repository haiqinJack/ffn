<template>
	<div>
		<van-cell-group>
			<van-cell>
				<template slot="title">
					<span>配送方式</span>
				</template>
			</van-cell>
		</van-cell-group>
		<van-radio-group v-model="radio">
		  <van-cell-group>
		    <van-cell v-for="(item, index) in lists" :key="item.name">
		      <van-radio @click="$emit('select', item, index)" name="0">
		        <div>{{ item.name }}，¥{{ (item.price / 100).toFixed(2) }}</div>
		        <div class="address">{{ item.desc }}</div>
		      </van-radio>
		    </van-cell>
		  </van-cell-group>	
	  </van-radio-group>
	</div>  
</template>
<script>
import { RadioGroup, Radio, CellGroup, Cell, Icon} from 'vant'

export default {
	data() {
		return {
			radio: '0'
		}
	},
	name: 'myexpress',
	props: {
		lists: {
			type: Array,
			default: () => []
		}
	},
	components: {
		[RadioGroup.name]: RadioGroup,
		[Radio.name]: Radio,
		[CellGroup.name]: CellGroup,
		[Cell.name]: Cell,
		[Icon.name]: Icon
	} 
}
</script>
<style>
.address{
	font-size: 12px;
	color: #666;
}
</style>
