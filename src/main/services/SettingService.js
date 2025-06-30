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

  applyGeneralSettings(generalSettings){
    let profileRngList = this.profileSht.getRngList(['C5:P5', 'C8:P8', 'C12:P12']);
    if(generalSettings[6]){
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

  changeCheckBox(generalSettings){
    var consumedCbx = generalSettings[3];
    this.daySht.switchCols(consumedCbx, 2);
  }

  changeNoom(generalSettings){
    var noom = generalSettings[4];
    this.daySht.switchCols(noom, 18, 3);
    this.daySht.setValue('V4', noom ? 'Noom' : '');
    this.newItemSht.switchRows(noom, 21, 2);
    this.recipeCalculatorSht.switchRows(noom, 36, 2);
    this.itemsSht.switchCols(noom, 26);
    this.historySht.switchCols(noom, 19);
  }

  changeMeals(meals){
    meals.forEach((meal, i) => {
      var startPos = ((i + 1) * ROWS_PER_MEAL);
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
      this.daySht.setPosValue(4 + i, 7, meal[0]);
      this.daysSht.setPosValue(3, (i*2) + 2, meal[0]);
    })
  }

  changeLocalisation(){
    let localisationRng = getRng(RNG.LOCALISATION);
    let localisationData = localisationRng.getColAsArray();
    let language = localisationData[0];
    let timeZone = localisationData[1];
    let dateFormat = localisationData[2];
    let measurement = localisationData[3];
    let measurements = localisationRng.getValidationCriteriaRangeValues(4);

    getRng(RNG.LANGUAGE).setValue(language);
    this.changeLanguage(language);
    getRng(RNG.TODAY).setValue(`=ROUNDDOWN(NOW() +${timeZone}/24)`);
    this.changeDateFormat(dateFormat);
    this.changeMeassurement(measurement == measurements[0]);
  }

  changeLanguage(language = undefined){
    let prevLangRng = getRng(RNG.PREVIOUS_LANGUAGE);
    if(!language){
      language = getRng(RNG.LANGUAGE).getValue();
    }
    if(prevLangRng.getValue() == language) return;

    let sheets = getRng(RNG.SHEETS).getValues();
    let notes = getRng(RNG.NOTES).getValues();
    let activeSpsh = getSpSh(SPSH.ACTIVE);
    let tutorialSht = getSht(SHT.TUTORIAL);

    sheets.forEach(s => {
      activeSpsh.getShtById(s[0]).setName(s[1]);
    });

    getObj(App).flush();

    notes.forEach(n => {
      tutorialSht.getRng(n[0]).setNote(n[1]);
    });

    prevLangRng.setValue(language);
  }

  changeDateFormat(dateFormat){
    getSht(SHT.DAYS).getRng('A19:A').setNumberFormat(dateFormat);
    getSht(SHT.PROFILE).getRng('I16:J').setNumberFormat(dateFormat);
    getSht(SHT.ITEMS).getRng('AB4:AB').setNumberFormat(dateFormat);
    getSht(SHT.HISTORY).getRng('B10:B').setNumberFormat(dateFormat);
  }

  changeMeassurement(isNewMeasurementMetric){
    let isMeasurementMetricRng = getRng(RNG.IS_MEASUREMENT_METRIC);
    let isMeasurementMetric = isMeasurementMetricRng.getValue();

    if(isNewMeasurementMetric != isMeasurementMetric){
      let calcHeightRng = getSht(SHT.PROFILE).getRng('D19:F19');
      let calcWeightRng = getSht(SHT.PROFILE).getRng('D21');
      let weigthRng = getSht(SHT.PROFILE).getRng('K16:K');

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

  convertKgAndLb(isNewMeasurementMetric, weight){
    if(!weight) return null; 
    if(isNewMeasurementMetric) {
        return weight / 2.205;
    } else {
        return weight * 2.205;
    }
  }

  convertCmAndInch(isNewMeasurementMetric, height){
    if(isNewMeasurementMetric) {
        return height * 2.54;
    } else {
        return height / 2.54;
    }
  }
}
