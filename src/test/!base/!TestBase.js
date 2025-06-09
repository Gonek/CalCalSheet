const TEST_METHOD_MARKER = 'should';
const SCENARIO_METHOD_MARKER = 'scenario_';
const TIMES = {
  ONCE : 1,
  TWICE : 2
}
var sheetTests = () => [
    DayItemsTest,
    DayHeaderTest,
    DayMealTest,
    DaySelectorTest,
    DaysTest,
    NewItemTest,
    RecipeCalculatorTest,
    ProfileTest,
    HistoryTest,
    SettingsTest];
var unitTests = () => [
    DayRepositoryTest,
    HistoryRepositoryTest,
    ItemRepositoryTest,
    MealRepositoryTest,
    RecipeRepositoryTest,
    DayServiceTest,
    EventServiceTest,
    ImportServiceTest,
    NewItemServiceTest,
    ProfileServiceTest,
    RecipeCalculatorServiceTest,
    SettingsServiceTest,
    TutorialServiceTest];
var acceptanceTests = () => [
    NewItemScenarios
];

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
    this.mocks = [];
  }

  findTests(){
    let functions = this.getAllMethodNames(this);
    this.testCases = [...functions].filter(name => name.startsWith(TEST_METHOD_MARKER) ||
                                                   name.startsWith(SCENARIO_METHOD_MARKER));
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
    classes.forEach((testClass) => {
      let testObj = new testClass();
      this.result.add(testObj.runAllTestsCore());
    });
    this.result.end();
    this.printResults();
  }

  beforeAll(){}

  afterAll(){
    this.clear();
    clearDm();
  }

  beforeEach(){
    this.clear();
  }

  afterEach(){}

  clear(){
    this.clearData();
    this.clearMockCalls();
  }

  clearData(){}

  runTest(test){
    this.beforeEach();
    try{
      this.actualTest = test.toString();
      this.actualSuccess = true;
      console.log(`Start test: ${this.actualTest}`);
      try{
        this[test]();
      }catch(e){
        this.error(e);
      }
      if(this.actualSuccess){
        console.info(`Test finished with: SUCCESS`);
      } else {
        console.warn(`Test finished with: FAILURE`);
      }
      console.log(``);
      this.result.inc(this.actualSuccess);
    } finally {
      this.afterEach();
    }
  }

  assertTrue(result){
    if(result) {
      this.succeded(`Result is true as expected`);
    }else{
      this.failed(`Result is false`);
    }
  }

  assertFalse(result){
    if(!result) {
      this.succeded(`Result is false as expected`);
    }else{
      this.failed(`Result is true`);
    }
  }

  assertEquals(result, expected){
    if(result.toString() == expected.toString()) {
      this.succeded(`result is equal to expected`);
    }else{
      this.failed(`"${result}" expected to be "${expected}"`);
    }
  }

  assertEqualsArray(result, expected){
    if(arraysEqual(result, expected)) {
      this.succeded(`result is equal to expected`);
    }else{
      this.failed(`"${JSON.stringify(result)}" expected to be "${JSON.stringify(expected)}"`);
    }
  }

  assertNull(result){
    if(result === undefined || result === null){
      this.succeded(`Result is null!`);
    }else{
      this.failed(`Result expected to be null, but it was ${result}`);
    }
  }

  assertEmpty(result){
    if(result !== undefined || result !== null){
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
    if(!this instanceof AcceptanceTestBase){
      console.info(`OK! ${message}`);
    }
  }

  failed(message){
    this.actualSuccess = false;
    console.warn(`FAIL! ${message}`);
    this.result.error(this.actualTest, message);
  }

  error(message){
    this.actualSuccess = false;
    console.warn(`ERROR! ${message}`);
    this.result.error(this.actualTest, message);
  }


  printResults(result = this.result){
    console.log(``);
    console.log(`All test finished!`);
    console.log(``);
    console.log(`Test run: ${result.tests} Succeded: ${result.tests - result.fails} Failed: ${result.fails}`);
    if (result.messages.length > 0){
      console.warn(`Test failure messages:`);
      result.messages.forEach((message) => console.warn(message));
    }
    console.log(`Test took : ${result.durration} ms`);
    console.log(``);
    if(result.fails>0){
      console.warn(`TEST RESULT : FAILURE`);
    } else {
      console.info(`TEST RESULT : SUCCESS`);
    }
  }

  getAllMethodNames(obj) {
    let methods = new Set();
    while (obj = Reflect.getPrototypeOf(obj)) {
      let keys = Reflect.ownKeys(obj)
      keys.forEach((k) => methods.add(k));
    }
    return methods;
  }

  registerMock(mockObj) {
    this.mocks.push(mockObj);
  }

  clearMockCalls(){
    this.mocks.forEach(m => m.clear());
  }
}

var runAllUnitTests = () =>{
  new TestBase().runMultipleTestClass(unitTests());
}

var runAllSheetTests = () =>{
  new TestBase().runMultipleTestClass(sheetTests());
}

var runAllAcceptance = () =>{
  new TestBase().runMultipleTestClass(acceptanceTests());
}

var runAllTest = () => {
  new TestBase().runMultipleTestClass(unitTests().concat(sheetTests(), acceptanceTests()));
}