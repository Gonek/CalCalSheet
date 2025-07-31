class HistoryTest extends TestBase {

    beforeAll(){
        super.beforeAll();
        this.sht = getSht(SHT.HISTORY);
        this.intervalRng = getRng(RNG.HISTORY_INTERVAL);
    }

    clearData(){
        this.sht.clearContent('B10:S');
    }

    afterAll(){
        super.afterAll();
        this.intervalRng.setValue('Last 7 days');
    }


    shouldHistorySheetStatisticsHaveCorrectFormula(){
        //GIVEN
        let expectedAverage = Array.from({length:14},(v,colI)=> {
              let col = testData.incCol('C', colI);
              return `=IFERROR(AVERAGE(OFFSET($${col}$10:$${col},MAX(0,COUNT($${col}$10:$${col})-$A$3),0,$A$3,1)),0)`;
            });
        let expectedSum = Array.from({length:12},(v,colI)=> {
              let col = testData.incCol('C', colI);
              return `=SUM(OFFSET($${col}$10:$${col},MAX(0,COUNT($${col}$10:$${col})-$A$3),0,$A$3,1))`;
            });
        let expectedMax = Array.from({length:14},(v,colI)=> {
              let col = testData.incCol('C', colI);
              return `=MAX(OFFSET($${col}$10:$${col},MAX(0,COUNT($${col}$10:$${col})-$A$3),0,$A$3,1))`;
            });
        let expectedMin = Array.from({length:14},(v,colI)=> {
              let col = testData.incCol('C', colI);
              return `=MIN(OFFSET($${col}$10:$${col},MAX(0,COUNT($${col}$10:$${col})-$A$3),0,$A$3,1))`;
            });
        //WHEN
        let resultAverage = this.sht.getFormulas('C4:P4');
        let resultSum = this.sht.getFormulas('C5:N5');
        let resultMax = this.sht.getFormulas('C6:P6');
        let resultMin = this.sht.getFormulas('C7:P7');
        //THEN
        assertEquals(resultAverage, expectedAverage);
        assertEquals(resultSum, expectedSum);
        assertEquals(resultMax, expectedMax);
        assertEquals(resultMin, expectedMin);
    }

    shouldHistorySheetBackgroundCalculationsHaveCorrectFormula(){
        //GIVEN 
        let expected = '=IFS(B3=Texts!B553, 7, B3=Texts!B554, 30, B3=Texts!B555, 90, B3=Texts!B556, 99999)';
        //WHEN
        let result = this.sht.getFormula('A3');
        //THEN
        assertEquals(result, expected);
    }

    shouldHistorySheetStatisticsHaveCorrectFormat(){
        //GIVEN
        let expected = ['0 kcal', '0 kcal', '0 kcal', '0 g', '0 g', '0 g', '0 g', '0 g', '0 g', '0 g', '0 g', '0 mg', '0.00', '£0.00'];
        //WHEN
        let resultAverage = this.sht.getDisplayValues('C4:P4');
        let resultSum = this.sht.getDisplayValues('C5:N5');
        let resultMax = this.sht.getDisplayValues('C6:P6');
        let resultMin = this.sht.getDisplayValues('C7:P7');
        //THEN
        assertEquals(resultAverage, expected);
        assertEquals(resultSum, expected.slice(0, 12));
        assertEquals(resultMax, expected);
        assertEquals(resultMin, expected);
    }

    shouldHistorySheetDaysHaveCorrectFormat(){
        //GIVEN
        let days = [['01/01/2024', 1000, 600, 400, 15, 20, 25, 30, 35, 40, 45, 50, 55, 10.15, 60, '✔️', '❌', '✔️']];
        let expected = ['01/01/2024', '1,000 kcal', '600 kcal', '400 kcal', '15 g', '20 g', '25 g', '30 g', '35 g', '40 g', '45 g', '50 g', '55 mg', '10.15', '£60.00', '✔️', '❌', '✔️']
        //WHEN
        this.sht.putDataAtEnd(days);
        let result = this.sht.getDisplayValues('B10:S10');
        //THEN
        assertEquals(result, expected);
    }

    shouldHistorySheetCalculateCorrectSummaryInCaseOfLast7DaysSeleceted() {
        //GIVEN
        testData.addTestHistory();
        let expectedSummary = [
          [97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110],
          [679, 686, 693, 700, 707, 714, 721, 728, 735, 742, 749, 756, '-------', 770],
          [100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113],
          [94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107]
        ]
        //WHEN
        this.intervalRng.setValue('Last 7 days');
        let result = this.sht.getValues('C4:P7');
        //THEN
        assertEquals(result, expectedSummary);
    }

    shouldHistorySheetCalculateCorrectSummaryInCaseOfLast30DaysSeleceted() {
        //GIVEN
        testData.addTestHistory();
        let expectedSummary = [
          [85.5, 86.5, 87.5, 88.5, 89.5, 90.5, 91.5, 92.5, 93.5, 94.5, 95.5, 96.5, 97.5, 98.5],
          [2565, 2595, 2625, 2655, 2685, 2715, 2745, 2775, 2805, 2835, 2865, 2895, '-------', 2955],
          [100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113],
          [71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84]
        ]
        //WHEN
        this.intervalRng.setValue('Last 30 days');
        let result = this.sht.getValues('C4:P7');
        //THEN
        assertEquals(result, expectedSummary);
    }

    shouldHistorySheetCalculateCorrectSummaryInCaseOfLast90DaysSeleceted() {
        //GIVEN
        testData.addTestHistory();
        let expectedSummary = [
          [55.5, 56.5, 57.5, 58.5, 59.5, 60.5, 61.5, 62.5, 63.5, 64.5, 65.5, 66.5, 67.5, 68.5],
          [4995, 5085, 5175, 5265, 5355, 5445, 5535, 5625, 5715, 5805, 5895, 5985, '-------', 6165],
          [100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113],
          [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
        ]
        //WHEN
        this.intervalRng.setValue('Last 90 days');
        let result = this.sht.getValues('C4:P7');
        //THEN
        assertEquals(result, expectedSummary);
    }

    shouldHistorySheetCalculateCorrectSummaryInCaseOfOverallSeleceted() {
        //GIVEN
        testData.addTestHistory();
        let expectedSummary = [
          [50.5, 51.5, 52.5, 53.5, 54.5, 55.5, 56.5, 57.5, 58.5, 59.5, 60.5, 61.5, 62.5, 63.5],
          [5050, 5150, 5250, 5350, 5450, 5550, 5650, 5750, 5850, 5950, 6050, 6150, '-------', 6350],
          [100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113],
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
        ]
        //WHEN
        this.intervalRng.setValue('Overall');
        let result = this.sht.getValues('C4:P7');
        //THEN
        assertEquals(result, expectedSummary);
    }

    shouldThrowExceptionIfInvalidTimePeriodSeleceted(){
        // GIVEN WHEN THEN
        assertException(() => {
          this.intervalRng.setValue('Non existing period');
        }, true);
        // RESET
        this.intervalRng.setValue('Last 7 days');
    }
}

var runHistoryTests = () => new HistoryTest().runAllTests();
