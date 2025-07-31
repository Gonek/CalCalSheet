class DayToolsTest extends TestBaseDay {

    beforeAll(){
        super.beforeAll();
        this.mealsSht = getSht(SHT.MEALS);
        this.daysSht = getSht(SHT.DAYS);
        this.meal1StartRng = getRng(CBOX.MEAL_1_START);
        this.previousDayRng = getRng(RNG.DAY_PREV_DATE);
        this.previousDayIndexRng = getRng(RNG.DAY_PREV_DAY_INDEX);
        this.dayIndexRng = getRng(RNG.DAY_INDEX);
        this.selectedFunctionRng = getRng(RNG.SELECTED_FUNCTION);
        this.selectedFunctionValueRng = getRng(RNG.SELECTED_FUNCTION_VALUE);
        this.selectedFunctionDataRng = getRng(RNG.SELECTED_FUNCTION_DATA);
        this.selectedMealsCbox = getRng(RNG.SELECTED_MEALS);
        this.selectedMealIdsRng = getRng(RNG.SELECTED_MEAL_IDS);
        this.selectedFunctionMealsRng = getRng(RNG.SELECTED_FUNCTION_MEALS);
        this.selectedMealNameRng = getRng(RNG.SELECTED_MEAL_NAME);
        this.selectedMealItemsRng = getRng(RNG.SELECTED_MEAL_ITEMS);
        this.dayNameCbox = getRng(CBOX.DAY_NAME);
        this.saveAsDayBtnF = getRng(BTNF.SAVE_DAY_AS);
        this.loadDayBtnF = getRng(BTNF.LOAD_DAY);
        this.deleteDaysBtnF = getRng(BTNF.DELETE_DAYS);
        this.saveAsMealBtnF = getRng(BTNF.SAVE_AS_MEAL);
        this.copyMealToBtnF = getRng(BTNF.COPY_MEAL_TO);
        this.copyMealFromBtnF = getRng(BTNF.COPY_MEAL_FROM);
        this.deleteMealsBtnF = getRng(BTNF.DELETE_MEALS);
        testData.addTestMeals();
        testData.clearDays();
        testData.addTestCalendarDays();
        testData.addTestTemplateDays();
    }

    afterAll(){
        super.afterAll();
        testData.clearMeals();
        testData.clearDays();
    }

    shouldDaySheetHaveTheCorrectBackroundFormulas(){
        // GIVEN
        let expectedPreviousDay = '=INDEX(Days!A6:A,AH21)';
        let expectedDayIndex = '=IFERROR(-MATCH(DayName, Days!P6:P, 0), IFERROR(MATCH(DATEVALUE(RIGHT(DayName, 10)), Days!A6:A, 0)))';
        let expectedSelectedFunction = '=IFERROR(MATCH("*", {AB2:AB4; AB8:AB10; AB7; AB13}, 0), 0)';
        let expectedSelectedFunctionValue = '=IFERROR(IF(AH23 <> 0, INDEX({AB2:AB4; AC8; AB9:AB10}, AH23), EMPTY()), EMPTY())';
        let expectedSelectedFunctionData = '=IFERROR(CHOOSE(SelectedFunction+1, 0, AF2, AF3, VALUE(AF4), "m", AF9, VALUE(AF10), 0, "m"), "x")';
        let expectedSelectedMealIds = '=IFERROR(JOIN(",", MAP(SPLIT(SelectedMeals, ", ", FALSE), LAMBDA(meal, LEFT(Meal, 1)))), "")';
        let expectedSelectedFunctionMeals = '=IF(AB8<>"", IFERROR(JOIN(",", MAP(SPLIT(AB8, ", ", FALSE), LAMBDA(name, CONCAT("🥣 ", name))))), SUBSTITUTE(AB13, ", ", ","))';
        let expectedSelectedMealName = '=IFERROR(INDEX(ItemNames, MATCH("🥣*",ItemNames,0)), " ")';
        let expectedMealIngredients = '=IFERROR(FILTER(Meals!$C$4:$D, SelectedMealName=Meals!$B$4:$B))';

        // WHEN
        let resultPreviousDay = this.previousDayRng.getFormulas();
        let resultDayIndex = this.dayIndexRng.getFormulas();
        let resultSelectedFunction = this.selectedFunctionRng.getFormulas();
        let resultSelectedFunctionValue = this.selectedFunctionValueRng.getFormulas();
        let resultSelectedFunctionData = this.selectedFunctionDataRng.getFormulas();
        let resultSelectedMealIds = this.selectedMealIdsRng.getFormulas();
        let resultSelectedFunctionMeals = this.selectedFunctionMealsRng.getFormulas();
        let resultSelectedMealName  = this.selectedMealNameRng.getFormulas();
        let resultMealIngredients = this.selectedMealItemsRng.getFormulas();

        // THEN
        assertEquals(resultPreviousDay, expectedPreviousDay);
        assertEquals(resultDayIndex, expectedDayIndex);
        assertEquals(resultSelectedFunction, expectedSelectedFunction);
        assertEquals(resultSelectedFunctionValue, expectedSelectedFunctionValue);
        assertEquals(resultSelectedFunctionData, expectedSelectedFunctionData);
        assertEquals(resultSelectedMealIds, expectedSelectedMealIds);
        assertEquals(resultSelectedFunctionMeals, expectedSelectedFunctionMeals);
        assertEquals(resultSelectedMealName, expectedSelectedMealName);
        assertEquals(resultMealIngredients[0][0], expectedMealIngredients);
    }

    shouldDaySheetToolsHaveCorrectButtonWithFieldDataFormulas(){
        // GIVEN
        let expectedSaveAsDay = '=IFERROR(-MATCH(AB2, Days!P6:P, 0))';
        let expectedLoadDay = '=IFERROR(-MATCH(AB3, Days!P6:P, 0))';
        let expectedDeleteDays = '=IFERROR(JOIN(",", MAP(SPLIT(AB4, ", ", FALSE), LAMBDA(template, -MATCH(template, Days!P6:P, 0)))))';
        let expectedCopyFrom = '=IFERROR(-MATCH(AB9, Days!P6:P, 0), IFERROR(MATCH(DATEVALUE(RIGHT(AB9, 10)), Days!A6:A, 0)))';
        let expectedCopyTo = '=IFERROR(JOIN(",", MAP(SPLIT(AB10, ", ", FALSE), LAMBDA(day, IFERROR(-MATCH(day, Days!P6:P, 0), IFERROR(MATCH(DATEVALUE(RIGHT(day, 10)), Days!A6:A, 0)))))))';
        // WHEN
        let resultSaveAsDay = this.saveAsDayBtnF.getFormulas();
        let resultLoadDay = this.loadDayBtnF.getFormulas();
        let resultDeletDays = this.deleteDaysBtnF.getFormulas();
        let resultCopyFrom = this.copyMealFromBtnF.getFormulas();
        let resultCopyTo = this.copyMealToBtnF.getFormulas();
        // THEN
        assertEquals(resultSaveAsDay[0][4], expectedSaveAsDay);
        assertEquals(resultLoadDay[0][4], expectedLoadDay);
        assertEquals(resultDeletDays[0][4], expectedDeleteDays);
        assertEquals(resultCopyFrom[0][4], expectedCopyFrom);
        assertEquals(resultCopyTo[0][4], expectedCopyTo);
    }

    shouldDaySheetPreviewHaveCorrectFormulas(){
        // GIVEN
        let expectedHeader = '=CHOOSE(SelectedFunction+1, Texts!B67, IF(AF2 <> 0, Texts!B68, Texts!B69), Texts!B70, Texts!B71, Texts!B72, Texts!B73, Texts!B74, Texts!B75, Texts!B76)';
        let expectedDate = '=SelectedFunctionValue';
        let expectedMealNames = ['=IF(OR(AND(AA17 <> "", SelectedFunction = 4), SelectedFunction = 8), IFERROR(INDEX(SPLIT(SelectedFunctionMeals, ","), 1, 1), IF(SelectedFunction = 4, "! MISSING NAME !", EMPTY())), EMPTY())',
                                 '=IF(OR(AND(AA32 <> "", SelectedFunction = 4), SelectedFunction = 8), IFERROR(INDEX(SPLIT(SelectedFunctionMeals, ","), 1, COUNTA($Z$17:$Z46)), IF(SelectedFunction = 4, "! MISSING NAME !", EMPTY())), EMPTY())',
                                 '=IF(OR(AND(AA47 <> "", SelectedFunction = 4), SelectedFunction = 8), IFERROR(INDEX(SPLIT(SelectedFunctionMeals, ","), 1, COUNTA($Z$17:$Z61)), IF(SelectedFunction = 4, "! MISSING NAME !", EMPTY())), EMPTY())',
                                 '=IF(OR(AND(AA62 <> "", SelectedFunction = 4), SelectedFunction = 8), IFERROR(INDEX(SPLIT(SelectedFunctionMeals, ","), 1, COUNTA($Z$17:$Z76)), IF(SelectedFunction = 4, "! MISSING NAME !", EMPTY())), EMPTY())',
                                 '=IF(OR(AND(AA77 <> "", SelectedFunction = 4), SelectedFunction = 8), IFERROR(INDEX(SPLIT(SelectedFunctionMeals, ","), 1, COUNTA($Z$17:$Z91)), IF(SelectedFunction = 4, "! MISSING NAME !", EMPTY())), EMPTY())',
                                 '=IF(OR(AND(AA92 <> "", SelectedFunction = 4), SelectedFunction = 8), IFERROR(INDEX(SPLIT(SelectedFunctionMeals, ","), 1, COUNTA($Z$17:$Z106)), IF(SelectedFunction = 4, "! MISSING NAME !", EMPTY())), EMPTY())'];
        let expectedDirections = ['=FUNCTION_DIRECTION("1")', '=FUNCTION_DIRECTION("2")', '=FUNCTION_DIRECTION("3")', '=FUNCTION_DIRECTION("4")', '=FUNCTION_DIRECTION("5")', '=FUNCTION_DIRECTION("6")'];
        let expectedItems = ['=GET_MEAL_DATA(1, Texts!B77)', '=GET_MEAL_DATA(2, Texts!B77)', '=GET_MEAL_DATA(3, Texts!B77)', '=GET_MEAL_DATA(4, Texts!B77)', '=GET_MEAL_DATA(5, Texts!B77)', '=GET_MEAL_DATA(6, Texts!B77)'];
        // WHEN
        let resultHeader = this.daySht.getFormulas('AA14');
        let resultDate = this.daySht.getFormulas('AA16');
        let resultMealNames = clearAll(this.daySht.getFormulas('Z17:Z106'));
        let resultDirections = clearAll(this.daySht.getFormulas('AA17:AA106'));
        let resultItems = clearAll(this.daySht.getFormulas('AB17:AB106'));
        // THEN
        assertEquals(resultHeader, expectedHeader);
        assertEquals(resultDate, expectedDate);
        assertEquals(resultMealNames, expectedMealNames);
        assertEquals(resultDirections, expectedDirections);
        assertEquals(resultItems, expectedItems);
    }

    shouldDaySheetToolsHaveCorrectButtonWithFieldDataValidations(){
        // GIVEN
        let expectedLoadDays = ['PROTOTYPE', 'All 1 Day', 'Boring Day'];
        let expectedDeleteDays = ['All 1 Day', 'Boring Day'];
        let expcetedSelectMeals = ['1. Breakfast', '2. Snack', '3. Lunch', '4. Snack', '5. Dinner', '6. Supper'];
        let expcetedAllDays = ['PROTOTYPE', 'All 1 Day', 'Boring Day', getFormatedDay(-2), getFormatedDay(-1), 
                              getFormatedDay(0), getFormatedDay(+1), getFormatedDay(+2)];
        let expcetedDeleteMeals = ['🥣 Meal0', '🥣 Meal1', '🥣 Meal2'];
        // WHEN
        let resultDayName = this.dayNameCbox.getValidationCriteriaRangeValues();
        let resultLoadDay = this.loadDayBtnF.getValidationCriteriaRangeValues();
        let resultDeleteDays = this.deleteDaysBtnF.getValidationCriteriaRangeValues();
        let resultSelectedMeals = this.selectedMealsCbox.getValidationCriteriaRangeValues();
        let resultCopyFrom = this.copyMealFromBtnF.getValidationCriteriaRangeValues();
        let resultCopyTo = this.copyMealToBtnF.getValidationCriteriaRangeValues();
        let resultDeleteMeals = this.deleteMealsBtnF.getValidationCriteriaRangeValues();
        // THEN
        assertEquals(resultDayName, expcetedAllDays);
        assertEquals(resultLoadDay, expectedLoadDays);
        assertEquals(resultDeleteDays, expectedDeleteDays);
        assertEquals(resultSelectedMeals, expcetedSelectMeals);
        assertEquals(resultCopyFrom, expcetedAllDays);
        assertEquals(resultCopyTo, expcetedAllDays);
        assertEquals(resultDeleteMeals, expcetedDeleteMeals);
    }

    shouldDaySheetLoadAllSavedMealsAndItemsInTheFirstItemSelectorInEveryMeal(){
        //GIVEN
        let expected = [`${MEAL_ICON} Meal0`, `${MEAL_ICON} Meal1`, `${MEAL_ICON} Meal2`,
        '1 First', '2 Second', '3 Third', 'All 100', 'All 1', 'All Green', 'Green', 'Max cal', 'Red', 'Test 100g', 'Test 1 serving', 'Yellow', 'Zero cal', 'ZZ Last'];
        //WHEN
        let result1 = this.daySht.getValidationCriteriaRangeValues('C17');
        let result2 = this.daySht.getValidationCriteriaRangeValues('C32');
        let result3 = this.daySht.getValidationCriteriaRangeValues('C47');
        let result4 = this.daySht.getValidationCriteriaRangeValues('C62');
        let result5 = this.daySht.getValidationCriteriaRangeValues('C77');
        let result6 = this.daySht.getValidationCriteriaRangeValues('C92');
        //THEN
        assertEquals(result1, expected);
        assertEquals(result2, expected);
        assertEquals(result3, expected);
        assertEquals(result4, expected);
        assertEquals(result5, expected);
        assertEquals(result6, expected);
    }

    shouldDaySheetLoadMealNameOfSelectedMealInBackground(){
        //GIVEN
        let expected = `${MEAL_ICON} Meal1`;
        //WHEN
        this.meal1StartRng.setValue(`${MEAL_ICON} Meal1`);
        let result = this.selectedMealNameRng.getValue();
        //THEN
        assertEquals(result, expected);
    }

    shouldDaySheetLoadAllItemsOfSelectedMealInBackground(){
        //GIVEN
        let expected = [
          ['1 First', 10],
          ['2 Second', 20],
          ['3 Third', 30],
          ['ZZ Last', 99],
          ['1 First', 110],
          ['2 Second', 120],
          ['3 Third', 130],
          ['ZZ Last', 199],
          ['1 First', 210],
          ['2 Second', 220],
          ['3 Third', 230],
          ['ZZ Last', 299],
          ['1 First', 310],
          ['2 Second', 320],
          ['3 Third', 330]
        ];
        //WHEN
        this.meal1StartRng.setValue(`${MEAL_ICON} Meal1`);
        let result = this.selectedMealItemsRng.getValues();
        //THEN
        assertEquals(result, expected);
    }

    shouldDaySheetMealBackgroundItemsStayEmptyIfNoMealSelectedInBackground(){
        //GIVEN WHEN
        this.meal1StartRng.setValue(`Green`);
        let result = this.selectedMealItemsRng.getValues();
        //THEN
        assertArrayEmpty(result);
    }

    shouldDaySheetWhenSaveAsDayFilledWithNewDayShowEmptyPreviewAccording(){
        // GIVEN
        let expectedIndex = '';
        let expectedPreviewHeader = 'Save day as';
        let expectedPreviewDate = 'New day';
        let expectedPreviewMealNames = ['', '', '', '', '', ''];
        let expectedPreviewItems = ['', '', '', '', '', ''];
        let expectedPreviewDirection = ['⬇  ⬇  ⬇  ⬇  ⬇  ⬇','⬇  ⬇  ⬇  ⬇  ⬇  ⬇','⬇  ⬇  ⬇  ⬇  ⬇  ⬇','⬇  ⬇  ⬇  ⬇  ⬇  ⬇','⬇  ⬇  ⬇  ⬇  ⬇  ⬇','⬇  ⬇  ⬇  ⬇  ⬇  ⬇'];

        // WHEN
        this.saveAsDayBtnF.setValue('New day');
        let resultIndex = this.saveAsDayBtnF.getValue(1, 5);

        // THEN
        assertEquals(resultIndex, expectedIndex);
        this.assertPreview(expectedPreviewHeader, expectedPreviewDate, expectedPreviewMealNames, expectedPreviewDirection, expectedPreviewItems);
        // RESET
        this.saveAsDayBtnF.setValue('');
    }

    shouldDaySheetWhenSaveAsDayFilledWithExistingDayShowExistingPreviewAccording(){
        // GIVEN
        let expectedIndex = '-31';
        let expectedPreviewHeader = 'Update day';
        let expectedPreviewDate = 'Boring Day';
        let expectedPreviewMealNames = ['', '', '', '', '', ''];
        let expectedPreviewItems = [Array(15).fill(['Green', 10, 'g']), 
                                    Array(15).fill(['Yellow', 20, 'g']),
                                    Array(15).fill(['Red', 30, 'g']),
                                    Array(15).fill(['Green', 40, 'g']),
                                    Array(15).fill(['Yellow', 50, 'g']),
                                    Array(15).fill(['Red', 60, 'g'])];
        let expectedPreviewDirection = ['⬇  ⬇  ⬇  ⬇  ⬇  ⬇','⬇  ⬇  ⬇  ⬇  ⬇  ⬇','⬇  ⬇  ⬇  ⬇  ⬇  ⬇','⬇  ⬇  ⬇  ⬇  ⬇  ⬇','⬇  ⬇  ⬇  ⬇  ⬇  ⬇','⬇  ⬇  ⬇  ⬇  ⬇  ⬇'];

        // WHEN
        this.saveAsDayBtnF.setValue('Boring Day');
        let resultIndex = this.saveAsDayBtnF.getValue(1, 5);

        // THEN
        assertEquals(resultIndex, expectedIndex);
        this.assertPreview(expectedPreviewHeader, expectedPreviewDate, expectedPreviewMealNames, expectedPreviewDirection, expectedPreviewItems);
        // RESET
        this.saveAsDayBtnF.setValue('');
    }

    shouldDaySheetWhenLoadDayFilledShowDayPreviewAccording(){
        // GIVEN
        let expectedIndex = '-16';
        let expectedPreviewHeader = 'Load day from';
        let expectedPreviewDate = 'All 1 Day';
        let expectedPreviewMealNames = ['', '', '', '', '', ''];
        let expectedPreviewItems = Array(90).fill(['All 1', 1, 'g']);
        let expectedPreviewDirection = ['⬆  ⬆  ⬆  ⬆  ⬆  ⬆','⬆  ⬆  ⬆  ⬆  ⬆  ⬆','⬆  ⬆  ⬆  ⬆  ⬆  ⬆','⬆  ⬆  ⬆  ⬆  ⬆  ⬆','⬆  ⬆  ⬆  ⬆  ⬆  ⬆','⬆  ⬆  ⬆  ⬆  ⬆  ⬆'];

        // WHEN
        this.loadDayBtnF.setValue('All 1 Day');
        let resultIndex = this.loadDayBtnF.getValue(1, 5);

        // THEN
        assertEquals(resultIndex, expectedIndex);
        this.assertPreview(expectedPreviewHeader, expectedPreviewDate, expectedPreviewMealNames, expectedPreviewDirection, expectedPreviewItems);
        // RESET
        this.loadDayBtnF.setValue('');
    }

    shouldDaySheetWhenDeleteDaysFilledWithOneDayShowDayPreviewAccording(){
        // GIVEN
        let expectedIndexes = '-16';
        let expectedPreviewHeader = 'Delete days';
        let expectedPreviewDate = 'All 1 Day';
        let expectedPreviewMealNames = ['', '', '', '', '', ''];
        let expectedPreviewItems = Array(90).fill(['All 1', 1, 'g']);
        let expectedPreviewDirection = ['🞬  🞬  🞬  🞬','🞬  🞬  🞬  🞬','🞬  🞬  🞬  🞬','🞬  🞬  🞬  🞬','🞬  🞬  🞬  🞬','🞬  🞬  🞬  🞬'];

        // WHEN
        this.deleteDaysBtnF.setValue('All 1 Day');
        let resultIndexes = this.deleteDaysBtnF.getValue(1, 5);

        // THEN
        assertEquals(resultIndexes, expectedIndexes);
        this.assertPreview(expectedPreviewHeader, expectedPreviewDate, expectedPreviewMealNames, expectedPreviewDirection, expectedPreviewItems);
        // RESET
        this.deleteDaysBtnF.setValue('');
    }

    shouldDaySheetWhenDeleteDaysFilledWithMulitpleDaysShowPreviewAccording(){
        // GIVEN
        let expectedIndexes = '-16,-31';
        let expectedPreviewHeader = 'Delete days';
        let expectedPreviewDate = 'All 1 Day, Boring Day';
        let expectedPreviewMealNames = ['', '', '', '', '', ''];
        let expectedPreviewItems = Array(6).fill('.... Multiple days selected ....');
        let expectedPreviewDirection = ['🞬  🞬  🞬  🞬','🞬  🞬  🞬  🞬','🞬  🞬  🞬  🞬','🞬  🞬  🞬  🞬','🞬  🞬  🞬  🞬','🞬  🞬  🞬  🞬'];

        // WHEN
        this.deleteDaysBtnF.setValue('All 1 Day, Boring Day');
        let resultIndexes = this.deleteDaysBtnF.getValue(1, 5);

        // THEN
        assertEquals(resultIndexes, expectedIndexes);
        this.assertPreview(expectedPreviewHeader, expectedPreviewDate, expectedPreviewMealNames, expectedPreviewDirection, expectedPreviewItems);
        // RESET
        this.deleteDaysBtnF.setValue('');
    }
    
    shouldDaySheetCalculateSelectedMealIndexesCorrectly(){
        // GIVEN
        let expectedSelectedMealIndexes = '1,2,3';
        this.selectedMealsCbox.setValue('1. Breakfast, 2. Snack, 3. Lunch');

        // WHEN
        let resultSelectedMealIndexes = this.selectedMealIdsRng.getValue();

        // THEN
        assertEquals(resultSelectedMealIndexes, expectedSelectedMealIndexes);
        // RESET
        this.selectedMealsCbox.setValue('');
    }

    shouldDaySheetWhenSaveMealsAsFilledWithNewMealsShowEmptyPreviewAccording(){
        // GIVEN
        let expectedPreviewHeader = 'Save / update meals as';
        let expectedPreviewDate = '';
        let expectedPreviewMealNames = ['🥣 New meal', '', '🥣 New Lunch', '', '', ''];
        let expectedPreviewItems = ['', '', '', '', '', ''];
        let expectedPreviewDirection = ['⬇  ⬇  ⬇  ⬇  ⬇  ⬇','','⬇  ⬇  ⬇  ⬇  ⬇  ⬇','','',''];

        // WHEN
        this.selectedMealsCbox.setValue('1. Breakfast, 3. Lunch');
        this.saveAsMealBtnF.setValue('New meal, New Lunch');

        // THEN
        this.assertPreview(expectedPreviewHeader, expectedPreviewDate, expectedPreviewMealNames, expectedPreviewDirection, expectedPreviewItems);
        // RESET
        this.selectedMealsCbox.setValue('');
        this.saveAsMealBtnF.setValue('');
    }

    shouldDaySheetWhenSaveMealsAsFilledWithLessNewMealsThenMealsSelectedShowErrorAndEmptyPreviewAccording(){
        // GIVEN
        let expectedPreviewHeader = 'Save / update meals as';
        let expectedPreviewDate = '';
        let expectedPreviewMealNames = ['🥣 New meal', '', '! MISSING NAME !', '! MISSING NAME !', '', ''];
        let expectedPreviewItems = ['', '', '', '', '', ''];
        let expectedPreviewDirection = ['⬇  ⬇  ⬇  ⬇  ⬇  ⬇','','⬇  ⬇  ⬇  ⬇  ⬇  ⬇','⬇  ⬇  ⬇  ⬇  ⬇  ⬇','',''];

        // WHEN
        this.selectedMealsCbox.setValue('1. Breakfast, 3. Lunch, 4. Snack');
        this.saveAsMealBtnF.setValue('New meal');

        // THEN
        this.assertPreview(expectedPreviewHeader, expectedPreviewDate, expectedPreviewMealNames, expectedPreviewDirection, expectedPreviewItems);
        // RESET
        this.selectedMealsCbox.setValue('');
        this.saveAsMealBtnF.setValue('');
    }

    shouldDaySheetWhenSaveMealsAsFilledWithMoreNewMealsThenMealsSelectedIgnoreAdditinalsAndEmptyPreviewAccording(){
        // GIVEN
        let expectedPreviewHeader = 'Save / update meals as';
        let expectedPreviewDate = '';
        let expectedPreviewMealNames = ['🥣 New meal', '', '', '', '', ''];
        let expectedPreviewItems = ['', '', '', '', '', ''];
        let expectedPreviewDirection = ['⬇  ⬇  ⬇  ⬇  ⬇  ⬇','','','','',''];

        // WHEN
        this.selectedMealsCbox.setValue('1. Breakfast');
        this.saveAsMealBtnF.setValue('New meal, Another name, Cool name, Nice Meal');

        // THEN
        this.assertPreview(expectedPreviewHeader, expectedPreviewDate, expectedPreviewMealNames, expectedPreviewDirection, expectedPreviewItems);
        // RESET
        this.selectedMealsCbox.setValue('');
        this.saveAsMealBtnF.setValue('');
    }

    shouldDaySheetWhenSaveMealsAsFilledWithExistingMealsShowMealPreviewsAccording(){
        // GIVEN
        let expectedPreviewHeader = 'Save / update meals as';
        let expectedPreviewDate = '';
        let expectedPreviewMealNames = ['', '', '🥣 Meal2', '', '🥣 Meal0', ''];
        let expectedPreviewItems = ['', '', [['Max cal', 100, 'g'], ['Zero cal', 500, 'g'], ['All Green', 256, 'g']], '', [['Test 100g', 150, 'g'], ['Test 100g', 10, 'g']], ''];
        let expectedPreviewDirection = ['','','⬇  ⬇  ⬇  ⬇  ⬇  ⬇','','⬇  ⬇  ⬇  ⬇  ⬇  ⬇',''];

        // WHEN
        this.selectedMealsCbox.setValue('3. Lunch, 5. Dinner');
        this.saveAsMealBtnF.setValue('Meal2, Meal0');

        // THEN
        this.assertPreview(expectedPreviewHeader, expectedPreviewDate, expectedPreviewMealNames, expectedPreviewDirection, expectedPreviewItems);
        // RESET
        this.selectedMealsCbox.setValue('');
        this.saveAsMealBtnF.setValue('');
    }

    shouldDaySheetWhenSaveMealsAsFilledWithExistingAndNewMealsShowMealPreviewsAccording(){
        // GIVEN
        let expectedPreviewHeader = 'Save / update meals as';
        let expectedPreviewDate = '';
        let expectedPreviewMealNames = ['', '🥣 New meal', '', '', '', '🥣 Meal2'];
        let expectedPreviewItems = ['', '', '', '', '', [['Max cal', 100, 'g'], ['Zero cal', 500, 'g'], ['All Green', 256, 'g']]];
        let expectedPreviewDirection = ['','⬇  ⬇  ⬇  ⬇  ⬇  ⬇','','','','⬇  ⬇  ⬇  ⬇  ⬇  ⬇'];

        // WHEN
        this.selectedMealsCbox.setValue('2. Snack, 6. Supper');
        this.saveAsMealBtnF.setValue('New meal, Meal2');

        // THEN
        this.assertPreview(expectedPreviewHeader, expectedPreviewDate, expectedPreviewMealNames, expectedPreviewDirection, expectedPreviewItems);
        // RESET
        this.selectedMealsCbox.setValue('');
        this.saveAsMealBtnF.setValue('');
    }

    shouldDaySheetWhenCopyFromDayFilledShowTheSelectedTemplateDayInPreview(){
        // GIVEN
        let expectedIndex = -16;
        let expectedPreviewHeader = 'Copy meals from day';
        let expectedPreviewDate = 'All 1 Day';
        let expectedPreviewMealNames = ['', '', '', '', '', ''];
        let expectedPreviewItems = Array(90).fill(['All 1', 1, 'g']);
        let expectedPreviewDirection = ['⬆  ⬆  ⬆  ⬆  ⬆  ⬆','⬆  ⬆  ⬆  ⬆  ⬆  ⬆','⬆  ⬆  ⬆  ⬆  ⬆  ⬆','','',''];

        // WHEN
        this.selectedMealsCbox.setValue('1. Breakfast, 2. Snack, 3. Lunch');
        this.copyMealFromBtnF.setValue('All 1 Day');
        let resultIndex = this.copyMealFromBtnF.getValue(1,5);

        // THEN
        assertEquals(resultIndex, expectedIndex);
        this.assertPreview(expectedPreviewHeader, expectedPreviewDate, expectedPreviewMealNames, expectedPreviewDirection, expectedPreviewItems);
        // RESET
        this.selectedMealsCbox.setValue('');
        this.copyMealFromBtnF.setValue('');
    }

    shouldDaySheetWhenCopyFromDayFilledShowTheSelectedCalendarDayInPreview(){
        // GIVEN
        let expectedIndex = 16;
        let expectedPreviewHeader = 'Copy meals from day';
        let expectedPreviewDate = getFormatedDay(-1);
        let expectedPreviewMealNames = ['', '', '', '', '', ''];
        let expectedPreviewItems = Array.from({length:90},(v,i)=> ['All 1', i+1, 'g']);
        let expectedPreviewDirection = ['','','','','','⬆  ⬆  ⬆  ⬆  ⬆  ⬆'];

        // WHEN
        this.selectedMealsCbox.setValue('6. Supper');
        this.copyMealFromBtnF.setValue(getFormatedDay(-1));
        let resultIndex = this.copyMealFromBtnF.getValue(1,5);

        // THEN
        assertEquals(resultIndex, expectedIndex);
        this.assertPreview(expectedPreviewHeader, expectedPreviewDate, expectedPreviewMealNames, expectedPreviewDirection, expectedPreviewItems);
        // RESET
        this.selectedMealsCbox.setValue('');
        this.copyMealFromBtnF.setValue('');
    }

    shouldDaySheetWhenCopyToDaysFilledShowTheSelectedTemplateDayInPreview(){
        // GIVEN
        let expectedIndex = -16;
        let expectedPreviewHeader = 'Copy meals to days';
        let expectedPreviewDate = 'All 1 Day';
        let expectedPreviewMealNames = ['', '', '', '', '', ''];
        let expectedPreviewItems = Array(90).fill(['All 1', 1, 'g']);
        let expectedPreviewDirection = ['⬇  ⬇  ⬇  ⬇  ⬇  ⬇','⬇  ⬇  ⬇  ⬇  ⬇  ⬇','⬇  ⬇  ⬇  ⬇  ⬇  ⬇','','',''];

        // WHEN
        this.selectedMealsCbox.setValue('1. Breakfast, 2. Snack, 3. Lunch');
        this.copyMealToBtnF.setValue('All 1 Day');
        let resultIndex = this.copyMealToBtnF.getValue(1,5);

        // THEN
        assertEquals(resultIndex, expectedIndex);
        this.assertPreview(expectedPreviewHeader, expectedPreviewDate, expectedPreviewMealNames, expectedPreviewDirection, expectedPreviewItems);
        // RESET
        this.selectedMealsCbox.setValue('');
        this.copyMealToBtnF.setValue('');
    }

    shouldDaySheetWhenCopyToDaysFilledShowTheSelectedCalendarDayInPreview(){
        // GIVEN
        let expectedIndex = 1;
        let expectedPreviewHeader = 'Copy meals to days';
        let expectedPreviewDate = getFormatedDay(-2);
        let expectedPreviewMealNames = ['', '', '', '', '', ''];
        let expectedPreviewItems = Array(90).fill(['All 1', 1, 'g']);
        let expectedPreviewDirection = ['⬇  ⬇  ⬇  ⬇  ⬇  ⬇','','','','',''];

        // WHEN
        this.selectedMealsCbox.setValue('1. Breakfast');
        this.copyMealToBtnF.setValue(getFormatedDay(-2));
        let resultIndex = this.copyMealToBtnF.getValue(1,5);

        // THEN
        assertEquals(resultIndex, expectedIndex);
        this.assertPreview(expectedPreviewHeader, expectedPreviewDate, expectedPreviewMealNames, expectedPreviewDirection, expectedPreviewItems);
        // RESET
        this.selectedMealsCbox.setValue('');
        this.copyMealToBtnF.setValue('');
    }

    shouldDaySheetWhenCopyToDaysFilledWithMultipleDaysShowPreviewAccording(){
        // GIVEN
        let expectedIndexes = "-16,1";
        let expectedPreviewHeader = 'Copy meals to days';
        let expectedPreviewDate = `All 1 Day, ${getFormatedDay(-2)}`;
        let expectedPreviewMealNames = ['', '', '', '', '', ''];
        let expectedPreviewItems = Array(6).fill('.... Multiple days selected ....');
        let expectedPreviewDirection = ['','⬇  ⬇  ⬇  ⬇  ⬇  ⬇','⬇  ⬇  ⬇  ⬇  ⬇  ⬇','⬇  ⬇  ⬇  ⬇  ⬇  ⬇','',''];

        // WHEN
        this.selectedMealsCbox.setValue('2. Snack, 3. Lunch, 4. Snack');
        this.copyMealToBtnF.setValue(`All 1 Day, ${getFormatedDay(-2)}`);
        let resultIndexes = this.copyMealToBtnF.getValue(1,5);

        // THEN
        assertEquals(resultIndexes, expectedIndexes);
        this.assertPreview(expectedPreviewHeader, expectedPreviewDate, expectedPreviewMealNames, expectedPreviewDirection, expectedPreviewItems);
        // RESET
        this.selectedMealsCbox.setValue('');
        this.copyMealToBtnF.setValue('');
    }

    shouldDaySheetWhenDeleteMealsAsFilledWithExistingMealsShowMealPreviewsAccording(){
        // GIVEN
        let expectedPreviewHeader = 'Delete meals';
        let expectedPreviewDate = '';
        let expectedPreviewMealNames = ['🥣 Meal2', '🥣 Meal0', '', '', '', ''];
        let expectedPreviewItems = [[['Max cal', 100, 'g'], ['Zero cal', 500, 'g'], ['All Green', 256, 'g']], [['Test 100g', 150, 'g'], ['Test 100g', 10, 'g']], '', '', '', ''];
        let expectedPreviewDirection = ['🞬  🞬  🞬  🞬','🞬  🞬  🞬  🞬','🞬  🞬  🞬  🞬','🞬  🞬  🞬  🞬','🞬  🞬  🞬  🞬','🞬  🞬  🞬  🞬'];

        // WHEN
        this.deleteMealsBtnF.setValue('🥣 Meal2, 🥣 Meal0');

        // THEN
        this.assertPreview(expectedPreviewHeader, expectedPreviewDate, expectedPreviewMealNames, expectedPreviewDirection, expectedPreviewItems);
        // RESET
        this.deleteMealsBtnF.setValue('');
    }

    // OTHER

    assertPreview(expectedPreviewHeader, expectedPreviewDate, expectedPreviewMealNames, expectedPreviewDirection, expectedPreviewItems){
        let resultPreviewHeader = this.daySht.getValue('AA14');
        let resultPreviewDate = this.daySht.getValue('AA16');
        let resultPreviewMealNames = [this.daySht.getValue('Z17'), this.daySht.getValues('Z32'), this.daySht.getValues('Z47'),
                                      this.daySht.getValue('Z62'), this.daySht.getValues('Z77'), this.daySht.getValues('Z92')];
        let resultPreviewDirections = [this.daySht.getValue('AA17'), this.daySht.getValues('AA32'), this.daySht.getValues('AA47'),
                                       this.daySht.getValue('AA62'), this.daySht.getValues('AA77'), this.daySht.getValues('AA92')]
        let resultPreviewItems = [clearAll(this.daySht.getValues('AB17:AE31')), clearAll(this.daySht.getValues('AB32:AE46')), clearAll(this.daySht.getValues('AB47:AE61')),
                                  clearAll(this.daySht.getValues('AB62:AE76')), clearAll(this.daySht.getValues('AB77:AE91')), clearAll(this.daySht.getValues('AB92:AE106'))];

        assertEquals(resultPreviewHeader, expectedPreviewHeader);
        assertEquals(resultPreviewDate, expectedPreviewDate);
        assertEquals(resultPreviewMealNames, expectedPreviewMealNames);
        assertEquals(resultPreviewDirections, expectedPreviewDirection);
        assertEquals(resultPreviewItems, expectedPreviewItems);
    }

}

var runDayMealTests = () => new DayMealTest().runAllTests();