const TEST_METHOD_MARKER = 'should';
const SCENARIO_METHOD_MARKER = 'scenario_';
const TIMEOUT_TRESHOLD_MS = 330000;
const TIMES = {
  ONCE : 1,
  TWICE : 2
}
const STATUS = {
  SUCCESS : 1,
  FAIL: 2,
  ERROR: 3
}

class TestBase{

  constructor(){
    this.utils = new TestUtils(this);
    this.testClassName = this.constructor.name;
    this.findTests();
  }

  findTests(){
    let functions = this.getAllMethodNames(this);
    this.testCases = [...functions].filter(name => name.startsWith(TEST_METHOD_MARKER) ||
                                                   name.startsWith(SCENARIO_METHOD_MARKER));
  }

  runAllTests(){
    try{
      this.start();
      this.runAllTestsCore();
      this.end();
    }catch(e){
      this.timeOut(e);
    }
  }

  runMultipleTestClass(classes){
    try{
      this.start(); 
      this.runMultipleTestClassCore(classes);
      this.end();
    }catch(e){
      this.timeOut(e);
    }
  }

  runAllTestClass(unitTests, sheetTests, acceptanceTests){
    try{
      this.start();
      this.printUpdate('Start running all Unit tests', 'Unit tests');
      this.runMultipleTestClassCore(unitTests);

      this.printUpdate('Start running all Sheet tests', 'Sheet tests');
      this.runMultipleTestClassCore(sheetTests);

      this.printUpdate('Start running all Acceptance tests', 'Acceptance tests');
      this.runMultipleTestClassCore(acceptanceTests);
      this.end();
    }catch(e){
      this.timeOut(e);
    }
  }

  runMultipleTestClassCore(classes){
    classes.forEach((testClass) => {
      let testObj = new testClass();
      testObj.runAllTestsCore();
    });
  }

  runAllTestsCore(){
    if(testData.savedClassCheck(this)) return;
    this.printUpdate(`Start running all test for ${this.testClassName}`, this.testClassName, true);
    try{
      this.beforeAll();
      this.testCases.forEach(test => this.runTest(test));
    }finally{
      this.afterAll();
    }
    console.info(`Test finished for ${this.testClassName}`);
    console.info('⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯');
  }

  runTest(test){
    this.timoutKillSwitch();
    if(testData.savedTestCheck(test.toString())) return;
    this.beforeEach();
    try{
      testData.currentStatus = STATUS.SUCCESS;
      console.log(`Start test: ${testData.currentTest}`);
      try{
        this[test]();
      }catch(e){
        testError(e);
      }
      this.testFinished();
    } finally {
      this.afterEach();
    }
  }

  testFinished(){
    testData.tests++;
    switch(testData.currentStatus){
      case STATUS.SUCCESS : console.info(`Test finished with: ✔️ SUCCESS`); break;
      case STATUS.FAIL : {
        testData.fails++; 
        console.warn('Test finished with: ⚠️ FAILURE');
        break;
      }
      case STATUS.ERROR : {
        testData.errors++; 
        console.warn('Test finished with: ❌ ERROR');
        break;
      }
    }
    console.log('');
    testSheet?.printTestNameAndResult(testData.currentTest, testData.currentStatus);
  }

  start(){
    testSheet?.start();
    testData.start();
  }

  timeOut(e){
    if(e instanceof TimeOutException){
      testSheet?.timeOut();
      console.info('Test runtime reached the treshold, progress got saved.');
      console.info('');
      console.info('Please execute the same test runner again to countinue!');
    }else{
      throw e;
    }
  }

  end(){
    testData.end();
    this.printResults();
    testSheet?.finished();
  }

  beforeAll(){
    clearDm();
  }

  afterAll(){
    clearDm();
    this.clear();
  }

  beforeEach(){
    this.clear();
  }

  afterEach(){}

  clear(){
    this.clearData();
    clearMockCalls();
  }

  clearData(){}

  printUpdate(consoleUpdate, sheetUpdate, isTestName = false){
    if(!testData.savedTest){
      console.info(consoleUpdate);
      console.info('');
      testSheet?.printUpdate(sheetUpdate, isTestName);
    }
  }

  printResults(){
    console.info(`🏁 All test finished! 🏁`);
    console.info(``);
    console.info(`Test run: ${testData.tests} 🎯`);
    console.info(`  🟢 Succeded: ${testData.tests - testData.fails - testData.errors}`);
    console.info(`  🟡 Failed: ${testData.fails}`);
    console.info(`  🔴 Errored: ${testData.errors}`);
    if (testData.messages.length > 0){
      console.info(``);
      console.info(`Test failure messages:`);
      testData.messages.forEach((message) => console.warn(message));
    }
    console.info(``);
    console.info(`Test took: ${testData.durration} ms ⏱️ ( ${testData.getTime().getMinutes()} min and ${testData.getTime().getSeconds()} sec )`);
    console.info(``);
    if(testData.fails + testData.errors >0){
      console.warn(`TEST RESULT : ❌ FAILURE`);
    } else {
      console.info(`TEST RESULT : ✔️ SUCCESS`);
    }
    testSheet?.printSummary(testData);
  }

  getAllMethodNames(obj) {
    let methods = new Set();
    while (obj = Reflect.getPrototypeOf(obj)) {
      let keys = Reflect.ownKeys(obj)
      keys.forEach((k) => methods.add(k));
    }
    return methods;
  }

  timoutKillSwitch(){
    if(testSheet && (testData.getCurrentRunDuration() > TIMEOUT_TRESHOLD_MS)){
      testData.savedClass = testData.currentClass;
      testData.savedTest = testData.currentTest;
      testData.end();
      testSheet.saveProgress();
      throw new TimeOutException();
    } 
  }
}

