class MealRepository extends GroupRepository{

  constructor(){
    super(SPR.MEALS);
  }

  saveMeal(meal){
    this.save(meal);
  }
}
