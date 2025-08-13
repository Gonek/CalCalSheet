 class DayScenarios extends AcceptanceTestBase{

    constructor(){
      super(DayGivenSteps, DayWhenSteps, DayThenSteps);
    }

    clearData(){
      testData.addDefaultProfile();
      testData.clearItems();
      testData.clearDays();
      testData.clearDay();
      testData.clearHistory();
    }

    scenario_change_day_to_yesterday(){
      this.scenario('Scenario Change day to Yesterday and check items, output calories, profile')
        .given()
          .test_items_available().and()
          .test_days_available().and()
          .test_profiles_available().and()
          .previous_day_set_to(3)
        .when()
          .day_changed(getFormatedDay(-1))
        .then()
          .items_of_day_loaded(Array.from({length:90},(v,k)=>['All 1', '', k+1])).and()
          .output_calories_loaded(2700).and()
          .profile_loaded('Test 3').and()
          .history_saved_for_prevous_day(getToday());
    }

    scenario_change_day_to_tomorrow(){
      this.scenario('Scenario Change day to Tomorrow and check items, output calories, profile')
        .given()
          .test_items_available().and()
          .test_days_available().and()
          .test_profiles_available().and()
          .previous_day_set_to(3)
        .when()
          .day_changed(getFormatedDay(+1))
        .then()
          .items_of_day_loaded(Array(90).fill(['', '', ''])).and()
          .output_calories_loaded(2900).and()
          .profile_loaded('Test 5').and()
          .history_saved_for_prevous_day(getToday());
    }

    scenario_change_day_to_prototype(){
      this.scenario('Scenario Change day to PROTOTYPE and check items, output calories, profile')
        .given()
          .test_items_available().and()
          .test_days_available().and()
          .test_profiles_available().and()
          .previous_day_set_to(3)
        .when()
          .day_changed('PROTOTYPE')
        .then()
          .items_of_day_loaded([... [['1 First', '', 100]], ... Array(14).fill(['', '', '']),
                                ... [['2 Second', '', 200]], ... Array(14).fill(['', '', '']),
                                ... [['3 Third', '', 300]], ... Array(14).fill(['', '', '']),
                                ... [['1 First', '', 400]], ... Array(14).fill(['', '', '']),
                                ... [['2 Second', '', 500]], ... Array(14).fill(['', '', '']),
                                ... [['3 Third', '', 600]], ... Array(14).fill(['', '', ''])]).and()
          .output_calories_loaded(2500).and()
          .profile_loaded('Test 1').and()
          .history_saved_for_prevous_day(getToday());
    }

    scenario_modify_day_change_to_other(){
      this.scenario('Scenario modify day then change to an other and check it changes saved and history saved')
        .given()
          .test_items_available().and()
          .test_days_available().and()
          .test_profiles_available().and()
          .day_filled_with_items().and()
          .calorie_output_set_to(4500).and()
          .profile_set_to('Test 5').and()
          .previous_day_set_to(2)
        .when()
          .day_changed(getFormatedDay(+1))
        .then()
          .previous_day_saved(2).and()
          .saved_with_test_items().and()
          .saved_with_calorie_output(4500).and()
          .saved_with_profile('Test 5').and()
          .history_saved_for_prevous_day(getYesterday()).and()
          .history_have_calories_intake_as(5706).and()
          .history_have_calories_burned_as(4500).and()
          .history_have_calories_difference_as(-1206).and()
          .history_have_macros_as([975.1, 928.1, 938.1, 1099.1, 1033.1, 1017.2, 981.2, 1061.2, 1231]).and()
          .history_have_calories_check_as('✔️').and()
          .history_have_macro_check_as('❌').and()
          .history_have_calorie_density_check_as('✔️');
    }

    scenario_inline_calculaton_calories(){
      this.scenario('Scenario calculate item weight using the inline calulator to achieve desired calories')
        .given()
          .test_items_available().and()
          .item_name_at_row_as(7, 'Test 100g')
        .when()
          .item_amouth_field_changed(7, 'c=100')
        .then()
          .item_amount_at_row_changed_to(7, 27);
    } 

    scenario_inline_calculaton_serving_calories(){
      this.scenario('Scenario calculate item weight using the inline calulator to achieve desired calories for and item using servings')
        .given()
          .test_items_available().and()
          .item_name_at_row_as(15, 'Test 1 serving')
        .when()
          .item_amouth_field_changed(15, 'c=125')
        .then()
          .item_amount_at_row_changed_to(15, 0.5);
    } 

    scenario_inline_calculaton_fat(){
      this.scenario('Scenario calculate item weight using the inline calulator to achieve desired total fat')
        .given()
          .test_items_available().and()
          .item_name_at_row_as(45, 'Test 100g')
        .when()
          .item_amouth_field_changed(45, 'fat=25')
        .then()
          .item_amount_at_row_changed_to(45, 250);
    } 

    scenario_inline_calculaton_carbohyrate(){
      this.scenario('Scenario calculate item weight using the inline calulator to achieve desired carbohydrate')
        .given()
          .test_items_available().and()
          .item_name_at_row_as(90, 'Test 100g')
        .when()
          .item_amouth_field_changed(90, 'car=55')
        .then()
          .item_amount_at_row_changed_to(90, 183.3);
    } 

    scenario_inline_calculaton_fiber(){
      this.scenario('Scenario calculate item weight using the inline calulator to achieve desired fiber')
        .given()
          .test_items_available().and()
          .item_name_at_row_as(28, 'Test 100g')
        .when()
          .item_amouth_field_changed(28, 'fib=10')
        .then()
          .item_amount_at_row_changed_to(28, 25);
    } 

    scenario_inline_calculaton_protein(){
      this.scenario('Scenario calculate item weight using the inline calulator to achieve desired protein')
        .given()
          .test_items_available().and()
          .item_name_at_row_as(1, 'Test 100g')
        .when()
          .item_amouth_field_changed(1, 'pro=35')
        .then()
          .item_amount_at_row_changed_to(1, 175);
    } 

    scenario_inline_calculaton_incorret(){
      this.scenario('Scenario Try to calculate item weight using the inline calulator while the formula incorret')
        .given()
          .test_items_available().and()
          .item_name_at_row_as(1, 'Test 100g')
        .when()
          .item_amouth_field_changed(1, 'xxx=231')
        .then()
          .item_amount_at_row_changed_to(1, '');
    } 

    scenario_no_inline_calculaton(){
      this.scenario('Scenario not doing inline calculation when no formula given')
        .given()
          .test_items_available().and()
          .item_name_at_row_as(1, 'Test 100g')
        .when()
          .item_amouth_field_changed(1, 851)
        .then()
          .item_amount_at_row_changed_to(1, 851);
    } 
}

var runDayScenarios = () => new DayScenarios().runAllTests();