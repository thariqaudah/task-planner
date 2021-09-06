import axios from 'axios'

const useApi = () => {
	const api = axios.create({
		baseURL: '/api',
		headers: { 'Content-Type': 'application/json' },
	})

	return { api }
}

export default useApi
