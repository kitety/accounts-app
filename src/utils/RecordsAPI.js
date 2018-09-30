import axios from "axios";
const api = process.env.REACT_APP_RECORDS_API_URL || "https://5babb011ecc1a70014306b48.mockapi.io"
// 注意这里不要加{}.加了就报错
// 获取
export const getAll = () => axios.get(`${api}/api/v1/records`)
// 添加
export const create = (body) => axios.post(`${api}/api/v1/records`, body)
export const update = (id, body) => axios.put(`${api}/api/v1/records/${id}`, body)
export const remove = (id) => axios.delete(`${api}/api/v1/records/${id}`)

