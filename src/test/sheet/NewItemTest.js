class NewItemTest extends TestBase {

    beforeAll(){
        super.beforeAll();
        this.sht = getSht(SHT.NEW_ITEM);
    }

    clearData(){
        this.sht.clearContent('C3:C22');
        this.sht.setValue('C24', '=F24');
        this.sht.setValue('C23', 'Solid');
        this.sht.setValue('C19', 'Never');
    }

    shouldNewItemSheetHaveTheCorrectFormulaForBackgroudCalculatons(){
        //GIVEN
        let expectedFormula = [
          ['=C6'],
          ['=IF(ISNUMBER(C20), C20, C6)'],
          ['=D6+C22'],
          ['=IFERROR(($H$5*C7/$H$4)/$H$6)'],
          ['=IFERROR(($H$5*C8/$H$4)/$H$6)'],
          ['=IFERROR(($H$5*C9/$H$4)/$H$6)'],
          ['=IFERROR(($H$5*C10/$H$4)/$H$6)'],
          ['=IFERROR(($H$5*C11/$H$4)/$H$6)'],
          ['=IFERROR(($H$5*C12/$H$4)/$H$6)'],
          ['=IFERROR(($H$5*C13/$H$4)/$H$6)'],
          ['=IFERROR(($H$5*C14/$H$4)/$H$6)'],
          ['=IFERROR(($H$5*C15/$H$4)/$H$6)'],
          ['=IFERROR(($H$5*C16/$H$4)/$H$6)'],
          ['=IFERROR((C17/(C18+C22)))']
        ]
        let expectedNoomFormula = '=IFS(C23=Texts!B539, IFS(H7= "", "", H7<=1, Texts!B82, H7<=2.4, Texts!B83, H7>2.4, Texts!B84), C23=Texts!B540, IFS(H7= "", "", H7<=0.4, Texts!B82, H7<=0.5, Texts!B83, H7>0.5, Texts!B84), C23 = Texts!B541, IFS(H7= "", "", H7<=0.5, Texts!B82, H7<=1, Texts!B83, H7>1, Texts!B84))';
        let expectedItemNamesFormula = '=ARRAYFORMULA({C3;Items!B4:B})'; 
        //WHEN
        let resultFormula = this.sht.getFormulas('H4:H17');
        let resultNoomFormula = this.sht.getFormula('F24');
        let resultItemNamesFormula = this.sht.getFormula('I3');
        //THEN
        assertEquals(resultFormula, expectedFormula);
        assertEquals(resultNoomFormula, expectedNoomFormula);
        assertEquals(resultItemNamesFormula, expectedItemNamesFormula);
    }

    shouldNewItemSheetHaveTheCorrectFormulaVisbleCalculatons(){
        //GIVEN
        let expectedSaveFormula = [
          ['=IF(ISNUMBER(C20), 1, C4)'],
          ['=IF(ISNUMBER(C20),IF(ISBLANK(C21), Texts!B91, C21),C5)'],
          ['=IFERROR(IF(ISNUMBER(C20),C20,C6))'],
          ['=IFERROR(D6*H7)'],
          ['=ROUND($D$6*H8, 1)'],
          ['=ROUND($D$6*H9, 1)'],
          ['=ROUND($D$6*H10, 1)'],
          ['=ROUND($D$6*H11, 1)'],
          ['=ROUND($D$6*H12, 1)'],
          ['=ROUND($D$6*H13, 1)'],
          ['=ROUND($D$6*H14, 1)'],
          ['=ROUND($D$6*H15, 1)'],
          ['=ROUND($D$6*H16, 0)'],
          ['=H17'],
          ['=D5'],
        ]
        let expectedCalorieFormula = '=IFERROR(C8*9+C11*4+C15*4+C12*2)';
        //WHEN
        let resultSaveFormula = this.sht.getFormulas('D4:D18');
        let resultCalorieFormula = this.sht.getFormula('C25');
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

        let result = this.sht.getValue('C25');
        //THEN
        assertEquals(result, expected);
    }

    shouldNewItemSheetHaveRightFormat(){
        //GIVEN
        let item = [['Test'], [100], ['g'], [100], [100], [10], [11], [12], [13], [14], [15], [16], [17], [18], [19], [20]];
        let expectedInput = [['100'], ['g'], ['100 g'], ['100 kcal'], ['10.0 g'], ['11.0 g'], ['12.0 g'], ['13.0 g'], ['14.0 g'], ['15.0 g'], ['16.0 g'], ['17.0 g'], ['18 mg'], ['£19.00'], ['20']];
        let expectedSave = [['100'], ['g'], ['100 g'], ['100 kcal'], ['10.0 g'], ['11.0 g'], ['12.0 g'], ['13.0 g'], ['14.0 g'], ['15.0 g'], ['16.0 g'], ['17.0 g'], ['18 mg'], ['£0.95 / Unit'], ['g']];
        //WHEN
        this.sht.setValues('C3:C18', item);
        let inputFormat = this.sht.getDisplayValues('C4:C18');
        let saveFormat = this.sht.getDisplayValues('D4:D18');
        //THEN
        assertEquals(inputFormat, expectedInput);
        assertEquals(saveFormat, expectedSave);
    }

    shouldNewItemSheetCalculateNutritionsCorrectlyFor100gTo100g(){
        //GIVEN
        let item = [['Test'], [100], ['g'], [100], [100], [10], [11], [12], [13], [14], [15], [16], [17], [18], [19], [20]];
        let expected = [[100], ['g'], [100], [100], [10], [11], [12], [13], [14], [15], [16], [17], [18], [0.95], ['g']];
        //WHEN
        this.sht.setValues('C3:C18', item);
        let result = this.sht.getValues('D4:D18'); 
        //THEN
        assertEquals(result, expected);
    }

    shouldNewItemSheetCalculateNutritionsCorrectlyForServingToServing(){
        //GIVEN
        let item = [['Test'], [1], ['serv'], [50], [100], [10], [11], [12], [13], [14], [15], [16], [17], [18], [19], [20]];
        let expected = [[1], ['serv'], [50], [100], [10], [11], [12], [13], [14], [15], [16], [17], [18], [0.95], ['serv']];
        //WHEN
        this.sht.setValues('C3:C18', item);
        let result = this.sht.getValues('D4:D18'); 
        //THEN
        assertEquals(result, expected);
    }

    shouldNewItemSheetCalculateNutritionsCorrectlyFor100gToServing(){
        //GIVEN
        let item = [['Test'], [100], ['g'], [100], [100], [10], [11], [12], [13], [14], [15], [16], [17], [18], [19], [20], ['Never'], [50], ['serv']];
        let expected = [[1], ['serv'], [50], [50], [5], [5.5], [6], [6.5], [7], [7.5], [8], [8.5], [9], [0.95], ['serv']];
        //WHEN
        this.sht.setValues('C3:C21', item);
        let result = this.sht.getValues('D4:D18'); 
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
        let item = [['Test'], [1], ['serv'], [100], [100], [10], [11], [12], [13], [14], [15], [16], [17], [18], [100], [100], ['Never'], [''], [''], [100]];
        let expected = [[1], ['serv'], [100], [50], [5], [5.5], [6], [6.5], [7], [7.5], [8], [8.5], [9], [0.50], ['serv']];
        //WHEN
        this.sht.setValues('C3:C22', item);
        let result = this.sht.getValues('D4:D18');
        //THEN
        assertEquals(result, expected);
    }

    shouldNewItemSheetCalculateGreenSolidNoomColourCorrectly(){
        //GIVEN
        let item = [['Test'], [100], ['g'], [100], [95]];
        let expected = 'Green';
        //WHEN
        this.sht.setValue('C23', 'Solid');
        this.sht.setValues('C3:C7', item);
        let result = this.sht.getValue('C24'); 
        //THEN
        assertEquals(result, expected);
    }

    shouldNewItemSheetCalculateYellowSolidNoomColourCorrectly(){
        //GIVEN
        let item = [['Test'], [100], ['g'], [100], [150]];
        let expected = 'Yellow';
        //WHEN
        this.sht.setValue('C23', 'Solid');
        this.sht.setValues('C3:C7', item);
        let result = this.sht.getValue('C24'); 
        //THEN
        assertEquals(result, expected);
    }

    shouldNewItemSheetCalculateRedSolidNoomColourCorrectly(){
        //GIVEN
        let item = [['Test'], [100], ['g'], [100], [350]];
        let expected = 'Red';
        //WHEN
        this.sht.setValue('C23', 'Solid');
        this.sht.setValues('C3:C7', item);
        let result = this.sht.getValue('C24'); 
        //THEN
        assertEquals(result, expected);
    }

    shouldNewItemSheetCalculateGreenLiquidNoomColourCorrectly(){
        //GIVEN
        let item = [['Test'], [100], ['g'], [100], [40]];
        let expected = 'Green';
        //WHEN
        this.sht.setValue('C23', 'Liquid');
        this.sht.setValues('C3:C7', item);
        let result = this.sht.getValue('C24'); 
        //THEN
        assertEquals(result, expected);
    }

    shouldNewItemSheetCalculateYellowLiquidNoomColourCorrectly(){
        //GIVEN
        let item = [['Test'], [100], ['g'], [100], [50]];
        let expected = 'Yellow';
        //WHEN
        this.sht.setValue('C23', 'Liquid');
        this.sht.setValues('C3:C7', item);
        let result = this.sht.getValue('C24'); 
        //THEN
        assertEquals(result, expected);
    }

    shouldNewItemSheetCalculateRedLiquidNoomColourCorrectly(){
        //GIVEN
        let item = [['Test'], [100], ['g'], [100], [60]];
        let expected = 'Red';
        //WHEN
        this.sht.setValue('C23', 'Liquid');
        this.sht.setValues('C3:C7', item);
        let result = this.sht.getValue('C24'); 
        //THEN
        assertEquals(result, expected);
    }

    shouldNewItemSheetCalculateGreenSoupNoomColourCorrectly(){
        //GIVEN
        let item = [['Test'], [100], ['g'], [100], [40]];
        let expected = 'Green';
        //WHEN
        this.sht.setValue('C23', 'Soup');
        this.sht.setValues('C3:C7', item);
        let result = this.sht.getValue('C24'); 
        //THEN
        assertEquals(result, expected);
    }

    shouldNewItemSheetCalculateYellowSoupNoomColourCorrectly(){
        //GIVEN
        let item = [['Test'], [100], ['g'], [100], [55]];
        let expected = 'Yellow';
        //WHEN
        this.sht.setValue('C23', 'Soup');
        this.sht.setValues('C3:C7', item);
        let result = this.sht.getValue('C24'); 
        //THEN
        assertEquals(result, expected);
    }

    shouldNewItemSheetCalculateRedSoupNoomColourCorrectly(){
        //GIVEN
        let item = [['Test'], [100], ['g'], [100], [110]];
        let expected = 'Red';
        //WHEN
        this.sht.setValue('C23', 'Soup');
        this.sht.setValues('C3:C7', item);
        let result = this.sht.getValue('C24'); 
        //THEN
        assertEquals(result, expected);
    }

    shouldNewItemSheetLoadAllItemsInTheNameField(){
        //GIVEN
        testData.addTestItems();
        let expected = ['1 First', '2 Second', '3 Third', 'All 100', 'All 1', 'All Green', 'Green', 'Max cal', 'Red', 'Test 100g', 'Test 1 serving', 'Yellow', 'Zero cal', 'ZZ Last'];
        //WHEN
        let result = this.sht.getRng('C3').getValidationCriteriaRangeValues();
        //THEN
        assertEquals(result, expected);
        testData.clearItems();
    }

    shouldNewItemSheetLoadAllItemsAndTheGivenNameInTheNameField(){
        //GIVEN
        testData.addTestItems();
        let nameRng = this.sht.getRng('C3');
        let expected = ['New Item', '1 First', '2 Second', '3 Third', 'All 100', 'All 1', 'All Green', 'Green', 'Max cal', 'Red', 'Test 100g', 'Test 1 serving', 'Yellow', 'Zero cal', 'ZZ Last'];
        //WHEN
        nameRng.setValue('New Item');
        let result = nameRng.getValidationCriteriaRangeValues();
        //THEN
        assertEquals(result, expected);
        testData.clearItems();
    }

    shouldNewItemSheetLoadAllItemsInTheDeleteItemsField(){
        //GIVEN
        testData.addTestItems();
        let deleteItemsRng = this.sht.getRng('B33');
        let expected = ['1 First', '2 Second', '3 Third', 'All 100', 'All 1', 'All Green', 'Green', 'Max cal', 'Red', 'Test 100g', 'Test 1 serving', 'Yellow', 'Zero cal', 'ZZ Last'];
        //WHEN
        let result = deleteItemsRng.getValidationCriteriaRangeValues();
        //THEN
        assertEquals(result, expected);
        testData.clearItems();
    }
}

var runNewItemTests = () => new NewItemTest().runAllTests();