class ImportServiceTest extends TestBase {
    beforeAll(){
        super.beforeAll();
        this.sId = 'SheetId';
        this.importRng = mockRng(RNG.IMPORT);
        this.importSpSh = mockSpSh(this.sId);
        this.fromSupportSpr = mockSpr(`${this.sId}.${SPR.SUPPORT}`);
        this.fromItemsSpr = mockSpr(`${this.sId}.${SPR.ITEMS}`);
        this.fromRecipesSpr = mockSpr(`${this.sId}.${SPR.RECIPES}`);
        this.fromMealsSpr = mockSpr(`${this.sId}.${SPR.MEALS}`);
        this.fromProfileSpr = mockSpr(`${this.sId}.${SPR.PROFILE}`);
        this.fromSettingsSpr = mockSpr(`${this.sId}.${SPR.SETTINGS}`);
        this.fromHistorySpr = mockSpr(`${this.sId}.${SPR.HISTORY}`);
        this.fromDaysSpr = mockSpr(`${this.sId}.${SPR.DAYS}`);
        this.toSupportSpr = mockSpr(SPR.SUPPORT);
        this.toItemsSpr = mockSpr(SPR.ITEMS);
        this.toRecipesSpr = mockSpr(SPR.RECIPES);
        this.toMealsSpr = mockSpr(SPR.MEALS);
        this.toProfileSpr = mockSpr(SPR.PROFILE);
        this.toSettingsSpr = mockSpr(SPR.SETTINGS);
        this.toHistorySpr = mockSpr(SPR.HISTORY);
        this.toDaysSpr = mockSpr(SPR.DAYS);
        this.toWeightHistoryRng = mock(Rng); 
        this.toDetailsRng = mock(Rng); 
        this.toMacroRng = mock(Rng); 
        this.toGeneralRng = mock(Rng); 
        this.toNutritionRng = mock(Rng); 
        this.toMealsRng = mock(Rng); 
        this.fromDaysRng = mock(Rng);
        this.toDaysRng = mock(Rng);
        this.settingsService = mock(SettingsService);

        this.importService = new ImportService();
    }

    shouldStartImportImportAndClearAllDataIfAllSheetSelectedWithClear(){
        // GIVEN
        this.givenImportSettings([true, true, true, true, true, true, true], [IMPORT_OPTIONS.CLEAR_CONTENT, IMPORT_OPTIONS.CLEAR_CONTENT, IMPORT_OPTIONS.CLEAR_CONTENT]);
        let itemsData = ['Items'];
        when(this.fromItemsSpr).getValues('B4:AB').thenReturn(itemsData);
        let recipeData = ['Recipe'];
        when(this.fromRecipesSpr).getClearValues('B4:D').thenReturn(recipeData);
        let mealData = ['Meal'];
        when(this.fromMealsSpr).getClearValues('B4:D').thenReturn(mealData);
        let macroData = ['Macro'];
        let weightHistoryData = ['WeightHistory'];
        let detailsData = ['deatils'];
        this.givenProfile(macroData, weightHistoryData, detailsData);
        let generalData = ['General'];
        let nutritionData = ['Nutrition'];
        let mealsData = ['Meals'];
        this.givenSettings(generalData, nutritionData, mealsData);
        let historyData = ['History'];
        when(this.fromHistorySpr).getValues('B10:R').thenReturn(historyData);
        when(this.fromDaysSpr).getRng('A4:N').thenReturn(this.fromDaysRng);
        when(this.toDaysSpr).getRng('A4:N').thenReturn(this.toDaysRng);
        let daysData = ['Days'];
        when(this.fromDaysRng).getValues().thenReturn(daysData)
        // WHEN
        this.importService.startImport();
        // THEN
        this.verifyDataImport(this.toItemsSpr, 'B4:AB', itemsData);
        this.verifyDataImport(this.toRecipesSpr, 'B4:D', recipeData);
        this.verifyDataImport(this.toMealsSpr, 'B4:D', mealData);
        verify(this.toWeightHistoryRng).clearAndSetValues(weightHistoryData).calledOnce();
        verify(this.toMacroRng).clearAndSetValues(macroData).calledOnce();
        verify(this.toDetailsRng).clearAndSetValues(detailsData).calledOnce();
        verify(this.toGeneralRng).clearAndSetValues(generalData).calledOnce();
        verify(this.toNutritionRng).clearAndSetValues(nutritionData).calledOnce();
        verify(this.toMealsRng).clearAndSetValues(mealsData).calledOnce();
        verify(this.settingsService).applySettings().calledOnce();
        this.verifyDataImport(this.toHistorySpr, 'B10:R', historyData); 
        verify(this.toDaysRng).setValuesWithResize(daysData).calledOnce();
    }

