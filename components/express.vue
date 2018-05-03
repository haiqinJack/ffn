<template>
	<div>
		<van-cell-group>
			<van-cell>
				<template slot="title">
					<span>配送方式</span>
				</template>
			</van-cell>
		</van-cell-group>
		<radio-group>
		  <cell-group>
		    <cell v-for="(item, index) in lists" :key="item.id">
		      <radio @click="$emit('select', item, index)">
		        <div>{{ item.name }}，¥{{ (item.price / 100).toFixed(2) }}</div>
		        <div class="address">{{ item.desc }}</div>
		      </radio>
		    </cell>
		  </cell-group>	
	  </radio-group>
  </div>
</template>
<script>
import { Radio, RadioGroup, CellGroup, Cell, Icon} from 'vant'

export default {
	props: {
		lists: {
			type: Array,
			default: () => []
		}
	},
	components: {
		Radio,
		RadioGroup,
		Cell,
		CellGroup,
		Icon
	} 
}
</script>
<style scoped>
.address{
	font-size: 12px;
	color: #666;
}
</style>
