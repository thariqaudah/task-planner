import { ref } from 'vue'
import useApi from './useApi'

const useCollection = collection => {
  const doc = ref(null)
  const error = ref(null)
  const loading = ref(false)

  const { api } = useApi()

  const addDoc = async doc => {
    try {
      loading.value = true
      const res = await api.post(`/${collection}`, doc)
      doc.value = res.data
      loading.value = false
      return res.data
    } catch (err) {
      console.log(err)
      error.value = err.message
    }
  }

  const editDoc = async updDoc => {
    try {
      loading.value = true
      const res = await api.put(`/${collection}/${updDoc.id}`, updDoc)
      doc.value = res.data
      loading.value = false
      return res.data
    } catch (err) {
      console.log(err)
      error.value = err.message
    }
  }

  const deleteDoc = async id => {
    try {
      loading.value = true
      await api.delete(`/${collection}/${id}`)
      loading.value = false
    } catch (err) {
      console.log(err)
      error.value = err.message
    }
  }

  return { doc, error, loading, addDoc, editDoc, deleteDoc }
}

export default useCollection
