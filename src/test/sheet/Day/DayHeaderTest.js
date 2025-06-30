class DayHeaderTest extends TestBaseDay {

    beforeAll(){
        super.beforeAll();
        this.macroProfilesRng = getRng(RNG.MACRO_PROFILES);
        this.selectedProfileRng = getRng(RNG.SELECTED_PROFILE);
        this.generalSettingsRng = getRng(RNG.GENERAL_SETTINGS);
        this.calDensityRng = getRng(RNG.CALORIE_DENSITY);
        this.calOutputRng = getRng(RNG.CALORIE_OUTPUT);
        this.checklist = getRng(RNG.CHECKLIST);
        testData.addTestProfiles();
        this.selectedProfileRng.setValue('Test 1');
    }

    afterAll(){
        super.afterAll();
        testData.addDefaultProfile();
        this.selectedProfileRng.setValue('Default');
    }

    shouldDaySheetHaveTheCorrectFormulaForAllSummaryRows(){
        // GIVEN
        let mealExpected = Array.from({length:6},(v,row)=> 
                            Array.from({length:10},(v,col)=> 
                            `=IF(ISBLANK($G${row + 4}), "", SUM(${testData.incCol('H', col)}${(row * 15) + 15}:${testData.incCol('H', col)}${(row * 15) + 29}))`));
        let sumExpected = [ `=ROUND(SUM(H15:H104))`, 
                            `=ROUND(SUM(I15:I104), 1)`, 
                            `=ROUND(SUM(J15:J104), 1)`, 
                            `=ROUND(SUM(K15:K104), 1)`, 
                            `=ROUND(SUM(L15:L104), 1)`, 
                            `=ROUND(SUM(M15:M104), 1)`, 
                            `=ROUND(SUM(N15:N104), 1)`, 
                            `=ROUND(SUM(O15:O104), 1)`, 
                            `=ROUND(SUM(P15:P104), 1)`, 
                            `=ROUND(SUM(Q15:Q104))`];      
        let rangeExpected = [ `=CONCATENATE($X$2, " - ", $Y$2, " kcal")`, 
                              `=CONCATENATE($X$3, " - ", $Y$3, " g")`, 
                              `=CONCATENATE($X$4, " - ", $Y$4, " g")`,
                              `=CONCATENATE($X$5, " - ", $Y$5, " g")`,
                              `=CONCATENATE($X$6, " - ", $Y$6, " g")`,
                              `=CONCATENATE($X$7, " - ", $Y$7, " g")`,
                              `=CONCATENATE($X$8, " - ", $Y$8, " g")`,
                              `=CONCATENATE($X$9, " - ", $Y$9, " g")`,
                              `=CONCATENATE($X$10, " - ", $Y$10, " g")`,
                              `=CONCATENATE($X$11, " - ", $Y$11, " mg")`];
        let diffExpected = [`=CONCAT(IF(H10<$X$2, CONCAT("⇧ ",$X$2-H10), IF(H10>$Y$2, CONCAT("⇩ ",H10 - $Y$2), CONCAT("✔ ",$Y$2-H10))), " kcal")`,
                            `=CONCAT(IF(I10<$X$3, CONCAT("⇧ ", ROUND($X$3-I10,1)), IF(I10>$Y$3, CONCAT("⇩ ", ROUND(I10 - $Y$3,1)), CONCAT("✔ ", ROUND($Y$3-I10,1)))), " g")`,
                            `=CONCAT(IF(J10<$X$4, CONCAT("⇧ ", ROUND($X$4-J10,1)), IF(J10>$Y$4, CONCAT("⇩ ", ROUND(J10 - $Y$4,1)), CONCAT("✔ ", ROUND($Y$4-J10,1)))), " g")`,
                            `=CONCAT(IF(K10<$X$5, CONCAT("⇧ ", ROUND($X$5-K10,1)), IF(K10>$Y$5, CONCAT("⇩ ", ROUND(K10 - $Y$5,1)), CONCAT("✔ ", ROUND($Y$5-K10,1)))), " g")`,
                            `=CONCAT(IF(L10<$X$6, CONCAT("⇧ ", ROUND($X$6-L10,1)), IF(L10>$Y$6, CONCAT("⇩ ", ROUND(L10 - $Y$6,1)), CONCAT("✔ ", ROUND($Y$6-L10,1)))), " g")`,
                            `=CONCAT(IF(M10<$X$7, CONCAT("⇧ ", ROUND($X$7-M10,1)), IF(M10>$Y$7, CONCAT("⇩ ", ROUND(M10 - $Y$7,1)), CONCAT("✔ ", ROUND($Y$7-M10,1)))), " g")`,
                            `=CONCAT(IF(N10<$X$8, CONCAT("⇧ ", ROUND($X$8-N10,1)), IF(N10>$Y$8, CONCAT("⇩ ", ROUND(N10 - $Y$8,1)), CONCAT("✔ ", ROUND($Y$8-N10,1)))), " g")`,
                            `=CONCAT(IF(O10<$X$9, CONCAT("⇧ ", ROUND($X$9-O10,1)), IF(O10>$Y$9, CONCAT("⇩ ", ROUND(O10 - $Y$9,1)), CONCAT("✔ ", ROUND($Y$9-O10,1)))), " g")`,
                            `=CONCAT(IF(P10<$X$10, CONCAT("⇧ ", ROUND($X$10-P10,1)), IF(P10>$Y$10, CONCAT("⇩ ", ROUND(P10 - $Y$10,1)), CONCAT("✔ ", ROUND($Y$10-P10,1)))), " g")`,
                            `=CONCAT(IF(Q10<$X$11, CONCAT("⇧ ", ROUND($X$11-Q10,1)), IF(Q10>$Y$11, CONCAT("⇩ ", ROUND(Q10 - $Y$11,1)), CONCAT("✔ ", ROUND($Y$11-Q10,1)))), " mg")`];

        // WHEN
        let mealResult = this.daySht.getFormulas('H4:Q9');
        let sumResult = this.daySht.getFormulas('H10:Q10');
        let rangeResult = this.daySht.getFormulas('H11:Q11');
        let diffResult = this.daySht.getFormulas('H12:Q12');

        // THEN
        assertEquals(mealResult, mealExpected);
        assertEquals(sumExpected, sumResult);
        assertEquals(rangeExpected, rangeResult);
        assertEquals(diffExpected, diffResult);
    }

    shouldDaySheetHaveTheCorrectFormulaForProfileBackgroundCalculations(){
        // GIVEN
        let expectedProfileBackground = [
          [`=MATCH(D3, Profile!C3:P3, 0)`, `=INDEX(Days!A4:A,AA1)`, `=IFERROR(MATCH(IF(DayName = "Default", DayName, DATEVALUE(RIGHT(DayName, 10))), Days!A4:A, 0), 0)`, ``],
          [`=INDEX(Profile!$C$4:$P$13, 1, $X$1)`, `=INDEX(Profile!$C$4:$P$13, 1, $X$1 +1)`, ``, ``],
          [`=IF(Settings!E10, ROUND($X$2*(Z3/100)/9), Z3)`, `=IF(Settings!E10, ROUND($Y$2*(AA3/100)/9), AA3)`, `=INDEX(Profile!$C$4:$P$13, 2, $X$1)`, `=INDEX(Profile!$C$4:$P$13, 2, $X$1 +1)`],
          [`=INDEX(Profile!$C$4:$P$13, 3, $X$1)`, `=INDEX(Profile!$C$4:$P$13, 3, $X$1 +1)`, ``, ``],
          [`=INDEX(Profile!$C$4:$P$13, 4, $X$1)`, `=INDEX(Profile!$C$4:$P$13, 4, $X$1 +1)`, ``, ``],
          [`=IF(Settings!E10, ROUND($X$2*(Z6/100)/4), Z6) `, `=IF(Settings!E10, ROUND($Y$2*(AA6/100)/4), AA6) `, `=INDEX(Profile!$C$4:$P$13, 5, $X$1)`, `=INDEX(Profile!$C$4:$P$13, 5, $X$1 +1)`],
          [`=INDEX(Profile!$C$4:$P$13, 6, $X$1)`, `=INDEX(Profile!$C$4:$P$13, 6, $X$1 +1)`, ``, ``],
          [`=INDEX(Profile!$C$4:$P$13, 7, $X$1)`, `=INDEX(Profile!$C$4:$P$13, 7, $X$1 +1)`, ``, ``],
          [`=INDEX(Profile!$C$4:$P$13, 8, $X$1)`, `=INDEX(Profile!$C$4:$P$13, 8, $X$1 +1)`, ``, ``],
          [`=IF(Settings!E10, ROUND($X$2*(Z10/100)/4), Z10) `, `=IF(Settings!E10, ROUND($Y$2*(AA10/100)/4), AA10) `, `=INDEX(Profile!$C$4:$P$13, 9, $X$1)`, `=INDEX(Profile!$C$4:$P$13, 9, $X$1 +1)`],
          [`=INDEX(Profile!$C$4:$P$13, 10, $X$1)`, `=INDEX(Profile!$C$4:$P$13, 10, $X$1 +1)`, ``, ``]
        ]
        let expectedNoomBackground = [
          [`=ROUND(Profile!$D$26*0.3,-1)`, `=ROUND(Profile!$D$27*0.3,-1)`],
          [`=ROUND(Profile!$D$26*0.45,-1)`, `=ROUND(Profile!$D$27*0.45,-1)`],
          [`=ROUND(Profile!$D$26*0.25,-1)`, `=ROUND(Profile!$D$27*0.25,-1)`]
        ];
        // WHEN
        let resultProfileBackground = this.daySht.getFormulas('X1:AA11');
        let resultNoomBackground = this.daySht.getFormulas('X12:Y14');
        // THEN
        assertEquals(resultProfileBackground, expectedProfileBackground);
        assertEquals(resultNoomBackground, expectedNoomBackground);
    }

    shouldDaySheetHaveTheCorrectFormulaForNoomSummary(){
        // GIVEN
        let expectedNoom = [
          [`=ROUND(SUMIF(R15:R104, "Green", H15:H104))`],
          [`=CONCATENATE(X12, " - ", Y12, " kcal")`],
          [`=CONCAT(IF(T4<X12, CONCAT("⇧ ",X12-T4), IF(T4>Y12, CONCAT("⇩ ",T4-Y12), CONCAT("✔ ", Y12-T4))), " kcal")`],
          [`=ROUND(SUMIF(R15:R104, "Yellow", H15:H104))`],
          [`=CONCATENATE(X13, " - ", Y13, " kcal")`],
          [`=CONCAT(IF(T7<X13, CONCAT("⇧ ",X13-T7), IF(T7>Y13, CONCAT("⇩ ",T7-Y13), CONCAT("✔ ", Y13-T7))), " kcal")`],
          [`=ROUND(SUMIF(R15:R104, "Red", H15:H104))`],
          [`=CONCATENATE(X14, " - ", Y14, " kcal")`],
          [`=CONCAT(IF(T10<X14, CONCAT("⇧ ",X14-T10), IF(T10>Y14, CONCAT("⇩ ",T10-Y14), CONCAT("✔ ", Y14-T10))), " kcal")`]
        ];
        // WHEN
        let resultNoom = this.daySht.getFormulas(`T4:T12`);
        // THEN
        assertEquals(resultNoom, expectedNoom);
    }

    shouldDaySheetHaveTheCorrectFormulaForLeftSideSummary(){
        // GIVEN
        let expectedOutput = '=D4-H10';
        let expectedChecklist = [
          ['=IF(IFERROR(SEARCH("✔", H12)),"✔️", "❌")'],
          ['=IF(COUNTIFS(TRANSPOSE(NutritionFields), "TRUE", I12:Q12, "✔*")=COUNTIF(NutritionFields, "TRUE"),"✔️", "❌")'],
          ['=IF(AND(B12>=50,B12<=100), "✔️", "❌")']];
        let expectedCalDensity = [
          '=IFERROR(H10/SUM(U15:U90)*100, 0)', '',
          '=SPARKLINE(B12,{"charttype","bar";"max",250;"min",0;"color1",IFS(B11<50, "Cyan", B12<100, "Green", B12<150, "Yellow", B12<200, "Orange", B12>=200, "Red")})'];
        // WHEN
        let resultOutput = this.daySht.getFormula('D5');
        let resultChecklist = this.daySht.getFormulas('D7:D9');
        let resultCalDensity = this.daySht.getFormulas('B12:D12');
        // THEN
        assertEquals(resultOutput, expectedOutput);
        assertEquals(resultChecklist, expectedChecklist);
        assertEquals(resultCalDensity, expectedCalDensity);
    }

    shouldDaySheetUseRightFormatForSummaries(){
        // GIVEN
        let expected = Array(7).fill(['0 kcal', '0.0 g', '0.0 g', '0.0 g', '0.0 g', '0.0 g', '0.0 g', '0.0 g', '0.0 g', '0 mg']);
        // WHEN
        let result = this.daySht.getDisplayValues('H4:Q10');
        // THEN
        assertEquals(result, expected);
    }

    shouldDaySheetCalculateSummariesCorretly(){
        // GIVEN
        let meal = [this.item('Green', 350), this.item('Yellow', 250), this.item('Red', 90)];
        let expectedMeals = Array(6).fill([1300, 130, 136.9, 143.8, 150.7, 157.6, 164.5, 171.4, 178.3, 185.2]);
        let expectedSummary = [7800, 780, 821.4, 862.8, 904.2, 945.6, 987, 1028.4, 1069.8, 1111];
        // WHEN
        this.addItemsDaySheet(meal, 15);
        this.addItemsDaySheet(meal, 30);
        this.addItemsDaySheet(meal, 45);
        this.addItemsDaySheet(meal, 60);
        this.addItemsDaySheet(meal, 75);
        this.addItemsDaySheet(meal, 90);
        
        let resultMeals = this.daySht.getValues('H4:Q9');
        let resultSummary = this.daySht.getValues('H10:Q10');
        // THEN
        assertEquals(resultMeals, expectedMeals);
        assertEquals(resultSummary, expectedSummary);
    }

    shouldDaySheetCalculateCorrectRangeForMarcoProfileWhenUsePercentage(){
        // GIVEN
        let expectedBackgroud = [
          [1, getToday()],
          [1000, 2000],
          [11, 44],
          [11, 21],
          [12, 22],
          [33, 115],
          [14, 24],
          [15, 25],
          [16, 26],
          [43, 135],
          [18, 28]
        ];
        let expectedRange = ['1000 - 2000 kcal', '11 - 44 g', '11 - 21 g', '12 - 22 g', '33 - 115 g', '14 - 24 g', '15 - 25 g', '16 - 26 g', '43 - 135 g', '18 - 28 mg'];
        // WHEN
        this.generalSettingsRng.setValue("TRUE", 7);
        let resultBackground = this.daySht.getValues('X1:Y11');
        let resultRange = this.daySht.getDisplayValues('H11:Q11');
        // THEN
        assertEquals(resultBackground, expectedBackgroud);
        assertEquals(resultRange, expectedRange);
    }

    shouldDaySheetCalculateCorrectRangeForMarcoProfileWhenOnlyUseGrams(){
        // GIVEN
        let expectedBackgroud = [
          [1, getToday()],
          [1000, 2000],
          [10, 20],
          [11, 21],
          [12, 22],
          [13, 23],
          [14, 24],
          [15, 25],
          [16, 26],
          [17, 27],
          [18, 28]
        ];
        let expectedRange = ['1000 - 2000 kcal', '10 - 20 g', '11 - 21 g', '12 - 22 g', '13 - 23 g', '14 - 24 g', '15 - 25 g', '16 - 26 g', '17 - 27 g', '18 - 28 mg'];
        // WHEN
        this.generalSettingsRng.setValue("FALSE", 7);
        let resultBackground = this.daySht.getValues('X1:Y11');
        let resultRange = this.daySht.getDisplayValues('H11:Q11');
        // THEN
        assertEquals(resultBackground, expectedBackgroud);
        assertEquals(resultRange, expectedRange);
        // RESET 
        this.generalSettingsRng.setValue("TRUE", 7);
    }

    shouldDaySheetProfileSelectAcceptAllProfiles(){
        // GIVEN
        let expected = ['Test 1', 'Test 2', 'Test 3', 'Test 4', 'Test 5', 'Test 6', 'Test 7'];
        // WHEN
        let result = this.selectedProfileRng.getValidationCriteriaRangeValues();
        // THEN
        assertEquals(result, expected);
    }

    shouldDaySheetCalulateRangeForMultipleProfiles(){
        for(var i = 1; i<=7; i++){
          // GIVEN
          let expectedCalories = `${i * 1000} - ${(i +1) * 1000} kcal`;
          // WHEN
          this.selectedProfileRng.setValue(`Test ${i}`);
          let result = this.daySht.getDisplayValue('H11');
          // THEN 
          assertEquals(result, expectedCalories);
        }
    }

    shouldDaySheetCalculateCorrectDifference(){
        // GIVEN
        let meal = [this.item('Green', 100), this.item('Yellow', 100), this.item('Red', 100)];
        let expectedDiff = ['⇧ 200 kcal','⇩ 36 g','⇩ 62 g','⇩ 64 g','✔ 26 g','⇩ 68 g','⇩ 70 g','⇩ 72 g','✔ 34 g','⇩ 76 mg'];
        // WHEN
        this.addItemsDaySheet(meal);
        this.selectedProfileRng.setValue('Test 1');
        let resultDiff = this.daySht.getValues('H12:Q12'); 
        // THEN
        assertEquals(resultDiff, expectedDiff);
    }

    shouldDaySheetCalculateCorrectCalorieDensity(){
        // GIVEN
        let meal = [this.item('Green', 300), this.item('Yellow', 150), this.item('Red', 50)];
        let expectedDensity = 170;
        // WHEN
        this.addItemsDaySheet(meal);
        let resultDensity = this.calDensityRng.getValue();
        // THEN
        assertEquals(resultDensity, expectedDensity);
    }

    shouldDaySheetCalculateRightNoomSummary(){
        // GIVEN
        let meal = [this.item('Green', 300), this.item('Yellow', 150), this.item('Red', 50)];
        let expectedGreen = 300;
        let expectedYellow = 300;
        let expectedRed = 250;
        // WHEN
        this.addItemsDaySheet(meal);
        let resultGreen = this.daySht.getValue('T4');
        let resultYellow = this.daySht.getValue('T7');
        let resultRed = this.daySht.getValue('T10');
        // THEN
        assertEquals(resultGreen, expectedGreen);
        assertEquals(resultYellow, expectedYellow);
        assertEquals(resultRed, expectedRed);
    }

    shouldDaySheetHaveAllGreenChecklistInAllTheValuesAreInRange(){
        // GIVEN
        let meal = [this.item('All Green', 1500)];
        let expectedChecklist = [['✔️'],['✔️'],['✔️']];
        // WHEN
        this.generalSettingsRng.setValue("TRUE", 5);
        this.selectedProfileRng.setValue(`Test 1`);
        this.addItemsDaySheet(meal);
        SpreadsheetApp.flush();
        let resultChecklist = this.checklist.getValues();
        // THEN
        assertEquals(resultChecklist, expectedChecklist);
    }

    shouldDaySheetCalculateCalorieBurntDifferenceCorrectly(){
        // GIVEN
        let meal = [this.item('Green', 800), this.item('Yellow', 400), this.item('Red', 100)];
        let calOutput = 2500;
        let expectedDifference = 400;
        // WHEN
        this.addItemsDaySheet(meal);
        this.calOutputRng.setValue(calOutput);
        let resultDifference = this.daySht.getValue('D5');
        // THEN
        assertEquals(resultDifference, expectedDifference);
    }

    shouldThrowExceptionIfInvalidProfileSeleceted(){
        // GIVEN WHEN THEN
        assertException(() => {
          this.selectedProfileRng.setValue(`Non existing profile`);
        }, true);
    }
}

var runDaySummaryTests = () => new DayHeaderTest().runAllTests();