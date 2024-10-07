import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
})

export const getToken = axiosInstance.get('/auth/token')
export const createWebHook = (data) => axiosInstance.post('/repositories/create-webhook', data)

export default axiosInstance