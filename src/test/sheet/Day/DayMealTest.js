class DayMealTest extends TestBaseDay {

  constructor(){
    super();
    this.mealsSpr = getSpr(SPR.MEALS);
    this.daysSpr = getSpr(SPR.DAYS);
    this.meal1StartRng = getRng(CBOX.MEAL_1_START);
    this.selectedMealNameRng = getRng(RNG.SELECTED_MEAL_NAME);
    this.selectedMealItemsRng = getRng(RNG.SELECTED_MEAL_ITEMS);
  }

  beforeAll(){
    super.beforeAll();
    this.utils.addTestMeals();
  }

  afterAll(){
    super.afterAll();
    this.utils.clearMeals();
  }

  shouldDaySheetLoadAllSavedMealsAndItemsInTheFirstItemSelectorInEveryMeal(){
    //GIVEN
    let expected = [`${MEAL_ICON} Meal0`, `${MEAL_ICON} Meal1`, `${MEAL_ICON} Meal2`,
    '1 First', '2 Second', '3 Third', 'All 100', 'All 1', 'All Green', 'Green', 'Max cal', 'Red', 'Test 100g', 'Test 1 serving', 'Yellow', 'Zero cal', 'ZZ Last'];
    //WHEN
    let result1 = this.daySpr.getValidationCriteriaRangeValues('C15');
    let result2 = this.daySpr.getValidationCriteriaRangeValues('C30');
    let result3 = this.daySpr.getValidationCriteriaRangeValues('C45');
    let result4 = this.daySpr.getValidationCriteriaRangeValues('C60');
    let result5 = this.daySpr.getValidationCriteriaRangeValues('C75');
    let result6 = this.daySpr.getValidationCriteriaRangeValues('C90');
    //THEN
    this.assertEquals(result1, expected);
    this.assertEquals(result2, expected);
    this.assertEquals(result3, expected);
    this.assertEquals(result4, expected);
    this.assertEquals(result5, expected);
    this.assertEquals(result6, expected);
  }

  shouldDaySheetLoadMealNameOfSelectedMealInBackground(){
    //GIVEN
    let expected = `${MEAL_ICON} Meal1`;
    //WHEN
    this.meal1StartRng.setValue(`${MEAL_ICON} Meal1`);
    let result = this.selectedMealNameRng.getValue();
    //THEN
    this.assertEquals(result, expected);
  }

  shouldDaySheetLoadAllItemsOfSelectedMealInBackground(){
    //GIVEN
    let expected = [
      ['1 First', 10],
      ['2 Second', 20],
      ['3 Third', 30],
      ['ZZ Last', 99],
      ['1 First', 110],
      ['2 Second', 120],
      ['3 Third', 130],
      ['ZZ Last', 199],
      ['1 First', 210],
      ['2 Second', 220],
      ['3 Third', 230],
      ['ZZ Last', 299],
      ['1 First', 310],
      ['2 Second', 320],
      ['3 Third', 330]
    ];
    //WHEN
    this.meal1StartRng.setValue(`${MEAL_ICON} Meal1`);
    let result = this.selectedMealItemsRng.getValues();
    //THEN
    this.assertEquals(result, expected);
  }

  shouldDaySheetMealBackgroundItemsStayEmptyIfNoMealSelectedInBackground(){
    //GIVEN WHEN
    this.meal1StartRng.setValue(`Green`);
    let result = this.selectedMealItemsRng.getValues();
    //THEN
    this.assertArrayEmpty(result);
  }
}

var runDayMealTests = () => new DayMealTest().runAllTests();