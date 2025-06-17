class MockClass{
    constructor(mockObj, returnObj, verifyObj, objCalls, objReturns, obj){
        this.mockObj = mockObj;
        this.returnObj = returnObj;
        this.verifyObj = verifyObj;
        this.objCalls = objCalls; 
        this.objReturns = objReturns;
        this.obj = obj;
    }

    clear(){
        this.objCalls.length = 0; 
        this.objReturns.length = 0;
    }
}