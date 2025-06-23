// SPREADSHEETS
const SPSH = {
  ACTIVE : 'active'
}

// SHEETS
const SHT = {
  TUTORIAL : 'Tutorial',
  DAY : 'Day',
  NEW_ITEM : 'New Item',
  RECIPE_CALCULATOR : 'Recipe calculator',
  PROFILE : 'Profile',
  SETTINGS : 'Settings',
  ITEMS : 'Items',
  DAYS : 'Days',
  RECIPES : 'Recipes',
  MEALS : 'Meals',
  HISTORY : 'History',
  SUPPORT : 'Support'
}

// NAMED RANGES
// BUTTONS
const BTN = {
  TUTORIAL_TEST : 'ButtonTutorialTest',
  TUTORIAL_NEXT : 'ButtonTutorialNext',
  SKIP_TUTORIAL : 'ButtonSkipTutorial',
  SAVE_MEAL : 'ButtonSaveMeal',
  COPY_MEALS : 'ButtonCopyMeals',
  SAVE_ITEM : 'ButtonSaveItem',
  SAVE_RECIPE : 'ButtonSaveRecipe',
  COPY_CALORIES : 'ButtonCopyCalories',
  APPLY_SETTINGS : 'ButtonApplySettings',
  IMPORT : 'ButtonImport'
}

const CBOX = {
  DAY_NAME: 'DayName',
  NEW_ITEM_NAME: 'NewItemName',
  RECIPE_NAME: 'RecipeName',
  MEAL_1_START : 'Meal1Start',
  MEAL_2_START : 'Meal2Start',
  MEAL_3_START : 'Meal3Start',
  MEAL_4_START : 'Meal4Start',
  MEAL_5_START : 'Meal5Start',
  MEAL_6_START : 'Meal6Start'
}

const RNG = {
  // - TUTORIAL
  TUTORIAL_STEP: 'TutorialStep',
  TUTORIAL_NEXT_POS: 'TutorialNextPos',
  TUTORIAL_RESET_POS: 'TutorialResetPos',
  // DAY
  DAY_INDEX: 'DayIndex',
  DAY_PREV_DAY_INDEX : 'PrevDayIndex',
  DAY_PREV_DATE : 'PrevDate',
  SUMMARY : 'Summary',
  CALORIE_DENSITY : 'CalDensity',
  CHECKLIST : 'Checklist',
  CALORIE_OUTPUT : 'CalorieOutput',
  DAY_ITEMS : 'DayItems',
  SELECTED_DAY_ITEMS : 'SelectedDayItems',
  SELECTED_PROFILE : 'SelectedProfile',
  SELECTED_PROFILE_INDEX : 'SelectedProfileIndex',
  SELECTED_MEAL_NAME : 'SelectedMealName',
  SELECTED_MEAL_ITEMS : 'SelectedMealItems',
  COPY_MEAL_FROM : 'CopyMealFrom',
  COPY_MEAL_FROM_MEAL_IDS : 'CopyMealFromMealIds',
  COPY_MEAL_TO : 'CopyMealTo',
  COPY_MEAL_TO_ROWS : 'CopyMealToRows',
  SAVE_MEAL_FROM : 'SaveMealFrom',
  SAVE_MEAL_FROM_MEAL_ID : 'SaveMealFromMealId',
  SAVE_MEAL_AS : 'SaveMealAs',
  MEAL_NAMES : 'MealNames',
  MEAL1 : 'Meal1',
  MEAL2 : 'Meal2',
  MEAL3 : 'Meal3',
  MEAL4 : 'Meal4',
  MEAL5 : 'Meal5',
  MEAL6 : 'Meal6',
  // DAYS
  NUMBER_OF_DAYS : 'NumberOfDays',
  TODAY : 'Today',
  DEFAULT_DAY : 'DefaultDay',
  FIRST_EMPTY_DAY_INDEX : 'FirstEmptyDayIndex',
  LAST_FINISHED_DAY : 'LastFinishedDay',
  DAYS_SINCE_LAST_FINISHED : 'DaysSinceLastFinished',
  DELETE_DAYS_UNTIL : 'DeleteDaysUntil',
  DELETE_DAYS_FROM : 'DeleteDaysFrom',
  CREATE_DAYS_FROM : 'CreateDaysFrom',
  CREATE_DAYS : 'CreateDays',
  ADDITIONAL_DATA: 'AdditionalData',
  DEFAULT_CALORIE_OUTPUT: 'DefaultCalorieOutput',
  LAST_PROFILE_INDEX: 'LastProfileIndex',
  NEXT_PROFILE_INDEX: 'NextProfileIndex',
  NEXT_PROFILE: 'NextProfile',
  DAYS_FROM: 'DaysFrom',
  DAYS_UNTIL: 'DaysUntil',
  // NEW ITEM
  NEW_ITEM_FIELDS : 'NewItemFields',
  NEW_ITEM_FIELDS_TO_SAVE : 'NewItemFieldsToSave',
  NEW_ITEM_NOOM_COLOUR : 'NewItemNoomColour',
  NEW_ITEM_NOOM_CATEGORY : 'NewItemNoomCategory',
  NEW_ITEM_NAME_AND_OLD_POS : 'NewItemNameAndOldPos',
  NEW_ITEM_AUTO_DELETE : 'NewItemAutoDelete',
  // RECIPE CALCULATOR
  RECIPE_NAME : 'RecipeName',
  RECIPE_OLD_POS : 'RecipeOldPos',
  RECIPE_FIELDS_TO_SAVE : 'RecipeFieldsToSave',
  RECIPE_SERVING : 'RecipeServing',
  RECIPE_NOOM_COLOUR : 'RecipeNoomColour',
  RECIPE_NOOM_CATEGORY : 'RecipeNoomCategory',
  RECIPE_SAVE_AS_RECIPE : 'RecipeSaveAsRecipe',
  RECIPE_ITEMS : 'RecipeItems',
  RECIPE_ITEM_NAMES : 'RecipeItemNames',
  SELECTED_RECIPE_ITEMS : 'SelectedRecipeItems',
  RECIPE_AUTO_DELETE : 'RecipeAutoDelete',
  // PROFILE
  CALCULATOR_CALORIES : 'CalculatorCalories',
  GENERATED_DAYS : 'GeneratedDays',
  MACRO_PROFILES : 'MacroProfiles',
  NUMBER_OF_PROFILES : 'NumberOfProfiles',
  WEIGHT_HISTORY : 'WeightHistory',
  WEIGHTS : 'Weights',
  CALORIE_OUTPUT_CALCULATOR : 'CalorieOutputCalculator',
  COPY_CALORIES_SELECTED_PROFILE : 'CopyCaloriesSelectedProfile',
  // SETTINGS
  IMPORT : 'Import',
  GENERAL_SETTINGS : 'GeneralSettings',
  NUTRITION_FIELDS : 'NutritionFields',
  MEALS : 'Meals',
  // HISTORY
  HISTORY_INTERVAL : 'HistoryInterval',
  SELECETED_HISTORY_DAY : 'SelectedHistoryDay'
}

// VERSIONS
const VERSION="v1.6"
const ROWS_PER_MEAL = 15;
const V1_4 = 'v1.4';
const V1_5 = 'v1.5';
const V1_6 = 'v1.6';
const VERSION_POSITION = 'E24';

const IMPORT_OPTIONS = {
   CLEAR_CONTENT : 'Clear',
   MERGE_CONTENT : 'Merge'
}

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