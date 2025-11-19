import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://laravel-api.local',
  withCredentials: true,
  withXSRFToken: true,
})

export default apiClient
