class OpenSheetGivenSteps extends DayGivenSteps{
    last_finished_day_set_to(date){
        getRng(RNG.LAST_FINISHED_DAY).setValue(date);
        getObj(App).flush();
    }

    default_calorie_output_set_to(value){
        getRng(RNG.GENERAL_SETTINGS).setValue(value, 4);
    }

    automatic_macro_cycle_set_to(value){
        getRng(RNG.GENERAL_SETTINGS).setValue(value, 7);
    }
}

class OpenSheetWhenSteps extends Steps{
    sheet_opened(){
        this.onOpen();
    }  
}

class OpenSheetThenSteps extends DayThenSteps{

    day_changed_to(to){
        assertEquals(getRng(CBOX.DAY_NAME).getValue(), to);
    }

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

    new_day_calorie_output_set_to(day, expected){
        assertEquals(getSht(SHT.DAYS).getValue(`N${(day-1)*15 + 6}`), expected);
    }

    new_day_profile_set_to(day, expected){
        assertEquals(getSht(SHT.DAYS).getValue(`N${(day-1)*15 + 7}`), expected);
    }

    expired_auto_delete_days_were_deleted(){
        let items = getSht(SHT.ITEMS).getValues('B4:B').flat().filter(n => n);
        assertEqualsArray(items, ['1 First', '2 Second', '3 Third', 'All 100', 'All 1', 'Green', 'Red', 'Test 100g', 'Test 1 serving', 'Yellow', 'ZZ Last']);
    }
}