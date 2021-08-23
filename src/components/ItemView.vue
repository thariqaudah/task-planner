<template>
	<div class="item-view">
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
				<p>{{ task.createdAt }}</p>
			</div>
		</div>

		<div class="item-buttons">
			<i class="fas fa-check" @click="toggleDone"></i>
			<i class="fas fa-edit"></i>
			<i class="fas fa-trash-alt"></i>
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

		const { doc, toggleDoc } = useCollection('tasks')

		const toggleDetails = () => {
			showDetails.value = !showDetails.value
			// Toggle other items (emit event)
		}

		const toggleDone = async () => {
			await toggleDoc(task.value)
			// emit('done', doc.value)
		}

		return { showDetails, toggleDetails, toggleDone }
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
}
.main h1 {
	font-size: 1.4rem;
	font-weight: 500;
	margin: 0;
}
.main i {
	cursor: pointer;
	transition: all 0.2s ease-in;
}
.item-buttons {
	color: var(--secondary-color);
}
.item-buttons > i {
	margin-left: 1rem;
	cursor: pointer;
	font-size: 1.2rem;
}
.item-buttons > i:first-child:hover {
	color: var(--success-color);
}
.item-buttons > i:nth-child(2):hover {
	color: var(--primary-color);
}
.item-buttons > i:last-child:hover {
	color: var(--danger-color);
}
.arrow-up {
	transform: rotate(180deg);
}
</style>
