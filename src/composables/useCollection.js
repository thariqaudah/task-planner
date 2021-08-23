import { ref } from 'vue'
import useApi from './useApi'

const useCollection = collection => {
	const doc = ref(null)
	const error = ref(null)
	const loading = ref(false)

	const { api } = useApi()

	const toggleDoc = async doc => {
		try {
			loading.value = true
			const res = await api.put(`/${collection}/${doc.id}`, {
				...doc,
				done: !doc.done,
			})
			doc.value = res.data
			loading.value = false
		} catch (err) {
			console.log(err)
			error.value = err.message
		}
	}

	return { doc, error, loading, toggleDoc }
}

export default useCollection
