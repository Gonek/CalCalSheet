const ACTIVE = SpreadsheetApp.getActive();
const ACTIVE_SPREADSHEET = SpreadsheetApp.getActiveSpreadsheet()

// SHEETS
const TUTORIAL = 'Tutorial';
const TODAY = 'Today';
const YESTERDAY = 'Yesterday';
const NEW_ITEM = 'New Item';
const RECIPE_CALCULATOR = 'Recipe Calculator';
const PROFILE = 'Profile';
const SETTINGS = 'Settings';
const ITEMS = 'Items';
const RECIPES = 'Recipes';
const MEALS = 'Meals';
const HISTORY = 'History';
const DAY_BASE = 'Day Base';
const SUPPORT = 'Support';

const NOT_DAY_SHEETS = [TUTORIAL, NEW_ITEM, RECIPE_CALCULATOR, PROFILE, SETTINGS, ITEMS, RECIPES, MEALS, HISTORY, SUPPORT];

// NAMED RANGES
// - TUTORIAL
const RNG_TUTORIAL_STEP = 'TutorialStep';
const RNG_TUTORIAL_STATUS = 'TutorialStatus';
// - DAY
const RNG_SUMMARY = 'Summary';
const RNG_CALORIE_DENSITY = 'CalDensity';
const RNG_CHECKLIST = 'Checklist';
const RNG_CALORIE_OUTPUT = 'CalorieOutput';
const RNG_TODAY_ITEM_NAMES = 'Today!ItemNames';
const RNG_SELECTED_PROFILE = 'SelectedProfile';
const RNG_SELECTED_PROFILE_INDEX = 'SelectedProfileIndex';
const RNG_SELECTED_MEAL_NAME = 'SelectedMealName';
const RNG_SELECTED_MEAL_ITEMS = 'SelectedMealItems';
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
const RNG_DAYS_TO_GENERATE = 'DaysToGenerate';
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

// VERSIONS
const VERSION="v1.4"
const ROWS_PER_MEAL = 15;
const CLEAR_CONTENT = 'Clear';
const V1_0 = 'v1.0';
const V1_1 = 'v1.1';
const V1_1_1 = 'v1.1.1'; 
const V1_2 = 'v1.2';
const V1_2_1 = 'v1.2.1';
const V1_3 = 'v1.3';
const V1_4 = 'v1.4';
const VERSION_POSITION = 'E24';

// DAY
const DAY_TITLE_POSITION = 'B1';
const FINISH_BUTTON_INDEX = 0;

// TUTORIAL
const TOP_CELL_POS = 'A1';
const SHEET_DEFAULT_NAME = `Calorie Calculator Sheet ${VERSION}`;
const TUTORIAL_PAGES = 11;
const TUTORIAL_BLOCK_START_MARKER = 'S';
const TUTORIAL_BLOCK_END_MARKER = 'E';
const TUTORIAL_ALLOW_BUTTON_INDEX = 0;
const TUTORIAL_NEXT_BUTTON_INDEX = 1;
const TUTORIAL_SKIP_BUTTON_INDEX = 2;

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