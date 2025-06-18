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
        this.clickButton(SPR.SETTINGS, BTN.APPLY_SETTINGS);
    }
}

class SettingsThenSteps extends Steps{
    future_available_days_as_expected(futureDays){
        let daysDates = getSpr(SPR.DAYS).getRng('A4:A').getColAsArray();
        let result = daysDates.filter(d => d > getToday()).length;
        assertEquals(result, futureDays);
    }

    archive_available_days_as_expected(pastDays){
        let daysDates = getSpr(SPR.DAYS).getRng('A4:A').getColAsArray();
        let result = daysDates.filter(d => (d!='') && (d < getToday())).length;
        assertEquals(result, pastDays);
    }

    consumed_checkbox_visible(bool = true){
        assertEquals(!getSpr(SPR.DAY).isColHidden(2), bool);
    }

    noom_fields_visible_in_day_sheet(bool = true){
        assertEquals(!getSpr(SPR.DAY).isColHidden(18), bool);
        assertEquals(!getSpr(SPR.DAY).isColHidden(19), bool);
        assertEquals(!getSpr(SPR.DAY).isColHidden(20), bool);
    }

    noom_fields_visible_in_new_item_sheet(bool = true){
        assertEquals(!getSpr(SPR.NEW_ITEM).isRowHidden(21), bool);
        assertEquals(!getSpr(SPR.NEW_ITEM).isRowHidden(22), bool);
    }

    noom_fields_visible_in_recipe_calculator_sheet(bool = true){
        assertEquals(!getSpr(SPR.RECIPE_CALCULATOR).isRowHidden(36), bool);
        assertEquals(!getSpr(SPR.RECIPE_CALCULATOR).isRowHidden(37), bool);
    }

    noom_field_visible_in_items_sheet(bool = true){
        assertEquals(!getSpr(SPR.ITEMS).isColHidden(26), bool);
    }

    noom_field_visible_in_history_sheet(bool = true){
        assertEquals(!getSpr(SPR.HISTORY).isColHidden(19), bool);
    }

    percentage_used_for_macros(bool = true){
        // TODO ???
    }

    nutrition_fields_visible_in_day_sheet(fat, sfat, tfat, carb, fiber, sugar, salk, prot, salt){
        let spr = getSpr(SPR.DAY);
        assertEquals(!spr.isColHidden(9), fat);
        assertEquals(!spr.isColHidden(10), sfat);
        assertEquals(!spr.isColHidden(11), tfat);
        assertEquals(!spr.isColHidden(12), carb);
        assertEquals(!spr.isColHidden(13), fiber);
        assertEquals(!spr.isColHidden(14), sugar);
        assertEquals(!spr.isColHidden(15), salk);
        assertEquals(!spr.isColHidden(16), prot);
        assertEquals(!spr.isColHidden(17), salt);
    }

    nutrition_fields_visible_in_new_item_sheet(fat, sfat, tfat, carb, fiber, sugar, salk, prot, salt){
        let spr = getSpr(SPR.NEW_ITEM);
        assertEquals(!spr.isRowHidden(8), fat);
        assertEquals(!spr.isRowHidden(9), sfat);
        assertEquals(!spr.isRowHidden(10), tfat);
        assertEquals(!spr.isRowHidden(11), carb);
        assertEquals(!spr.isRowHidden(12), fiber);
        assertEquals(!spr.isRowHidden(13), sugar);
        assertEquals(!spr.isRowHidden(14), salk);
        assertEquals(!spr.isRowHidden(15), prot);
        assertEquals(!spr.isRowHidden(16), salt);
    }

    nutrition_fields_visible_in_recipe_calulator_sheet(fat, sfat, tfat, carb, fiber, sugar, salk, prot, salt){
        let spr = getSpr(SPR.RECIPE_CALCULATOR);
        assertEquals(!spr.isColHidden(8), fat);
        assertEquals(!spr.isColHidden(9), sfat);
        assertEquals(!spr.isColHidden(10), tfat);
        assertEquals(!spr.isColHidden(11), carb);
        assertEquals(!spr.isColHidden(12), fiber);
        assertEquals(!spr.isColHidden(13), sugar);
        assertEquals(!spr.isColHidden(14), salk);
        assertEquals(!spr.isColHidden(15), prot);
        assertEquals(!spr.isColHidden(16), salt);
    }

