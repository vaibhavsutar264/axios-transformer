import axios from "axios"
import {responseTransformer} from "./TransformersClient";


const usersUrl = 'http://localhost:3002/users';

// const baseResponseTransformer = responseTransformer((data) => (data.map((v: any, id=0) => ({...v, country: 'india', SrNo: id+1, state: "maharashtra", createdAt: new Date((new Date()).getTime() - ((new Date()).getTimezoneOffset() * 60000)).toISOString()}))));

// const baseResponseTransformer = responseTransformer((data) => JSON.parse(JSON.stringify(data,(k: any, v: any) =>  v === null ? 'property value issue from backend' : v)));

// const baseResponseTransformer = responseTransformer((data) => data.forEach((number, index) => data[index].hasOwnProperty("name"))); 

const baseResponseTransformer = responseTransformer((data) => data[0].hasOwnProperty("name")? data : data.map((v: any, id=0) => ({...v, name: 'key as name not present'})));

// const baseResponseTransformer = responseTransformer((data) => data)



export const getUsers = async (id: any) => {
    id = id || '';
    try {
        return await axios.get(`${usersUrl}/${id}`, {
            transformResponse: baseResponseTransformer
        }).then(response => (response))
    } catch (error) {
        console.log('Error while calling getUsers api ', error);
    }
}



// export const baseClient = {
//     getBases() {
//         return axios.get(usersUrl, {
//             transformResponse: baseResponseTransformer
//         }).then(response => (
//             console.log(response)
//             ))
//     },
//     deleteBasesByIdIn(ids) {
//         return axios.delete(usersUrl, {
//             params: {
//                 ids: ids.join(",")
//             }
//         })
//     },
//     addBase(base) {
//         return axios.post(usersUrl, base)
//     },
//     updateBase(base) {
//         return axios.put(`${usersUrl}/${base.id}`, base)
//     }
// }