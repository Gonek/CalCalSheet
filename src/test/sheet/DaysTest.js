class DaysTest extends TestBase {

  constructor(){
    super();
    this.daySpr = getSpr(SPR.DAY);
    this.daysSpr = getSpr(SPR.DAYS);
  }

  clearData(){
  }

  afterAll(){
    super.afterAll();
  }

  shouldDayBackgroudFormulasBeCorrect(){
    // GIVEN
    let expectedMeal1 = '=OFFSET(Days!$B$3, DayIndex, 0, 15, 2)';
    let expectedMeal2 = '=OFFSET(Days!$D$3, DayIndex, 0, 15, 2)';
    let expectedMeal3 = '=OFFSET(Days!$F$3, DayIndex, 0, 15, 2)';
    let expectedMeal4 = '=OFFSET(Days!$H$3, DayIndex, 0, 15, 2)';
    let expectedMeal5 = '=OFFSET(Days!$J$3, DayIndex, 0, 15, 2)';
    let expectedMeal6 = '=OFFSET(Days!$L$3, DayIndex, 0, 15, 2)';
    let expectedAdditinalData = '=OFFSET(Days!$N$3, DayIndex, 0, 15, 2)';
    // WHEN
    let meal1Formula = this.daySpr.getFormula('X15');
    let meal2Formula = this.daySpr.getFormula('X30');
    let meal3Formula = this.daySpr.getFormula('X45');
    let meal4Formula = this.daySpr.getFormula('X60');
    let meal5Formula = this.daySpr.getFormula('X75');
    let meal6Formula = this.daySpr.getFormula('X90');
    let additinalDataFormula = this.daySpr.getFormula('Z15');
    // THEN
    this.assertEquals(meal1Formula, expectedMeal1);
    this.assertEquals(meal2Formula, expectedMeal2);
    this.assertEquals(meal3Formula, expectedMeal3);
    this.assertEquals(meal4Formula, expectedMeal4);
    this.assertEquals(meal5Formula, expectedMeal5);
    this.assertEquals(meal6Formula, expectedMeal6);
    this.assertEquals(additinalDataFormula, expectedAdditinalData);
  }

  shouldDaysBackgroudFormulasBeCorrect(){
    // GIVEN
    let expectedNumberOfDays = '=COUNT(A:A)';
    let expectedFirstEmptyDayIndex = '=((NumberOfDays+1)*15)+4';
    let expectedToday = '=TODAY()';
    let expectedDaysFrom = '=Today-Settings!E5';
    let expectedDaysUntil = '=Today+Settings!E4';
    let expectedDeleteDaysUntil = '=IFERROR(MATCH(MAXIFS(A19:A, A19:A, "<" & DaysFrom), A19:A)+32, 0)';
    let expectedCreateDaysFrom = '=(IF(MAX(A19:A) > 0, MAX(A19:A) + 1, DaysFrom))';
    let expectedCreateDays = '=DaysUntil-CreateDaysFrom+1';
    let expectedDeleteDaysFrom = '=IF(CreateDays<0, FirstEmptyDayIndex +(CreateDays*15), 0)';
    let expectedDefaultCalorieOutput = '=IFS(Settings!E6="BMR", Profile!D23, Settings!E6="Active baseline", Profile!D24, Settings!E6="Calorie min", Profile!D26, Settings!E6="Calorie max", Profile!D27, Settings!E6="Calorie min [Profile]", Q15, Settings!E6="Calorie max [Profile]", Q16)';
    let expectedLastProfileIndex = '=MATCH(INDEX(FILTER(N4:N, MOD(ROW(N4:N)-5,15)=0), NumberOfDays+1), Profile!C3:P3, 0)';
    let expectedNextProfileIndex = '=IFERROR(IF(OR(NOT(Settings!E9), LastProfileIndex >= NumberOfProfiles*2-1), 1, LastProfileIndex + 2),1)';
    let expectedNextProfile = '=INDEX(Profile!C3:P3, 1, NextProfileIndex)';
    let expectedMinMaxCalForProfile = [['=INDEX(Profile!$C$4:$P$13, 1, NextProfileIndex)'], ['=INDEX(Profile!$C$4:$P$13, 1, NextProfileIndex  +1)']];
    let expectedDays = '=FLATTEN("Default",FILTER(ARRAYFORMULA(IFS(A2:A = TODAY(), CONCAT("🚩 ",TEXT(A2:A, "dd/mm/yyyy")), A2:A < TODAY(), CONCAT("🗃️ ",TEXT(A2:A, "dd/mm/yyyy")), A2:A > TODAY(), CONCAT("📅 ",TEXT(A2:A, "dd/mm/yyyy")))), A2:A * NOT(ISBLANK(A2:A))))';

    // WHEN
    let numberOfDays = getRng(RNG.NUMBER_OF_DAYS).getFormula();
    let firstEmptyDayIndex = getRng(RNG.FIRST_EMPTY_DAY_INDEX).getFormula();
    let today = getRng(RNG.TODAY).getFormula();
    let daysFrom = getRng(RNG.DAYS_FROM).getFormula();
    let daysUntil = getRng(RNG.DAYS_UNTIL).getFormula();
    let deleteDaysUntil = getRng(RNG.DELETE_DAYS_UNTIL).getFormula();
    let createDaysFrom = getRng(RNG.CREATE_DAYS_FROM).getFormula();
    let createDays = getRng(RNG.CREATE_DAYS).getFormula();
    let deleteDaysFrom = getRng(RNG.DELETE_DAYS_FROM).getFormula();
    let defaultCalorieOutput = getRng(RNG.DEFAULT_CALORIE_OUTPUT).getFormula();
    let lastProfileIndex = getRng(RNG.LAST_PROFILE_INDEX).getFormula();
    let nextProfileIndex = getRng(RNG.NEXT_PROFILE_INDEX).getFormula();
    let nextProfile = getRng(RNG.NEXT_PROFILE).getFormula();
    let minMaxCalForProfile = this.daysSpr.getFormulas('Q15:Q16');
    let days = this.daysSpr.getFormulas('R2');
    // THEN
    this.assertEquals(numberOfDays, expectedNumberOfDays);
    this.assertEquals(firstEmptyDayIndex, expectedFirstEmptyDayIndex);
    this.assertEquals(today, expectedToday);
    this.assertEquals(daysFrom, expectedDaysFrom);
    this.assertEquals(daysUntil, expectedDaysUntil);
    this.assertEquals(deleteDaysUntil, expectedDeleteDaysUntil);
    this.assertEquals(createDaysFrom, expectedCreateDaysFrom);
    this.assertEquals(createDays, expectedCreateDays);
    this.assertEquals(deleteDaysFrom, expectedDeleteDaysFrom);
    this.assertEquals(defaultCalorieOutput, expectedDefaultCalorieOutput);
    this.assertEquals(lastProfileIndex, expectedLastProfileIndex);
    this.assertEquals(nextProfileIndex, expectedNextProfileIndex);
    this.assertEquals(nextProfile, expectedNextProfile);
    this.assertEquals(minMaxCalForProfile, expectedMinMaxCalForProfile);
    this.assertEquals(days, expectedDays);
  }
}

var runDaysTestTests = () => new DaysTest().runAllTests();
