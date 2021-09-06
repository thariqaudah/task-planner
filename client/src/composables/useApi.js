import axios from 'axios'

const useApi = () => {
  const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: { 'Content-Type': 'application/json' },
  })

  return { api }
}

export default useApi
