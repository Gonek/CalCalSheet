class RecipeCalculatorTest extends TestBase {

  constructor(){
    super();
    this.spr = new Spr(RECIPE_CALCULATOR);
    this.itemsSpr = new Spr(ITEMS);
    this.recipesSpr  = new Spr(RECIPES);
    this.loadRecipeNameRng = new Rng(RNG_LOAD_RECIPE_NAME);
    this.recipeNameRng = new Rng(RNG_RECIPE_NAME);
    this.recipeItemsRng = new Rng(RNG_RECIPE_ITEMS);
    this.recipeServingRng = new Rng(RNG_RECIPE_SERVING);
    this.recipeNoomColourRng = new Rng(RNG_RECIPE_NOOM_COLOUR);
    this.selectedRecipeItemsRng = new Rng(RNG_SELECTED_RECIPE_ITEMS);
  }

  beforeAll(){
    super.beforeAll();
    this.utils.addTestIems();
  }

  afterAll(){
    super.afterAll();
    this.utils.clearItems();
  }


  clearData(){
    this.recipeNameRng.clear();
    this.recipeItemsRng.clear();
    this.recipeServingRng.clear();
  }

  shouldRecipeCalculatorSheetHaveCorrectFormulaForItems(){
    //GIVEN
    let expected = Array.from({length:25},(v,k)=>[
      `=MATCH(B${k + 7}, Items!B$4:B, 0)`,
      `=IFERROR(INDEX(Items!D$4:D, $D${k + 7}, 0))`,
      `=IFERROR(INDEX(Items!E$4:E, $D${k + 7}, 0)*$C${k + 7})`,
      `=IFERROR(INDEX(Items!G$4:G, $D${k + 7}, 0)*$C${k + 7})`,
      `=IFERROR(INDEX(Items!I$4:I, $D${k + 7}, 0)*$C${k + 7})`,
      `=IFERROR(INDEX(Items!K$4:K, $D${k + 7}, 0)*$C${k + 7})`,
      `=IFERROR(INDEX(Items!M$4:M, $D${k + 7}, 0)*$C${k + 7})`,
      `=IFERROR(INDEX(Items!O$4:O, $D${k + 7}, 0)*$C${k + 7})`,
      `=IFERROR(INDEX(Items!Q$4:Q, $D${k + 7}, 0)*$C${k + 7})`,
      `=IFERROR(INDEX(Items!S$4:S, $D${k + 7}, 0)*$C${k + 7})`,
      `=IFERROR(INDEX(Items!U$4:U, $D${k + 7}, 0)*$C${k + 7})`,
      `=IFERROR(INDEX(Items!W$4:W, $D${k + 7}, 0)*$C${k + 7})`,
      `=IFERROR(INDEX(Items!Y$4:Y, $D${k + 7}, 0)*$C${k + 7})`
    ]);
    //WHEN
    let result = this.spr.getFormulas('D7:P31');
    //THEN
    this.assertEquals(result, expected);
  }

  shouldRecipeCalculatorSheetHaveCorrectFormulaForNutritions(){
    //GIVEN
    let expected100g = [
      '=ROUND(IFERROR(SUM(G7:G31)/$A$32),1)', 
      '=ROUND(IFERROR(SUM(H7:H31)/$A$32),1)',
      '=ROUND(IFERROR(SUM(I7:I31)/$A$32),1)',
      '=ROUND(IFERROR(SUM(J7:J31)/$A$32),1)',
      '=ROUND(IFERROR(SUM(K7:K31)/$A$32),1)',
      '=ROUND(IFERROR(SUM(L7:L31)/$A$32),1)',
      '=ROUND(IFERROR(SUM(M7:M31)/$A$32),1)',
      '=ROUND(IFERROR(SUM(N7:N31)/$A$32),1)',
      '=ROUND(IFERROR(SUM(O7:O31)/$A$32),1)',
      '=ROUND(IFERROR(SUM(P7:P31)/$A$32),1)'
    ];
    let expectedSave = [
      '=IF(ISNUMBER(C34),1,100)',
      '',
      '=IF(ISNUMBER(C34), IF(ISBLANK(C35), "serving", C35), "g")',
      '=A33*100',
      '=$A$33*G32',
      '=$A$33*H32',
      '=$A$33*I32',
      '=$A$33*J32',
      '=$A$33*K32',
      '=$A$33*L32',
      '=$A$33*M32',
      '=$A$33*N32',
      '=$A$33*O32',
      '=$A$33*P32'
    ]
    //WHEN
    let result100g = this.spr.getFormulas('G32:P32');
    let resultSave = this.spr.getFormulas('C33:P33');
    //THEN
    this.assertEquals(result100g, expected100g);
    this.assertEquals(resultSave, expectedSave);
  }

  shouldRecipeCalculatorSheetHaveCorrectBackgroundFormulaForCalculation(){
    //GIVEN
    let expectedNutriCalc = [
      ['=SUM(F7:F31)/100'],
      ['=IF(ISNUMBER(C34),A32/C34,1)']
    ];
    let expectedSelRecipe = '=IFERROR(FILTER(Recipes!$C$4:$D, $B$3=Recipes!$B$4:$B))';
    //WHEN
    let resultNutriCals = this.spr.getFormulas('A32:A33');
    let resultSelRecipe = this.spr.getFormula('R7');
    //THEN
    this.assertEquals(resultNutriCals, expectedNutriCalc);
    this.assertEquals(resultSelRecipe, expectedSelRecipe);
  }

    shouldRecipeCalculatorSheetHaveCorrectFormulaForNoom(){
    //GIVEN
    let expected = '=IFS(RecipeNoomCategory="Solid", IFS(G32= "", "", G32<=100, "Green", G32<=240, "Yellow", G32>240, "Red"), RecipeNoomCategory="Liquid", IFS(G32= "", "", G32<=40, "Green", G32<=50, "Yellow", G32>50, "Red"), RecipeNoomCategory = "Soup", IFS(G32= "", "", G32<=50, "Green", G32<=100, "Yellow", G32>100, "Red"))';
    //WHEN
    let result = this.recipeNoomColourRng.getFormula();
    //THEN
    this.assertEquals(result, expected);
  }

  shouldRecipeCalculatorSheetHaveCorrectFormatForItems(){
    //GIVEN
    let items = Array(25).fill(['All 100', 100]);
    let expected = Array.from({length:25},(v,k)=>['g', '100 g', '100 kcal', '100.0 g', '100.0 g', '100.0 g', '100.0 g', '100.0 g', '100.0 g', '100.0 g', '100.0 g', '100 mg']);
    //WHEN
    this.recipeItemsRng.setValues(items);
    let result = this.spr.getDisplayValues('E7:P31');
    //THEN
    this.assertEquals(result, expected);
  }

  shouldRecipeCalculatorSheetHaveCorrectFormatForNutritions(){
    //GIVEN
    let items = Array(25).fill(['All 100', 100]);
    let expected = Array.from({length:2},(v,k)=>['g', '100 g', '100 kcal', '100.0 g', '100.0 g', '100.0 g', '100.0 g', '100.0 g', '100.0 g', '100.0 g', '100.0 g', '100 mg']);
    //WHEN
    this.recipeItemsRng.setValues(items);
    let result = this.spr.getDisplayValues('E32:P33');
    //THEN
    this.assertEquals(result, expected);
  }

  shouldRecipeCalculatorSheetLeave100gNutritions0IfNoItemAdded(){
    //GIVEN
    let expected = ['g', '100 g', '0 kcal', '0.0 g', '0.0 g', '0.0 g', '0.0 g', '0.0 g', '0.0 g', '0.0 g', '0.0 g', '0 mg'];
    //WHEN
    let result = this.spr.getDisplayValues('E32:P32');
    //THEN
    this.assertEquals(result, expected);
  }

  shouldRecipeCalculatorSheetReturnRightIndexForItems(){
    // GIVEN
    let items = Array(5).fill(['First', 100]).concat(
                Array(5).fill(['Second', 100]),
                Array(5).fill(['Third', 100]),
                Array(10).fill(['Last', 100]))
    let expected = Array(5).fill(1)
           .concat(Array(5).fill(2))
           .concat(Array(5).fill(3))
           .concat(Array(10).fill(this.utils.LAST_ITEM_INDEX));

    // WHEN
    this.recipeItemsRng.setValues(items);
    let result = this.spr.getValues('D7:D31').flat();

    // THEN
    this.assertEquals(result, expected);
  }

  shouldRecipeCalculatorSheetCalculateItemNutritionRightFor100g(){
    //GIVEN
    let itemName = 'Test 100g';
    let itemAmount = 250;
    let expected = ['g', 250, 925, 25, 12.5, 12.5, 75, 100, 12.5, 2.5, 50, 250];
    //WHEN
    this.recipeItemsRng.setValue(itemName, 1, 1);
    this.recipeItemsRng.setValue(itemAmount, 1, 2);
    let result = this.spr.getValues('E7:P7');
    //THEN
    this.assertEquals(result, expected);
  }

  shouldRecipeCalculatorSheetCalculateItemNutritionRightForServings(){
    //GIVEN
    let itemName = 'Test 1 serving';
    let itemAmount = 5;
    let expected = ['Serving', 250, 1250, 125, 10, 0, 225, 5, 105, 0, 20, 60];
    //WHEN
    this.recipeItemsRng.setValue(itemName, 1, 1);
    this.recipeItemsRng.setValue(itemAmount, 1, 2);
    let result = this.spr.getValues('E7:P7');
    //THEN
    this.assertEquals(result, expected);
  }

  shouldRecipeCalculatorSheetCalculateRecipeCalorieFor100gCorreclty(){
    //GIVEN
    let items = [['Green', 200], ['Yellow', 100], ['Red', 100]];
    let expected = ['g', 100, 225, 22.5, 23.5, 24.5, 25.5, 26.5, 27.5, 28.5, 29.5, 30.5];
    //WHEN
    this.recipeItemsRng.setValuesWithResize(items);
    this.recipeServingRng.clear();
    let result100g = this.spr.getValues('E32:P32');
    let resultSave = this.spr.getValues('E33:P33');
    //THEN
    this.assertEquals(result100g, expected);
    this.assertEquals(resultSave, expected);
  }

  shouldRecipeCalculatorSheetCalculateRecipeCalorieFor1ServingCorreclty(){
    //GIVEN
    let serving = [[1], ['serving']];
    let items = [['Green', 200], ['Yellow', 100], ['Red', 100]];
    let expected100g = ['g', 100, 225, 22.5, 23.5, 24.5, 25.5, 26.5, 27.5, 28.5, 29.5, 30.5];
    let expectedSave = ['serving', 400, 900, 90, 94, 98, 102, 106, 110, 114, 118, 122];
    //WHEN
    this.recipeItemsRng.setValuesWithResize(items);
    this.recipeServingRng.setValuesWithResize(serving);
    let result100g = this.spr.getValues('E32:P32');
    let resultSave = this.spr.getValues('E33:P33');
    //THEN
    this.assertEquals(result100g, expected100g);
    this.assertEquals(resultSave, expectedSave);
  }

  shouldRecipeCalculatorSheetCalculateRecipeCalorieForMultipleServingCorreclty(){
    //GIVEN
    let serving = [[2], ['serving']];
    let items = [['Green', 200], ['Yellow', 100], ['Red', 100]];
    let expected100g = ['g', 100, 225, 22.5, 23.5, 24.5, 25.5, 26.5, 27.5, 28.5, 29.5, 30.5];
    let expectedSave = ['serving', 200, 450, 45, 47, 49, 51, 53, 55, 57, 59, 61];
    //WHEN
    this.recipeItemsRng.setValuesWithResize(items);
    this.recipeServingRng.setValuesWithResize(serving);
    let result100g = this.spr.getValues('E32:P32');
    let resultSave = this.spr.getValues('E33:P33');
    //THEN
    this.assertEquals(result100g, expected100g);
    this.assertEquals(resultSave, expectedSave);
  }

  shouldRecipeCalculatorSheetCalculateSolidGreenNoomCorreclty(){
    //GIVEN
    let item = [['Green', 200]];
    //WHEN
    this.recipeItemsRng.setValuesWithResize(item);
    let result = this.recipeNoomColourRng.getValue();
    //THEN
    this.assertEquals(result, 'Green');
  }

  shouldRecipeCalculatorSheetCalculateSolidYellowNoomCorreclty(){
    //GIVEN
    let item = [['Yellow', 200]];
    //WHEN
    this.recipeItemsRng.setValuesWithResize(item);
    let result = this.recipeNoomColourRng.getValue();
    //THEN
    this.assertEquals(result, 'Yellow');
  }

  shouldRecipeCalculatorSheetCalculateSolidRedNoomCorreclty(){
    //GIVEN
    let item = [['Red', 200]];
    //WHEN
    this.recipeItemsRng.setValuesWithResize(item);
    let result = this.recipeNoomColourRng.getValue();
    //THEN
    this.assertEquals(result, 'Red');
  }

  shouldRecipeCalculatorSheetLoadAllSavedRecepiesInTheRecipeSelector(){
    //GIVEN
    this.utils.addTestRecipes();
    let expected = ['Recipe1', 'Recipe2', 'Recipe3'];
    //WHEN
    let result = this.loadRecipeNameRng.getValidationCriteriaRangeValues();
    //THEN
    this.assertEquals(result, expected);
    this.utils.clearRecipes();
  }

  shouldRecipeCalculatorSheetLoadRecipeNameThrowExceptionIfRecipeNotExist(){
    //GIVEN WHEN THEN
    this.assertException(() => {
      this.loadRecipeNameRng.setValue('Invalid');
    }, 1);
    //RESET
    this.loadRecipeNameRng.clear;
  }

  shouldRecipeCalculatorSheetLoadAllItemsOfSelectedRecipeInBackground(){
    //GIVEN
    this.utils.addTestRecipes();
    let expected = [
      ['Green', 100],
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
      ['Green', 2700]
    ];
    //WHEN
    this.loadRecipeNameRng.setValue('Recipe1');
    let result = this.selectedRecipeItemsRng.getValues();
    //THEN
    this.assertEquals(result, expected);
    //RESET
    this.loadRecipeNameRng.clear();
    this.utils.clearRecipes()
  }

  shouldRecipeCalculatorSheetLeaveSelectedRecipeItemsEmptyIfNoRecipeSelected(){
    //GIVEN WHEN
    this.loadRecipeNameRng.clear();
    let result = this.selectedRecipeItemsRng.getValues();
    //THEN
    this.assertArrayEmpty(result);
  }


}

var runRecipeCalculatorTests = () => new RecipeCalculatorTest().runAllTests();