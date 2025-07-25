
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
  new TestBase().runAllTestClass(unitTests(), sheetTests(), acceptanceTests());
  testData.makeSheetReleaseReady();
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
    OpenSheetScenarios,
    ImportScenarios,
    NewItemScenarios,
    ProfileScenarios,
    RecipeCalculatorScenarios,
    SettingsScenarios
]