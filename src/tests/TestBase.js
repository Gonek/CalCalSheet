const TEST_METHOD_MARKER = 'should';

class TestBase{

  constructor(){
    this.utils = new TestUtils(this);
    this.initVariables();
    this.findTests();
  }

  initVariables(){
    this.result = new testResult();
    this.actualTest = "";
    this.actualSuccess = true;
    this.testClassName = this.constructor.name;
  }

  findTests(){
    let functions = this.getAllMethodNames(this);
    this.testCases = [...functions].filter(name => name.startsWith(TEST_METHOD_MARKER));
  }

  runAllTests(){
    this.result.start();
    this.runAllTestsCore();
    this.result.end();
    this.printResults();
  }

  runAllTestsCore(){
    Logger.log(`Start running all test for ${this.testClassName}`);
    try{
      this.beforeAll();
      this.testCases.forEach(test => this.runTest(test));
    } finally {
      this.afterAll();
    }
    Logger.log(`Test finished for ${this.testClassName}`);
    return this.result;
  }

  runMultipleTestClass(classes){
    this.result.start();
    classes.forEach((testClass) => this.result.add(testClass.runAllTestsCore()));
    this.result.end();
    this.printResults();
  }

  beforeAll(){}

  afterAll(){
    this.clear();
  }

  beforeEach(){
    this.clear();
  }

  afterEach(){}

  clear(){
    this.clearData();
  }

  clearData(){}

  runTest(test){
    this.beforeEach();
    try{
      this.actualTest = test.toString();
      this.actualSuccess = true;
      Logger.log(`Start test: ${this.actualTest}`);
      this[test]();
      Logger.log(`Test finished with: ${this.actualSuccess ? "SUCCESS" : "FAILURE"}`);
      Logger.log(``);
      this.result.inc(this.actualSuccess);
    } finally {
      this.afterEach();
    }
  }

  assertEquals(result, expected){
    if(result.toString() == expected.toString()) {
      this.succeded(`result is equal to expected`);
    }else{
      this.failed(`"${result}" expected to be "${expected}"`);
    }
  }

  assertEmpty(result){
    if(result){
      if(result.toString() == ""){
        this.succeded(`Result is empty!`);
      }else{
        this.failed(`Result expected to be empty, but it was ${result}`);
      }
    }else{
      this.failed(`Result expected to be empty, but were null/undefined`);
    }
  }

  assertArrayEmpty(result){
    if(result){
      if(clear(result).length == 0){
        this.succeded(`Result is empty!`);
      }else{
        this.failed(`Result expected to be empty, but it was ${result}`);
      }
    }else{
      this.failed(`Result expected to be empty, but were null/undefined`);
    }
  }

  assertNotEmpty(result){
    if(result){
      if(result.toString() !== ""){
        this.succeded(`Result is not empty!`);
      }else{
        this.failed(`Result expected to be not empty`);
      }
    }else{
      this.failed(`Result expected to be not empty, but were null/undefined`);
    }
  }

  assertNoException(test, needFlush = false){
    try{
      test();
      if(needFlush) SpreadsheetApp.flush();
      this.succeded('No exception occured');
    }catch(e){
      this.failed(`No exception expected, but there was ${e}!`);
    }
  }

  assertException(test, needFlush = false, exception = undefined){
    try{
      test();
      if(needFlush) SpreadsheetApp.flush();
      this.failed('Exception expected, but there was none!');
    }catch(e){
      if(exception){
        if(e instanceof exception){
          this.succeded('Expected type of exception occured');
        }else{
          this.failed(`${e} occured but ${exception} was expected`);
        }
      }else{
        this.succeded('Exception occured');
      }
    }
  }

  succeded(message){
    Logger.log(`OK! ${message}`);
  }

  failed(message){
    this.actualSuccess = false;
    Logger.log(`FAIL! ${message}`);
    this.result.error(this.actualTest, message);
  }

  printResults(result = this.result){
    Logger.log(``);
    Logger.log(`All test finished!`);
    Logger.log(``);
    Logger.log(`Test run: ${result.tests} Succeded: ${result.tests - result.fails} Failed: ${result.fails}`);
    if (result.messages.length > 0){
      Logger.log(`Test failure messages:`);
      result.messages.forEach((message) => Logger.log(message));
    }
    Logger.log(`Test took : ${result.durration} ms`);
    Logger.log(``);
    Logger.log(`TEST RESULT : ${result.fails>0 ? 'FAILURE' : 'SUCCESS'}`);
  }

  getAllMethodNames(obj) {
    let methods = new Set();
    while (obj = Reflect.getPrototypeOf(obj)) {
      let keys = Reflect.ownKeys(obj)
      keys.forEach((k) => methods.add(k));
    }
    return methods;
  }
}

var runAllTest = () => {
  new TestBase().runMultipleTestClass([
    new DayItemsTest,
    new DaySummaryTest,
    new DayButtonsTest,
    new DayMealTest,
    new NewItemTest,
    new RecipeCalculatorTest,
    new ProfileTest,
    new HistoryTest,
    new SettingsTest
  ]);
}