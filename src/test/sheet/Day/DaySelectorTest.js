class DaySelectorTest extends TestBaseDay {

  constructor(){
    super();
    this.daysSpr = getSpr(SPR.DAYS);
    this.dayNameRng = getRng(CBOX.DAY_NAME);
    this.selectedDayItemsRng = getRng(RNG.SELECTED_DAY_ITEMS);
    this.days = this.dayNameRng.getValidationCriteriaRangeValues();
    // MEAL FUNCTIONS
    this.copyMealFromRng = getRng(RNG.COPY_MEAL_FROM);
    this.copyMealFromMealIdsRng = getRng(RNG.COPY_MEAL_FROM_MEAL_IDS);
    this.copyMealToRng = getRng(RNG.COPY_MEAL_TO);
    this.copyMealToRowsRng = getRng(RNG.COPY_MEAL_TO_ROWS);
    this.saveMealFromRng = getRng(RNG.SAVE_MEAL_FROM);
    this.saveMealFromMealIdRng = getRng(RNG.SAVE_MEAL_FROM_MEAL_ID);
    this.saveMealAsRng = getRng(RNG.SAVE_MEAL_AS);
  }

  beforeAll(){
    super.beforeAll();
    this.utils.addTestDays();
  }

  afterAll(){
    super.afterAll();
    this.dayNameRng.setValue(this.days[3]);
    this.copyMealFromRng.clear()
    this.copyMealToRng.clear();
    this.saveMealFromRng.clear();
    this.saveMealAsRng.clear();
    this.utils.clearDays();
  }

  shouldDaySheetHaveTheCorrectFormulaForDaySelectorBackgroudCalculatons(){
    // GIVEN
    let expected = [
      `=OFFSET(Days!$B$3, DayIndex, 0, 15, 2)`, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
      `=OFFSET(Days!$D$3, DayIndex, 0, 15, 2)`, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
      `=OFFSET(Days!$F$3, DayIndex, 0, 15, 2)`, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
      `=OFFSET(Days!$H$3, DayIndex, 0, 15, 2)`, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
      `=OFFSET(Days!$J$3, DayIndex, 0, 15, 2)`, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
      `=OFFSET(Days!$L$3, DayIndex, 0, 15, 2)`, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''
      ];

    // WHEN
    let result = this.selectedDayItemsRng.getFormulas();

    // THEN
    assertEquals(result, expected);
  }

  shouldDaySheetHaveTheCorrectFormulaForMealFunctionsBackgroudCalculatons(){
    // GIVEN
    let expectedCopyMealFromMealIds = '=IFERROR(JOIN(",", MAP(SPLIT(CopyMealFrom, ", ", FALSE), LAMBDA(meal,LEFT(Meal, 1)))))';
    let expectedCopyMealToRows = '=IFERROR(JOIN(",", MAP(SPLIT(CopyMealTo, ", ", FALSE), LAMBDA(date, MATCH(IF(date = "Default", date, DATEVALUE(RIGHT(date, 10))), Days!A1:A, 0)))))';
    let expectedSaveMealFromMealId = '=LEFT(SaveMealFrom,1)';

    // WHEN
    let resultCopyMealFromMealIds = this.copyMealFromMealIdsRng.getFormulas();
    let resultCopyMealToRows = this.copyMealToRowsRng.getFormulas();
    let resultSaveMealFromMealId = this.saveMealFromMealIdRng.getFormulas();

    // THEN
    assertEquals(resultCopyMealFromMealIds, expectedCopyMealFromMealIds);
    assertEquals(resultCopyMealToRows, expectedCopyMealToRows);
    assertEquals(resultSaveMealFromMealId, expectedSaveMealFromMealId);
  }

  shouldDaySheetLoadSelectedDayItemsInBackground(){
    // GIVEN
    let expected = Array.from({length:90},(v,k)=>['All 1', k+1]);
    let originalDay = this.dayNameRng.getValue();
    this.dayNameRng.setValue(this.days[2]);

    // WHEN
    let result = this.selectedDayItemsRng.getValues();

    // THEN
    assertEquals(result, expected);

    // RESET
    this.dayNameRng.setValue(originalDay);
  }

  shouldDaySheetCalculateCopyMealsBackgroundFieldsCorrectly(){
    // GIVEN
    let expectedCopyMealFromMealIds = '1,2,3';
    let expectedCopyMealToRows = '19,49,79';
    this.copyMealFromRng.setValue('1. Breakfast, 2. Snack, 3. Lunch');
    this.copyMealToRng.setValue(`${this.days[1]}, ${this.days[3]}, ${this.days[5]}`);

    // WHEN
    let resultCopyMealFromMealIds = this.copyMealFromMealIdsRng.getValue();
    let resultCopyMealToRows = this.copyMealToRowsRng.getValue();

    // THEN
    assertEquals(resultCopyMealFromMealIds, expectedCopyMealFromMealIds);
    assertEquals(resultCopyMealToRows, expectedCopyMealToRows);
  }

  shouldDaySheetCalculateSaveMealBackgroundFieldCorrectly(){
    // GIVEN
    let expected = 3;
    this.saveMealFromRng.setValue('3. Lunch');
    // WHEN
    let result = this.saveMealFromMealIdRng.getValue();
    // THEN
    assertEquals(result, expected);
  }
}

var runDaySelectorTests = () => new DaySelectorTest().runAllTests();