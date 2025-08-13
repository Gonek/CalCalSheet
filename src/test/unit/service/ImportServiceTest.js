class ImportServiceTest extends TestBase {
    beforeAll(){
        super.beforeAll();
        this.sId = 'SheetId';
        this.importRng = mockRng(RNG.IMPORT);
        this.importSpSh = mockSpSh(this.sId);
        this.fromSupportSht = mockSht(`${this.sId}.${SHT.SUPPORT}`);
        this.fromItemsSht = mockSht(`${this.sId}.${SHT.ITEMS}`);
        this.fromRecipesSht = mockSht(`${this.sId}.${SHT.RECIPES}`);
        this.fromMealsSht = mockSht(`${this.sId}.${SHT.MEALS}`);
        this.fromProfileSht = mockSht(`${this.sId}.${SHT.PROFILE}`);
        this.fromSettingsSht = mockSht(`${this.sId}.${SHT.SETTINGS}`);
        this.fromHistorySht = mockSht(`${this.sId}.${SHT.HISTORY}`);
        this.fromDaysSht = mockSht(`${this.sId}.${SHT.DAYS}`);
        this.toSupportSht = mockSht(SHT.SUPPORT);
        this.toItemsSht = mockSht(SHT.ITEMS);
        this.toRecipesSht = mockSht(SHT.RECIPES);
        this.toMealsSht = mockSht(SHT.MEALS);
        this.toProfileSht = mockSht(SHT.PROFILE);
        this.toSettingsSht = mockSht(SHT.SETTINGS);
        this.toHistorySht = mockSht(SHT.HISTORY);
        this.toDaysSht = mockSht(SHT.DAYS);
        this.toWeightHistoryRng = mock(Rng); 
        this.toDetailsRng = mock(Rng); 
        this.toMacroRng = mock(Rng); 
        this.toGeneralRng = mock(Rng); 
        this.toNutritionRng = mock(Rng); 
        this.toMealsRng = mock(Rng);  
        this.fromCDaysRng = mock(Rng);
        this.toCDaysRng = mock(Rng);
        this.toTDaysRng = mock(Rng);
        this.settingsService = mock(SettingsService);

        this.importService = new ImportService();
    }

    shouldStartImportImportAndClearAllDataIfAllSheetSelectedWithClear(){
        // GIVEN
        this.givenImportSettings([true, true, true, true, true, true, true], [IMPORT_OPTIONS.CLEAR_CONTENT, IMPORT_OPTIONS.CLEAR_CONTENT, IMPORT_OPTIONS.CLEAR_CONTENT]);
        let itemsData = ['Items'];
        when(this.fromItemsSht).getValues('B4:AD').thenReturn(itemsData);
        let recipeData = ['Recipe'];
        when(this.fromRecipesSht).getClearValues('B4:D').thenReturn(recipeData);
        let mealData = ['Meal'];
        when(this.fromMealsSht).getClearValues('B4:D').thenReturn(mealData);
        let macroData = ['Macro'];
        let weightHistoryData = ['WeightHistory'];
        let detailsData = ['deatils'];
        this.givenProfile(macroData, weightHistoryData, detailsData);
        let generalData = ['General'];
        let nutritionData = ['Nutrition'];
        let mealsData = ['Meals'];
        let localData = ['Localisation'];
        this.givenSettings(generalData, nutritionData, mealsData, localData);
        let historyData = ['History'];
        when(this.fromHistorySht).getValues('B10:S').thenReturn(historyData);
        when(this.fromDaysSht).getRng('A6:N456').thenReturn(this.fromCDaysRng);
        when(this.toDaysSht).getRng('A6:N456').thenReturn(this.toCDaysRng);
        let cDaysData = ['Calendar Days'];
        let tDaysData = ['Template Days'];
        when(this.fromCDaysRng).getValues().thenReturn(cDaysData);
        when(this.fromDaysSht).getValues('P6:AC').thenReturn(tDaysData);
        when(this.toDaysSht).getRng('P6:AC').thenReturn(this.toTDaysRng);
        // WHEN
        this.importService.startImport();
        // THEN
        this.verifyDataImport(this.toItemsSht, 'B4:AD', itemsData);
        this.verifyDataImport(this.toRecipesSht, 'B4:D', recipeData);
        this.verifyDataImport(this.toMealsSht, 'B4:D', mealData);
        verify(this.toWeightHistoryRng).clearAndSetValues(weightHistoryData).calledOnce();
        verify(this.toMacroRng).setValuesWithResize(macroData).calledOnce();
        verify(this.toDetailsRng).clearAndSetValues(detailsData).calledOnce();
        verify(this.toGeneralRng).clearAndSetValues(generalData).calledOnce();
        verify(this.toNutritionRng).clearAndSetValues(nutritionData).calledOnce();
        verify(this.toMealsRng).clearAndSetValues(mealsData).calledOnce();
        verify(this.toSettingsSht).setValues('E23:E27', localData).calledOnce();
        verify(this.settingsService).applySettings().calledOnce();
        this.verifyDataImport(this.toHistorySht, 'B10:S', historyData); 
        verify(this.toCDaysRng).setValues(cDaysData).calledOnce();
        verify(this.toTDaysRng).setValuesWithResize(tDaysData).calledOnce();
    }

    shouldStartImportDoNothingIfNoSheetIsSelected(){
        // GIVEN
        this.givenImportSettings([false, false, false, false, false, false, false], ['', '', '']);
        // WHEN
        this.importService.startImport();
        // THEN 
        this.verifyDataImport(this.toItemsSht, 'B4:AD', any(), 0);
        this.verifyDataImport(this.toRecipesSht, 'B4:D', any(), 0);
        this.verifyDataImport(this.toMealsSht, 'B4:D', any(), 0);
        verify(this.toWeightHistoryRng).clearAndSetValues(any()).neverCalled();
        verify(this.toMacroRng).setValuesWithResize(any()).neverCalled();
        verify(this.toDetailsRng).clearAndSetValues(any()).neverCalled();
        verify(this.toGeneralRng).clearAndSetValues(any()).neverCalled();
        verify(this.toNutritionRng).clearAndSetValues(any()).neverCalled();
        verify(this.toMealsRng).clearAndSetValues(any()).neverCalled();
        verify(this.settingsService).applySettings().neverCalled();
        this.verifyDataImport(this.toHistorySht, 'B10:S', any(), 0); 
        verify(this.toCDaysRng).setValues(any()).neverCalled();
        verify(this.toTDaysRng).setValuesWithResize(any()).neverCalled();
    }

    shouldStartImportDoNotClearItemsIfMergeSelected(){
        // GIVEN
        this.givenImportSettings([true, false, false, false, false, false, false], [IMPORT_OPTIONS.MERGE_CONTENT, '', '']);
        let itemsData = ['Items'];
        when(this.fromItemsSht).getValues('B4:AD').thenReturn(itemsData);
        // WHEN
        this.importService.startImport();  
        // THEN
        verify(this.toItemsSht).clearContent('B4:AD').neverCalled();
        verify(this.toItemsSht).putDataAtEnd(itemsData).calledOnce();
        verify(this.toItemsSht).sort(2).calledOnce();
    }

    shouldStartImportDoNotClearRecipesIfMergeSelected(){
        // GIVEN
        this.givenImportSettings([false, true, false, false, false, false, false], ['', IMPORT_OPTIONS.MERGE_CONTENT, '']);
        let recipeData = ['Recipe'];
        when(this.fromRecipesSht).getClearValues('B4:D').thenReturn(recipeData);
        // WHEN
        this.importService.startImport();  
        // THEN
        verify(this.toRecipesSht).clearContent('B4:D').neverCalled();
        verify(this.toRecipesSht).putDataAtEnd(recipeData).calledOnce();
        verify(this.toRecipesSht).sort(2).calledOnce();
    }

    shouldStartImportDoNotClearMealIfMergeSelected(){
        // GIVEN
        this.givenImportSettings([false, false, true, false, false, false, false], ['',  '', IMPORT_OPTIONS.MERGE_CONTENT]);
        let mealData = ['Meal'];
        when(this.fromMealsSht).getClearValues('B4:D').thenReturn(mealData);
        // WHEN
        this.importService.startImport();  
        // THEN
        verify(this.toMealsSht).clearContent('B4:D').neverCalled();
        verify(this.toMealsSht).putDataAtEnd(mealData).calledOnce();
        verify(this.toMealsSht).sort(2).calledOnce();
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

    shouldStartImportThrowExeptionIfImportVersionOtherThen15or16(){
        // GIVEN
        when(this.fromSupportSht).getValue('E24').thenReturn('v1.4');
        when(this.importRng).getValue(1,2).thenReturn('SheetId');
        when(this.importSpSh).isExist().thenReturn(true);
        // WHEN THEN
        assertException(() => {
            this.importService.startImport();
        }, false);
    }

    givenImportSettings(enabled, importOption){
        when(this.importSpSh).isExist().thenReturn(true);
        when(this.fromSupportSht).getValue('E24').thenReturn('v1.6');
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
        when(this.fromProfileSht).getValues('I17:L113').thenReturn(weightHistoryData);
        when(this.fromProfileSht).getValues('C3:P14').thenReturn(macroData);
        when(this.fromProfileSht).getValues('D17:D22').thenReturn(detailsData);
        when(this.toProfileSht).getRng('I17:L113').thenReturn(this.toWeightHistoryRng);
        when(this.toProfileSht).getRng('C3:P14').thenReturn(this.toMacroRng);
        when(this.toProfileSht).getRng('D17:D22').thenReturn(this.toDetailsRng);
    }

    givenSettings(generalData, nutritionData, mealsData, localData){
        when(this.fromSettingsSht).getValues('E4:E11').thenReturn(generalData);
        when(this.fromSettingsSht).getValues('D13:D21').thenReturn(nutritionData);
        when(this.fromSettingsSht).getValues('F14:G19').thenReturn(mealsData);
        when(this.fromSettingsSht).getValues('E23:E27').thenReturn(localData);
        when(this.toSettingsSht).getRng('E4:E11').thenReturn(this.toGeneralRng);
        when(this.toSettingsSht).getRng('D13:D21').thenReturn(this.toNutritionRng);
        when(this.toSettingsSht).getRng('F14:G19').thenReturn(this.toMealsRng);
    }

    verifyDataImport(sprMock, a1Area, data, times = 1){
        verify(sprMock).clearContent(a1Area).called(times);
        verify(sprMock).putDataAtEnd(data).called(times);
        verify(sprMock).sort(2).called(times);
    }
}

var runImportServiceTests = () => new ImportServiceTest().runAllTests();