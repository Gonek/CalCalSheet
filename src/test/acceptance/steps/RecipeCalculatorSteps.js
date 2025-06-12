class RecipeCalculatorGivenSteps extends Steps{

    test_items_available(){
        this.test.utils.addTestIems();
    }

    test_recipes_available(){
        this.test.utils.addTestRecipes();
    }

    recipe_name_as(name){
        getRng(RNG.RECIPE_NAME).setValue(name);
    }

    basic_items(){
        this.items_as([
            ['Test 100g', 150],
            ['Green', 50],
            ['Yellow', 75],
            ['Red', 200],
            ['All 100', 350],
            ['All 1', 20]
        ]);
    }

    items_as(items){
        getRng(RNG.RECIPE_ITEMS).setValuesWithResize(items);
    }

    serving_as(servingPerMeal, unit){
        getRng(RNG.RECIPE_SERVING).setValuesWithResize([[servingPerMeal], [unit]]);
    }

    noom_category_as(noomCategory){
        getRng(RNG.RECIPE_NOOM_CATEGORY).setValue(noomCategory);
    }

    set_saved_as_recipe(boolean){
        getRng(RNG.RECIPE_SAVE_AS_RECIPE).setValue(boolean);
    }

    select_meal_to_load(name){
        getRng(RNG.LOAD_RECIPE_NAME).setValue(name);
    }
}

class RecipeCalculatorWhenSteps extends Steps{
    save_as_item_clicked(){
        this.clickButton(SPR.RECIPE_CALCULATOR, BTN.SAVE_RECIPE);
    }

    load_recipe_clicked(){
        this.clickButton(SPR.RECIPE_CALCULATOR, BTN.LOAD_RECIPE);
    }
}

class RecipeCalculatorThenSteps extends ItemThenSteps{

    recipe_saved_with_name(name){
        this.name = name;
        let recipeFind = getSpr(SPR.RECIPES).getValues('B4:D').find(r => r[0] == name);
        this.test.assertTrue(recipeFind);
    }

    no_recipe_saved_with_name(name){
        let recipeFind = getSpr(SPR.RECIPES).getValues('B4:D').find(r => r[0] == name);
        this.test.assertFalse(recipeFind);
    }

    recipe_have_basic_items(){
        this.recipe_have_items([
            ['Test 100g', 150],
            ['Green', 50],
            ['Yellow', 75],
            ['Red', 200],
            ['All 100', 350],
            ['All 1', 20]
        ]);
    }

    recipe_have_items(items){
        let filtered = getSpr(SPR.RECIPES).getValues('B4:D').filter(i => i[0] === this.name);
        this.test.assertEqualsArray(filtered, items.map(i => [this.name, i[0], i[1]]));
    }

    form_have_recipe_name_loaded(name){
        this.name = name;
        this.test.assertEquals(getRng(RNG.RECIPE_NAME).getValue(), name);
    }

    form_have_recipe_items_loaded(items){
        this.test.assertEquals(getRng(RNG.RECIPE_ITEMS).getValues(), items);
    }

    form_is_clear(){
        this.test.assertEmpty(getRng(RNG.RECIPE_NAME).getValue());
        this.test.assertArrayEmpty(getRng(RNG.RECIPE_ITEMS).getValues());
        this.test.assertArrayEmpty(getRng(RNG.RECIPE_SERVING).getValues());
        this.test.assertEquals(getRng(RNG.RECIPE_NOOM_CATEGORY).getValue(), 'Solid');
        this.test.assertEquals(getRng(RNG.RECIPE_SAVE_AS_RECIPE).getValue(), true);
    }

    recipe_name_clear(){
        this.test.assertEmpty(getRng(RNG.LOAD_RECIPE_NAME).getValue());
    }
}