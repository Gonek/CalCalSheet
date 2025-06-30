class MealRepositoryTest extends TestBase {
    beforeAll(){
        super.beforeAll();
        this.mealSht = mockSht(SHT.MEALS);
        this.mealRepository = new MealRepository();
    }

    shouldSaveMealDeleteExistingMealAndSaveNew(){
        // GIVEN
        var meal = new Meal('Meal', [['Item 1', 10],['Item 2', 20],['Item 3', 30]]); 
        when(this.mealSht).getValues('B4:B').thenReturn([['🥣 First'],['🥣 Secound'], ['🥣 Meal'], ['🥣 Meal']]);
        // WHEN
        this.mealRepository.saveMeal(meal);
        // THEN
        verify(this.mealSht).deleteRows(6,8).calledOnce();
        verify(this.mealSht).putDataAtEnd([['🥣 Meal','Item 1',10],['🥣 Meal','Item 2',20],['🥣 Meal','Item 3',30]]).calledOnce();
        verify(this.mealSht).sort(2).calledOnce();
    }

    shouldSaveMealNotDeleteMealsJustAndSaveNewIfMealNotExistYet(){
        // GIVEN
        var meal = new Meal('Meal', [['Item 1', 10],['Item 2', 20],['Item 3', 30]]); 
        when(this.mealSht).getValues('B4:B').thenReturn([['🥣 First'],['🥣 Secound']]);
        // WHEN
        this.mealRepository.saveMeal(meal);
        // THEN
        verify(this.mealSht).deleteRows(any()).neverCalled();
        verify(this.mealSht).putDataAtEnd([['🥣 Meal','Item 1',10],['🥣 Meal','Item 2',20],['🥣 Meal','Item 3',30]]).calledOnce();
        verify(this.mealSht).sort(2).calledOnce();
    }
}

var runMealRepositoryTests = () => new MealRepositoryTest().runAllTests();