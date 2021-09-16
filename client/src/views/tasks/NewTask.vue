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
          <span>(click to remove)</span>
        </div>
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
    const tag = ref('')
    const tags = ref([])

    const router = useRouter()

    const isValidated = computed(() => title.value && description.value)

    const { addDoc, error, loading } = useCollection('tasks')

    const handleKeydown = () => {
      tags.value.push(tag.value)
      tag.value = ''
    }

    const handleSubmit = async () => {
      await addDoc({
        title: title.value,
        description: description.value,
        tags: tags.value,
      })
      if (!error.value) {
        router.push({ name: 'Home' })
      }
    }

    return {
      title,
      description,
      tag,
      tags,
      isValidated,
      handleKeydown,
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
