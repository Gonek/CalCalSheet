class ProfileScenarios extends AcceptanceTestBase{

    constructor(){
      super(ProfileGivenSteps, ProfileWhenSteps, ProfileThenSteps);
    }

    clearData(){
      testData.addDefaultProfile();
      testData.resetCalorieCalculatorValues();
    }

    scenario_copy_calories_to_new_profile(){
      this.scenario()
        .given()
          .default_profile_available().and()
          .second_profile_name_as('Profile').and()
          .copy_to_as('Profile').and()
          .dob_in_calulator_as('01/01/2000').and()
          .sex_in_calulator_as('Man').and()
          .height_in_calulator_as('200').and()
          .activity_level_in_calulator_as('Sedentary').and()
          .weight_in_calulator_as('80.00').and()
          .goal_in_calulator_as('Weight maintain')
        .when()
          .copy_calories_clicked()
        .then()
          .have_profile_as('Profile').and()
          .have_calories_as(2330, 2470);
    }

    scenario_copy_calories_to_existing_profile(){
      this.scenario()
        .given()
          .test_profiles_available().and()
          .copy_to_as('Test 4').and()
          .dob_in_calulator_as('01/01/1980').and()
          .sex_in_calulator_as('Woman').and()
          .height_in_calulator_as('165').and()
          .activity_level_in_calulator_as('Moderately active').and()
          .weight_in_calulator_as('68.00').and()
          .goal_in_calulator_as('Weight loss')
        .when()
          .copy_calories_clicked()
        .then()
          .have_profile_as('Test 4').and()
          .have_calories_as(1740, 1950);
    }
    
}

var runProfileScenarios = () => new ProfileScenarios().runAllTests();