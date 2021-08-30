<template>
	<div class="pagination">
		<button @click="currentPage - 1">
			<i class="fas fa-arrow-circle-left"></i>
		</button>
		<button v-for="page in pages" :key="page">{{ page }}</button>
		<button @click="currentPage + 1">
			<i class="fas fa-arrow-circle-right"></i>
		</button>
	</div>
</template>

<script>
import { onMounted, ref } from 'vue'

export default {
	name: 'Pagination',
	props: ['countDocs'],
	setup(props, { emit }) {
		const pages = ref([])
		const currentPage = ref(1)
		const limit = 3 // document per page

		onMounted(async () => {
			let numberOfPages = Math.ceil(props.countDocs / limit)
			for (let i = 1; i <= numberOfPages; i++) {
				pages.value.push(i)
			}
		})

		const handleClick = e => {
			const page = parseInt(e.target.innerText, 10)
			emit('paginate', page)
		}

		return { pages, currentPage, handleClick }
	},
}
</script>

<style scoped>
.pagination {
	margin: 50px auto;
	text-align: center;
}
.pagination > button {
	display: inline-block;
	border: none;
	outline: none;
	background: none;
	color: var(--secondary-color);
	font-size: 1rem;
	margin: 0 0.8rem;
}
.pagination button.active {
	color: var(--primary-color);
	font-weight: 700;
	border-bottom: 1px solid var(--primary-color);
}
.pagination button:hover {
	color: var(--primary-color);
}
</style>
