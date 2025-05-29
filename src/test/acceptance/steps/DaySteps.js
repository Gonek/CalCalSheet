class DayGivenSteps extends Steps{

    test_items_available(){
        this.test.utils.addTestIems();
    }

    test_days_available(){
        this.test.utils.addTestDays();
    }

    test_profiles_available(){
        this.test.utils.addTestProfiles();
    }

    test_meals_available(){
        this.test.utils.addTestMeals();
    }
    
    previous_day_set_to(to){
        getRng(RNG.DAY_PREV_DAY_INDEX).setValue((to * 15) + 1);
    }

    day_filled_with_items(){
        getRng(RNG.MEAL1).setValuesWithResize([['1 First', '', 50], ['All 100', '', 100], ['All Green', '', 1000], ['', '', ''], ['', '', ''], ['Yellow', '',  50]]);
        getRng(RNG.MEAL2).setValuesWithResize([['2 Second', '', 85], ['All 1', '', 25], ['Test 1 serving', '', 2], ['Test 100g', '', 200]]);
        getRng(RNG.MEAL3).setValuesWithResize([['3 Third', '', 100], ['Yellow', '', 110], ['Zero cal', '', 2500], ['Green', '', 10], 
                                               ['Green', '', 11], ['Green', '', 12], ['Green', '', 13], ['Green', '', 14], 
                                               ['Green', '', 15], ['Green', '', 16], ['Green', '', 17], ['Green', '', 18], 
                                               ['Green', '', 19], ['Green', '', 20], ['Green', '', 21]]);
        getRng(RNG.MEAL4).setValuesWithResize([['1 First', '', 20], ['Yellow', '', 1000]]);
        getRng(RNG.MEAL5).setValuesWithResize([]);
        getRng(RNG.MEAL6).setValuesWithResize([['ZZ Last', '', 225], ['Max cal', '', 10], ['Red', '', 55]]);
    }

    calorie_output_set_to(calorieOutput){
        getRng(RNG.CALORIE_OUTPUT).setValue(calorieOutput);
    }

    profile_set_to(profile){
        getRng(RNG.SELECTED_PROFILE).setValue(profile);
    }

    copy_from_as(meals){
        let rng = getRng(RNG.COPY_MEAL_FROM);
        let values = rng.getValidationCriteriaRangeValues().filter((a, i) => meals.includes(i+1)).join(', ');
        rng.setValue(values);
    }

    copy_to_as(to){
        this.changeCboxToIndex(SPR.DAY, RNG.COPY_MEAL_TO, to);
    }

    save_from_as_meal_no_(to){
        this.changeCboxToIndex(SPR.DAY, RNG.SAVE_MEAL_FROM, to -1);
    }

    save_as_as(name){
        getRng(RNG.SAVE_MEAL_AS).setValue(name);
    }
}

class DayWhenSteps extends Steps{

    day_changed(to){
        this.changeCboxToIndex(SPR.DAY, CBOX.DAY_NAME, to);
    }

    meal_selected_in_meal_no_(mealNumber, mealSelected){
        this.changeCbox(SPR.DAY, `Meal${mealNumber}Start`, mealSelected);
    }

    copy_meal_clicked(){
        this.clickButton(SPR.DAY, BTN.COPY_MEALS);
    }

    save_meal_clicked(){
        this.clickButton(SPR.DAY, BTN.SAVE_MEAL);
    }  
}

class DayThenSteps extends Steps{

    items_of_day_loaded(expected){
        let result = getRng(RNG.DAY_ITEMS).getValues();
        this.test.assertEqualsArray(result, expected);
    }

    output_calories_loaded(expected){
       let result = getRng(RNG.CALORIE_OUTPUT).getValue();
       this.test.assertEquals(result, expected);
    }

    profile_loaded(expected){
       let result = getRng(RNG.SELECTED_PROFILE).getValue();
       this.test.assertEquals(result, expected);
    }

    meal_loaded_to_meal_no_(mealNumber, expected){
        let result = getRng(`Meal${mealNumber}`).getValues();
        this.test.assertEqualsArray(result, expected)
    }

