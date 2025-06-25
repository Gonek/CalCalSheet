// INTERFACE

var onEdit = (e) => getObj(EventService).onEdit(e);
var onOpen = (e) => getObj(EventService).onOpen(e);
var testButton = () => getObj(EventService).testButton(SHT.NEW_ITEM, CBOX.NEW_ITEM_NAME);

// OTHER FUNCTIONS
var startImport = () => getObj(ImportService).startImport();

// CLASS

class EventService extends AbstractEventService{

  constructor(){
    super([
      [SHT.DAY, [                
        new CBox(CBOX.DAY_NAME, DayService, 'changeDay'),
        new CBox(CBOX.MEAL_1_START, DayService, 'loadMeal'),
        new CBox(CBOX.MEAL_2_START, DayService, 'loadMeal'),
        new CBox(CBOX.MEAL_3_START, DayService, 'loadMeal'),
        new CBox(CBOX.MEAL_4_START, DayService, 'loadMeal'),
        new CBox(CBOX.MEAL_5_START, DayService, 'loadMeal'),
        new CBox(CBOX.MEAL_6_START, DayService, 'loadMeal'),
        new Btn(BTN.SAVE_MEAL, DayService, 'saveMeal'),
        new Btn(BTN.COPY_MEALS, DayService, 'copyMeals')
        ]
      ],
      [SHT.NEW_ITEM, [
        new CBox(CBOX.NEW_ITEM_NAME, NewItemService, 'loadItem'),
        new Btn(BTN.SAVE_ITEM, NewItemService, 'addNewItem')]
      ],
      [SHT.RECIPE_CALCULATOR, [  
        new CBox(CBOX.RECIPE_NAME, RecipeCalculatorService, 'loadRecipe'),
        new Btn(BTN.SAVE_RECIPE, RecipeCalculatorService, 'addRecipeToItemAndRecipes')
        ]
      ],
      [SHT.PROFILE, [
        new Btn(BTN.COPY_CALORIES, ProfileService, 'copyCalories')]
      ],
      [SHT.SETTINGS, [           
        new Btn(BTN.APPLY_SETTINGS, SettingsService, 'applySettings'),
        new Btn(BTN.IMPORT, ImportService, 'startImport')
        ]
      ],
      [SHT.TUTORIAL, [
        new Btn(BTN.TUTORIAL_TEST, TutorialService, 'tutorialTestButton'),
        new Btn(BTN.SKIP_TUTORIAL, TutorialService, 'resetTutorial'),
        new Btn(BTN.TUTORIAL_NEXT, TutorialService, 'tutorialNext')
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