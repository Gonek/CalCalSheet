class SettingsTest extends TestBase {

  constructor(){
    super();
    this.spr = new Spr(SETTINGS);
    this.generalRng = new Rng(RNG_GENERAL_SETTINGS);
    this.mealsRng = new Rng(RNG_MEALS);
    this.importRng = new Rng(RNG_IMPORT); 
  }

  shouldSettingsSheetGeneralDropBoxesAcceptValidValues(){
    //GIVEN
    let expectedDefaultCalorieOutputs = ['BMR', 'Active baseline', 'Calorie Min', 'Calorie Max', 'Calorie Min [Profile]', 'Calorie Max [Profile]'];
    //WHEN
    let resultDefaultCalorieOutputs = this.generalRng.getValidationCriteriaValues(1);
    //THEN
    this.assertEquals(resultDefaultCalorieOutputs, expectedDefaultCalorieOutputs);
  }

  shouldSettingsSheetDefaultCalorieOutputThrowExceptionIfValueInvalid(){
    //GIVEN WHEN THEN
    this.assertException(() => {
      this.generalRng.setValue('Invalid');
    }, 1);
    //RESET
    this.generalRng.setValue('Active baseline');
  }

  shouldSettingsSheetImportDropBoxesAcceptValidValues(){
    // GIVEN
    let expected = ['Clear', 'Merge'];
    // WHEN
    let result1 = this.importRng.getValidationCriteriaValues(2, 2);
    let result2 = this.importRng.getValidationCriteriaValues(3, 2);
    let result3 = this.importRng.getValidationCriteriaValues(4, 2);
    // THEN
    this.assertEquals(result1, expected);
    this.assertEquals(result2, expected);
    this.assertEquals(result3, expected);
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
    this.assertEquals(result1, expected);
    this.assertEquals(result2, expected);
    this.assertEquals(result3, expected);
    this.assertEquals(result4, expected);
    this.assertEquals(result5, expected);
    this.assertEquals(result6, expected);
  }

/** 
 * This test is currently not working
 * 
  shouldSettingsSheetMealSizeShouldThrowExpectionInValueInvalid(){
    //GIVEN WHEN THEN
    this.assertException(() => {
      this.mealsRng.setValue(1, 1, 2);
    }, true);
    //RESET
    this.mealsRng.setValue(11, 1, 2);
  }
*/
}

var runSettingsTests = () => new SettingsTest().runAllTests();4