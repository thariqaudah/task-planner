<template>
	<div class="home container">
		<div v-if="tasks">
			<div v-for="task in tasks" :key="task.id">
				<ItemView :task="task" @done="handleDone" />
			</div>
		</div>
		<div v-else>
			<p>Loading...</p>
		</div>
		<div v-if="error">Error: {{ error }}</div>
	</div>
</template>

<script>
import { onMounted } from 'vue'
import ItemView from '../components/ItemView.vue'
import getCollection from '../composables/getCollection'
import useCollection from '../composables/useCollection'

export default {
	name: 'Home',
	components: { ItemView },
	setup() {
		const { docs: tasks, error, loading, getDocs } = getCollection('tasks')

		onMounted(async () => {
			await getDocs()
		})

		const handleDone = id => {
			// Toggle done value in the UI
			const task = tasks.find(task => task.id === id)
			task.done = !task.done
		}

		return { tasks, error, loading, handleDone }
	},
}
</script>
