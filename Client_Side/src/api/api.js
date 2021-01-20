import axios from 'axios'

const api = axios.create({
    baseURL: '/api',
})

export const insertPoll = (payload) => api.post(`/poll`, payload)
export const getPolls = () => api.get(`/polls`)
export const getPollsByEmail = (email) => api.get(`/polls/${email}`)
export const updatePollByKey = (key, payload) => api.put(`/poll/${key}`, payload)
export const deletePollByKey = (key) => api.delete(`/poll/${key}`)
export const getPollByKey = (key) => api.get(`/poll/${key}`)

const apis = {
    insertPoll,
    updatePollByKey,
    getPollsByEmail,
    deletePollByKey,
    getPolls,
    getPollByKey,
}

export default apis