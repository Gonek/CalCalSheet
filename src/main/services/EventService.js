// INTERFACE

var onEdit = (e) => getObj(EventService).onEdit(e);
var onOpen = (e) => getObj(EventService).onOpen(e);
var testButton = () => getObj(EventService).testButton(SPR.NEW_ITEM, CBOX.NEW_ITEM_NAME);

// OTHER FUNCTIONS
var startImport = () => getObj(ImportService).startImport();

// CLASS

class EventService {

  constructor(){
    this.btns = [
      [SPR.DAY, [                
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
      [SPR.NEW_ITEM, [
        new CBox(CBOX.NEW_ITEM_NAME, NewItemService, 'loadItem'),
        new Btn(BTN.SAVE_ITEM, NewItemService, 'addNewItem')]
      ],
      [SPR.RECIPE_CALCULATOR, [  
        new CBox(CBOX.RECIPE_NAME, RecipeCalculatorService, 'loadRecipe'),
        new Btn(BTN.SAVE_RECIPE, RecipeCalculatorService, 'addRecipeToItemAndRecipes')
        ]
      ],
      [SPR.PROFILE, [
        new Btn(BTN.COPY_CALORIES, ProfileService, 'copyCalories')]
      ],
      [SPR.SETTINGS, [           
        new Btn(BTN.APPLY_SETTINGS, SettingsService, 'applySettings'),
        new Btn(BTN.IMPORT, ImportService, 'startImport')
        ]
      ],
      [SPR.TUTORIAL, [
        new Btn(BTN.TUTORIAL_TEST, TutorialService, 'tutorialTestButton'),
        new Btn(BTN.SKIP_TUTORIAL, TutorialService, 'resetTutorial'),
        new Btn(BTN.TUTORIAL_NEXT, TutorialService, 'tutorialNext')
        ]
      ]
    ];
  }

  onEdit(e){
    try{
      let sheetName = e.source.getSheetName();
      let a1Pos = e.range.getA1Notation();
      this.checkButtons(sheetName, a1Pos);
    } catch(error){
      alert(error + " " + error.stack);
    }
  }

  onOpen(e){
    try{
      getObj(DayService).finishDay();
      getObj(ItemRepository).autoDeleteItems();
    }catch(error){
      alert(error + " " + error.stack);
    }
  }

  testButton(sheetName, btnName){
    this.checkButtons(sheetName, getRng(btnName).getA1Pos());
  }

  checkButtons(sheetName, a1Pos){
    let sheetBtns = this.btns.find(s => s[0] == sheetName);
    if(sheetBtns){
      let btn = sheetBtns[1].find(btn => btn.isSamePos(a1Pos, btn));
      if(btn){
        btn.run();
      }
    }             
  }

  isCellIsRangeCell(e, range){
    return e.range.getA1Notation() == getRng(range).getA1Pos();
  }

  isCellInPositionInSheet(e, sheet, pos) {
    return (e.source.getSheetName() == sheet) && (e.range.getA1Notation() == pos);
  }

  isCellInPositions(e, pos) {
    return pos.includes(e.range.getA1Notation());
  }

  mealLoaderFieldChanged(e) {
    if(String(e.range.getValue()).indexOf(MEAL_ICON) == 0){
    }
  }
}