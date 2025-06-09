 const mock = (obj, owner) => {
    let base = owner;
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
                        base.succeded(`"${prop}" has not been called as expected`)
                    }else{      
                        base.failed(`"${prop}" expected to not called but it was called`);
                    }
                },

                called(times){
                    if(times === 0) return this.neverCalled();
                    let call = objCalls.find(c => c.isEqual(new Call(prop, args)));
                    if(call){
                        if(!times || times == call.count){
                            base.succeded(`"${prop}" has been called`);
                        }else{
                            base.failed(`"${prop}" has been called, but ${call.count} times instead of the expected ${times}`);
                        }
                    }else{
                        base.failed(`${target.name}.${prop}(${JSON.stringify(args)}) expected to be called but it didn't`);
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
    
    if(obj instanceof Spr){
      addSpr(obj.getName(), mockedObj);
    } else if(obj instanceof Rng){
      addRng(obj.getName(), mockedObj);
    } else if(obj instanceof SpSh){
      addSpSh(obj.getId(), mockedObj);
    } else {
      addObj(obj.name, mockedObj);
    }
    let mockClass = new MockClass(mockedObj, returnObj, verifyObj, objCalls, objReturns, obj);
    base.registerMock(mockClass);
    return mockClass;
}

const mockSpSh = (spsh, owner) => {
  return mock(new SpSh(spsh, true), owner);
}

const mockSpr = (spr, owner) => {
  return mock(new Spr(spr, true), owner);
}

const mockRng = (rng, owner) => {
  return mock(new Rng(rng, undefined, true), owner);
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