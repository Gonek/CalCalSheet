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
        verify(this.mealSht).deleteRows(any(), any()).neverCalled();
        verify(this.mealSht).putDataAtEnd([['🥣 Meal','Item 1',10],['🥣 Meal','Item 2',20],['🥣 Meal','Item 3',30]]).calledOnce();
        verify(this.mealSht).sort(2).calledOnce();
    }

    shouldSaveMealDoNothingIfNoMealGiven(){
        // GIVEN
        var meal = null; 
        // WHEN
        this.mealRepository.saveMeal(meal);
        // THEN
        verify(this.mealSht).deleteRows(any(), any()).neverCalled();
        verify(this.mealSht).putDataAtEnd(any()).neverCalled();
        verify(this.mealSht).sort(any()).neverCalled();
    }

    shouldSaveMealDoNothingIfNoMealNameGiven(){
        // GIVEN
        var meal = new Meal('', [['Item 1', 10],['Item 2', 20],['Item 3', 30]]); 
        // WHEN
        this.mealRepository.saveMeal(meal);
        // THEN
        verify(this.mealSht).deleteRows(any(), any()).neverCalled();
        verify(this.mealSht).putDataAtEnd(any()).neverCalled();
        verify(this.mealSht).sort(any()).neverCalled();
    }

    shouldSaveMealDoNothingIfNoMealItemsGiven(){
        // GIVEN
        var meal = new Meal('Meal', []); 
        // WHEN
        this.mealRepository.saveMeal(meal);
        // THEN
        verify(this.mealSht).deleteRows(any(), any()).neverCalled();
        verify(this.mealSht).putDataAtEnd(any()).neverCalled();
        verify(this.mealSht).sort(any()).neverCalled();
    }

    shouldDeleteRemoveAllMealsWithGivenNameInDescOrder(){
        // GIVEN
        let names = ['meal1', 'meal3'];
        when(this.mealSht).getValues(REPOSITORY_AREA).thenReturn([['meal1'], ['meal1'], ['meal2'], ['meal3'], ['meal3'], ['meal3'], ['meal4']]);
        // WHEN
        this.mealRepository.delete(names);
        // THEN
        verify(this.mealSht).deleteRows(7, 10).calledInOrder(2);
        verify(this.mealSht).deleteRows(4, 6).calledInOrder(3);
    }

    shouldDeleteDoNothingIfGivenNamesAreNotFound(){
        // GIVEN
        let names = ['mealX', 'mealY'];
        when(this.mealSht).getValues(REPOSITORY_AREA).thenReturn([['meal1'], ['meal1'], ['meal2'], ['meal3'], ['meal3'], ['meal3'], ['meal4']]);
        // WHEN
        this.mealRepository.delete(names);
        // THEN
        verify(this.mealSht).deleteRows(any(), any()).neverCalled();
    }

    shouldDeleteDoNothingIfNoNamesWereGiven(){
        // GIVEN
        let names = [];
        // WHEN
        this.mealRepository.delete(names);
        // THEN
        verify(this.mealSht).deleteRows(any(), any()).neverCalled();
    }

    shouldDeleteDoNothingIfNamesAreNull(){
        // GIVEN
        let names = null;
        // WHEN
        this.mealRepository.delete(names);
        // THEN
        verify(this.mealSht).deleteRows(any(), any()).neverCalled();
    }
}

var runMealRepositoryTests = () => new MealRepositoryTest().runAllTests();