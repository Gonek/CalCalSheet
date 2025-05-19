class Return{
    constructor(prop, args, returnValue) {
        this.prop = prop;
        this.args = args;
        this.returnValue = returnValue;
    }

    isEqual(prop, args){
        return prop == this.prop && arraysEqual(args, this.args);
    }

    setValue(returnValue){
        this.returnValue = returnValue;
    }

    value(){
        return this.returnValue;
    }
}