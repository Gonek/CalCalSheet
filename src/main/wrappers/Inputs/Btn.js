class Btn extends Input{

  isEventInProgress(){
    return this.getRng().getValue();
  }

  run(){
    try{
      super.run();
    } catch (error) {
      alert(error);
    } finally {
      this.resetButton();
    }
  }

  resetButton(){
    this.rng.setValue(false);
  }
}
