class ImportGivenSteps extends Steps{
    import_sheet_id_as(value){
        getRng(RNG.IMPORT).setValue(value, 1, 2);
    }

    import_items_set_to(mergeType, enable){
        getRng(RNG.IMPORT).setValue(mergeType, 2, 2);
        getRng(RNG.IMPORT).setValue(enable, 2, 3);
    }

    import_recipes_set_to(mergeType, enable){
        getRng(RNG.IMPORT).setValue(mergeType, 3, 2);
        getRng(RNG.IMPORT).setValue(enable, 3, 3);
    }

    import_meals_set_to(mergeType, enable){
        getRng(RNG.IMPORT).setValue(mergeType, 4, 2);
        getRng(RNG.IMPORT).setValue(enable, 4, 3);
    }

    import_profile_set_to(enable){
        getRng(RNG.IMPORT).setValue(enable, 5, 3);
    }

    import_settings_set_to(enable){
        getRng(RNG.IMPORT).setValue(enable, 6, 3);
    }

    import_history_set_to(enable){
        getRng(RNG.IMPORT).setValue(enable, 7, 3);
    }

    import_days_set_to(enable){
        getRng(RNG.IMPORT).setValue(enable, 8, 3);
    }

    test_meals_available(){
        testData.addTestMeals();
    }

    test_items_available(){
        testData.addTestItems();
    }

    test_recipes_available(){
        testData.addTestRecipes();
    }
}

class ImportWhenSteps extends Steps{
    import_clicked(){
        this.clickButton(SHT.SETTINGS, BTN.IMPORT);
    }
}

class ImportThenSteps extends Steps{
    items_imported(){
        let items = getSht(SHT.ITEMS).getValues('B4:AD49');
        let expected_row_1 = ['Almond',	100, 'g', 1, 576, 5.76, 49.00, 0.49, 3.7, 0.04, 0.0, 0.00, 22.0, 0.22, 12.0, 0.12, 3.9, 0.04, 0, 0.00, 21.0, 0.21, 1, 0.01, '', '', 'Red', 5.76, ''];
        let expected_row_12 = ['Carrot', 100, 'g', 1, 41, 0.41, 0.2, 0.0, 0.0, 0.00, 0.0, 0.00, 10.0, 0.1, 3.0, 0.03, 3.5, 0.04, 0, 0.00, 0.9, 0.1, 58, 0.58, '', '', 'Green', 0.41, ''];
        let expected_row_27 = ['Leek', 100, 'g', 1, 61, 0.61, 0.30, 0.0, 0.0, 0.00, 0.0, 0.00, 14.0, 0.14, 1.8, 0.02, 3.9, 0.04, 0, 0.00, 1.5, 0.02, 20, 0.20, '', '', 'Green', 0.61, ''];
        let expected_row_46 = ['Water',	1, 'g', 1, 0, 0.00, 0.00, 0.00,	0.0, 0.00, 0.0, 0.00, 0.0, 0.00, 0.0, 0.00, 0.0, 0.00, 0, 0.00, 0.0, 0.00, 0, 0.00, '', '',	'Green', 0.00, ''];

        assertEqualsArray(items[0], expected_row_1);
        assertEqualsArray(items[11], expected_row_12);
        assertEqualsArray(items[26], expected_row_27);
        assertEqualsArray(items[45], expected_row_46);
    }

    items_imported_with_merge(){
        let items = getSht(SHT.ITEMS).getValues('B4:AD63');
        let expected_row_1 = ['1 First', 100, 'g', 1, 100, 1.00, 100.00, 1.00, 100.0, 1.00, 100.0, 1.00, 100.0,	1.00, 100.0, 1.00, 100.0, 1.00, 100, 1.00, 100.0, 1.00, 100, 1.00, 100, 1, 'Green', 1.00, getRelativeDay(+1)];
        let expected_row_27 = ['Fig', 100, 'g', 1, 74, 0.74, 0.3, 0.003, 0.1, 0.001, 0, 0, 19, 0.19, 2.9, 0.028999999999999998, 16, 0.16, 0, 0, 0.8, 0.008, 1, 0.01, '', '', 'Green', 0.74, ''];
        let expected_row_54 = ['Test 1 serving', 1, 'Serving',50, 250, 250.00, 25.00, 25.00, 2.0, 2.00,	0.0, 0.00, 45.0, 45.00, 1.0, 1.00, 21.0, 21.00, 0, 0.00, 4.0, 4.00, 12, 12.00, 2, 0.2, 'Red', 5.00, ''];
        let expected_row_60 = ['ZZ Last', 100, 'g', 1, 100, 1.00, 100.00, 1.00, 100.0, 1.00, 100.0, 1.00, 100.0, 1.00, 100.0, 1.00, 100.0, 1.00, 100, 1.00, 100.0, 1.00, 100, 1.00, 90,0.9,	'Green', 1.00, ''];

        assertEqualsArray(items[0], expected_row_1);
        assertEqualsArray(items[26], expected_row_27);
        assertEqualsArray(items[53], expected_row_54);
        assertEqualsArray(items[59], expected_row_60);
    }

