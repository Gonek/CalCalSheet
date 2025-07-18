// INTERFACE

var onEdit = (e) => getObj(EventService).onEdit(e);
var onOpen = (e) => getObj(EventService).onOpen(e);
var testButton = () => getObj(EventService).testButton(SHT.DAY, BTN.SHOW_TOOLS, 'X6');

// OTHER FUNCTIONS
var startImport = () => getObj(ImportService).startImport();

// CLASS

class EventService extends AbstractEventService{

  constructor(){
    super([
      [SHT.DAY, [                
        new CBox(CBOX.DAY_NAME, DayService, 'changeDay', 'G1'),
        new CBox(CBOX.MEAL_1_START, DayService, 'loadMeal', 'C15'),
        new CBox(CBOX.MEAL_2_START, DayService, 'loadMeal', 'C30'),
        new CBox(CBOX.MEAL_3_START, DayService, 'loadMeal', 'C45'),
        new CBox(CBOX.MEAL_4_START, DayService, 'loadMeal', 'C60'),
        new CBox(CBOX.MEAL_5_START, DayService, 'loadMeal', 'C75'),
        new CBox(CBOX.MEAL_6_START, DayService, 'loadMeal', 'C90'),
        new Fld('ItemAmounts', DayService, 'inLineCalculation', 'E17:E106'),
        new Btn(BTN.SHOW_TOOLS, DayService, 'showHideTools', 'X6', 2),
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
        new Btn(BTN.IMPORT, ImportService, 'startImport', 'L13')
        ]
      ],
      [SHT.TUTORIAL, [
        new CBox(CBOX.LANGUAGE, SettingsService, 'changeLanguage', 'J14'),
        new Btn(BTN.TUTORIAL_TEST, TutorialService, 'tutorialTestButton', 'H39'),
        new Btn(BTN.SKIP_TUTORIAL, TutorialService, 'resetTutorial', 'E580'),
        new Btn(BTN.TUTORIAL_NEXT, TutorialService, 'tutorialNext', 'K580')
        ]
      ]
    ]);
  }

  onOpen(e){
    super.onOpen(() => {
      getObj(DayService).finishDay();
      getObj(ItemRepository).autoDeleteItems();
    });
  }
}