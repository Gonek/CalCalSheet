 class SettingsScenarios extends AcceptanceTestBase{

    constructor(){
      super(SettingsGivenSteps, SettingsWhenSteps, SettingsThenSteps);
    }

    clearData(){
    }
}

var runSettingsScenarios = () => new SettingsScenarios().runAllTests();