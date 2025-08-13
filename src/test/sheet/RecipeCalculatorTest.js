class RecipeCalculatorTest extends TestBase {

    beforeAll(){
        super.beforeAll();
        this.sht = getSht(SHT.RECIPE_CALCULATOR);
        this.itemsSht = getSht(SHT.ITEMS);
        this.recipesSht  = getSht(SHT.RECIPES);
        this.recipeNameRng = getRng(RNG.RECIPE_NAME);
        this.recipeItemsRng = getRng(RNG.RECIPE_ITEMS);
        this.recipeServingRng = getRng(RNG.RECIPE_SERVING);
        this.recipeNoomColourRng = getRng(RNG.RECIPE_NOOM_COLOUR);
        this.selectedRecipeItemsRng = getRng(RNG.SELECTED_RECIPE_ITEMS);
        this.deleteRecipesBtnf = getRng(BTNF.DELETE_RECIPES);
        testData.addTestItems();
    }

    afterAll(){
        super.afterAll();
        testData.clearItems();
    }

    clearData(){
        this.recipeNameRng.clearContent();
        this.recipeItemsRng.clearContent();
        this.recipeServingRng.clearContent();
    }

    shouldRecipeCalculatorSheetHaveCorrectFormulaForItems(){
        //GIVEN
        let expected = Array.from({length:25},(v,k)=>[
          `=MATCH(B${k + 4}, Items!B$4:B, 0)`,
          `=IFERROR(INDEX(Items!D$4:D, $D${k + 4}, 0))`,
          `=IFERROR(INDEX(Items!E$4:E, $D${k + 4}, 0)*$C${k + 4})`,
          `=IFERROR(INDEX(Items!G$4:G, $D${k + 4}, 0)*$C${k + 4})`,
          `=IFERROR(INDEX(Items!I$4:I, $D${k + 4}, 0)*$C${k + 4})`,
          `=IFERROR(INDEX(Items!K$4:K, $D${k + 4}, 0)*$C${k + 4})`,
          `=IFERROR(INDEX(Items!M$4:M, $D${k + 4}, 0)*$C${k + 4})`,
          `=IFERROR(INDEX(Items!O$4:O, $D${k + 4}, 0)*$C${k + 4})`,
          `=IFERROR(INDEX(Items!Q$4:Q, $D${k + 4}, 0)*$C${k + 4})`,
          `=IFERROR(INDEX(Items!S$4:S, $D${k + 4}, 0)*$C${k + 4})`,
          `=IFERROR(INDEX(Items!U$4:U, $D${k + 4}, 0)*$C${k + 4})`,
          `=IFERROR(INDEX(Items!W$4:W, $D${k + 4}, 0)*$C${k + 4})`,
          `=IFERROR(INDEX(Items!Y$4:Y, $D${k + 4}, 0)*$C${k + 4})`
        ]);
        //WHEN
        let result = this.sht.getFormulas('D4:P28');
        //THEN
        assertEquals(result, expected);
    }

    shouldRecipeCalculatorSheetHaveCorrectFormulaForNutritions(){
        //GIVEN
        let expected100g = [
          '=ROUND(IFERROR(SUM(G4:G28)/$A$29),1)', 
          '=ROUND(IFERROR(SUM(H4:H28)/$A$29),1)',
          '=ROUND(IFERROR(SUM(I4:I28)/$A$29),1)',
          '=ROUND(IFERROR(SUM(J4:J28)/$A$29),1)',
          '=ROUND(IFERROR(SUM(K4:K28)/$A$29),1)',
          '=ROUND(IFERROR(SUM(L4:L28)/$A$29),1)',
          '=ROUND(IFERROR(SUM(M4:M28)/$A$29),1)',
          '=ROUND(IFERROR(SUM(N4:N28)/$A$29),1)',
          '=ROUND(IFERROR(SUM(O4:O28)/$A$29),1)',
          '=ROUND(IFERROR(SUM(P4:P28)/$A$29),1)'
        ];
        let expectedSave = [
          '=IF(ISNUMBER(C31),1,100)',
          '',
          '=IF(ISNUMBER(C31), IF(ISBLANK(C32), "serving", C32), "g")',
          '=ROUND(A30*100, 2)',
          '=ROUND($A$30*G29, 2)',
          '=ROUND($A$30*H29, 2)',
          '=ROUND($A$30*I29, 2)',
          '=ROUND($A$30*J29, 2)',
          '=ROUND($A$30*K29, 2)',
          '=ROUND($A$30*L29, 2)',
          '=ROUND($A$30*M29, 2)',
          '=ROUND($A$30*N29, 2)',
          '=ROUND($A$30*O29, 2)',
          '=ROUND($A$30*P29, 2)'
        ]
        //WHEN
        let result100g = this.sht.getFormulas('G29:P29');
        let resultSave = this.sht.getFormulas('C30:P30');
        //THEN
        assertEquals(result100g, expected100g);
        assertEquals(resultSave, expectedSave);
    }

    shouldRecipeCalculatorSheetHaveCorrectBackgroundFormulaForCalculation(){
        //GIVEN
        let expectedNutriCalc = [
          ['=SUM(F4:F28)/100'],
          ['=IF(ISNUMBER(C31),A29/C31,1)']
        ];
        let expectedSelRecipe = '=IFERROR(FILTER(Recipes!$C$4:$D, B3=Recipes!$B$4:$B))';
        let expectedRecipeNames = '=ARRAYFORMULA({B3;UNIQUE(Recipes!B4:B)})';
        //WHEN
        let resultNutriCals = this.sht.getFormulas('A29:A30');
        let resultSelRecipe = this.sht.getFormula('S4');
        let resultRecipeNames = this.sht.getFormula('U3');
        //THEN
        assertEquals(resultNutriCals, expectedNutriCalc);
        assertEquals(resultSelRecipe, expectedSelRecipe);
        assertEquals(resultRecipeNames, expectedRecipeNames);
    }

    shouldRecipeCalculatorSheetHaveCorrectFormulaForNoom(){
        //GIVEN
        let expectedColour = '=IFS(RecipeNoomCategory=Texts!B539, IFS(G29= "", "", G29<=100, Texts!B82, G29<=240, Texts!B83, G29>240, Texts!B84), RecipeNoomCategory=Texts!B540, IFS(G29= "", "", G29<=40, Texts!B82, G29<=50, Texts!B83, G29>50, Texts!B84), RecipeNoomCategory = Texts!B541, IFS(G29= "", "", G29<=50, Texts!B82, G29<=100, Texts!B83, G29>100, Texts!B84))';
        let expectedMatch = '=MATCH(C34, Texts!B82:B84, 0)';
        //WHEN
        let resultColour = this.recipeNoomColourRng.getFormula();
        let resultMatch = this.sht.getFormula('F34');
        //THEN
        assertEquals(resultColour, expectedColour);
        assertEquals(resultMatch, expectedMatch);
    }

    shouldRecipeCalculatorSheetHaveCorrectFormatForItems(){
        //GIVEN
        let items = Array(25).fill(['All 100', 100]);
        let expected = Array.from({length:25},(v,k)=>['g', '100 g', '100 kcal', '100.0 g', '100.0 g', '100.0 g', '100.0 g', '100.0 g', '100.0 g', '100.0 g', '100.0 g', '100 mg']);
        //WHEN
        this.recipeItemsRng.setValues(items);
        let result = this.sht.getDisplayValues('E4:P28');
        //THEN
        assertEquals(result, expected);
    }

    shouldRecipeCalculatorSheetHaveCorrectFormatForNutritions(){
        //GIVEN
        let items = Array(25).fill(['All 100', 100]);
        let expected = Array.from({length:2},(v,k)=>['g', '100 g', '100 kcal', '100.0 g', '100.0 g', '100.0 g', '100.0 g', '100.0 g', '100.0 g', '100.0 g', '100.0 g', '100 mg']);
        //WHEN
        this.recipeItemsRng.setValues(items);
        let result = this.sht.getDisplayValues('E29:P30');
        //THEN
        assertEquals(result, expected);
    }

    shouldRecipeCalculatorSheetLeave100gNutritions0IfNoItemAdded(){
        //GIVEN
        let expected = ['g', '100 g', '0 kcal', '0.0 g', '0.0 g', '0.0 g', '0.0 g', '0.0 g', '0.0 g', '0.0 g', '0.0 g', '0 mg'];
        //WHEN
        let result = this.sht.getDisplayValues('E29:P29');
        //THEN
        assertEquals(result, expected);
    }

    shouldRecipeCalculatorSheetReturnRightIndexForItems(){
        // GIVEN
        let items = Array(5).fill(['1 First', 100]).concat(
                    Array(5).fill(['2 Second', 100]),
                    Array(5).fill(['3 Third', 100]),
                    Array(10).fill(['ZZ Last', 100]))
        let expected = Array(5).fill(1)
              .concat(Array(5).fill(2))
              .concat(Array(5).fill(3))
              .concat(Array(10).fill(testData.LAST_ITEM_INDEX));

        // WHEN
        this.recipeItemsRng.setValues(items);
        let result = this.sht.getValues('D4:D28').flat();

        // THEN
        assertEquals(result, expected);
    }

    shouldRecipeCalculatorSheetCalculateItemNutritionRightFor100g(){
        //GIVEN
        let itemName = 'Test 100g';
        let itemAmount = 250;
        let expected = ['g', 250, 925, 25, 12.5, 12.5, 75, 100, 12.5, 2.5, 50, 250];
        //WHEN
        this.recipeItemsRng.setValue(itemName, 1, 1);
        this.recipeItemsRng.setValue(itemAmount, 1, 2);
        let result = this.sht.getValues('E4:P4');
        //THEN
        assertEquals(result, expected);
    }

    shouldRecipeCalculatorSheetCalculateItemNutritionRightForServings(){
        //GIVEN
        let itemName = 'Test 1 serving';
        let itemAmount = 5;
        let expected = ['Serving', 250, 1250, 125, 10, 0, 225, 5, 105, 0, 20, 60];
        //WHEN
        this.recipeItemsRng.setValue(itemName, 1, 1);
        this.recipeItemsRng.setValue(itemAmount, 1, 2);
        let result = this.sht.getValues('E4:P4');
        //THEN
        assertEquals(result, expected);
    }

    shouldRecipeCalculatorSheetCalculateRecipeCalorieFor100gCorreclty(){
        //GIVEN
        let items = [['Green', 200], ['Yellow', 100], ['Red', 100]];
        let expected = ['g', 100, 225, 22.5, 23.5, 24.5, 25.5, 26.5, 27.5, 28.5, 29.5, 30.5];
        //WHEN
        this.recipeItemsRng.setValuesWithResize(items);
        this.recipeServingRng.clearContent();
        let result100g = this.sht.getValues('E29:P29');
        let resultSave = this.sht.getValues('E30:P30');
        //THEN
        assertEquals(result100g, expected);
        assertEquals(resultSave, expected);
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
        let result100g = this.sht.getValues('E29:P29');
        let resultSave = this.sht.getValues('E30:P30');
        //THEN
        assertEquals(result100g, expected100g);
        assertEquals(resultSave, expectedSave);
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
        let result100g = this.sht.getValues('E29:P29');
        let resultSave = this.sht.getValues('E30:P30');
        //THEN
        assertEquals(result100g, expected100g);
        assertEquals(resultSave, expectedSave);
    }

    shouldRecipeCalculatorSheetCalculateSolidGreenNoomCorreclty(){
        //GIVEN
        let item = [['Green', 200]];
        //WHEN
        this.recipeItemsRng.setValuesWithResize(item);
        let result = this.recipeNoomColourRng.getValue();
        //THEN
        assertEquals(result, 'Green');
    }

    shouldRecipeCalculatorSheetCalculateSolidYellowNoomCorreclty(){
        //GIVEN
        let item = [['Yellow', 200]];
        //WHEN
        this.recipeItemsRng.setValuesWithResize(item);
        let result = this.recipeNoomColourRng.getValue();
        //THEN
        assertEquals(result, 'Yellow');
    }

    shouldRecipeCalculatorSheetCalculateSolidRedNoomCorreclty(){
        //GIVEN
        let item = [['Red', 200]];
        //WHEN
        this.recipeItemsRng.setValuesWithResize(item);
        let result = this.recipeNoomColourRng.getValue();
        //THEN
        assertEquals(result, 'Red');
    }

    shouldRecipeCalculatorSheetLoadAllSavedRecipesInTheRecipeNameField(){
        //GIVEN
        testData.addTestRecipes();
        let expected = ['Recipe1', 'Recipe2', 'Recipe3'];
        //WHEN
        let result = this.recipeNameRng.getValidationCriteriaRangeValues();
        //THEN
        assertEquals(result, expected);
        testData.clearRecipes();
    }

    shouldRecipeCalculatorSheetLoadAllSavedRecipesAndTheGivenNameInTheRecipeNameField(){
        //GIVEN
        testData.addTestRecipes();
        let expected = ['New Recipe', 'Recipe1', 'Recipe2', 'Recipe3'];
        //WHEN
        this.recipeNameRng.setValue('New Recipe');
        let result = this.recipeNameRng.getValidationCriteriaRangeValues();
        //THEN
        assertEquals(result, expected);
        testData.clearRecipes();
    }

    shouldRecipeCalculatorSheetLoadAllSavedRecipesInTheDeleteRecipesField(){
        //GIVEN
        testData.addTestRecipes();
        let expected = ['Recipe1', 'Recipe2', 'Recipe3'];
        //WHEN
        let result = this.deleteRecipesBtnf.getValidationCriteriaRangeValues();
        //THEN
        assertEquals(result, expected);
        testData.clearRecipes();
    }

    shouldRecipeCalculatorSheetLoadAllItemsOfSelectedRecipeInBackground(){
        //GIVEN
        testData.addTestRecipes();
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
        this.recipeNameRng.setValue('Recipe1');
        let result = this.selectedRecipeItemsRng.getValues();
        //THEN
        assertEquals(result, expected);
        //RESET
        this.recipeNameRng.clearContent();
        testData.clearRecipes();
    }

    shouldRecipeCalculatorSheetLeaveSelectedRecipeItemsEmptyIfNoRecipeSelected(){
        //GIVEN WHEN
        this.recipeNameRng.clearContent();
        let result = this.selectedRecipeItemsRng.getValues();
        //THEN
        assertArrayEmpty(result);
    }
}

var runRecipeCalculatorTests = () => new RecipeCalculatorTest().runAllTests();