import { ref } from 'vue'
import { formatDistance } from 'date-fns'

const useDate = date => {
  const formattedDate = ref(null)

  formattedDate.value = formatDistance(date, new Date(), {
    includeSeconds: true,
    addSuffix: true,
  })

  return { formattedDate }
}

export default useDate
