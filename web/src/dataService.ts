import http from './local';
import contractData from './types/contractType';
// This file is to send axios request to the MySQL database
const getAllContracts = () => {
    return http.get<Array<contractData>>("/contracts");
}
const get = (addr:any) => {
    return http.get<contractData>(`/contracts/${addr}`)
}
const create = (data:contractData) => {
    return http.post<contractData>("/contracts", data);
}
const update = (addr:any, data:contractData) => {
    return http.put<contractData>(`/contracts/${addr}`, data)
}
const dataService = {
    getAllContracts,
    get,
    create,
    update
}
export default dataService