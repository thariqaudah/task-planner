<template>
  <div class="home container">
    <FilterNav @filter="handleFilter" :filterBy="filterBy" />
    <div class="layout" v-if="tasks.length">
      <div>
        <ItemView
          v-for="task in filteredTasks"
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
import { ref, onMounted, computed } from 'vue'
import ItemView from '../components/ItemView.vue'
import TagUniverse from '../components/TagUniverse.vue'
import FilterNav from '../components/FilterNav.vue'
import getCollection from '../composables/getCollection'

export default {
  name: 'Home',
  components: { ItemView, TagUniverse, FilterNav },
  setup() {
    const filterBy = ref('all')
    const filteredTasks = computed(() => {
      if (filterBy.value === 'inProgress') {
        return tasks.value.filter(task => !task.done)
      } else if (filterBy.value === 'completed') {
        return tasks.value.filter(task => task.done)
      } else {
        return tasks.value.filter(task => task)
      }
    })

    const { docs: tasks, error, loading, getDocs } = getCollection('tasks')

    onMounted(async () => {
      await getDocs()
    })

    const handleDelete = id => {
      tasks.value = tasks.value.filter(task => task.id !== id)
    }

    const handleFilter = option => {
      switch (option) {
        case 'inProgress':
          filterBy.value = 'inProgress'
          break
        case 'completed':
          filterBy.value = 'completed'
          break
        default:
          filterBy.value = 'all'
      }
    }

    return {
      tasks,
      error,
      loading,
      filterBy,
      filteredTasks,
      handleDelete,
      handleFilter,
    }
  },
}
</script>
