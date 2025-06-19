function assertTrue(result){
  if(result) {
    testSucceded(`Result is true as expected`);
  }else{
    testFailed(`Result is false`);
  }
}

function assertFalse(result){
  if(!result) {
    testSucceded(`Result is false as expected`);
  }else{
    testFailed(`Result is true`);
  }
}

function assertEquals(result, expected){
  if(result.toString() == expected.toString()) {
    testSucceded(`result is equal to expected`);
  }else{
    testFailed(`"${result}" expected to be "${expected}"`);
  }
}

function assertEqualsArray(result, expected){
  if(arraysEqual(result, expected)) {
    testSucceded(`result is equal to expected`);
  }else{
    testFailed(`"${JSON.stringify(result)}" expected to be "${JSON.stringify(expected)}"`);
  }
}

function assertNull(result){
  if(result === undefined || result === null){
    testSucceded(`Result is null!`);
  }else{
    testFailed(`Result expected to be null, but it was ${result}`);
  }
}

function assertEmpty(result){
  if(result !== undefined || result !== null){
    if(result.toString() == ""){
      testSucceded(`Result is empty!`);
    }else{
      testFailed(`Result expected to be empty, but it was ${result}`);
    }
  }else{
    testFailed(`Result expected to be empty, but were null/undefined`);
  }
}

function assertArrayEmpty(result){
  if(result){
    if(clear(result).length == 0){
      testSucceded(`Result is empty!`);
    }else{
      testFailed(`Result expected to be empty, but it was ${result}`);
    }
  }else{
    testFailed(`Result expected to be empty, but were null/undefined`);
  }
}

function assertNotEmpty(result){
  if(result){
    if(result.toString() !== ""){
      testSucceded(`Result is not empty!`);
    }else{
      testFailed(`Result expected to be not empty`);
    }
  }else{
    testFailed(`Result expected to be not empty, but were null/undefined`);
  }
}

function assertNoException(test, needFlush = false){
  try{
    test();
    if(needFlush) SpreadsheetApp.flush();
    testSucceded('No exception occured');
  }catch(e){
    testFailed(`No exception expected, but there was ${e}!`);
  }
}

function assertException(test, needFlush = false, exception = undefined){
  try{
    test();
    if(needFlush) SpreadsheetApp.flush();
    testFailed('Exception expected, but there was none!');
  }catch(e){
    if(exception){
      if(e instanceof exception){
        testSucceded('Expected type of exception occured');
      }else{
        testFailed(`${e} occured but ${exception} was expected`);
      }
    }else{
      testSucceded('Exception occured');
    }
  }
}

function testSucceded(message){
  if(!(testData.isAcceptanceTest)){
    console.info(`🟢 ${message}`);
  }
}

function testFailed(message){
  testData.currentStatus = STATUS.FAIL;
  console.warn(`🟡 FAIL!: ${message}`);
  testData.error(message);
}

function testError(message){
  testData.currentStatus = STATUS.ERROR;
  console.warn(`🔴 ERROR!: ${message}`);
  testData.error(message);
}