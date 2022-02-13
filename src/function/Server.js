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
    return  await axios.post(`${baseUrl}/ZenRecords.json`, newRecord)
}

export async function putBase(newRecord){
    return await axios.put(`${baseUrl}/ZenRecords/-Mvm_QfeNT4XBwpmFbVA.json`, newRecord)
}

export async function deleteBase(recordDate, recordTimeToDelete){
    return  await axios.delete(`${baseUrl}/ZenRecords/-Mvm_QfeNT4XBwpmFbVA/${recordDate}/${recordTimeToDelete}.json`)
}