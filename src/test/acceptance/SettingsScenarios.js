 class SettingsScenarios extends AcceptanceTestBase{

    constructor(){
      super(SettingsGivenSteps, SettingsWhenSteps, SettingsThenSteps);
    }

    clearData(){
      this.utils.resetSettings();
    }

    afterAll(){
      super.afterAll();
      this.utils.clearDays();
      getObj(SettingsService).applySettings();
    }

    scenario_every_field_turned_on_with_all_full_meals(){
      this.scenario('Every field turned on while having 6 pcs 15 size meals')
        .given()
          .test_days_available().and()
          .future_days_as(2).and()
          .archive_days_as(2).and()
          .default_calorie_output_as('Active baseline').and()
          .consumed_checkbox_as(true).and()
          .noom_as(true).and()
          .auto_macro_cycle_as(true).and()
          .macro_percentages_as(true).and()
          .nutrition_fields_as(true, true, true, true, true, true, true, true, true).and()
          .meals_as([['Meal1', 15], ['Meal2', 15], ['Meal3', 15], ['Meal4', 15], ['Meal5', 15], ['Meal6', 15]])
        .when()
          .apply_settings_clicked()
        .then()
          .future_available_days_as_expected(2).and()
          .archive_available_days_as_expected(2).and()
          .consumed_checkbox_visible(true).and()
          .noom_fields_visible_in_day_sheet(true).and()
          .noom_fields_visible_in_new_item_sheet(true).and()
          .noom_fields_visible_in_recipe_calculator_sheet(true).and()
          .noom_field_visible_in_items_sheet(true).and()
          .noom_field_visible_in_history_sheet(true).and()
          .percentage_used_for_macros(true).and()
          .nutrition_fields_visible_in_day_sheet(true, true, true, true, true, true, true, true, true).and()
          .nutrition_fields_visible_in_new_item_sheet(true, true, true, true, true, true, true, true, true).and()
          .nutrition_fields_visible_in_recipe_calulator_sheet(true, true, true, true, true, true, true, true, true).and()
          .nutrition_fields_visible_in_profile_sheet(true, true, true, true, true, true, true, true, true).and()
          .nutrition_fields_visible_in_items_sheet(true, true, true, true, true, true, true, true, true).and()
          .nutrition_fields_visible_in_history_sheet(true, true, true, true, true, true, true, true, true).and()
          .meals_changed_in_summary(['Meal1', 'Meal2', 'Meal3', 'Meal4', 'Meal5', 'Meal6']).and()
          .meals_changed_at_items([['Meal1', 15], ['Meal2', 15], ['Meal3', 15], ['Meal4', 15], ['Meal5', 15], ['Meal6', 15]]).and()
          .meals_changed_at_days(['Meal1', 'Meal2', 'Meal3', 'Meal4', 'Meal5', 'Meal6'])

    }

    scenario_every_field_turned_off_with_only_one_small_meal(){
      this.scenario('Every field turned of while having 1 pcs 5 size meals')
        .given()
          .test_days_available().and()
          .future_days_as(2).and()
          .archive_days_as(2).and()
          .default_calorie_output_as('Active baseline').and()
          .consumed_checkbox_as(false).and()
          .noom_as(false).and()
          .auto_macro_cycle_as(false).and()
          .macro_percentages_as(false).and()
          .nutrition_fields_as(false, false, false, false, false, false, false, false, false).and()
          .meals_as([['Only', 5], ['', ''], ['', ''], ['', ''], ['', ''], ['', '']])
        .when()
          .apply_settings_clicked()
        .then()
          .future_available_days_as_expected(2).and()
          .archive_available_days_as_expected(2).and()
          .consumed_checkbox_visible(false).and()
          .noom_fields_visible_in_day_sheet(false).and()
          .noom_fields_visible_in_new_item_sheet(false).and()
          .noom_fields_visible_in_recipe_calculator_sheet(false).and()
          .noom_field_visible_in_items_sheet(false).and()
          .noom_field_visible_in_history_sheet(false).and()
          .percentage_used_for_macros(false).and()
          .nutrition_fields_visible_in_day_sheet(false, false, false, false, false, false, false, false, false).and()
          .nutrition_fields_visible_in_new_item_sheet(false, false, false, false, false, false, false, false, false).and()
          .nutrition_fields_visible_in_recipe_calulator_sheet(false, false, false, false, false, false, false, false, false).and()
          .nutrition_fields_visible_in_profile_sheet(false, false, false, false, false, false, false, false, false).and()
          .nutrition_fields_visible_in_items_sheet(false, false, false, false, false, false, false, false, false).and()
          .nutrition_fields_visible_in_history_sheet(false, false, false, false, false, false, false, false, false).and()
          .meals_changed_in_summary(['Only', '', '', '', '', '']).and()
          .meals_changed_at_items([['Only', 5], ['', ''], ['', ''], ['', ''], ['', ''], ['', '']]).and()
          .meals_changed_at_days(['Only', '', '', '', '', ''])
    }

    scenario_change_to_max_future_and_archive_days(){
      this.scenario('Future and archive days set to 30')
        .given()
          .test_days_available().and()
          .future_days_as(30).and()
          .archive_days_as(30)
        .when()
          .apply_settings_clicked()
        .then()
          .future_available_days_as_expected(30).and()
          .archive_available_days_as_expected(2)
    }

    scenario_change_to_one_future_and_archive_days(){
      this.scenario('Future and archive days set to 1')
        .given()
          .test_days_available().and()
          .future_days_as(1).and()
          .archive_days_as(1)
        .when()
          .apply_settings_clicked()
        .then()
          .future_available_days_as_expected(1).and()
          .archive_available_days_as_expected(1)
    }
}

var runSettingsScenarios = () => new SettingsScenarios().runAllTests();