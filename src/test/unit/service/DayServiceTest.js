class DayServiceTest extends TestBase {
    constructor(){
        super();
        this.daySpr = mockSpr(SPR.DAY, this);
        this.lastFinishedDayRng = mockRng(RNG.LAST_FINISHED_DAY, this);
        this.todayRng = mockRng(RNG.TODAY, this);
        this.dayNameRng = mockRng(CBOX.DAY_NAME, this);
        this.prevDayIndexRng = mockRng(RNG.DAY_PREV_DAY_INDEX, this);
        this.dayIndexRng = mockRng(RNG.DAY_INDEX, this);
        this.selectedDayItemsRng = mockRng(RNG.SELECTED_DAY_ITEMS, this);
        this.dayItemsRng = mockRng(RNG.DAY_ITEMS, this);
        this.mealNamesRng = mockRng(RNG.MEAL_NAMES, this);
        this.dayPrevDateRng = mockRng(RNG.DAY_PREV_DATE, this);
        this.summaryRng = mockRng(RNG.SUMMARY, this);
        this.calorieDensityRng = mockRng(RNG.CALORIE_DENSITY, this);
        this.checklistRng = mockRng(RNG.CHECKLIST, this);
        this.calorieOutputRng = mockRng(RNG.CALORIE_OUTPUT, this);
        this.selectedMealItemsRng = mockRng(RNG.SELECTED_MEAL_ITEMS, this);
        this.saveMealAsRng = mockRng(RNG.SAVE_MEAL_AS, this);
        this.saveMealFromRng = mockRng(RNG.SAVE_MEAL_FROM, this);
        this.saveMealFromMealIdRng = mockRng(RNG.SAVE_MEAL_FROM_MEAL_ID, this);
        this.copyMealToRowsRng = mockRng(RNG.COPY_MEAL_TO_ROWS, this);
        this.copyMealFromMealIdsRng = mockRng(RNG.COPY_MEAL_FROM_MEAL_IDS, this);
        this.copyMealFromRng = mockRng(RNG.COPY_MEAL_FROM, this);
        this.copyMealToRng = mockRng(RNG.COPY_MEAL_TO, this);
        this.generalSettingsRng = mockRng(RNG.GENERAL_SETTINGS, this);
        this.numberOfProfilesRng = mockRng(RNG.NUMBER_OF_PROFILES, this);
        this.selectedProfileIndexRng = mockRng(RNG.SELECTED_PROFILE_INDEX, this);
        this.macroProfilesRng = mockRng(RNG.MACRO_PROFILES, this);
        this.selecetedProfileRng = mockRng(RNG.SELECTED_PROFILE, this);
        this.additionalDataRng = mockRng(RNG.ADDITIONAL_DATA, this);
        this.meal1Rng = mockRng(RNG.MEAL1, this);
        this.meal3Rng = mockRng(RNG.MEAL3, this);
        this.meal5Rng = mockRng(RNG.MEAL5, this);
        this.meal1StartRng = mockRng(CBOX.MEAL_1_START, this);
        this.mockBox = mock(new CBox(CBOX.MEAL_1_START), this);
        this.dayRepository = mock(DayRepository, this);
        this.historyRepository = mock(HistoryRepository, this);
        this.mealRepository = mock(MealRepository, this);
        this.app = mock(App, this);

        this.dayService = new DayService();
      }

    shouldFinishDay(){
        // GIVEN
        when(this.todayRng).getDisplayValue().thenReturn('10/01/2025');
        when(this.lastFinishedDayRng).getDisplayValue().thenReturn('09/01/2025');
        when(this.dayItemsRng).getValues().thenReturn([['Item', '', 10], ['Item 2', '', 20], ['Item 3', '', 30], ['Item 4', '', 40]]);
        when(this.dayRepository).save(new Day([['Item', '', 10], ['Item 2', '', 20], ['Item 3', '', 30], ['Item 4', '', 40]], 2510, 'Default')).thenReturn(true);
        when(this.dayPrevDateRng).getValue().thenReturn('10/01/2025');
        when(this.summaryRng).getRowAsArray().thenReturn([1800, 10, 11, 12, 13, 14, 15, 16, 17, 18]);
        when(this.calorieDensityRng).getValue().thenReturn(90.5);
        when(this.checklistRng).getColAsArray().thenReturn(['✔️', '✔️', '✔️']);
        when(this.calorieOutputRng).getValue().thenReturn(2510);
        when(this.selecetedProfileRng).getValue().thenReturn('Default');
        when(this.selectedDayItemsRng).getValues().thenReturn([['New', 1], ['New 2', 2], ['New 3', 3], ['New 4', 4]]);
        when(this.additionalDataRng).getColAsArray().thenReturn([2510, 'Default']);
        when(this.prevDayIndexRng).getValue().thenReturn(14);
        when(this.dayIndexRng).getValue().thenReturn(15);
        // WHEN
        this.dayService.finishDay();
        // THEN
        verify(this.dayRepository).save(new Day([['Item', '', 10], ['Item 2', '', 20], ['Item 3', '', 30], ['Item 4', '', 40]], 2510, 'Default')).calledOnce();
        verify(this.historyRepository).addOrUpdate(new History('10/01/2025', [1800, 10, 11, 12, 13, 14, 15, 16, 17, 18], 2510, 90.5, ['✔️', '✔️', '✔️'])).calledOnce();
        verify(this.dayRepository).deletePastDays().calledOnce();
        verify(this.dayRepository).copyDefaultForFutureDays().calledOnce();
        verify(this.lastFinishedDayRng).setValue('10/01/2025').calledOnce();
        verify(this.dayNameRng).setValueAndFlush('🚩 10/01/2025').calledOnce();
        verify(this.dayItemsRng).setValues([['New', '', 1], ['New 2', '', 2], ['New 3', '', 3], ['New 4', '', 4]]).calledOnce();
        verify(this.prevDayIndexRng).setValue(15).calledOnce();
        verify(this.calorieOutputRng).setValue(2510);
        verify(this.selecetedProfileRng).setValue('Default');
        verify(this.mealNamesRng).clear().calledOnce();
        verify(this.app).flush().called(2);
    }

    shouldChangeDaySaveCurrentDayAndLoadTheSelectedIfTheyAreDifferent(){
        // GIVEN
        when(this.prevDayIndexRng).getValue().thenReturn(14);
        when(this.dayIndexRng).getValue().thenReturn(15);
        when(this.dayItemsRng).getValues().thenReturn([['Item', '', 10], ['Item 2', '', 20], ['Item 3', '', 30], ['Item 4', '', 40]]);
        when(this.dayRepository).save(new Day([['Item', '', 10], ['Item 2', '', 20], ['Item 3', '', 30], ['Item 4', '', 40]], 2510, 'Default')).thenReturn(true);
        when(this.dayPrevDateRng).getValue().thenReturn('10/01/2025');
        when(this.summaryRng).getRowAsArray().thenReturn([1800, 10, 11, 12, 13, 14, 15, 16, 17, 18]);
        when(this.calorieDensityRng).getValue().thenReturn(90.5);
        when(this.checklistRng).getColAsArray().thenReturn(['✔️', '✔️', '✔️']);
        when(this.calorieOutputRng).getValue().thenReturn(2510);
        when(this.selecetedProfileRng).getValue().thenReturn('Default');
        when(this.selectedDayItemsRng).getValues().thenReturn([['New', 1], ['New 2', 2], ['New 3', 3], ['New 4', 4]]);
        when(this.additionalDataRng).getColAsArray().thenReturn([2510, 'Default']);
        // WHEN
        this.dayService.changeDay();
        // THEN
        verify(this.dayRepository).save(new Day([['Item', '', 10], ['Item 2', '', 20], ['Item 3', '', 30], ['Item 4', '', 40]], 2510, 'Default')).calledOnce();
        verify(this.historyRepository).addOrUpdate(new History('10/01/2025', [1800, 10, 11, 12, 13, 14, 15, 16, 17, 18], 2510, 90.5, ['✔️', '✔️', '✔️'])).calledOnce();
        verify(this.dayItemsRng).setValues([['New', '', 1], ['New 2', '', 2], ['New 3', '', 3], ['New 4', '', 4]]).calledOnce();
        verify(this.prevDayIndexRng).setValue(15).calledOnce();
        verify(this.calorieOutputRng).setValue(2510);
        verify(this.selecetedProfileRng).setValue('Default');
        verify(this.mealNamesRng).clear().calledOnce();
        verify(this.app).flush().calledOnce();
    }

    shouldChangeDayDoNothingIfTheyTheCurrentAndTheSelectedDayTheSame(){
        // GIVEN
        when(this.prevDayIndexRng).getValue().thenReturn(15);
        when(this.dayIndexRng).getValue().thenReturn(15);
         // WHEN
        this.dayService.changeDay();
        // THEN
        verify(this.dayRepository).save(any()).neverCalled();
        verify(this.historyRepository).addOrUpdate(any()).neverCalled();
        verify(this.dayItemsRng).setValues(any()).neverCalled();
        verify(this.prevDayIndexRng).setValue(any()).neverCalled();
        verify(this.mealNamesRng).clear().neverCalled();
        verify(this.app).flush().neverCalled();
    }

    shouldLoadMealLoadTheSelectedMealToTheSelectedMealPlace(){
        // GIVEN
        when(this.mockBox).getRng().thenReturn(this.meal1StartRng);
        when(this.meal1StartRng).getRow().thenReturn(15);
        when(this.meal1StartRng).getValue().thenReturn('🥣 Meal');
        when(this.selectedMealItemsRng).getValues().thenReturn([['Item 1', 10], ['Item 2', 20], ['Item 3', 30], ['Item 4', 40]]);
        // WHEN
        this.dayService.loadMeal(this.mockBox.mockObj);
        // THEN
        verify(this.daySpr).setValue('V15', 'Meal').calledOnce();
        verify(this.meal1Rng).setValues([['Item 1', '', 10], ['Item 2', '', 20], ['Item 3', '', 30], ['Item 4', '', 40]]).calledOnce();
    }

    shouldLoadMealDoNotLoadTheSelectedMealIfItsNotAMeal(){
        // GIVEN
        when(this.mockBox).getRng().thenReturn(this.meal1StartRng);
        when(this.meal1StartRng).getValue().thenReturn('Meal');
        // WHEN
        this.dayService.loadMeal(this.mockBox.mockObj);
        // THEN
        verify(this.daySpr).setValue(any()).neverCalled()
        verify(this.meal1Rng).setValues(any()).neverCalled();
    }

    shouldSaveMealSaveSelectedMealToGivenName(){
        // GIVEN
        when(this.saveMealAsRng).getValue().thenReturn('Meal');
        when(this.saveMealFromMealIdRng).getValue().thenReturn(1);
        when(this.meal1Rng).getValues().thenReturn([['Item 1', '', 10], ['', '', 0], ['Item 2', '', 20], ['Item 3', '', 30]]);
        // WHEN
        this.dayService.saveMeal();
        // THEN
        verify(this.mealRepository).saveMeal(new Meal('Meal', [['Item 1', 10], ['Item 2', 20], ['Item 3', 30]])).calledOnce();
        verify(this.saveMealAsRng).clear().calledOnce();
        verify(this.saveMealFromRng).clear().calledOnce();
    }

    shouldSaveMealDoNotSaveSelectedMealIfThereIsNoNameGiven(){
        // GIVEN
        when(this.saveMealAsRng).getValue().thenReturn('');
        // WHEN
        this.dayService.saveMeal();
        // THEN
        verify(this.mealRepository).saveMeal(any()).neverCalled();
        verify(this.saveMealAsRng).clear().neverCalled();
        verify(this.saveMealFromRng).clear().neverCalled();
    }

    shouldCopyMealsCopySelectedMealsToSelectedDays(){
        // GIVEN
        when(this.copyMealFromMealIdsRng).getValue().thenReturn('1,3,5');
        when(this.copyMealToRowsRng).getValue().thenReturn('4,49,79');
        when(this.meal1Rng).getValues().thenReturn([['M1I1', '', 11],['M1I2', '', 12]]);
        when(this.meal3Rng).getValues().thenReturn([['M3I1', '', 31],['M3I2', '', 32]]);
        when(this.meal5Rng).getValues().thenReturn([['M5I1', '', 51],['M5I2', '', 52]]);
        let expectedMap = new Map();
        expectedMap.set('1', [['M1I1',11],['M1I2',12]]);
        expectedMap.set('3', [['M3I1',31],['M3I2',32]]);
        expectedMap.set('5', [['M5I1',51],['M5I2',52]]);
        // WHEN
        this.dayService.copyMeals();
        // THEN
        verify(this.dayRepository).copyMeals(expectedMap, [4, 49, 79]).calledOnce();
        verify(this.copyMealFromRng).clear().calledOnce();
        verify(this.copyMealToRng).clear().calledOnce();
    }

    shouldCopyMealsDoNotCopyMealsIfNoDaysSelected(){
        // GIVEN
        when(this.copyMealFromMealIdsRng).getValue().thenReturn('1,3,5');
        when(this.copyMealToRowsRng).getValue().thenReturn('');
        // WHEN
        this.dayService.copyMeals();
        // THEN
        verify(this.dayRepository).copyMeals(any()).neverCalled();
        verify(this.copyMealFromRng).clear().neverCalled();
        verify(this.copyMealToRng).clear().neverCalled();
    }

    shouldCopyMealsDoNotCopyMealsIfNoMealSelected(){
        // GIVEN
        when(this.copyMealFromMealIdsRng).getValue().thenReturn('');
        when(this.copyMealToRowsRng).getValue().thenReturn('4,49,79');
        // WHEN
        this.dayService.copyMeals();
        // THEN
        verify(this.dayRepository).copyMeals(any()).neverCalled();
        verify(this.copyMealFromRng).clear().neverCalled();
        verify(this.copyMealToRng).clear().neverCalled();
    }
}

var runDayServiceTests = () => new DayServiceTest().runAllTests();