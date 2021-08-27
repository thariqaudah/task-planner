<template>
	<div class="edit-task container">
		<div v-if="task">
			<h1>Edit Task</h1>
			<p>Modify your task here</p>
			<div v-if="submitError">
				<p class="error">{{ submitError }}</p>
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
					<label for="tags">Tags</label>
					<input
						type="text"
						id="tags"
						placeholder="Type a new tag and press tab"
						v-model="tag"
						@keydown.tab.prevent="handleKeydown"
					/>
					<div class="tags" v-if="tags.length">
						<span
							class="tag"
							v-for="(item, index) in tags"
							:key="index"
							@click="tags.splice(index, 1)"
							>#{{ item }}</span
						>
						<span>(click to change)</span>
					</div>
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
import { useRouter } from 'vue-router'
import getCollection from '@/composables/getCollection'
import useCollection from '@/composables/useCollection'

export default {
	name: 'EditTask',
	props: ['id'],
	setup(props) {
		const title = ref('')
		const description = ref('')
		const tag = ref('')
		const tags = ref([])

		const router = useRouter()
		const { doc: task, error: fetchError, getDoc } = getCollection('tasks')
		const { error: submitError, loading, editDoc } = useCollection('tasks')

		const isValidated = computed(() => title.value && description.value)

		const handleKeydown = () => {
			tags.value.push(tag.value)
			tag.value = ''
		}

		const handleSubmit = async () => {
			const updatedDoc = {
				...task.value,
				title: title.value,
				description: description.value,
				tags: tags.value,
				createdAt: Date.now(),
			}
			await editDoc(updatedDoc)
			if (!submitError.value) {
				router.push({ name: 'Home' })
			}
		}

		onMounted(async () => {
			await getDoc(props.id)
			if (!fetchError.value) {
				title.value = task.value.title
				description.value = task.value.description
				tags.value = task.value.tags
			}
		})

		return {
			title,
			description,
			tag,
			tags,
			isValidated,
			handleKeydown,
			handleSubmit,
			task,
			submitError,
			loading,
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
	cursor: initial;
}
.disabled:hover {
	background: #ccc;
}
.tags {
	display: flex;
	margin-top: -0.5rem;
}
.tags > .tag {
	margin-right: 0.5rem;
	cursor: pointer;
}
.tags > .tag:hover {
	opacity: 0.5;
}
</style>
