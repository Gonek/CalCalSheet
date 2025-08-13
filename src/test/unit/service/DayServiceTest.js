class DayServiceTest extends TestBase {
    beforeAll(){
        super.beforeAll();
        this.daySht = mockSht(SHT.DAY);
        this.lastFinishedDayRng = mockRng(RNG.LAST_FINISHED_DAY);
        this.todayRng = mockRng(RNG.TODAY);
        this.dayNameRng = mockRng(CBOX.DAY_NAME);
        this.prevDayIndexRng = mockRng(RNG.DAY_PREV_DAY_INDEX);
        this.dayIndexRng = mockRng(RNG.DAY_INDEX);
        this.dayItemsRng = mockRng(RNG.DAY_ITEMS);
        this.mealNamesRng = mockRng(RNG.MEAL_NAMES);
        this.dayPrevDateRng = mockRng(RNG.DAY_PREV_DATE);
        this.summaryRng = mockRng(RNG.SUMMARY);
        this.calorieDensityRng = mockRng(RNG.CALORIE_DENSITY);
        this.checklistRng = mockRng(RNG.CHECKLIST);
        this.calorieOutputRng = mockRng(RNG.CALORIE_OUTPUT);
        this.selectedMealItemsRng = mockRng(RNG.SELECTED_MEAL_ITEMS);
        this.generalSettingsRng = mockRng(RNG.GENERAL_SETTINGS);
        this.numberOfProfilesRng = mockRng(RNG.NUMBER_OF_PROFILES);
        this.selectedProfileIndexRng = mockRng(RNG.SELECTED_PROFILE_INDEX);
        this.macroProfilesRng = mockRng(RNG.MACRO_PROFILES);
        this.selecetedProfileRng = mockRng(RNG.SELECTED_PROFILE);
        this.selectedMealIdsRng = mockRng(RNG.SELECTED_MEAL_IDS);
        this.inRowCalcFieldsRng = mockRng(RNG.IN_ROW_CALC_FIELDS);
        this.meal1Rng = mockRng(RNG.MEAL1);
        this.meal2Rng = mockRng(RNG.MEAL2);
        this.meal3Rng = mockRng(RNG.MEAL3);
        this.meal4Rng = mockRng(RNG.MEAL4);
        this.meal5Rng = mockRng(RNG.MEAL5);
        this.meal6Rng = mockRng(RNG.MEAL6);
        this.dayRepository = mock(DayRepository);
        this.historyRepository = mock(HistoryRepository);
        this.mealRepository = mock(MealRepository);
        this.itemRepository = mock(ItemRepository);
        this.app = mock(App);

        this.dayService = new DayService();
      }

    shouldFinishDay(){
        // GIVEN
        when(this.todayRng).getDisplayValue().thenReturn('10/01/2025');
        when(this.lastFinishedDayRng).getDisplayValue().thenReturn('09/01/2025');
        when(this.dayItemsRng).getValues().thenReturn([['Item', '', 10], ['Item 2', '', 20], ['Item 3', '', 30], ['Item 4', '', 40]]);
        when(this.dayPrevDateRng).getValue().thenReturn('10/01/2025');
        when(this.summaryRng).getRowAsArray().thenReturn([1800, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]);
        when(this.calorieDensityRng).getValue().thenReturn(90.5);
        when(this.checklistRng).getColAsArray().thenReturn(['✔️', '✔️', '✔️']);
        when(this.calorieOutputRng).getValue().thenReturn(2510);
        when(this.selecetedProfileRng).getValue().thenReturn('Default');
        when(this.prevDayIndexRng).getValue().thenReturn(14);
        when(this.dayIndexRng).getValue().thenReturn(15);
        when(this.dayRepository).load(15).thenReturn(new Day([['New', 1], ['New 2', 2], ['New 3', 3], ['New 4', 4]], 2510, 'Default'));
        // WHEN
        this.dayService.finishDay();
        // THEN
        verify(this.dayRepository).update(14, this.generateDay()).calledOnce();
        verify(this.historyRepository).addOrUpdate(new History('10/01/2025', [1800, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 2510, 90.5, ['✔️', '✔️', '✔️'])).calledOnce();
        verify(this.dayRepository).deletePastDays().calledOnce();
        verify(this.dayRepository).copyDefaultForFutureDays().calledOnce();
        verify(this.lastFinishedDayRng).setValue('10/01/2025').calledOnce();
        verify(this.dayNameRng).setValueAndFlush('🚩 10/01/2025').calledOnce();
        verify(this.dayItemsRng).setValues([['New', '', 1], ['New 2', '', 2], ['New 3', '', 3], ['New 4', '', 4]]).calledOnce();
        verify(this.prevDayIndexRng).setValue(15).calledOnce();
        verify(this.calorieOutputRng).setValue(2510).calledOnce();
        verify(this.selecetedProfileRng).setValue('Default');
        verify(this.mealNamesRng).clearContent().calledOnce();
        verify(this.itemRepository).autoDeleteItems().calledOnce();
        verify(this.app).flush().called(2);
    }

    shouldChangeDaySaveCurrentDayAndLoadTheSelectedDay(){
        // GIVEN
        when(this.dayItemsRng).getValues().thenReturn([['Item', '', 10], ['Item 2', '', 20], ['Item 3', '', 30], ['Item 4', '', 40]]);
        when(this.calorieOutputRng).getValue().thenReturn(2510);
        when(this.selecetedProfileRng).getValue().thenReturn('Default');
        when(this.prevDayIndexRng).getValue().thenReturn(14);
        when(this.dayPrevDateRng).getValue().thenReturn('10/01/2025');
        when(this.summaryRng).getRowAsArray().thenReturn([1800, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]);
        when(this.calorieDensityRng).getValue().thenReturn(90.5);
        when(this.checklistRng).getColAsArray().thenReturn(['✔️', '✔️', '✔️']);
        when(this.dayIndexRng).getValue().thenReturn(15);
        when(this.dayRepository).load(15).thenReturn(new Day([['New', 1], ['New 2', 2], ['New 3', 3], ['New 4', 4]], 2510, 'Default'));
        // WHEN
        this.dayService.changeDay();
        // THEN
        verify(this.dayRepository).update(14, this.generateDay()).calledOnce();
        verify(this.historyRepository).addOrUpdate(new History('10/01/2025', [1800, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 2510, 90.5, ['✔️', '✔️', '✔️'])).calledOnce();
        verify(this.dayItemsRng).setValues([['New', '', 1], ['New 2', '', 2], ['New 3', '', 3], ['New 4', '', 4]]).calledOnce();
        verify(this.prevDayIndexRng).setValue(15).calledOnce();
        verify(this.calorieOutputRng).setValue(2510).calledOnce();
        verify(this.selecetedProfileRng).setValue('=Texts!B25').calledOnce();
        verify(this.mealNamesRng).clearContent().calledOnce();
        verify(this.app).flush().calledOnce();
    }

    shouldLoadDayFromInsertItemsAndDetailsFromSelectedDay(){
        // GIVEN
        let input = mock(BtnF);
        when(input).getData().thenReturn(10);
        when(this.dayRepository).load(10).thenReturn(this.generateDay());
        // WHEN
        this.dayService.loadDayFrom(input.mockObj);
        // THEN
        verify(this.dayItemsRng).setValues([['Item', '', 10], ['Item 2', '', 20], ['Item 3', '', 30], ['Item 4', '', 40]]).calledOnce();
        verify(this.calorieOutputRng).setValue(2510).calledOnce();
        verify(this.selecetedProfileRng).setValue('Default').calledOnce();
        verify(this.mealNamesRng).clearContent().calledOnce();
    }

    shouldLoadDayFromDoNothingWhenNoDaySelected(){
        // GIVEN
        let input = mock(BtnF);
        when(input).getData().thenReturn(0);
        // WHEN
        this.dayService.loadDayFrom(input.mockObj);
        // THEN
        verify(this.dayItemsRng).setValues(any()).neverCalled();
        verify(this.calorieOutputRng).setValue(any()).neverCalled();
        verify(this.selecetedProfileRng).setValue(any()).neverCalled();
        verify(this.mealNamesRng).clearContent().neverCalled();
    }

    shouldSaveDayAsSaveCurrentDayWithGivenNameIfNoIndexProvided(){
        // GIVEN
        let input = mock(BtnF);
        when(input).getData().thenReturn(null);
        when(input).getValue().thenReturn('Name');
        when(this.dayItemsRng).getValues().thenReturn([['Item', '', 10], ['Item 2', '', 20], ['Item 3', '', 30], ['Item 4', '', 40]]);
        when(this.calorieOutputRng).getValue().thenReturn(2510);
        when(this.selecetedProfileRng).getValue().thenReturn('Default');
        // WHEN
        this.dayService.saveDayAs(input.mockObj);
        // THEN
        verify(this.dayRepository).saveAs(this.generateDay('Name')).calledOnce();
        verify(this.dayRepository).update(any(), any()).neverCalled();
    }

    shouldSaveDayAsUpdateDayWithCurrentDayIfIndexProvided(){
        // GIVEN
        let input = mock(BtnF);
        when(input).getData().thenReturn(16);
        when(this.dayItemsRng).getValues().thenReturn([['Item', '', 10], ['Item 2', '', 20], ['Item 3', '', 30], ['Item 4', '', 40]]);
        when(this.calorieOutputRng).getValue().thenReturn(2510);
        when(this.selecetedProfileRng).getValue().thenReturn('Default');
        // WHEN
        this.dayService.saveDayAs(input.mockObj);
        // THEN
        verify(this.dayRepository).update(16, this.generateDay()).calledOnce();
        verify(this.dayRepository).saveAs(any()).neverCalled();
    }

    shouldSaveDayAsDoNothingIfNoNameAndIndexGiven(){
        // GIVEN
        let input = mock(BtnF);
        when(input).getData().thenReturn(null);
        when(input).getValue().thenReturn('');
        // WHEN
        this.dayService.saveDayAs(input.mockObj);
        // THEN
        verify(this.dayRepository).update(any(), any()).neverCalled();
        verify(this.dayRepository).saveAs(any()).neverCalled();
    }

    shouldDeleteDaysRemoveSelectedDays(){
        // GIVEN
        var input = mock(BtnF);
        when(input).getData().thenReturn('-10,-2,-12,-4');
        // WHEN
        this.dayService.deleteDays(input.mockObj);
        // THEN
        verify(this.dayRepository).delete(-12).calledInOrder(2);
        verify(this.dayRepository).delete(-10).calledInOrder(3);
        verify(this.dayRepository).delete(-4).calledInOrder(4);
        verify(this.dayRepository).delete(-2).calledInOrder(5);
    }

    shouldDeleteDaysDoNothingIfNoDaySelected(){
        // GIVEN
        var input = mock(BtnF);
        when(input).getData().thenReturn('');
        // WHEN
        this.dayService.deleteDays(input.mockObj);
        // THEN
        verify(this.dayRepository).delete(any()).neverCalled();
    }

    shouldClearDayRemoveAllItemsFromCurrentDay(){
        // WHEN
        this.dayService.clearDay();
        // THEN
        verify(this.dayItemsRng).clearContent().calledOnce();
    }

    shouldLoadMealLoadTheSelectedMealToTheSelectedMealPlace(){
        // GIVEN
        var inputBtn = mock(Btn);
        var mealStart = mock(Rng);
        when(inputBtn).getRng().thenReturn(mealStart);
        when(mealStart).getRow().thenReturn(17);
        when(inputBtn).getValue().thenReturn('🥣 Meal');
        when(this.selectedMealItemsRng).getValues().thenReturn([['Item 1', 10], ['Item 2', 20], ['Item 3', 30], ['Item 4', 40]]);
        // WHEN
        this.dayService.loadMeal(inputBtn.mockObj);
        // THEN
        verify(this.daySht).setValue('W17', 'Meal').calledOnce();
        verify(this.meal1Rng).setValues([['Item 1', '', 10], ['Item 2', '', 20], ['Item 3', '', 30], ['Item 4', '', 40]]).calledOnce();
    }

    shouldLoadMealDoNotLoadTheSelectedMealIfItsNotAMeal(){
        // GIVEN
        var inputBtn = mock(Btn);
        when(inputBtn).getValue().thenReturn('Meal');
        // WHEN
        this.dayService.loadMeal(inputBtn.mockObj);
        // THEN
        verify(this.daySht).setValue(any()).neverCalled()
        verify(this.meal1Rng).setValues(any()).neverCalled();
    }

    shouldSaveMealAsSaveSelectedMealToGivenName(){
        // GIVEN
        var inputBtnf = mock(BtnF);
        when(inputBtnf).getValue().thenReturn('Meal');
        when(this.selectedMealIdsRng).getValue().thenReturn('1');
        when(this.meal1Rng).getValues().thenReturn([['Item 1', '', 10], ['', '', 0], ['Item 2', '', 20], ['Item 3', '', 30]]);
        // WHEN
        this.dayService.saveAsMeal(inputBtnf.mockObj);
        // THEN
        verify(this.mealRepository).saveMeal(new Meal('Meal', [['Item 1', 10], ['Item 2', 20], ['Item 3', 30]])).calledOnce();
    }

    shouldSaveAsMealSaveSelectedMealsToGivenNames(){
        // GIVEN
        var inputBtnf = mock(BtnF);
        when(inputBtnf).getValue().thenReturn('Meal, Meal2, Meal3, Meal4, Meal5, Meal6');
        when(this.selectedMealIdsRng).getValue().thenReturn('1,2,3,4,5,6');
        when(this.meal1Rng).getValues().thenReturn([['Item 1', '', 10], ['', '', 0], ['Item 2', '', 30], ['Item 3', '', 40]]);
        when(this.meal2Rng).getValues().thenReturn([['Item 1', '', 20], ['', '', 0], ['Item 2', '', 40], ['Item 3', '', 50]]);
        when(this.meal3Rng).getValues().thenReturn([['Item 1', '', 30], ['', '', 0], ['Item 2', '', 50], ['Item 3', '', 60]]);
        when(this.meal4Rng).getValues().thenReturn([['Item 1', '', 40], ['', '', 0], ['Item 2', '', 60], ['Item 3', '', 70]]);
        when(this.meal5Rng).getValues().thenReturn([['Item 1', '', 50], ['', '', 0], ['Item 2', '', 70], ['Item 3', '', 80]]);
        when(this.meal6Rng).getValues().thenReturn([['Item 1', '', 60], ['', '', 0], ['Item 2', '', 80], ['Item 3', '', 90]]);
        // WHEN
        this.dayService.saveAsMeal(inputBtnf.mockObj);
        // THEN
        verify(this.mealRepository).saveMeal(new Meal('Meal', [['Item 1', 10], ['Item 2', 30], ['Item 3', 40]])).calledOnce();
        verify(this.mealRepository).saveMeal(new Meal('Meal2', [['Item 1', 20], ['Item 2', 40], ['Item 3', 50]])).calledOnce();
        verify(this.mealRepository).saveMeal(new Meal('Meal3', [['Item 1', 30], ['Item 2', 50], ['Item 3', 60]])).calledOnce();
        verify(this.mealRepository).saveMeal(new Meal('Meal4', [['Item 1', 40], ['Item 2', 60], ['Item 3', 70]])).calledOnce();
        verify(this.mealRepository).saveMeal(new Meal('Meal5', [['Item 1', 50], ['Item 2', 70], ['Item 3', 80]])).calledOnce();
        verify(this.mealRepository).saveMeal(new Meal('Meal6', [['Item 1', 60], ['Item 2', 80], ['Item 3', 90]])).calledOnce();
    }

    shouldSaveAsMealSaveOnlyMealsThatHaveName(){
        // GIVEN
        var inputBtnf = mock(BtnF);
        when(inputBtnf).getValue().thenReturn('Meal');
        when(this.selectedMealIdsRng).getValue().thenReturn('1,2,3,4,5,6');
        when(this.meal1Rng).getValues().thenReturn([['Item 1', '', 10], ['', '', 0], ['Item 2', '', 30], ['Item 3', '', 40]]);
        // WHEN
        this.dayService.saveAsMeal(inputBtnf.mockObj);
        // THEN
        verify(this.mealRepository).saveMeal(new Meal('Meal', [['Item 1', 10], ['Item 2', 30], ['Item 3', 40]])).calledOnce();
    }

    shouldSaveAsMealOnlyUseFirstNameIfOnlyOneMealSelected(){
        // GIVEN
        var inputBtnf = mock(BtnF);
        when(inputBtnf).getValue().thenReturn('Meal, Meal2, Meal3, Meal4, Meal5, Meal6');
        when(this.selectedMealIdsRng).getValue().thenReturn('4');
        when(this.meal4Rng).getValues().thenReturn([['Item 1', '', 40], ['', '', 0], ['Item 2', '', 60], ['Item 3', '', 70]]);
        // WHEN
        this.dayService.saveAsMeal(inputBtnf.mockObj);
        // THEN
        verify(this.mealRepository).saveMeal(new Meal('Meal', [['Item 1', 40], ['Item 2', 60], ['Item 3', 70]])).calledOnce();
    }

    shouldSaveMealAsDoNotSaveSelectedMealIfThereIsNoNameGiven(){
        // GIVEN
        var inputBtnf = mock(BtnF);
        when(inputBtnf).getValue().thenReturn('');
        when(this.selectedMealIdsRng).getValue().thenReturn('1');
        // WHEN
        this.dayService.saveAsMeal(inputBtnf.mockObj);
        // THEN
        verify(this.mealRepository).saveMeal(any()).neverCalled();
    }

    shouldCopyMealsToCopySelectedMealsToSelectedDays(){
        // GIVEN
        var inputBtnf = mock(BtnF);
        when(this.selectedMealIdsRng).getValue().thenReturn('1,3,5');
        when(inputBtnf).getData().thenReturn('4,49,79');
        when(this.meal1Rng).getValues().thenReturn([['M1I1', '', 11],['M1I2', '', 12]]);
        when(this.meal3Rng).getValues().thenReturn([['M3I1', '', 31],['M3I2', '', 32]]);
        when(this.meal5Rng).getValues().thenReturn([['M5I1', '', 51],['M5I2', '', 52]]);
        let expectedMap = new Map();
        expectedMap.set('1', [['M1I1',11],['M1I2',12]]);
        expectedMap.set('3', [['M3I1',31],['M3I2',32]]);
        expectedMap.set('5', [['M5I1',51],['M5I2',52]]);
        // WHEN
        this.dayService.copyMealsTo(inputBtnf.mockObj);
        // THEN
        verify(this.dayRepository).copyMealsTo(expectedMap, [4, 49, 79]).calledOnce();
    }

    shouldCopyMealsToDoNotCopyMealsIfNoDaysSelected(){
        // GIVEN
        var inputBtnf = mock(BtnF);
        when(this.selectedMealIdsRng).getValue().thenReturn('1,3,5');
        when(inputBtnf).getData().thenReturn('');
        // WHEN
        this.dayService.copyMealsTo(inputBtnf.mockObj);
        // THEN
        verify(this.dayRepository).copyMealsTo(any()).neverCalled();
    }

    shouldCopyMealsToDoNotCopyMealsIfNoMealSelected(){
        // GIVEN
        var inputBtnf = mock(BtnF);
        when(this.selectedMealIdsRng).getValue().thenReturn('');
        when(inputBtnf).getData().thenReturn('4,49,79');
        // WHEN
        this.dayService.copyMealsTo(inputBtnf.mockObj);
        // THEN
        verify(this.dayRepository).copyMealsTo(any()).neverCalled();
    }

    shouldCopyMealsFromCopySelectedMealsFromSelectedDay(){
        // GIVEN
        var inputBtnf = mock(BtnF);
        when(inputBtnf).getData().thenReturn(16);
        when(this.selectedMealIdsRng).getValue().thenReturn('1,3,5');
        when(this.dayRepository).load(16).thenReturn(new Day(Array.from({length:90},(v,k)=>[`Item ${k}`, k]), 0, ''));
        // WHEN
        this.dayService.copyMealsFrom(inputBtnf.mockObj);
        // THEN
        verify(this.meal1Rng).setValues([["Item 0","",0],["Item 1","",1],["Item 2","",2],["Item 3","",3],["Item 4","",4],
                                         ["Item 5","",5],["Item 6","",6],["Item 7","",7],["Item 8","",8],["Item 9","",9],
                                         ["Item 10","",10],["Item 11","",11],["Item 12","",12],["Item 13","",13],["Item 14","",14]]).calledOnce();
        verify(this.meal2Rng).setValue(any()).neverCalled();
        verify(this.meal3Rng).setValues([["Item 30","",30],["Item 31","",31],["Item 32","",32],["Item 33","",33],["Item 34","",34],
                                         ["Item 35","",35],["Item 36","",36],["Item 37","",37],["Item 38","",38],["Item 39","",39],
                                         ["Item 40","",40],["Item 41","",41],["Item 42","",42],["Item 43","",43],["Item 44","",44]]).calledOnce();
        verify(this.meal4Rng).setValue(any()).neverCalled();
        verify(this.meal5Rng).setValues([["Item 60","",60],["Item 61","",61],["Item 62","",62],["Item 63","",63],["Item 64","",64],
                                         ["Item 65","",65],["Item 66","",66],["Item 67","",67],["Item 68","",68],["Item 69","",69],
                                         ["Item 70","",70],["Item 71","",71],["Item 72","",72],["Item 73","",73],["Item 74","",74]]).calledOnce();
        verify(this.meal6Rng).setValue(any()).neverCalled();
    }

    shouldCopyMealsFromDoNotCopyMealsIfNoDaySelected(){
        // GIVEN
        var inputBtnf = mock(BtnF);
        when(inputBtnf).getData().thenReturn(null);
        when(this.selectedMealIdsRng).getValue().thenReturn('1,3,5');
        // WHEN
        this.dayService.copyMealsFrom(inputBtnf.mockObj);
        // THEN
        verify(this.meal1Rng).setValue(any()).neverCalled();
        verify(this.meal2Rng).setValue(any()).neverCalled();
        verify(this.meal3Rng).setValue(any()).neverCalled();
        verify(this.meal4Rng).setValue(any()).neverCalled();
        verify(this.meal5Rng).setValue(any()).neverCalled();
        verify(this.meal6Rng).setValue(any()).neverCalled();
    }

    shouldCopyMealsFromDoNotCopyMealsIfNoMealSelected(){
        // GIVEN
        var inputBtnf = mock(BtnF);
        when(inputBtnf).getData().thenReturn(16);
        when(this.selectedMealIdsRng).getValue().thenReturn('');
        // WHEN
        this.dayService.copyMealsFrom(inputBtnf.mockObj);
        // THEN
        verify(this.meal1Rng).setValue(any()).neverCalled();
        verify(this.meal2Rng).setValue(any()).neverCalled();
        verify(this.meal3Rng).setValue(any()).neverCalled();
        verify(this.meal4Rng).setValue(any()).neverCalled();
        verify(this.meal5Rng).setValue(any()).neverCalled();
        verify(this.meal6Rng).setValue(any()).neverCalled();
    }

    shouldClearMealsRemoveAllItemsFromSelectedMeals(){
        // GIVEN
        when(this.selectedMealIdsRng).getValue().thenReturn('1,4');
        // WHEN
        this.dayService.clearMeals();
        // THEN
        verify(this.meal1Rng).clearContent().calledOnce();
        verify(this.meal2Rng).clearContent().neverCalled();
        verify(this.meal3Rng).clearContent().neverCalled();
        verify(this.meal4Rng).clearContent().calledOnce();
        verify(this.meal5Rng).clearContent().neverCalled();
        verify(this.meal6Rng).clearContent().neverCalled();
    }

    shouldClearMealsDoNothingIfNoMealsSelected(){
        // GIVEN
        when(this.selectedMealIdsRng).getValue().thenReturn('');
        // WHEN
        this.dayService.clearMeals();
        // THEN
        verify(this.meal1Rng).clearContent().neverCalled();
        verify(this.meal2Rng).clearContent().neverCalled();
        verify(this.meal3Rng).clearContent().neverCalled();
        verify(this.meal4Rng).clearContent().neverCalled();
        verify(this.meal5Rng).clearContent().neverCalled();
        verify(this.meal6Rng).clearContent().neverCalled();
    }

    shouldDeleteMealsRemoveAllSelectedMeals(){
        // GIVEN
        let input = mock(BtnF);
        when(input).getValue().thenReturn('Meal1, Meal4');
        // WHEN
        this.dayService.deleteMeals(input.mockObj);
        // THEN
        verify(this.mealRepository).delete(['Meal1', 'Meal4']).calledOnce();
    }

    shouldDeleteMealsDoNothingIfNoMealsSelected(){
        // GIVEN
        let input = mock(BtnF);
        when(input).getValue().thenReturn('');
        // WHEN
        this.dayService.deleteMeals(input.mockObj);
        // THEN
        verify(this.mealRepository).delete(any()).neverCalled();
    }

    shouldInLineCalculationCopyCalulatedVauleToAmounthField(){
        // GIVEN
        when(this.inRowCalcFieldsRng).getColAsArray().thenReturn([10, '', '', '', 185]);
        // WHEN
        this.dayService.inLineCalculation();
        // THEN
        verify(this.daySht).setValue('E26', 185).calledOnce();
    }

    shouldInLineCalculationDoNothingIfIndexZero(){
        // GIVEN
        when(this.inRowCalcFieldsRng).getColAsArray().thenReturn([0, '', '', '', '']);
        // WHEN
        this.dayService.inLineCalculation();
        // THEN
        verify(this.daySht).setValue(any(), any()).neverCalled();
    }

    shouldShowHideToolsShowToolsIfTheHidden(){
        // GIVEN
        let input = mock(Btn);
        when(input).getData().thenReturn('false');
        // WHEN
        this.dayService.showHideTools(input.mockObj);
        // THEN
        verify(this.daySht).switchCols(true, 26, 7).calledOnce();
        verify(input).setData(true).calledOnce();
    }

    shouldShowHideToolsHideToolsIfTheShown(){
        // GIVEN
        let input = mock(Btn);
        when(input).getData().thenReturn('true');
        // WHEN
        this.dayService.showHideTools(input.mockObj);
        // THEN
        verify(this.daySht).switchCols(false, 26, 7).calledOnce();
        verify(input).setData(false).calledOnce();
    }

    // OTHER 

    generateDay(name = undefined){
        return new Day([['Item', 10], ['Item 2', 20], ['Item 3', 30], ['Item 4', 40]], 2510, 'Default', name);
    }
}

var runDayServiceTests = () => new DayServiceTest().runAllTests();