// INTERFACE

var onEdit = (e) => getObj(EventService).onEdit(e);
var onOpen = (e) => getObj(EventService).onOpen(e);
var testButton = () => getObj(EventService).clickButton(SHT.DAY, BTN.SHOW_TOOLS, 'X5');

// OTHER FUNCTIONS
var startImport = () => getObj(EventService).clickButton(SHT.SETTINGS, BTN.IMPORT);
var addTrigger = () => getObj(EventService).clickButton(SHT.SETTINGS, BTN.ADD_TRIGGER);

// CLASS

class EventService extends AbstractEventService{

  constructor(){
    super([
      [SHT.DAY, [                
        new CBox(CBOX.DAY_NAME, DayService, 'changeDay', 'G1'),
        new CBox(CBOX.MEAL_1_START, DayService, 'loadMeal', 'C17'),
        new CBox(CBOX.MEAL_2_START, DayService, 'loadMeal', 'C32'),
        new CBox(CBOX.MEAL_3_START, DayService, 'loadMeal', 'C47'),
        new CBox(CBOX.MEAL_4_START, DayService, 'loadMeal', 'C62'),
        new CBox(CBOX.MEAL_5_START, DayService, 'loadMeal', 'C77'),
        new CBox(CBOX.MEAL_6_START, DayService, 'loadMeal', 'C92'),
        new Fld('ItemAmounts', DayService, 'inLineCalculation', 'E17:E106'),
        new Btn(BTN.SHOW_TOOLS, DayService, 'showHideTools', 'X5', 2),
        new BtnF(BTNF.SAVE_DAY_AS, DayService, 'saveDayAs', 'AE2', 1, 4, 5),
        new BtnF(BTNF.LOAD_DAY, DayService, 'loadDayFrom', 'AE3', 1, 4, 5),
        new BtnF(BTNF.DELETE_DAYS, DayService, 'deleteDays', 'AE4', 1, 4, 5),
        new Btn(BTN.CLEAR_DAY, DayService, 'clearDay', 'AE5'),
        new BtnF(BTNF.SAVE_AS_MEAL, DayService, 'saveAsMeal', 'AE8', 1, 4, 5),
        new BtnF(BTNF.COPY_MEAL_FROM, DayService, 'copyMealsFrom', 'AE9', 1, 4, 5),
        new BtnF(BTNF.COPY_MEAL_TO, DayService, 'copyMealsTo', 'AE10', 1, 4, 5),
        new Btn(BTN.CLEAR_MEAL, DayService, 'clearMeals', 'AE11', 2),
        new BtnF(BTNF.DELETE_MEALS, DayService, 'deleteMeals', 'AE13', 1, 4)
        ]
      ],
      [SHT.NEW_ITEM, [
        new CBox(CBOX.NEW_ITEM_NAME, NewItemService, 'loadItem', 'C3'),
        new Btn(BTN.SAVE_ITEM, NewItemService, 'addNewItem', 'E27'),
        new BtnF(BTNF.DELETE_ITEMS, NewItemService, 'deleteItems', 'E33', 1, 4, 5)
      ]
      ],
      [SHT.RECIPE_CALCULATOR, [  
        new CBox(CBOX.RECIPE_NAME, RecipeCalculatorService, 'loadRecipe', 'B3'),
        new Btn(BTN.SAVE_RECIPE, RecipeCalculatorService, 'addRecipeToItemAndRecipes', 'E38'),
        new BtnF(BTNF.DELETE_RECIPES, RecipeCalculatorService, 'deleteRecipes', 'E42', 1, 4, 5)
        ]
      ],
      [SHT.PROFILE, [
        new Btn(BTN.COPY_CALORIES, ProfileService, 'copyCalories', 'F31')]
      ],
      [SHT.SETTINGS, [           
        new Btn(BTN.APPLY_SETTINGS, SettingsService, 'applySettings', 'G29'),
        new Btn(BTN.IMPORT, ImportService, 'startImport', 'M13'),
        new Btn(BTN.ADD_TRIGGER, SettingsService, 'addTrigger', 'M18'),
        new Btn(BTN.EXECUTE_DAILY_ROUTINE, EventService, 'onOpen', 'M22'),
        ]
      ],
      [SHT.TUTORIAL, [
        new CBox(CBOX.LANGUAGE, SettingsService, 'changeLanguage', 'J14'),
        new Btn(BTN.TUTORIAL_TEST, TutorialService, 'tutorialTestButton', 'H39'),
        new Btn(BTN.SKIP_TUTORIAL, TutorialService, 'resetTutorial', 'E629'),
        new Btn(BTN.TUTORIAL_NEXT, TutorialService, 'tutorialNext', 'K629')
        ]
      ]
    ]);
  }

  onOpen(e){
    super.onOpen(() => {
      getObj(DayService).finishDay();
    });
  }
}