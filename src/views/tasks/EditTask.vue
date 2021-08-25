<template>
	<div class="edit-task container">
		<div v-if="task">
			<h1>Edit Task</h1>
			<p>Modify your task here</p>
			<!-- <div v-if="error">
			<h2>{{ error }}</h2>
	  	</div> -->
			<form class="form" @submit.prevent="handleSubmit">
				<div class="form-group">
					<label for="title">Title</label>
					<input
						type="text"
						id="title"
						placeholder="Enter task title"
						v-model="title"
					/>
				</div>
				<div class="form-group">
					<label for="desc">Description</label>
					<textarea
						id="desc"
						placeholder="Description of your task"
						v-model="description"
					></textarea>
				</div>
				<div class="form-group">
					<label for="target">Target</label>
					<input type="date" id="target" v-model="target" />
				</div>
				<div class="form-group">
					<input
						type="submit"
						value="Update"
						:disabled="!isValidated"
						:class="{ disabled: !isValidated }"
						v-if="!loading"
					/>
					<input type="submit" value="Saving..." v-else />
				</div>
			</form>
		</div>
		<div v-else>
			<h2>Loading...</h2>
		</div>
	</div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import getCollection from '@/composables/getCollection'

export default {
	name: 'EditTask',
	props: ['id'],
	setup(props) {
		const title = ref('')
		const description = ref('')
		const target = ref('')

		const { doc: task, error: fetchError, getDoc } = getCollection('tasks')

		const isValidated = computed(
			() => title.value && description.value && target.value
		)

		const handleSubmit = async () => {}

		onMounted(async () => {
			await getDoc(props.id)
			if (!fetchError.value) {
				title.value = task.value.title
				description.value = task.value.description
				target.value = task.value.target
			}
		})

		return {
			title,
			description,
			target,
			isValidated,
			handleSubmit,
			task,
		}
	},
}
</script>

<style scoped>
h1,
p {
	text-align: center;
}
.form {
	margin-right: auto;
	margin-left: auto;
}
.disabled {
	background: #ccc;
	cursor: not-allowed;
}
</style>
