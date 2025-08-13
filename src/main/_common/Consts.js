// SPREADSHEETS
const SPSH = {
  ACTIVE : 'active'
}

// SHEETS
const SHT = {
  TUTORIAL : 888970968,
  DAY : 63625420,
  NEW_ITEM : 1366047430,
  RECIPE_CALCULATOR : 1281519016,
  PROFILE : 1038793478,
  SETTINGS : 1486461364,
  ITEMS : 917648508,
  DAYS : 144890067,
  RECIPES : 1776577136,
  MEALS : 2140804303,
  HISTORY : 1711513882,
  SUPPORT : 1747942668,
  TEXTS : 1975072440
}

// NAMED RANGES
// BUTTONS
const BTN = {
  TUTORIAL_TEST : 'ButtonTutorialTest',
  TUTORIAL_NEXT : 'ButtonTutorialNext',
  SHOW_TOOLS : 'ButtonShowTools',
  CLEAR_DAY : 'ButtonClearDay',
  CLEAR_MEAL : 'ButtonClearMeal',
  SKIP_TUTORIAL : 'ButtonSkipTutorial',
  SAVE_ITEM : 'ButtonSaveItem',
  SAVE_RECIPE : 'ButtonSaveRecipe',
  COPY_CALORIES : 'ButtonCopyCalories',
  APPLY_SETTINGS : 'ButtonApplySettings',
  IMPORT : 'ButtonImport',
  ADD_TRIGGER : 'ButtonAddTrigger',
  EXECUTE_DAILY_ROUTINE : 'ButtonExecuteDailyRoutine'
}

const CBOX = {
  DAY_NAME: 'DayName',
  LANGUAGE : 'Language',
  NEW_ITEM_NAME: 'NewItemName',
  RECIPE_NAME: 'RecipeName',
  MEAL_1_START : 'Meal1Start',
  MEAL_2_START : 'Meal2Start',
  MEAL_3_START : 'Meal3Start',
  MEAL_4_START : 'Meal4Start',
  MEAL_5_START : 'Meal5Start',
  MEAL_6_START : 'Meal6Start'
}

const BTNF = {
  SAVE_DAY_AS : 'ButtonFieldSaveDayAs',
  LOAD_DAY : 'ButtonFieldLoadDay',
  DELETE_DAYS : 'ButtonFieldDeleteDays',
  SAVE_AS_MEAL : 'ButtonFieldSaveAsMeal',
  COPY_MEAL_TO : 'ButtonFieldCopyMealTo',
  COPY_MEAL_FROM : 'ButtonFieldCopyMealFrom',
  DELETE_MEALS : 'ButtonFieldDeleteMeals',
  DELETE_ITEMS : 'ButtonFieldDeleteItems',
  DELETE_RECIPES : 'ButtonFieldDeleteRecipes',
}

const RNG = {
  // - TUTORIAL
  LANGUAGE : 'Language',
  PREVIOUS_LANGUAGE : 'PreviousLanguage',
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
  SELECTED_PROFILE : 'SelectedProfile',
  SELECTED_PROFILE_INDEX : 'SelectedProfileIndex',
  SELECTED_MEALS : 'SelectedMeals',
  SELECTED_MEAL_IDS : 'SelectedMealIds',
  SELECTED_MEAL_NAME : 'SelectedMealName',
  SELECTED_MEAL_ITEMS : 'SelectedMealItems',
  SELECTED_FUNCTION : 'SelectedFunction',
  SELECTED_FUNCTION_VALUE :'SelectedFunctionValue',
  SELECTED_FUNCTION_DATA : 'SelectedFunctionData',
  SELECTED_FUNCTION_MEALS : 'SelectedFunctionMeals',
  IN_LINE_CACULATION_INDEX : 'InLineCaculationIndex',
  IN_LINE_CACULATION_FIELD : 'InLineCaculationField',
  IN_LINE_CACULATION_PREFIX_OFFSET : 'InLineCaculationPrefixOffset',
  IN_LINE_CACULATION_CALCULATION_BASE : 'InLineCaculationBase',
  IN_LINE_CACULATION_CALCULATION_RESULT : 'InLineCaculationResult',
  CURRENCY_FORMAT : 'CurrencyFormat',
  IN_ROW_CALC_FIELDS : 'InRowCalcFields',
  MEAL_NAMES : 'MealNames',
  MEAL1 : 'Meal1',
  MEAL2 : 'Meal2',
  MEAL3 : 'Meal3',
  MEAL4 : 'Meal4',
  MEAL5 : 'Meal5',
  MEAL6 : 'Meal6',
  // DAYS
  NUMBER_OF_DAYS : 'NumberOfDays',
  NUMBER_OF_TEMPLATES : 'NumberOfTemplates',
  TODAY : 'Today',
  DEFAULT_DAY : 'DefaultDay',
  FIRST_EMPTY_DAY_INDEX : 'FirstEmptyDayIndex',
  FIRST_EMPTY_TEMPLATE_INDEX : 'FirstEmptyTemplateIndex',
  LAST_FINISHED_DAY : 'LastFinishedDay',
  DAYS_SINCE_LAST_FINISHED : 'DaysSinceLastFinished',
  DELETE_DAYS_UNTIL : 'DeleteDaysUntil',
  DELETE_DAYS_FROM : 'DeleteDaysFrom',
  CREATE_DAYS_FROM : 'CreateDaysFrom',
  CREATE_DAYS : 'CreateDays',
  DEFAULT_CALORIE_OUTPUT: 'DefaultCalorieOutput',
  LAST_PROFILE_INDEX: 'LastProfileIndex',
  NEXT_PROFILE_INDEX: 'NextProfileIndex',
  NEXT_PROFILE: 'NextProfile',
  DAYS_FROM: 'DaysFrom',
  DAYS_UNTIL: 'DaysUntil',
  // NEW ITEM
  NEW_ITEM_FIELDS : 'NewItemFields',
  NEW_ITEM_FIELDS_TO_SAVE : 'NewItemFieldsToSave',
  NEW_ITEM_PRICE : 'NewItemPrice',
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
  IS_MEASUREMENT_METRIC : 'IsMeasurementMetric',
  CALORIE_OUTPUT_CALCULATOR : 'CalorieOutputCalculator',
  COPY_CALORIES_SELECTED_PROFILE : 'CopyCaloriesSelectedProfile',
  // SETTINGS
  IMPORT : 'Import',
  GENERAL_SETTINGS : 'GeneralSettings',
  NUTRITION_FIELDS : 'NutritionFields',
  MEALS : 'Meals',
  LOCALISATION: 'Localisation',
  // HISTORY
  HISTORY_INTERVAL : 'HistoryInterval',
  SELECETED_HISTORY_DAY : 'SelectedHistoryDay',
  // TEXTS
  SHEETS: 'Sheets', 
  NOTES: 'Notes'
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