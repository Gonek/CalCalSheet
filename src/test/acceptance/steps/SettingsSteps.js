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
        this.test.assertEquals(result, futureDays);
    }

    archive_available_days_as_expected(pastDays){
        let daysDates = getSpr(SPR.DAYS).getRng('A4:A').getColAsArray();
        let result = daysDates.filter(d => (d!='') && (d < getToday())).length;
        this.test.assertEquals(result, pastDays);
    }

    consumed_checkbox_visible(bool = true){
        this.test.assertEquals(!getSpr(SPR.DAY).isColHidden(2), bool);
    }

    noom_fields_visible_in_day_sheet(bool = true){
        this.test.assertEquals(!getSpr(SPR.DAY).isColHidden(18), bool);
        this.test.assertEquals(!getSpr(SPR.DAY).isColHidden(19), bool);
        this.test.assertEquals(!getSpr(SPR.DAY).isColHidden(20), bool);
    }

    noom_fields_visible_in_new_item_sheet(bool = true){
        this.test.assertEquals(!getSpr(SPR.NEW_ITEM).isRowHidden(21), bool);
        this.test.assertEquals(!getSpr(SPR.NEW_ITEM).isRowHidden(22), bool);
    }

    noom_fields_visible_in_recipe_calculator_sheet(bool = true){
        this.test.assertEquals(!getSpr(SPR.RECIPE_CALCULATOR).isRowHidden(36), bool);
        this.test.assertEquals(!getSpr(SPR.RECIPE_CALCULATOR).isRowHidden(37), bool);
    }

    noom_field_visible_in_items_sheet(bool = true){
        this.test.assertEquals(!getSpr(SPR.ITEMS).isColHidden(26), bool);
    }

    noom_field_visible_in_history_sheet(bool = true){
        this.test.assertEquals(!getSpr(SPR.HISTORY).isColHidden(19), bool);
    }

    percentage_used_for_macros(bool = true){
        // TODO ???
    }

    nutrition_fields_visible_in_day_sheet(fat, sfat, tfat, carb, fiber, sugar, salk, prot, salt){
        let spr = getSpr(SPR.DAY);
        this.test.assertEquals(!spr.isColHidden(9), fat);
        this.test.assertEquals(!spr.isColHidden(10), sfat);
        this.test.assertEquals(!spr.isColHidden(11), tfat);
        this.test.assertEquals(!spr.isColHidden(12), carb);
        this.test.assertEquals(!spr.isColHidden(13), fiber);
        this.test.assertEquals(!spr.isColHidden(14), sugar);
        this.test.assertEquals(!spr.isColHidden(15), salk);
        this.test.assertEquals(!spr.isColHidden(16), prot);
        this.test.assertEquals(!spr.isColHidden(17), salt);
    }

    nutrition_fields_visible_in_new_item_sheet(fat, sfat, tfat, carb, fiber, sugar, salk, prot, salt){
        let spr = getSpr(SPR.NEW_ITEM);
        this.test.assertEquals(!spr.isRowHidden(8), fat);
        this.test.assertEquals(!spr.isRowHidden(9), sfat);
        this.test.assertEquals(!spr.isRowHidden(10), tfat);
        this.test.assertEquals(!spr.isRowHidden(11), carb);
        this.test.assertEquals(!spr.isRowHidden(12), fiber);
        this.test.assertEquals(!spr.isRowHidden(13), sugar);
        this.test.assertEquals(!spr.isRowHidden(14), salk);
        this.test.assertEquals(!spr.isRowHidden(15), prot);
        this.test.assertEquals(!spr.isRowHidden(16), salt);
    }

    nutrition_fields_visible_in_recipe_calulator_sheet(fat, sfat, tfat, carb, fiber, sugar, salk, prot, salt){
        let spr = getSpr(SPR.RECIPE_CALCULATOR);
        this.test.assertEquals(!spr.isColHidden(8), fat);
        this.test.assertEquals(!spr.isColHidden(9), sfat);
        this.test.assertEquals(!spr.isColHidden(10), tfat);
        this.test.assertEquals(!spr.isColHidden(11), carb);
        this.test.assertEquals(!spr.isColHidden(12), fiber);
        this.test.assertEquals(!spr.isColHidden(13), sugar);
        this.test.assertEquals(!spr.isColHidden(14), salk);
        this.test.assertEquals(!spr.isColHidden(15), prot);
        this.test.assertEquals(!spr.isColHidden(16), salt);
    }

    nutrition_fields_visible_in_profile_sheet(fat, sfat, tfat, carb, fiber, sugar, salk, prot, salt){
        let spr = getSpr(SPR.PROFILE);
        this.test.assertEquals(!spr.isRowHidden(5), fat);
        this.test.assertEquals(!spr.isRowHidden(6), sfat);
        this.test.assertEquals(!spr.isRowHidden(7), tfat);
        this.test.assertEquals(!spr.isRowHidden(8), carb);
        this.test.assertEquals(!spr.isRowHidden(9), fiber);
        this.test.assertEquals(!spr.isRowHidden(10), sugar);
        this.test.assertEquals(!spr.isRowHidden(11), salk);
        this.test.assertEquals(!spr.isRowHidden(12), prot);
        this.test.assertEquals(!spr.isRowHidden(13), salt);
    }

    nutrition_fields_visible_in_items_sheet(fat, sfat, tfat, carb, fiber, sugar, salk, prot, salt){
        let spr = getSpr(SPR.ITEMS);
        this.test.assertEquals(!spr.isColHidden(8), fat); 
        this.test.assertEquals(!spr.isColHidden(9), fat); 
        this.test.assertEquals(!spr.isColHidden(10), sfat);
        this.test.assertEquals(!spr.isColHidden(11), sfat);
        this.test.assertEquals(!spr.isColHidden(12), tfat);
        this.test.assertEquals(!spr.isColHidden(13), tfat);
        this.test.assertEquals(!spr.isColHidden(14), carb);
        this.test.assertEquals(!spr.isColHidden(15), carb);
        this.test.assertEquals(!spr.isColHidden(16), fiber);
        this.test.assertEquals(!spr.isColHidden(17), fiber);
        this.test.assertEquals(!spr.isColHidden(18), sugar);
        this.test.assertEquals(!spr.isColHidden(19), sugar);
        this.test.assertEquals(!spr.isColHidden(20), salk);
        this.test.assertEquals(!spr.isColHidden(21), salk);
        this.test.assertEquals(!spr.isColHidden(22), prot);
        this.test.assertEquals(!spr.isColHidden(23), prot);
        this.test.assertEquals(!spr.isColHidden(24), salt);
        this.test.assertEquals(!spr.isColHidden(25), salt);
    }

    nutrition_fields_visible_in_history_sheet(fat, sfat, tfat, carb, fiber, sugar, salk, prot, salt){
        let spr = getSpr(SPR.HISTORY);
        this.test.assertEquals(!spr.isColHidden(6), fat);
        this.test.assertEquals(!spr.isColHidden(7), sfat);
        this.test.assertEquals(!spr.isColHidden(8), tfat);
        this.test.assertEquals(!spr.isColHidden(9), carb);
        this.test.assertEquals(!spr.isColHidden(10), fiber);
        this.test.assertEquals(!spr.isColHidden(11), sugar);
        this.test.assertEquals(!spr.isColHidden(12), salk);
        this.test.assertEquals(!spr.isColHidden(13), prot);
        this.test.assertEquals(!spr.isColHidden(14), salt);
    }

    meals_changed_in_summary(meals){
        let sumMeals = getSpr(SPR.DAY).getValues('G4:G9');
        this.test.assertEquals(sumMeals[0][0], meals[0]);
        this.test.assertEquals(sumMeals[1][0], meals[1]);
        this.test.assertEquals(sumMeals[2][0], meals[2]);
        this.test.assertEquals(sumMeals[3][0], meals[3]);
        this.test.assertEquals(sumMeals[4][0], meals[4]);
        this.test.assertEquals(sumMeals[5][0], meals[5]);
    }

    meals_changed_at_items(meals){
        let spr = getSpr(SPR.DAY);
        let itemMeals = spr.getValues('A15:A104');
        this.test.assertEquals(itemMeals[0][0], meals[0][0]);
        this.test.assertEquals(itemMeals[15][0], meals[1][0]);
        this.test.assertEquals(itemMeals[30][0], meals[2][0]);
        this.test.assertEquals(itemMeals[45][0], meals[3][0]);
        this.test.assertEquals(itemMeals[60][0], meals[4][0]);
        this.test.assertEquals(itemMeals[75][0], meals[5][0]);
    }

    meals_changed_at_days(meals){
        let spr = getSpr(SPR.DAYS);
        let dayMeals = spr.getValues('B3:M3');
        this.test.assertEquals(dayMeals[0][0], meals[0]);
        this.test.assertEquals(dayMeals[0][2], meals[1]);
        this.test.assertEquals(dayMeals[0][4], meals[2]);
        this.test.assertEquals(dayMeals[0][6], meals[3]);
        this.test.assertEquals(dayMeals[0][8], meals[4]);
        this.test.assertEquals(dayMeals[0][10], meals[5]);
    }
}