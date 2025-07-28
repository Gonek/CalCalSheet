class DayItemsTest extends TestBaseDay {

    beforeAll(){
        super.beforeAll();
        this.inLineCaculationIndexRng = getRng(RNG.IN_LINE_CACULATION_INDEX);
        this.inLineCaculationFieldRng = getRng(RNG.IN_LINE_CACULATION_FIELD);
        this.inLineCaculationPrefixOffsetRng = getRng(RNG.IN_LINE_CACULATION_PREFIX_OFFSET);
        this.inLineCaculationBaseRng = getRng(RNG.IN_LINE_CACULATION_CALCULATION_BASE);
        this.inLineCaculationResultRng = getRng(RNG.IN_LINE_CACULATION_CALCULATION_RESULT);
    }

    shouldDaySheetHaveCorrectInlineBackgroundFormulas(){
        // GIVEN
        let expectedInLineCaculationIndex = '=IFERROR(MATCH("*=*",E17:E106,0),-1)';
        let expectedInLineCaculationField = '=IFERROR(INDEX(E17:E106, InLineCaculationIndex), " ")';
        let expectedInLineCaculationPrefixOffset = '=IFERROR(SWITCH(LOWER(INDEX(SPLIT(InLineCaculationField,"="))), "c", 1, "fat", 3, "car", 9, "fib", 11, "pro", 17, "$", 21))';
        let expectedInLineCaculationBase = '=IFERROR(INDEX(SPLIT(InLineCaculationField,"="),2))';
        let expectedInLineCaculationResult = '=IFERROR(ROUND(InLineCaculationBase / (INDEX(Items!G$4:AA, INDEX(F17:F106, InLineCaculationIndex), InLineCaculationPrefixOffset)),1),"")';
        
        // WHEN
        let resultInLineCaculationIndex = this.inLineCaculationIndexRng.getFormulas();
        let resultInLineCaculationField = this.inLineCaculationFieldRng.getFormulas();
        let resultInLineCaculationPrefixOffset = this.inLineCaculationPrefixOffsetRng.getFormulas();
        let resultInLineCaculationBase = this.inLineCaculationBaseRng.getFormulas();
        let resultInLineCaculationResult = this.inLineCaculationResultRng.getFormulas();

        // THEN
        assertEquals(resultInLineCaculationIndex, expectedInLineCaculationIndex);
        assertEquals(resultInLineCaculationField, expectedInLineCaculationField);
        assertEquals(resultInLineCaculationPrefixOffset, expectedInLineCaculationPrefixOffset);
        assertEquals(resultInLineCaculationBase, expectedInLineCaculationBase);
        assertEquals(resultInLineCaculationResult, expectedInLineCaculationResult);
    }

    shouldDaySheetHaveTheCorrectFormulaForAllItemRows(){
        // GIVEN
        let expected = Array.from({length:90},(v,k)=>[
          `=MATCH(C${k + 17}, Items!B$4:B, 0)`,
          k%15 == 0? `=IF(OR(E${k + 17} = $AH$30, C${k + 17} = SelectedMealName), Texts!$B$37, IFERROR(INDEX(Items!D$4:D, $F${k + 17}, 0)))`:
                     `=IF(E${k + 17} = $AH$30, Texts!$B$37, IFERROR(INDEX(Items!D$4:D, $F${k + 17}, 0)))`,
          `=IFERROR(INDEX(Items!G$4:G, $F${k + 17}, 0)*$E${k + 17})`,
          `=IFERROR(INDEX(Items!I$4:I, $F${k + 17}, 0)*$E${k + 17})`,
          `=IFERROR(INDEX(Items!K$4:K, $F${k + 17}, 0)*$E${k + 17})`,
          `=IFERROR(INDEX(Items!M$4:M, $F${k + 17}, 0)*$E${k + 17})`,
          `=IFERROR(INDEX(Items!O$4:O, $F${k + 17}, 0)*$E${k + 17})`,
          `=IFERROR(INDEX(Items!Q$4:Q, $F${k + 17}, 0)*$E${k + 17})`,
          `=IFERROR(INDEX(Items!S$4:S, $F${k + 17}, 0)*$E${k + 17})`,
          `=IFERROR(INDEX(Items!U$4:U, $F${k + 17}, 0)*$E${k + 17})`,
          `=IFERROR(INDEX(Items!W$4:W, $F${k + 17}, 0)*$E${k + 17})`,
          `=IFERROR(INDEX(Items!Y$4:Y, $F${k + 17}, 0)*$E${k + 17})`,
          `=IFERROR(INDEX(Items!AA$4:AA, $F${k + 17}, 0)*$E${k + 17})`,
          `=IFERROR(INDEX(Items!AB$4:AB, $F${k + 17}, 0))`, ``, ``,
          `=IFERROR(INDEX(Items!E$4:E, $F${k + 17}, 0)*$E${k + 17})`
          ])

        // WHEN
        let result = this.daySht.getFormulas("F17:V106");

        // THEN
        assertEquals(result, expected);
    }

    shouldDaySheetLeaveNutritionsEmptyIfNoItemAdded(){
        // GIVEN
        let expected = Array(90).fill(Array(15).fill(""));
        // WHEN
        let result = this.daySht.getDisplayValues('G17:U106');
        // THEN
        assertEquals(result, expected);
    }

    shouldDaySheetReturnRightIndexForItems(){
        // GIVEN
        let meal1 = Array(15).fill(this.item('1 First', 100));
        let meal2 = Array(15).fill(this.item('2 Second', 100));
        let meal3 = Array(15).fill(this.item('3 Third', 100));
        let meal4 = Array(15).fill(this.item('ZZ Last', 100));
        let meal5 = Array(15).fill(this.item('1 First', 100));
        let meal6 = Array(15).fill(this.item('ZZ Last', 100));
        let expected = Array(15).fill(1)
              .concat(Array(15).fill(2))
              .concat(Array(15).fill(3))
              .concat(Array(15).fill(testData.LAST_ITEM_INDEX))
              .concat(Array(15).fill(1))
              .concat(Array(15).fill(testData.LAST_ITEM_INDEX));

        // WHEN
        this.addItemsDaySheet(meal1, 17);
        this.addItemsDaySheet(meal2, 32);
        this.addItemsDaySheet(meal3, 47);
        this.addItemsDaySheet(meal4, 62);
        this.addItemsDaySheet(meal5, 77);
        this.addItemsDaySheet(meal6, 92);   
        let result = this.daySht.getValues('F17:F106').flat();

        // THEN
        assertEquals(result, expected);
    }

    shouldDaySheetCalculateNutritionsForAllItemsInRightFormat(){
        // GIVEN
        let allItem = Array(90).fill(this.item('All 100', 100));
        let expected = Array(90).fill(["g", "100 kcal", "100.0 g", "100.0 g", "100.0 g", "100.0 g", "100.0 g", "100.0 g", "100.0 g", "100.0 g", "100 mg", "£100.00", "Green", '', '', "100 g"]);
        
        // WHEN
        this.addItemsDaySheet(allItem);
        let result = this.daySht.getDisplayValues('G17:V106');

        // THEN
        assertEquals(result, expected);
    }

    shouldAll100AndAll1CalcualteTheSameResults(){
        // GIVEN
        let items = [this.item('All 100', 100), this.item('All 1', 100)];
        let expected = Array(2).fill(["g", "100 kcal", "100.0 g", "100.0 g", "100.0 g", "100.0 g", "100.0 g", "100.0 g", "100.0 g", "100.0 g", "100 mg", "£100.00", "Green", '', '', "100 g"]);
        
        // WHEN
        this.addItemsDaySheet(items);
        let result = this.daySht.getDisplayValues('G17:V18');

        // THEN
        assertEquals(result, expected);
    }

    shouldDaySheetCalculateRightNutritionFor100g(){
        // GIVEN
        let item = this.item('Test 100g', 250);
        let expected = ['g', 925, 25, 12.5, 12.5, 75, 100, 12.5, 2.5, 50, 250, 25, 'Red', '', '', 250];

        // WHEN
        this.addItemDaySheet(item);
        let result = this.daySht.getValues('G17:V17');

        // THEN
        assertEquals(result, expected);
    }

    shouldDaySheetCalculateRightNutritionFor1Serving(){
        // GIVEN
        let item = this.item('Test 1 serving', 5);
        let expected = ['Serving', 1250, 125, 10, 0, 225, 5, 105, 0, 20, 60, 1, "Red", '', '', 250];

        // WHEN
        this.addItemDaySheet(item);
        let result = this.daySht.getValues('G17:V17');

        // THEN
        assertEquals(result, expected);
    }

    shouldDaySheetShowCorrectNoomColour(){
        // GIVEN
        let items = [this.item('Green', 1), this.item('Yellow', 1), this.item('Red', 1)]
        let expected = ['Green', 'Yellow', 'Red'];

        // WHEN
        this.addItemsDaySheet(items);
        let result = this.daySht.getValues('S17:S19');

        // THEN
        assertEquals(result, expected);
    }

    shouldDaySheetCalculateRightNutritionForMaxCalorieItem(){
        // GIVEN
        let item = this.item('Max cal', 10000);
        let expected = ['g', 90000, 10000, 5000, 5000, 0, 0, 0, 0, 0, 0, 99000, "Red", '', '', 10000];

        // WHEN
        this.addItemDaySheet(item);
        let result = this.daySht.getValues('G17:V17');

        // THEN
        assertEquals(result, expected);
    }

    shouldDaySheetCalculateRightNutritionForZeroCalorieItem(){
        // GIVEN
        let item = this.item('Zero cal', 1000);
        let expected = ['g', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "Green", '', '', 1000];

        // WHEN
        this.addItemDaySheet(item);
        let result = this.daySht.getValues('G17:V17');

        // THEN
        assertEquals(result, expected);
    }

    shouldDaySheetLoadAllSavedItemsInTheItemSelectors(){
        // GIVEN
        let expected = ['1 First', '2 Second', '3 Third', 'All 100', 'All 1', 'All Green', 'Green', 'Max cal', 'Red', 'Test 100g', 'Test 1 serving', 'Yellow', 'Zero cal', 'ZZ Last'];
        // WHEN
        let result = this.daySht.getValidationCriteriaRangeValues('C17:C106');
        // THEN
        assertEquals(result, expected);
    }

    shouldDaySheetCalculateInlineCalcResultIfAmountC100(){
        // GIVEN
        let expectedInLineCaculationIndex = '19';
        let expectedInLineCaculationField = 'c=100';
        let expectedInLineCaculationPrefixOffset = '1';
        let expectedInLineCaculationBase = '100';
        let expectedInLineCaculationResult = '27';
        // WHEN
        this.addItemDaySheet(this.item('Test 100g', 'c=100'), 35);

        // THEN
        this.assertInLine(35, expectedInLineCaculationIndex, expectedInLineCaculationField, expectedInLineCaculationPrefixOffset, 
                          expectedInLineCaculationBase, expectedInLineCaculationResult);
    }

    shouldDaySheetCalculateInlineCalcResultIfAmountFat10(){
        // GIVEN
        let expectedInLineCaculationIndex = '1';
        let expectedInLineCaculationField = 'fAt=10';
        let expectedInLineCaculationPrefixOffset = '3';
        let expectedInLineCaculationBase = '10';
        let expectedInLineCaculationResult = '100';
        // WHEN
        this.addItemDaySheet(this.item('Test 100g', 'fAt=10'), 17);

        // THEN
        this.assertInLine(17, expectedInLineCaculationIndex, expectedInLineCaculationField, expectedInLineCaculationPrefixOffset, 
                          expectedInLineCaculationBase, expectedInLineCaculationResult);
    }

    shouldDaySheetCalculateInlineCalcResultIfAmountCar120(){
        // GIVEN
        let expectedInLineCaculationIndex = '49';
        let expectedInLineCaculationField = 'Car=120';
        let expectedInLineCaculationPrefixOffset = '9';
        let expectedInLineCaculationBase = '120';
        let expectedInLineCaculationResult = '400';
        // WHEN
        this.addItemDaySheet(this.item('Test 100g', 'Car=120'), 65);

        // THEN
        this.assertInLine(65, expectedInLineCaculationIndex, expectedInLineCaculationField, expectedInLineCaculationPrefixOffset, 
                          expectedInLineCaculationBase, expectedInLineCaculationResult);
    }

    shouldDaySheetCalculateInlineCalcResultIfAmountFib5(){
        // GIVEN
        let expectedInLineCaculationIndex = '74';
        let expectedInLineCaculationField = 'FIB=5';
        let expectedInLineCaculationPrefixOffset = '11';
        let expectedInLineCaculationBase = '5';
        let expectedInLineCaculationResult = '12.5';
        // WHEN
        this.addItemDaySheet(this.item('Test 100g', 'FIB=5'), 90);

        // THEN
        this.assertInLine(90, expectedInLineCaculationIndex, expectedInLineCaculationField, expectedInLineCaculationPrefixOffset, 
                          expectedInLineCaculationBase, expectedInLineCaculationResult);
    }

    shouldDaySheetCalculateInlineCalcResultIfAmountPro70(){
        // GIVEN
        let expectedInLineCaculationIndex = '26';
        let expectedInLineCaculationField = 'prO=70';
        let expectedInLineCaculationPrefixOffset = '17';
        let expectedInLineCaculationBase = '70';
        let expectedInLineCaculationResult = '350';
        // WHEN
        this.addItemDaySheet(this.item('Test 100g', 'prO=70'), 42);

        // THEN
        this.assertInLine(42, expectedInLineCaculationIndex, expectedInLineCaculationField, expectedInLineCaculationPrefixOffset, 
                          expectedInLineCaculationBase, expectedInLineCaculationResult);
    }

    // OTHER

    assertInLine(index, expectedInLineCaculationIndex, expectedInLineCaculationField, expectedInLineCaculationPrefixOffset, expectedInLineCaculationBase, expectedInLineCaculationResult){
        let resultInLineCaculationIndex = this.inLineCaculationIndexRng.getValue();
        let resultInLineCaculationField = this.inLineCaculationFieldRng.getValue();
        let resultInLineCaculationPrefixOffset = this.inLineCaculationPrefixOffsetRng.getValue();
        let resultInLineCaculationBase = this.inLineCaculationBaseRng.getValue();
        let resultInLineCaculationResult = this.inLineCaculationResultRng.getValue();
        let resultWait = this.daySht.getValue(`G${index}`);

        // THEN
        assertEquals(resultInLineCaculationIndex, expectedInLineCaculationIndex);
        assertEquals(resultInLineCaculationField, expectedInLineCaculationField);
        assertEquals(resultInLineCaculationPrefixOffset, expectedInLineCaculationPrefixOffset);
        assertEquals(resultInLineCaculationBase, expectedInLineCaculationBase);
        assertEquals(resultInLineCaculationResult, expectedInLineCaculationResult);
        assertEquals(resultWait, '⏳ Please wait!');
    }
}

var runDayItemsTests = () => new DayItemsTest().runAllTests();