const ACTIVE = SpreadsheetApp.getActive();
const ACTIVE_SPREADSHEET = SpreadsheetApp.getActiveSpreadsheet()

// SHEETS
const TUTORIAL = 'Tutorial';
const DAY = 'Day';
const NEW_ITEM = 'New Item';
const RECIPE_CALCULATOR = 'Recipe calculator';
const PROFILE = 'Profile';
const SETTINGS = 'Settings';
const ITEMS = 'Items';
const DAYS = 'Days';
const RECIPES = 'Recipes';
const MEALS = 'Meals';
const HISTORY = 'History';
const SUPPORT = 'Support';

const NOT_DAY_SHEETS = [TUTORIAL, NEW_ITEM, RECIPE_CALCULATOR, PROFILE, SETTINGS, ITEMS, RECIPES, MEALS, HISTORY, SUPPORT];

// NAMED RANGES
// BUTTONS
const BTN_TUTORIAL_TEST = 'ButtonTutorialTest';
const BTN_TUTORIAL_NEXT = 'ButtonTutorialNext';
const BTN_SKIP_TUTORIAL = 'ButtonSkipTutorial';
const BTN_SAVE_MEAL = 'ButtonSaveMeal';
const BTN_COPY_MEALS = 'ButtonCopyMeals';
const BTN_SAVE_ITEM = 'ButtonSaveItem';
const BTN_LOAD_RECIPE = 'ButtonLoadRecipe';
const BTN_SAVE_RECIPE = 'ButtonSaveRecipe';
const BTN_COPY_CALORIES = 'ButtonCopyCalories';
const BTN_APPLY_SETTINGS = 'ButtonApplySettings';

const RNG_MEAL_1_START = 'Meal1Start';
const RNG_MEAL_2_START = 'Meal2Start';
const RNG_MEAL_3_START = 'Meal3Start';
const RNG_MEAL_4_START = 'Meal4Start';
const RNG_MEAL_5_START = 'Meal5Start';
const RNG_MEAL_6_START = 'Meal6Start';

