class TutorialServiceTest extends TestBase {

    beforeAll(){
        super.beforeAll();
        this.activeSpSh = mockSpSh(SPSH.ACTIVE);
        this.tutorialSht = mockSht(SHT.TUTORIAL);
        this.tutorialStepRng = mockRng(RNG.TUTORIAL_STEP);
        this.tutorialNextPosRng = mockRng(RNG.TUTORIAL_NEXT_POS);
        this.tutorialResetPosRng = mockRng(RNG.TUTORIAL_RESET_POS);

        this.tutorialService = new TutorialService();
    }

    shouldTutorialTestButton(){
        // WHEN
        this.tutorialService.tutorialTestButton();
        // THEN
        verify(this.activeSpSh).rename('Calorie Calculator Sheet v1.6').calledOnce();
    }

    shouldTutorialNextSetTutorialPageToTheNextSectionIfCurrentStepLessThenTen(){
        // GIVEN
        when(this.tutorialStepRng).getValue().thenReturn(2);
        when(this.tutorialNextPosRng).getRowAsArray().thenReturn([25,75]);
        // WHEN
        this.tutorialService.tutorialNext();
        // THEN
        verify(this.tutorialSht).hideRows(2,24).calledOnce();
        verify(this.tutorialSht).showRows(25,50).calledOnce();
        verify(this.tutorialStepRng).setValue(3).calledOnce();
        verify(this.tutorialSht).setActiveSelectionRng(this.tutorialStepRng).calledOnce();
    }

    shouldTutorialNextResetTutorialPageIfCurrentStepIsTen(){
        // GIVEN
        when(this.tutorialStepRng).getValue().thenReturn(10);
        when(this.tutorialResetPosRng).getRowAsArray().thenReturn([1, 10, 100]);
        // WHEN
        this.tutorialService.tutorialNext();
        // THEN
        verify(this.tutorialSht).setActiveSelectionRng(this.tutorialStepRng).calledOnce();
        verify(this.tutorialSht).hideSheet().calledOnce();
        verify(this.tutorialSht).showRows(1,9).calledOnce();
        verify(this.tutorialSht).hideRows(11,89).calledOnce();
        verify(this.tutorialStepRng).setValue(0).calledOnce();
    }

    shouldResetTutorialHideAndResetTutorialPage(){
        // GIVEN
        when(this.tutorialResetPosRng).getRowAsArray().thenReturn([1, 10, 100]);
        // WHEN
        this.tutorialService.resetTutorial();
        // THEN
        verify(this.tutorialSht).setActiveSelectionRng(this.tutorialStepRng).calledOnce();
        verify(this.tutorialSht).hideSheet().calledOnce();
        verify(this.tutorialSht).showRows(1,9).calledOnce();
        verify(this.tutorialSht).hideRows(11,89).calledOnce();
        verify(this.tutorialStepRng).setValue(0).calledOnce();
    }
}

var runTutorialServiceTests = () => new TutorialServiceTest().runAllTests();