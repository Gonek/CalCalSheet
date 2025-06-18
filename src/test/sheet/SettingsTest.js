class SettingsTest extends TestBase {

  constructor(){
    super();
    this.spr = getSpr(SPR.SETTINGS);
    this.generalRng = getRng(RNG.GENERAL_SETTINGS);
    this.mealsRng = getRng(RNG.MEALS);
    this.importRng = getRng(RNG.IMPORT); 
  }

  shouldSettingsSheetGeneralDropBoxesAcceptValidValues(){
    //GIVEN
    let expectedDefaultCalorieOutputs = ['BMR', 'Active baseline', 'Calorie Min', 'Calorie Max', 'Calorie Min [Profile]', 'Calorie Max [Profile]'];
    //WHEN
    let resultDefaultCalorieOutputs = this.generalRng.getValidationCriteriaValues(3);
    //THEN
    assertEquals(resultDefaultCalorieOutputs, expectedDefaultCalorieOutputs);
  }

  shouldSettingsSheetImportDropBoxesAcceptValidValues(){
    // GIVEN
    let expected = ['Clear', 'Merge'];
    // WHEN
    let result1 = this.importRng.getValidationCriteriaValues(2, 2);
    let result2 = this.importRng.getValidationCriteriaValues(3, 2);
    let result3 = this.importRng.getValidationCriteriaValues(4, 2);
    // THEN
    assertEquals(result1, expected);
    assertEquals(result2, expected);
    assertEquals(result3, expected);
  }

  shouldSettingsSheetMealSizeAcceptValuesBetween5And15(){
    // GIVEN
    let expected = [5, 15];
    // WHEN
    let result1 = this.mealsRng.getValidationCriteriaValues(1, 2);
    let result2 = this.mealsRng.getValidationCriteriaValues(2, 2);
    let result3 = this.mealsRng.getValidationCriteriaValues(3, 2);
    let result4 = this.mealsRng.getValidationCriteriaValues(4, 2);
    let result5 = this.mealsRng.getValidationCriteriaValues(5, 2);
    let result6 = this.mealsRng.getValidationCriteriaValues(6, 2);
    // THEN
    assertEquals(result1, expected);
    assertEquals(result2, expected);
    assertEquals(result3, expected);
    assertEquals(result4, expected);
    assertEquals(result5, expected);
    assertEquals(result6, expected);
  }

/** 
 * This test is currently not working
 * 
  shouldSettingsSheetMealSizeShouldThrowExpectionInValueInvalid(){
    //GIVEN WHEN THEN
    assertException(() => {
      this.mealsRng.setValue(1, 1, 2);
    }, true);
    //RESET
    this.mealsRng.setValue(11, 1, 2);
  }
*/
}

var runSettingsTests = () => new SettingsTest().runAllTests();4