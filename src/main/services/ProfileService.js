class ProfileService {

  constructor(){
    this.macroProfilesRng = getRng(RNG.MACRO_PROFILES);
  }

  copyCalories(){
    let caloriesRng = getRng(RNG.CALCULATOR_CALORIES);
    let profilePos = caloriesRng.getValue(1, 4);
    let calMin = caloriesRng.getValue(1, 1);
    let calMax = caloriesRng.getValue(2, 1);
    this.macroProfilesRng.setValue(calMin, 2, profilePos);
    this.macroProfilesRng.setValue(calMax, 2, profilePos+1);
  }

  getNextMacroProfileName(profileIndex){
    profileIndex++;
    if(profileIndex == 8) 
      profileIndex = 1;
    return this.macroProfilesRng.getValue(0, profileIndex);
  }
}