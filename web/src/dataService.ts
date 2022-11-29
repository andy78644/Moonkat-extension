import http from './local';
import contractData from './types/contractType';
// This file is to send axios request to the MySQL database
const getAllContracts = () => {
    return http.get<Array<contractData>>("/contracts");
}
const get = (addr:string) => {
    return http.get<contractData>(`/contracts/${addr}`)
}
const create = (data:contractData) => {
    return http.post<contractData>("/contracts", data);
}
const update = (addr:string, data:contractData) => {
    return http.put<contractData>(`/contracts/${addr}`, data)
}

const getBalance = (addr:string): Promise<any> =>{
    return new Promise((resolve, reject)=>{
        http.get(`/contract/${addr}`)
        .then((res)=>{
            console.log(res.data)
            resolve(res.data)
        }).catch((err)=>{
            console.log(err)
            reject(err)
        })
    })
}

const dataService = {
    getAllContracts,
    get,
    create,
    update,
    getBalance,
}
export default dataService