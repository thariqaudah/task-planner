<template>
  <nav class="filter-nav">
    <button :class="{ active: filterBy === 'all' }" @click="handleClick('all')">
      View All
    </button>
    <button
      :class="{ active: filterBy === 'inProgress' }"
      @click="handleClick('inProgress')"
    >
      In Progress
    </button>
    <button
      :class="{ active: filterBy === 'completed' }"
      @click="handleClick('completed')"
    >
      Completed
    </button>
  </nav>
</template>

<script>
export default {
  name: 'FilterNav',
  props: ['filterBy'],
  setup(props, { emit }) {
    const handleClick = option => {
      emit('filter', option)
    }

    return { handleClick }
  },
}
</script>

<style scoped>
.filter-nav {
  margin-bottom: 2rem;
}
.filter-nav button {
  background: none;
  border: none;
  outline: none;
  text-transform: uppercase;
  margin-right: 1.5rem;
  color: var(--secondary-color);
  cursor: pointer;
}
button.active {
  color: var(--primary-color);
  font-weight: 700;
  padding-bottom: 5px;
  border-bottom: 1px solid var(--primary-color);
}
</style>
