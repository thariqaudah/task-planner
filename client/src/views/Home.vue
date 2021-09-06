<template>
  <div class="home container">
    <div v-if="loading">
      <h3>Loading...</h3>
    </div>
    <div v-else>
      <div v-if="tasks.length">
        <FilterNav @filter="handleFilter" :filterBy="filterBy" />
        <div class="layout">
          <div>
            <ItemView
              v-for="task in tasksToDisplay"
              :key="task._id"
              :task="task"
              @delete="handleDelete"
            />
            <Pagination
              :countDocs="tasks.length"
              :currentPage="currentPage"
              @paginate="handlePaginate"
              v-if="filterBy === 'all'"
              :limit="limit"
            />
          </div>
          <TagUniverse :tasks="tasks" />
        </div>
      </div>
      <div v-else>
        <h2>
          No tasks to display. Let's add one and more
          <router-link :to="{ name: 'NewTask' }">
            <i class="fas fa-plus-circle"></i>
          </router-link>
        </h2>
      </div>
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
import Pagination from '../components/Pagination.vue'
import getCollection from '../composables/getCollection'

export default {
  name: 'Home',
  components: { ItemView, TagUniverse, FilterNav, Pagination },
  setup() {
    const filterBy = ref('all')
    const currentPage = ref(1)
    const limit = ref(5)

    const { docs: tasks, error, loading, getDocs } = getCollection('tasks')

    const filteredTasks = computed(() => {
      switch (filterBy.value) {
        case 'inProgress':
          return tasks.value.filter(task => !task.done)
        case 'completed':
          return tasks.value.filter(task => task.done)
        default:
          return tasks.value.filter(task => task)
      }
    })

    const tasksToDisplay = computed(() => {
      if (filterBy.value === 'all') {
        const startIndex = (currentPage.value - 1) * limit.value
        const endIndex = currentPage.value * limit.value
        return filteredTasks.value.slice(startIndex, endIndex)
      } else {
        return filteredTasks.value
      }
    })

    onMounted(async () => {
      await getDocs()
    })

    const handleDelete = _id => {
      tasks.value = tasks.value.filter(task => task._id !== _id)
    }

    const handleFilter = option => {
      filterBy.value = option
    }

    const handlePaginate = page => {
      currentPage.value = page
    }

    return {
      tasks,
      error,
      loading,
      filterBy,
      filteredTasks,
      currentPage,
      limit,
      tasksToDisplay,
      handleDelete,
      handleFilter,
      handlePaginate,
    }
  },
}
</script>
