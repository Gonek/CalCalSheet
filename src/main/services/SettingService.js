class SettingsService{

  constructor(){
    this.daySht = getSht(SHT.DAY);
    this.daysSht = getSht(SHT.DAYS);
    this.newItemSht = getSht(SHT.NEW_ITEM);
    this.recipeCalculatorSht = getSht(SHT.RECIPE_CALCULATOR);
    this.itemsSht = getSht(SHT.ITEMS);
    this.profileSht = getSht(SHT.PROFILE);
    this.historySht = getSht(SHT.HISTORY);
  }

  applySettings(){
    var nutritionFields = getRng(RNG.NUTRITION_FIELDS).getColAsArray();
    var generalSettings = getRng(RNG.GENERAL_SETTINGS).getColAsArray()
    var meals = getRng(RNG.MEALS).getValues();

    this.applyGeneralSettings(generalSettings);
    this.changeFields(nutritionFields, generalSettings);
    this.changeMeals(meals);
    this.changeLocalisation();
  }

  addTrigger(){
    let trigger = ScriptApp.getProjectTriggers().find(t => t.getHandlerFunction() == 'onOpen');
    if(!trigger){
      ScriptApp.newTrigger('onOpen')
        .timeBased()
        .everyHours(1)
        .create();
    }
  }

  applyGeneralSettings(generalSettings){
    let profileRngList = this.profileSht.getRngList(['C5:P5', 'C8:P8', 'C12:P12']);
    if(generalSettings[7]){
      profileRngList.setNumberFormat('0" %"');
    } else {
      profileRngList.setNumberFormat('0" g"');
    }
    let dayRepository = getObj(DayRepository);
    dayRepository.deletePastDays();
    dayRepository.deleteFutureDays();
    dayRepository.copyDefaultForFutureDays();
    getRng(RNG.DAY_PREV_DAY_INDEX).setValue(getRng(RNG.DAY_INDEX).getValue());
  }

  changeFields(nutritionFields, generalSettings){
    this.changeNutritonFields(nutritionFields);
    this.changePrice(generalSettings);
    this.changeCheckBox(generalSettings);
    this.changeNoom(generalSettings);
  }

  changeNutritonFields(nutritionFields){
    nutritionFields.forEach((field, i) => {
      this.daySht.switchCols(field, i + 9);
      this.newItemSht.switchRows(field, i + 8);
      this.recipeCalculatorSht.switchCols(field, i + 8);
      this.itemsSht.switchCols(field, (i*2) + 8, 2);
      this.profileSht.switchRows(field, i + 5);
      this.historySht.switchCols(field, i + 6);
    })
  }

  changePrice(generalSettings){
    var price = generalSettings[2];
    this.daySht.switchCols(price, 18);
    this.newItemSht.switchRows(price, 17, 2);
    this.recipeCalculatorSht.switchCols(price, 17);
    this.profileSht.switchRows(price, 14);
    this.historySht.switchCols(price, 16);
    this.itemsSht.switchCols(price, 26);    
    this.itemsSht.switchCols(price, 27);
  }

  changeCheckBox(generalSettings){
    var consumedCbx = generalSettings[4];
    this.daySht.switchCols(consumedCbx, 2);
  }

  changeNoom(generalSettings){
    var noom = generalSettings[5];
    this.daySht.switchCols(noom, 19, 3);
    this.daySht.setValue('W6', noom ? 'Noom' : '');
    this.newItemSht.switchRows(noom, 23, 2);
    this.recipeCalculatorSht.switchRows(noom, 33, 2);
    this.itemsSht.switchCols(noom, 28);
  }

  changeMeals(meals){
    meals.forEach((meal, i) => {
      var startPos = (2 + (i + 1) * ROWS_PER_MEAL);
      if (meal[0] != ''){
        var rowShow = meal[1];
        var rowHide = ROWS_PER_MEAL - rowShow; 
        this.daySht.showRows(startPos, rowShow);
        if(rowHide > 0) {
          this.daySht.hideRows(startPos + rowShow, rowHide);
        }
      }else{
        this.daySht.hideRows(startPos, ROWS_PER_MEAL);
      }
      this.daySht.setPosValue(startPos, 1, meal[0]);
      this.daySht.setPosValue(6 + i, 7, meal[0]);
      this.daysSht.setPosValue(5, (i*2) + 2, meal[0]);
      this.daysSht.setPosValue(5, (i*2) + 17, meal[0]);
    })
  }

  changeLocalisation(){
    let localisationRng = getRng(RNG.LOCALISATION);
    let localisationData = localisationRng.getColAsArray();
    let language = localisationData[0];
    let timeZone = localisationData[1].substring(1);
    let dateFormat = localisationData[2];
    let measurement = localisationData[3];
    let measurements = localisationRng.getValidationCriteriaRangeValues(4);
    let currency = localisationData[4];

    let languageRng = getRng(RNG.LANGUAGE)
    languageRng.setValue(language);
    this.changeLanguage(languageRng);
    getRng(RNG.TODAY).setValue(`=ROUNDDOWN(NOW() +${timeZone}/24)`);
    this.changeDateFormat(dateFormat);
    this.changeMeassurement(measurement == measurements[0]);
    this.changeCurrency(currency);
  }

  changeLanguage(languageRng){
    let prevLangRng = getRng(RNG.PREVIOUS_LANGUAGE);
    let currentLanguage = languageRng.getValue()
    if(prevLangRng.getValue() == currentLanguage) return;

    let sheets = getRng(RNG.SHEETS).getValues();
    let notes = getRng(RNG.NOTES).getValues();
    let activeSpsh = getSpSh(SPSH.ACTIVE);
    let tutorialSht = getSht(SHT.TUTORIAL);

    sheets.forEach(s => {
      activeSpsh.getShtById(s[0]).setName(s[1]);
    });

    notes.forEach(n => {
      tutorialSht.getRng(n[0]).setNote(n[1]);
    });

    prevLangRng.setValue(currentLanguage);
    getRng(RNG.LOCALISATION).setValue(currentLanguage);
  }

  changeDateFormat(dateFormat){
    getSht(SHT.DAYS).getRng('A6:A').setNumberFormat(dateFormat);
    getSht(SHT.PROFILE).getRng('I17:J').setNumberFormat(dateFormat);
    getSht(SHT.ITEMS).getRng('AD4:AD').setNumberFormat(dateFormat);
    getSht(SHT.HISTORY).getRng('B10:B').setNumberFormat(dateFormat);
  }

  changeMeassurement(isNewMeasurementMetric){
    let isMeasurementMetricRng = getRng(RNG.IS_MEASUREMENT_METRIC);
    let isMeasurementMetric = isMeasurementMetricRng.getValue();

    if(isNewMeasurementMetric != isMeasurementMetric){
      let calcHeightRng = getSht(SHT.PROFILE).getRng('D20:F20');
      let calcWeightRng = getSht(SHT.PROFILE).getRng('D22');
      let weigthRng = getSht(SHT.PROFILE).getRng('K17:K');

      let newWeightFormat = isNewMeasurementMetric ? '0.00" kg"' : '0.00" lb"';
      let newWeights = weigthRng.getColAsArray().map(w => [this.convertKgAndLb(isNewMeasurementMetric, w)]);
      weigthRng.setValues(newWeights);
      weigthRng.setNumberFormat(newWeightFormat);

      calcWeightRng.setValue(this.convertKgAndLb(isNewMeasurementMetric, calcWeightRng.getValue()));
      calcWeightRng.setNumberFormat(newWeightFormat);

      calcHeightRng.setValue(this.convertCmAndInch(isNewMeasurementMetric, calcHeightRng.getValue()));
      calcHeightRng.setNumberFormat(isNewMeasurementMetric ? '0" cm"' : '0" in"');

      isMeasurementMetricRng.setValue(isNewMeasurementMetric);
    }
  }

  changeCurrency(currency){
    let decimals = ['Ft', '¥'].includes(currency)? '' : '.00';
    let signInFront = !['Ft','zł','lei'].includes(currency);
    let unit = getSht(SHT.TEXTS).getRng('B29').getValue();

    let currencyFormat = (signInFront ? currency : '') + '#,##0' + decimals + (!signInFront ? currency : '');
    let currencyPerUnitFormat = currencyFormat + '" / ' + unit + '"';
    getRng(RNG.CURRENCY_FORMAT).setValue(currencyFormat);
    this.daySht.getRng('R6:R12').setNumberFormat(currencyFormat);
    this.daySht.getRng('R17:R106').setNumberFormat(currencyFormat);
    this.newItemSht.getRng('C17').setNumberFormat(currencyFormat);
    this.newItemSht.getRng('D17').setNumberFormat(currencyPerUnitFormat);
    this.recipeCalculatorSht.getRng('Q4:Q30').setNumberFormat(currencyFormat);
    this.profileSht.getRng('C14:P14').setNumberFormat(currencyFormat);
    this.itemsSht.getRng('Z4:AA').setNumberFormat(currencyFormat);
    this.historySht.getRng('P4:P').setNumberFormat(currencyFormat);
  }

  convertKgAndLb(isNewMeasurementMetric, weight){
    if(!weight) return null; 
    if(isNewMeasurementMetric) {
        return (weight / 2.205).toFixed(2);
    } else {
        return (weight * 2.205).toFixed(2);
    }
  }

  convertCmAndInch(isNewMeasurementMetric, height){
    if(isNewMeasurementMetric) {
        return (height * 2.54).toFixed(2);
    } else {
        return (height / 2.54).toFixed(2);
    }
  }
}
