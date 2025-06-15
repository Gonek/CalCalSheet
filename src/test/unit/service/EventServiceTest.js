class EventServiceTest extends TestBase {
    constructor(){
        super();
        this.daySpr = mockSpr(SPR.DAY, this);
        this.newItemSpr = mockSpr(SPR.NEW_ITEM, this);
        this.recipeCalculatorSpr = mockSpr(SPR.RECIPE_CALCULATOR, this);
        this.profileSpr = mockSpr(SPR.PROFILE, this);
        this.settingsSpr = mockSpr(SPR.SETTINGS, this);
        this.tuturialSpr = mockSpr(SPR.TUTORIAL, this);
        this.dayService = mock(DayService, this);
        this.newItemService = mock(NewItemService, this);
        this.recipeCalculatorService = mock(RecipeCalculatorService, this);
        this.profileService = mock(ProfileService, this);
        this.settingsService = mock(SettingsService, this);
        this.importService = mock(ImportService, this);
        this.tutorialService = mock(TutorialService, this);
        this.itemRepository = mock(ItemRepository, this);

        this.eventService = new EventService();
    }

    shouldOnOpenCallFinishDay(){
        // WHEN
        onOpen();
        // THEN
        verify(this.dayService).finishDay().calledOnce();
        verify(this.itemRepository).autoDeleteItems().calledOnce();
    }

    shouldOnEditCallEventLinkedToButton(){
        let data = [
            [SPR.DAY, CBOX.DAY_NAME, this.dayService, 'changeDay'],
            [SPR.DAY, CBOX.MEAL_1_START, this.dayService, 'loadMeal'],
            [SPR.DAY, CBOX.MEAL_2_START, this.dayService, 'loadMeal'],
            [SPR.DAY, CBOX.MEAL_3_START, this.dayService, 'loadMeal'],
            [SPR.DAY, CBOX.MEAL_4_START, this.dayService, 'loadMeal'],
            [SPR.DAY, CBOX.MEAL_5_START, this.dayService, 'loadMeal'],
            [SPR.DAY, CBOX.MEAL_6_START, this.dayService, 'loadMeal'],
            [SPR.DAY, BTN.SAVE_MEAL, this.dayService, 'saveMeal'],
            [SPR.DAY, BTN.COPY_MEALS, this.dayService, 'copyMeals'],
            [SPR.NEW_ITEM, CBOX.NEW_ITEM_NAME, this.newItemService, 'loadItem'],
            [SPR.NEW_ITEM, BTN.SAVE_ITEM, this.newItemService, 'addNewItem'],
            [SPR.RECIPE_CALCULATOR, CBOX.RECIPE_NAME, this.recipeCalculatorService, 'loadRecipe'],
            [SPR.RECIPE_CALCULATOR, BTN.SAVE_RECIPE, this.recipeCalculatorService, 'addRecipeToItemAndRecipes'],
            [SPR.PROFILE, BTN.COPY_CALORIES, this.profileService, 'copyCalories'],
            [SPR.SETTINGS, BTN.APPLY_SETTINGS, this.settingsService, 'applySettings'],
            [SPR.SETTINGS, BTN.IMPORT, this.importService, 'startImport'],
            [SPR.TUTORIAL, BTN.TUTORIAL_TEST, this.tutorialService, 'tutorialTestButton'],
            [SPR.TUTORIAL, BTN.SKIP_TUTORIAL, this.tutorialService, 'resetTutorial'],
            [SPR.TUTORIAL, BTN.TUTORIAL_NEXT, this.tutorialService, 'tutorialNext']
        ];
        let a1Pos = 'B2';
        let base = this;
        data.forEach(d => {
            // GIVEN
            let rng = mockRng(d[1], base);
            when(rng).getA1Pos().thenReturn(a1Pos);
            // WHEN
            onEdit(this.createEvent(d[0], a1Pos));
            // THEN
            verify(d[2])[d[3]](any()).calledOnce();
            this.clearMockCalls();
        })
    }

    createEvent(sheetName, A1Pos){
        return { 
            source : { 
            getSheetName(){ 
                return sheetName 
            }
            }, 
            range : { 
            getA1Notation(){ 
                return A1Pos 
            }
            }
        }
    }
}

var runEventServiceTests = () => new EventServiceTest().runAllTests();