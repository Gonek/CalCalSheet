class TestData{
  constructor(){
    this.tests = 0;
    this.fails = 0;
    this.errors = 0;
    this.messages = [];
    this.startTime = 0;
    this.durration = 0;
    this.time;
    this.currentStatus;
    this.currentClass;
    this.currentTest;
    this.savedClass;
    this.savedTest;
    this.isAcceptanceTest;
    this.isTestInProgress = false;
  }

  load(testData){
    this.tests = testData.tests;
    this.fails = testData.fails;
    this.errors = testData.errors;
    this.messages = testData.messages;
    this.startTime = new Date();
    this.durration = testData.durration;
    this.savedClass = testData.savedClass;
    this.savedTest = testData.savedTest;
  }

  error(message){
    this.messages.push(`${this.currentClass}.${this.currentTest} : ${message}`);
  }

  start(){
    this.startTime = new Date();
    this.isTestInProgress = true;
  }

  end(){
    this.durration = this.durration + this.getCurrentRunDuration();
    this.isTestInProgress = false;
  }

  savedClassCheck(testClass){
    this.currentClass = testClass.constructor.name;
    this.isAcceptanceTest = testClass instanceof AcceptanceTestBase;
    return this.savedClass && this.savedClass != this.currentClass;
  }

  savedTestCheck(test){
    this.currentTest = test;
    if(this.savedTest && this.savedTest != test) {
      return true;
    }else{
      this.savedClass = '';
      this.savedTest = '';
      return false;
    }
  }

  getCurrentRunDuration(){
    return new Date() - this.startTime;
  }

  getTime(){
    return this.time = this.time || new Date(testData.durration);
  }
}

var testData = new TestData();