    previous_day_saved(to){
        this.previousDayItems = getSpr(SPR.DAYS).getAreaValue(4 + (to * 15), 2, 15, 12);
        this.previousDayData = getSpr(SPR.DAYS).getAreaValue(4 + (to * 15), 14, 15, 1);
        this.test.assertTrue(this.previousDayItems);
        this.test.assertTrue(this.previousDayData);
    }

    saved_with_test_items(){
        this.test.assertEqualsArray(this.previousDayItems,
            [['1 First', 50,     '2 Second', 85,      '3 Third', 100,   '1 First', 20,  '', '',     'ZZ Last', 225], 
             ['All 100', 100,    'All 1', 25,         'Yellow', 110,    'Yellow', 1000, '', '',     'Max cal', 10],  
             ['All Green', 1000, 'Test 1 serving', 2, 'Zero cal', 2500, '', '',         '', '',     'Red', 55],
             ['', '',            'Test 100g',200,     'Green', 10,      '', '',         '', '',     '', ''],
             ['', '',            '', '',              'Green', 11,      '', '',         '', '',     '', ''],
             ['Yellow', 50,      '', '',              'Green', 12,      '', '',         '', '',     '', ''],
             ['', '',            '', '',              'Green', 13,      '', '',         '', '',     '', ''],
             ['', '',            '', '',              'Green', 14,      '', '',         '', '',     '', ''],
             ['', '',            '', '',              'Green', 15,      '', '',         '', '',     '', ''],
             ['', '',            '', '',              'Green', 16,      '', '',         '', '',     '', ''],
             ['', '',            '', '',              'Green', 17,      '', '',         '', '',     '', ''],
             ['', '',            '', '',              'Green', 18,      '', '',         '', '',     '', ''],
             ['', '',            '', '',              'Green', 19,      '', '',         '', '',     '', ''],
             ['', '',            '', '',              'Green', 20,      '', '',         '', '',     '', ''],
             ['', '',            '', '',              'Green', 21,      '', '',         '', '',     '', '']]);
    }

    saved_with_calorie_output(expected){
        this.test.assertEquals(this.previousDayData[0], expected);
    }

    saved_with_profile(expected){
        this.test.assertEquals(this.previousDayData[1], expected);
    }

    history_saved_for_prevous_day(date){
        this.historyRow = getSpr(SPR.HISTORY).getValues('B10:S').find(r => r[0].getTime() == date.getTime());
        this.test.assertTrue(this.historyRow);
    }

    history_have_calories_intake_as(expected){
        this.test.assertEquals(this.historyRow[1], expected);
    }

    history_have_calories_burned_as(expected){
        this.test.assertEquals(this.historyRow[2], expected);
    }

    history_have_calories_difference_as(expected){
        this.test.assertEquals(this.historyRow[3], expected);
    }

    history_have_macros_as(expected){
        this.test.assertEqualsArray(this.historyRow.slice(4, 13), expected);
    }

    history_have_calories_check_as(expected){
        this.test.assertEquals(this.historyRow[14], expected);
    }

    history_have_macro_check_as(expected){
        this.test.assertEquals(this.historyRow[15], expected);
    }

    history_have_calorie_density_check_as(expected){
        this.test.assertEquals(this.historyRow[16], expected);
    }

    meal_copied(to, mealNo, expected){
        let result = getSpr(SPR.DAYS).getAreaValue(to * 15 + 4, mealNo * 2, 15, 2);
        this.test.assertEqualsArray(result, resizeMatrix(expected, 2, 15, ''));
    }

    meal_save_as_filled_with_name(expected){
        this.test.assertEquals(getRng(RNG.SAVE_MEAL_AS).getValue(), expected);
    }

    meal_saved_with_name(name){
        this.name = name;
        let mealFind = getSpr(SPR.MEALS).getValues('B4:D').find(r => r[0] == name);
        this.test.assertTrue(mealFind);
    }

    no_meal_saved_with_name(name){
        let mealFind = getSpr(SPR.MEALS).getValues('B4:D').find(r => r[0] == name);
        this.test.assertFalse(mealFind);
    }

    meal_have_items(items){
        let filtered = getSpr(SPR.MEALS).getValues('B4:D').filter(i => i[0] === this.name);
        this.test.assertEqualsArray(filtered, items.map(i => [this.name, i[0], i[1]]));
    }
}