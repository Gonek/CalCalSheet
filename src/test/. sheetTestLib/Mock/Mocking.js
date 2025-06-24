 var mocks = [];
 
 const mock = (obj) => {
    let objCalls = [];
    let objReturns = [];
    
    const mockHandler = {
        get(target, prop, receiver) {
            return function (...args) {
              if(typeof prop === 'symbol') return target.name;
              let call = new Call(prop, args); 
              let oCall = objCalls.find(c => c.isEqual(call));
              if(oCall){ 
                oCall.incCount();
              }else{
                objCalls.push(call);
              }
              let ret = objReturns.find(r => r.isEqual(prop, args));
              return ret ? ret.value() : null;
            };
        }
    };

    const returnHandler = {
        get(target, prop, receiver) {
            return function (...args) {
              return {
                thenReturn(value){
                  if(value instanceof MockClass) value = value.mockObj;
                  let exitingRet = objReturns.find(r => r.isEqual(prop, args));
                  if(exitingRet){
                    exitingRet.setValue(value);
                  }else{
                    objReturns.push(new Return(prop, args, value));
                  }
                }
              }
            };
        }
    }

    const verifyHandler = {
        get(target, prop, receiver) {
            return function (...args) {
              return {
                
                calledOnce(){
                    this.called(TIMES.ONCE);
                },

                neverCalled(){
                    let call = objCalls.find(c => c.isEqual(new Call(prop, args)));
                    if(!call){
                        testSucceded(`"${prop}" has not been called as expected`)
                    }else{      
                        testFailed(`"${prop}" expected to not called but it was called`);
                    }
                },

                called(times){
                    if(times === 0) return this.neverCalled();
                    let call = objCalls.find(c => c.isEqual(new Call(prop, args)));
                    if(call){
                        if(!times || times == call.count){
                            testSucceded(`"${prop}" has been called`);
                        }else{
                            testFailed(`"${prop}" has been called, but ${call.count} times instead of the expected ${times}`);
                        }
                    }else{
                        testFailed(`${target.name}.${prop}(${JSON.stringify(args)}) expected to be called but it didn't`);
                        printCalls(target, objCalls);
                    }
                }
              }
            };
        }
    };

    let mockedObj = new Proxy(obj, mockHandler);
    let returnObj = new Proxy(obj, returnHandler);
    let verifyObj = new Proxy(obj, verifyHandler);
    
    if(obj instanceof Sht){
      addSpr(obj.getId(), mockedObj);
    } else if(obj instanceof Rng){
      addRng(obj.getName(), mockedObj);
    } else if(obj instanceof SpSh){
      addSpSh(obj.getId(), mockedObj);
    } else {
      addObj(obj.name, mockedObj);
    }
    let mockClass = new MockClass(mockedObj, returnObj, verifyObj, objCalls, objReturns, obj);
    mocks.push(mockClass);
    return mockClass;
}

const mockSpSh = (spsh) => {
  return mock(new SpSh(spsh, true));
}

const mockSpr = (sht) => {
  return mock(new Sht(sht, true));
}

const mockRng = (rng) => {
  return mock(new Rng(rng, undefined, true));
}

const clearMockCalls = () => {
  mocks.forEach(m => m.clear());
}

const printCalls = (obj, objCalls) => {
    Logger.log('Printing callstack:');
    objCalls.forEach((c) => Logger.log(` - ${obj.name}.${c.prop}(${JSON.stringify(c.args)}) called ${c.count} times`));
}

const when = (mockClass) =>{
    return mockClass.returnObj;
}

const verify = (mockClass) =>{
    return mockClass.verifyObj;
}

const any = () => {
    return 'any';
}