    nutrition_fields_visible_in_profile_sheet(fat, sfat, tfat, carb, fiber, sugar, salk, prot, salt){
        let spr = getSpr(SPR.PROFILE);
        assertEquals(!spr.isRowHidden(5), fat);
        assertEquals(!spr.isRowHidden(6), sfat);
        assertEquals(!spr.isRowHidden(7), tfat);
        assertEquals(!spr.isRowHidden(8), carb);
        assertEquals(!spr.isRowHidden(9), fiber);
        assertEquals(!spr.isRowHidden(10), sugar);
        assertEquals(!spr.isRowHidden(11), salk);
        assertEquals(!spr.isRowHidden(12), prot);
        assertEquals(!spr.isRowHidden(13), salt);
    }

    nutrition_fields_visible_in_items_sheet(fat, sfat, tfat, carb, fiber, sugar, salk, prot, salt){
        let spr = getSpr(SPR.ITEMS);
        assertEquals(!spr.isColHidden(8), fat); 
        assertEquals(!spr.isColHidden(9), fat); 
        assertEquals(!spr.isColHidden(10), sfat);
        assertEquals(!spr.isColHidden(11), sfat);
        assertEquals(!spr.isColHidden(12), tfat);
        assertEquals(!spr.isColHidden(13), tfat);
        assertEquals(!spr.isColHidden(14), carb);
        assertEquals(!spr.isColHidden(15), carb);
        assertEquals(!spr.isColHidden(16), fiber);
        assertEquals(!spr.isColHidden(17), fiber);
        assertEquals(!spr.isColHidden(18), sugar);
        assertEquals(!spr.isColHidden(19), sugar);
        assertEquals(!spr.isColHidden(20), salk);
        assertEquals(!spr.isColHidden(21), salk);
        assertEquals(!spr.isColHidden(22), prot);
        assertEquals(!spr.isColHidden(23), prot);
        assertEquals(!spr.isColHidden(24), salt);
        assertEquals(!spr.isColHidden(25), salt);
    }

    nutrition_fields_visible_in_history_sheet(fat, sfat, tfat, carb, fiber, sugar, salk, prot, salt){
        let spr = getSpr(SPR.HISTORY);
        assertEquals(!spr.isColHidden(6), fat);
        assertEquals(!spr.isColHidden(7), sfat);
        assertEquals(!spr.isColHidden(8), tfat);
        assertEquals(!spr.isColHidden(9), carb);
        assertEquals(!spr.isColHidden(10), fiber);
        assertEquals(!spr.isColHidden(11), sugar);
        assertEquals(!spr.isColHidden(12), salk);
        assertEquals(!spr.isColHidden(13), prot);
        assertEquals(!spr.isColHidden(14), salt);
    }

    meals_changed_in_summary(meals){
        let sumMeals = getSpr(SPR.DAY).getValues('G4:G9');
        assertEquals(sumMeals[0][0], meals[0]);
        assertEquals(sumMeals[1][0], meals[1]);
        assertEquals(sumMeals[2][0], meals[2]);
        assertEquals(sumMeals[3][0], meals[3]);
        assertEquals(sumMeals[4][0], meals[4]);
        assertEquals(sumMeals[5][0], meals[5]);
    }

    meals_changed_at_items(meals){
        let spr = getSpr(SPR.DAY);
        let itemMeals = spr.getValues('A15:A104');
        assertEquals(itemMeals[0][0], meals[0][0]);
        assertEquals(itemMeals[15][0], meals[1][0]);
        assertEquals(itemMeals[30][0], meals[2][0]);
        assertEquals(itemMeals[45][0], meals[3][0]);
        assertEquals(itemMeals[60][0], meals[4][0]);
        assertEquals(itemMeals[75][0], meals[5][0]);
    }

    meals_changed_at_days(meals){
        let spr = getSpr(SPR.DAYS);
        let dayMeals = spr.getValues('B3:M3');
        assertEquals(dayMeals[0][0], meals[0]);
        assertEquals(dayMeals[0][2], meals[1]);
        assertEquals(dayMeals[0][4], meals[2]);
        assertEquals(dayMeals[0][6], meals[3]);
        assertEquals(dayMeals[0][8], meals[4]);
        assertEquals(dayMeals[0][10], meals[5]);
    }
}