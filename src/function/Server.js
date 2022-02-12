import axios from "axios";
const baseUrl="https://zen-studiovl-default-rtdb.europe-west1.firebasedatabase.app"

export function getBase(){
    return axios.get(`${baseUrl}/ZenRecords.json`)
        .then((response) => response)
        .then((base) => {
            return base.data
        })
}

export async function postBase(newRecord){
    try {
        const response = await axios.post(`${baseUrl}/ZenRecords.json`, newRecord)
        console.log(response)
    } catch(e) {
        console.log(e);
    }
}
export async function putBase(newRecord){
        const response = await axios.put(`${baseUrl}/ZenRecords/-MvivT7WWv66hbyAuaDO.json`, newRecord)
    return response
}
export async function deleteBase(){
    try {
        const response = await axios.delete(`${baseUrl}/ZenRecords/-MvivT7WWv66hbyAuaDO/13-02-2022/12-13.json`)
        console.log(response)
    } catch(e) {
        console.log(e);
    }
}