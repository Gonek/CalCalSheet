class ProfileTest extends TestBase {

    beforeAll(){
        super.beforeAll();
        this.sht = getSht(SHT.PROFILE);
        this.weightsRng = getRng(RNG.WEIGHTS);
        this.weightHistoryRng = getRng(RNG.WEIGHT_HISTORY);
        this.calorieOutputCalculatorRng = getRng(RNG.CALORIE_OUTPUT_CALCULATOR);
        this.macroProfilesRng = getRng(RNG.MACRO_PROFILES);
        this.copyCaloriesSelectedProfileRng = getRng(RNG.COPY_CALORIES_SELECTED_PROFILE);
   }

    shouldProfileSheetWeightHistoryHaveCorrectFormula(){
        //GIVEN
        let expected =
        Array.from({length:71},(v,k)=>[
          `=IF(ISNUMBER(K${17 + k}), K${17 + k}-K${16 + k}, "")`,
          `=IF(ISNUMBER(K${17 + k}), K${17 + k}-$K$16, "")`
        ]);
        //WHEN
        let result = clearAll(this.weightHistoryRng.getFormulas());
        //THEN
        assertEquals(result, expected);
    }

    shouldProfileSheetCalorieCalculatorHaveCorrectFormula(){
        //GIVEN
        let expected = [
          ['=DATEDIF(D16, NOW(), "Y")'],
          ['=ROUND(IF(D18 ="Woman", 655.1+(9.563*D21)+(1.85*D19)-(4.676*D17), 66.5+(13.75*D21)+(5.003*D19)-(6.75*D17)))'],
          ['=ROUND(D23*IFS(D20="Sedentary",1.2, D20="Lightly active",1.375, D20="Moderately active",1.55, D20="Very active", 1.725, D20="Extra active", 1.9))'],
          ['=Round($D$24*IFS($D$25="Weight maintain", 0.97, $D$25 ="Weight loss", 0.8, $D$25 = "Weight gain", 1.1),-1)'],
          ['=Round($D$24*IFS($D$25="Weight maintain", 1.03, $D$25 ="Weight loss", 0.9, $D$25 = "Weight gain", 1.2),-1)']
        ];
        //WHEN
        let result = clearAll(this.calorieOutputCalculatorRng.getFormulas());
        //THEN
        assertEquals(result, expected);
    }

    shouldProfileSheetWeightHistoryHaveCorrectFormat(){
        //GIVEN
        testData.resetWeight();
        let weights = Array(72).fill(['01/01/2024', '', '80', '']);
        let expected =
        ['01/01/2024', '80.00 kg', '-', '-'].concat(
        Array.from({length:71},(v,k)=>[
          '01/01/2024',
          '80.00 kg',
          '0.00 kg',
          '0.00 kg'
        ]));
        //WHEN
        this.weightsRng.setValues(weights);
        let result = clearAll(this.weightHistoryRng.getDisplayValues());
        //THEN
        assertEquals(result, expected);
        //RESET 
        testData.resetWeight();
    }

    shouldProfileSheetCalorieCalculatorHaveCorrectFormat(){
        //GIVEN
        testData.resetCalorieCalculatorValues();
        let expected = [
          ['01/01/2000'],
          ['25'],
          ['Man'],
          ['200 cm'],
          ['Sedentary'],
          ['80.00 kg'],
          ['Calories'],
          ['1998 kcal'],
          ['2398 kcal'],
          ['Weight maintain'],
          ['2330 kcal'],
          ['2470 kcal']
        ];
        //WHEN
        let result = this.calorieOutputCalculatorRng.getDisplayValues();
        //THEN
        assertEquals(result, expected);
    }

    shouldProfileSheetCopyCaloriesProfileSelectorAcceptExistingProfiles(){
        //GIVEN
        testData.addTestProfiles();
        // GIVEN
        let expected = ['Test 1', 'Test 2', 'Test 3', 'Test 4', 'Test 5', 'Test 6', 'Test 7'];
        // WHEN
        let result = this.copyCaloriesSelectedProfileRng.getValidationCriteriaRangeValues();
        // THEN
        assertEquals(result, expected);
        //RESET
        testData.addDefaultProfile();
    }

    shouldProfileSheetCopyCaloriesProfileSelectorThrowExpectionIfProfileNotExist(){
        //GIVEN
        testData.addTestProfiles();
        // WHEN THEN
        assertException(() => {
          this.copyCaloriesSelectedProfileRng.setValue(`Non existing profile`);
        }, true);
        //RESET
        testData.addDefaultProfile();
    }

    shouldProfileSheetWeightHistoryCalulateWeightDifferencesCorrectly(){
        //GIVEN
        testData.resetWeight();
        let weights = [
          ['01/01/2024', '', '80', ''],
          ['01/02/2024', '', '78.75', ''],
          ['01/03/2024', '', '75.45', ''],
          ['01/04/2024', '', '74.10', ''],
          ['01/05/2024', '', '75.15', '']
        ];
        let expected = [
          ['01/01/2024', '80.00 kg', '-', '-'],
          ['01/02/2024', '78.75 kg', '-1.25 kg', '-1.25 kg'],
          ['01/03/2024', '75.45 kg', '-3.30 kg', '-4.55 kg'],
          ['01/04/2024', '74.10 kg', '-1.35 kg', '-5.90 kg'],
          ['01/05/2024', '75.15 kg', '1.05 kg', '-4.85 kg'],
        ];
        //WHEN
        this.weightsRng.setValuesWithResize(weights);
        let result = clearAll(this.weightHistoryRng.getDisplayValues());
        //THEN
        assertEquals(result, expected);
        //RESET 
        testData.resetWeight();
    }

    shouldProfileSheetCalorieOuputCalculatorCalulateCaloriesCorrectlyForWoman1(){
        //GIVEN
        let expectedBMR = 1493;
        let expectedActive = 2314;
        let expectedCalMin = 2240;
        let expectedCalMax = 2380;
        //WHEN
        this.calorieOutputCalculatorRng.setValue('01/01/2000', 1);
        this.calorieOutputCalculatorRng.setValue('Woman', 3);
        this.calorieOutputCalculatorRng.setValue(180, 4);
        this.calorieOutputCalculatorRng.setValue('Moderately active', 5);
        this.calorieOutputCalculatorRng.setValue(65, 6);
        this.calorieOutputCalculatorRng.setValue('Weight maintain', 10);
        let resultBMR = this.calorieOutputCalculatorRng.getValue(8);
        let resultActive = this.calorieOutputCalculatorRng.getValue(9);
        let resultCalMin = this.calorieOutputCalculatorRng.getValue(11);
        let resultCalMax = this.calorieOutputCalculatorRng.getValue(12);
        //THEN
        assertEquals(resultBMR, expectedBMR);
        assertEquals(resultActive, expectedActive);
        assertEquals(resultCalMin, expectedCalMin);
        assertEquals(resultCalMax, expectedCalMax);
        //RESET
        testData.resetCalorieCalculatorValues();
    }

    shouldProfileSheetCalorieOuputCalculatorCalulateCaloriesCorrectlyForWoman2(){
        //GIVEN
        let expectedBMR = 1321;
        let expectedActive = 1585;
        let expectedCalMin = 1270;
        let expectedCalMax = 1430;
        //WHEN
        this.calorieOutputCalculatorRng.setValue('01/01/2006', 1);
        this.calorieOutputCalculatorRng.setValue('Woman', 3);
        this.calorieOutputCalculatorRng.setValue(160, 4);
        this.calorieOutputCalculatorRng.setValue('Sedentary', 5);
        this.calorieOutputCalculatorRng.setValue(48, 6);
        this.calorieOutputCalculatorRng.setValue('Weight loss', 10);
        let resultBMR = this.calorieOutputCalculatorRng.getValue(8);
        let resultActive = this.calorieOutputCalculatorRng.getValue(9);
        let resultCalMin = this.calorieOutputCalculatorRng.getValue(11);
        let resultCalMax = this.calorieOutputCalculatorRng.getValue(12);
        //THEN
        assertEquals(resultBMR, expectedBMR);
        assertEquals(resultActive, expectedActive);
        assertEquals(resultCalMin, expectedCalMin);
        assertEquals(resultCalMax, expectedCalMax);
        //RESET
        testData.resetCalorieCalculatorValues();
    }

    shouldProfileSheetCalorieOuputCalculatorCalulateCaloriesCorrectlyForMan1(){
        //GIVEN
        let expectedBMR = 2374;
        let expectedActive = 4511;
        let expectedCalMin = 4380;
        let expectedCalMax = 4650;
        //WHEN
        this.calorieOutputCalculatorRng.setValue('01/01/2001', 1);
        this.calorieOutputCalculatorRng.setValue('Man', 3);
        this.calorieOutputCalculatorRng.setValue(205, 4);
        this.calorieOutputCalculatorRng.setValue('Extra active', 5);
        this.calorieOutputCalculatorRng.setValue(105, 6);
        this.calorieOutputCalculatorRng.setValue('Weight maintain', 10);
        let resultBMR = this.calorieOutputCalculatorRng.getValue(8);
        let resultActive = this.calorieOutputCalculatorRng.getValue(9);
        let resultCalMin = this.calorieOutputCalculatorRng.getValue(11);
        let resultCalMax = this.calorieOutputCalculatorRng.getValue(12);
        //THEN
        assertEquals(resultBMR, expectedBMR);
        assertEquals(resultActive, expectedActive);
        assertEquals(resultCalMin, expectedCalMin);
        assertEquals(resultCalMax, expectedCalMax);
        //RESET
        testData.resetCalorieCalculatorValues();
    }

    shouldProfileSheetCalorieOuputCalculatorCalulateCaloriesCorrectlyForMan2(){
        //GIVEN
        let expectedBMR = 1531;
        let expectedActive = 2105;
        let expectedCalMin = 2320;
        let expectedCalMax = 2530;
        //WHEN
        this.calorieOutputCalculatorRng.setValue('01/01/1976', 1);
        this.calorieOutputCalculatorRng.setValue('Man', 3);
        this.calorieOutputCalculatorRng.setValue(172, 4);
        this.calorieOutputCalculatorRng.setValue('Lightly active', 5);
        this.calorieOutputCalculatorRng.setValue(68, 6);
        this.calorieOutputCalculatorRng.setValue('Weight gain', 10);
        let resultBMR = this.calorieOutputCalculatorRng.getValue(8);
        let resultActive = this.calorieOutputCalculatorRng.getValue(9);
        let resultCalMin = this.calorieOutputCalculatorRng.getValue(11);
        let resultCalMax = this.calorieOutputCalculatorRng.getValue(12);
        //THEN
        assertEquals(resultBMR, expectedBMR);
        assertEquals(resultActive, expectedActive);
        assertEquals(resultCalMin, expectedCalMin);
        assertEquals(resultCalMax, expectedCalMax);
        //RESET
        testData.resetCalorieCalculatorValues();
    }

    shouldProfileSheetCopyCalorieOuputCalculatorDropBoxesAcceptCorrectValues(){
        // GIVEN
        let expectedSex = ['Woman', 'Man'];
        let expectedLevel = ['Sedentary', 'Lightly active', 'Moderately active', 'Very active', 'Extra active'];
        let expectedGoal = ['Weight maintain', 'Weight loss', 'Weight gain'];
        // WHEN
        let resultSex = this.calorieOutputCalculatorRng.getValidationCriteriaValues(3);
        let resultLevel = this.calorieOutputCalculatorRng.getValidationCriteriaValues(5);  
        let resultGoal = this.calorieOutputCalculatorRng.getValidationCriteriaValues(10);
        // THEN
        assertEquals(resultSex, expectedSex);
        assertEquals(resultLevel, expectedLevel);
        assertEquals(resultGoal, expectedGoal);
    }
}

var runProfileTests = () => new ProfileTest().runAllTests();
