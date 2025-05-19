class MealRepositoryTest extends TestBase {
    constructor(){
        super();
        this.mealSpr = mockSpr(SPR.MEALS, this);
        this.mealRepository = new MealRepository();
    }

    shouldSaveMealDeleteExistingMealAndSaveNew(){
        // GIVEN
        var meal = new Meal('Meal', [['Item 1', 10],['Item 2', 20],['Item 3', 30]]); 
        when(this.mealSpr).getValues('B4:B').thenReturn([['🥣 First'],['🥣 Secound'], ['🥣 Meal'], ['🥣 Meal']]);
        // WHEN
        this.mealRepository.saveMeal(meal);
        // THEN
        verify(this.mealSpr).deleteRows(6,2).calledOnce();
        verify(this.mealSpr).putDataAtEnd([['🥣 Meal','Item 1',10],['🥣 Meal','Item 2',20],['🥣 Meal','Item 3',30]]).calledOnce();
        verify(this.mealSpr).sort(2).calledOnce();
    }

    shouldSaveMealNotDeleteMealsJustAndSaveNewIfMealNotExistYet(){
        // GIVEN
        var meal = new Meal('Meal', [['Item 1', 10],['Item 2', 20],['Item 3', 30]]); 
        when(this.mealSpr).getValues('B4:B').thenReturn([['🥣 First'],['🥣 Secound']]);
        // WHEN
        this.mealRepository.saveMeal(meal);
        // THEN
        verify(this.mealSpr).deleteRows(any()).neverCalled();
        verify(this.mealSpr).putDataAtEnd([['🥣 Meal','Item 1',10],['🥣 Meal','Item 2',20],['🥣 Meal','Item 3',30]]).calledOnce();
        verify(this.mealSpr).sort(2).calledOnce();
    }
}

var runMealRepositoryTests = () => new MealRepositoryTest().runAllTests();