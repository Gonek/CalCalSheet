 class RecipeCalculatorScenarios extends AcceptanceTestBase{

    constructor(){
      super(RecipeCalculatorGivenSteps, RecipeCalculatorWhenSteps, RecipeCalculatorThenSteps);
    }

    clearData(){
      testData.clearItems();
      testData.clearRecipes();
      testData.clearRecipeCalculator();
    }
    
    scenario_add_item_and_recipe(){
        this.scenario('Add new item and recipe using "Recipe calculator"')
          .given()
            .test_items_available().and()
            .recipe_name_as('Basic recipe item').and()
            .basic_items()
          .when()
            .save_as_item_clicked()
          .then()
            .item_saved_with_name('Basic recipe item').and()
            .have_serving_as(100, 'g', 1).and()
            .have_calories_as(251.5).and()
            .have_total_fat_as(59.8).and()
            .have_saturated_fat_as(59.3).and()
            .have_trans_fat_as(59.6).and()
            .have_carbohydrate_as(64.5).and()
            .have_fiber_as(66.6).and()
            .have_sugar_as(60.8).and()
            .have_sugar_alcohol_as(60.5).and()
            .have_protein_as(64.2).and()
            .have_sodium_as(78.8).and()
            .have_price_as(48.88, 0.49).and()
            .have_noom_colour_of('Red').and()
            .have_auto_delete_at_empty().and()
            .recipe_saved_with_name('Basic recipe item').and()
            .recipe_have_basic_items().and()
            .form_is_clear();
  }

  scenario_add_item_as_one_serving(){
      this.scenario('Add new item as one serving using "Recipe calculator"')
        .given()
          .test_items_available().and()
          .recipe_name_as('1 serving recipe item').and()
          .basic_items().and()
          .serving_as(1, 'serving')
        .when()
          .save_as_item_clicked()
        .then()
          .item_saved_with_name('1 serving recipe item').and()
          .have_serving_as(1, 'serving', 845).and()
          .have_calories_as(2125.18).and()
          .have_total_fat_as(505.31).and()
          .have_saturated_fat_as(501.09).and()
          .have_trans_fat_as(503.62).and()
          .have_carbohydrate_as(545.03).and()
          .have_fiber_as(562.77).and()
          .have_sugar_as(513.76).and()
          .have_sugar_alcohol_as(511.23).and()
          .have_protein_as(542.49).and()
          .have_sodium_as(665.86).and()
          .have_price_as(413.04, 0.49).and()
          .have_noom_colour_of('Red').and()
          .have_auto_delete_at_empty().and()
          .form_is_clear();
  }

  scenario_save_as_recipe_not_selected(){
    this.scenario('Add new item but not recipe using "Recipe calculator"')
      .given()
        .test_items_available().and()
        .recipe_name_as('No recipe item').and()
        .basic_items().and()
        .set_saved_as_recipe(false)
      .when()
        .save_as_item_clicked()
      .then()
        .no_recipe_exist_with_name('No recipe item').and()
        .form_is_clear();
  }

  scenario_replace_item(){
    this.scenario('Replace item using "Recipe calculator"')
      .given()
        .test_items_available().and()
        .recipe_name_as('Test 100g').and()
        .basic_items().and()
        .set_saved_as_recipe(false)
      .when()
        .save_as_item_clicked()
      .then()
        .item_saved_with_name('Test 100g').and()
        .there_is_only_one_item_saved_with_this_name().and()
        .have_serving_as(100, 'g', 1).and()
        .have_calories_as(251.5).and()
        .have_total_fat_as(59.8).and()
        .have_saturated_fat_as(59.3).and()
        .have_trans_fat_as(59.6).and()
        .have_carbohydrate_as(64.5).and()
        .have_fiber_as(66.6).and()
        .have_sugar_as(60.8).and()
        .have_sugar_alcohol_as(60.5).and()
        .have_protein_as(64.2).and()
        .have_sodium_as(78.8).and()
        .have_price_as(48.88, 0.49).and()
        .have_noom_colour_of('Red').and()
        .have_auto_delete_at_empty().and()
        .form_is_clear();
  }

  scenario_add_item_with_auto_delete_at_3_day(){
    this.scenario('Add item with auto delete in 3 days')
      .given()
        .test_items_available().and()
        .recipe_name_as('Test 100g').and()
        .basic_items().and()
        .auto_delete_at_as('3 Day').and()
        .set_saved_as_recipe(false)
      .when()
        .save_as_item_clicked()
      .then()
        .item_saved_with_name('Test 100g').and()
        .have_auto_delete_at_as(getRelativeDay(+3)).and()
        .form_is_clear();
  }

  scenario_load_recipe_modify_replace(){
    this.scenario('Load recipe to recipe calculator modify items and replace original')
      .given()
        .test_recipes_available()
      .when()
        .recipe_name_set_to('Recipe1')
      .then()
        .form_have_recipe_name_loaded('Recipe1').and()
        .form_have_recipe_items_loaded([['Green', 100],
                                        ['Yellow', 200],
                                        ['Red', 300],
                                        ['Green', 400],
                                        ['Yellow', 500],
                                        ['Red', 600],
                                        ['Green', 700],
                                        ['Yellow', 800],
                                        ['Red', 900],
                                        ['Green', 1100],
                                        ['Yellow', 1200],
                                        ['Red', 1300],
                                        ['Green', 1400],
                                        ['Yellow', 1500],
                                        ['Red', 1600],
                                        ['Green', 1700],
                                        ['Yellow', 1800],
                                        ['Red', 1900],
                                        ['Green', 2100],
                                        ['Yellow', 2200],
                                        ['Red', 2300],
                                        ['Green', 2400],
                                        ['Yellow', 2500],
                                        ['Red', 2600],
                                        ['Green', 2700]])
        .given()
          .basic_items().and()
          .set_saved_as_recipe(true)
        .when()
          .save_as_item_clicked()
        .then()
          .item_saved_with_name('Recipe1').and()
          .have_auto_delete_at_empty().and()
          .recipe_saved_with_name('Recipe1').and()
          .recipe_have_basic_items().and()
          .form_is_clear();
  }

  scenario_delete_one_recipe(){
    this.scenario('Delete recipes on "Recipe Calculator" delete one recipe')
      .given()
        .test_recipes_available().and()
        .delete_recipes_as('Recipe1')
      .when()
        .delete_recipes_clicked()
      .then()
        .no_recipe_exist_with_name('Recipe1');
  }

  scenario_delete_multiple_recipes(){
    this.scenario('Delete recipes on "Recipe Calculator" delete multiple selected recipes')
      .given()
        .test_recipes_available().and()
        .delete_recipes_as('Recipe1, Recipe3')
      .when()
        .delete_recipes_clicked()
      .then()
        .no_recipe_exist_with_name('Recipe1').and()
        .no_recipe_exist_with_name('Recipe3');
  }

  scenario_delete_recipes_when_no_recipe_selected(){
    this.scenario('Try to delete recipes on "Recipe Calculator" when no recipes selected')
      .given()
        .test_recipes_available().and()
        .delete_recipes_as('')
      .when()
        .delete_recipes_clicked()
      .then()
        .number_of_recipes_are(3);
  }
}

var runRecipeCalculatorScenarios = () => new RecipeCalculatorScenarios().runAllTests();