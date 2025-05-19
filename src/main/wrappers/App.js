class App {

  constructor(){
    this.name = 'App';
    this.app = SpreadsheetApp;
  }

  getActiveSpSh(){
    return this.app.getActiveSpreadsheet();
  }

  openById(id){
    return this.app.openById(id);
  }

  flush(){
    this.app.flush();
  }
}
