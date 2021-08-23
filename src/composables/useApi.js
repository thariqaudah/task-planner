import axios from 'axios'

const useApi = () => {
	const api = axios.create({
		baseURL: 'http://localhost:3000',
		headers: { 'Content-Type': 'application/json' },
	})

	return { api }
}

export default useApi
