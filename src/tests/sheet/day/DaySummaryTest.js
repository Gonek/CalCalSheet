class DaySummaryTest extends TestBaseToday {

  constructor(){
    super();
    this.macroProfilesRng = new Rng(RNG_MACRO_PROFILES);
    this.selectedProfileRng = new Rng(`${TODAY}!${RNG_SELECTED_PROFILE}`);
    this.generalSettingsRng = new Rng(RNG_GENERAL_SETTINGS);
    this.calDensityRng = new Rng(`${TODAY}!${RNG_CALORIE_DENSITY}`);
    this.calOutputRng = new Rng(`${TODAY}!${RNG_CALORIE_OUTPUT}`);
    this.checklist = new Rng(`${TODAY}!${RNG_CHECKLIST}`);
  }

  beforeAll(){
    super.beforeAll();
    this.utils.addTestProfiles();
    this.selectedProfileRng.setValue('Test 1');
  }

  afterAll(){
    super.afterAll();
    this.utils.addDefaultProfile();
    this.selectedProfileRng.setValue('Default');
  }

  shouldTodaySheetHaveTheCorrectFormulaForAllSummaryRows(){
    // GIVEN
    let mealExpected = Array.from({length:6},(v,row)=> 
                        Array.from({length:10},(v,col)=> 
                        `=IF(ISBLANK($G${row + 4}), "", SUM(${this.utils.incCol('H', col)}${(row * 15) + 15}:${this.utils.incCol('H', col)}${(row * 15) + 29}))`));
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
                        `=CONCAT(IF(I10<$X$3, CONCAT("⇧ ",$X$3-I10), IF(I10>$Y$3, CONCAT("⇩ ",I10 - $Y$3), CONCAT("✔ ",$Y$3-I10))), " g")`,
                        `=CONCAT(IF(J10<$X$4, CONCAT("⇧ ",$X$4-J10), IF(J10>$Y$4, CONCAT("⇩ ",J10 - $Y$4), CONCAT("✔ ",$Y$4-J10))), " g")`,
                        `=CONCAT(IF(K10<$X$5, CONCAT("⇧ ",$X$5-K10), IF(K10>$Y$5, CONCAT("⇩ ",K10 - $Y$5), CONCAT("✔ ",$Y$5-K10))), " g")`,
                        `=CONCAT(IF(L10<$X$6, CONCAT("⇧ ",$X$6-L10), IF(L10>$Y$6, CONCAT("⇩ ",L10 - $Y$6), CONCAT("✔ ",$Y$6-L10))), " g")`,
                        `=CONCAT(IF(M10<$X$7, CONCAT("⇧ ",$X$7-M10), IF(M10>$Y$7, CONCAT("⇩ ",M10 - $Y$7), CONCAT("✔ ",$Y$7-M10))), " g")`,
                        `=CONCAT(IF(N10<$X$8, CONCAT("⇧ ",$X$8-N10), IF(N10>$Y$8, CONCAT("⇩ ",N10 - $Y$8), CONCAT("✔ ",$Y$8-N10))), " g")`,
                        `=CONCAT(IF(O10<$X$9, CONCAT("⇧ ",$X$9-O10), IF(O10>$Y$9, CONCAT("⇩ ",O10 - $Y$9), CONCAT("✔ ",$Y$9-O10))), " g")`,
                        `=CONCAT(IF(P10<$X$10, CONCAT("⇧ ",$X$10-P10), IF(P10>$Y$10, CONCAT("⇩ ",P10 - $Y$10), CONCAT("✔ ",$Y$10-P10))), " g")`,
                        `=CONCAT(IF(Q10<$X$11, CONCAT("⇧ ",$X$11-Q10), IF(Q10>$Y$11, CONCAT("⇩ ",Q10 - $Y$11), CONCAT("✔ ",$Y$11-Q10))), " mg")`];

    // WHEN
    let mealResult = this.daySpr.getFormulas('H4:Q9');
    let sumResult = this.daySpr.getFormulas('H10:Q10');
    let rangeResult = this.daySpr.getFormulas('H11:Q11');
    let diffResult = this.daySpr.getFormulas('H12:Q12');

    // THEN
    this.assertEquals(mealResult, mealExpected);
    this.assertEquals(sumExpected, sumResult);
    this.assertEquals(rangeExpected, rangeResult);
    this.assertEquals(diffExpected, diffResult);
  }

  shouldTodaySheetHaveTheCorrectFormulaForProfileBackgroundCalculations(){
    // GIVEN
    let expectedProfileBackground = [
      [`=MATCH(D3, Profile!C3:P3, 0)`, ``, ``, ``],
      [`=INDEX(Profile!$C$4:$P$13, 1, $X$1)`, `=INDEX(Profile!$C$4:$P$13, 1, $X$1 +1)`, ``, ``],
      [`=IF(Settings!E8, ROUND($X$2*(Z3/100)/9), Z3)`, `=IF(Settings!E8, ROUND($Y$2*(AA3/100)/9), AA3)`, `=INDEX(Profile!$C$4:$P$13, 2, $X$1)`, `=INDEX(Profile!$C$4:$P$13, 2, $X$1 +1)`],
      [`=INDEX(Profile!$C$4:$P$13, 3, $X$1)`, `=INDEX(Profile!$C$4:$P$13, 3, $X$1 +1)`, ``, ``],
      [`=INDEX(Profile!$C$4:$P$13, 4, $X$1)`, `=INDEX(Profile!$C$4:$P$13, 4, $X$1 +1)`, ``, ``],
      [`=IF(Settings!E8, ROUND($X$2*(Z6/100)/4), Z6) `, `=IF(Settings!E8, ROUND($Y$2*(AA6/100)/4), AA6) `, `=INDEX(Profile!$C$4:$P$13, 5, $X$1)`, `=INDEX(Profile!$C$4:$P$13, 5, $X$1 +1)`],
      [`=INDEX(Profile!$C$4:$P$13, 6, $X$1)`, `=INDEX(Profile!$C$4:$P$13, 6, $X$1 +1)`, ``, ``],
      [`=INDEX(Profile!$C$4:$P$13, 7, $X$1)`, `=INDEX(Profile!$C$4:$P$13, 7, $X$1 +1)`, ``, ``],
      [`=INDEX(Profile!$C$4:$P$13, 8, $X$1)`, `=INDEX(Profile!$C$4:$P$13, 8, $X$1 +1)`, ``, ``],
      [`=IF(Settings!E8, ROUND($X$2*(Z10/100)/4), Z10) `, `=IF(Settings!E8, ROUND($Y$2*(AA10/100)/4), AA10) `, `=INDEX(Profile!$C$4:$P$13, 9, $X$1)`, `=INDEX(Profile!$C$4:$P$13, 9, $X$1 +1)`],
      [`=INDEX(Profile!$C$4:$P$13, 10, $X$1)`, `=INDEX(Profile!$C$4:$P$13, 10, $X$1 +1)`, ``, ``]
    ]
    let expectedNoomBackground = [
      [`=ROUND(Profile!$D$29*0.3,-1)`, `=ROUND(Profile!$D$30*0.3,-1)`],
      [`=ROUND(Profile!$D$29*0.45,-1)`, `=ROUND(Profile!$D$30*0.45,-1)`],
      [`=ROUND(Profile!$D$29*0.25,-1)`, `=ROUND(Profile!$D$30*0.25,-1)`]
    ];
    // WHEN
    let resultProfileBackground = this.daySpr.getFormulas('X1:AA11');
    let resultNoomBackground = this.daySpr.getFormulas('X12:Y14');
    // THEN
    this.assertEquals(resultProfileBackground, expectedProfileBackground);
    this.assertEquals(resultNoomBackground, expectedNoomBackground);
  }

  shouldTodaySheetHaveTheCorrectFormulaForNoomSummary(){
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
    let resultNoom = this.daySpr.getFormulas(`T4:T12`);
    // THEN
    this.assertEquals(resultNoom, expectedNoom);
  }

  shouldTodaySheetHaveTheCorrectFormulaForLeftSideSummary(){
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
    let resultOutput = this.daySpr.getFormula('D5');
    let resultChecklist = this.daySpr.getFormulas('D7:D9');
    let resultCalDensity = this.daySpr.getFormulas('B12:D12');
    // THEN
    this.assertEquals(resultOutput, expectedOutput);
    this.assertEquals(resultChecklist, expectedChecklist);
    this.assertEquals(resultCalDensity, expectedCalDensity);
  }

  shouldTodaySheetUseRightFormatForSummaries(){
    // GIVEN
    let expected = Array(7).fill(['0 kcal', '0.0 g', '0.0 g', '0.0 g', '0.0 g', '0.0 g', '0.0 g', '0.0 g', '0.0 g', '0 mg']);
    // WHEN
    let result = this.daySpr.getDisplayValues('H4:Q10');
    // THEN
    this.assertEquals(result, expected);
  }

  shouldTodaySheetCalculateSummariesCorretly(){
    // GIVEN
    let meal = [this.item('Green', 350), this.item('Yellow', 250), this.item('Red', 90)];
    let expectedMeals = Array(6).fill([1300, 130, 136.9, 143.8, 150.7, 157.6, 164.5, 171.4, 178.3, 185.2]);
    let expectedSummary = [7800, 780, 821.4, 862.8, 904.2, 945.6, 987, 1028.4, 1069.8, 1111];
    // WHEN
    this.addItemsTodaySheet(meal, 15);
    this.addItemsTodaySheet(meal, 30);
    this.addItemsTodaySheet(meal, 45);
    this.addItemsTodaySheet(meal, 60);
    this.addItemsTodaySheet(meal, 75);
    this.addItemsTodaySheet(meal, 90);
    
    let resultMeals = this.daySpr.getValues('H4:Q9');
    let resultSummary = this.daySpr.getValues('H10:Q10');
    // THEN
    this.assertEquals(resultMeals, expectedMeals);
    this.assertEquals(resultSummary, expectedSummary);
  }

  shouldTodaySheetCalculateCorrectRangeForMarcoProfileWhenUsePercentage(){
    // GIVEN
    let expectedBackgroud = [
      [1, ''],
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
    this.generalSettingsRng.setValue("TRUE", 5);
    let resultBackground = this.daySpr.getValues('X1:Y11');
    let resultRange = this.daySpr.getDisplayValues('H11:Q11');
    // THEN
    this.assertEquals(resultBackground, expectedBackgroud);
    this.assertEquals(resultRange, expectedRange);
  }

  shouldTodaySheetCalculateCorrectRangeForMarcoProfileWhenOnlyUseGrams(){
    // GIVEN
    let expectedBackgroud = [
      [1, ''],
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
    this.generalSettingsRng.setValue("FALSE", 5);
    let resultBackground = this.daySpr.getValues('X1:Y11');
    let resultRange = this.daySpr.getDisplayValues('H11:Q11');
    // THEN
    this.assertEquals(resultBackground, expectedBackgroud);
    this.assertEquals(resultRange, expectedRange);
    // RESET 
    this.generalSettingsRng.setValue("TRUE", 5);
  }

  shouldTodaySheetProfileSelectAcceptAllProfiles(){
    // GIVEN
    let expected = ['Test 1', 'Test 2', 'Test 3', 'Test 4', 'Test 5', 'Test 6', 'Test 7'];
    // WHEN
    let result = this.selectedProfileRng.getValidationCriteriaRangeValues();
    // THEN
    this.assertEquals(result, expected);
  }

  shouldTodaySheetCalulateRangeForMultipleProfiles(){
    for(var i = 1; i<=7; i++){
      // GIVEN
      let expectedCalories = `${i * 1000} - ${(i +1) * 1000} kcal`;
      // WHEN
      this.selectedProfileRng.setValue(`Test ${i}`);
      let result = this.daySpr.getDisplayValue('H11');
      // THEN 
      this.assertEquals(result, expectedCalories);
    }
  }

  shouldTodaySheetCalculateCorrectDifference(){
    // GIVEN
    let meal = [this.item('Green', 100), this.item('Yellow', 100), this.item('Red', 100)];
    let expectedDiff = ['⇧ 200 kcal','⇩ 36 g','⇩ 62 g','⇩ 64 g','✔ 26 g','⇩ 68 g','⇩ 70 g','⇩ 72 g','✔ 34 g','⇩ 76 mg'];
    // WHEN
    this.addItemsTodaySheet(meal);
    this.selectedProfileRng.setValue('Test 1');
    let resultDiff = this.daySpr.getValues('H12:Q12'); 
    // THEN
    this.assertEquals(resultDiff, expectedDiff);
  }

  shouldTodaySheetCalculateCorrectCalorieDensity(){
    // GIVEN
    let meal = [this.item('Green', 300), this.item('Yellow', 150), this.item('Red', 50)];
    let expectedDensity = 170;
    // WHEN
    this.addItemsTodaySheet(meal);
    let resultDensity = this.calDensityRng.getValue();
    // THEN
    this.assertEquals(resultDensity, expectedDensity);
  }

  shouldTodaySheetCalculateRightNoomSummary(){
    // GIVEN
    let meal = [this.item('Green', 300), this.item('Yellow', 150), this.item('Red', 50)];
    let expectedGreen = 300;
    let expectedYellow = 300;
    let expectedRed = 250;
    // WHEN
    this.addItemsTodaySheet(meal);
    let resultGreen = this.daySpr.getValue('T4');
    let resultYellow = this.daySpr.getValue('T7');
    let resultRed = this.daySpr.getValue('T10');
    // THEN
    this.assertEquals(resultGreen, expectedGreen);
    this.assertEquals(resultYellow, expectedYellow);
    this.assertEquals(resultRed, expectedRed);
  }

  shouldTodaySheetHaveAllGreenChecklistInAllTheValuesAreInRange(){
    // GIVEN
    let meal = [this.item('All Green', 1500)];
    let expectedChecklist = [['✔️'],['✔️'],['✔️']];
    // WHEN
    this.generalSettingsRng.setValue("TRUE", 5);
    this.selectedProfileRng.setValue(`Test 1`);
    this.addItemsTodaySheet(meal);
    SpreadsheetApp.flush();
    let resultChecklist = this.checklist.getValues();
    // THEN
    this.assertEquals(resultChecklist, expectedChecklist);
  }

  shouldTodaySheetCalculateCalorieBurntDifferenceCorrectly(){
    // GIVEN
    let meal = [this.item('Green', 800), this.item('Yellow', 400), this.item('Red', 100)];
    let calOutput = 2500;
    let expectedDifference = 400;
    // WHEN
    this.addItemsTodaySheet(meal);
    this.calOutputRng.setValue(calOutput);
    let resultDifference = this.daySpr.getValue('D5');
    // THEN
    this.assertEquals(resultDifference, expectedDifference);
  }

  shouldThrowExceptionIfInvalidProfileSeleceted(){
    // GIVEN WHEN THEN
    this.assertException(() => {
      this.selectedProfileRng.setValue(`Non existing profile`);
    }, true);
  }

}

var runDaySummaryTests = () => new DaySummaryTest().runAllTests();