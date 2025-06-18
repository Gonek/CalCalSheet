class DayGivenSteps extends BaseDayGivenSteps{

    test_meals_available(){
        this.test.utils.addTestMeals();
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

class DayThenSteps extends BaseDayThenSteps{

    meal_loaded_to_meal_no_(mealNumber, expected){
        let result = getRng(`Meal${mealNumber}`).getValues();
        assertEqualsArray(result, expected)
    }

    meal_copied(to, mealNo, expected){
        let result = getSpr(SPR.DAYS).getAreaValue(to * 15 + 4, mealNo * 2, 15, 2);
        assertEqualsArray(result, resizeMatrix(expected, 2, 15, ''));
    }

    meal_save_as_filled_with_name(expected){
        assertEquals(getRng(RNG.SAVE_MEAL_AS).getValue(), expected);
    }

    meal_saved_with_name(name){
        this.name = name;
        let mealFind = getSpr(SPR.MEALS).getValues('B4:D').find(r => r[0] == name);
        assertTrue(mealFind);
    }

    no_meal_saved_with_name(name){
        let mealFind = getSpr(SPR.MEALS).getValues('B4:D').find(r => r[0] == name);
        assertFalse(mealFind);
    }

    meal_have_items(items){
        let filtered = getSpr(SPR.MEALS).getValues('B4:D').filter(i => i[0] === this.name);
        assertEqualsArray(filtered, items.map(i => [this.name, i[0], i[1]]));
    }
}