class TestUtils {

  constructor(testBase){
    this.LAST_ITEM_INDEX = 14;
    this.testBase = testBase;
  }

  // TEST ITEMS

  addTestIems() {
      this.clearItems();
      var testData = [// Name         Amounth Unit    Gramm Cal         TotFat    SatFat    TrFat     Carb      Fiber     Sugar     SugarAlk  Protein   Salt      Noom      Cal/Gramm  
                      ["First",         100,  "g",      1,  100,  1,    100,1,    100,1,    100,1,    100,1,    100,1,    100,1,    100,1,    100,1,    100,1,    "Green",  1],
                      ["Second",        100,  "g",      1,  100,  1,    100,1,    100,1,    100,1,    100,1,    100,1,    100,1,    100,1,    100,1,    100,1,    "Green",  1],
                      ["Third",         100,  "g",      1,  100,  1,    100,1,    100,1,    100,1,    100,1,    100,1,    100,1,    100,1,    100,1,    100,1,    "Green",  1],
                      ["All 100",       100,  "g",      1,  100,  1,    100,1,    100,1,    100,1,    100,1,    100,1,    100,1,    100,1,    100,1,    100,1,    "Green",  1],
                      ["All 1",         1,    "g",      1,  1,    1,    1,  1,    1,  1,    1,  1,    1,  1,    1,  1,    1,  1,    1,  1,    1,  1,    1,  1,    "Green",  1],
                      ["Test 100g",     100,  "g",      1,  370,  3.7,  10, 0.1,  5,  0.05, 5,  0.05, 30, 0.3,  40, 0.4,  5,  0.05, 1,  0.01, 20, 0.2,  100,1,    "Green",  3.7],
                      ["Test 1 serving",1,    "Serving",50, 250,  250,  25, 25,   2,  2,    0,  0,    45, 45,   1,  1,    21, 21,   0,  0,    4,  4,    12, 12,   "Red",    5],
                      ["Green",         100,  "g",      1,  100,  1,    10, 0.1,  11, 0.11, 12, 0.12, 13, 0.13, 14, 0.14, 15, 0.15, 16, 0.16, 17, 0.17, 18, 0.18, "Green",  1],
                      ["Yellow",        100,  "g",      1,  200,  2,    20, 0.2,  21, 0.21, 22, 0.22, 23, 0.23, 24, 0.24, 25, 0.25, 26, 0.26, 27, 0.27, 28, 0.28, "Yellow", 2],
                      ["Red",           100,  "g",      1,  500,  5,    50, 0.5,  51, 0.51, 52, 0.52, 53, 0.53, 54, 0.54, 55, 0.55, 56, 0.56, 57, 0.57, 58, 0.58, "Red",    5],
                      ["Max cal",       100,  "g",      1,  900,  9,    100,1,    50, 0.5,  50, 0.5,  0,  0,    0,  0,    0,  0,    0,  0,    0,  0,    0,  0,    "Red",    9],
                      ["Zero cal",      100,  "g",      1,  0,    0,    0,  0,    0,  0,    0,  0,    0,  0,    0,  0,    0,  0,    0,  0,    0,  0,    0,  0,    "Green",  0],
                      ['All Green',     1500, 'g',      1,  1485, 0.99, 18, 0.012,18, 0.012,18, 0.012,36, 0.024,18, 0.012,18, 0.012,18, 0.012,48, 0.032,18, 0.012,"Green",  0.99],
                      ["Last",          100,  "g",      1,  100,  1,    100,1,    100,1,    100,1,    100,1,    100,1,    100,1,    100,1,    100,1,    100,1,    "Green",  1]
                    ];
      this.testBase.itemsSpr.putDataAtEnd(testData);
  }

  clearItems() {
      this.testBase.itemsSpr.clear('B4:AA');
  }

  // TEST PROFILES

  addTestProfiles(){
    this.testBase.macroProfilesRng.clear();
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
      [18, 28,        28, 38,       38, 48,       48, 58,       58, 68,       68, 78,       78, 88]        // Salt / Sodium 
    ]
    this.testBase.macroProfilesRng.setValues(profile);
  }

  addDefaultProfile(){
    this.testBase.macroProfilesRng.clear();
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
      [0, 10]           // Salt / Sodium 
    ]
    this.testBase.macroProfilesRng.setValuesWithResize(profile);
  }

  // MEALS

  addTestMeals(){
    this.clearMeals();
    let testData = [
      [`${MEAL_ICON} Meal0`, 'Test 100g', 150],
      [`${MEAL_ICON} Meal0`, 'Test 100g', 10],
      [`${MEAL_ICON} Meal1`, 'First', 10],
      [`${MEAL_ICON} Meal1`, 'Second', 20],
      [`${MEAL_ICON} Meal1`, 'Third', 30],
      [`${MEAL_ICON} Meal1`, 'Last', 99],
      [`${MEAL_ICON} Meal1`, 'First', 110],
      [`${MEAL_ICON} Meal1`, 'Second', 120],
      [`${MEAL_ICON} Meal1`, 'Third', 130],
      [`${MEAL_ICON} Meal1`, 'Last', 199],
      [`${MEAL_ICON} Meal1`, 'First', 210],
      [`${MEAL_ICON} Meal1`, 'Second', 220],
      [`${MEAL_ICON} Meal1`, 'Third', 230],
      [`${MEAL_ICON} Meal1`, 'Last', 299],
      [`${MEAL_ICON} Meal1`, 'First', 310],
      [`${MEAL_ICON} Meal1`, 'Second', 320],
      [`${MEAL_ICON} Meal1`, 'Third', 330],
      [`${MEAL_ICON} Meal2`, 'Max cal', 100],
      [`${MEAL_ICON} Meal2`, 'Zero cal', 500],
      [`${MEAL_ICON} Meal2`, 'All Green', 256]
    ];
    this.testBase.mealsSpr.putDataAtEnd(testData);
  }

  clearMeals(){
    this.testBase.mealsSpr.clear('B4:D');
  }

  // RECIPES

  addTestRecipes(){
    this.clearRecipes();
    let testData = [
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
    this.testBase.recipesSpr.putDataAtEnd(testData);
  }

  clearRecipes(){
    this.testBase.recipesSpr.clear('B4:D');
  }

  // WEIGHT
  resetWeight(){
    let weightsRng = this.testBase.weightsRng;
    weightsRng.clear();
    weightsRng.setValue('01/01/2024', 1, 1);
    weightsRng.setValue('80', 1, 3);
  }

  // CALCUATOR

  resetCalorieCalculatorValues(){
    let calRng = this.testBase.calorieOutputCalculatorRng; 
    calRng.setValue('01/01/2000', 1);
    calRng.setValue('Man', 3);
    calRng.setValue(200, 4);
    calRng.setValue('Sedentary', 5);
    calRng.setValue(80, 6);
    calRng.setValue('Weight maintain', 10);
  }

  incCol(startChar, i){
    return String.fromCharCode(startChar.charCodeAt() + i);
  }
}