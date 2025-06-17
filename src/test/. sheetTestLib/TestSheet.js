class TestSheet{
    constructor(){
        this.testSheet;
    }

    createTestSheet(){
        this.testSheet = SpreadsheetApp.getActive().getSheetByName('Test');
        if(!this.testSheet) this.testSheet = SpreadsheetApp.create('Test', 30, 5);
        this.testSheet.clear();
        this.testSheet.setColumnWidth(1, 40);
        this.testSheet.setColumnWidth(2, 350);
        this.testSheet.setColumnWidth(3, 350);
        this.testSheet.setColumnWidth(4, 100);
        this.testSheet.setColumnWidth(5, 40);
        this.testSheet.setRowHeight(1, 50);
        let nameRange = testSheet.getRange('A1:C1');
        nameRange.merge();
        nameRange.setValue('Tests');
        this.testSheet.getRange('B3').setValue('Status');
        this.testSheet.getRange('B5').setValue('Test results');
        this.clearTestResults();
    }

    clearTestResults(){
        this.setStatus('');
        this.testSheet.getRange('B6:D').clear();
    }

    setStatus(value){
        this.testSheet.getRange('C3').setValue(value);
    }

    printTestType(type){
        this.testSheet.appendRow('', type);
    }

    printTestClass(tClass){
        this.testSheet.appendRow('', tClass);
    }

    printTestNameAndResult(testName, result){
        this.testSheet.appendRow('', testName, result);
    }

    printSummary(){

    }
}

createTestSheet = () => new TestSheet().createTestSheet();