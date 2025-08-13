class MealRepository extends GroupRepository{

  constructor(){
    super(SHT.MEALS);
  }

  saveMeal(meal){
    this.save(meal);
  }
}
