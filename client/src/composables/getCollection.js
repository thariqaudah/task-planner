import { ref } from 'vue'
import useApi from './useApi'

const getCollection = collection => {
	const docs = ref([])
	const doc = ref(null)
	const error = ref(null)
	const loading = ref(false)

	const { api } = useApi()

	const getDocs = async () => {
		try {
			loading.value = true
			const res = await api.get(`/${collection}`)
			docs.value = res.data.tasks
			loading.value = false
			return res
		} catch (err) {
			console.log(err)
			error.value = err.message
		}
	}

	const getDoc = async id => {
		try {
			loading.value = true
			const res = await api.get(`/${collection}/${id}`)
			doc.value = res.data.task
			loading.value = false
			return res.data
		} catch (err) {
			console.log(err)
			error.value = err.message
		}
	}

	return { docs, doc, error, loading, getDocs, getDoc }
}

export default getCollection
