class DayToolsGivenSteps extends DayGivenSteps{

    test_meals_available(){
        testData.addTestMeals();
    }

    save_day_as(name){
        getRng(BTNF.SAVE_DAY_AS).setValue(name);
    }

    load_day_as(name){
        getRng(BTNF.LOAD_DAY).setValue(name);
    }

    delete_days_as(names){
        getRng(BTNF.DELETE_DAYS).setValue(names);
    }

    selected_meals_as(meals){
        let rng = getRng(RNG.SELECTED_MEALS);
        let values = rng.getValidationCriteriaRangeValues().filter((a, i) => meals.includes(i+1)).join(', ');
        rng.setValue(values);
    }

    copy_meals_from_as(from){
        getRng(BTNF.COPY_MEAL_FROM).setValue(from);
    }

    copy_meals_to_as(to){
        getRng(BTNF.COPY_MEAL_TO).setValue(to);
    }

    save_meals_as(name){
        getRng(BTNF.SAVE_AS_MEAL).setValue(name);
    }

    delete_meals_as(names){
        getRng(BTNF.DELETE_MEALS).setValue(names);
    }
}

class DayToolsWhenSteps extends Steps{

    meal_selected_in_meal_no_(mealNumber, mealSelected){
        this.changeCbox(SHT.DAY, `Meal${mealNumber}Start`, mealSelected);
    }

    save_day_clicked(){
        this.clickButtonWithField(SHT.DAY, BTNF.SAVE_DAY_AS, 'AE2', 4);
    }

    load_day_clicked(){
        this.clickButtonWithField(SHT.DAY, BTNF.LOAD_DAY, 'AE3', 4);
    }

    delete_days_clicked(){
        this.clickButtonWithField(SHT.DAY, BTNF.DELETE_DAYS, 'AE4', 4);
    }

    clear_day_clicked(){
        this.clickButton(SHT.DAY, BTN.CLEAR_DAY, 'AE5');
    }

    save_meal_clicked(){
        this.clickButtonWithField(SHT.DAY, BTNF.SAVE_AS_MEAL, 'AE8', 4);
    }  

    copy_meals_from_clicked(){
        this.clickButtonWithField(SHT.DAY, BTNF.COPY_MEAL_FROM, 'AE9', 4);
    }

    copy_meals_to_clicked(){
        this.clickButtonWithField(SHT.DAY, BTNF.COPY_MEAL_TO, 'AE10', 4);
    }

    clear_meals_clicked(){
        this.clickButton(SHT.DAY, BTN.CLEAR_MEAL, 'AE11');
    }

    delete_meals_clicked(){
        this.clickButtonWithField(SHT.DAY, BTNF.DELETE_MEALS, 'AE13', 4);
    }
}

class DayToolsThenSteps extends DayThenSteps{

    meal_loaded_to_meal_no_(mealNumber, expected){
        let result = getRng(`Meal${mealNumber}`).getValues();
        assertEqualsArray(result, resizeArray(expected, 15, ['', '', '']));
    }

    items_are_not_changed(){
        this.items_not_changed_for_meal_no_(1);
        this.items_not_changed_for_meal_no_(2);
        this.items_not_changed_for_meal_no_(3);
        this.items_not_changed_for_meal_no_(4);
        this.items_not_changed_for_meal_no_(5);
        this.items_not_changed_for_meal_no_(6);
    }

    items_not_changed_for_meal_no_(mealNumber){
        switch(mealNumber){
            case 1: this.meal_loaded_to_meal_no_(1, [['1 First', '', 50], ['All 100', '', 100], ['All Green', '', 1000], ['', '', ''], ['', '', ''], ['Yellow', '',  50]]); break;
            case 2: this.meal_loaded_to_meal_no_(2, [['2 Second', '', 85], ['All 1', '', 25], ['Test 1 serving', '', 2], ['Test 100g', '', 200]]); break;
            case 3: this.meal_loaded_to_meal_no_(3, [['3 Third', '', 100], ['Yellow', '', 110], ['Zero cal', '', 2500], ['Green', '', 10], 
                                                     ['Green', '', 11], ['Green', '', 12], ['Green', '', 13], ['Green', '', 14], 
                                                     ['Green', '', 15], ['Green', '', 16], ['Green', '', 17], ['Green', '', 18], 
                                                     ['Green', '', 19], ['Green', '', 20], ['Green', '', 21]]); break;
            case 4: this.meal_loaded_to_meal_no_(4, [['1 First', '', 20], ['Yellow', '', 1000]]); break;
            case 5: this.meal_loaded_to_meal_no_(5, []); break;
            case 6: this.meal_loaded_to_meal_no_(6, [['ZZ Last', '', 225], ['Max cal', '', 10], ['Red', '', 55]]); break;
        }
    }

    day_template_saved_with_name(name){
        let templateIndex = getSht(SHT.DAYS).getValues('P6:P').findIndex(r => r[0] == name);
        if(templateIndex > 0){
            this.savedDayItems = getSht(SHT.DAYS).getAreaValues(6 + templateIndex, 17, 15, 12);
            this.savedDayData = getSht(SHT.DAYS).getAreaValues(6 + templateIndex, 29, 15, 1);
            assertTrue(true);
        }
    }

    day_template_with_name_got_removed(name){
        let templateIndex = getSht(SHT.DAYS).getValues('P6:P').findIndex(r => r[0] == name);
        assertTrue(templateIndex == -1);
    }

    number_of_day_templates_as(count){
        let countSaved = clear(getSht(SHT.DAYS).getValues('P6:P')).length;
        assertEquals(countSaved, count);
    }

    meal_saved_with_name(name){
        this.mealName = name;
        let mealFind = getSht(SHT.MEALS).getValues('B4:D').find(r => r[0] == name);
        assertTrue(mealFind);
    }

    no_meal_exist_with_name(name){
        let mealFind = getSht(SHT.MEALS).getValues('B4:D').find(r => r[0] == name);
        assertFalse(mealFind);
    }

    number_of_meals_are(count){
        let countSaved = [...new Set(getSht(SHT.MEALS).getRng('B4:B').getColAsArray())].length;
        assertEquals(countSaved-1, count);
    }

    meal_have_items(items){
        let filtered = getSht(SHT.MEALS).getValues('B4:D').filter(i => i[0] === this.mealName);
        assertEqualsArray(filtered, items.map(i => [this.mealName, i[0], i[1]]));
    }

    meal_copied_to_calendar_day(to, mealNo, expected){
        let result = getSht(SHT.DAYS).getAreaValues((to - 1) * 15 + 6, mealNo * 2, 15, 2);
        assertEqualsArray(result, resizeMatrix(expected, 2, 15, ''));
    }

    meal_copied_to_template_day(to, mealNo, expected){
        let result = getSht(SHT.DAYS).getAreaValues((to - 1) * 15 + 6, mealNo * 2 + 15, 15, 2);
        assertEqualsArray(result, resizeMatrix(expected, 2, 15, ''));
    }
}