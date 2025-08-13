class TutorialService{

  tutorialTestButton(){
    getSpSh(SPSH.ACTIVE).rename(`Calorie Calculator Sheet ${VERSION}`);
  }

  tutorialNext(){
    if(getRng(RNG.TUTORIAL_STEP).getValue() < 10){
      this.tutorialStep(); 
    }else{
      this.resetTutorial();
    }
  }

  resetTutorial(){
    let stepRng = getRng(RNG.TUTORIAL_STEP);
    let sht = getSht(SHT.TUTORIAL);
    sht.setActiveSelectionRng(stepRng);
    sht.hideSheet();
    let positions = getRng(RNG.TUTORIAL_RESET_POS).getRowAsArray();
    let showFrom = positions[0];
    let showTo = positions[1];
    let lastTo = positions[2];
    sht.showRows(showFrom, showTo - showFrom);
    sht.hideRows(showTo + 1, lastTo - (showTo + 1));
    stepRng.setValue(0);
  }

  tutorialStep(){
    let stepRng = getRng(RNG.TUTORIAL_STEP);
    let sht = getSht(SHT.TUTORIAL);
    let positions = getRng(RNG.TUTORIAL_NEXT_POS).getRowAsArray();
    let showFrom = positions[0];
    let showTo = positions[1];
    sht.hideRows(2, showFrom-1);
    sht.showRows(showFrom, showTo - showFrom);
    stepRng.setValue(stepRng.getValue() + 1);
    sht.setActiveSelectionRng(stepRng);
  }
}
