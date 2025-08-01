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
    sht.clearContent('P21:AC200');
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
    let daySht = getSht(SHT.DAY);
    daySht.setValue('A17','=Texts!B403');
    daySht.setValue('A32','=Texts!B404');
    daySht.setValue('A47','=Texts!B405');
    daySht.setValue('A62','=Texts!B406');
    daySht.setValue('A77','=Texts!B407');
    daySht.setValue('A92','=Texts!B408');
    daySht.setValue('G6','=Texts!B403');
    daySht.setValue('G7','=Texts!B404');
    daySht.setValue('G8','=Texts!B405');
    daySht.setValue('G9','=Texts!B406');
    daySht.setValue('G10','=Texts!B407');
    daySht.setValue('G11','=Texts!B408');
    daySht.setValue('D5','=Texts!B25');
    let newItemSht = getSht(SHT.NEW_ITEM);
    newItemSht.setValue('C19','=Texts!B542');
    newItemSht.setValue('C23','=Texts!B539');
    let recipeCalcSht = getSht(SHT.RECIPE_CALCULATOR);
    recipeCalcSht.setValue('C33','=Texts!B539');
    recipeCalcSht.setValue('C35','=Texts!B542');
    let profileSht = getSht(SHT.PROFILE);
    profileSht.setValue('D19','=Texts!B521');
    profileSht.setValue('D21','=Texts!B523');
    profileSht.setValue('D26','=Texts!B534');
    profileSht.setValue('D30','=Texts!B25');
    profileSht.setValue('C3','=Texts!B25');
   // profileSht.setValue('C30','=Texts!B25');
    let daysSht = getSht(SHT.DAYS);
    daysSht.setValue('B5','=Texts!B403');
    daysSht.setValue('D5','=Texts!B404');
    daysSht.setValue('F5','=Texts!B405');
    daysSht.setValue('H5','=Texts!B406');
    daysSht.setValue('J5','=Texts!B407');
    daysSht.setValue('L5','=Texts!B408');    
    daysSht.setValue('Q5','=Texts!B403');
    daysSht.setValue('S5','=Texts!B404');
    daysSht.setValue('U5','=Texts!B405');
    daysSht.setValue('W5','=Texts!B406');
    daysSht.setValue('Y5','=Texts!B407');
    daysSht.setValue('AA5','=Texts!B408');
    let historySht = getSht(SHT.HISTORY);
    historySht.setValue('B3','=Texts!B553');
    let settingsSht = getSht(SHT.SETTINGS);
    settingsSht.setValue('E7','=Texts!B529');
    settingsSht.setValue('E26','=Texts!B557');
    settingsSht.setValue('L5','=Texts!B537');
    settingsSht.setValue('L6','=Texts!B537');
    settingsSht.setValue('L7','=Texts!B537');
    settingsSht.setValue('F14','=Texts!B403');
    settingsSht.setValue('F15','=Texts!B404');
    settingsSht.setValue('F16','=Texts!B405');
    settingsSht.setValue('F17','=Texts!B406');
    settingsSht.setValue('F18','=Texts!B407');
    settingsSht.setValue('F19','=Texts!B408');
    this.clearItems();
    var data = [  
                  ['=Texts!B409',	  100,	    'g',	  1,	  576,	5.76,	49.00,0.49,	3.7,  0.04,	0.0,	0.00,	22.0,	0.22,	12.0,	0.12,	3.9,	0.04,	0,	0.00,	21.0,	0.21,	1,		0.01,	0,	0,	'=texts!B84',	5.76],
                  ['=Texts!B410',	  100,	    'g',	  1,	  52,		0.52,	0.20,	0.00,	0.0,	0.00,	0.0,	0.00,	14.0,	0.14,	2.4,	0.02,	10.0,	0.10,	0,	0.00,	0.3,	0.00,	1,		0.01,	0,	0,	'=texts!B82',	0.52],
                  ['=Texts!B411',	  100,	    'g',	  1,	  20,		0.20,	0.10,	0.00,	0.0,	0.00,	0.0,	0.00,	3.9,	0.04,	2.1,	0.02,	1.9,	0.02,	0,	0.00,	2.2,	0.02,	2,		0.02,	0,	0,	'=texts!B82',	0.20],
                  ['=Texts!B412',	  100,	    'g',	  1,	  160,	1.60,	14.70,0.15,	2.1,	0.02,	0.0,	0.00,	8.5,	0.09,	6.7,	0.07,	0.7,	0.01,	0,	0.00,	2.0,	0.02,	7,		0.07,	0,	0,	'=texts!B83',	1.60],
                  ['=Texts!B413',	  100,	    'g',	  1,	  53,		0.53,	0.00,	0.00,	0.0,	0.00,	0.0,	0.00,	28.0,	0.28,	0.0,	0.00,	0.0,	0.00,	0,	0.00,	0.0,	0.00,	0,		0.00,	0,	0,	'=texts!B82',	0.53],
                  ['=Texts!B414',	  100,	    'g',	  1,	  89,		0.89,	0.30,	0.00,	0.1,	0.00,	0.0,	0.00,	23.0,	0.23,	2.6,	0.03,	12.0,	0.12,	0,	0.00,	1.1,	0.01,	1,		0.01,	0,	0,	'=texts!B82',	0.89],
                  ['=Texts!B415',	  100,	    'g',	  1,	  27,		0.27,	0.10,	0.00,	0.1,	0.00,	0.0,	0.00,	3.2,	0.03,	1.9,	0.02,	0.2,	0.00,	0,	0.00,	2.5,	0.03,	6,		0.06,	0,	0,	'=texts!B82',	0.27],
                  ['=Texts!B416',	  100,	    'g',	  1,	  24,		0.24,	0.20,	0.00,	0.0,	0.00,	0.0,	0.00,	4.3,	0.04,	1.1,	0.01,	2.5,	0.03,	0,	0.00,	0.8,	0.01,	2,		0.02,	0,	0,	'=texts!B82',	0.24],
                  ['=Texts!B417',	  100,	    'g',	  1,	  57,		0.57,	0.30,	0.00,	0.0,	0.00,	0.0,	0.00,	14.5,	0.15,	2.4,	0.02,	10.0,	0.10,	0,	0.00,	0.7,	0.01,	1,		0.01,	0,	0,	'=texts!B82',	0.57],
                  ['=Texts!B418',	  100,	    'g',	  1,	  34,		0.34,	0.86,	0.01,	0.1,	0.00,	0.0,	0.00,	6.1,	0.06,	0.9,	0.01,	8.0,	0.08,	0,	0.00,	2.1,	0.02,	16,		0.16,	0,	0,	'=texts!B82',	0.34],
                  ['=Texts!B419',	  100,	    'g',	  1,	  41,		0.41,	0.20,	0.00,	0.0,	0.00,	0.0,	0.00,	10.0,	0.10,	3.0,	0.03,	3.5,	0.04,	0,	0.00,	0.9,	0.01,	58,		0.58,	0,	0,	'=texts!B82',	0.41],
                  ['=Texts!B420',	  100,	    'g',	  1,	  553,	5.53,	44.00,0.44,	9.2,	0.09,	0.0,	0.00,	30.0,	0.30,	3.0,	0.03,	5.0,	0.05,	0,	0.00,	18.0,	0.18,	640,	6.40,	0,	0,	'=texts!B84',	5.53],
                  ['=Texts!B421',	  100,	    'g',	  1,	  14,		0.14,	0.20,	0.00,	0.0,	0.00,	0.0,	0.00,	3.0,	0.03,	1.6,	0.02,	1.3,	0.01,	0,	0.00,	0.7,	0.01,	80,		0.80,	0,	0,	'=texts!B82',	0.14],
                  ['=Texts!B422',	  100,	    'g',	  1,	  30,		0.30,	0.70,	0.01,	0.1,	0.00,	0.0,	0.00,	4.4,	0.04,	2.5,	0.03,	1.9,	0.02,	0,	0.00,	3.3,	0.03,	3,		0.03,	0,	0,	'=texts!B82',	0.30],
                  ['=Texts!B423',	  100,	    'g',	  1,	  20,		0.20,	0.40,	0.00,	0.1,	0.00,	0.0,	0.00,	1.8,	0.02,	1.0,	0.01,	1.7,	0.02,	0,	0.00,	1.8,	0.02,	3,		0.03,	0,	0,	'=texts!B82',	0.20],
                  ['=Texts!B424',	  100,	    'g',	  1,	  15,		0.15,	0.10,	0.00,	0.0,	0.00,	0.0,	0.00,	3.6,	0.04,	0.5,	0.01,	1.7,	0.02,	0,	0.00,	0.7,	0.01,	2,		0.02,	0,	0,	'=texts!B82',	0.15],
                  ['=Texts!B425',	  100,	    'g',	  1,	  131,	1.31,	9.00,	0.09,	3.1,	0.03,	0.0,	0.00,	0.0,	0.00,	0.0,	0.00,	0.4,	0.00,	0,	0.00,	12.5,	0.13,	142,	1.42,	0,	0,	'=texts!B83',	1.31],
                  ['=Texts!B426',	  1,		    'pcs',	59, 	78,		78.00,5.30,	5.30,	1.8,	1.80,	0.0,	0.00,	0.0,	0.00,	0.0,	0.00,	0.2,	0.20,	0,	0.00,	7.4,	7.40,	84,		84.00,0,	0,  '=texts!B83',	1.32],
                  ['=Texts!B427',	  1,		    'pcs',	50, 	66,		66.00,9.00,	9.00,	1.6,	1.60,	0.0,	0.00,	0.0,	0.00,	0.0,	0.00,	0.2,	0.20,	0,	0.00,	12.6,	12.60,71,		71.00,0,	0,	'=texts!B83',	1.32],
                  ['=Texts!B428',	  100,	    'g',	  1,	  74,		0.74,	0.30,	0.00,	0.1,	0.00,	0.0,	0.00,	19.0,	0.19,	2.9,	0.03,	16.0,	0.16,	0,	0.00,	0.8,	0.01,	1,		0.01,	0,	0,	'=texts!B82',	0.74],
                  ['=Texts!B429',	  100,	    'g',	  1,	  110,	1.10,	0.60,	0.01,	0.1,	0.00,	0.0,	0.00,	16.3,	0.16,	2.1,	0.02,	1.0,	0.01,	0,	0.00,	7.9,	0.08,	17,		0.17,	0,	0,	'=texts!B83',	1.10],
                  ['=Texts!B430',	  100,	    'g',	  1,	  67,		0.67,	0.40,	0.00,	0.1,	0.00,	0.0,	0.00,	17.0,	0.17,	0.9,	0.01,	15.0,	0.15,	0,	0.00,	0.6,	0.01,	2,		0.02,	0,	0,	'=texts!B82',	0.67],
                  ['=Texts!B431',	  100,	    'g',	  1,	  36,		0.36,	0.10,	0.00,	0.0,	0.00,	0.0,	0.00,	9.0,	0.09,	0.8,	0.01,	8.1,	0.08,	0,	0.00,	0.5,	0.01,	18,		0.18,	0,	0,	'=texts!B82',	0.36],
                  ['=Texts!B432',	  100,	    'g',	  1,	  14,		0.14,	0.10,	0.00,	0.0,	0.00,	0.0,	0.00,	3.0,	0.03,	1.2,	0.01,	2.0,	0.02,	0,	0.00,	0.9,	0.01,	10,		0.10,	0,	0,	'=texts!B82',	0.14],
                  ['=Texts!B433',	  100,	    'g',	  1,	  61,		0.61,	0.50,	0.01,	0.0,	0.00,	0.0,	0.00,	15.0,	0.15,	3.0,	0.03,	9.0,	0.09,	0,	0.00,	1.1,	0.01,	3,		0.03,	0,	0,	'=texts!B82',	0.61],
                  ['=Texts!B434',	  100,	    'g',	  1,	  61,		0.61,	0.30,	0.00,	0.0,	0.00,	0.0,	0.00,	14.0,	0.14,	1.8,	0.02,	3.9,	0.04,	0,	0.00,	1.5,	0.02,	20,		0.20,	0,	0,	'=texts!B82',	0.61],
                  ['=Texts!B435',	  100,	    'g',	  1,	  15,		0.15,	0.20,	0.00,	0.0,	0.00,	0.0,	0.00,	2.9,	0.03,	2.1,	0.02,	1.2,	0.01,	0,	0.00,	1.4,	0.01,	0,		0.00,	0,	0,	'=texts!B82',	0.15],
                  ['=Texts!B436',	  100,	    'g',	  1,	  60,		0.60,	0.40,	0.00,	0.1,	0.00,	0.0,	0.00,	15.0,	0.15,	1.8,	0.02,	14.8,	0.15,	0,	0.00,	0.8,	0.01,	2,		0.02,	0,	0,	'=texts!B82',	0.60],
                  ['=Texts!B437',	  100,	    'g',	  1,	  828,	8.28,	92.00,0.92,	7.1,	0.07,	0.0,	0.00,	0.0,	0.00,	0.0,	0.00,	0.0,	0.00,	0,	0.00,	0.0,	0.00,	0,		0.00,	0,	0,	'=texts!B84',	8.28],
                  ['=Texts!B438',	  100,	    'g',	  1,	  47,		0.47,	0.10,	0.00,	0.0,	0.00,	0.0,	0.00,	12.0,	0.12,	2.2,	0.02,	8.5,	0.09,	0,	0.00,	0.9,	0.01,	1,		0.01,	0,	0,	'=texts!B82',	0.47],
                  ['=Texts!B439',	  100,	    'g',	  1,	  431,	4.31,	29.00,0.29,	15.0,	0.15,	0.9,	0.01,	4.1,	0.04,	0.0,	0.00,	0.1,	0.00,	0,	0.00,	38.0,	0.38,	1804,18.04,	0,	0,	'=texts!B84',	4.31],
                  ['=Texts!B440',	  100,	    'g',	  1,	  36,		0.36,	0.80,	0.01,	0.1,	0.00,	0.0,	0.00,	6.0,	0.06,	3.3,	0.03,	0.9,	0.01,	0,	0.00,	3.0,	0.03,	56,		0.56,	0,	0,	'=texts!B82',	0.36],
                  ['=Texts!B441',	  100,	    'g',	  1,	  71,		0.71,	0.30,	0.00,	0.1,	0.00,	0.0,	0.00,	18.0,	0.18,	3.6,	0.04,	4.8,	0.05,	0,	0.00,	1.2,	0.01,	10,		0.10,	0,	0,	'=texts!B82',	0.71],
                  ['=Texts!B442',	  100,	    'g',	  1,	  39,		0.39,	0.25,	0.00,	0.1,	0.00,	0.0,	0.00,	9.5,	0.10,	1.5,	0.02,	8.4,	0.08,	0,	0.00,	0.9,	0.01,	0,		0.00,	0,	0,	'=texts!B82',	0.39],
                  ['=Texts!B443',	  100,	    'g',	  1,	  557,	5.57,	55.00,0.55,	5.4,	0.05,	0.0,	0.00,	8.2,	0.08,	10.3,	0.10,	7.6,	0.08,	0,	0.00,	21.0,	0.21,	1,		0.01,	0,	0,	'=texts!B84',	5.57],
                  ['=Texts!B444',	  100,	    'g',	  1,	  77,		0.77,	0.10,	0.00,	0.0,	0.00,	0.0,	0.00,	17.0,	0.17,	2.2,	0.02,	1.2,	0.01,	0,	0.00,	2.0,	0.02,	10,		0.10,	0,	0,	'=texts!B82',	0.77],
                  ['=Texts!B445',	  100,	    'g',	  1,	  130,	1.30,	0.30,	0.00,	0.1,	0.00,	0.0,	0.00,	28.0,	0.28,	0.4,	0.00,	0.1,	0.00,	0,	0.00,	2.7,	0.03,	1,		0.01,	0,	0,	'=texts!B83',	1.30],
                  ['=Texts!B446',	  100,	    'g',	  1,	  365,	3.65,	0.70,	0.01,	0.1,	0.00,	0.0,	0.00,	80.0,	0.80,	2.8,	0.03,	0.0,	0.00,	0,	0.00,	7.0,	0.07,	1,		0.01,	0,	0,	'=texts!B84',	3.65],
                  ['=Texts!B447',	  100,	    'g',	  1,	  23,		0.23,	0.10,	0.00,	0.0,	0.00,	0.0,	0.00,	3.6,	0.04,	2.4,	0.02,	0.4,	0.00,	0,	0.00,	3.0,	0.03,	70,		0.70,	0,	0,	'=texts!B82',	0.23],
                  ['=Texts!B448',	  100,	    'g',	  1,	  32,		0.32,	0.20,	0.00,	0.0,	0.00,	0.0,	0.00,	7.0,	0.07,	2.6,	0.03,	2.3,	0.02,	0,	0.00,	1.8,	0.02,	5,		0.05,	0,	0,	'=texts!B82',	0.32],
                  ['=Texts!B449',	  100,	    'g',	  1,	  33,		0.33,	0.30,	0.00,	0.0,	0.00,	0.0,	0.00,	7.6,	0.08,	2.0,	0.02,	4.9,	0.05,	0,	0.00,	0.7,	0.01,	1,		0.01,	0,	0,	'=texts!B82',	0.33],
                  ['=Texts!B450',	  100,	    'g',	  1,	  400,	4.00,	0.00,	0.00,	0.0,	0.00,	0.0,	0.00,	100.0,1.00,	0.0,  0.00,	100.0,1.00,	0,	0.00,	0.0,	0.00,	1,	  0.01,	0,	0,	'=texts!B84',	4.00],
                  ['=Texts!B451',	  100,	    'g',	  1,	  18,		0.18,	0.10,	0.00,	0.0,	0.00,	0.0,	0.00,	3.8,	0.04,	1.2,	0.01,	2.6,	0.03,	0,	0.00,	0.9,	0.01,	5,		0.05,	0,	0,	'=texts!B82',	0.18],
                  ['=Texts!B452',	  1,		    'g',	  1,	  0,		0.00,	0.00,	0.00,	0.0,	0.00,	0.0,	0.00,	0.0,	0.00,	0.0,	0.00,	0.0,	0.00,	0,	0.00,	0.0,	0.00,	0,		0.00,	0,	0,	'=texts!B82',	0.00],
               ];
    getSht(SHT.ITEMS).putDataAtEnd(data);

  }
}

var testData = new TestData();