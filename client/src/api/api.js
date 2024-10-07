import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://pr-server-two.vercel.app',
    withCredentials: true
})

export const getToken = axiosInstance.get('/auth/token')
export const createWebHook = (data) => axiosInstance.post('/repositories/create-webhook', data)

export default axiosInstance