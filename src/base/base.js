let BASE = {
    "13-02-2022":{
        "10-11":{
            firstName: "Ктото",
            lastName: "Какойто",
            phone: 9052382663,
            vkID: 4747474,
            amount: 3,
        },
        "15-16":{
            firstName: "тКото",
            lastName: "Който",
            phone: 9079082663,
            vkID: 3453455,
            amount: 5,
        }
    },
    "14-02-2022": false,
}

export function getBase(){
    return BASE;
}

export function setBase(base){
    BASE = base
}

export  function printBase () {
    console.log(BASE)
}