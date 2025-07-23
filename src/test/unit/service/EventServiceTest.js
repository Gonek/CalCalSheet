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
            [SHT.DAY, CBOX.DAY_NAME, this.dayService, 'changeDay', 'G1'],
            [SHT.DAY, CBOX.MEAL_1_START, this.dayService, 'loadMeal', 'C15'],
            [SHT.DAY, CBOX.MEAL_2_START, this.dayService, 'loadMeal', 'C30'],
            [SHT.DAY, CBOX.MEAL_3_START, this.dayService, 'loadMeal', 'C45'],
            [SHT.DAY, CBOX.MEAL_4_START, this.dayService, 'loadMeal', 'C60'],
            [SHT.DAY, CBOX.MEAL_5_START, this.dayService, 'loadMeal', 'C75'],
            [SHT.DAY, CBOX.MEAL_6_START, this.dayService, 'loadMeal', 'C90'],
            [SHT.DAY, 'ItemAmounts', this.dayService, 'inLineCalculation', 'E17:E106'],
            [SHT.DAY, BTN.SHOW_TOOLS, this.dayService, 'showHideTools', 'X6'],
            [SHT.DAY, BTNF.SAVE_DAY_AS, this.dayService, 'saveDayAs', 'AE2'],
            [SHT.DAY, BTNF.LOAD_DAY, this.dayService, 'loadDayFrom', 'AE3'],
            [SHT.DAY, BTNF.DELETE_DAYS, this.dayService, 'deleteDays', 'AE4'],
            [SHT.DAY, BTN.CLEAR_DAY, this.dayService, 'clearDay', 'AE5'],
            [SHT.DAY, BTNF.SAVE_AS_MEAL, this.dayService, 'saveAsMeal', 'AE8'],
            [SHT.DAY, BTNF.COPY_MEAL_FROM, this.dayService, 'copyMealsFrom', 'AE9'],
            [SHT.DAY, BTNF.COPY_MEAL_TO, this.dayService, 'copyMealsTo', 'AE10'],
            [SHT.DAY, BTN.CLEAR_MEAL, this.dayService, 'clearMeals', 'AE11'],
            [SHT.DAY, BTNF.DELETE_MEALS, this.dayService, 'deleteMeals', 'AE13'],
            [SHT.NEW_ITEM, CBOX.NEW_ITEM_NAME, this.newItemService, 'loadItem', 'C3'],
            [SHT.NEW_ITEM, BTN.SAVE_ITEM, this.newItemService, 'addNewItem', 'E27'],
            [SHT.NEW_ITEM, BTNF.DELETE_ITEMS, this.newItemService, 'deleteItems', 'E33'],
            [SHT.RECIPE_CALCULATOR, CBOX.RECIPE_NAME, this.recipeCalculatorService, 'loadRecipe', 'B3'],
            [SHT.RECIPE_CALCULATOR, BTN.SAVE_RECIPE, this.recipeCalculatorService, 'addRecipeToItemAndRecipes', 'E38'],
            [SHT.RECIPE_CALCULATOR, BTNF.DELETE_RECIPES, this.recipeCalculatorService, 'deleteRecipes', 'E42'],
            [SHT.PROFILE, BTN.COPY_CALORIES, this.profileService, 'copyCalories', 'F31'],
            [SHT.SETTINGS, BTN.APPLY_SETTINGS, this.settingsService, 'applySettings', 'G29'],
            [SHT.SETTINGS, BTN.IMPORT, this.importService, 'startImport', 'L13'],
            [SHT.TUTORIAL, CBOX.LANGUAGE, this.settingsService, 'changeLanguage', 'J14'],
            [SHT.TUTORIAL, BTN.TUTORIAL_TEST, this.tutorialService, 'tutorialTestButton', 'H39'],
            [SHT.TUTORIAL, BTN.SKIP_TUTORIAL, this.tutorialService, 'resetTutorial', 'E619'],
            [SHT.TUTORIAL, BTN.TUTORIAL_NEXT, this.tutorialService, 'tutorialNext', 'K619']
        ];
        let base = this;
        data.forEach(d => {
            // GIVEN
            let rng = mockRng(d[1], base);
            when(rng).getA1Pos().thenReturn(d[4]);
            // WHEN
            onEdit(this.createEvent(d[0], d[4]));
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