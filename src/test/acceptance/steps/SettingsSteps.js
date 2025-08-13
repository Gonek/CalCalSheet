class SettingsGivenSteps extends Steps{

    test_days_available(){
        testData.clearDays();
        testData.addTestCalendarDays();
    }

    future_days_as(days){
        getRng(RNG.GENERAL_SETTINGS).setValue(days, 1);
    }

    archive_days_as(days){
        getRng(RNG.GENERAL_SETTINGS).setValue(days, 2);
    }

    price_calulation_as(price){
        getRng(RNG.GENERAL_SETTINGS).setValue(price, 3);
    }

    default_calorie_output_as(output){
        getRng(RNG.GENERAL_SETTINGS).setValue(output, 4);
    }

    consumed_checkbox_as(checkbox){
        getRng(RNG.GENERAL_SETTINGS).setValue(checkbox, 5);
    }

    noom_as(noom){
        getRng(RNG.GENERAL_SETTINGS).setValue(noom, 6);
    }

    auto_macro_cycle_as(cycle){
        getRng(RNG.GENERAL_SETTINGS).setValue(cycle, 7);
    }

    macro_percentages_as(percentage){
        getRng(RNG.GENERAL_SETTINGS).setValue(percentage, 8);
    }

    nutrition_fields_as(fat, sfat, tfat, carb, fiber, sugar, salk, prot, salt){
        getRng(RNG.NUTRITION_FIELDS).setValues([[fat], [sfat], [tfat], [carb], [fiber], [sugar], [salk], [prot], [salt]]);
    }

    language_as(value){
       getRng(RNG.LOCALISATION).setValue(value, 1); 
    }

    time_zone_as(value){
       getRng(RNG.LOCALISATION).setValue(value, 2); 
    }

    date_format_as(value){
       getRng(RNG.LOCALISATION).setValue(value, 3); 
    }

    measurement_as(value){
       getRng(RNG.LOCALISATION).setValue(value, 4); 
    }

    currency_as(value){
       getRng(RNG.LOCALISATION).setValue(value, 5); 
    }

    meals_as(meals){
        getRng(RNG.MEALS).setValues(meals);
    }
}

class SettingsWhenSteps extends Steps{
    apply_settings_clicked(){
        this.clickButton(SHT.SETTINGS, BTN.APPLY_SETTINGS);
    }
}

class SettingsThenSteps extends Steps{
    future_available_days_as_expected(futureDays){
        let daysDates = getSht(SHT.DAYS).getRng('A6:A').getColAsArray();
        let result = daysDates.filter(d => d > getToday()).length;
        assertEquals(result, futureDays);
    }

    archive_available_days_as_expected(pastDays){
        let daysDates = getSht(SHT.DAYS).getRng('A6:A').getColAsArray();
        let result = daysDates.filter(d => (d!='') && (d < getToday())).length;
        assertEquals(result, pastDays);
    }

    consumed_checkbox_visible(bool = true){
        assertEquals(!getSht(SHT.DAY).isColHidden(2), bool);
    }

    price_field_visible_in_day_sheet(bool = true){
        assertEquals(!getSht(SHT.DAY).isColHidden(18), bool);
    }

    price_fields_visible_in_new_item_sheet(bool = true){
        assertEquals(!getSht(SHT.NEW_ITEM).isRowHidden(17), bool);
        assertEquals(!getSht(SHT.NEW_ITEM).isRowHidden(18), bool);
    }

    price_field_visible_in_recipe_calculator_sheet(bool = true){
        assertEquals(!getSht(SHT.RECIPE_CALCULATOR).isColHidden(17), bool);
    }

    price_field_visible_in_items_sheet(bool = true){
        assertEquals(!getSht(SHT.ITEMS).isColHidden(26), bool);
        assertEquals(!getSht(SHT.ITEMS).isColHidden(27), bool);
    }

    price_field_visible_in_history_sheet(bool = true){
        assertEquals(!getSht(SHT.HISTORY).isColHidden(16), bool);
    }

    noom_fields_visible_in_day_sheet(bool = true){
        assertEquals(!getSht(SHT.DAY).isColHidden(19), bool);
        assertEquals(!getSht(SHT.DAY).isColHidden(20), bool);
        assertEquals(!getSht(SHT.DAY).isColHidden(21), bool);
    }

    noom_fields_visible_in_new_item_sheet(bool = true){
        assertEquals(!getSht(SHT.NEW_ITEM).isRowHidden(23), bool);
        assertEquals(!getSht(SHT.NEW_ITEM).isRowHidden(24), bool);
    }

    noom_fields_visible_in_recipe_calculator_sheet(bool = true){
        assertEquals(!getSht(SHT.RECIPE_CALCULATOR).isRowHidden(36), bool);
        assertEquals(!getSht(SHT.RECIPE_CALCULATOR).isRowHidden(37), bool);
    }

    noom_field_visible_in_items_sheet(bool = true){
        assertEquals(!getSht(SHT.ITEMS).isColHidden(28), bool);
    }

    percentage_used_for_macros(bool = true){
        
    }