    shouldStartImportDoNothingIfNoSheetIsSelected(){
        // GIVEN
        this.givenImportSettings([false, false, false, false, false, false, false], ['', '', '']);
        // WHEN
        this.importService.startImport();
        // THEN 
        this.verifyDataImport(this.toItemsSpr, 'B4:AA', any(), 0);
        this.verifyDataImport(this.toRecipesSpr, 'B4:D', any(), 0);
        this.verifyDataImport(this.toMealsSpr, 'B4:D', any(), 0);
        verify(this.toWeightHistoryRng).clearAndSetValues(any()).neverCalled();
        verify(this.toMacroRng).clearAndSetValues(any()).neverCalled();
        verify(this.toDetailsRng).clearAndSetValues(any()).neverCalled();
        verify(this.toGeneralRng).clearAndSetValues(any()).neverCalled();
        verify(this.toNutritionRng).clearAndSetValues(any()).neverCalled();
        verify(this.toMealsRng).clearAndSetValues(any()).neverCalled();
        verify(this.settingsService).applySettings().neverCalled();
        this.verifyDataImport(this.toHistorySpr, 'B10:R', any(), 0); 
        verify(this.toDaysRng).setValuesWithResize(any()).neverCalled();
    }

    shouldStartImportDoNotClearItemsIfMergeSelected(){
        // GIVEN
        this.givenImportSettings([true, false, false, false, false, false, false], [IMPORT_OPTIONS.MERGE_CONTENT, '', '']);
        let itemsData = ['Items'];
        when(this.fromItemsSpr).getValues('B4:AB').thenReturn(itemsData);
        // WHEN
        this.importService.startImport();  
        // THEN
        verify(this.toItemsSpr).clear('B4:AB').neverCalled();
        verify(this.toItemsSpr).putDataAtEnd(itemsData).calledOnce();
        verify(this.toItemsSpr).sort(2).calledOnce();
    }

    shouldStartImportDoNotClearRecipesIfMergeSelected(){
        // GIVEN
        this.givenImportSettings([false, true, false, false, false, false, false], ['', IMPORT_OPTIONS.MERGE_CONTENT, '']);
        let recipeData = ['Recipe'];
        when(this.fromRecipesSpr).getClearValues('B4:D').thenReturn(recipeData);
        // WHEN
        this.importService.startImport();  
        // THEN
        verify(this.toRecipesSpr).clear('B4:D').neverCalled();
        verify(this.toRecipesSpr).putDataAtEnd(recipeData).calledOnce();
        verify(this.toRecipesSpr).sort(2).calledOnce();
    }

    shouldStartImportDoNotClearMealIfMergeSelected(){
        // GIVEN
        this.givenImportSettings([false, false, true, false, false, false, false], ['',  '', IMPORT_OPTIONS.MERGE_CONTENT]);
        let mealData = ['Meal'];
        when(this.fromMealsSpr).getClearValues('B4:D').thenReturn(mealData);
        // WHEN
        this.importService.startImport();  
        // THEN
        verify(this.toMealsSpr).clear('B4:D').neverCalled();
        verify(this.toMealsSpr).putDataAtEnd(mealData).calledOnce();
        verify(this.toMealsSpr).sort(2).calledOnce();
    }

