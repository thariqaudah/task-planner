<template>
  <div class="tag container">
    <div v-if="error"></div>
    <div v-if="loading">
      <h2>Loading...</h2>
    </div>
    <div class="main" v-else>
      <router-link class="btn" :to="{ name: 'Home' }">Go Back</router-link>
      <h1>#{{ route.params.tag }}'s</h1>
      <div class="layout">
        <div v-if="selectedTasks.length">
          <ItemView v-for="task in selectedTasks" :key="task.id" :task="task" />
        </div>
        <div v-else>
          <p>There is no tasks with this tag</p>
        </div>
        <TagUniverse :tasks="tasks" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import getCollection from '../composables/getCollection'
import ItemView from '../components/ItemView.vue'
import TagUniverse from '../components/TagUniverse.vue'

export default {
  name: 'Tag',
  components: { ItemView, TagUniverse },
  setup() {
    const { docs: tasks, error, loading, getDocs } = getCollection('tasks')

    const route = useRoute()

    const selectedTasks = computed(() =>
      tasks.value.filter(task => task.tags.includes(route.params.tag))
    )

    onMounted(async () => await getDocs())

    return { route, tasks, selectedTasks, error, loading }
  },
}
</script>

<style scoped>
.main h1 {
  margin-bottom: 1rem;
}
</style>
