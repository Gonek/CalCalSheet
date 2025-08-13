// TUTORIAL SHEET
var tutorialAllow = () => tutorialService().tutorialAllow();
var tutorialNext = () => tutorialService().tutorialNext();
var skipTutorial = () => tutorialService().resetTutorial();

// DAY SHEETS
var finishDay = () => dayService().finishDay();

var saveMeal1 = () => mealRepository().saveMeal(MEAL1);
var saveMeal2 = () => mealRepository().saveMeal(MEAL2);
var saveMeal3 = () => mealRepository().saveMeal(MEAL3);
var saveMeal4 = () => mealRepository().saveMeal(MEAL4);
var saveMeal5 = () => mealRepository().saveMeal(MEAL5);
var saveMeal6 = () => mealRepository().saveMeal(MEAL6);
var copyMeal1 = () => dayService().copyMeal(MEAL1);
var copyMeal2 = () => dayService().copyMeal(MEAL2);
var copyMeal3 = () => dayService().copyMeal(MEAL3);
var copyMeal4 = () => dayService().copyMeal(MEAL4);
var copyMeal5 = () => dayService().copyMeal(MEAL5);
var copyMeal6 = () => dayService().copyMeal(MEAL6);
var loadMeal = (sheetName, mealNumber, startRow) => dayService().loadMeal(sheetName, mealNumber, startRow);

// NEW ITEM SHEET
var addNewItem = () => newItemService().addNewItem();
var addNewItemReturn = () => newItemService().addNewItemReturn();

// RECIPE CALCULATOR
var addRecipeToItemAndRecipes = () => recipeCalculatorService().addRecipeToItemAndRecipes();
var loadRecipeToRecipeCalculator = () => recipeCalculatorService().loadRecipe();

// PROFILE SHEET
var generateDays = () => profileService().generateDays();
var copyCalories = () => profileService().copyCalories();

// SETTINGS SHEET
var startImport = () => importService().apply();
var applySettings = () => settingsService().apply();