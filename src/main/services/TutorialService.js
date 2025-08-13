class TutorialService{

  constructor(){
    this.spr = new Spr(TUTORIAL);
    this.stepRng = new Rng(RNG_TUTORIAL_STEP);
  }

  tutorialAllow(){
    SpreadsheetApp.getActiveSpreadsheet().rename(SHEET_DEFAULT_NAME);
    let statusField = new Rng(RNG_TUTORIAL_STATUS);
    statusField.setValue('Success!');
    this.spr.setActiveSelectionRng(statusField);
  }

  tutorialNext(){
    var step = this.stepRng.getValue();
    if(step == 0) this.spr.hideButton(TUTORIAL_ALLOW_BUTTON_INDEX);
    if(step < TUTORIAL_PAGES){
      this.tutorialStep(step+1); 
    }else{
      this.resetTutorial();
    }
  }

  tutorialStep(nextStep){
    let showFrom = this.spr.find(`${nextStep}${TUTORIAL_BLOCK_START_MARKER}`).getRow();
    let showTo = this.spr.find(`${nextStep}${TUTORIAL_BLOCK_END_MARKER}`).getRow();

    this.spr.moveButton(TUTORIAL_NEXT_BUTTON_INDEX, showTo, 10, 0, 0);
    this.spr.moveButton(TUTORIAL_SKIP_BUTTON_INDEX, showTo, 2, 0, 0); 
    this.spr.hideRows(2, showFrom-1);
    this.spr.showRows(showFrom, showTo - showFrom);
    this.stepRng.setValue(nextStep);
    this.spr.setActiveSelectionRng(this.stepRng);
  }

  resetTutorial(){
    this.spr.setActiveSelectionRng(this.stepRng);
    this.spr.hideSheet();
    this.spr.moveButton(TUTORIAL_ALLOW_BUTTON_INDEX, 26, 7, -40, 0);
    let showFrom = this.spr.find(`0${TUTORIAL_BLOCK_START_MARKER}`).getRow();
    let showTo = this.spr.find(`0${TUTORIAL_BLOCK_END_MARKER}`).getRow();
    this.spr.showRows(showFrom, showTo - showFrom);
    this.spr.hideRows(showTo +1, 513);
    this.spr.moveButton(TUTORIAL_NEXT_BUTTON_INDEX, showTo, 10, 0, 0);
    this.spr.moveButton(TUTORIAL_SKIP_BUTTON_INDEX, showTo, 2, 0, 0); 
    this.stepRng.setValue(0);
  }
}

// SERVICE SINGLETON
var tutorialServiceSingelton;

/** 
 * Returns the tutorial service
 * @returns {TutorialService} tutorial service singleton
 */
var tutorialService = () => tutorialServiceSingelton = tutorialServiceSingelton || new TutorialService();
