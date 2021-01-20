import axios from 'axios'

const Rapi = axios.create({
    baseURL: '/Rapi',
})

export const insertResponseForm = (payload) => Rapi.post(`/responseform`, payload)
export const updateResponseForm = (key,payload) => Rapi.put(`/responseform/${key}`, payload)
export const getResponses = (key) => Rapi.get(`/responses/${key}`)
export const insertResponseByKey = (key,payload) => Rapi.put(`/responseIn/${key}`, payload)
export const updateResponseByKey = (key, email, payload) => Rapi.put(`/responseUp/${key}/${email}`, payload)
export const deleteResponseByKey = (key, email) => Rapi.delete(`/response/${key}/${email}`)
export const deleteResponseFormByKey = (key) => Rapi.delete(`/responseform/${key}`)
export const getResponseByKey = (key, email) => Rapi.get(`/response/${key}/${email}`)

const Rapis = {
    insertResponseForm,
    updateResponseForm,
    insertResponseByKey,
    updateResponseByKey,
    deleteResponseByKey,
    deleteResponseFormByKey,
    getResponses,
    getResponseByKey,
}

export default Rapis