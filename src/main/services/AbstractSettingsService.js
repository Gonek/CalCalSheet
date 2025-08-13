/**
 * Abstract Class AbstractSettingsService.
 *
 * @class AbstractSettingsService
 */
class AbstractSettingsService {
  constructor(){
    if (this.constructor == AbstractSettingsService) {
      throw new Error("Abstract classes can't be instantiated.");
    }

    this.settingsSpr = new Spr(SETTINGS);
  }

  apply() {
    this.showSettingWaitMessage();
    this.process();
    this.hideSettingWaitMessage();
  }

  process(){}

  showSettingWaitMessage() {
    this.settingsSpr.showRows(23, 2);
  }

  hideSettingWaitMessage() {
    this.settingsSpr.hideRows(23, 2);
  }

}
