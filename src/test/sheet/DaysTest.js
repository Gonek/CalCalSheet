class DaysTest extends TestBase {

    beforeAll(){
        super.beforeAll();
        this.daysSht = getSht(SHT.DAYS);
    }

    afterAll(){
        super.afterAll();
    }

    shouldDaysBackgroudFormulasBeCorrect(){
        // GIVEN
        let expectedNumberOfDays = '=COUNT(A:A)';
        let expectedNumberOfTemplates = '=COUNTA(P6:P)';
        let expectedFirstEmptyDayIndex = '=(NumberOfDays*15)+6';
        let expectedFirstEmptyTemplateIndex = '=(NumberOfTemplates*15)+6';
        let expectedToday = '=ROUNDDOWN(NOW() +0/24)';
        let expectedDaysFrom = '=Today-Settings!E5';
        let expectedDaysUntil = '=Today+Settings!E4';
        let expectedDeleteDaysUntil = '=IFERROR(MATCH(MAXIFS(A6:A, A6:A, "<" & DaysFrom), A6:A)+19, 0)';
        let expectedCreateDaysFrom = '=(IF(MAX(A6:A) > 0, MAX(A6:A) + 1, DaysFrom))';
        let expectedCreateDays = '=DaysUntil-CreateDaysFrom+1';
        let expectedDeleteDaysFrom = '=IF(CreateDays<0, FirstEmptyDayIndex +(CreateDays*15), 0)';
        let expectedDefaultCalorieOutput = '=IFS(Settings!E7=Texts!B528, Profile!D24, Settings!E7=Texts!B529, Profile!D25, Settings!E7=Texts!B530, Profile!D27, Settings!E7=Texts!B531, Profile!D28, Settings!E7=Texts!B532, AF17, Settings!E7=Texts!B533, AF18)';
        let expectedLastProfileIndex = '=MATCH(INDEX(FILTER(N6:N, MOD(ROW(N6:N)-7,15)=0), NumberOfDays), Profile!C3:P3, 0)';
        let expectedNextProfileIndex = '=IFERROR(IF(OR(NOT(Settings!E10), LastProfileIndex >= NumberOfProfiles*2-1), 1, LastProfileIndex + 2),1)';
        let expectedNextProfile = '=INDEX(Profile!C3:P3, 1, NextProfileIndex)';
        let expectedMinMaxCalForProfile = [['=INDEX(Profile!$C$4:$P$13, 1, NextProfileIndex)'], ['=INDEX(Profile!$C$4:$P$13, 1, NextProfileIndex  +1)']];
        let expectedDays = '=FLATTEN(UNIQUE(FILTER(P6:P, P6:P > "")), FILTER(ARRAYFORMULA(IFS(A6:A = TODAY(), CONCAT("🚩 ",TEXT(A6:A, "dd/mm/yyyy")), A6:A < TODAY(), CONCAT("🗃️ ",TEXT(A6:A, "dd/mm/yyyy")), A6:A > TODAY(), CONCAT("📅 ",TEXT(A6:A, "dd/mm/yyyy")))), A6:A * NOT(ISBLANK(A6:A))))';

        // WHEN
        let numberOfDays = getRng(RNG.NUMBER_OF_DAYS).getFormula();
        let numberOfTemplates = getRng(RNG.NUMBER_OF_TEMPLATES).getFormula();
        let firstEmptyDayIndex = getRng(RNG.FIRST_EMPTY_DAY_INDEX).getFormula();
        let firstEmptyTemplateIndex = getRng(RNG.FIRST_EMPTY_TEMPLATE_INDEX).getFormula();
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
        let minMaxCalForProfile = this.daysSht.getFormulas('AF17:AF18');
        let days = this.daysSht.getFormulas('AG1');
        // THEN
        assertEquals(numberOfDays, expectedNumberOfDays);
        assertEquals(numberOfTemplates, expectedNumberOfTemplates);
        assertEquals(firstEmptyDayIndex, expectedFirstEmptyDayIndex);
        assertEquals(firstEmptyTemplateIndex, expectedFirstEmptyTemplateIndex);
        assertEquals(today, expectedToday);
        assertEquals(daysFrom, expectedDaysFrom);
        assertEquals(daysUntil, expectedDaysUntil);
        assertEquals(deleteDaysUntil, expectedDeleteDaysUntil);
        assertEquals(createDaysFrom, expectedCreateDaysFrom);
        assertEquals(createDays, expectedCreateDays);
        assertEquals(deleteDaysFrom, expectedDeleteDaysFrom);
        assertEquals(defaultCalorieOutput, expectedDefaultCalorieOutput);
        assertEquals(lastProfileIndex, expectedLastProfileIndex);
        assertEquals(nextProfileIndex, expectedNextProfileIndex);
        assertEquals(nextProfile, expectedNextProfile);
        assertEquals(minMaxCalForProfile, expectedMinMaxCalForProfile);
        assertEquals(days, expectedDays);
    }
}

var runDaysTestTests = () => new DaysTest().runAllTests();
