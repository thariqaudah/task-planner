<template>
	<aside class="tag-universe">
		<h3>Tags</h3>
		<ul class="tags">
			<li v-for="tag in tags" :key="tag">
				<router-link :to="{ name: 'Tag', params: { tag } }">
					#{{ tag }}
				</router-link>
			</li>
		</ul>
	</aside>
</template>

<script>
import useTags from '@/composables/useTags'

export default {
	name: 'TagUniverse',
	props: {
		tasks: {
			type: Array,
			required: true,
		},
	},
	setup(props) {
		const { tags } = useTags(props.tasks)

		return { tags }
	},
}
</script>

<style scoped>
.tag-universe {
	align-self: flex-start;
	background: #eee;
	border-radius: 5px;
	padding: 0.5rem;
}
h3 {
	font-weight: 700;
	margin-bottom: 1rem;
}
ul.tags {
	display: flex;
	flex-wrap: wrap;
}
.tags li {
	margin: 0.2rem;
	cursor: pointer;
}
.tags li:hover {
	color: #000;
}
</style>
