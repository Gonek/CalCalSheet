// DATA MODEL

class Meal extends Group{
  constructor(name, items){
    super(`${MEAL_ICON} ${name}`, items);
  }
}

// REPOSITORY

class MealRepository extends GroupRepository{

  constructor(){
    super(MEALS);
  }

  saveMeal(meal){
    this.save(meal);
  }
}

// REPOSITORY SINGLETON
var mealRepositorySingleton;

/** 
 * Returns the meal repository sigleton
 * @returns {MealRepository} meal repository singleton
 */
var mealRepository = () => mealRepositorySingleton = mealRepositorySingleton || new MealRepository();
