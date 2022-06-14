import React from 'react';
import {StartFirebase} from "../firebaseConfig/firebaseConfig";
import { ref, set, get, update, remove, child } from 'firebase/database'
const DB = StartFirebase();

export function getServerBase () {
    return get(child(ref(DB), `ZEN`)).then((response)=> {
        if (response.exists()){
            return response.val()
        }
        else {
            console.log('no data')
        }
    })
}

export function setServerBase (date, time, record) {
    set(ref(DB, `ZEN/${date}/${time}`), record)
        .then()
}

export function updateServerBase (date, time, record) {
    update(ref(DB, `ZEN/${date}/${time}`),record)
        .then()
}

export function deleteServerBase (date, time) {
    remove(ref(DB, `ZEN/${date}/${time}`)).then((response)=>{
        console.log('delete done' + response)}).catch((error) => {
        console.log('delete not done' + error)
    })
}