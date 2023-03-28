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
            console.log('[dataService.ts]: getByAddress Success', res.data)
            resolve(res.data)
        }).catch((err)=>{
            console.log('[dataService.ts]: getByAddress Err: ', err)
            reject(err)
        })
    })
}
const getFeedBackByAddress = (addr:string): Promise<any> => {
    return new Promise((resolve, reject)=>{
        http.get(`/report/?address=${addr}`)
        .then((res)=>{
            console.log('[dataService.ts]: getFeedBackByAddress Success', res.data)
            resolve(res.data)
        }).catch((err)=>{
            console.log('[dataService.ts]: getFeedBackByAddress Err: ', err)
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
const postFeedBackByAddress = (feedBack: contractFeedBack) => {
    return new Promise((resolve, reject)=>{
        http.post(`api/report/`, feedBack)
        .then((res)=>{
            console.log('[dataService.ts]: postFeedBackByAddress Success: ', res.data)
            resolve(res.data)
        }).catch((err)=>{
            console.log('[dataService.ts]: postFeedBackByAddress Err: ', err)
            reject(err.message)
        })
    })
}
const postTransactionSimulation = (transaction: any) :Promise<any>  => {
    return new Promise((resolve, reject) =>{
        let _transaction = JSON.stringify(transaction)
        http.post(`api/simulate/`, _transaction)
        .then((res) => {
            console.log('[dataService.ts]: postTransactionSimulation Success: ', res.data)
            resolve(res.data)
        }).catch((err)=>{
            console.log('[dataService.ts]: postTransactionSimulation Error: ', err.response.data.message)
            reject(err.message)
        })})
}
const postRecordDataURL = (url: any, pos: any) :Promise<any> =>{
    return new Promise((resolve, reject) =>{
        http.post(`api/record/${pos}`, url)
        .then((res) => {
            console.log('[dataService.ts]: postURL Success: ', res.data)
            resolve(res.data)
        }).catch((err)=>{
            console.log('[dataService.ts]: postURL Error: ', err)
            reject(err.message)
        })
})}
const postSignature = (url: any, pos: any) :Promise<any> =>{
    return new Promise((resolve, reject) =>{
        http.post(`api/simulate/${pos}`, url)
        .then((res) => {
            console.log('[dataService.ts]: postSignature Success: ', res.data)
            resolve(res.data)
        }).catch((err)=>{
            console.log('[dataService.ts]: postSignature Error: ', err)
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
    postRecordDataURL,
    postSignature
}
export default dataService