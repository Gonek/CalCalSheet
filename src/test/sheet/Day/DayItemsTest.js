class DayItemsTest extends TestBaseDay {

    shouldDaySheetHaveTheCorrectFormulaForAllItemRows(){
        // GIVEN
        let expected = Array.from({length:90},(v,k)=>[
          `=MATCH(C${k + 15}, Items!B$4:B, 0)`,
          `=IFERROR(INDEX(Items!D$4:D, $F${k + 15}, 0))`,
          `=IFERROR(INDEX(Items!G$4:G, $F${k + 15}, 0)*$E${k + 15})`,
          `=IFERROR(INDEX(Items!I$4:I, $F${k + 15}, 0)*$E${k + 15})`,
          `=IFERROR(INDEX(Items!K$4:K, $F${k + 15}, 0)*$E${k + 15})`,
          `=IFERROR(INDEX(Items!M$4:M, $F${k + 15}, 0)*$E${k + 15})`,
          `=IFERROR(INDEX(Items!O$4:O, $F${k + 15}, 0)*$E${k + 15})`,
          `=IFERROR(INDEX(Items!Q$4:Q, $F${k + 15}, 0)*$E${k + 15})`,
          `=IFERROR(INDEX(Items!S$4:S, $F${k + 15}, 0)*$E${k + 15})`,
          `=IFERROR(INDEX(Items!U$4:U, $F${k + 15}, 0)*$E${k + 15})`,
          `=IFERROR(INDEX(Items!W$4:W, $F${k + 15}, 0)*$E${k + 15})`,
          `=IFERROR(INDEX(Items!Y$4:Y, $F${k + 15}, 0)*$E${k + 15})`,
          `=IFERROR(INDEX(Items!Z$4:Z, $F${k + 15}, 0))`, ``, ``,
          `=IFERROR(INDEX(Items!E$4:E, $F${k + 15}, 0)*$E${k + 15})`
          ])

        // WHEN
        let result = this.daySpr.getFormulas("F15:U104");

        // THEN
        assertEquals(result, expected);
    }

    shouldDaySheetLeaveNutritionsEmptyIfNoItemAdded(){
        // GIVEN
        let expected = Array(90).fill(Array(15).fill(""));
        // WHEN
        let result = this.daySpr.getDisplayValues('G15:U104');
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
        this.addItemsDaySheet(meal1, 15);
        this.addItemsDaySheet(meal2, 30);
        this.addItemsDaySheet(meal3, 45);
        this.addItemsDaySheet(meal4, 60);
        this.addItemsDaySheet(meal5, 75);
        this.addItemsDaySheet(meal6, 90);   
        let result = this.daySpr.getValues('F15:F104').flat();

        // THEN
        assertEquals(result, expected);
    }

    shouldDaySheetCalculateNutritionsForAllItemsInRightFormat(){
        // GIVEN
        let allItem = Array(90).fill(this.item('All 100', 100));
        let expected = Array(90).fill(["g", "100 kcal", "100.0 g", "100.0 g", "100.0 g", "100.0 g", "100.0 g", "100.0 g", "100.0 g", "100.0 g", "100 mg", "Green", '', '', "100 g"]);
        
        // WHEN
        this.addItemsDaySheet(allItem);
        let result = this.daySpr.getDisplayValues('G15:U104');

        // THEN
        assertEquals(result, expected);
    }

    shouldAll100AndAll1CalcualteTheSameResults(){
        // GIVEN
        let items = [this.item('All 100', 100), this.item('All 1', 100)];
        let expected = Array(2).fill(["g", "100 kcal", "100.0 g", "100.0 g", "100.0 g", "100.0 g", "100.0 g", "100.0 g", "100.0 g", "100.0 g", "100 mg", "Green", '', '', "100 g"]);
        
        // WHEN
        this.addItemsDaySheet(items);
        let result = this.daySpr.getDisplayValues('G15:U16');

        // THEN
        assertEquals(result, expected);
    }

    shouldDaySheetCalculateRightNutritionFor100g(){
        // GIVEN
        let item = this.item('Test 100g', 250);
        let expected = ['g', 925, 25, 12.5, 12.5, 75, 100, 12.5, 2.5, 50, 250, 'Green', '', '', 250];

        // WHEN
        this.addItemDaySheet(item);
        let result = this.daySpr.getValues('G15:U15');

        // THEN
        assertEquals(result, expected);
    }

    shouldDaySheetCalculateRightNutritionFor1Serving(){
        // GIVEN
        let item = this.item('Test 1 serving', 5);
        let expected = ['Serving', 1250, 125, 10, 0, 225, 5, 105, 0, 20, 60, "Red", '', '', 250];

        // WHEN
        this.addItemDaySheet(item);
        let result = this.daySpr.getValues('G15:U15');

        // THEN
        assertEquals(result, expected);
    }

    shouldDaySheetShowCorrectNoomColour(){
        // GIVEN
        let items = [this.item('Green', 1), this.item('Yellow', 1), this.item('Red', 1)]
        let expected = ['Green', 'Yellow', 'Red'];

        // WHEN
        this.addItemsDaySheet(items);
        let result = this.daySpr.getValues('R15:R17');

        // THEN
        assertEquals(result, expected);
    }

    shouldDaySheetCalculateRightNutritionForMaxCalorieItem(){
        // GIVEN
        let item = this.item('Max cal', 10000);
        let expected = ['g', 90000, 10000, 5000, 5000, 0, 0, 0, 0, 0, 0, "Red", '', '', 10000];

        // WHEN
        this.addItemDaySheet(item);
        let result = this.daySpr.getValues('G15:U15');

        // THEN
        assertEquals(result, expected);
    }

    shouldDaySheetCalculateRightNutritionForZeroCalorieItem(){
        // GIVEN
        let item = this.item('Zero cal', 1000);
        let expected = ['g', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "Green", '', '', 1000];

        // WHEN
        this.addItemDaySheet(item);
        let result = this.daySpr.getValues('G15:U15');

        // THEN
        assertEquals(result, expected);
    }

    shouldDaySheetLoadAllSavedItemsInTheItemSelectors(){
        //GIVEN
        let expected = ['1 First', '2 Second', '3 Third', 'All 100', 'All 1', 'All Green', 'Green', 'Max cal', 'Red', 'Test 100g', 'Test 1 serving', 'Yellow', 'Zero cal', 'ZZ Last'];
        //WHEN
        let result = this.daySpr.getValidationCriteriaRangeValues('C15:C104');
        //THEN
        assertEquals(result, expected);
    }
}

var runDayItemsTests = () => new DayItemsTest().runAllTests();