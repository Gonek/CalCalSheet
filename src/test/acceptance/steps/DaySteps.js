class DayGivenSteps extends Steps{

    test_items_available(){
        testData.addTestItems();
    }

    test_days_available(generateFrom = -2){
        testData.clearDays();
        testData.addTestCalendarDays(generateFrom);
        testData.addTestTemplateDays();
    }

    test_profiles_available(){
        testData.addTestProfiles();
    }
    
    previous_day_set_to(to){
        getRng(RNG.DAY_PREV_DAY_INDEX).setValue(((to-1) * 15) + 1);
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

    item_name_at_row_as(row, name){
        getRng(RNG.DAY_ITEMS).setValue(name, row);
    }

    calorie_output_set_to(calorieOutput){
        getRng(RNG.CALORIE_OUTPUT).setValue(calorieOutput);
    }

    profile_set_to(profile){
        getRng(RNG.SELECTED_PROFILE).setValue(profile);
    }
}

class DayWhenSteps extends Steps{

    day_changed(to){
        this.changeCbox(SHT.DAY, CBOX.DAY_NAME, to);
    }

    item_amouth_field_changed(row, to){
        this.changeField(SHT.DAY, RNG.DAY_ITEMS, row, 3, `E${16+row}`, to);
    }
}

class DayThenSteps extends Steps{

    items_of_day_loaded(expected){
        let result = getRng(RNG.DAY_ITEMS).getValues();
        assertEqualsArray(result, expected);
    }

    item_amount_at_row_changed_to(row, expected){
        let value = getRng(RNG.DAY_ITEMS).getValue(row, 3);
        assertEquals(value, expected);
    }

    output_calories_loaded(expected){
       let result = getRng(RNG.CALORIE_OUTPUT).getValue();
       assertEquals(result, expected);
    }

    profile_loaded(expected){
       let result = getRng(RNG.SELECTED_PROFILE).getValue();
       assertEquals(result, expected);
    }

    previous_day_saved(to){
        this.savedDayItems = getSht(SHT.DAYS).getAreaValues(6 + ((to-1) * 15), 2, 15, 12);
        this.savedDayData = getSht(SHT.DAYS).getAreaValues(6 + ((to-1) * 15), 14, 15, 1);
        assertTrue(this.savedDayItems);
        assertTrue(this.savedDayData);
    }

    saved_with_test_items(){
        assertEqualsArray(this.savedDayItems,
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

    saved_with_no_items(){
        assertEqualsArray(this.savedDayItems,
            [['', '', '', '', '', '', '', '', '', '', '', ''],
             ['', '', '', '', '', '', '', '', '', '', '', ''],
             ['', '', '', '', '', '', '', '', '', '', '', ''],
             ['', '', '', '', '', '', '', '', '', '', '', ''],
             ['', '', '', '', '', '', '', '', '', '', '', ''],
             ['', '', '', '', '', '', '', '', '', '', '', ''],
             ['', '', '', '', '', '', '', '', '', '', '', ''],
             ['', '', '', '', '', '', '', '', '', '', '', ''],
             ['', '', '', '', '', '', '', '', '', '', '', ''],
             ['', '', '', '', '', '', '', '', '', '', '', ''],
             ['', '', '', '', '', '', '', '', '', '', '', ''],
             ['', '', '', '', '', '', '', '', '', '', '', ''],
             ['', '', '', '', '', '', '', '', '', '', '', ''],
             ['', '', '', '', '', '', '', '', '', '', '', ''],
             ['', '', '', '', '', '', '', '', '', '', '', '']]);
    }

    saved_with_calorie_output(expected){
        assertEquals(this.savedDayData[0], expected);
    }

    saved_with_profile(expected){
        assertEquals(this.savedDayData[1], expected);
    }

    history_saved_for_prevous_day(date){
        let history = getSht(SHT.HISTORY).getValues('B10:S');
        this.historyRow = history.find(r =>(r[0] instanceof Date) && (r[0].getTime() == date.getTime()));
        assertTrue(this.historyRow);
    }

    history_have_calories_intake_as(expected){
        assertEquals(this.historyRow[1], expected);
    }

    history_have_calories_burned_as(expected){
        assertEquals(this.historyRow[2], expected);
    }

    history_have_calories_difference_as(expected){
        assertEquals(this.historyRow[3], expected);
    }

    history_have_macros_as(expected){
        assertEqualsArray(this.historyRow.slice(4, 13), expected);
    }

    history_have_price_as(expected){
        assertEquals(this.historyRow[14].toFixed(2), expected);
    }

    history_have_calories_check_as(expected){
        assertEquals(this.historyRow[15], expected);
    }

    history_have_macro_check_as(expected){
        assertEquals(this.historyRow[16], expected);
    }

    history_have_calorie_density_check_as(expected){
        assertEquals(this.historyRow[17], expected);
    }
}