class DayHeaderTest extends TestBaseDay {

    beforeAll(){
        super.beforeAll();
        this.macroProfilesRng = getRng(RNG.MACRO_PROFILES);
        this.selectedProfileRng = getRng(RNG.SELECTED_PROFILE);
        this.generalSettingsRng = getRng(RNG.GENERAL_SETTINGS);
        this.calDensityRng = getRng(RNG.CALORIE_DENSITY);
        this.calOutputRng = getRng(RNG.CALORIE_OUTPUT);
        this.checklist = getRng(RNG.CHECKLIST);
        this.currencyFormatRng = getRng(RNG.CURRENCY_FORMAT);
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
                            Array.from({length:11},(v,col)=> 
                            `=IF(ISBLANK($G${row + 6}), "", SUM(${testData.incCol('H', col)}${(row * 15) + 17}:${testData.incCol('H', col)}${(row * 15) + 31}))`));
        let sumExpected = [ `=ROUND(SUM(H17:H106))`, 
                            `=ROUND(SUM(I17:I106), 1)`, 
                            `=ROUND(SUM(J17:J106), 1)`, 
                            `=ROUND(SUM(K17:K106), 1)`, 
                            `=ROUND(SUM(L17:L106), 1)`, 
                            `=ROUND(SUM(M17:M106), 1)`, 
                            `=ROUND(SUM(N17:N106), 1)`, 
                            `=ROUND(SUM(O17:O106), 1)`, 
                            `=ROUND(SUM(P17:P106), 1)`, 
                            `=ROUND(SUM(Q17:Q106))`,
                            `=SUM(R17:R106)`];      
        let rangeExpected = [ `=CONCATENATE($AG$2, " - ", $AH$2, " kcal")`, 
                              `=CONCATENATE($AG$3, " - ", $AH$3, " g")`, 
                              `=CONCATENATE($AG$5, " - ", $AH$5, " g")`,
                              `=CONCATENATE($AG$6, " - ", $AH$6, " g")`,
                              `=CONCATENATE($AG$7, " - ", $AH$7, " g")`,
                              `=CONCATENATE($AG$9, " - ", $AH$9, " g")`,
                              `=CONCATENATE($AG$10, " - ", $AH$10, " g")`,
                              `=CONCATENATE($AG$11, " - ", $AH$11, " g")`,
                              `=CONCATENATE($AG$12, " - ", $AH$12, " g")`,
                              `=CONCATENATE($AG$14, " - ", $AH$14, " mg")`,
                              `=CONCATENATE(TEXT($AG$15, CurrencyFormat), " - ", TEXT($AH$15, CurrencyFormat))`];
        let diffExpected = [`=CONCAT(IF(H12<$AG$2, CONCAT("⇧ ",$AG$2-H12), IF(H12>$AH$2, CONCAT("⇩ ",H12 - $AH$2), CONCAT("✔ ",$AH$2-H12))), " kcal")`,
                            `=CONCAT(IF(I12<$AG$3, CONCAT("⇧ ", ROUND($AG$3-I12,1)), IF(I12>$AH$3, CONCAT("⇩ ", ROUND(I12 - $AH$3,1)), CONCAT("✔ ", ROUND($AH$3-I12,1)))), " g")`,
                            `=CONCAT(IF(J12<$AG$5, CONCAT("⇧ ", ROUND($AG$5-J12,1)), IF(J12>$AH$5, CONCAT("⇩ ", ROUND(J12 - $AH$5,1)), CONCAT("✔ ", ROUND($AH$5-J12,1)))), " g")`,
                            `=CONCAT(IF(K12<$AG$6, CONCAT("⇧ ", ROUND($AG$6-K12,1)), IF(K12>$AH$6, CONCAT("⇩ ", ROUND(K12 - $AH$6,1)), CONCAT("✔ ", ROUND($AH$6-K12,1)))), " g")`,
                            `=CONCAT(IF(L12<$AG$7, CONCAT("⇧ ", ROUND($AG$7-L12,1)), IF(L12>$AH$7, CONCAT("⇩ ", ROUND(L12 - $AH$7,1)), CONCAT("✔ ", ROUND($AH$7-L12,1)))), " g")`,
                            `=CONCAT(IF(M12<$AG$9, CONCAT("⇧ ", ROUND($AG$9-M12,1)), IF(M12>$AH$9, CONCAT("⇩ ", ROUND(M12 - $AH$9,1)), CONCAT("✔ ", ROUND($AH$9-M12,1)))), " g")`,
                            `=CONCAT(IF(N12<$AG$10, CONCAT("⇧ ", ROUND($AG$10-N12,1)), IF(N12>$AH$10, CONCAT("⇩ ", ROUND(N12 - $AH$10,1)), CONCAT("✔ ", ROUND($AH$10-N12,1)))), " g")`,
                            `=CONCAT(IF(O12<$AG$11, CONCAT("⇧ ", ROUND($AG$11-O12,1)), IF(O12>$AH$11, CONCAT("⇩ ", ROUND(O12 - $AH$11,1)), CONCAT("✔ ", ROUND($AH$11-O12,1)))), " g")`,
                            `=CONCAT(IF(P12<$AG$12, CONCAT("⇧ ", ROUND($AG$12-P12,1)), IF(P12>$AH$12, CONCAT("⇩ ", ROUND(P12 - $AH$12,1)), CONCAT("✔ ", ROUND($AH$12-P12,1)))), " g")`,
                            `=CONCAT(IF(Q12<$AG$14, CONCAT("⇧ ", ROUND($AG$14-Q12,1)), IF(Q12>$AH$14, CONCAT("⇩ ", ROUND(Q12 - $AH$14,1)), CONCAT("✔ ", ROUND($AH$14-Q12,1)))), " mg")`,
                            `=IF(R12<$AG$15, CONCAT("⇧ ", TEXT($AG$15-R12, CurrencyFormat)), IF(R12>$AH$15, CONCAT("⇩ ", TEXT(R12 - $AH$15, CurrencyFormat)), CONCAT("✔ ", TEXT($AH$15-R12, CurrencyFormat))))`];

