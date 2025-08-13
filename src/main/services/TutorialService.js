// INTERFACE

var tutorialTestButton = () => tutorialService().tutorialTestButton();
var tutorialNext = () => tutorialService().tutorialNext();
var skipTutorial = () => tutorialService().resetTutorial();

//CLASS

class TutorialService{

  constructor(){
    this.spr = new Spr(TUTORIAL);
    this.stepRng = new Rng(RNG_TUTORIAL_STEP);
  }

  tutorialTestButton(){
    SpreadsheetApp.getActiveSpreadsheet().rename(SHEET_DEFAULT_NAME);
  }

  tutorialNext(){
    var step = this.stepRng.getValue();
    if(step < TUTORIAL_PAGES){
      this.tutorialStep(step+1); 
    }else{
      this.resetTutorial();
    }
  }

  tutorialStep(nextStep){
    let showFrom = this.spr.find(`${nextStep}${TUTORIAL_BLOCK_START_MARKER}`).getRow();
    let showTo = this.spr.find(`${nextStep}${TUTORIAL_BLOCK_END_MARKER}`).getRow();
    this.spr.hideRows(2, showFrom-1);
    this.spr.showRows(showFrom, showTo - showFrom);
    this.stepRng.setValue(nextStep);
    this.spr.setActiveSelectionRng(this.stepRng);
  }

  resetTutorial(){
    this.spr.setActiveSelectionRng(this.stepRng);
    this.spr.hideSheet();
    let showFrom = this.spr.find(`0${TUTORIAL_BLOCK_START_MARKER}`).getRow();
    let showTo = this.spr.find(`0${TUTORIAL_BLOCK_END_MARKER}`).getRow();
    let lastTo = this.spr.find(`${TUTORIAL_PAGES}${TUTORIAL_BLOCK_END_MARKER}`).getRow();
    this.spr.showRows(showFrom, showTo - showFrom);
    this.spr.hideRows(showTo + 1, lastTo - (showTo + 1));
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
