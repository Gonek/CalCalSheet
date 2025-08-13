// INTERFACE

var onEdit = (e) => eventService().onEdit(e);
var onOpen = (e) => eventService().onOpen(e);
var testButton = () => eventService().testButton(PROFILE, "C29");

// CLASS

class EventService {

  constructor(){
    this.btns = [
      [DAY,[                
        new CBox(RNG_DAY_NAME, changeDay),
        new CBox(RNG_MEAL_1_START, loadMeal1),
        new CBox(RNG_MEAL_2_START, loadMeal2),
        new CBox(RNG_MEAL_3_START, loadMeal3),
        new CBox(RNG_MEAL_4_START, loadMeal4),
        new CBox(RNG_MEAL_5_START, loadMeal5),
        new CBox(RNG_MEAL_6_START, loadMeal6),
        new Btn(BTN_SAVE_MEAL, saveMeal),
        new Btn(BTN_COPY_MEALS, copyMeals)
        ]
      ],
      [NEW_ITEM,[
        new Btn(BTN_SAVE_ITEM, addNewItem)]
      ],
      [RECIPE_CALCULATOR,[  
        new Btn(BTN_LOAD_RECIPE, loadRecipeToRecipeCalculator),
        new Btn(BTN_SAVE_RECIPE, addRecipeToItemAndRecipes)
        ]
      ],
      [PROFILE,[
        new Btn(BTN_COPY_CALORIES, copyCalories)]
      ],
      [SETTINGS,[           
        new Btn(BTN_APPLY_SETTINGS, applySettings)
        ]
      ],
      [TUTORIAL, [
        new Btn(BTN_TUTORIAL_TEST, tutorialTestButton),
        new Btn(BTN_SKIP_TUTORIAL, skipTutorial),
        new Btn(BTN_TUTORIAL_NEXT, tutorialNext)
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
      finishDay();
    }catch(error){
      alert(error + " " + error.stack);
    }
  }

  testButton(sheetName, a1Pos){
    this.checkButtons(sheetName, a1Pos);
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
    return e.range.getA1Notation() == new Rng(range).getA1Pos();
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

// SERVICE SINGLETON
var eventServiceSingleton;

/** 
 * Returns the event service
 * @returns {EventService} event service singleton
 */
var eventService = () => eventServiceSingleton = eventServiceSingleton || new EventService();