    items_not_imported(){
        let items = getSht(SHT.ITEMS).getValues('B4:AA');
        assertArrayEmpty(items);
    }

    recipes_imported(){
        let recipes = getSht(SHT.RECIPES).getValues('B4:D11');
        let expected = [['Banana cake', 'Egg', 100],
                        ['Banana cake', 'Banana', 250],
                        ['Banana cake', 'Sugar', 200],
                        ['Banana cake', 'Baking powder', 10],
                        ['Banana cake', 'Rice (cooked)', 300],
                        ['Stone soup', 'Celery', 120],
                        ['Stone soup', 'Carrot', 235],
                        ['Stone soup', 'Water', 2000]];
        assertEqualsArray(recipes, expected);
    }

    recipes_imported_with_merge(){
        let recipes = getSht(SHT.RECIPES).getValues('B4:D39');
        let expected = [['Banana cake', 'Egg', 100],
                        ['Banana cake', 'Banana', 250],
                        ['Banana cake', 'Sugar', 200],
                        ['Banana cake', 'Baking powder', 10],
                        ['Banana cake', 'Rice (cooked)', 300],
                        ['Recipe1', 'Green', 100],
                        ['Recipe1', 'Yellow', 200],
                        ['Recipe1', 'Red', 300],
                        ['Recipe1', 'Green', 400],
                        ['Recipe1', 'Yellow', 500],
                        ['Recipe1', 'Red', 600],
                        ['Recipe1', 'Green', 700],
                        ['Recipe1', 'Yellow', 800],
                        ['Recipe1', 'Red', 900],
                        ['Recipe1', 'Green', 1100],
                        ['Recipe1', 'Yellow', 1200],
                        ['Recipe1', 'Red', 1300],
                        ['Recipe1', 'Green', 1400],
                        ['Recipe1', 'Yellow', 1500],
                        ['Recipe1', 'Red', 1600],
                        ['Recipe1', 'Green', 1700],
                        ['Recipe1', 'Yellow', 1800],
                        ['Recipe1', 'Red', 1900],
                        ['Recipe1', 'Green', 2100],
                        ['Recipe1', 'Yellow', 2200],
                        ['Recipe1', 'Red', 2300],
                        ['Recipe1', 'Green', 2400],
                        ['Recipe1', 'Yellow', 2500],
                        ['Recipe1', 'Red', 2600],
                        ['Recipe1', 'Green', 2700],
                        ['Recipe2', 'Test 100g', 50],
                        ['Recipe2', 'Test 100g', 500],
                        ['Recipe3', 'Test 1 serving', 2],
                        ['Stone soup', 'Celery', 120],
                        ['Stone soup', 'Carrot', 235],
                        ['Stone soup', 'Water', 2000]];
        assertEqualsArray(recipes, expected);
    }

    recipes_not_imported(){
        let recipes = getSht(SHT.RECIPES).getValues('B4:D');
        assertArrayEmpty(recipes);
    }

    meals_imported(){
        let meals = getSht(SHT.MEALS).getValues('B4:D13');
        let expected = [['🥣 Fruit bow', 'Apple', 120],
                        ['🥣 Fruit bow', 'Banana', 120],
                        ['🥣 Fruit bow', 'Strawberry', 50],
                        ['🥣 Fruit bow', 'Orange', 75],
                        ['🥣 Fruit bow', 'Kiwi', 45],
                        ['🥣 Fruit bow', 'Garlic', 50],
                        ['🥣 Heavy snack', 'Parmesan', 25],
                        ['🥣 Heavy snack', 'Pistacio', 20],
                        ['🥣 Heavy snack', 'Cashew',  20],
                        ['🥣 Heavy snack', 'Sugar', 35]]
        assertEqualsArray(meals, expected);
    }

