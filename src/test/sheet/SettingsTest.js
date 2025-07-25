class SettingsTest extends TestBase {

    beforeAll(){
        super.beforeAll();
        this.sht = getSht(SHT.SETTINGS);
        this.generalRng = getRng(RNG.GENERAL_SETTINGS);
        this.mealsRng = getRng(RNG.MEALS);
        this.importRng = getRng(RNG.IMPORT); 
        this.localisationRng = getRng(RNG.LOCALISATION); 
    }

    shouldSettingsSheetGeneralAcceptValidValues(){
        //GIVEN
        let expectedDefaultCalorieOutputs = ['BMR', 'Active baseline', 'Calorie Min', 'Calorie Max', 'Calorie Min [Profile]', 'Calorie Max [Profile]'];
        //WHEN
        let resultDefaultCalorieOutputs = this.generalRng.getValidationCriteriaRangeValues(4);
        //THEN
        assertEquals(resultDefaultCalorieOutputs, expectedDefaultCalorieOutputs);
    }

    shouldSettingsSheetImportAcceptValidValues(){
        // GIVEN
        let expected = ['Clear', 'Merge'];
        // WHEN
        let result1 = this.importRng.getValidationCriteriaRangeValues(2, 2);
        let result2 = this.importRng.getValidationCriteriaRangeValues(3, 2);
        let result3 = this.importRng.getValidationCriteriaRangeValues(4, 2);
        // THEN
        assertEquals(result1, expected);
        assertEquals(result2, expected);
        assertEquals(result3, expected);
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
        assertEquals(result1, expected);
        assertEquals(result2, expected);
        assertEquals(result3, expected);
        assertEquals(result4, expected);
        assertEquals(result5, expected);
        assertEquals(result6, expected);
    }

    shouldSettingsSheetLocalisationAcceptValidValues(){
        //GIVEN
        let expectedLanguage = ['English', 'Español', 'Français', 'हिन्दी', 'Italiano', 'Magyar', 'Polski', 'Português', 'Română', 'Türkçe', 'Українська', '日本語'];
        let expectedTimeZone = ['-11', '-10', '-9', '-8', '-7', '-6', '-5', '-4', '-3', '-2', '-1', '0', '+1', '+2', '+3', '+4', '+5', '+6', '+7', '+8', '+9', '+10', '+11', '+12', '+13', '+14'];
        let expectedDateFormat = ['DD/MM/YYYY', 'DD-MM-YYYY', 'YYYY.MM.DD', 'YYYY-MM-DD', 'MM-DD-YYYY', 'MM/DD/YYYY'];
        let expectedMeasurement = ['Metric', 'Imperial'];
        let expectedCurrency = ['£', '$', '€', '₹', 'Ft', 'zł', 'lei', '₺', '₴', '¥', '_'];
        //WHEN
        let resultLanguage = this.localisationRng.getValidationCriteriaRangeValues(1);
        let resultTimeZone = this.localisationRng.getValidationCriteriaValues(2);
        let resultDateFormat = this.localisationRng.getValidationCriteriaValues(3);
        let resultMeasurement = this.localisationRng.getValidationCriteriaRangeValues(4);
        let resultCurrency = this.localisationRng.getValidationCriteriaValues(5);
        //THEN
        assertEquals(resultLanguage, expectedLanguage);
        assertEquals(resultTimeZone, expectedTimeZone);
        assertEquals(resultDateFormat, expectedDateFormat);
        assertEquals(resultMeasurement, expectedMeasurement);
        assertEquals(resultCurrency, expectedCurrency);
    }
}

var runSettingsTests = () => new SettingsTest().runAllTests();4