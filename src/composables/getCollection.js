import { ref } from 'vue'
import useApi from './useApi'

const getCollection = collection => {
	const docs = ref([])
	const error = ref(null)
	const loading = ref(false)

	const { api } = useApi()

	const getDocs = async () => {
		try {
			loading.value = true
			const res = await api.get(`/${collection}`)
			docs.value = res.data
			loading.value = false
		} catch (err) {
			console.log(err)
			error.value = err.message
		}
	}

	return { docs, error, loading, getDocs }
}

export default getCollection