    meals_imported_with_merge(){
        let meals = getSht(SHT.MEALS).getValues('B4:D33');
        let expected = [['🥣 Fruit bow', 'Apple', 120],
                        ['🥣 Fruit bow', 'Banana', 120],
                        ['🥣 Fruit bow', 'Strawberry', 50],
                        ['🥣 Fruit bow', 'Orange', 75],
                        ['🥣 Fruit bow', 'Kiwi', 45],
                        ['🥣 Fruit bow', 'Garlic', 50],
                        ['🥣 Heavy snack', 'Parmesan', 25],
                        ['🥣 Heavy snack', 'Pistacio', 20],
                        ['🥣 Heavy snack', 'Cashew',  20],
                        ['🥣 Heavy snack', 'Sugar', 35],
                        ['🥣 Meal0', 'Test 100g', 150],
                        ['🥣 Meal0', 'Test 100g', 10],
                        ['🥣 Meal1', '1 First', 10],
                        ['🥣 Meal1', '2 Second', 20],
                        ['🥣 Meal1', '3 Third', 30],
                        ['🥣 Meal1', 'ZZ Last', 99],
                        ['🥣 Meal1', '1 First', 110],
                        ['🥣 Meal1', '2 Second', 120],
                        ['🥣 Meal1', '3 Third', 130],
                        ['🥣 Meal1', 'ZZ Last', 199],
                        ['🥣 Meal1', '1 First', 210],
                        ['🥣 Meal1', '2 Second', 220],
                        ['🥣 Meal1', '3 Third', 230],
                        ['🥣 Meal1', 'ZZ Last', 299],
                        ['🥣 Meal1', '1 First', 310],
                        ['🥣 Meal1', '2 Second', 320],
                        ['🥣 Meal1', '3 Third', 330],
                        ['🥣 Meal2', 'Max cal', 100],
                        ['🥣 Meal2', 'Zero cal', 500],
                        ['🥣 Meal2', 'All Green', 256]]
        assertEqualsArray(meals, expected);
    }

    meals_not_imported(){
        let meals = getSht(SHT.MEALS).getValues('B4:D');
        assertArrayEmpty(meals);
    }

    profile_imported(){
        let profiles = getRng(RNG.MACRO_PROFILES).getValues();
        let expected = [['Borring day','',	'Running day', '',	'Excercise day', '', 'Hard core day', '',	'Extreme day', '',	'Sleepy day', '',   '', ''],
                        [2330, 2480,	     2660, 2830,         3000, 3190,	      3340, 3550,	         3680, 3910,	     1998, 2398,        '', ''],
                        [20, 30,	         20, 30,	         20, 30,	          20, 30,	             20, 30, 	         20, 30,            '', ''],
                        [0, 10,	             0, 10,	             0, 10, 	          0, 10, 	             0, 10, 	         0, 10,             '', ''],
                        [0, 0,               0, 0,               0, 0,                0, 0,                  0, 0,               0, 0,              '', ''],
                        [45, 65,	         45, 65,	         45, 65, 	          45, 65, 	             45, 65, 	         45, 65,            '', ''],
                        [15,30,              15,30,              15,30,               15,30,                 15,30,              15,30,             '', ''],
                        [0, 15,	             0, 15,	             0, 15, 	          0, 15, 	             0, 15, 	         0, 15,             '', ''],
                        [0,19,               0,19,               0,19,                0,19,                  0,19,               0,19,              '', ''],
                        [10, 35,	         10, 35,	         10, 35, 	          10, 35, 	             10, 35, 	         10, 35,            '', ''],
                        [0,2000,             0,2000,             0,2000,              0,2000,                0,2000,             0,2000,            '', ''],
                        ['', '',             '', '',             '', '',              '','',                 '','',              '','',             '', '']]
        assertEqualsArray(profiles, expected);
    }

    profile_not_imported(){
        let profiles = getRng(RNG.MACRO_PROFILES).getValues();
        let expected = [['Default', '', '', '','', '', '', '', '', '', '', '', '', ''],
                        [2330, 2480, '', '','', '', '', '', '', '', '', '', '', ''],
                        [20, 30, '', '','', '', '', '', '', '', '', '', '', ''],
                        [0, 10,	'', '','', '', '', '', '', '', '', '', '', ''],
                        [0, 0, '', '','', '', '', '', '', '', '', '', '', ''],
                        [45, 65, '', '','', '', '', '', '', '', '', '', '', ''],
                        [15, 30, '', '','', '', '', '', '', '', '', '', '', ''],
                        [0, 15, '', '','', '', '', '', '', '', '', '', '', ''],
                        [0, 19, '', '','', '', '', '', '', '', '', '', '', ''],
                        [10, 35, '', '','', '', '', '', '', '', '', '', '', ''],
                        [0, 10, '', '','', '', '', '', '', '', '', '', '', ''],
                        [0, 0, '', '','', '', '', '', '', '', '', '', '', '']]
        assertEqualsArray(profiles, expected);
    }

