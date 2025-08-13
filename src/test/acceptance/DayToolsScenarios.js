 class DayToolsScenarios extends AcceptanceTestBase{

    constructor(){
      super(DayToolsGivenSteps, DayToolsWhenSteps, DayToolsThenSteps);
    }

    clearData(){
      testData.addDefaultProfile();
      testData.clearItems();
      testData.clearDays();
      testData.clearMeals();
      testData.clearDay();
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

    scenario_save_current_day_as_new_template(){
      this.scenario('Scenario save current day as a new Template day')
        .given()
          .test_items_available().and()
          .test_days_available().and()
          .day_filled_with_items().and()
          .save_day_as('New template')
        .when()
          .save_day_clicked()
        .then()
          .day_template_saved_with_name('New template').and()
          .saved_with_test_items().and()
          .saved_with_calorie_output(2330).and()
          .saved_with_profile('Default');
    }

    scenario_save_current_day_as_existing_template(){
      this.scenario('Scenario save current day with an existing Template day name to replace it')
        .given()
          .test_items_available().and()
          .test_days_available().and()
          .day_filled_with_items().and()
          .save_day_as('All 1 Day')
        .when()
          .save_day_clicked()
        .then()
          .day_template_saved_with_name('All 1 Day').and()
          .saved_with_test_items().and()
          .saved_with_calorie_output(2330).and()
          .saved_with_profile('Default');
    }

    scenario_save_current_day_without_name(){
      this.scenario('Scenario try to save current day without giving a name to it')
        .given()
          .test_items_available().and()
          .test_days_available().and()
          .day_filled_with_items().and()
          .save_day_as('')
        .when()
          .save_day_clicked()
        .then()
          .number_of_day_templates_as(3);
    }

    scenario_save_current_as_template_without_items(){
      this.scenario('Scenario save current day as template without any items')
        .given()
          .test_items_available().and()
          .test_days_available().and()
          .save_day_as('Empty template')
        .when()
          .save_day_clicked()
        .then()
          .day_template_saved_with_name('Empty template').and()
          .saved_with_no_items();
    }

    scenario_load_template(){
      this.scenario('Scenario load template day to current day')
        .given()
          .test_profiles_available().and()
          .test_items_available().and()
          .test_days_available().and()
          .load_day_as('All 1 day')
        .when()
          .load_day_clicked()
        .then()
          .items_of_day_loaded(Array(90).fill(['All 1', '', 1])).and()
          .output_calories_loaded(3500).and()
          .profile_loaded('Test 6');
    }

    scenario_load_template_if_no_day_selected(){
      this.scenario('Scenario try to load template day to current day without selecting a day')
        .given()
          .test_items_available().and()
          .test_days_available().and()
          .load_day_as('')
        .when()
          .load_day_clicked()
        .then()
          .items_of_day_loaded(Array(90).fill(['', '', ''])).and()
          .output_calories_loaded(2330).and()
          .profile_loaded('Default');
    }

    scenario_delete_selected_day(){
      this.scenario('Delete one selected template day')
        .given()
          .test_days_available().and()
          .delete_days_as('Boring Day')
        .when()
          .delete_days_clicked()
        .then() 
          .day_template_with_name_got_removed('Boring Day').and()
          .number_of_day_templates_as(2);
    }

    scenario_delete_multiple_selected_days(){
      this.scenario('Scenario delete muliple selected template days')
        .given()
          .test_days_available().and()
          .delete_days_as('Boring Day, All 1 Day')
        .when()
          .delete_days_clicked()
        .then() 
          .day_template_with_name_got_removed('Boring Day').and()
          .day_template_with_name_got_removed('All 1 Day').and()
          .number_of_day_templates_as(1);
    }

    scenario_delete_day_when_no_day_selected(){
      this.scenario('Scenario try to delete template days without selecting any')
        .given()
          .test_days_available().and()
          .delete_days_as('')
        .when()
          .delete_days_clicked()
        .then() 
          .number_of_day_templates_as(3);
    }

    scenario_clear_day(){
      this.scenario('Scenario clear the current day')
        .given()
          .test_items_available().and()
          .day_filled_with_items()
        .when()
          .clear_day_clicked()
        .then()
          .items_of_day_loaded(Array(90).fill(['', '', '']));
    }

    scenario_save_meal3_to_meals(){
      this.scenario('Scenario Save Meal3 to meals')
        .given()
          .test_items_available().and()
          .day_filled_with_items().and()
          .selected_meals_as([3]).and()
          .save_meals_as('New meal')
        .when()
          .save_meal_clicked()
        .then()
          .meal_saved_with_name('🥣 New meal').and()
          .meal_have_items([['3 Third', 100], ['Yellow', 110], ['Zero cal',  2500], 
                            ['Green', 10], ['Green', 11], ['Green', 12], ['Green', 13], 
                            ['Green', 14], ['Green', 15], ['Green', 16], ['Green', 17], 
                            ['Green', 18], ['Green', 19], ['Green', 20], ['Green', 21]])
    }

    scenario_save_muliple_meals(){
      this.scenario('Scenario save muliple selected meals with the given names')
        .given()
          .test_items_available().and()
          .day_filled_with_items().and()
          .selected_meals_as([1,2,6]).and()
          .save_meals_as('New meal, Next meal, Last meal')
        .when()
          .save_meal_clicked()
        .then()
          .meal_saved_with_name('🥣 New meal').and()
          .meal_have_items([['1 First', 50], ['All 100', 100], ['All Green', 1000], ['Yellow', 50]]).and()
          .meal_saved_with_name('🥣 Next meal').and()
          .meal_have_items([['2 Second', 85], ['All 1', 25], ['Test 1 serving', 2], ['Test 100g', 200]]).and()
          .meal_saved_with_name('🥣 Last meal').and()
          .meal_have_items([['ZZ Last', 225], ['Max cal', 10], ['Red', 55]]);
    }

    scenario_save_meal1_to_meals(){
      this.scenario('Scenario Save Meal with holes to meals')
        .given()
          .test_items_available().and()
          .day_filled_with_items().and()
          .selected_meals_as([1]).and()
          .save_meals_as('Hole meal')
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
          .selected_meals_as([6]).and()
          .save_meals_as('Meal2')
        .when()
          .save_meal_clicked()
        .then()
          .meal_saved_with_name('🥣 Meal2').and()
          .meal_have_items([['ZZ Last', 225], ['Max cal', 10], ['Red', 55]])
    }

    scenario_save_muliple_meals_one_already_exist(){
      this.scenario('Scenario save muliple selected meals with the given names while one name allready exist')
        .given()
          .test_items_available().and()
          .day_filled_with_items().and()
          .selected_meals_as([1,2]).and()
          .save_meals_as('Meal2, New meal')
        .when()
          .save_meal_clicked()
        .then()
          .meal_saved_with_name('🥣 Meal2').and()
          .meal_have_items([['1 First', 50], ['All 100', 100], ['All Green', 1000], ['Yellow', 50]]).and()
          .meal_saved_with_name('🥣 New meal').and()
          .meal_have_items([['2 Second', 85], ['All 1', 25], ['Test 1 serving', 2], ['Test 100g', 200]]);
    }

    scenario_save_muliple_meals_while_less_name_given(){
      this.scenario('Scenario save muliple selected meals while not enougth name given')
        .given()
          .test_items_available().and()
          .day_filled_with_items().and()
          .selected_meals_as([1,6]).and()
          .save_meals_as('New meal')
        .when()
          .save_meal_clicked()
        .then()
          .meal_saved_with_name('🥣 New meal').and()
          .meal_have_items([['1 First', 50], ['All 100', 100], ['All Green', 1000], ['Yellow', 50]]);
    }

    scenario_save_muliple_meals_while_more_name_given(){
      this.scenario('Scenario save muliple selected meals while too much name given')
        .given()
          .test_items_available().and()
          .day_filled_with_items().and()
          .selected_meals_as([1]).and()
          .save_meals_as('New meal, Next meal, Last meal')
        .when()
          .save_meal_clicked()
        .then()
          .meal_saved_with_name('🥣 New meal').and()
          .meal_have_items([['1 First', 50], ['All 100', 100], ['All Green', 1000], ['Yellow', 50]]).and()
          .no_meal_exist_with_name('🥣 Next meal').and()
          .no_meal_exist_with_name('🥣 Last meal');
    }

    scenario_save_meal_without_items(){
      this.scenario('Scenario Save meal without items')
        .given()
          .test_items_available().and()
          .day_filled_with_items().and()
          .selected_meals_as([5]).and()
          .save_meals_as('No items meal')
        .when()
          .save_meal_clicked()
        .then()
          .no_meal_exist_with_name('🥣 No items meal')
    }

    scenario_save_meal_without_name(){
      this.scenario('Scenario Save meal without name')
        .given()
          .test_items_available().and()
          .day_filled_with_items().and()
          .selected_meals_as([2]).and()
          .save_meals_as('')
        .when()
          .save_meal_clicked()
        .then()
          .no_meal_exist_with_name('🥣 ')
    }

    scenario_copy_all_meals_from_yesterday(){
      this.scenario('Scenario Copy all meals from Yesterday')
        .given()
          .test_items_available().and()
          .test_days_available().and()
          .day_filled_with_items().and()
          .selected_meals_as([1,2,3,4,5,6]).and()
          .copy_meals_from_as(getFormatedDay(-1))
        .when()
          .copy_meals_from_clicked()
        .then()
          .meal_loaded_to_meal_no_(1, Array.from({length:15},(v,k)=>['All 1', '', k + 1])).and()
          .meal_loaded_to_meal_no_(2, Array.from({length:15},(v,k)=>['All 1', '', k + 16])).and()
          .meal_loaded_to_meal_no_(3, Array.from({length:15},(v,k)=>['All 1', '', k + 31])).and()
          .meal_loaded_to_meal_no_(4, Array.from({length:15},(v,k)=>['All 1', '', k + 46])).and()
          .meal_loaded_to_meal_no_(5, Array.from({length:15},(v,k)=>['All 1', '', k + 61])).and()
          .meal_loaded_to_meal_no_(6, Array.from({length:15},(v,k)=>['All 1', '', k + 76]));
    }

    scenario_copy_one_meal_from_prototype(){
      this.scenario('Scenario Copy Lunch from Prototype')        
        .given()
          .test_items_available().and()
          .test_days_available().and()
          .day_filled_with_items().and()
          .selected_meals_as([3]).and()
          .copy_meals_from_as('PROTOTYPE')
        .when()
          .copy_meals_from_clicked()
        .then()
          .items_not_changed_for_meal_no_(1).and()
          .items_not_changed_for_meal_no_(2).and()
          .meal_loaded_to_meal_no_(3, [['3 Third', '', 300]]).and()
          .items_not_changed_for_meal_no_(4).and()
          .items_not_changed_for_meal_no_(5).and()
          .items_not_changed_for_meal_no_(6);
    }

    scenario_copy_meals_from_when_no_day_selected(){
      this.scenario('Scenario Try to copy meals from when no day selected')
        .given()
          .test_items_available().and()
          .test_days_available().and()
          .day_filled_with_items().and()
          .selected_meals_as([1,3]).and()
          .copy_meals_from_as('')
        .when()
          .copy_meals_from_clicked()
        .then()
          .items_are_not_changed();
    }

    scenario_copy_meals_from_when_no_meal_selected(){
      this.scenario('Scenario Try to copy meals from when no meals selected')
        .given()
          .test_items_available().and()
          .test_days_available().and()
          .day_filled_with_items().and()
          .selected_meals_as([]).and()
          .copy_meals_from_as(getFormatedDay(-2))
        .when()
          .copy_meals_from_clicked()
        .then()
          .items_are_not_changed();
    }

    scenario_copy_all_meals_to_tomorrow(){
      this.scenario('Scenario Copy all meals to Tomorrow and the day after tomorrow')
        .given()
          .test_days_available().and()
          .test_items_available().and()
          .day_filled_with_items().and()
          .selected_meals_as([1,2,3,4,5,6]).and()
          .copy_meals_to_as(getFormatedDay(1))
        .when()
          .copy_meals_to_clicked()
        .then()
          .meal_copied_to_calendar_day(4, 1, [['1 First', 50], ['All 100', 100], ['All Green', 1000], ['', ''], ['', ''], ['Yellow', 50]]).and()
          .meal_copied_to_calendar_day(4, 2, [['2 Second', 85], ['All 1', 25], ['Test 1 serving', 2], ['Test 100g', 200]]).and()
          .meal_copied_to_calendar_day(4, 3, [['3 Third', 100], ['Yellow', 110], ['Zero cal',  2500], ['Green', 10], 
                                              ['Green', 11], ['Green', 12], ['Green', 13], ['Green', 14], 
                                              ['Green', 15], ['Green', 16], ['Green', 17], ['Green', 18], 
                                              ['Green', 19], ['Green', 20], ['Green', 21]]).and()
          .meal_copied_to_calendar_day(4, 4, [['1 First', 20], ['Yellow', 1000]]).and()
          .meal_copied_to_calendar_day(4, 5, []).and()
          .meal_copied_to_calendar_day(4, 6, [['ZZ Last', 225], ['Max cal', 10], ['Red', 55]])
    }

    scenario_copy_one_meals_to_yesterday(){
      this.scenario('Scenario Copy one meal to Yesterday ( replacing the existing one )')
        .given()
          .test_days_available().and()
          .test_items_available().and()
          .day_filled_with_items().and()
          .selected_meals_as([3]).and()
          .copy_meals_to_as(getFormatedDay(-1))
        .when()
          .copy_meals_to_clicked()
        .then()
          .meal_copied_to_calendar_day(2, 3, [['3 Third', 100], ['Yellow', 110], ['Zero cal',  2500], ['Green', 10], 
                                              ['Green', 11], ['Green', 12], ['Green', 13], ['Green', 14], 
                                              ['Green', 15], ['Green', 16], ['Green', 17], ['Green', 18], 
                                              ['Green', 19], ['Green', 20], ['Green', 21]])
    }

    scenario_copy_meals_to_protorype_day(){
      this.scenario('Scenario Copy meals to Prototype day')
        .given()
          .test_days_available().and()
          .test_items_available().and()
          .day_filled_with_items().and()
          .selected_meals_as([2,4]).and()
          .copy_meals_to_as('PROTOTYPE')
        .when()
          .copy_meals_to_clicked()
        .then()
          .meal_copied_to_template_day(1, 2, [['2 Second', 85], ['All 1', 25], ['Test 1 serving', 2], ['Test 100g', 200]]).and()
          .meal_copied_to_template_day(1, 4, [['1 First', 20], ['Yellow', 1000]])
    }

    scenario_copy_meals_to_when_no_day_selected(){
      this.scenario('Scenario Try to copy meals to when no day selected');
    }

    scenario_copy_meals_to_when_no_meal_selected(){
      this.scenario('Scenario Try to copy meals to when no meals selected');
    }

    scenario_clear_multiple_meals(){
      this.scenario('Scenario clear muliple meals from current day')
        .given()
          .test_items_available().and()
          .test_days_available().and()
          .day_filled_with_items().and()
          .selected_meals_as([1,3])
        .when()
          .clear_meals_clicked()
        .then()
          .meal_loaded_to_meal_no_(1, [['', '', '']]).and()
          .items_not_changed_for_meal_no_(2).and()
          .meal_loaded_to_meal_no_(3, [['', '', '']]).and()
          .items_not_changed_for_meal_no_(4).and()
          .items_not_changed_for_meal_no_(5).and()
          .items_not_changed_for_meal_no_(6);
    }

    scenario_clear_meals_when_no_meal_selected(){
      this.scenario('Scenario try to clear the meals from current day when no meals selected')
        .given()
          .test_items_available().and()
          .test_days_available().and()
          .day_filled_with_items().and()
          .selected_meals_as([])
        .when()
          .clear_meals_clicked()
        .then()
          .items_not_changed_for_meal_no_(1).and()
          .items_not_changed_for_meal_no_(2).and()
          .items_not_changed_for_meal_no_(3).and()
          .items_not_changed_for_meal_no_(4).and()
          .items_not_changed_for_meal_no_(5).and()
          .items_not_changed_for_meal_no_(6);
    }

    scenario_delete_one_meal(){
      this.scenario('Scenario delete one selected meal')
        .given()
          .test_meals_available().and()
          .delete_meals_as('🥣 Meal1')
        .when()
          .delete_meals_clicked()
        .then()
          .no_meal_exist_with_name('🥣 Meal1');
    }

    scenario_delete_muliple_meals(){
      this.scenario('Scenario delete multiple selected meals')
        .given()
          .test_meals_available().and()
          .delete_meals_as('🥣 Meal1, 🥣 Meal0')
        .when()
          .delete_meals_clicked()
        .then()
          .no_meal_exist_with_name('🥣 Meal1').and()
          .no_meal_exist_with_name('🥣 Meal0');
    }

    scenario_delete_one_meal_without_selecting_any_meal(){
      this.scenario('Scenario Try to delete meals without selecting any')
        .given()
          .test_meals_available().and()
          .delete_meals_as('')
        .when()
          .delete_meals_clicked()
        .then()
          .number_of_meals_are(3);
    }
}

var runDayToolsScenarios = () => new DayToolsScenarios().runAllTests();