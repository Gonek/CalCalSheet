class EventServiceTest extends TestBase {
    beforeAll(){
        super.beforeAll();
        this.daySht = mockSht(SHT.DAY);
        this.newItemSht = mockSht(SHT.NEW_ITEM);
        this.recipeCalculatorSht = mockSht(SHT.RECIPE_CALCULATOR);
        this.profileSht = mockSht(SHT.PROFILE);
        this.settingsSht = mockSht(SHT.SETTINGS);
        this.tuturialSht = mockSht(SHT.TUTORIAL);
        this.dayService = mock(DayService);
        this.newItemService = mock(NewItemService);
        this.recipeCalculatorService = mock(RecipeCalculatorService);
        this.profileService = mock(ProfileService);
        this.settingsService = mock(SettingsService);
        this.importService = mock(ImportService);
        this.tutorialService = mock(TutorialService);
        this.itemRepository = mock(ItemRepository);

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
            [SHT.DAY, CBOX.DAY_NAME, this.dayService, 'changeDay'],
            [SHT.DAY, CBOX.MEAL_1_START, this.dayService, 'loadMeal'],
            [SHT.DAY, CBOX.MEAL_2_START, this.dayService, 'loadMeal'],
            [SHT.DAY, CBOX.MEAL_3_START, this.dayService, 'loadMeal'],
            [SHT.DAY, CBOX.MEAL_4_START, this.dayService, 'loadMeal'],
            [SHT.DAY, CBOX.MEAL_5_START, this.dayService, 'loadMeal'],
            [SHT.DAY, CBOX.MEAL_6_START, this.dayService, 'loadMeal'],
            [SHT.DAY, BTN.SAVE_MEAL, this.dayService, 'saveMeal'],
            [SHT.DAY, BTN.COPY_MEALS, this.dayService, 'copyMeals'],
            [SHT.NEW_ITEM, CBOX.NEW_ITEM_NAME, this.newItemService, 'loadItem'],
            [SHT.NEW_ITEM, BTN.SAVE_ITEM, this.newItemService, 'addNewItem'],
            [SHT.RECIPE_CALCULATOR, CBOX.RECIPE_NAME, this.recipeCalculatorService, 'loadRecipe'],
            [SHT.RECIPE_CALCULATOR, BTN.SAVE_RECIPE, this.recipeCalculatorService, 'addRecipeToItemAndRecipes'],
            [SHT.PROFILE, BTN.COPY_CALORIES, this.profileService, 'copyCalories'],
            [SHT.SETTINGS, BTN.APPLY_SETTINGS, this.settingsService, 'applySettings'],
            [SHT.SETTINGS, BTN.IMPORT, this.importService, 'startImport'],
            [SHT.TUTORIAL, BTN.TUTORIAL_TEST, this.tutorialService, 'tutorialTestButton'],
            [SHT.TUTORIAL, BTN.SKIP_TUTORIAL, this.tutorialService, 'resetTutorial'],
            [SHT.TUTORIAL, BTN.TUTORIAL_NEXT, this.tutorialService, 'tutorialNext']
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
            clearMockCalls();
        })
    }

    createEvent(sheetId, A1Pos){
        return { 
            source : { 
                getSheetId(){ 
                    return sheetId 
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