class DayButtonsTest extends TestBaseToday {

  constructor(){
    super();
    this.yesterdaySpr = new Spr(YESTERDAY);
    this.dayBaseSpr = new Spr(DAY_BASE);
  }

  shouldTodaySheetHaveFinishDayButtonVisibleAndCopyMealButtonsHidden(){
    // GIVEN
    let expectedFinalPos = [2, 1, -2, 10];
    let expectedCopyButtonPos = Array(6).fill(this.hiddenButton());
    // WHEN
    let resultFinishPos = [this.daySpr.getButton(FINISH_BUTTON_INDEX).getContainerInfo()]
                          .map(c => [c.getAnchorColumn(), c.getAnchorRow(), c.getOffsetX(), c.getOffsetY()]);;
    let resultCopyButtonPos = Array
        .from({length:6},(v,k) => this.daySpr.getButton(k+1).getContainerInfo())
        .map(c => [c.getAnchorColumn(), c.getAnchorRow(), c.getOffsetX(), c.getOffsetY()]);
    // THEN
    this.assertEquals(resultFinishPos, expectedFinalPos);
    this.assertEquals(resultCopyButtonPos, expectedCopyButtonPos);
  }

  shouldDayBaseSheetHaveFinishDayButtonAndCopyMealButtonsHidden(){
    // GIVEN
    let expectedFinalPos = this.hiddenButton();
    let expectedCopyButtonPos = Array(6).fill(this.hiddenButton());
    // WHEN
    let resultFinishPos = [this.dayBaseSpr.getButton(FINISH_BUTTON_INDEX).getContainerInfo()]
                          .map(c => [c.getAnchorColumn(), c.getAnchorRow(), c.getOffsetX(), c.getOffsetY()]);;
    let resultCopyButtonPos = Array
        .from({length:6},(v,k) => this.dayBaseSpr.getButton(k+1).getContainerInfo())
        .map(c => [c.getAnchorColumn(), c.getAnchorRow(), c.getOffsetX(), c.getOffsetY()]);
    // THEN
    this.assertEquals(resultFinishPos, expectedFinalPos);
    this.assertEquals(resultCopyButtonPos, expectedCopyButtonPos);
  }

  shouldYesterdaySheetHaveFinishDayButtonHiddenAndCopyMealButtonsVisible(){
    // GIVEN
    let expectedFinalPos = this.hiddenButton();
    let expectedCopyButtonPos = [
      [8,4,-2,-2],
      [8,5,-2,-2],
      [8,6,-2,-2],
      [8,7,-2,-2],
      [8,8,-2,-2],
      [8,9,-2,-2]
    ];
    // WHEN
    let resultFinishPos = [this.yesterdaySpr.getButton(FINISH_BUTTON_INDEX).getContainerInfo()]
                          .map(c => [c.getAnchorColumn(), c.getAnchorRow(), c.getOffsetX(), c.getOffsetY()]);;
    let resultCopyButtonPos = Array
        .from({length:6},(v,k) => this.yesterdaySpr.getButton(k+1).getContainerInfo())
        .map(c => [c.getAnchorColumn(), c.getAnchorRow(), c.getOffsetX(), c.getOffsetY()]);
    // THEN
    this.assertEquals(resultFinishPos, expectedFinalPos);
    this.assertEquals(resultCopyButtonPos, expectedCopyButtonPos);
  }

  hiddenButton(){
    return [1,1,0,-150]
  }
}

var runDayButtonsTests = () => new DayButtonsTest().runAllTests();