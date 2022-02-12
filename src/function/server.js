import axios from "axios";
const baseUrl="https://zen-studiovl-default-rtdb.europe-west1.firebasedatabase.app"

export function getBaseTest (){
    return axios.get(`${baseUrl}/ZenRecords.json`)
        .then((response) => response)
        .then((base) => {
            return base.data
        })
}

export async function postBaseTest(newRecord){
    try {
        const response = await axios.post(`${baseUrl}/ZenRecords.json`, newRecord)
        console.log(response)
    } catch(e) {
        console.log(e);
    }
}
export async function putBaseTest(newRecord){
    try {
        const response = await axios.put(`${baseUrl}/ZenRecords/-MvivT7WWv66hbyAuaDO.json`, newRecord)
        console.log(response)
    } catch(e) {
        console.log(e);
    }
}