    nutrition_fields_visible_in_day_sheet(fat, sfat, tfat, carb, fiber, sugar, salk, prot, salt){
        let sht = getSht(SHT.DAY);
        assertEquals(!sht.isColHidden(9), fat);
        assertEquals(!sht.isColHidden(10), sfat);
        assertEquals(!sht.isColHidden(11), tfat);
        assertEquals(!sht.isColHidden(12), carb);
        assertEquals(!sht.isColHidden(13), fiber);
        assertEquals(!sht.isColHidden(14), sugar);
        assertEquals(!sht.isColHidden(15), salk);
        assertEquals(!sht.isColHidden(16), prot);
        assertEquals(!sht.isColHidden(17), salt);
    }

    nutrition_fields_visible_in_new_item_sheet(fat, sfat, tfat, carb, fiber, sugar, salk, prot, salt){
        let sht = getSht(SHT.NEW_ITEM);
        assertEquals(!sht.isRowHidden(8), fat);
        assertEquals(!sht.isRowHidden(9), sfat);
        assertEquals(!sht.isRowHidden(10), tfat);
        assertEquals(!sht.isRowHidden(11), carb);
        assertEquals(!sht.isRowHidden(12), fiber);
        assertEquals(!sht.isRowHidden(13), sugar);
        assertEquals(!sht.isRowHidden(14), salk);
        assertEquals(!sht.isRowHidden(15), prot);
        assertEquals(!sht.isRowHidden(16), salt);
    }

    nutrition_fields_visible_in_recipe_calulator_sheet(fat, sfat, tfat, carb, fiber, sugar, salk, prot, salt){
        let sht = getSht(SHT.RECIPE_CALCULATOR);
        assertEquals(!sht.isColHidden(8), fat);
        assertEquals(!sht.isColHidden(9), sfat);
        assertEquals(!sht.isColHidden(10), tfat);
        assertEquals(!sht.isColHidden(11), carb);
        assertEquals(!sht.isColHidden(12), fiber);
        assertEquals(!sht.isColHidden(13), sugar);
        assertEquals(!sht.isColHidden(14), salk);
        assertEquals(!sht.isColHidden(15), prot);
        assertEquals(!sht.isColHidden(16), salt);
    }

    nutrition_fields_visible_in_profile_sheet(fat, sfat, tfat, carb, fiber, sugar, salk, prot, salt){
        let sht = getSht(SHT.PROFILE);
        assertEquals(!sht.isRowHidden(5), fat);
        assertEquals(!sht.isRowHidden(6), sfat);
        assertEquals(!sht.isRowHidden(7), tfat);
        assertEquals(!sht.isRowHidden(8), carb);
        assertEquals(!sht.isRowHidden(9), fiber);
        assertEquals(!sht.isRowHidden(10), sugar);
        assertEquals(!sht.isRowHidden(11), salk);
        assertEquals(!sht.isRowHidden(12), prot);
        assertEquals(!sht.isRowHidden(13), salt);
    }

    nutrition_fields_visible_in_items_sheet(fat, sfat, tfat, carb, fiber, sugar, salk, prot, salt){
        let sht = getSht(SHT.ITEMS);
        assertEquals(!sht.isColHidden(8), fat); 
        assertEquals(!sht.isColHidden(9), fat); 
        assertEquals(!sht.isColHidden(10), sfat);
        assertEquals(!sht.isColHidden(11), sfat);
        assertEquals(!sht.isColHidden(12), tfat);
        assertEquals(!sht.isColHidden(13), tfat);
        assertEquals(!sht.isColHidden(14), carb);
        assertEquals(!sht.isColHidden(15), carb);
        assertEquals(!sht.isColHidden(16), fiber);
        assertEquals(!sht.isColHidden(17), fiber);
        assertEquals(!sht.isColHidden(18), sugar);
        assertEquals(!sht.isColHidden(19), sugar);
        assertEquals(!sht.isColHidden(20), salk);
        assertEquals(!sht.isColHidden(21), salk);
        assertEquals(!sht.isColHidden(22), prot);
        assertEquals(!sht.isColHidden(23), prot);
        assertEquals(!sht.isColHidden(24), salt);
        assertEquals(!sht.isColHidden(25), salt);
    }

    nutrition_fields_visible_in_history_sheet(fat, sfat, tfat, carb, fiber, sugar, salk, prot, salt){
        let sht = getSht(SHT.HISTORY);
        assertEquals(!sht.isColHidden(6), fat);
        assertEquals(!sht.isColHidden(7), sfat);
        assertEquals(!sht.isColHidden(8), tfat);
        assertEquals(!sht.isColHidden(9), carb);
        assertEquals(!sht.isColHidden(10), fiber);
        assertEquals(!sht.isColHidden(11), sugar);
        assertEquals(!sht.isColHidden(12), salk);
        assertEquals(!sht.isColHidden(13), prot);
        assertEquals(!sht.isColHidden(14), salt);
    }

    meals_changed_in_summary(meals){
        let sumMeals = getSht(SHT.DAY).getValues('G6:G11');
        assertEquals(sumMeals[0][0], meals[0]);
        assertEquals(sumMeals[1][0], meals[1]);
        assertEquals(sumMeals[2][0], meals[2]);
        assertEquals(sumMeals[3][0], meals[3]);
        assertEquals(sumMeals[4][0], meals[4]);
        assertEquals(sumMeals[5][0], meals[5]);
    }

