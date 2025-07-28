class TestData {

  constructor(){
    this.LAST_ITEM_INDEX = 14;
  }

  // TEST ITEMS

  addTestItems() {
      this.clearItems();
      var data = [    // Name         Amounth   Unit    Gramm Cal         TotFat    SatFat    TrFat     Carb      Fiber     Sugar     SugarAlk  Protein   Salt       Price     Noom      Cal/Gramm  Auto Delete at
                      ['1 First',         100,  'g',      1,  100,  1,    100,1,    100,1,    100,1,    100,1,    100,1,    100,1,    100,1,    100,1,    100,1,     100, 1,   'Green',  1,         getRelativeDay(+1)],
                      ['2 Second',        100,  'g',      1,  100,  1,    100,1,    100,1,    100,1,    100,1,    100,1,    100,1,    100,1,    100,1,    100,1,     100, 1,   'Green',  1,         ''],
                      ['3 Third',         100,  'g',      1,  100,  1,    100,1,    100,1,    100,1,    100,1,    100,1,    100,1,    100,1,    100,1,    100,1,     100, 1,   'Green',  1,         ''],
                      ['All 100',         100,  'g',      1,  100,  1,    100,1,    100,1,    100,1,    100,1,    100,1,    100,1,    100,1,    100,1,    100,1,     100, 1,   'Green',  1,         ''],
                      ['All 1',           1,    'g',      1,  1,    1,    1,  1,    1,  1,    1,  1,    1,  1,    1,  1,    1,  1,    1,  1,    1,  1,    1,  1,     1, 1,     'Green',  1,         getRelativeDay(+10)],
                      ['All Green',       1500, 'g',      1,  1485, 0.99, 18, 0.012,18, 0.012,18, 0.012,36, 0.024,18, 0.012,18, 0.012,18, 0.012,48, 0.032,18, 0.012, 13, 0.013,'Green',  0.99,      getRelativeDay(-10)],
                      ['Green',           100,  'g',      1,  100,  1,    10, 0.1,  11, 0.11, 12, 0.12, 13, 0.13, 14, 0.14, 15, 0.15, 16, 0.16, 17, 0.17, 18, 0.18,  1, 0.01,  'Green',  1,         ''],
                      ['Max cal',         100,  'g',      1,  900,  9,    100,1,    50, 0.5,  50, 0.5,  0,  0,    0,  0,    0,  0,    0,  0,    0,  0,    0,  0,     99, 9.9,  'Red',    9,         getToday()],
                      ['Red',             100,  'g',      1,  500,  5,    50, 0.5,  51, 0.51, 52, 0.52, 53, 0.53, 54, 0.54, 55, 0.55, 56, 0.56, 57, 0.57, 58, 0.58,  10, 0.1,  'Red',    5,         ''],
                      ['Test 100g',       100,  'g',      1,  370,  3.7,  10, 0.1,  5,  0.05, 5,  0.05, 30, 0.3,  40, 0.4,  5,  0.05, 1,  0.01, 20, 0.2,  100,1,     10, 0.1,  'Red',    3.7,       ''],
                      ['Test 1 serving',  1,    'Serving',50, 250,  250,  25, 25,   2,  2,    0,  0,    45, 45,   1,  1,    21, 21,   0,  0,    4,  4,    12, 12,    2, 0.2,   'Red',    5,         ''],
                      ['Yellow',          100,  'g',      1,  200,  2,    20, 0.2,  21, 0.21, 22, 0.22, 23, 0.23, 24, 0.24, 25, 0.25, 26, 0.26, 27, 0.27, 28, 0.28,  10, 0.1,  'Yellow', 2,         ''],
                      ['Zero cal',        100,  'g',      1,  0,    0,    0,  0,    0,  0,    0,  0,    0,  0,    0,  0,    0,  0,    0,  0,    0,  0,    0,  0,     0, 0.0,   'Green',  0,         getYesterday()],
                      ['ZZ Last',         100,  'g',      1,  100,  1,    100,1,    100,1,    100,1,    100,1,    100,1,    100,1,    100,1,    100,1,    100,1,     90, 0.9,  'Green',  1,         '']
                  ];
      getSht(SHT.ITEMS).putDataAtEnd(data);
  }

  clearItems() {
      getSht(SHT.ITEMS).clearContent('B4:AD');
  }

  // TEST DAYS 


  addTestTemplateDays(){
    let sht = getSht(SHT.DAYS);
    var data = [    // Breakfast      Snack             Lunch            Snack          Dinner            Supper          Additional data
                    // PROTOTYPE
                    ['1 First', 100,  '2 Second', 200,  '3 Third', 300, '1 First', 400, '2 Second', 500,  '3 Third', 600, '2500'],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         'Test 1'],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         ''],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         ''],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         ''],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         ''],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         ''],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         ''],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         ''],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         ''],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         ''],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         ''],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         ''],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         ''],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         ''],
                    // All 1 Day
                    ['All 1', 1,      'All 1', 1,       'All 1', 1,     'All 1', 1,     'All 1', 1,       'All 1', 1,     '3500'],
                    ['All 1', 1,      'All 1', 1,       'All 1', 1,     'All 1', 1,     'All 1', 1,       'All 1', 1,     'Test 6'],
                    ['All 1', 1,      'All 1', 1,       'All 1', 1,     'All 1', 1,     'All 1', 1,       'All 1', 1,     ''],
                    ['All 1', 1,      'All 1', 1,       'All 1', 1,     'All 1', 1,     'All 1', 1,       'All 1', 1,     ''],
                    ['All 1', 1,      'All 1', 1,       'All 1', 1,     'All 1', 1,     'All 1', 1,       'All 1', 1,     ''],
                    ['All 1', 1,      'All 1', 1,       'All 1', 1,     'All 1', 1,     'All 1', 1,       'All 1', 1,     ''],
                    ['All 1', 1,      'All 1', 1,       'All 1', 1,     'All 1', 1,     'All 1', 1,       'All 1', 1,     ''],
                    ['All 1', 1,      'All 1', 1,       'All 1', 1,     'All 1', 1,     'All 1', 1,       'All 1', 1,     ''],
                    ['All 1', 1,      'All 1', 1,       'All 1', 1,     'All 1', 1,     'All 1', 1,       'All 1', 1,     ''],
                    ['All 1', 1,      'All 1', 1,       'All 1', 1,     'All 1', 1,     'All 1', 1,       'All 1', 1,     ''],
                    ['All 1', 1,      'All 1', 1,       'All 1', 1,     'All 1', 1,     'All 1', 1,       'All 1', 1,     ''],
                    ['All 1', 1,      'All 1', 1,       'All 1', 1,     'All 1', 1,     'All 1', 1,       'All 1', 1,     ''],
                    ['All 1', 1,      'All 1', 1,       'All 1', 1,     'All 1', 1,     'All 1', 1,       'All 1', 1,     ''],
                    ['All 1', 1,      'All 1', 1,       'All 1', 1,     'All 1', 1,     'All 1', 1,       'All 1', 1,     ''],
                    ['All 1', 1,      'All 1', 1,       'All 1', 1,     'All 1', 1,     'All 1', 1,       'All 1', 1,     ''],
                    // Boring Day
                    ['Green', 10,      'Yellow', 20,    'Red', 30,      'Green', 40,    'Yellow', 50,      'Red', 60,     '9500'],
                    ['Green', 10,      'Yellow', 20,    'Red', 30,      'Green', 40,    'Yellow', 50,      'Red', 60,     'Test 4'],
                    ['Green', 10,      'Yellow', 20,    'Red', 30,      'Green', 40,    'Yellow', 50,      'Red', 60,     ''],
                    ['Green', 10,      'Yellow', 20,    'Red', 30,      'Green', 40,    'Yellow', 50,      'Red', 60,     ''],
                    ['Green', 10,      'Yellow', 20,    'Red', 30,      'Green', 40,    'Yellow', 50,      'Red', 60,     ''],
                    ['Green', 10,      'Yellow', 20,    'Red', 30,      'Green', 40,    'Yellow', 50,      'Red', 60,     ''],
                    ['Green', 10,      'Yellow', 20,    'Red', 30,      'Green', 40,    'Yellow', 50,      'Red', 60,     ''],
                    ['Green', 10,      'Yellow', 20,    'Red', 30,      'Green', 40,    'Yellow', 50,      'Red', 60,     ''],
                    ['Green', 10,      'Yellow', 20,    'Red', 30,      'Green', 40,    'Yellow', 50,      'Red', 60,     ''],
                    ['Green', 10,      'Yellow', 20,    'Red', 30,      'Green', 40,    'Yellow', 50,      'Red', 60,     ''],
                    ['Green', 10,      'Yellow', 20,    'Red', 30,      'Green', 40,    'Yellow', 50,      'Red', 60,     ''],
                    ['Green', 10,      'Yellow', 20,    'Red', 30,      'Green', 40,    'Yellow', 50,      'Red', 60,     ''],
                    ['Green', 10,      'Yellow', 20,    'Red', 30,      'Green', 40,    'Yellow', 50,      'Red', 60,     ''],
                    ['Green', 10,      'Yellow', 20,    'Red', 30,      'Green', 40,    'Yellow', 50,      'Red', 60,     ''],
                    ['Green', 10,      'Yellow', 20,    'Red', 30,      'Green', 40,    'Yellow', 50,      'Red', 60,     ''],
    ];
    sht.setAreaValueAtPos(6, 17, data);
    sht.setValue('P6', 'PROTOTYPE');
    sht.setValue('P21', 'All 1 Day');
    sht.setValue('P36', 'Boring Day');
  }

  addTestCalendarDays(generateFrom = -2){
    let sht = getSht(SHT.DAYS);
    var data = [    // Breakfast      Snack             Lunch            Snack          Dinner            Supper          Additional data
                    // 2 Days Ago
                    ['All 1', 1,      'All 1', 1,       'All 1', 1,     'All 1', 1,     'All 1', 1,       'All 1', 1,     '2600'],
                    ['All 1', 1,      'All 1', 1,       'All 1', 1,     'All 1', 1,     'All 1', 1,       'All 1', 1,     'Test 2'],
                    ['All 1', 1,      'All 1', 1,       'All 1', 1,     'All 1', 1,     'All 1', 1,       'All 1', 1,     ''],
                    ['All 1', 1,      'All 1', 1,       'All 1', 1,     'All 1', 1,     'All 1', 1,       'All 1', 1,     ''],
                    ['All 1', 1,      'All 1', 1,       'All 1', 1,     'All 1', 1,     'All 1', 1,       'All 1', 1,     ''],
                    ['All 1', 1,      'All 1', 1,       'All 1', 1,     'All 1', 1,     'All 1', 1,       'All 1', 1,     ''],
                    ['All 1', 1,      'All 1', 1,       'All 1', 1,     'All 1', 1,     'All 1', 1,       'All 1', 1,     ''],
                    ['All 1', 1,      'All 1', 1,       'All 1', 1,     'All 1', 1,     'All 1', 1,       'All 1', 1,     ''],
                    ['All 1', 1,      'All 1', 1,       'All 1', 1,     'All 1', 1,     'All 1', 1,       'All 1', 1,     ''],
                    ['All 1', 1,      'All 1', 1,       'All 1', 1,     'All 1', 1,     'All 1', 1,       'All 1', 1,     ''],
                    ['All 1', 1,      'All 1', 1,       'All 1', 1,     'All 1', 1,     'All 1', 1,       'All 1', 1,     ''],
                    ['All 1', 1,      'All 1', 1,       'All 1', 1,     'All 1', 1,     'All 1', 1,       'All 1', 1,     ''],
                    ['All 1', 1,      'All 1', 1,       'All 1', 1,     'All 1', 1,     'All 1', 1,       'All 1', 1,     ''],
                    ['All 1', 1,      'All 1', 1,       'All 1', 1,     'All 1', 1,     'All 1', 1,       'All 1', 1,     ''],
                    ['All 1', 1,      'All 1', 1,       'All 1', 1,     'All 1', 1,     'All 1', 1,       'All 1', 1,     ''],
                    // 1 Days Ago
                    ['All 1', 1,      'All 1', 16,      'All 1', 31,    'All 1', 46,    'All 1', 61,      'All 1', 76,    '2700'],
                    ['All 1', 2,      'All 1', 17,      'All 1', 32,    'All 1', 47,    'All 1', 62,      'All 1', 77,    'Test 3'],
                    ['All 1', 3,      'All 1', 18,      'All 1', 33,    'All 1', 48,    'All 1', 63,      'All 1', 78,    ''],
                    ['All 1', 4,      'All 1', 19,      'All 1', 34,    'All 1', 49,    'All 1', 64,      'All 1', 79,    ''],
                    ['All 1', 5,      'All 1', 20,      'All 1', 35,    'All 1', 50,    'All 1', 65,      'All 1', 80,    ''],
                    ['All 1', 6,      'All 1', 21,      'All 1', 36,    'All 1', 51,    'All 1', 66,      'All 1', 81,    ''],
                    ['All 1', 7,      'All 1', 22,      'All 1', 37,    'All 1', 52,    'All 1', 67,      'All 1', 82,    ''],
                    ['All 1', 8,      'All 1', 23,      'All 1', 38,    'All 1', 53,    'All 1', 68,      'All 1', 83,    ''],
                    ['All 1', 9,      'All 1', 24,      'All 1', 39,    'All 1', 54,    'All 1', 69,      'All 1', 84,    ''],
                    ['All 1', 10,     'All 1', 25,      'All 1', 40,    'All 1', 55,    'All 1', 70,      'All 1', 85,    ''],
                    ['All 1', 11,     'All 1', 26,      'All 1', 41,    'All 1', 56,    'All 1', 71,      'All 1', 86,    ''],
                    ['All 1', 12,     'All 1', 27,      'All 1', 42,    'All 1', 57,    'All 1', 72,      'All 1', 87,    ''],
                    ['All 1', 13,     'All 1', 28,      'All 1', 43,    'All 1', 58,    'All 1', 73,      'All 1', 88,    ''],
                    ['All 1', 14,     'All 1', 29,      'All 1', 44,    'All 1', 59,    'All 1', 74,      'All 1', 89,    ''],
                    ['All 1', 15,     'All 1', 30,      'All 1', 45,    'All 1', 60,    'All 1', 75,      'All 1', 90,    ''],
                    // Today
                    ['All 1', 100,    '', '',           '', '',         '', '',         '', '',           '', '',         '2800'],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         'Test 4'],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         ''],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         ''],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         ''],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         ''],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         ''],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         ''],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         ''],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         ''],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         ''],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         ''],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         ''],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         ''],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         ''],
                    // 1 Day Later
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         '2900'],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         'Test 5'],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         ''],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         ''],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         ''],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         ''],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         ''],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         ''],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         ''],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         ''],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         ''],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         ''],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         ''],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         ''],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         ''],
                    // 2 Day Later
                    ['All 1', 300,    '', '',           '', '',         '', '',         '', '',           '', '',         '3000'],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         'Test 6'],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         ''],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         ''],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         ''],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         ''],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         ''],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         ''],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         ''],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         ''],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         ''],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         ''],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         ''],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         ''],
                    ['', '',          '', '',           '', '',         '', '',         '', '',           '', '',         ''],
    ];
    sht.setAreaValueAtPos(6, 2, data);
    let date = getToday();
    date.setDate(date.getDate() + generateFrom);
    for(let i = 0; i < 5; i++){
      sht.setValue(`A${6+(i*15)}`, new Date(date));
      date.setDate(date.getDate() + 1);
    }
  }

  clearDays(){
    let sht = getSht(SHT.DAYS);
    sht.clearContent('B6:N');
    sht.clearContent('Q6:AC20');
    sht.deleteCells('P21:AC200');
    let numDays = getRng(RNG.NUMBER_OF_DAYS).getValue();
    for(var i = 0; i<numDays; i++){
      sht.setPosValue(6 + (i * 15), 14, '2330');
      sht.setPosValue(7 + (i * 15), 14, 'Default');
    }
    sht.setPosValue(6, 29, '2330');
    sht.setPosValue(7, 29, 'Default');
  }

  clearDay(){
    getRng(RNG.MEAL_NAMES).clearContent();
    getRng(RNG.DAY_ITEMS).clearContent();
    getRng(RNG.SELECTED_PROFILE).setValue('Default');
    getRng(RNG.CALORIE_OUTPUT).setValue(2330);
  }

  // TEST PROFILES

  addTestProfiles(){
    let rng = getRng(RNG.MACRO_PROFILES);
    rng.clearContent();
    let profile = [
      ['Test 1', '',  'Test 2', '', 'Test 3', '', 'Test 4', '', 'Test 5', '', 'Test 6', '', 'Test 7', ''], // Name
      [1000, 2000,    2000, 3000,   3000, 4000,   4000, 5000,   5000, 6000,   6000, 7000,   7000, 8000],   // Calorie
      [10, 20,        20, 30,       30, 40,       40, 50,       50, 60,       60, 70,       70, 80],       // Total Fat
      [11, 21,        21, 31,       31, 41,       41, 51,       51, 61,       61, 71,       71, 81],       // Saturated fat
      [12, 22,        22, 32,       32, 42,       42, 52,       52, 62,       62, 72,       72, 82],       // Trans Fat
      [13, 23,        23, 33,       33, 43,       43, 53,       53, 63,       63, 73,       73, 83],       // Carbohydrate
      [14, 24,        24, 34,       34, 44,       44, 54,       54, 64,       64, 74,       74, 84],       // Fiber
      [15, 25,        25, 35,       35, 45,       45, 55,       55, 65,       65, 75,       75, 85],       // Sugar
      [16, 26,        26, 36,       36, 46,       46, 56,       56, 66,       66, 76,       76, 86],       // Sugar alcohol
      [17, 27,        27, 37,       37, 47,       47, 57,       57, 67,       67, 77,       77, 87],       // Protein
      [18, 28,        28, 38,       38, 48,       48, 58,       58, 68,       68, 78,       78, 88],       // Salt / Sodium 
      [19, 29,        29, 39,       39, 49,       49, 59,       59, 69,       69, 79,       79, 89]        // Budget
    ]
    rng.setValues(profile);
  }

  addDefaultProfile(){
    let rng = getRng(RNG.MACRO_PROFILES);
    rng.clearContent();
    let profile = [
      ['Default', ''],  // Name
      [2330, 2480],     // Calorie
      [20, 30],         // Total Fat
      [0, 10],          // Saturated fat
      [0, 0],           // Trans Fat
      [45, 65],         // Carbohydrate
      [15, 30],         // Fiber
      [0, 15],          // Sugar
      [0, 19],          // Sugar alcohol
      [10, 35],         // Protein
      [0, 10],          // Salt / Sodium 
      [0, 0]            // Budget
    ]
    rng.setValuesWithResize(profile);
    getRng(RNG.COPY_CALORIES_SELECTED_PROFILE).setValue('Default');
    getRng(RNG.SELECTED_PROFILE).setValue('Default');
  }

  // MEALS

  addTestMeals(){
    this.clearMeals();
    let data = [
      [`${MEAL_ICON} Meal0`, 'Test 100g', 150],
      [`${MEAL_ICON} Meal0`, 'Test 100g', 10],
      [`${MEAL_ICON} Meal1`, '1 First', 10],
      [`${MEAL_ICON} Meal1`, '2 Second', 20],
      [`${MEAL_ICON} Meal1`, '3 Third', 30],
      [`${MEAL_ICON} Meal1`, 'ZZ Last', 99],
      [`${MEAL_ICON} Meal1`, '1 First', 110],
      [`${MEAL_ICON} Meal1`, '2 Second', 120],
      [`${MEAL_ICON} Meal1`, '3 Third', 130],
      [`${MEAL_ICON} Meal1`, 'ZZ Last', 199],
      [`${MEAL_ICON} Meal1`, '1 First', 210],
      [`${MEAL_ICON} Meal1`, '2 Second', 220],
      [`${MEAL_ICON} Meal1`, '3 Third', 230],
      [`${MEAL_ICON} Meal1`, 'ZZ Last', 299],
      [`${MEAL_ICON} Meal1`, '1 First', 310],
      [`${MEAL_ICON} Meal1`, '2 Second', 320],
      [`${MEAL_ICON} Meal1`, '3 Third', 330],
      [`${MEAL_ICON} Meal2`, 'Max cal', 100],
      [`${MEAL_ICON} Meal2`, 'Zero cal', 500],
      [`${MEAL_ICON} Meal2`, 'All Green', 256]
    ];
    getSht(SHT.MEALS).putDataAtEnd(data);
  }

  clearMeals(){
    getSht(SHT.MEALS).clearContent('B4:D');
  }

  // RECIPES

  addTestRecipes(){
    this.clearRecipes();
    let data = [
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
      ['Recipe3', 'Test 1 serving', 2]
    ];
    getSht(SHT.RECIPES).putDataAtEnd(data);
  }

  clearRecipes(){
    getSht(SHT.RECIPES).clearContent('B4:D');
  }

  clearRecipeCalculator(){
    getRng(RNG.RECIPE_NAME).clearContent();
    getRng(RNG.RECIPE_ITEMS).clearContent();
  }

  // WEIGHT
  resetWeight(){
    let weightsRng = getRng(RNG.WEIGHTS);
    weightsRng.clearContent();
    weightsRng.setValue('01/01/2024', 1, 1);
    weightsRng.setValue('80', 1, 3);
  }

  // CALCULATOR

  resetCalorieCalculatorValues(){
    let calRng = getRng(RNG.CALORIE_OUTPUT_CALCULATOR)
    calRng.setValue('01/01/2000', 1);
    calRng.setValue('Man', 3);
    calRng.setValue(200, 4);
    calRng.setValue('Sedentary', 5);
    calRng.setValue(80, 6);
    calRng.setValue('Weight maintain', 10);
  }

  // SETTINGS
  resetSettings(){
    let generalSettings = getRng(RNG.GENERAL_SETTINGS);
    generalSettings.setValue(2, 1);
    generalSettings.setValue(2, 2);
    generalSettings.setValue(false, 3);
    generalSettings.setValue(generalSettings.getValidationCriteriaRangeValues(4)[1], 4);
    generalSettings.setValue(true, 5);
    generalSettings.setValue(true, 6);
    generalSettings.setValue(true, 7);
    generalSettings.setValue(true, 8);
    getRng(RNG.NUTRITION_FIELDS).setValues([[true], [false], [false], [true], [false], [false], [false], [true], [false]]);
    getRng(RNG.MEALS).setValues([['Breakfast', 12], ['Snack', 5], ['Lunch', 15], ['Snack', 5], ['Dinner', 13], ['Supper', 5]]);
    let localisation = getRng(RNG.LOCALISATION);
    localisation.setValue(localisation.getValidationCriteriaRangeValues(1)[1], 1);
    localisation.setValue('_0', 2);
    localisation.setValue('DD/MM/YYYY', 3);
    localisation.setValue(localisation.getValidationCriteriaRangeValues(4)[0], 4);
    localisation.setValue('£', 5);
    getObj(SettingsService).applySettings();
    localisation.setValue('Metric', 4);
  }

  clearImports(){
    let importRng = getRng(RNG.IMPORT);
    importRng.setValue('', 1, 2);
    importRng.setValue(importRng.getValidationCriteriaRangeValues(2,2)[0], 2, 2);
    importRng.setValue(importRng.getValidationCriteriaRangeValues(3,2)[0], 3, 2);
    importRng.setValue(importRng.getValidationCriteriaRangeValues(4,2)[0], 4, 2);
    importRng.setValue(true, 2, 3);
    importRng.setValue(true, 3, 3);
    importRng.setValue(true, 4, 3);
    importRng.setValue(true, 5, 3);
    importRng.setValue(true, 6, 3);
    importRng.setValue(true, 7, 3);
    importRng.setValue(true, 8, 3);
  }

  // HISTORY

  addTestHistory(){
    let sht = getSht(SHT.HISTORY);
    sht.clearContent('B10:S');
    let days = Array.from({length:100},(v,row)=> 
      Array.from({length:15},(v,col)=> row + col)
    );
    sht.putDataAtEnd(days);
  }

  clearHistory(){
    getSht(SHT.HISTORY).clearContent('B10:S');
  }

  incCol(startChar, i){
    return String.fromCharCode(startChar.charCodeAt() + i);
  }

  // RESET FULL SHEET
  makeSheetReleaseReady(){
    console.info('Setting sheet to release ready state');
  }
}

var testData = new TestData();