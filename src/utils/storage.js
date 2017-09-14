export default class Storage {
    static setItem(key, value){
        localStorage.setItem(key, value);
    }

    static getItem(key){
        return localStorage.getItem(key);
    }

    static hasItem(key){
        return localStorage.getItem(key);
    }

    static clear(key){
        localStorage.clear()
    }

    static forEach(callback) {
        for (let i=0; i<localStorage.length; i++) {
            let key = localStorage.key(i)
            callback(key, Storage.get(key))
        }
    }

    static getAll =  function(){
        let ret = {}
        Storage.forEach(function(key, val) {
            ret[key] = val
        })
        return ret
    }

}