    meals_changed_at_items(meals){
        let sht = getSht(SHT.DAY);
        let itemMeals = sht.getValues('A17:A106');
        assertEquals(itemMeals[0][0], meals[0][0]);
        assertEquals(itemMeals[15][0], meals[1][0]);
        assertEquals(itemMeals[30][0], meals[2][0]);
        assertEquals(itemMeals[45][0], meals[3][0]);
        assertEquals(itemMeals[60][0], meals[4][0]);
        assertEquals(itemMeals[75][0], meals[5][0]);
    }

    meals_changed_for_calendar_days(meals){
        let sht = getSht(SHT.DAYS);
        let dayMeals = sht.getValues('B5:M5');
        assertEquals(dayMeals[0][0], meals[0]);
        assertEquals(dayMeals[0][2], meals[1]);
        assertEquals(dayMeals[0][4], meals[2]);
        assertEquals(dayMeals[0][6], meals[3]);
        assertEquals(dayMeals[0][8], meals[4]);
        assertEquals(dayMeals[0][10], meals[5]);
    }

    meals_changed_for_template_days(meals){
        let sht = getSht(SHT.DAYS);
        let dayMeals = sht.getValues('Q5:AB5');
        assertEquals(dayMeals[0][0], meals[0]);
        assertEquals(dayMeals[0][2], meals[1]);
        assertEquals(dayMeals[0][4], meals[2]);
        assertEquals(dayMeals[0][6], meals[3]);
        assertEquals(dayMeals[0][8], meals[4]);
        assertEquals(dayMeals[0][10], meals[5]);
    }

    selected_langage_changed_to_no_(expected){
        let value = getSht(SHT.TEXTS).getValue('A2');
        this.langageIndex = value; 
        assertEquals(value, expected);
    }

    sheet_names_changed_to_selected_language(){
        let dayName = getSht(SHT.DAY).getName();
        let expectedDayName = getSht(SHT.TEXTS).getPosValue(5, this.langageIndex + 2);
        assertEquals(dayName, expectedDayName);
    }

    text_are_changed_to_selected_language(){
        let calorie = getSht(SHT.DAY).getValue('H5');
        let expectedCalorie = getSht(SHT.TEXTS).getPosValue(31, this.langageIndex + 2);
        assertEquals(calorie, expectedCalorie);
    }

    notes_are_changed_to_selected_language(){
        let note = getSht(SHT.TUTORIAL).getRng('E62').getNote();
        let expectedNote = getSht(SHT.TEXTS).getPosValue(456, this.langageIndex + 2);
        assertEquals(note, expectedNote);
    }

    today_field_use_time_zone_of_(expected){
        let value = getRng(RNG.TODAY).getFormula();
        assertEquals(value, `=ROUNDDOWN(NOW() +${expected}/24)`)
    }

    date_format_changed_in_days_to_(expected){
        let value = getSht(SHT.DAYS).getRng('A6').getNumberFormat();
        assertEquals(value, expected);
    }

    date_format_changed_in_profile_to_(expected){
        let value = getRng(RNG.WEIGHTS).getNumberFormat();
        assertEquals(value, expected);
    }

    date_format_changed_in_history_to_(expected){
        let value = getSht(SHT.HISTORY).getRng('B10').getNumberFormat();
        assertEquals(value, expected);
    }

    measurment_in_profile_changed_to(expected){
        let profileSht = getSht(SHT.PROFILE);
        let height = profileSht.getRng('D20').getNumberFormat();
        let weight = profileSht.getRng('D22').getNumberFormat();
        let weights = profileSht.getRng('K17').getNumberFormat();
        if(expected == 'Imperial'){
            assertEquals(height, '0" in"');
            assertEquals(weight, '0.00" lb"');
            assertEquals(weights, '0.00" lb"');
        } else {
            assertEquals(height, '0" cm"');
            assertEquals(weight, '0.00" kg"');
            assertEquals(weights, '0.00" kg"');
        } 
    }

    currency_in_day_changed_to(expected){
        let currency = getSht(SHT.DAY).getRng('R17').getNumberFormat();
        assertTrue(currency.includes(expected));
    }

    currency_in_new_items_changed_to(expected){
        let currency = getSht(SHT.NEW_ITEM).getRng('C17').getNumberFormat();
        assertTrue(currency.includes(expected));
    }

    currency_in_recipe_calculator_changed_to(expected){
        let currency = getSht(SHT.RECIPE_CALCULATOR).getRng('Q4').getNumberFormat();
        assertTrue(currency.includes(expected));
    }

    currency_in_profile_changed_to(expected){
        let currency = getSht(SHT.PROFILE).getRng('C14').getNumberFormat();
        assertTrue(currency.includes(expected));
    }

    currency_in_history_changed_to(expected){
        let currency = getSht(SHT.HISTORY).getRng('P10').getNumberFormat();
        assertTrue(currency.includes(expected));
    }

}