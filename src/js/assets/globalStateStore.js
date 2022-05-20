class GlobalStateStore {
    constructor(){
        this.store = {
            cliente : [],
            empresa : [],
            fornecedor : [],
            tempo : [],
            classificacaocap : [],
            periodo: [],
            setor: [],
            usuario:[],
            protesto:[]

        }

    }
    
    storeIsValid(store){
        if(this.store[store]){
            if(this.store[store].length > 0){
                return true
            }else{
                return false
            }
        }else{
            return false
        }
        
    }

    getStore(store){
        return this.store[store]
    }

    updateStore(store,newstore){
        this.store[store] = newstore
    }

}


const GlobalStateStoreInstance = new GlobalStateStore
Object.freeze(GlobalStateStoreInstance)

export default GlobalStateStore