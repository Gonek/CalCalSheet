var testSheet

class TestSheet{
    constructor(){
        this.testSheet = SpreadsheetApp.getActive().getSheetByName('Test');
        if(!this.resume()){
            this.createTestSheet();
        }
    }

    createTestSheet(){
        console.log('Create test sheet');
        if(!this.testSheet) this.testSheet = SpreadsheetApp.getActive().insertSheet('Test');
        this.testSheet.setHiddenGridlines(true);
        this.testSheet.clear();
        this.testSheet.setColumnWidth(1, 40);
        this.testSheet.setColumnWidth(2, 120);
        this.testSheet.setColumnWidth(3, 530);
        this.testSheet.setColumnWidth(4, 50);
        this.testSheet.setColumnWidth(5, 40);
        if(this.testSheet.getMaxColumns()>6){
            this.testSheet.deleteColumns(6, 21);
        }
        this.testSheet.setRowHeight(1, 50);
        this.testSheet.getRange('A1').setFontColor('white');
        let nameRange = this.testSheet.getRange('B1:D1');
        nameRange.merge();
        this.setFont(nameRange, 24, 'Arial', 'bold', 'center');
        nameRange.setValue('Tests');
        let statusHeaderRange = this.testSheet.getRange('B3');
        statusHeaderRange.setValue('Status:');
        this.setFont(statusHeaderRange, null, null, 'Bold');
        this.testSheet.getRange('B5:C1000').mergeAcross();
        let resultsHeaderRange = this.testSheet.getRange('B5');
        resultsHeaderRange.setValue('Test results');
        this.setFont(resultsHeaderRange, 12, null, 'bold');
        this.setFont(this.testSheet.getRange('B6:D'), 10, 'Calibri', 'normal');
        console.log('Test sheet created');
    }

    saveProgress(){
        let dataJson = JSON.stringify(testData);
        this.testSheet.getRange('A1').setValue(dataJson);
    }

    resume(){
        let rawData = this.testSheet.getRange('A1').getValue();
        if(rawData){
            console.log('Test sheet with test in progress found! Countinue execution');
            testData.load(JSON.parse(rawData));
            return true;
        }
        return false;
    }

    setStatus(value){
        this.testSheet.getRange('C3').setValue(value);
    }

    start(){
        this.setStatus('Test in progress');
    }

    timeOut(){
        this.setStatus('Test timed out, please execute the same test runner again to countinue!');
    }

    finished(){
        this.testSheet.getRange('A1').setValue('');
        this.setStatus('Test finished');
    }

    printUpdate(update, isTestName){
        if(isTestName){
            this.testSheet.appendRow(['', update]);
            this.setFont(this.getLastRowRange(), null, null, 'bold');
        }else{
            this.testSheet.appendRow(['', '  ']);
            this.testSheet.appendRow(['', update]);
            this.setFont(this.getLastRowRange(), 12, null, 'bold', 'Center');
        }
    }

    printTestNameAndResult(testName, result){
        let status;
        switch(result){
            case STATUS.SUCCESS : status = '✔️'; break;
            case STATUS.FAIL : status = '⚠️'; break;
            case STATUS.ERROR : status = '❌'; break;
        }
        this.testSheet.appendRow(['', ` - ${testName}`, '', status]);
    }

    printSummary(testData){
        let lr = this.testSheet.getLastRow();
        let summaryHeaderRange = this.testSheet.getRange(`B${lr+2}:D${lr+3}`);
        let summaryRange = this.testSheet.getRange(`B${lr+5}:C${lr+12}`);
        let testGroupRange = this.testSheet.getRange(`B${lr+6}:C${lr+9}`);
        summaryRange.clear();
        summaryHeaderRange.setBorder(true, false, false, false, false, false);
        this.setFont(summaryHeaderRange, 12, 'Arial', 'bold');
        this.setFont(summaryRange, 11, 'Calibri', 'bold', 'left');
        this.setFont(testGroupRange, null, null, 'normal');
        let results = [[' Test Run: ', testData.tests],
                       ['   🟢 Succeded:', testData.tests - testData.fails - testData.errors],
                       ['   🟡 Failed:', testData.fails],
                       ['   🔴 Errored:', testData.errors],
                       ['', ''],
                       [' Test took:', `${testData.durration} ms ⏱️ ( ${testData.getTime().getMinutes()} min and ${testData.getTime().getSeconds()} sec )`],
                       ['', ''],
                       ['TEST RESULT:', testData.fails + testData.errors ? '❌ FAILURE' : '✔️ SUCCESS']];
        summaryHeaderRange.setValues([['', '', ''],['Test summary: ', '', '']]);
        summaryRange.setValues(results);
    }

    setFont(range, size = null, family = null, weight = null, hAligment = null){
        if(size) range.setFontSize(size);
        if(family) range.setFontFamily(family);
        if(weight) range.setFontWeight(weight);
        if(hAligment) range.setHorizontalAlignment(hAligment);
    }

    getLastRowRange(){
        let lr = this.testSheet.getLastRow();
        return this.testSheet.getRange(`B${lr}:D${lr}`);
    }
}