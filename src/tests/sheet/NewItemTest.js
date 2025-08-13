class NewItemTest extends TestBase {

  constructor(){
    super();
    this.spr = new Spr(NEW_ITEM);
  }

  clearData(){
    this.spr.clear('C3:C19');
    this.spr.setValue('C21', '=E21');
    this.spr.setValue('C20', 'Solid');
  }

  shouldNewItemSheetHaveTheCorrectFormulaForBackgroudCalculatons(){
    //GIVEN
    let expectedFormula = [
      ['=C6'],
      ['=IF(ISNUMBER(C17), C17, C6)'],
      ['=D6'],
      ['=IFERROR(($G$5*C7/$G$4)/$G$6)'],
      ['=IFERROR(($G$5*C8/$G$4)/$G$6)'],
      ['=IFERROR(($G$5*C9/$G$4)/$G$6)'],
      ['=IFERROR(($G$5*C10/$G$4)/$G$6)'],
      ['=IFERROR(($G$5*C11/$G$4)/$G$6)'],
      ['=IFERROR(($G$5*C12/$G$4)/$G$6)'],
      ['=IFERROR(($G$5*C13/$G$4)/$G$6)'],
      ['=IFERROR(($G$5*C14/$G$4)/$G$6)'],
      ['=IFERROR(($G$5*C15/$G$4)/$G$6)'],
      ['=IFERROR(($G$5*C16/$G$4)/$G$6)']
    ]
    let expectedNoomFormula = '=IFS(C20="Solid", IFS(G7= "", "", G7<=1, "Green", G7<=2.4, "Yellow", G7>2.4, "Red"), C20="Liquid", IFS(G7= "", "", G7<=0.4, "Green", G7<=0.5, "Yellow", G7>0.5, "Red"), C20 = "Soup", IFS(G7= "", "", G7<=0.5, "Green", G7<=1, "Yellow", G7>1, "Red"))';
    //WHEN
    let resultFormula = this.spr.getFormulas('G4:G16');
    let resultNoomFormula = this.spr.getFormula('E21');
    //THEN
    this.assertEquals(resultFormula, expectedFormula);
    this.assertEquals(resultNoomFormula, expectedNoomFormula);
  }

  shouldNewItemSheetHaveTheCorrectFormulaVisbleCalculatons(){
    //GIVEN
    let expectedSaveFormula = [
      ['=IF(ISNUMBER(C17), 1, C4)'],
      ['=IF(ISNUMBER(C17),IF(ISBLANK(C18), "serving", C18),C5)'],
      ['=IFERROR(IF(ISNUMBER(C17),C17+C19,(C6+(C19))))'],
      ['=IFERROR(D6*G7)'],
      ['=ROUND($D$6*G8, 1)'],
      ['=ROUND($D$6*G9, 1)'],
      ['=ROUND($D$6*G10, 1)'],
      ['=ROUND($D$6*G11, 1)'],
      ['=ROUND($D$6*G12, 1)'],
      ['=ROUND($D$6*G13, 1)'],
      ['=ROUND($D$6*G14, 1)'],
      ['=ROUND($D$6*G15, 1)'],
      ['=ROUND($D$6*G16, 0)']
    ]
    let expectedCalorieFormula = '=IFERROR(C8*9+C11*4+C15*4+C12*2)';
    //WHEN
    let resultSaveFormula = this.spr.getFormulas('D4:D16');
    let resultCalorieFormula = this.spr.getFormula('C22');
    //THEN
    this.assertEquals(resultSaveFormula, expectedSaveFormula);
    this.assertEquals(resultCalorieFormula, expectedCalorieFormula);
  }

  shouldNewItemSheetCalculateMacroCaloriesCalulations(){
    //GIVEN
    let expected = 190;
    //WHEN
    this.spr.setValue('C8', 10);  // Fat
    this.spr.setValue('C11', 10); // Carb
    this.spr.setValue('C12', 10); // Fiber
    this.spr.setValue('C15', 10); // Protein

    let result = this.spr.getValue('C22');
    //THEN
    this.assertEquals(result, expected);
  }

  shouldNewItemSheetHaveRightFormat(){
    //GIVEN
    let item = [['Test'], [100], ['g'], [100], [100], [10], [11], [12], [13], [14], [15], [16], [17], [18]];
    let expected = [['100'], ['g'], ['100 g'], ['100 kcal'], ['10.0 g'], ['11.0 g'], ['12.0 g'], ['13.0 g'], ['14.0 g'], ['15.0 g'], ['16.0 g'], ['17.0 g'], ['18 mg']];
    //WHEN
    this.spr.setValues('C3:C16', item);
    let inputFormat = this.spr.getDisplayValues('C4:C16');
    let saveFormat = this.spr.getDisplayValues('D4:D16');
    //THEN
    this.assertEquals(inputFormat, expected);
    this.assertEquals(saveFormat, expected);
  }

  shouldNewItemSheetCalculateNutritionsCorrectlyFor100gTo100g(){
    //GIVEN
    let item = [['Test'], [100], ['g'], [100], [100], [10], [11], [12], [13], [14], [15], [16], [17], [18]];
    let expected = [[100], ['g'], [100], [100], [10], [11], [12], [13], [14], [15], [16], [17], [18]];
    //WHEN
    this.spr.setValues('C3:C16', item);
    let result = this.spr.getValues('D4:D16'); 
    //THEN
    this.assertEquals(result, expected);
  }

  shouldNewItemSheetCalculateNutritionsCorrectlyForServingToServing(){
    //GIVEN
    let item = [['Test'], [1], ['serv'], [50], [100], [10], [11], [12], [13], [14], [15], [16], [17], [18]];
    let expected = [[1], ['serv'], [50], [100], [10], [11], [12], [13], [14], [15], [16], [17], [18]];
    //WHEN
    this.spr.setValues('C3:C16', item);
    let result = this.spr.getValues('D4:D16'); 
    //THEN
    this.assertEquals(result, expected);
  }

  shouldNewItemSheetCalculateNutritionsCorrectlyFor100gToServing(){
    //GIVEN
    let item = [['Test'], [100], ['g'], [100], [100], [10], [11], [12], [13], [14], [15], [16], [17], [18], [50], ['serv']];
    let expected = [[1], ['serv'], [50], [50], [5], [5.5], [6], [6.5], [7], [7.5], [8], [8.5], [9]];
    //WHEN
    this.spr.setValues('C3:C18', item);
    let result = this.spr.getValues('D4:D16'); 
    //THEN
    this.assertEquals(result, expected);
  }

  shouldNewItemSheetCalculateNutritionsCorrectlyForServingTo100g(){
    //GIVEN
    let item = [['Test'], [50], ['g'], [50], [100], [10], [11], [12], [13], [14], [15], [16], [17], [18]];
    let expected = [[50], ['g'], [50], [100], [10], [11], [12], [13], [14], [15], [16], [17], [18]];
    //WHEN
    this.spr.setValues('C3:C16', item);
    let result = this.spr.getValues('D4:D16'); 
    //THEN
    this.assertEquals(result, expected);
  }

  shouldNewItemSheetCalculateNutritionsCorrectlyForAdditinalWater(){
    //GIVEN
    let item = [['Test'], [1], ['serv'], [50], [100], [10], [11], [12], [13], [14], [15], [16], [17], [18], [''], [''], [100]];
    let expected = [[1], ['serv'], [150], [100], [10], [11], [12], [13], [14], [15], [16], [17], [18]];
    //WHEN
    this.spr.setValues('C3:C19', item);
    let result = this.spr.getValues('D4:D16'); 
    //THEN
    this.assertEquals(result, expected);
  }

  shouldNewItemSheetCalculateGreenSolidNoomColourCorrectly(){
    //GIVEN
    let item = [['Test'], [100], ['g'], [100], [95]];
    let expected = 'Green';
    //WHEN
    this.spr.setValue('C20', 'Solid');
    this.spr.setValues('C3:C7', item);
    let result = this.spr.getValue('C21'); 
    //THEN
    this.assertEquals(result, expected);
  }

  shouldNewItemSheetCalculateYellowSolidNoomColourCorrectly(){
    //GIVEN
    let item = [['Test'], [100], ['g'], [100], [150]];
    let expected = 'Yellow';
    //WHEN
    this.spr.setValue('C20', 'Solid');
    this.spr.setValues('C3:C7', item);
    let result = this.spr.getValue('C21'); 
    //THEN
    this.assertEquals(result, expected);
  }

  shouldNewItemSheetCalculateRedSolidNoomColourCorrectly(){
    //GIVEN
    let item = [['Test'], [100], ['g'], [100], [350]];
    let expected = 'Red';
    //WHEN
    this.spr.setValue('C20', 'Solid');
    this.spr.setValues('C3:C7', item);
    let result = this.spr.getValue('C21'); 
    //THEN
    this.assertEquals(result, expected);
  }

  shouldNewItemSheetCalculateGreenLiquidNoomColourCorrectly(){
    //GIVEN
    let item = [['Test'], [100], ['g'], [100], [40]];
    let expected = 'Green';
    //WHEN
    this.spr.setValue('C20', 'Liquid');
    this.spr.setValues('C3:C7', item);
    let result = this.spr.getValue('C21'); 
    //THEN
    this.assertEquals(result, expected);
  }

  shouldNewItemSheetCalculateYellowLiquidNoomColourCorrectly(){
    //GIVEN
    let item = [['Test'], [100], ['g'], [100], [50]];
    let expected = 'Yellow';
    //WHEN
    this.spr.setValue('C20', 'Liquid');
    this.spr.setValues('C3:C7', item);
    let result = this.spr.getValue('C21'); 
    //THEN
    this.assertEquals(result, expected);
  }

  shouldNewItemSheetCalculateRedLiquidNoomColourCorrectly(){
    //GIVEN
    let item = [['Test'], [100], ['g'], [100], [60]];
    let expected = 'Red';
    //WHEN
    this.spr.setValue('C20', 'Liquid');
    this.spr.setValues('C3:C7', item);
    let result = this.spr.getValue('C21'); 
    //THEN
    this.assertEquals(result, expected);
  }

    shouldNewItemSheetCalculateGreenSoupNoomColourCorrectly(){
    //GIVEN
    let item = [['Test'], [100], ['g'], [100], [40]];
    let expected = 'Green';
    //WHEN
    this.spr.setValue('C20', 'Soup');
    this.spr.setValues('C3:C7', item);
    let result = this.spr.getValue('C21'); 
    //THEN
    this.assertEquals(result, expected);
  }

  shouldNewItemSheetCalculateYellowSoupNoomColourCorrectly(){
    //GIVEN
    let item = [['Test'], [100], ['g'], [100], [55]];
    let expected = 'Yellow';
    //WHEN
    this.spr.setValue('C20', 'Soup');
    this.spr.setValues('C3:C7', item);
    let result = this.spr.getValue('C21'); 
    //THEN
    this.assertEquals(result, expected);
  }

  shouldNewItemSheetCalculateRedSoupNoomColourCorrectly(){
    //GIVEN
    let item = [['Test'], [100], ['g'], [100], [110]];
    let expected = 'Red';
    //WHEN
    this.spr.setValue('C20', 'Soup');
    this.spr.setValues('C3:C7', item);
    let result = this.spr.getValue('C21'); 
    //THEN
    this.assertEquals(result, expected);
  }
}

var runNewItemTests = () => new NewItemTest().runAllTests();