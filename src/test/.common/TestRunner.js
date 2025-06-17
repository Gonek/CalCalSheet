
var runAllUnitTests = () =>{
  new TestBase().runMultipleTestClass([
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
    TutorialServiceTest]);
}

var runAllSheetTests = () =>{
  new TestBase().runMultipleTestClass([
    DayItemsTest,
    DayHeaderTest,
    DayMealTest,
    DaySelectorTest,
    DaysTest,
    NewItemTest,
    RecipeCalculatorTest,
    ProfileTest,
    HistoryTest,
    SettingsTest]);
}

var runAllAcceptance = () =>{
  new TestBase().runMultipleTestClass([
    DayScenarios,
    OpenSheetScenarios,
    ImportScenarios,
    NewItemScenarios,
    ProfileScenarios,
    RecipeCalculatorScenarios,
    SettingsScenarios
]);
}

var runAllTest = () => {
  //new TestBase().runMultipleTestClass(unitTests().concat(sheetTests(), acceptanceTests()));
}