    shouldStartImportThrowExeptionIfImportIdMissingOrIncorrect(){
        // GIVEN
        this.noIdSpSh = mockSpSh('noId');
        when(this.importRng).getValue(1,2).thenReturn('noId');
        when(this.noIdSpSh).isExist().thenReturn(false);
        // WHEN THEN
        assertException(() => {
            this.importService.startImport();
        }, false);
    }

    shouldStartImportThrowExeptionIfImportVersionOtherThen14or15or16(){
        // GIVEN
        when(this.fromSupportSpr).getValue('E24').thenReturn('v1.3');
        when(this.importRng).getValue(1,2).thenReturn('SheetId');
        when(this.importSpSh).isExist().thenReturn(true);
        // WHEN THEN
        assertException(() => {
            this.importService.startImport();
        }, false);
    }

    givenImportSettings(enabled, importOption){
        when(this.importSpSh).isExist().thenReturn(true);
        when(this.fromSupportSpr).getValue('E24').thenReturn('v1.6');
        when(this.importRng).getValue(1,2).thenReturn('SheetId');
        when(this.importRng).getValue(2,1).thenReturn('Items');
        when(this.importRng).getValue(2,2).thenReturn(importOption[0]);
        when(this.importRng).getValue(2,3).thenReturn(enabled[0]);
        when(this.importRng).getValue(3,1).thenReturn('Recipes');
        when(this.importRng).getValue(3,2).thenReturn(importOption[1]);
        when(this.importRng).getValue(3,3).thenReturn(enabled[1]);
        when(this.importRng).getValue(4,1).thenReturn('Meals');
        when(this.importRng).getValue(4,2).thenReturn(importOption[2]);
        when(this.importRng).getValue(4,3).thenReturn(enabled[2]);
        when(this.importRng).getValue(5,1).thenReturn('Profile');
        when(this.importRng).getValue(5,3).thenReturn(enabled[3]);
        when(this.importRng).getValue(6,1).thenReturn('Settings');
        when(this.importRng).getValue(6,3).thenReturn(enabled[4]);
        when(this.importRng).getValue(7,1).thenReturn('History');
        when(this.importRng).getValue(7,3).thenReturn(enabled[5]);
        when(this.importRng).getValue(8,1).thenReturn('Days');
        when(this.importRng).getValue(8,3).thenReturn(enabled[6]);
    }

    givenProfile(macroData, weightHistoryData, detailsData){
        when(this.fromProfileSpr).getValues('I16:L112').thenReturn(weightHistoryData);
        when(this.fromProfileSpr).getValues('C3:P13').thenReturn(macroData);
        when(this.fromProfileSpr).getValues('D16:D21').thenReturn(detailsData);
        when(this.toProfileSpr).getRng('I16:L112').thenReturn(this.toWeightHistoryRng);
        when(this.toProfileSpr).getRng('C3:P13').thenReturn(this.toMacroRng);
        when(this.toProfileSpr).getRng('D16:D21').thenReturn(this.toDetailsRng);
    }

    givenSettings(generalData, nutritionData, mealsData){
        when(this.fromSettingsSpr).getValues('E4:G10').thenReturn(generalData);
        when(this.fromSettingsSpr).getValues('D12:D20').thenReturn(nutritionData);
        when(this.fromSettingsSpr).getValues('F13:G18').thenReturn(mealsData);
        when(this.toSettingsSpr).getRng('E4:G10').thenReturn(this.toGeneralRng);
        when(this.toSettingsSpr).getRng('D12:D20').thenReturn(this.toNutritionRng);
        when(this.toSettingsSpr).getRng('F13:G18').thenReturn(this.toMealsRng);
    }

    verifyDataImport(sprMock, a1Area, data, times = 1){
        verify(sprMock).clear(a1Area).called(times);
        verify(sprMock).putDataAtEnd(data).called(times);
        verify(sprMock).sort(2).called(times);
    }
}

var runImportServiceTests = () => new ImportServiceTest().runAllTests();