 class OpenSheetScenarios extends AcceptanceTestBase{

    constructor(){
      super(OpenSheetGivenSteps, OpenSheetWhenSteps, OpenSheetThenSteps);
    }

    clearData(){
        testData.addDefaultProfile();
        testData.clearItems();
        testData.clearDays();
        testData.clearDay();
        testData.clearHistory();
    }

    scenario_finish_day_after_one_day_with_auto_cycle_and_active_baseline(){
        this.scenario('Scenario Finish day run when one day passed since last run while auto cycle turned on and c output set to a baseline')
            .given()
                .test_items_available().and()
                .test_days_available(-3).and()
                .test_profiles_available().and()
                .day_filled_with_items().and()
                .calorie_output_set_to(3200).and()
                .profile_set_to('Test 2').and()
                .previous_day_set_to(3).and()
                .last_finished_day_set_to(getYesterday()).and()
                .default_calorie_output_set_to('Active baseline').and()
                .automatic_macro_cycle_set_to(true)
            .when()
                .sheet_opened()
            .then()
                .day_changed_to(getFormatedDay(0)).and()
                .future_available_days_as_expected(2).and()
                .archive_available_days_as_expected(2).and()
                .new_day_calorie_output_set_to(5, 2398).and()
                .new_day_profile_set_to(5, 'Test 7').and()
                .previous_day_saved(2).and()
                .saved_with_test_items().and()
                .saved_with_calorie_output(3200).and()
                .saved_with_profile('Test 2').and()
                .history_saved_for_prevous_day(getYesterday()).and()
                .history_have_calories_intake_as(5706).and()
                .history_have_calories_burned_as(3200).and()
                .history_have_calories_difference_as(-2506).and()
                .history_have_macros_as([975.1, 928.1, 938.1, 1099.1, 1033.1, 1017.2, 981.2, 1061.2, 1231]).and()
                .history_have_price_as(838.26).and()
                .history_have_calories_check_as('❌').and()
                .history_have_macro_check_as('❌').and()
                .history_have_calorie_density_check_as('✔️').and()
                .expired_auto_delete_days_were_deleted();
    }

    scenario_finish_day_after_one_day_with_auto_cycle_off_and_bmr(){
        this.scenario('Scenario Finish day run when two days passed since last run while auto cycle turned off and c output set to BMR')
            .given()
                .test_items_available().and()
                .test_days_available(-4).and()
                .test_profiles_available().and()
                .day_filled_with_items().and()
                .calorie_output_set_to(3200).and()
                .profile_set_to('Test 3').and()
                .previous_day_set_to(2).and()
                .last_finished_day_set_to(getRelativeDay(-2)).and()
                .default_calorie_output_set_to('BMR').and()
                .automatic_macro_cycle_set_to(false)
            .when()
                .sheet_opened()
            .then()
                .day_changed_to(getFormatedDay(0)).and()
                .future_available_days_as_expected(2).and()
                .archive_available_days_as_expected(2).and()
                .new_day_calorie_output_set_to(4, 1998).and()
                .new_day_calorie_output_set_to(5, 1998).and()
                .new_day_profile_set_to(4, 'Test 1').and()
                .new_day_profile_set_to(5, 'Test 1').and()
                .expired_auto_delete_days_were_deleted();
    }

    scenario_finish_day_after_five_days_with_auto_cycle_and_calorie_max_profile(){
        this.scenario('Scenario Finish day run when five day passed since last run while auto cycle turned on and c output set to max profile')
            .given()
                .test_items_available().and()
                .test_days_available(-8).and()
                .test_profiles_available().and()
                .day_filled_with_items().and()
                .calorie_output_set_to(3200).and()
                .profile_set_to('Test 2').and()
                .previous_day_set_to(3).and()
                .last_finished_day_set_to(getRelativeDay(-5)).and()
                .default_calorie_output_set_to('Calorie Max [Profile]').and()
                .automatic_macro_cycle_set_to(true)
            .when()
                .sheet_opened()
            .then()
                .day_changed_to(getFormatedDay(0)).and()
                .future_available_days_as_expected(2).and()
                .archive_available_days_as_expected(2).and()
                .new_day_calorie_output_set_to(1, 2000).and()
                .new_day_calorie_output_set_to(2, 3000).and()
                .new_day_calorie_output_set_to(3, 4000).and()
                .new_day_calorie_output_set_to(4, 5000).and()
                .new_day_calorie_output_set_to(5, 6000).and()
                .new_day_profile_set_to(1, 'Test 1').and()
                .new_day_profile_set_to(2, 'Test 2').and()
                .new_day_profile_set_to(3, 'Test 3').and()
                .new_day_profile_set_to(4, 'Test 4').and()
                .new_day_profile_set_to(5, 'Test 5').and()
                .history_saved_for_prevous_day(getRelativeDay(-6)).and()
                .history_have_calories_intake_as(5706).and()
                .history_have_calories_burned_as(3200).and()
                .history_have_calories_difference_as(-2506).and()
                .history_have_macros_as([975.1, 928.1, 938.1, 1099.1, 1033.1, 1017.2, 981.2, 1061.2, 1231]).and()
                .history_have_calories_check_as('❌').and()
                .history_have_macro_check_as('❌').and()
                .history_have_calorie_density_check_as('✔️').and()
                .expired_auto_delete_days_were_deleted();
    }

    scenario_finish_day_after_no_days(){
        this.scenario('Scenario Finish day run no days passed since last run')
            .given()
                .test_items_available().and()
                .test_days_available().and()
                .test_profiles_available().and()
                .previous_day_set_to(3).and()
                .last_finished_day_set_to(getToday()).and()
                .default_calorie_output_set_to('Active baseline').and()
                .automatic_macro_cycle_set_to(true)
            .when()
                .sheet_opened()
            .then()
                .day_changed_to(getFormatedDay(0));
    }

}

var runOpenSheetScenarios = () => new OpenSheetScenarios().runAllTests();