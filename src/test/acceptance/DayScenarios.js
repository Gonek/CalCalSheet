 class DayScenarios extends AcceptanceTestBase{

    constructor(){
      super(DayGivenSteps, DayWhenSteps, DayThenSteps);
    }

    clearData(){
      testData.clearItems();
      testData.clearDays();
      testData.clearMeals();
      testData.clearDay();
      testData.clearHistory();
      testData.addDefaultProfile();
    }

    scenario_change_day_to_yesterday(){
      this.scenario('Scenario Change day to Yesterday and check items, output calories, profile')
        .given()
          .test_items_available().and()
          .test_days_available().and()
          .test_profiles_available().and()
          .previous_day_set_to(3)
        .when()
          .day_changed(2)
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
          .day_changed(4)
        .then()
          .items_of_day_loaded(Array(90).fill(['', '', ''])).and()
          .output_calories_loaded(2900).and()
          .profile_loaded('Test 5').and()
          .history_saved_for_prevous_day(getToday());
    }

    scenario_change_day_to_default(){
      this.scenario('Scenario Change day to Default and check items, output calories, profile')
        .given()
          .test_items_available().and()
          .test_days_available().and()
          .test_profiles_available().and()
          .previous_day_set_to(3)
        .when()
          .day_changed(0)
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
      this.scenario('Scenario modify day then change to an other and check it changes saved ands history saved')
        .given()
          .test_items_available().and()
          .test_days_available().and()
          .test_profiles_available().and()
          .day_filled_with_items().and()
          .calorie_output_set_to(4500).and()
          .profile_set_to('Test 5').and()
          .previous_day_set_to(2)
        .when()
          .day_changed(3)
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

    scenario_select_meal_for_meal_1(){
      this.scenario('Scenario Select meal for meal 1 load items')
        .given()
          .test_items_available().and()
          .test_meals_available()
        .when()
          .meal_selected_in_meal_no_(1, '🥣 Meal1')
        .then()
          .meal_loaded_to_meal_no_(1, [['1 First', '', 10],
                                       ['2 Second', '', 20],
                                       ['3 Third', '', 30],
                                       ['ZZ Last', '', 99],
                                       ['1 First', '', 110],
                                       ['2 Second', '', 120],
                                       ['3 Third', '', 130],
                                       ['ZZ Last', '', 199],
                                       ['1 First', '', 210],
                                       ['2 Second', '', 220],
                                       ['3 Third', '', 230],
                                       ['ZZ Last', '', 299],
                                       ['1 First', '', 310],
                                       ['2 Second', '', 320],
                                       ['3 Third', '', 330]])
    }

    scenario_select_meal_for_meal_2(){
      this.scenario('Scenario Select meal for meal 2 load items')
        .given()
          .test_items_available().and()
          .test_meals_available()
        .when()
          .meal_selected_in_meal_no_(2, '🥣 Meal1')
        .then()
          .meal_loaded_to_meal_no_(2, [['1 First', '', 10],
                                       ['2 Second', '', 20],
                                       ['3 Third', '', 30],
                                       ['ZZ Last', '', 99],
                                       ['1 First', '', 110],
                                       ['2 Second', '', 120],
                                       ['3 Third', '', 130],
                                       ['ZZ Last', '', 199],
                                       ['1 First', '', 210],
                                       ['2 Second', '', 220],
                                       ['3 Third', '', 230],
                                       ['ZZ Last', '', 299],
                                       ['1 First', '', 310],
                                       ['2 Second', '', 320],
                                       ['3 Third', '', 330]])
    }

    scenario_select_meal_for_meal_3(){
      this.scenario('Scenario Select meal for meal 3 load items')
        .given()
          .test_items_available().and()
          .test_meals_available()
        .when()
          .meal_selected_in_meal_no_(3, '🥣 Meal1')
        .then()
          .meal_loaded_to_meal_no_(3, [['1 First', '', 10],
                                       ['2 Second', '', 20],
                                       ['3 Third', '', 30],
                                       ['ZZ Last', '', 99],
                                       ['1 First', '', 110],
                                       ['2 Second', '', 120],
                                       ['3 Third', '', 130],
                                       ['ZZ Last', '', 199],
                                       ['1 First', '', 210],
                                       ['2 Second', '', 220],
                                       ['3 Third', '', 230],
                                       ['ZZ Last', '', 299],
                                       ['1 First', '', 310],
                                       ['2 Second', '', 320],
                                       ['3 Third', '', 330]])
    }

    scenario_select_meal_for_meal_4(){
      this.scenario('Scenario Select meal for meal 4 load items')
        .given()
          .test_items_available().and()
          .test_meals_available()
        .when()
          .meal_selected_in_meal_no_(4, '🥣 Meal1')
        .then()
          .meal_loaded_to_meal_no_(4, [['1 First', '', 10],
                                       ['2 Second', '', 20],
                                       ['3 Third', '', 30],
                                       ['ZZ Last', '', 99],
                                       ['1 First', '', 110],
                                       ['2 Second', '', 120],
                                       ['3 Third', '', 130],
                                       ['ZZ Last', '', 199],
                                       ['1 First', '', 210],
                                       ['2 Second', '', 220],
                                       ['3 Third', '', 230],
                                       ['ZZ Last', '', 299],
                                       ['1 First', '', 310],
                                       ['2 Second', '', 320],
                                       ['3 Third', '', 330]])
    }

    scenario_select_meal_for_meal_5(){
      this.scenario('Scenario Select meal for meal 5 load items')
        .given()
          .test_items_available().and()
          .test_meals_available()
        .when()
          .meal_selected_in_meal_no_(5, '🥣 Meal1')
        .then()
          .meal_loaded_to_meal_no_(5, [['1 First', '', 10],
                                       ['2 Second', '', 20],
                                       ['3 Third', '', 30],
                                       ['ZZ Last', '', 99],
                                       ['1 First', '', 110],
                                       ['2 Second', '', 120],
                                       ['3 Third', '', 130],
                                       ['ZZ Last', '', 199],
                                       ['1 First', '', 210],
                                       ['2 Second', '', 220],
                                       ['3 Third', '', 230],
                                       ['ZZ Last', '', 299],
                                       ['1 First', '', 310],
                                       ['2 Second', '', 320],
                                       ['3 Third', '', 330]])
    }

    scenario_select_meal_for_meal_6(){
      this.scenario('Scenario Select meal for meal 6 load items')
        .given()
          .test_items_available().and()
          .test_meals_available()
        .when()
          .meal_selected_in_meal_no_(6, '🥣 Meal1')
        .then()
          .meal_loaded_to_meal_no_(6, [['1 First', '', 10],
                                       ['2 Second', '', 20],
                                       ['3 Third', '', 30],
                                       ['ZZ Last', '', 99],
                                       ['1 First', '', 110],
                                       ['2 Second', '', 120],
                                       ['3 Third', '', 130],
                                       ['ZZ Last', '', 199],
                                       ['1 First', '', 210],
                                       ['2 Second', '', 220],
                                       ['3 Third', '', 230],
                                       ['ZZ Last', '', 299],
                                       ['1 First', '', 310],
                                       ['2 Second', '', 320],
                                       ['3 Third', '', 330]])
    }

    scenario_copy_all_meals_to_tomorrow(){
      this.scenario('Scenario Copy all meals to Tomorrow and the day after tomorrow')
        .given()
          .test_days_available().and()
          .test_items_available().and()
          .day_filled_with_items().and()
          .copy_from_as([1,2,3,4,5,6]).and()
          .copy_to_as(4)
        .when()
          .copy_meal_clicked()
        .then()
          .meal_copied(4, 1, [['1 First', 50], ['All 100', 100], ['All Green', 1000], ['', ''], ['', ''], ['Yellow', 50]]).and()
          .meal_copied(4, 2, [['2 Second', 85], ['All 1', 25], ['Test 1 serving', 2], ['Test 100g', 200]]).and()
          .meal_copied(4, 3, [['3 Third', 100], ['Yellow', 110], ['Zero cal',  2500], ['Green', 10], 
                              ['Green', 11], ['Green', 12], ['Green', 13], ['Green', 14], 
                              ['Green', 15], ['Green', 16], ['Green', 17], ['Green', 18], 
                              ['Green', 19], ['Green', 20], ['Green', 21]]).and()
          .meal_copied(4, 4, [['1 First', 20], ['Yellow', 1000]]).and()
          .meal_copied(4, 5, []).and()
          .meal_copied(4, 6, [['ZZ Last', 225], ['Max cal', 10], ['Red', 55]])
    }

    scenario_copy_one_meals_to_yesterday(){
      this.scenario('Scenario Copy one meal to Yesterday ( replacing the existing one )')
        .given()
          .test_days_available().and()
          .test_items_available().and()
          .day_filled_with_items().and()
          .copy_from_as([3]).and()
          .copy_to_as(2)
        .when()
          .copy_meal_clicked()
        .then()
          .meal_copied(2, 3, [['3 Third', 100], ['Yellow', 110], ['Zero cal',  2500], ['Green', 10], 
                              ['Green', 11], ['Green', 12], ['Green', 13], ['Green', 14], 
                              ['Green', 15], ['Green', 16], ['Green', 17], ['Green', 18], 
                              ['Green', 19], ['Green', 20], ['Green', 21]])
    }

    scenario_copy_meals_to_default_day(){
      this.scenario('Scenario Copy meals to Default day')
        .given()
          .test_days_available().and()
          .test_items_available().and()
          .day_filled_with_items().and()
          .copy_from_as([2,4]).and()
          .copy_to_as(0)
        .when()
          .copy_meal_clicked()
        .then()
          .meal_copied(0, 2, [['2 Second', 85], ['All 1', 25], ['Test 1 serving', 2], ['Test 100g', 200]]).and()
          .meal_copied(0, 4, [['1 First', 20], ['Yellow', 1000]])
    }

    scenario_save_meal3_to_meals(){
      this.scenario('Scenario Save Meal3 to meals')
        .given()
          .test_items_available().and()
          .day_filled_with_items().and()
          .save_from_as_meal_no_(3).and()
          .save_as_as('New meal')
        .when()
          .save_meal_clicked()
        .then()
          .meal_saved_with_name('🥣 New meal').and()
          .meal_have_items([['3 Third', 100], ['Yellow', 110], ['Zero cal',  2500], 
                            ['Green', 10], ['Green', 11], ['Green', 12], ['Green', 13], 
                            ['Green', 14], ['Green', 15], ['Green', 16], ['Green', 17], 
                            ['Green', 18], ['Green', 19], ['Green', 20], ['Green', 21]])
    }

    scenario_save_meal1_to_meals(){
      this.scenario('Scenario Save Meal with holes to meals')
        .given()
          .test_items_available().and()
          .day_filled_with_items().and()
          .save_from_as_meal_no_(1).and()
          .save_as_as('Hole meal')
        .when()
          .save_meal_clicked()
        .then()
          .meal_saved_with_name('🥣 Hole meal').and()
          .meal_have_items([['1 First', 50], ['All 100', 100], ['All Green', 1000], ['Yellow', 50]])
    }

    scenario_save_meal_replace_existing_meal_with_same_name(){
      this.scenario('Scenario Save meal replace existing meal with same name')
        .given()
          .test_items_available().and()
          .day_filled_with_items().and()
          .save_from_as_meal_no_(6).and()
          .save_as_as('Meal2')
        .when()
          .save_meal_clicked()
        .then()
          .meal_saved_with_name('🥣 Meal2').and()
          .meal_have_items([['ZZ Last', 225], ['Max cal', 10], ['Red', 55]])
    }

    scenario_save_meal_save_as_load_meal_name_at_meal_no(){
      this.scenario('Scenario Save meal load name to save as field')
        .given()
          .test_items_available().and()
          .test_meals_available()
        .when()
          .meal_selected_in_meal_no_(1, '🥣 Meal1')
        .given()
          .save_from_as_meal_no_(1)
        .then()
          .meal_save_as_filled_with_name('Meal1')
    }

    scenario_save_meal_without_items(){
      this.scenario('Scenario Save meal without items')
        .given()
          .test_items_available().and()
          .day_filled_with_items().and()
          .save_from_as_meal_no_(5).and()
          .save_as_as('No items meal')
        .when()
          .save_meal_clicked()
        .then()
          .no_meal_saved_with_name('🥣 No items meal')
    }

    scenario_save_meal_without_name(){
      this.scenario('Scenario Save meal without name')
        .given()
          .test_items_available().and()
          .day_filled_with_items().and()
          .save_from_as_meal_no_(2).and()
          .save_as_as('')
        .when()
          .save_meal_clicked()
        .then()
          .no_meal_saved_with_name('🥣 ')
    }
}

var runDayScenarios = () => new DayScenarios().runAllTests();