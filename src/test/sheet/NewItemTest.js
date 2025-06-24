class NewItemTest extends TestBase {

    beforeAll(){
        super.beforeAll();
        this.sht = getSht(SHT.NEW_ITEM);
    }

    clearData(){
        this.sht.clear('C3:C20');
        this.sht.setValue('C22', '=F22');
        this.sht.setValue('C21', 'Solid');
        this.sht.setValue('C17', 'Never');
    }

    shouldNewItemSheetHaveTheCorrectFormulaForBackgroudCalculatons(){
        //GIVEN
        let expectedFormula = [
          ['=C6'],
          ['=IF(ISNUMBER(C18), C18, C6)'],
          ['=D6'],
          ['=IFERROR(($H$5*C7/$H$4)/$H$6)'],
          ['=IFERROR(($H$5*C8/$H$4)/$H$6)'],
          ['=IFERROR(($H$5*C9/$H$4)/$H$6)'],
          ['=IFERROR(($H$5*C10/$H$4)/$H$6)'],
          ['=IFERROR(($H$5*C11/$H$4)/$H$6)'],
          ['=IFERROR(($H$5*C12/$H$4)/$H$6)'],
          ['=IFERROR(($H$5*C13/$H$4)/$H$6)'],
          ['=IFERROR(($H$5*C14/$H$4)/$H$6)'],
          ['=IFERROR(($H$5*C15/$H$4)/$H$6)'],
          ['=IFERROR(($H$5*C16/$H$4)/$H$6)']
        ]
        let expectedNoomFormula = '=IFS(C21="Solid", IFS(H7= "", "", H7<=1, "Green", H7<=2.4, "Yellow", H7>2.4, "Red"), C21="Liquid", IFS(H7= "", "", H7<=0.4, "Green", H7<=0.5, "Yellow", H7>0.5, "Red"), C21 = "Soup", IFS(H7= "", "", H7<=0.5, "Green", H7<=1, "Yellow", H7>1, "Red"))';
        let expectedItemNamesFormula = '=ARRAYFORMULA({C3;Items!B4:B})'; 
        //WHEN
        let resultFormula = this.sht.getFormulas('H4:H16');
        let resultNoomFormula = this.sht.getFormula('F22');
        let resultItemNamesFormula = this.sht.getFormula('I3');
        //THEN
        assertEquals(resultFormula, expectedFormula);
        assertEquals(resultNoomFormula, expectedNoomFormula);
        assertEquals(resultItemNamesFormula, expectedItemNamesFormula);
    }

    shouldNewItemSheetHaveTheCorrectFormulaVisbleCalculatons(){
        //GIVEN
        let expectedSaveFormula = [
          ['=IF(ISNUMBER(C18), 1, C4)'],
          ['=IF(ISNUMBER(C18),IF(ISBLANK(C19), "serving", C19),C5)'],
          ['=IFERROR(IF(ISNUMBER(C18),C18+C20,(C6+(C20))))'],
          ['=IFERROR(D6*H7)'],
          ['=ROUND($D$6*H8, 1)'],
          ['=ROUND($D$6*H9, 1)'],
          ['=ROUND($D$6*H10, 1)'],
          ['=ROUND($D$6*H11, 1)'],
          ['=ROUND($D$6*H12, 1)'],
          ['=ROUND($D$6*H13, 1)'],
          ['=ROUND($D$6*H14, 1)'],
          ['=ROUND($D$6*H15, 1)'],
          ['=ROUND($D$6*H16, 0)']
        ]
        let expectedCalorieFormula = '=IFERROR(C8*9+C11*4+C15*4+C12*2)';
        //WHEN
        let resultSaveFormula = this.sht.getFormulas('D4:D16');
        let resultCalorieFormula = this.sht.getFormula('C23');
        //THEN
        assertEquals(resultSaveFormula, expectedSaveFormula);
        assertEquals(resultCalorieFormula, expectedCalorieFormula);
    }

    shouldNewItemSheetCalculateMacroCaloriesCalulations(){
        //GIVEN
        let expected = 190;
        //WHEN
        this.sht.setValue('C8', 10);  // Fat
        this.sht.setValue('C11', 10); // Carb
        this.sht.setValue('C12', 10); // Fiber
        this.sht.setValue('C15', 10); // Protein

        let result = this.sht.getValue('C23');
        //THEN
        assertEquals(result, expected);
    }

    shouldNewItemSheetHaveRightFormat(){
        //GIVEN
        let item = [['Test'], [100], ['g'], [100], [100], [10], [11], [12], [13], [14], [15], [16], [17], [18]];
        let expected = [['100'], ['g'], ['100 g'], ['100 kcal'], ['10.0 g'], ['11.0 g'], ['12.0 g'], ['13.0 g'], ['14.0 g'], ['15.0 g'], ['16.0 g'], ['17.0 g'], ['18 mg']];
        //WHEN
        this.sht.setValues('C3:C16', item);
        let inputFormat = this.sht.getDisplayValues('C4:C16');
        let saveFormat = this.sht.getDisplayValues('D4:D16');
        //THEN
        assertEquals(inputFormat, expected);
        assertEquals(saveFormat, expected);
    }

    shouldNewItemSheetCalculateNutritionsCorrectlyFor100gTo100g(){
        //GIVEN
        let item = [['Test'], [100], ['g'], [100], [100], [10], [11], [12], [13], [14], [15], [16], [17], [18]];
        let expected = [[100], ['g'], [100], [100], [10], [11], [12], [13], [14], [15], [16], [17], [18]];
        //WHEN
        this.sht.setValues('C3:C16', item);
        let result = this.sht.getValues('D4:D16'); 
        //THEN
        assertEquals(result, expected);
    }

    shouldNewItemSheetCalculateNutritionsCorrectlyForServingToServing(){
        //GIVEN
        let item = [['Test'], [1], ['serv'], [50], [100], [10], [11], [12], [13], [14], [15], [16], [17], [18]];
        let expected = [[1], ['serv'], [50], [100], [10], [11], [12], [13], [14], [15], [16], [17], [18]];
        //WHEN
        this.sht.setValues('C3:C16', item);
        let result = this.sht.getValues('D4:D16'); 
        //THEN
        assertEquals(result, expected);
    }

    shouldNewItemSheetCalculateNutritionsCorrectlyFor100gToServing(){
        //GIVEN
        let item = [['Test'], [100], ['g'], [100], [100], [10], [11], [12], [13], [14], [15], [16], [17], [18], ['Never'], [50], ['serv']];
        let expected = [[1], ['serv'], [50], [50], [5], [5.5], [6], [6.5], [7], [7.5], [8], [8.5], [9]];
        //WHEN
        this.sht.setValues('C3:C19', item);
        let result = this.sht.getValues('D4:D16'); 
        //THEN
        assertEquals(result, expected);
    }

    shouldNewItemSheetCalculateNutritionsCorrectlyForServingTo100g(){
        //GIVEN
        let item = [['Test'], [50], ['g'], [50], [100], [10], [11], [12], [13], [14], [15], [16], [17], [18]];
        let expected = [[50], ['g'], [50], [100], [10], [11], [12], [13], [14], [15], [16], [17], [18]];
        //WHEN
        this.sht.setValues('C3:C16', item);
        let result = this.sht.getValues('D4:D16'); 
        //THEN
        assertEquals(result, expected);
    }

    shouldNewItemSheetCalculateNutritionsCorrectlyForAdditinalWater(){
        //GIVEN
        let item = [['Test'], [1], ['serv'], [50], [100], [10], [11], [12], [13], [14], [15], [16], [17], [18], ['Never'], [''], [''], [100]];
        let expected = [[1], ['serv'], [150], [100], [10], [11], [12], [13], [14], [15], [16], [17], [18]];
        //WHEN
        this.sht.setValues('C3:C20', item);
        let result = this.sht.getValues('D4:D16'); 
        //THEN
        assertEquals(result, expected);
    }

    shouldNewItemSheetCalculateGreenSolidNoomColourCorrectly(){
        //GIVEN
        let item = [['Test'], [100], ['g'], [100], [95]];
        let expected = 'Green';
        //WHEN
        this.sht.setValue('C21', 'Solid');
        this.sht.setValues('C3:C7', item);
        let result = this.sht.getValue('C22'); 
        //THEN
        assertEquals(result, expected);
    }

    shouldNewItemSheetCalculateYellowSolidNoomColourCorrectly(){
        //GIVEN
        let item = [['Test'], [100], ['g'], [100], [150]];
        let expected = 'Yellow';
        //WHEN
        this.sht.setValue('C21', 'Solid');
        this.sht.setValues('C3:C7', item);
        let result = this.sht.getValue('C22'); 
        //THEN
        assertEquals(result, expected);
    }

    shouldNewItemSheetCalculateRedSolidNoomColourCorrectly(){
        //GIVEN
        let item = [['Test'], [100], ['g'], [100], [350]];
        let expected = 'Red';
        //WHEN
        this.sht.setValue('C21', 'Solid');
        this.sht.setValues('C3:C7', item);
        let result = this.sht.getValue('C22'); 
        //THEN
        assertEquals(result, expected);
    }

    shouldNewItemSheetCalculateGreenLiquidNoomColourCorrectly(){
        //GIVEN
        let item = [['Test'], [100], ['g'], [100], [40]];
        let expected = 'Green';
        //WHEN
        this.sht.setValue('C21', 'Liquid');
        this.sht.setValues('C3:C7', item);
        let result = this.sht.getValue('C22'); 
        //THEN
        assertEquals(result, expected);
    }

    shouldNewItemSheetCalculateYellowLiquidNoomColourCorrectly(){
        //GIVEN
        let item = [['Test'], [100], ['g'], [100], [50]];
        let expected = 'Yellow';
        //WHEN
        this.sht.setValue('C21', 'Liquid');
        this.sht.setValues('C3:C7', item);
        let result = this.sht.getValue('C22'); 
        //THEN
        assertEquals(result, expected);
    }

    shouldNewItemSheetCalculateRedLiquidNoomColourCorrectly(){
        //GIVEN
        let item = [['Test'], [100], ['g'], [100], [60]];
        let expected = 'Red';
        //WHEN
        this.sht.setValue('C21', 'Liquid');
        this.sht.setValues('C3:C7', item);
        let result = this.sht.getValue('C22'); 
        //THEN
        assertEquals(result, expected);
    }

    shouldNewItemSheetCalculateGreenSoupNoomColourCorrectly(){
        //GIVEN
        let item = [['Test'], [100], ['g'], [100], [40]];
        let expected = 'Green';
        //WHEN
        this.sht.setValue('C21', 'Soup');
        this.sht.setValues('C3:C7', item);
        let result = this.sht.getValue('C22'); 
        //THEN
        assertEquals(result, expected);
    }

    shouldNewItemSheetCalculateYellowSoupNoomColourCorrectly(){
        //GIVEN
        let item = [['Test'], [100], ['g'], [100], [55]];
        let expected = 'Yellow';
        //WHEN
        this.sht.setValue('C21', 'Soup');
        this.sht.setValues('C3:C7', item);
        let result = this.sht.getValue('C22'); 
        //THEN
        assertEquals(result, expected);
    }

    shouldNewItemSheetCalculateRedSoupNoomColourCorrectly(){
        //GIVEN
        let item = [['Test'], [100], ['g'], [100], [110]];
        let expected = 'Red';
        //WHEN
        this.sht.setValue('C21', 'Soup');
        this.sht.setValues('C3:C7', item);
        let result = this.sht.getValue('C22'); 
        //THEN
        assertEquals(result, expected);
    }

    shouldNewItemSheetLoadAllItemsInTheNameField(){
        //GIVEN
        this.utils.addTestItems();
        let expected = ['1 First', '2 Second', '3 Third', 'All 100', 'All 1', 'All Green', 'Green', 'Max cal', 'Red', 'Test 100g', 'Test 1 serving', 'Yellow', 'Zero cal', 'ZZ Last'];
        //WHEN
        let result = this.sht.getRng('C3').getValidationCriteriaRangeValues();
        //THEN
        assertEquals(result, expected);
        this.utils.clearRecipes();
    }

    shouldNewItemSheetLoadAllItemsAndTheGivenNameInTheNameField(){
        //GIVEN
        this.utils.addTestItems();
        let nameRng = this.sht.getRng('C3');
        let expected = ['New Item', '1 First', '2 Second', '3 Third', 'All 100', 'All 1', 'All Green', 'Green', 'Max cal', 'Red', 'Test 100g', 'Test 1 serving', 'Yellow', 'Zero cal', 'ZZ Last'];
        //WHEN
        nameRng.setValue('New Item');
        let result = nameRng.getValidationCriteriaRangeValues();
        //THEN
        assertEquals(result, expected);
        this.utils.clearRecipes();
    }
}

var runNewItemTests = () => new NewItemTest().runAllTests();