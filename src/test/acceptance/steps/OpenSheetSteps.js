class OpenSheetGivenSteps extends BaseDayGivenSteps{
    last_finished_day_set_to(date){
        getRng(RNG.LAST_FINISHED_DAY).setValue(date);
        getObj(App).flush();
    }

    default_calorie_output_set_to(value){
        getRng(RNG.GENERAL_SETTINGS).setValue(value, 3);
    }

    automatic_macro_cycle_set_to(value){
        getRng(RNG.GENERAL_SETTINGS).setValue(value, 6);
    }
}

class OpenSheetWhenSteps extends Steps{
    sheet_opened(){
        this.onOpen();
    }  
}

class OpenSheetThenSteps extends BaseDayThenSteps{

    day_changed_to(to){
        let r = getRng(CBOX.DAY_NAME);
        let values = r.getValidationCriteriaRangeValues();
        this.test.assertEquals(r.getValue(), values[to]);
    }

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

    new_day_calorie_output_set_to(day, expected){
        this.test.assertEquals(getSpr(SPR.DAYS).getValue(`N${day*15 + 4}`), expected);
    }

    new_day_profile_set_to(day, expected){
        this.test.assertEquals(getSpr(SPR.DAYS).getValue(`N${day*15 + 5}`), expected);
    }

    expired_auto_delete_days_were_deleted(){
        let items = getSpr(SPR.ITEMS).getValues('B4:B').flat().filter(n => n);
        this.test.assertEqualsArray(items, ['1 First', '2 Second', '3 Third', 'All 100', 'All 1', 'Green', 'Red', 'Test 100g', 'Test 1 serving', 'Yellow', 'ZZ Last']);
    }
}