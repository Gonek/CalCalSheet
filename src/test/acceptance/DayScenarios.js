 class DayScenarios extends AcceptanceTestBase{

    constructor(){
      super(DayGivenSteps, DayWhenSteps, DayThenSteps);
    }

    clearData(){
      
    }
}

var runDayScenarios = () => new DayScenarios().runAllTests();