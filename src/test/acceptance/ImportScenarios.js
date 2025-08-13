 class ImportScenarios extends AcceptanceTestBase{

    constructor(){
        super(ImportGivenSteps, ImportWhenSteps, ImportThenSteps);
    }

    clearData(){
        testData.addDefaultProfile();
        testData.resetSettings();
        testData.clearImports();
        testData.clearDay();
        testData.clearDays();
        testData.clearHistory();
        testData.clearItems();
        testData.clearMeals();
        testData.clearRecipes();
        testData.resetWeight();
        testData.resetCalorieCalculatorValues();
    }

    scenario_import_all_data_from_1_5(){
        this.scenario('Scenario import all data from a v1.5 sheet')
            .given()
                .import_sheet_id_as('1J6ler0bz6Fo0OD0G2utANGyZNZDY8kN0BiCvpmrH-bo').and()
                .import_items_set_to('Clear', true).and()
                .import_recipes_set_to('Clear', true).and()
                .import_meals_set_to('Clear', true).and()
                .import_profile_set_to(true).and()
                .import_settings_set_to(true).and()
                .import_history_set_to(true).and()
                .import_days_set_to(true)
            .when()
                .import_clicked()
            .then()
                .items_imported().and()
                .recipes_imported().and()
                .meals_imported().and()
                .profile_imported().and()
                .settings_imported().and()
                .history_imported().and()
                .days_imported();
    }

    scenario_import_all_data_from_1_6(){
        this.scenario('Scenario import all data from a v1.6 sheet')
            .given()
                .import_sheet_id_as('16ETrmX2uEp6W06SV5HpPcU5qgqAknILCFsFxfh3wrNE').and()
                .import_items_set_to('Clear', true).and()
                .import_recipes_set_to('Clear', true).and()
                .import_meals_set_to('Clear', true).and()
                .import_profile_set_to(true).and()
                .import_settings_set_to(true).and()
                .import_history_set_to(true).and()
                .import_days_set_to(true)
            .when()
                .import_clicked()
            .then()
                .items_imported().and()
                .recipes_imported().and()
                .meals_imported().and()
                .profile_imported().and()
                .settings_imported().and()
                .localisation_imported().and()
                .history_imported().and()
                .days_imported();
    }

    scenario_import_just_items_with_merge(){
        this.scenario('Scenario import just items with merge ')
            .given()
                .import_sheet_id_as('16ETrmX2uEp6W06SV5HpPcU5qgqAknILCFsFxfh3wrNE').and()
                .import_items_set_to('Merge', true).and()
                .import_recipes_set_to('Clear', false).and()
                .import_meals_set_to('Clear', false).and()
                .import_profile_set_to(false).and()
                .import_settings_set_to(false).and()
                .import_history_set_to(false).and()
                .import_days_set_to(false).and()
                .test_items_available()
            .when()
                .import_clicked()
            .then()
                .items_imported_with_merge().and()
                .recipes_not_imported().and()
                .meals_not_imported().and()
                .profile_not_imported().and()
                .history_not_imported().and()
                .days_not_imported();
    }

    scenario_import_just_recipes_with_merge(){
        this.scenario('Scenario import just recipes with merge ')
            .given()
                .import_sheet_id_as('16ETrmX2uEp6W06SV5HpPcU5qgqAknILCFsFxfh3wrNE').and()
                .import_items_set_to('Clear', false).and()
                .import_recipes_set_to('Merge', true).and()
                .import_meals_set_to('Clear', false).and()
                .import_profile_set_to(false).and()
                .import_settings_set_to(false).and()
                .import_history_set_to(false).and()
                .import_days_set_to(false).and()
                .test_recipes_available()
            .when()
                .import_clicked()
            .then()
                .items_not_imported().and()
                .recipes_imported_with_merge().and()
                .meals_not_imported().and()
                .profile_not_imported().and()
                .history_not_imported().and()
                .days_not_imported();
    }

    scenario_import_just_meals_with_merge(){
        this.scenario('Scenario import just meals with merge ')
            .given()
                .import_sheet_id_as('16ETrmX2uEp6W06SV5HpPcU5qgqAknILCFsFxfh3wrNE').and()
                .import_items_set_to('Clear', false).and()
                .import_recipes_set_to('Clear', false).and()
                .import_meals_set_to('Merge', true).and()
                .import_profile_set_to(false).and()
                .import_settings_set_to(false).and()
                .import_history_set_to(false).and()
                .import_days_set_to(false).and()
                .test_meals_available()
            .when()
                .import_clicked()
            .then()
                .items_not_imported().and()
                .recipes_not_imported().and()
                .meals_imported_with_merge().and()
                .profile_not_imported().and()
                .history_not_imported().and()
                .days_not_imported();
    } 
}

var runImportScenarios = () => new ImportScenarios().runAllTests();