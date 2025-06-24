class SettingsGivenSteps extends Steps{

    test_days_available(){
        this.test.utils.addTestDays();
    }

    future_days_as(days){
        getRng(RNG.GENERAL_SETTINGS).setValue(days, 1);
    }

    archive_days_as(days){
        getRng(RNG.GENERAL_SETTINGS).setValue(days, 2);
    }

    default_calorie_output_as(output){
        getRng(RNG.GENERAL_SETTINGS).setValue(output, 3);
    }

    consumed_checkbox_as(checkbox){
        getRng(RNG.GENERAL_SETTINGS).setValue(checkbox, 4);
    }

    noom_as(noom){
        getRng(RNG.GENERAL_SETTINGS).setValue(noom, 5);
    }

    auto_macro_cycle_as(cycle){
        getRng(RNG.GENERAL_SETTINGS).setValue(cycle, 6);
    }

    macro_percentages_as(percentage){
        getRng(RNG.GENERAL_SETTINGS).setValue(percentage, 7);
    }

    nutrition_fields_as(fat, sfat, tfat, carb, fiber, sugar, salk, prot, salt){
        getRng(RNG.NUTRITION_FIELDS).setValues([[fat], [sfat], [tfat], [carb], [fiber], [sugar], [salk], [prot], [salt]]);
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
        let daysDates = getSht(SHT.DAYS).getRng('A4:A').getColAsArray();
        let result = daysDates.filter(d => d > getToday()).length;
        assertEquals(result, futureDays);
    }

    archive_available_days_as_expected(pastDays){
        let daysDates = getSht(SHT.DAYS).getRng('A4:A').getColAsArray();
        let result = daysDates.filter(d => (d!='') && (d < getToday())).length;
        assertEquals(result, pastDays);
    }

    consumed_checkbox_visible(bool = true){
        assertEquals(!getSht(SHT.DAY).isColHidden(2), bool);
    }

    noom_fields_visible_in_day_sheet(bool = true){
        assertEquals(!getSht(SHT.DAY).isColHidden(18), bool);
        assertEquals(!getSht(SHT.DAY).isColHidden(19), bool);
        assertEquals(!getSht(SHT.DAY).isColHidden(20), bool);
    }

    noom_fields_visible_in_new_item_sheet(bool = true){
        assertEquals(!getSht(SHT.NEW_ITEM).isRowHidden(21), bool);
        assertEquals(!getSht(SHT.NEW_ITEM).isRowHidden(22), bool);
    }

    noom_fields_visible_in_recipe_calculator_sheet(bool = true){
        assertEquals(!getSht(SHT.RECIPE_CALCULATOR).isRowHidden(36), bool);
        assertEquals(!getSht(SHT.RECIPE_CALCULATOR).isRowHidden(37), bool);
    }

    noom_field_visible_in_items_sheet(bool = true){
        assertEquals(!getSht(SHT.ITEMS).isColHidden(26), bool);
    }

    noom_field_visible_in_history_sheet(bool = true){
        assertEquals(!getSht(SHT.HISTORY).isColHidden(19), bool);
    }

    percentage_used_for_macros(bool = true){
        // TODO ???
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
        let sumMeals = getSht(SHT.DAY).getValues('G4:G9');
        assertEquals(sumMeals[0][0], meals[0]);
        assertEquals(sumMeals[1][0], meals[1]);
        assertEquals(sumMeals[2][0], meals[2]);
        assertEquals(sumMeals[3][0], meals[3]);
        assertEquals(sumMeals[4][0], meals[4]);
        assertEquals(sumMeals[5][0], meals[5]);
    }

    meals_changed_at_items(meals){
        let sht = getSht(SHT.DAY);
        let itemMeals = sht.getValues('A15:A104');
        assertEquals(itemMeals[0][0], meals[0][0]);
        assertEquals(itemMeals[15][0], meals[1][0]);
        assertEquals(itemMeals[30][0], meals[2][0]);
        assertEquals(itemMeals[45][0], meals[3][0]);
        assertEquals(itemMeals[60][0], meals[4][0]);
        assertEquals(itemMeals[75][0], meals[5][0]);
    }

    meals_changed_at_days(meals){
        let sht = getSht(SHT.DAYS);
        let dayMeals = sht.getValues('B3:M3');
        assertEquals(dayMeals[0][0], meals[0]);
        assertEquals(dayMeals[0][2], meals[1]);
        assertEquals(dayMeals[0][4], meals[2]);
        assertEquals(dayMeals[0][6], meals[3]);
        assertEquals(dayMeals[0][8], meals[4]);
        assertEquals(dayMeals[0][10], meals[5]);
    }
}