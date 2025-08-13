class testResult{
  constructor(){
    this.tests = 0;
    this.fails = 0;
    this.messages = [];
    this.startTime = 0;
    this.durration = 0;
  }

  inc(success){
    this.tests++;
    if(!success) this.fails++;
  }

  error(actualTest, message){
    this.messages.push(`${actualTest} : ${message}`);
  }

  start(){
    this.startTime = new Date();
  }

  end(){
    this.durration = new Date() - this.startTime;
  }

  add(testResult){
    this.tests = this.tests + testResult.tests;
    this.fails = this.fails + testResult.fails;
    this.messages = this.messages.concat(testResult.messages);
  }
}