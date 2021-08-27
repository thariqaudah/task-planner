<template>
	<div class="home container">
		<div class="layout" v-if="tasks.length">
			<div>
				<ItemView
					v-for="task in tasks"
					:key="task.id"
					:task="task"
					@delete="handleDelete"
				/>
			</div>
			<TagUniverse :tasks="tasks" />
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
import { onMounted } from 'vue'
import ItemView from '../components/ItemView.vue'
import TagUniverse from '../components/TagUniverse.vue'
import getCollection from '../composables/getCollection'

export default {
	name: 'Home',
	components: { ItemView, TagUniverse },
	setup() {
		const { docs: tasks, error, loading, getDocs } = getCollection('tasks')

		onMounted(async () => {
			await getDocs()
		})

		const handleDelete = id => {
			tasks.value = tasks.value.filter(task => task.id !== id)
		}

		return { tasks, error, loading, handleDelete }
	},
}
</script>
