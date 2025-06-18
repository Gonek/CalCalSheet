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

  inc(success){
    this.tests++;
    if(!success) this.fails++;
  }

  error(message){
    this.messages.push(`${this.currentClass}.${this.currentTest} : ${message}`);
  }

  start(){
    this.startTime = new Date();
  }

  end(){
    this.durration = this.durration + this.getCurrentRunDuration();
  }

  savedClassCheck(testClassName){
    this.currentClass = testClassName;
    return this.savedClass && this.savedClass != testClassName;
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