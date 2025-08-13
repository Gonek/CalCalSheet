class ProfileGivenSteps extends Steps{

    default_profile_available(){
        testData.addDefaultProfile();
    }

    test_profiles_available(){
        testData.addTestProfiles();
    }

    copy_to_as(profile){
        getRng(RNG.COPY_CALORIES_SELECTED_PROFILE).setValue(profile);
    }

    dob_in_calulator_as(dob){
        getRng(RNG.CALORIE_OUTPUT_CALCULATOR).setValue(dob, 1);
    }

    sex_in_calulator_as(sex){
        getRng(RNG.CALORIE_OUTPUT_CALCULATOR).setValue(sex, 3);
    }

    height_in_calulator_as(height){
        getRng(RNG.CALORIE_OUTPUT_CALCULATOR).setValue(height, 4);
    }

    activity_level_in_calulator_as(level){
        getRng(RNG.CALORIE_OUTPUT_CALCULATOR).setValue(level, 5);
    }

    weight_in_calulator_as(weight){
        getRng(RNG.CALORIE_OUTPUT_CALCULATOR).setValue(weight, 6);
    }

    goal_in_calulator_as(goal){
        getRng(RNG.CALORIE_OUTPUT_CALCULATOR).setValue(goal, 10);
    }

    second_profile_name_as(name){
        getRng(RNG.MACRO_PROFILES).setValue(name, 1, 3)
    }
}

class ProfileWhenSteps extends Steps{
    copy_calories_clicked(){
        this.clickButton(SHT.PROFILE, BTN.COPY_CALORIES);
    }
}

class ProfileThenSteps extends Steps{
    have_profile_as(name){
        this.profileIndex = getRng(RNG.MACRO_PROFILES).getValues()[0].findIndex(r => r == name);
        assertTrue(this.profileIndex > 0);
    }

    have_calories_as(min, max){
        let pMin = getRng(RNG.MACRO_PROFILES).getValues()[1][this.profileIndex];
        let pMax = getRng(RNG.MACRO_PROFILES).getValues()[1][this.profileIndex + 1];
        assertEquals(pMin, min);
        assertEquals(pMax, max);
    }
}