// - TUTORIAL
const RNG_TUTORIAL_STEP = 'TutorialStep';
// - DAY
const RNG_DAY_NAME = 'DayName';
const RNG_DAY_INDEX = 'DayIndex';
const RNG_DAY_PREV_DAY_INDEX = 'PrevDayIndex';
const RNG_DAY_PREV_DATE = 'PrevDate';
const RNG_SUMMARY = 'Summary';
const RNG_CALORIE_DENSITY = 'CalDensity';
const RNG_CHECKLIST = 'Checklist';
const RNG_CALORIE_OUTPUT = 'CalorieOutput';
const RNG_TODAY_ITEM_NAMES = 'Today!ItemNames';
const RNG_DAY_ITEMS = 'DayItems';
const RNG_SELECTED_DAY_ITEMS = 'SelectedDayItems';
const RNG_SELECTED_PROFILE = 'SelectedProfile';
const RNG_SELECTED_PROFILE_INDEX = 'SelectedProfileIndex';
const RNG_SELECTED_MEAL_NAME = 'SelectedMealName';
const RNG_SELECTED_MEAL_ITEMS = 'SelectedMealItems';
const RNG_COPY_MEAL_FROM = 'CopyMealFrom';
const RNG_COPY_MEAL_FROM_MEAL_IDS = 'CopyMealFromMealIds';
const RNG_COPY_MEAL_TO = 'CopyMealTo';
const RNG_COPY_MEAL_TO_ROWS = 'CopyMealToRows';
const RNG_SAVE_MEAL_FROM = 'SaveMealFrom';
const RNG_SAVE_MEAL_FROM_MEAL_ID = 'SaveMealFromMealId';
const RNG_SAVE_MEAL_AS = 'SaveMealAs';
const RNG_MEAL_NAMES = 'MealNames';
// - DAYS
const RNG_TODAY = 'Today';
const RNG_DEFAULT_DAY = 'DefaultDay';
const RNG_FIRST_EMPTY_DAY_INDEX = 'FirstEmptyDayIndex';
const RNG_LAST_FINISHED_DAY = 'LastFinishedDay';
const RNG_DAYS_SINCE_LAST_FINISHED = 'DaysSinceLastFinished';
const RNG_DELETE_DAYS_UNTIL = 'DeleteDaysUntil';
const RNG_DELETE_DAYS_FROM = 'DeleteDaysFrom';
const RNG_CREATE_DAYS_FROM = 'CreateDaysFrom';
const RNG_CREATE_DAYS = 'CreateDays';
// - NEW ITEM
const RNG_NEW_ITEM_FIELDS = 'NewItemFields';
const RNG_NEW_ITEM_FIELDS_TO_SAVE = 'NewItemFieldsToSave';
const RNG_NEW_ITEM_NOOM_COLOUR = 'NewItemNoomColour';
const RNG_NEW_ITEM_NOOM_CATEGORY = 'NewItemNoomCategory';
const RNG_NEW_ITEM_NAME_AND_OLD_POS = 'NewItemNameAndOldPos';
// - RECIPE CALCULATOR
const RNG_RECIPE_NAME = 'RecipeName';
const RNG_RECIPE_NAME_OLD_POS = 'RecipeNameAndOldPos';
const RNG_RECIPE_FIELDS_TO_SAVE = 'RecipeFieldsToSave';
const RNG_RECIPE_SERVING = 'RecipeServing';
const RNG_RECIPE_NOOM_COLOUR = 'RecipeNoomColour';
const RNG_RECIPE_NOOM_CATEGORY = 'RecipeNoomCategory';
const RNG_RECIPE_SAVE_AS_RECIPE = 'RecipeSaveAsRecipe';
const RNG_RECIPE_ITEMS = 'RecipeItems';
const RNG_RECIPE_ITEM_NAMES = 'RecipeItemNames';
const RNG_LOAD_RECIPE_NAME = 'LoadRecipeName';
const RNG_SELECTED_RECIPE = 'SelectedRecipe';
const RNG_SELECTED_RECIPE_ITEMS = 'SelectedRecipeItems';
// - PROFILE
const RNG_CALCULATOR_CALORIES = 'CalculatorCalories';
const RNG_GENERATED_DAYS = 'GeneratedDays';
const RNG_MACRO_PROFILES = 'MacroProfiles';
const RNG_NUMBER_OF_PROFILES = 'NumberOfProfiles';
const RNG_WEIGHT_HISTORY = 'WeightHistory';
const RNG_WEIGHTS = 'Weights';
const RNG_CALORIE_OUTPUT_CALCULATOR = 'CalorieOutputCalculator';
const RNG_COPY_CALORIES_SELECTED_PROFILE = 'CopyCaloriesSelectedProfile';
// - SETTINGS
const RNG_IMPORT = 'Import';
const RNG_GENERAL_SETTINGS = 'GeneralSettings';
const RNG_NUTRITION_FIELDS = 'NutritionFields';
const RNG_MEALS = 'Meals';
// - HISTORY
const RNG_HISTORY_INTERVAL = 'HistoryInterval';
const RNG_SELECETED_HISTORY_DAY = 'SelectedHistoryDay';

// VERSIONS
const VERSION="v1.5"
const ROWS_PER_MEAL = 15;
const CLEAR_CONTENT = 'Clear';
const V1_4 = 'v1.4';
const V1_5 = 'v1.5';
const VERSION_POSITION = 'E24';

// TUTORIAL
const TOP_CELL_POS = 'A1';
const SHEET_DEFAULT_NAME = `Calorie Calculator Sheet ${VERSION}`;
const TUTORIAL_PAGES = 10;
const TUTORIAL_BLOCK_START_MARKER = 'S';
const TUTORIAL_BLOCK_END_MARKER = 'E';

// ITEMS
const ITEM_TABLE_OFFSET = 3;

// REPOSITORY
const REPOSITORY_AREA = 'B4:B';

// MEALS 
const MEAL_ICON="🥣";
const MEAL1_START_ROW = 15; 
const MEAL2_START_ROW = 30; 
const MEAL3_START_ROW = 45; 
const MEAL4_START_ROW = 60; 
const MEAL5_START_ROW = 75; 
const MEAL6_START_ROW = 90; 

const MEAL1 = "Meal1";
const MEAL2 = "Meal2";
const MEAL3 = "Meal3";
const MEAL4 = "Meal4";
const MEAL5 = "Meal5";
const MEAL6 = "Meal6";