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

export async function putSession(date, time, mySession){
    return await axios.put(`${baseUrl}/ZenRecords/-Mvm_QfeNT4XBwpmFbVA/${date}/${time}.json`, mySession)
}

export async function sendMessage (user_id, random_id, message) {
    return await axios.get(`https://api.vk.com/method/messages.send?user_id=${user_id}&random_id=${random_id}&message=${message}&access_token=85cf29a79eee820080bed713566a0b52dd415d6d889f13d33641b8bca4799769b7f58dd9e9d6b616b2f7f&v=5.131`)
}
