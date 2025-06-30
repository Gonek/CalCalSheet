class SettingsServiceTest extends TestBase {
    beforeAll(){
        super.beforeAll();
        this.daySht = mockSht(SHT.DAY);
        this.daysSht = mockSht(SHT.DAYS);
        this.newItemSht = mockSht(SHT.NEW_ITEM);
        this.recipeCalculatorSht = mockSht(SHT.RECIPE_CALCULATOR);
        this.itemsSht = mockSht(SHT.ITEMS);
        this.profileSht = mockSht(SHT.PROFILE);
        this.historySht = mockSht(SHT.HISTORY);
        this.nutritionFieldsRng = mockRng(RNG.NUTRITION_FIELDS);
        this.generalSettingsRng = mockRng(RNG.GENERAL_SETTINGS);
        this.dayIndexRng = mockRng(RNG.DAY_INDEX);
        this.prevDayIndexRng = mockRng(RNG.DAY_PREV_DAY_INDEX);
        this.mealsRng = mockRng(RNG.MEALS);
        this.dayRepository = mock(DayRepository);

        this.settingsService = new SettingsService();
    }

    beforeEach(){
        super.beforeEach();
        // GIVEN
        this.rngList = mock(new (RngList));
        when(this.nutritionFieldsRng).getColAsArray().thenReturn([true, false, false, true, false, false, false, true, false]);
        when(this.generalSettingsRng).getColAsArray().thenReturn([2, 2, 'Active baseline', true, true, true, true]);
        when(this.mealsRng).getValues().thenReturn([['Breakfast', 12], ['Snack', 5], ['Lunch', 15], ['Snack', 5], ['Dinner', 13], ['Supper', 5]]);
        when(this.profileSht).getRngList(['C5:P5', 'C8:P8', 'C12:P12']).thenReturn(this.rngList);
        when(this.dayIndexRng).getValue().thenReturn(10);
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
        verify(this.prevDayIndexRng).setValue(10).calledOnce()
        // Fields
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
        verify(this.daySht).switchCols(true, 2).calledOnce();
        verify(this.daySht).switchCols(true, 18, 3).calledOnce();
        verify(this.daySht).setValue('V4', 'Noom').calledOnce();
        verify(this.newItemSht).switchRows(true, 21, 2).calledOnce();
        verify(this.recipeCalculatorSht).switchRows(true, 36, 2).calledOnce();
        verify(this.itemsSht).switchCols(true, 26).calledOnce();
        verify(this.historySht).switchCols(true, 19).calledOnce();
        // Meals
        verify(this.daySht).showRows(15, 12).calledOnce();
        verify(this.daySht).hideRows(27, 3).calledOnce();
        verify(this.daySht).setPosValue(15, 1, 'Breakfast').calledOnce();
        verify(this.daySht).setPosValue(4, 7, 'Breakfast').calledOnce();
        verify(this.daysSht).setPosValue(3, 2, 'Breakfast').calledOnce();
        verify(this.daySht).showRows(30, 5).calledOnce();
        verify(this.daySht).hideRows(35, 10).calledOnce();
        verify(this.daySht).setPosValue(30, 1, 'Snack').calledOnce();
        verify(this.daySht).setPosValue(5, 7, 'Snack').calledOnce();
        verify(this.daysSht).setPosValue(3, 4, 'Snack').calledOnce();
        verify(this.daySht).showRows(45, 15).calledOnce();
        verify(this.daySht).setPosValue(45, 1, 'Lunch').calledOnce();
        verify(this.daySht).setPosValue(6, 7, 'Lunch').calledOnce();
        verify(this.daysSht).setPosValue(3, 6, 'Lunch').calledOnce();
        verify(this.daySht).showRows(60, 5).calledOnce();
        verify(this.daySht).hideRows(65, 10).calledOnce();
        verify(this.daySht).setPosValue(60, 1, 'Snack').calledOnce();
        verify(this.daySht).setPosValue(7, 7, 'Snack').calledOnce();
        verify(this.daysSht).setPosValue(3, 8, 'Snack').calledOnce();
        verify(this.daySht).showRows(75, 13).calledOnce();
        verify(this.daySht).hideRows(88, 2).calledOnce();
        verify(this.daySht).setPosValue(75, 1, 'Dinner').calledOnce();
        verify(this.daySht).setPosValue(8, 7, 'Dinner').calledOnce();
        verify(this.daysSht).setPosValue(3, 10, 'Dinner').calledOnce();
        verify(this.daySht).showRows(90, 5).calledOnce();
        verify(this.daySht).hideRows(95, 10).calledOnce();
        verify(this.daySht).setPosValue(90, 1, 'Supper').calledOnce();
        verify(this.daySht).setPosValue(9, 7, 'Supper').calledOnce();
        verify(this.daysSht).setPosValue(3, 12, 'Supper').calledOnce();
    }

    shouldApplySetGrammWhenUsePercentageIsFalse(){
        // GIVEN
        when(this.generalSettingsRng).getColAsArray().thenReturn([2,2,'Active baseline',true,true,true,false]);
        // WHEN
        this.settingsService.applySettings();
        // THEN
        verify(this.rngList).setNumberFormat('0" g"').calledOnce();
    }

    shouldApplyRemoveNoomFieldsWhenNoomIsFalse(){
        // GIVEN
        when(this.generalSettingsRng).getColAsArray().thenReturn([2,2,'Active baseline',true,false,true,true]);
        // WHEN
        this.settingsService.applySettings();
        // THEN
        verify(this.daySht).switchCols(false, 18, 3).calledOnce();
        verify(this.daySht).setValue('V4', '').calledOnce();
        verify(this.newItemSht).switchRows(false, 21, 2).calledOnce();
        verify(this.recipeCalculatorSht).switchRows(false, 36, 2).calledOnce();
        verify(this.itemsSht).switchCols(false, 26).calledOnce();
        verify(this.historySht).switchCols(false, 19).calledOnce();
    }

    shouldApplyRemoveMealsIfTheyNotInSettings(){
        // GIVEN
        when(this.mealsRng).getValues().thenReturn([['Only', 15], ['',''], ['',''], ['',''], ['',''], ['','']]);
        // WHEN
        this.settingsService.applySettings();
        // THEN
        verify(this.daySht).showRows(15, 15).calledOnce();
        verify(this.daySht).setPosValue(15, 1, 'Only').calledOnce();
        verify(this.daySht).setPosValue(4, 7, 'Only').calledOnce();
        verify(this.daySht).hideRows(30, 15).calledOnce();
        verify(this.daySht).setPosValue(5, 7, '').calledOnce();
        verify(this.daySht).hideRows(45, 15).calledOnce();
        verify(this.daySht).setPosValue(6, 7, '').calledOnce();
        verify(this.daySht).hideRows(60, 15).calledOnce();
        verify(this.daySht).setPosValue(7, 7, '').calledOnce();
        verify(this.daySht).hideRows(75, 15).calledOnce();
        verify(this.daySht).setPosValue(8, 7, '').calledOnce();
        verify(this.daySht).hideRows(90, 15).calledOnce();
        verify(this.daySht).setPosValue(9, 7, '').calledOnce();
    }
}

var runSettingsServiceTests = () => new SettingsServiceTest().runAllTests();