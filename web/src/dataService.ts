import http from './local';
import contractData from './types/contractType';
import contractFeedBack from './types/contractFeedBackType';

// This file is to send axios request to the MySQL database
const getAllContracts = () => {
    return http.get<Array<contractData>>("/contracts");
}
const getByAddress = (addr:string): Promise<contractData> => {
    return new Promise((resolve, reject)=>{
        http.get(`/contract/?address=${addr}`)
        .then((res)=>{
            console.log('GET Success')
            console.log(res.data)
            resolve(res.data)
        }).catch((err)=>{
            console.log('GET Err: ', err)
            reject(err)
        })
    })
}
const getFeedBackByAddress = (addr:string): Promise<any> => {
    return new Promise((resolve, reject)=>{
        http.get(`/report/?address=${addr}`)
        .then((res)=>{
            console.log('GET Success')
            console.log(res.data)
            resolve(res.data)
        }).catch((err)=>{
            console.log('GET Err: ', err)
            reject(err)
        })
    })
}
const create = (data:contractData) => {
    return http.post<contractData>("/contracts", data);
}
const update = (addr:string, data:contractData) => {
    return http.put<contractData>(`/contracts/${addr}`, data)
}
const postFeedBackByAddress = (addr:string, feedBack: contractFeedBack) => {
    return new Promise((resolve, reject)=>{
        http.post(`/report/?address=${addr}`, feedBack)
        .then((res)=>{
            console.log('POST Success: ', res.data)
            resolve(res.data)
        }).catch((err)=>{
            console.log('POST Err: ', err)
            reject(err)
        })
    })
}
const postTransactionSimulation = (transaction: any) :Promise<any>  => {
    return new Promise((resolve, reject) =>{
        let _transaction = JSON.stringify(transaction)
        http.post(`api/simulate/`, _transaction)
        .then((res) => {
            console.log('POST Success: ', res.data)
            resolve(res.data)
        }).catch((err)=>{
            console.log('POST Err: ', err)
            reject(err)
        })})
}

const dataService = {
    getAllContracts,
    create,
    update,
    getByAddress,
    getFeedBackByAddress,
    postFeedBackByAddress,
    postTransactionSimulation
}
export default dataService