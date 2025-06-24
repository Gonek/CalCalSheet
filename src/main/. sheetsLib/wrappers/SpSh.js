class SpSh{
    constructor(id, test = false){
        this.id = id;
        if(!test){
            if(id == SPSH.ACTIVE){
                this.spsh = getObj(App).getActiveSpSh();
            }else{
                this.spsh = getObj(App).openById(id);
            }
        }
    }

    getId(){
        return this.id;
    }

    isExist(){
        return this.spsh && this.spsh !== 'null' && this.spsh !== 'undefined';
    }

    getSheetByName(name){
        return this.spsh.getSheetByName(name);
    }

    getSheetById(id){
        return this.spsh.getSheetById(id);
    }

    getRangeByName(name){
        return this.spsh.getRangeByName(name);
    }

    rename(newName){
        this.spsh.rename(newName);
    }
}