class DayMealTest extends TestBaseToday {

  constructor(){
    super();
    this.mealsSpr = new Spr(MEALS);
    this.selectedMealNameRng = new Rng(`${TODAY}!${RNG_SELECTED_MEAL_NAME}`);
    this.selectedMealItemsRng = new Rng(`${TODAY}!${RNG_SELECTED_MEAL_ITEMS}`);
  }

  beforeAll(){
    super.beforeAll();
    this.utils.addTestMeals();
  }

  afterAll(){
    super.afterAll();
    this.utils.clearMeals();
  }

  shouldTodaySheetLoadAllSavedMealsAndItemsInTheFirstItemSelectorInEveryMeal(){
    //GIVEN
    let expected = [`${MEAL_ICON} Meal0`, `${MEAL_ICON} Meal1`, `${MEAL_ICON} Meal2`,
    'First', 'Second', 'Third', 'All 100', 'All 1', 'Test 100g', 'Test 1 serving', 'Green', 'Yellow', 'Red', 'Max cal', 'Zero cal', 'All Green', 'Last'];
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

  shouldTodaySheetLoadMealNameOfSelectedMealInBackground(){
    //GIVEN
    let expected = `${MEAL_ICON} Meal1`;
    //WHEN
    this.daySpr.setValue('C15', `${MEAL_ICON} Meal1`);
    let result = this.selectedMealNameRng.getValue();
    //THEN
    this.assertEquals(result, expected);
  }

  shouldTodaySheetLoadAllItemsOfSelectedMealInBackground(){
    //GIVEN
    let expected = [
      ['First', 10],
      ['Second', 20],
      ['Third', 30],
      ['Last', 99],
      ['First', 110],
      ['Second', 120],
      ['Third', 130],
      ['Last', 199],
      ['First', 210],
      ['Second', 220],
      ['Third', 230],
      ['Last', 299],
      ['First', 310],
      ['Second', 320],
      ['Third', 330]
    ];
    //WHEN
    this.daySpr.setValue('C15', `${MEAL_ICON} Meal1`);
    let result = this.selectedMealItemsRng.getValues();
    //THEN
    this.assertEquals(result, expected);
  }

  shouldTodaySheetMealBackgroundItemsStayEmptyIfNoMealSelected(){
    //GIVEN WHEN
    this.daySpr.setValue('C15', `Green`);
    let result = this.selectedMealItemsRng.getValues();
    //THEN
    this.assertArrayEmpty(result);
  }
}

var runDayMealTests = () => new DayMealTest().runAllTests();