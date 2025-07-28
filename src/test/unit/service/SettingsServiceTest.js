class SettingsServiceTest extends TestBase {
    beforeAll(){
        super.beforeAll();
        this.activeSpsh = mockSpSh(SPSH.ACTIVE);
        this.daySht = mockSht(SHT.DAY);
        this.daysSht = mockSht(SHT.DAYS);
        this.newItemSht = mockSht(SHT.NEW_ITEM);
        this.recipeCalculatorSht = mockSht(SHT.RECIPE_CALCULATOR);
        this.itemsSht = mockSht(SHT.ITEMS);
        this.profileSht = mockSht(SHT.PROFILE);
        this.historySht = mockSht(SHT.HISTORY);
        this.tutorialSht = mockSht(SHT.TUTORIAL);
        this.textsSht = mockSht(SHT.TEXTS);
        this.nutritionFieldsRng = mockRng(RNG.NUTRITION_FIELDS);
        this.generalSettingsRng = mockRng(RNG.GENERAL_SETTINGS);
        this.dayIndexRng = mockRng(RNG.DAY_INDEX);
        this.prevDayIndexRng = mockRng(RNG.DAY_PREV_DAY_INDEX);
        this.mealsRng = mockRng(RNG.MEALS);
        this.localisationRng = mockRng(RNG.LOCALISATION);
        this.currencyFormatRng = mockRng(RNG.CURRENCY_FORMAT);
        this.todayRng = mockRng(RNG.TODAY);
        this.languageRng = mockRng(RNG.LANGUAGE);
        this.previousLanguageRng = mockRng(RNG.PREVIOUS_LANGUAGE);
        this.sheetsRng = mockRng(RNG.SHEETS);
        this.notesRng = mockRng(RNG.NOTES);
        this.isMeasurementMetricRng = mockRng(RNG.IS_MEASUREMENT_METRIC);
        this.unitRng = mock(Rng);
        this.dateFormatRng = mock(Rng);
        this.messurementWRng = mock(Rng);
        this.messurementHRng = mock(Rng);
        this.currencyRng = mock(Rng);
        this.sheetSht = mock(Sht);
        this.noteRng = mock(Rng);
        this.dayRepository = mock(DayRepository);
        this.settingsService = new SettingsService();
    }

    beforeEach(){
        super.beforeEach();
        // GIVEN
        this.rngList = mock(new (RngList));
        when(this.nutritionFieldsRng).getColAsArray().thenReturn([true, false, false, true, false, false, false, true, false]);
        when(this.generalSettingsRng).getColAsArray().thenReturn([2, 2, false, 'Active baseline', true, true, true, true]);
        when(this.mealsRng).getValues().thenReturn([['Breakfast', 12], ['Snack', 5], ['Lunch', 15], ['Snack', 5], ['Dinner', 13], ['Supper', 5]]);
        when(this.localisationRng).getColAsArray().thenReturn(['English', '.0', 'DD/MM/YYYY', 'Metric', '£']);
        when(this.profileSht).getRngList(['C5:P5', 'C8:P8', 'C12:P12']).thenReturn(this.rngList);
        when(this.dayIndexRng).getValue().thenReturn(10);

        when(this.localisationRng).getValidationCriteriaRangeValues(4).thenReturn(['Metric', 'Imperial']);
        when(this.languageRng).getValue().thenReturn('English');
        when(this.previousLanguageRng).getValue().thenReturn('English');
        when(this.textsSht).getRng('B29').thenReturn(this.unitRng);
        when(this.daysSht).getRng('A6:A').thenReturn(this.dateFormatRng);
        when(this.profileSht).getRng('I17:J').thenReturn(this.dateFormatRng);
        when(this.itemsSht).getRng('AD4:AD').thenReturn(this.dateFormatRng);
        when(this.historySht).getRng('B10:B').thenReturn(this.dateFormatRng);
        when(this.isMeasurementMetricRng).getValue().thenReturn(true);
        when(this.profileSht).getRng('D20:F20').thenReturn(this.messurementHRng);
        when(this.profileSht).getRng('D22').thenReturn(this.messurementWRng);
        when(this.profileSht).getRng('K17:K').thenReturn(this.messurementWRng);
        when(this.unitRng).getValue().thenReturn('unit');
        when(this.daySht).getRng('R6:R12').thenReturn(this.currencyRng);
        when(this.daySht).getRng('R17:R106').thenReturn(this.currencyRng);
        when(this.newItemSht).getRng('C17').thenReturn(this.currencyRng);
        when(this.newItemSht).getRng('D17').thenReturn(this.currencyRng);
        when(this.recipeCalculatorSht).getRng('Q4:Q30').thenReturn(this.currencyRng);
        when(this.profileSht).getRng('C14:P14').thenReturn(this.currencyRng);
        when(this.itemsSht).getRng('Z4:AA').thenReturn(this.currencyRng);
        when(this.historySht).getRng('P4:P').thenReturn(this.currencyRng);
    }

    shouldApplyApplyGeneralSettingsChangeFieldsAndMeals(){
        // WHEN
        this.settingsService.applySettings();
        // THEN
        // General test
        verify(this.rngList).setNumberFormat('0" %"').calledOnce();
        verify(this.dayRepository).deletePastDays().calledOnce();
        verify(this.dayRepository).deleteFutureDays().calledOnce();
        verify(this.dayRepository).copyDefaultForFutureDays().calledOnce();
        verify(this.prevDayIndexRng).setValue(10).calledOnce();
        verify(this.daySht).switchCols(true, 2).calledOnce();
        this.verifyFields();
        this.verifyPrice(false);
        this.verifyNoom(true);
        // Meals
        verify(this.daySht).showRows(17, 12).calledOnce();
        verify(this.daySht).hideRows(29, 3).calledOnce();
        verify(this.daySht).showRows(32, 5).calledOnce();
        verify(this.daySht).hideRows(37, 10).calledOnce();
        verify(this.daySht).showRows(47, 15).calledOnce();
        verify(this.daySht).showRows(62, 5).calledOnce();
        verify(this.daySht).hideRows(67, 10).calledOnce();
        verify(this.daySht).showRows(77, 13).calledOnce();
        verify(this.daySht).hideRows(90, 2).calledOnce();
        verify(this.daySht).showRows(92, 5).calledOnce();
        verify(this.daySht).hideRows(97, 10).calledOnce();
        this.verifyMealsNames(['Breakfast', 'Snack', 'Lunch', 'Snack', 'Dinner', 'Supper']);
        this.verifyLocalisation();
        this.verifyCurrency('£#,##0.00');
    }

    shouldApplySetGrammWhenUsePercentageIsFalse(){
        // GIVEN
        when(this.generalSettingsRng).getColAsArray().thenReturn([2,2,false,'Active baseline',true,true,true,false]);
        // WHEN
        this.settingsService.applySettings();
        // THEN
        verify(this.rngList).setNumberFormat('0" g"').calledOnce();
    }

    shouldApplyShowPriceFieldsWhenPriceIsTrue(){
        // GIVEN
        when(this.generalSettingsRng).getColAsArray().thenReturn([2,2,true,'Active baseline',true,true,true,true]);
        // WHEN
        this.settingsService.applySettings();
        // THEN
        this.verifyPrice(true);
    }

    shouldApplyRemoveNoomFieldsWhenNoomIsFalse(){
        // GIVEN
        when(this.generalSettingsRng).getColAsArray().thenReturn([2,2,false,'Active baseline',true,false,true,true]);
        // WHEN
        this.settingsService.applySettings();
        // THEN
        this.verifyNoom(false);
    }

    shouldApplyRemoveMealsIfTheyNotInSettings(){
        // GIVEN
        when(this.mealsRng).getValues().thenReturn([['Only', 15], ['',''], ['',''], ['',''], ['',''], ['','']]);
        // WHEN
        this.settingsService.applySettings();
        // THEN
        verify(this.daySht).showRows(17, 15).calledOnce();
        verify(this.daySht).hideRows(32, 15).calledOnce(); 
        verify(this.daySht).hideRows(47, 15).calledOnce();
        verify(this.daySht).hideRows(62, 15).calledOnce();
        verify(this.daySht).hideRows(77, 15).calledOnce();
        verify(this.daySht).hideRows(92, 15).calledOnce();
        this.verifyMealsNames(['Only', '', '', '', '', '']);
    }

    shouldApplyChangeLanguageIfLanguageIsDifferrentThenThePrevious(){
        // GIVEN
        when(this.localisationRng).getColAsArray().thenReturn(['Deutsch', '0', 'DD/MM/YYYY', 'Metric', '£']);
        when(this.activeSpsh).getShtById(1).thenReturn(this.sheetSht);
        when(this.activeSpsh).getShtById(2).thenReturn(this.sheetSht);
        when(this.activeSpsh).getShtById(3).thenReturn(this.sheetSht);
        when(this.tutorialSht).getRng(1).thenReturn(this.noteRng);
        when(this.tutorialSht).getRng(2).thenReturn(this.noteRng);
        when(this.tutorialSht).getRng(3).thenReturn(this.noteRng);
        when(this.languageRng).getValue().thenReturn('Deutsch');
        when(this.sheetsRng).getValues().thenReturn([[1, 'S1'], [2, 'S2'], [3, 'S3']]);
        when(this.notesRng).getValues().thenReturn([[1, 'N1'], [2, 'N2'], [3, 'N3']]);
        // WHEN
        this.settingsService.applySettings();
        // THEN
        verify(this.languageRng).setValue('Deutsch');
        verify(this.sheetSht).setName('S1').calledOnce();
        verify(this.sheetSht).setName('S2').calledOnce();
        verify(this.sheetSht).setName('S3').calledOnce();
        verify(this.noteRng).setNote('N1').calledOnce();
        verify(this.noteRng).setNote('N2').calledOnce();
        verify(this.noteRng).setNote('N3').calledOnce();
        verify(this.previousLanguageRng).setValue('Deutsch');
    }

    shouldApplyChangeAndCovertValuesToImperialIfitWasMetricBefore(){
        // GIVEN
        when(this.isMeasurementMetricRng).getValue().thenReturn(true);
        when(this.localisationRng).getColAsArray().thenReturn(['English', '0', 'DD/MM/YYYY', 'Imperial', '£']);
        when(this.messurementHRng).getValue().thenReturn(185);
        when(this.messurementWRng).getValue().thenReturn(85);
        when(this.messurementWRng).getColAsArray().thenReturn([100, 95, 90]);
        // WHEN
        this.settingsService.applySettings();
        // THEN   
        verify(this.messurementWRng).setNumberFormat('0.00" lb"').called(2);
        verify(this.messurementHRng).setNumberFormat('0" in"').calledOnce();
        verify(this.messurementWRng).setValue("187.43").calledOnce()
        verify(this.messurementWRng).setValues([["220.50"],["209.47"],["198.45"]]).calledOnce();
        verify(this.messurementHRng).setValue("72.83").calledOnce();
        verify(this.isMeasurementMetricRng).setValue(false);
    }

    shouldApplyChangeAndCovertValuesToMertricIfItWasImperialBefore(){
        // GIVEN
        when(this.isMeasurementMetricRng).getValue().thenReturn(false);
        when(this.localisationRng).getColAsArray().thenReturn(['English', '0', 'DD/MM/YYYY', 'Metric', '£']);
        when(this.messurementHRng).getValue().thenReturn(65);
        when(this.messurementWRng).getValue().thenReturn(200);
        when(this.messurementWRng).getColAsArray().thenReturn([250, 220, 200]);
        // WHEN
        this.settingsService.applySettings();
        // THEN
        verify(this.messurementWRng).setNumberFormat('0.00" kg"').called(2);
        verify(this.messurementHRng).setNumberFormat('0" cm"').calledOnce();
        verify(this.messurementWRng).setValue("90.70").calledOnce()
        verify(this.messurementWRng).setValues([["113.38"], ["99.77"], ["90.70"]]).calledOnce();
        verify(this.messurementHRng).setValue("165.10").calledOnce();
        verify(this.isMeasurementMetricRng).setValue(true);
    }

    shouldApplyChangeSignToBackAndRemoveCurrencyDecimalsIfCurrencyChnagedToFt(){
        // GIVEN
        when(this.localisationRng).getColAsArray().thenReturn(['English', '0', 'DD/MM/YYYY', 'Metric', 'Ft']);
        // WHEN
        this.settingsService.applySettings();
        // THEN
        this.verifyCurrency('#,##0Ft');
    }

    verifyFields(){
        verify(this.daySht).switchCols(true, 9).calledOnce();
        verify(this.daySht).switchCols(false, 10).calledOnce();
        verify(this.daySht).switchCols(false, 11).calledOnce();
        verify(this.daySht).switchCols(true, 12).calledOnce();
        verify(this.daySht).switchCols(false, 13).calledOnce();
        verify(this.daySht).switchCols(false, 14).calledOnce();
        verify(this.daySht).switchCols(false, 15).calledOnce();
        verify(this.daySht).switchCols(true, 16).calledOnce();
        verify(this.daySht).switchCols(false, 17).calledOnce();
        verify(this.newItemSht).switchRows(true, 8).calledOnce();
        verify(this.newItemSht).switchRows(false, 9).calledOnce();
        verify(this.newItemSht).switchRows(false, 10).calledOnce();
        verify(this.newItemSht).switchRows(true, 11).calledOnce();
        verify(this.newItemSht).switchRows(false, 12).calledOnce();
        verify(this.newItemSht).switchRows(false, 13).calledOnce();
        verify(this.newItemSht).switchRows(false, 14).calledOnce();
        verify(this.newItemSht).switchRows(true, 15).calledOnce();
        verify(this.newItemSht).switchRows(false, 16).calledOnce();
        verify(this.recipeCalculatorSht).switchCols(true, 8).calledOnce();
        verify(this.recipeCalculatorSht).switchCols(false, 9).calledOnce();
        verify(this.recipeCalculatorSht).switchCols(false, 10).calledOnce();
        verify(this.recipeCalculatorSht).switchCols(true, 11).calledOnce();
        verify(this.recipeCalculatorSht).switchCols(false, 12).calledOnce();
        verify(this.recipeCalculatorSht).switchCols(false, 13).calledOnce();
        verify(this.recipeCalculatorSht).switchCols(false, 14).calledOnce();
        verify(this.recipeCalculatorSht).switchCols(true, 15).calledOnce();
        verify(this.recipeCalculatorSht).switchCols(false, 16).calledOnce();
        verify(this.itemsSht).switchCols(true, 8, 2).calledOnce();
        verify(this.itemsSht).switchCols(false, 10, 2).calledOnce();
        verify(this.itemsSht).switchCols(false, 12, 2).calledOnce();
        verify(this.itemsSht).switchCols(true, 14, 2).calledOnce();
        verify(this.itemsSht).switchCols(false, 16, 2).calledOnce();
        verify(this.itemsSht).switchCols(false, 18, 2).calledOnce();
        verify(this.itemsSht).switchCols(false, 20, 2).calledOnce();
        verify(this.itemsSht).switchCols(true, 22, 2).calledOnce();
        verify(this.itemsSht).switchCols(false, 24, 2).calledOnce();
        verify(this.profileSht).switchRows(true, 5).calledOnce();
        verify(this.profileSht).switchRows(false, 6).calledOnce();
        verify(this.profileSht).switchRows(false, 7).calledOnce();
        verify(this.profileSht).switchRows(true, 8).calledOnce();
        verify(this.profileSht).switchRows(false, 9).calledOnce();
        verify(this.profileSht).switchRows(false, 10).calledOnce();
        verify(this.profileSht).switchRows(false, 11).calledOnce();
        verify(this.profileSht).switchRows(true, 12).calledOnce();
        verify(this.profileSht).switchRows(false, 13).calledOnce();
        verify(this.historySht).switchCols(true, 6).calledOnce();
        verify(this.historySht).switchCols(false, 7).calledOnce();
        verify(this.historySht).switchCols(false, 8).calledOnce();
        verify(this.historySht).switchCols(true, 9).calledOnce();
        verify(this.historySht).switchCols(false, 10).calledOnce();
        verify(this.historySht).switchCols(false, 11).calledOnce();
        verify(this.historySht).switchCols(false, 12).calledOnce();
        verify(this.historySht).switchCols(true, 13).calledOnce();
        verify(this.historySht).switchCols(false, 14).calledOnce();
    }

    verifyPrice(enabled){
        verify(this.daySht).switchCols(enabled, 18).calledOnce();
        verify(this.newItemSht).switchRows(enabled, 17, 2).calledOnce();
        verify(this.recipeCalculatorSht).switchCols(enabled, 17).calledOnce();
        verify(this.profileSht).switchRows(enabled, 14).calledOnce();
        verify(this.historySht).switchCols(enabled, 16).calledOnce();
    }

    verifyNoom(enabled){
        verify(this.daySht).switchCols(enabled, 19, 3).calledOnce();
        if(enabled){
            verify(this.daySht).setValue('W6', 'Noom').calledOnce();
        }else{
            verify(this.daySht).setValue('W6', '').calledOnce();
        }
        verify(this.newItemSht).switchRows(enabled, 23, 2).calledOnce();
        verify(this.recipeCalculatorSht).switchRows(enabled, 36, 2).calledOnce();
        verify(this.itemsSht).switchCols(enabled, 28).calledOnce();
    }

    verifyMealsNames(mealNames){
        verify(this.daySht).setPosValue(17, 1, mealNames[0]).calledOnce();
        verify(this.daySht).setPosValue(6, 7, mealNames[0]).calledOnce();
        verify(this.daysSht).setPosValue(5, 2, mealNames[0]).calledOnce();
        verify(this.daysSht).setPosValue(5, 17, mealNames[0]).calledOnce();
        verify(this.daySht).setPosValue(32, 1, mealNames[1]).calledOnce();
        verify(this.daySht).setPosValue(7, 7, mealNames[1]).calledOnce();
        verify(this.daysSht).setPosValue(5, 4, mealNames[1]).calledOnce();
        verify(this.daysSht).setPosValue(5, 19, mealNames[1]).calledOnce();
        verify(this.daySht).setPosValue(47, 1, mealNames[2]).calledOnce();
        verify(this.daySht).setPosValue(8, 7, mealNames[2]).calledOnce();
        verify(this.daysSht).setPosValue(5, 6, mealNames[2]).calledOnce();
        verify(this.daysSht).setPosValue(5, 21, mealNames[2]).calledOnce();
        verify(this.daySht).setPosValue(62, 1, mealNames[3]).calledOnce();
        verify(this.daySht).setPosValue(9, 7, mealNames[3]).calledOnce();
        verify(this.daysSht).setPosValue(5, 8, mealNames[3]).calledOnce();
        verify(this.daysSht).setPosValue(5, 23, mealNames[3]).calledOnce();
        verify(this.daySht).setPosValue(77, 1, mealNames[4]).calledOnce();
        verify(this.daySht).setPosValue(10, 7, mealNames[4]).calledOnce();
        verify(this.daysSht).setPosValue(5, 10, mealNames[4]).calledOnce();
        verify(this.daysSht).setPosValue(5, 25, mealNames[4]).calledOnce();
        verify(this.daySht).setPosValue(92, 1, mealNames[5]).calledOnce();
        verify(this.daySht).setPosValue(11, 7, mealNames[5]).calledOnce();
        verify(this.daysSht).setPosValue(5, 12, mealNames[5]).calledOnce();
        verify(this.daysSht).setPosValue(5, 27, mealNames[5]).calledOnce();
    }

    verifyLocalisation(){
        // Language
        verify(this.languageRng).setValue('English').calledOnce();
        verify(this.activeSpsh).getShtById(any()).neverCalled();
        verify(this.tutorialSht).getRng(any()).neverCalled();
        verify(this.previousLanguageRng).setValue(any()).neverCalled();
        verify(this.todayRng).setValue('=ROUNDDOWN(NOW() +0/24)').calledOnce();
        // Dateformat
        verify(this.dateFormatRng).setNumberFormat('DD/MM/YYYY').called(4);
        // Messurements
        verify(this.messurementWRng).setNumberFormat(any()).neverCalled();
        verify(this.messurementHRng).setNumberFormat(any()).neverCalled();
        verify(this.messurementWRng).setValue(any()).neverCalled();
        verify(this.messurementWRng).setValues(any()).neverCalled();
        verify(this.messurementHRng).setValue(any()).neverCalled();
        verify(this.isMeasurementMetricRng).setValue(any()).neverCalled();
    }
    
    verifyCurrency(format){
        verify(this.currencyFormatRng).setValue(format).calledOnce()
        verify(this.currencyRng).setNumberFormat(format).called(7);
        verify(this.currencyRng).setNumberFormat(format + '" / unit"').calledOnce();
    }
}

var runSettingsServiceTests = () => new SettingsServiceTest().runAllTests();