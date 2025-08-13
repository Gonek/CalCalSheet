
var runAllUnitTests = () =>{
  new TestBase().runMultipleTestClass(unitTests());
}

var runAllSheetTests = () =>{
  new TestBase().runMultipleTestClass(sheetTests());
}

var runAllAcceptance = () =>{
  new TestBase().runMultipleTestClass(acceptanceTests());
}

var runAllTest = () => {
  testSheet = new TestSheet();
  if(new TestBase().runAllTestClass(unitTests(), sheetTests(), acceptanceTests())){
    makeSheetReleaseReady();
  }
}

var makeSheetReleaseReady = () => {
  testData.makeSheetReleaseReady();
  getObj(App).flush();
}

var unitTests = () => [
    DayRepositoryTest,
    HistoryRepositoryTest,
    ItemRepositoryTest,
    MealRepositoryTest,
    RecipeRepositoryTest,
    DayServiceTest,
    EventServiceTest,
    ImportServiceTest,
    NewItemServiceTest,
    ProfileServiceTest,
    RecipeCalculatorServiceTest,
    SettingsServiceTest,
    TutorialServiceTest];

var sheetTests = () => [
    DayItemsTest,
    DayHeaderTest,
    DayToolsTest,
    DaysTest,
    NewItemTest,
    RecipeCalculatorTest,
    ProfileTest,
    HistoryTest,
    SettingsTest
]

var acceptanceTests = () => [
    DayScenarios,
    DayToolsScenarios,
    OpenSheetScenarios,
    ImportScenarios,
    NewItemScenarios,
    ProfileScenarios,
    RecipeCalculatorScenarios,
    SettingsScenarios
]