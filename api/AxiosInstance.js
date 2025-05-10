import axios from 'axios'

export const AxiosInstance = axios.create({
  baseURL: 'http://192.168.6.190:5000/api',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
})