 class SettingsScenarios extends AcceptanceTestBase{

    constructor(){
      super(SettingsGivenSteps, SettingsWhenSteps, SettingsThenSteps);
    }

    clearData(){
      testData.resetSettings();
    }

    afterAll(){
      super.afterAll();
      testData.clearDays();
      getObj(SettingsService).applySettings();
    }

    scenario_every_field_turned_on_with_all_full_meals(){
      this.scenario('Every field turned on while having 6 pcs 15 size meals')
        .given()
          .test_days_available().and()
          .future_days_as(2).and()
          .archive_days_as(2).and()
          .price_calulation_as(true).and()
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
          .price_field_visible_in_day_sheet(true).and()
          .price_fields_visible_in_new_item_sheet(true).and()
          .price_field_visible_in_recipe_calculator_sheet(true).and()
          .price_field_visible_in_items_sheet(true).and()
          .price_field_visible_in_history_sheet(true).and()
          .noom_fields_visible_in_day_sheet(true).and()
          .noom_fields_visible_in_new_item_sheet(true).and()
          .noom_fields_visible_in_recipe_calculator_sheet(true).and()
          .noom_field_visible_in_items_sheet(true).and()
          .percentage_used_for_macros(true).and()
          .nutrition_fields_visible_in_day_sheet(true, true, true, true, true, true, true, true, true).and()
          .nutrition_fields_visible_in_new_item_sheet(true, true, true, true, true, true, true, true, true).and()
          .nutrition_fields_visible_in_recipe_calulator_sheet(true, true, true, true, true, true, true, true, true).and()
          .nutrition_fields_visible_in_profile_sheet(true, true, true, true, true, true, true, true, true).and()
          .nutrition_fields_visible_in_items_sheet(true, true, true, true, true, true, true, true, true).and()
          .nutrition_fields_visible_in_history_sheet(true, true, true, true, true, true, true, true, true).and()
          .meals_changed_in_summary(['Meal1', 'Meal2', 'Meal3', 'Meal4', 'Meal5', 'Meal6']).and()
          .meals_changed_at_items([['Meal1', 15], ['Meal2', 15], ['Meal3', 15], ['Meal4', 15], ['Meal5', 15], ['Meal6', 15]]).and()
          .meals_changed_for_calendar_days(['Meal1', 'Meal2', 'Meal3', 'Meal4', 'Meal5', 'Meal6']).and()
          .meals_changed_for_template_days(['Meal1', 'Meal2', 'Meal3', 'Meal4', 'Meal5', 'Meal6'])

    }

    scenario_every_field_turned_off_with_only_one_small_meal(){
      this.scenario('Every field turned of while having 1 pcs 5 size meals')
        .given()
          .test_days_available().and()
          .future_days_as(2).and()
          .archive_days_as(2).and()
          .price_calulation_as(false).and()
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
          .price_field_visible_in_day_sheet(false).and()
          .price_fields_visible_in_new_item_sheet(false).and()
          .price_field_visible_in_recipe_calculator_sheet(false).and()
          .price_field_visible_in_items_sheet(false).and()
          .price_field_visible_in_history_sheet(false).and()
          .noom_fields_visible_in_day_sheet(false).and()
          .noom_fields_visible_in_new_item_sheet(false).and()
          .noom_fields_visible_in_recipe_calculator_sheet(false).and()
          .noom_field_visible_in_items_sheet(false).and()
          .percentage_used_for_macros(false).and()
          .nutrition_fields_visible_in_day_sheet(false, false, false, false, false, false, false, false, false).and()
          .nutrition_fields_visible_in_new_item_sheet(false, false, false, false, false, false, false, false, false).and()
          .nutrition_fields_visible_in_recipe_calulator_sheet(false, false, false, false, false, false, false, false, false).and()
          .nutrition_fields_visible_in_profile_sheet(false, false, false, false, false, false, false, false, false).and()
          .nutrition_fields_visible_in_items_sheet(false, false, false, false, false, false, false, false, false).and()
          .nutrition_fields_visible_in_history_sheet(false, false, false, false, false, false, false, false, false).and()
          .meals_changed_in_summary(['Only', '', '', '', '', '']).and()
          .meals_changed_at_items([['Only', 5], ['', ''], ['', ''], ['', ''], ['', ''], ['', '']]).and()
          .meals_changed_for_calendar_days(['Only', '', '', '', '', '']).and()
          .meals_changed_for_template_days(['Only', '', '', '', '', ''])
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

    scenario_change_localisation_to_US(){
      this.scenario('Change localisation to the US')
        .given()
          .language_as('English').and()
          .time_zone_as('_-7').and()
          .date_format_as('MM/DD/YYYY').and()
          .measurement_as('Imperial').and()
          .currency_as('$')
        .when()
          .apply_settings_clicked()
        .then()
          .selected_langage_changed_to_no_(2).and()
          .sheet_names_changed_to_selected_language().and()
          .text_are_changed_to_selected_language().and()
          .notes_are_changed_to_selected_language().and()
          .today_field_use_time_zone_of_('-7').and()
          .date_format_changed_in_days_to_('MM/DD/YYYY').and()
          .date_format_changed_in_profile_to_('MM/DD/YYYY').and()
          .date_format_changed_in_history_to_('MM/DD/YYYY').and()
          .measurment_in_profile_changed_to('Imperial').and()
          .currency_in_day_changed_to('$').and()
          .currency_in_new_items_changed_to('$').and()
          .currency_in_recipe_calculator_changed_to('$').and()
          .currency_in_profile_changed_to('$').and()
          .currency_in_history_changed_to('$');
    }

    scenario_change_localisation_to_JP(){
      this.scenario('Change localisation to the JP')
        .given()
          .language_as('日本語').and()
          .time_zone_as('_+9').and()
          .date_format_as('YYYY-MM-DD').and()
          .measurement_as('Metric').and()
          .currency_as('¥')
        .when()
          .apply_settings_clicked()
        .then()
          .selected_langage_changed_to_no_(13).and()
          .sheet_names_changed_to_selected_language().and()
          .text_are_changed_to_selected_language().and()
          .notes_are_changed_to_selected_language().and()
          .today_field_use_time_zone_of_('+9').and()
          .date_format_changed_in_days_to_('YYYY-MM-DD').and()
          .date_format_changed_in_profile_to_('YYYY-MM-DD').and()
          .date_format_changed_in_history_to_('YYYY-MM-DD').and()
          .measurment_in_profile_changed_to('Metric').and()
          .currency_in_day_changed_to('¥').and()
          .currency_in_new_items_changed_to('¥').and()
          .currency_in_recipe_calculator_changed_to('¥').and()
          .currency_in_profile_changed_to('¥').and()
          .currency_in_history_changed_to('¥');
    }
}

var runSettingsScenarios = () => new SettingsScenarios().runAllTests();