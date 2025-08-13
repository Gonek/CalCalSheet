class RecipeCalculatorGivenSteps extends Steps{

    test_items_available(){
        testData.addTestItems();
    }

    test_recipes_available(){
        testData.addTestRecipes();
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

    auto_delete_at_as(value){
        let autoDeleteRng = getRng(RNG.RECIPE_AUTO_DELETE);
        autoDeleteRng.setValue(value);
    }

    delete_recipes_as(names){
        getRng(BTNF.DELETE_RECIPES).setValue(names);
    }
}

class RecipeCalculatorWhenSteps extends Steps{
    save_as_item_clicked(){
        this.clickButton(SHT.RECIPE_CALCULATOR, BTN.SAVE_RECIPE);
    }

    recipe_name_set_to(name){
        this.changeCbox(SHT.RECIPE_CALCULATOR, CBOX.RECIPE_NAME, name);
    }

    delete_recipes_clicked(){
        this.clickButtonWithField(SHT.RECIPE_CALCULATOR, BTNF.DELETE_RECIPES, 'E42', 4);
    }
}

class RecipeCalculatorThenSteps extends ItemThenSteps{

    recipe_saved_with_name(name){
        this.name = name;
        let recipeFind = getSht(SHT.RECIPES).getValues('B4:D').find(r => r[0] == name);
        assertTrue(recipeFind);
    }

    no_recipe_exist_with_name(name){
        let recipeFind = getSht(SHT.RECIPES).getValues('B4:D').find(r => r[0] == name);
        assertFalse(recipeFind);
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
        let filtered = getSht(SHT.RECIPES).getValues('B4:D').filter(i => i[0] === this.name);
        assertEqualsArray(filtered, items.map(i => [this.name, i[0], i[1]]));
    }

    number_of_recipes_are(count){
        let countSaved = [...new Set(getSht(SHT.RECIPES).getRng('B4:B').getColAsArray())].length;
        assertEquals(countSaved-1, count);
    }

    form_have_recipe_name_loaded(name){
        this.name = name;
        assertEquals(getRng(RNG.RECIPE_NAME).getValue(), name);
    }

    form_have_recipe_items_loaded(items){
        assertEquals(getRng(RNG.RECIPE_ITEMS).getValues(), items);
    }

    form_is_clear(){
        assertEmpty(getRng(RNG.RECIPE_NAME).getValue());
        assertArrayEmpty(getRng(RNG.RECIPE_ITEMS).getValues());
        assertArrayEmpty(getRng(RNG.RECIPE_SERVING).getValues());
        assertEquals(getRng(RNG.RECIPE_NOOM_CATEGORY).getValue(), 'Solid');
        assertEquals(getRng(RNG.RECIPE_SAVE_AS_RECIPE).getValue(), true);
    }
}