        // WHEN
        let mealResult = this.daySht.getFormulas('H6:R11');
        let sumResult = this.daySht.getFormulas('H12:R12');
        let rangeResult = this.daySht.getFormulas('H13:R13');
        let diffResult = this.daySht.getFormulas('H14:R14');

        // THEN
        assertEquals(mealResult, mealExpected);
        assertEquals(sumExpected, sumResult);
        assertEquals(rangeExpected, rangeResult);
        assertEquals(diffExpected, diffResult);
    }

    shouldDaySheetHaveTheCorrectFormulaForProfileBackgroundCalculations(){
        // GIVEN
        let expectedProfileBackground = [
          [``, `=MATCH(D5, Profile!C3:P3, 0)`],
          [`=INDEX(Profile!$C$4:$P$13, 1, $AH$1)`, `=INDEX(Profile!$C$4:$P$13, 1, $AH$1 +1)`],
          [`=IF(Settings!E11, ROUND($AG$2*(AG4/100)/9), AG4)`, `=IF(Settings!E11, ROUND($AH$2*(AH4/100)/9), AH4)`], 
          [`=INDEX(Profile!$C$4:$P$13, 2, $AH$1)`, `=INDEX(Profile!$C$4:$P$13, 2, $AH$1 +1)`],
          [`=INDEX(Profile!$C$4:$P$13, 3, $AH$1)`, `=INDEX(Profile!$C$4:$P$13, 3, $AH$1 +1)`],
          [`=INDEX(Profile!$C$4:$P$13, 4, $AH$1)`, `=INDEX(Profile!$C$4:$P$13, 4, $AH$1 +1)`],
          [`=IF(Settings!E11, ROUND($AG$2*(AG8/100)/4), AG8) `, `=IF(Settings!E11, ROUND($AH$2*(AH8/100)/4), AH8) `],
          [`=INDEX(Profile!$C$4:$P$13, 5, $AH$1)`, `=INDEX(Profile!$C$4:$P$13, 5, $AH$1 +1)`],
          [`=INDEX(Profile!$C$4:$P$13, 6, $AH$1)`, `=INDEX(Profile!$C$4:$P$13, 6, $AH$1 +1)`],
          [`=INDEX(Profile!$C$4:$P$13, 7, $AH$1)`, `=INDEX(Profile!$C$4:$P$13, 7, $AH$1 +1)`],
          [`=INDEX(Profile!$C$4:$P$13, 8, $AH$1)`, `=INDEX(Profile!$C$4:$P$13, 8, $AH$1 +1)`],
          [`=IF(Settings!E11, ROUND($AG$2*(AG13/100)/4), AG13) `, `=IF(Settings!E11, ROUND($AH$2*(AH13/100)/4), AH13) `], 
          [`=INDEX(Profile!$C$4:$P$13, 9, $AH$1)`, `=INDEX(Profile!$C$4:$P$13, 9, $AH$1 +1)`],
          [`=INDEX(Profile!$C$4:$P$13, 10, $AH$1)`, `=INDEX(Profile!$C$4:$P$13, 10, $AH$1 +1)`],
          [`=INDEX(Profile!$C$4:$P$14, 11, $AH$1)`, `=INDEX(Profile!$C$4:$P$14, 11, $AH$1 +1)`],
        ]
        let expectedNoomBackground = [
          [`=ROUND(Profile!$D$27*0.3,-1)`, `=ROUND(Profile!$D$28*0.3,-1)`],
          [`=ROUND(Profile!$D$27*0.45,-1)`, `=ROUND(Profile!$D$28*0.45,-1)`],
          [`=ROUND(Profile!$D$27*0.25,-1)`, `=ROUND(Profile!$D$28*0.25,-1)`]
        ];
        let expectedCurrencyFormat = '£#,##0.00';
        // WHEN
        let resultProfileBackground = this.daySht.getFormulas('AG1:AH15');
        let resultNoomBackground = this.daySht.getFormulas('AG17:AH19');
        let resultCurrencyFormat = this.currencyFormatRng.getValue();
        // THEN
        assertEquals(resultProfileBackground, expectedProfileBackground);
        assertEquals(resultNoomBackground, expectedNoomBackground);
        assertEquals(resultCurrencyFormat, expectedCurrencyFormat);
    }

    shouldDaySheetHaveTheCorrectFormulaForNoomSummary(){
        // GIVEN
        let expectedNoom = [
          [`=ROUND(SUMIF(S17:S106, Texts!B82, H17:H106))`],
          [`=CONCATENATE(AG17, " - ", AH17, " kcal")`],
          [`=CONCAT(IF(U6<AG17, CONCAT("⇧ ",AG17-U6), IF(U6>AH17, CONCAT("⇩ ",U6-AH17), CONCAT("✔ ", AH17-U6))), " kcal")`],
          [`=ROUND(SUMIF(S17:S106, Texts!B83, H17:H106))`],
          [`=CONCATENATE(AG18, " - ", AH18, " kcal")`],
          [`=CONCAT(IF(U9<AG18, CONCAT("⇧ ",AG18-U9), IF(U9>AH18, CONCAT("⇩ ",U9-AH18), CONCAT("✔ ", AH18-U9))), " kcal")`],
          [`=ROUND(SUMIF(S17:S106, Texts!B84, H17:H106))`],
          [`=CONCATENATE(AG19, " - ", AH19, " kcal")`],
          [`=CONCAT(IF(U12<AG19, CONCAT("⇧ ",AG19-U12), IF(U12>AH19, CONCAT("⇩ ",U12-AH19), CONCAT("✔ ", AH19-U12))), " kcal")`]
        ];
        // WHEN
        let resultNoom = this.daySht.getFormulas(`U6:U14`);
        // THEN
        assertEquals(resultNoom, expectedNoom);
    }

    shouldDaySheetHaveTheCorrectFormulaForLeftSideSummary(){
        // GIVEN
        let expectedOutput = '=D6-H12';
        let expectedChecklist = [
          ['=IF(IFERROR(SEARCH("✔", H14)),"✔️", "❌")'],
          ['=IF(COUNTIFS(TRANSPOSE(NutritionFields), "TRUE", I14:Q14, "✔*")=COUNTIF(NutritionFields, "TRUE"),"✔️", "❌")'],
          ['=IF(AND(B14>=50,B14<=100), "✔️", "❌")']];
        let expectedCalDensity = [
          '=IFERROR(H12/SUM(V17:V106)*100, 0)', '',
          '=SPARKLINE(B14,{"charttype","bar";"max",250;"min",0;"color1",IFS(B13<50, "Cyan", B14<100, "Green", B14<150, "Yellow", B14<200, "Orange", B14>=200, "Red")})'];
        // WHEN
        let resultOutput = this.daySht.getFormula('D7');
        let resultChecklist = this.daySht.getFormulas('D9:D11');
        let resultCalDensity = this.daySht.getFormulas('B14:D14');
        // THEN
        assertEquals(resultOutput, expectedOutput);
        assertEquals(resultChecklist, expectedChecklist);
        assertEquals(resultCalDensity, expectedCalDensity);
    }

    shouldDaySheetUseRightFormatForSummaries(){
        // GIVEN
        let expected = Array(7).fill(['0 kcal', '0.0 g', '0.0 g', '0.0 g', '0.0 g', '0.0 g', '0.0 g', '0.0 g', '0.0 g', '0 mg', '£0.00']);
        // WHEN
        let result = this.daySht.getDisplayValues('H6:R12');
        // THEN
        assertEquals(result, expected);
    }

    shouldDaySheetCalculateSummariesCorretly(){
        // GIVEN
        let meal = [this.item('Green', 350), this.item('Yellow', 250), this.item('Red', 90)];
        let expectedMeals = Array(6).fill([1300, 130, 136.9, 143.8, 150.7, 157.6, 164.5, 171.4, 178.3, 185.2, 37.5]);
        let expectedSummary = [7800, 780, 821.4, 862.8, 904.2, 945.6, 987, 1028.4, 1069.8, 1111, 225];
        // WHEN
        this.addItemsDaySheet(meal, 17);
        this.addItemsDaySheet(meal, 32);
        this.addItemsDaySheet(meal, 47);
        this.addItemsDaySheet(meal, 62);
        this.addItemsDaySheet(meal, 77);
        this.addItemsDaySheet(meal, 92);
        
        let resultMeals = this.daySht.getValues('H6:R11');
        let resultSummary = this.daySht.getValues('H12:R12');
        // THEN
        assertEquals(resultMeals, expectedMeals);
        assertEquals(resultSummary, expectedSummary);
    }

    shouldDaySheetCalculateCorrectRangeForMarcoProfileWhenUsePercentage(){
        // GIVEN
        let expectedBackgroud = [
          ['Selected profile:', 1],
          [1000, 2000],
          [11, 44],
          [10, 20],
          [11, 21],
          [12, 22],
          [33, 115],
          [13, 23],
          [14, 24],
          [15, 25],
          [16, 26],
          [43, 135],
          [17, 27],
          [18, 28],
          [19, 29],
        ];
        let expectedRange = ['1000 - 2000 kcal', '11 - 44 g', '11 - 21 g', '12 - 22 g', '33 - 115 g', '14 - 24 g', '15 - 25 g', '16 - 26 g', '43 - 135 g', '18 - 28 mg', '£19.00 - £29.00'];
        // WHEN
        this.generalSettingsRng.setValue("TRUE", 8);
        let resultBackground = this.daySht.getValues('AG1:AH15');
        let resultRange = this.daySht.getDisplayValues('H13:R13');
        // THEN
        assertEquals(resultBackground, expectedBackgroud);
        assertEquals(resultRange, expectedRange);
    }

    shouldDaySheetCalculateCorrectRangeForMarcoProfileWhenOnlyUseGrams(){
        // GIVEN
        let expectedBackgroud = [
          ['Selected profile:', 1],
          [1000, 2000],
          [10, 20],
          [10, 20],
          [11, 21],
          [12, 22],
          [13, 23],
          [13, 23],
          [14, 24],
          [15, 25],
          [16, 26],
          [17, 27],
          [17, 27],
          [18, 28],
          [19, 29]
        ];
        let expectedRange = ['1000 - 2000 kcal', '10 - 20 g', '11 - 21 g', '12 - 22 g', '13 - 23 g', '14 - 24 g', '15 - 25 g', '16 - 26 g', '17 - 27 g', '18 - 28 mg', '£19.00 - £29.00'];
        // WHEN
        this.generalSettingsRng.setValue("FALSE", 8);
        let resultBackground = this.daySht.getValues('AG1:AH15');
        let resultRange = this.daySht.getDisplayValues('H13:R13');
        // THEN
        assertEquals(resultBackground, expectedBackgroud);
        assertEquals(resultRange, expectedRange);
        // RESET 
        this.generalSettingsRng.setValue("TRUE", 8);
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
          let result = this.daySht.getDisplayValue('H13');
          // THEN 
          assertEquals(result, expectedCalories);
        }
    }

    shouldDaySheetCalculateCorrectDifference(){
        // GIVEN
        let meal = [this.item('Green', 100), this.item('Yellow', 100), this.item('Red', 100)];
        let expectedDiff = ['⇧ 200 kcal','⇩ 36 g','⇩ 62 g','⇩ 64 g','✔ 26 g','⇩ 68 g','⇩ 70 g','⇩ 72 g','✔ 34 g','⇩ 76 mg', '✔ £8.00'];
        // WHEN
        this.addItemsDaySheet(meal);
        this.selectedProfileRng.setValue('Test 1');
        let resultDiff = this.daySht.getValues('H14:R14'); 
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
        let resultGreen = this.daySht.getValue('U6');
        let resultYellow = this.daySht.getValue('U9');
        let resultRed = this.daySht.getValue('U12');
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
        this.generalSettingsRng.setValue("TRUE", 6);
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
        let resultDifference = this.daySht.getValue('D7');
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