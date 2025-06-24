class Btn extends Input{

  isEventInProgress(){
    return this.getRng().getValue();
  }

  run(){
    try{
      super.run();
    } catch (error) {
      if(!testData?.isTestInProgress){
        alert(error + " " + error.stack);
      }else{
        throw error;
      }
    } finally {
      this.resetButton();
    }
  }

  resetButton(){
    this.rng.setValue(false);
  }
}
