<template>
	<div class="home container">
		<div v-if="tasks.length">
			<FilterNav @filter="handleFilter" :filterBy="filterBy" />
			<div class="layout">
				<div>
					<ItemView
						v-for="task in filteredTasks"
						:key="task.id"
						:task="task"
						@delete="handleDelete"
					/>
					<Pagination @paginate="handlePaginate" :countDocs="tasks.length" />
				</div>
				<TagUniverse :tasks="tasks" />
			</div>
		</div>
		<div v-else>
			<h3>Loading...</h3>
		</div>
		<div v-if="error">
			<h3>Error: {{ error }}</h3>
		</div>
	</div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import ItemView from '../components/ItemView.vue'
import TagUniverse from '../components/TagUniverse.vue'
import FilterNav from '../components/FilterNav.vue'
import Pagination from '../components/Pagination.vue'
import getCollection from '../composables/getCollection'

export default {
	name: 'Home',
	components: { ItemView, TagUniverse, FilterNav, Pagination },
	setup() {
		const filterBy = ref('all')
		const filteredTasks = computed(() => {
			switch (filterBy.value) {
				case 'inProgress':
					return tasks.value.filter(task => !task.done)
				case 'completed':
					return tasks.value.filter(task => task.done)
				default:
					return tasks.value.filter(task => task)
			}
		})

		const { docs: tasks, error, loading, getDocs } = getCollection('tasks')

		onMounted(async () => {
			await getDocs()
		})

		const handleDelete = id => {
			tasks.value = tasks.value.filter(task => task.id !== id)
		}

		const handleFilter = option => {
			filterBy.value = option
		}

		const handlePaginate = page => {
			console.log(page)
		}

		return {
			tasks,
			error,
			loading,
			filterBy,
			filteredTasks,
			handleDelete,
			handleFilter,
			handlePaginate,
		}
	},
}
</script>
