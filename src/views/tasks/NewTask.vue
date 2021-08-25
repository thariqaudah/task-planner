<template>
	<div class="new-task container">
		<h1>Add New Task</h1>
		<p>Create new task of your life</p>
		<div v-if="error">
			<h2>{{ error }}</h2>
		</div>
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
					value="Save"
					:disabled="!isValidated"
					:class="{ disabled: !isValidated }"
					v-if="!loading"
				/>
				<input type="submit" value="Saving..." v-else />
			</div>
		</form>
	</div>
</template>

<script>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import useCollection from '@/composables/useCollection'

export default {
	name: 'NewTask',
	setup() {
		const title = ref('')
		const description = ref('')
		const target = ref('')

		const router = useRouter()

		const isValidated = computed(
			() => title.value && description.value && target.value
		)

		const { addDoc, error, loading } = useCollection('tasks')

		const handleSubmit = async () => {
			const res = await addDoc({
				title: title.value,
				description: description.value,
				target: target.value,
				createdAt: new Date(Date.now),
			})
			if (!error.value) {
				router.push({ name: 'Home' })
			}
		}

		return {
			title,
			description,
			target,
			isValidated,
			handleSubmit,
			loading,
			error,
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
