// INTERFACE

var copyCalories = () => profileService().copyCalories();

// CLASS

class ProfileService {

  generateDays(){
    var generatedDaysRng = new Rng(RNG_GENERATED_DAYS); 
    var days = new Rng(RNG_DAYS_TO_GENERATE).getValue();
    var tempsheetSpr = new Spr(DAY_BASE);
    var date = getToday();
    date.setDate(date.getDate() + 1);
    generatedDaysRng.clear();
    for(var i = 1; i <= days; i++){
      date.setDate(date.getDate() + 1);
      var dateName = Utilities.formatDate(date, 'GMT', 'yyyy-MM-dd');
      ACTIVE.insertSheet(dateName, 1, {template: tempsheetSpr.spr});
      new Spr(dateName).setValue('C1', dateName);
      generatedDaysRng.setValue(dateName, i, 1);
    }
  }

  copyCalories(){
    let caloriesRng = new Rng(RNG_CALCULATOR_CALORIES);
    let profilePos = caloriesRng.getValue(1, 4);
    let calMin = caloriesRng.getValue(1, 1);
    let calMax = caloriesRng.getValue(2, 1);
    let macroProfilesRng = new Rng(RNG_MACRO_PROFILES);
    macroProfilesRng.setValue(calMin, 2, profilePos);
    macroProfilesRng.setValue(calMax, 2, profilePos+1);
  }

  getNextMacroProfileName(profileIndex){
    let macroProfilesRng = new Rng(RNG_MACRO_PROFILES);
    profileIndex++;
    if(profileIndex == 8) 
      profileIndex = 1;
    return macroProfilesRng.getValue(0, profileIndex);
  }
}

// SERVICE SINGLETON
var profileServiceSingelton;
/** 
 * Returns the profile service
 * @returns {ProfileService} profile service singleton
 */
var profileService = () => profileServiceSingelton = profileServiceSingelton || new ProfileService();