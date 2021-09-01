<template>
  <div class="pagination">
    <button @click="handleClick('dec')" v-if="currentPage * 3 > 3">
      <i class="fas fa-arrow-circle-left"></i>
    </button>
    <button
      v-for="page in pages"
      :key="page"
      @click="handleClick(null, $event)"
      :class="{ active: page === currentPage }"
    >
      {{ page }}
    </button>
    <button @click="handleClick('inc')" v-if="countDocs > currentPage * 3">
      <i class="fas fa-arrow-circle-right"></i>
    </button>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'

export default {
  name: 'Pagination',
  props: ['countDocs', 'currentPage'],
  setup(props, { emit }) {
    const pages = ref([])
    const limit = 3 // limit document per page

    onMounted(async () => {
      let numberOfPages = Math.ceil(props.countDocs / limit)
      for (let i = 1; i <= numberOfPages; i++) {
        pages.value.push(i)
      }
    })

    const handleClick = (option, e) => {
      let page

      switch (option) {
        case 'inc':
          page = props.currentPage + 1
          break
        case 'dec':
          page = props.currentPage - 1
          break
        default:
          page = parseInt(e.target.innerText, 10)
      }
      emit('paginate', page)
    }

    return { pages, handleClick }
  },
}
</script>

<style scoped>
.pagination {
  margin: 50px auto;
  text-align: center;
}
.pagination > button {
  display: inline-block;
  border: none;
  outline: none;
  background: none;
  color: var(--secondary-color);
  font-size: 1rem;
  margin: 0 0.8rem;
}
.pagination button.active {
  color: var(--primary-color);
  font-weight: 700;
  border-bottom: 1px solid var(--primary-color);
}
.pagination button:hover {
  color: var(--primary-color);
}
</style>