    settings_imported(){
        let generalSettings = getRng(RNG.GENERAL_SETTINGS).getColAsArray();
        let nutritionFields = getRng(RNG.NUTRITION_FIELDS).getColAsArray();
        let meals = getRng(RNG.MEALS).getValues();

        assertEqualsArray(generalSettings, [2, 2, false, 'Calorie Max', false, false, true, false]);
        assertEqualsArray(nutritionFields, [true, true, false, true, false, true, false, true, true]);
        assertEqualsArray(meals,           [['Morning food', 10],
                                                      ['Secound brekfast', 8],
                                                      ['Feast', 15],
                                                      ['Late lunch', 7],
                                                      ['Supper', 9],
                                                      ['After dinner', 12]]);
    }

    localisation_imported(){
        let localisation = getRng(RNG.LOCALISATION).getColAsArray();
        assertEquals(localisation, ['Deutsch', '_+2', 'YYYY.MM.DD', 'Metric', '€'])
    }

    history_imported(){
        let history = getSht(SHT.HISTORY).getValues('B10:S18');
        let expected = Array.from({length:9},(v,k)=>[new Date(2025, 0, 10 + k), 2000 + k, 2400 + k, 400, 10 + k, 20 + k, 30 + k, 40 + k, 50 + k, 60 + k, 70 + k, 80 + k, 90 + k, 100.00 + k, '', '✔️', '❌', '✔️']);
    
        assertEqualsArray(history, expected);
    }

    history_not_imported(){
        let history = getSht(SHT.HISTORY).getValues('B10:S18');
        assertArrayEmpty(history);
    }

    days_imported(){
        let daysSht = getSht(SHT.DAYS);
        let expected = Array(75).fill(Array(12).fill(''));
        expected[0] = ['Carrot', 750, 'Cashew', 210, '', '', 'Blueberry', 850, '', '', 'Potato', 500];
        expected[15] = ['Banana', 500, '', '', 'Blueberry', 1000, '', '', 'Apple', 250, '', ''];
        expected[30] = ['Apple', 120, 'Banana', 50, 'Bell pepper', 50, '', '', 'Parmesan', 25, 'Orange', 500];
        expected[31] = ['Banana', 120, '', '', 'Blueberry', 100, '', '', 'Pistacio', 20, '', ''];
        expected[32] = ['Strawberry', 50, '', '', '', '', '', '', 'Cashew',	20, '', ''];
        expected[33] = ['Orange', 75, '', '', '', '', '', '', 'Sugar', 35, '', ''];
        expected[34] = ['Kiwi',	45, '', '', '', '', '', '', '', '', '', ''];
        expected[35] = ['Garlic', 50, '', '', '', '', '', '', '', '', '', ''];
        let expectedAdditionalInfo = [[3000], ['Borring day']];
        let expectedPrototype = Array(15).fill(Array(12).fill(''));
        expectedPrototype[0] = ['Banana', 125, 'Banana', 200, 'Banana', 100, 'Banana', 652, 'Banana', 100, 'Banana', 250];

        assertEqualsArray(daysSht.getValues('B6:M80'), expected);
        assertEqualsArray(daysSht.getValues('N6:N7'), expectedAdditionalInfo);
        assertEqualsArray(daysSht.getValues('N21:N22'), expectedAdditionalInfo);
        assertEqualsArray(daysSht.getValues('N36:N37'), expectedAdditionalInfo);
        assertEqualsArray(daysSht.getValues('N51:N52'), expectedAdditionalInfo);
        assertEqualsArray(daysSht.getValues('N66:N67'), expectedAdditionalInfo);

        assertEqualsArray(daysSht.getValues('AC6:AC7'), expectedAdditionalInfo);
        assertEqualsArray(daysSht.getValues('Q6:AB20'), expectedPrototype);
    }

    days_not_imported(){
        let cdays = getSht(SHT.DAYS).getValues('B6:M');
        let tdays = getSht(SHT.DAYS).getValues('Q6:AB');
        assertArrayEmpty(cdays);
        assertArrayEmpty(tdays);
    }
}