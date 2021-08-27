<template>
  <div class="tag container">
    <div v-if="error"></div>
    <div v-if="!loading">
      <h1>#Coding's Tag</h1>
      <div v-if="tasks.length">
        <ItemView v-for="task in tasks" :key="task.id" :task="task" />
      </div>
      <div v-else>
        <p>No task with this tag</p>
      </div>
    </div>
    <div v-else>
      <h2>Loading...</h2>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import getCollection from '../composables/getCollection'
import ItemView from '../components/ItemView.vue'

export default {
  name: 'Tag',
  components: { ItemView },
  setup() {
    const { docs: tasks, error, loading, getDocs } = getCollection('tasks')

    onMounted(async () => await getDocs())

    return { tasks, error, loading }
  },
}
</script>

<style></style>
