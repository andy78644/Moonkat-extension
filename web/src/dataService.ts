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
const create = (data:contractData) => {
    return http.post<contractData>("/contracts", data);
}
const update = (addr:string, data:contractData) => {
    return http.put<contractData>(`/contracts/${addr}`, data)
}
const uploadReport = (feedBack: contractFeedBack, addr:string) => {
    return http.post<contractFeedBack>(`/contractFeedBack/${addr}`, feedBack)
}


const dataService = {
    getAllContracts,
    create,
    update,
    getByAddress,
    uploadReport
}
export default dataService