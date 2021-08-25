<template>
	<div class="item-view" :class="{ 'check-mark': task.done }">
		<div class="main">
			<h1>
				{{ task.title }}
				<i
					class="fas fa-chevron-circle-down"
					@click="toggleDetails"
					:class="{ 'arrow-up': showDetails }"
				></i>
			</h1>
			<div class="details" v-if="showDetails">
				<p>{{ task.description }}</p>
				<p>Save on: {{ task.createdAt }}</p>
			</div>
		</div>

		<div class="item-buttons">
			<i class="fas fa-check" @click="toggleDone"></i>
			<router-link :to="{ name: 'EditTask', params: { id: task.id } }">
				<i class="fas fa-edit"></i>
			</router-link>
			<i class="fas fa-trash-alt" @click="deleteTask"></i>
		</div>
	</div>
</template>

<script>
import { ref, toRefs } from 'vue'
import useCollection from '../composables/useCollection'

export default {
	name: 'ListView',
	props: {
		task: {
			type: Object,
			required: true,
		},
	},
	setup(props, { emit }) {
		const { task } = toRefs(props)
		const showDetails = ref(false)

		const { doc, error, loading, editDoc, deleteDoc } = useCollection('tasks')

		const toggleDetails = () => {
			showDetails.value = !showDetails.value
			// Toggle other items (emit event)
		}

		const toggleDone = async () => {
			const updatedDoc = { ...task.value, done: !task.value.done }
			await editDoc(updatedDoc)
			// Change in the UI
			if (!error.value) {
				task.value.done = doc.value.done
			}
		}

		const deleteTask = async () => {
			await deleteDoc(task.value.id)
			if (!error.value) {
				emit('delete', task.value.id)
			}
		}

		return { showDetails, toggleDetails, toggleDone, deleteTask }
	},
}
</script>

<style scoped>
.item-view {
	background: #fff;
	padding: 30px;
	margin-bottom: 2rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-radius: 5px;
	transition: box-shadow 0.2s ease-in;
}
.item-view:hover {
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.main h1 {
	font-size: 1.4rem;
	font-weight: 500;
	margin: 0;
}
.main i {
	color: var(--secondary-color);
	cursor: pointer;
	transition: all 0.2s ease-in;
}
.details > p:last-child {
	color: var(--secondary-color);
	font-size: 0.8rem;
}
.item-buttons {
	color: var(--secondary-color);
}
.item-buttons > * {
	margin-left: 1rem;
	cursor: pointer;
	font-size: 1.2rem;
}
.item-buttons > *:first-child:hover {
	color: var(--success-color);
}
.item-buttons > *:nth-child(2):hover {
	color: var(--primary-color);
}
.item-buttons > *:last-child:hover {
	color: var(--danger-color);
}
.arrow-up {
	transform: rotate(180deg);
}
/* Dynamic style */
.check-mark {
	border-left: 5px solid var(--success-color);
}
.check-mark .item-buttons > i:first-child {
	color: var(--success-color);
}
</style>
