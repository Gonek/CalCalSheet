class ProfileScenarios extends AcceptanceTestBase{

    constructor(){
      super(ProfileGivenSteps, ProfileWhenSteps, ProfileThenSteps);
    }

    clearData(){
      
    }
}

var runProfileScenarios = () => new ProfileScenarios().runAllTests();