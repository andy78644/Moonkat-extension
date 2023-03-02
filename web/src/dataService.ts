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
            console.log('getByAddress Success')
            console.log(res.data)
            resolve(res.data)
        }).catch((err)=>{
            console.log('getByAddress Err: ', err)
            reject(err)
        })
    })
}
const getFeedBackByAddress = (addr:string): Promise<any> => {
    return new Promise((resolve, reject)=>{
        http.get(`/report/?address=${addr}`)
        .then((res)=>{
            console.log('getFeedBackByAddress Success')
            console.log(res.data)
            resolve(res.data)
        }).catch((err)=>{
            console.log('getFeedBackByAddress Err: ', err)
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
            console.log('postFeedBackByAddress Success: ', res.data)
            resolve(res.data)
        }).catch((err)=>{
            console.log('postFeedBackByAddress Err: ', err)
            reject(err)
        })
    })
}
const postTransactionSimulation = (transaction: any) :Promise<any>  => {
    return new Promise((resolve, reject) =>{
        let _transaction = JSON.stringify(transaction)
        http.post(`api/simulate/`, _transaction)
        .then((res) => {
            console.log('postTransactionSimulation Success: ', res.data)
            resolve(res.data)
        }).catch((err)=>{
            console.log('postTransactionSimulation Error: ', err.response.data.message)
            reject(err)
        })})
}
const postURL = (url: any, pos: any) :Promise<any> =>{
    return new Promise((resolve, reject) =>{
        http.post(`api/record/${pos}`, url)
        .then((res) => {
            console.log('postURL Success: ', res.data)
            resolve(res.data)
        }).catch((err)=>{
            console.log('postURL Error: ', err)
            reject(err.message)
        })
})}
const dataService = {
    getAllContracts,
    create,
    update,
    getByAddress,
    getFeedBackByAddress,
    postFeedBackByAddress,
    postTransactionSimulation,
    postURL
}
export default dataService