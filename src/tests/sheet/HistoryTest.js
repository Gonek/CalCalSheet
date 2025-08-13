class HistoryTest extends TestBase {

  constructor(){
    super();
    this.spr = new Spr(HISTORY);
    this.intervalRng = new Rng(RNG_HISTORY_INTERVAL);
  }

  clearData(){
    this.spr.clear('B10:S');
  }

  afterAll(){
    super.afterAll();
    this.intervalRng.setValue('Last 7 days');
  }


  shouldHistorySheetStatisticsHaveCorrectFormula(){
    //GIVEN
    let expectedAverage = Array.from({length:13},(v,colI)=> {
          let col = this.utils.incCol('C', colI);
          return `=IFERROR(AVERAGE(OFFSET($${col}$10:$${col},MAX(0,COUNT($${col}$10:$${col})-$A$3),0,$A$3,1)),0)`
        });
    let expectedSum = Array.from({length:12},(v,colI)=> {
          let col = this.utils.incCol('C', colI);
          return `=SUM(OFFSET($${col}$10:$${col},MAX(0,COUNT($${col}$10:$${col})-$A$3),0,$A$3,1))`
        });
    let expectedMax = Array.from({length:13},(v,colI)=> {
          let col = this.utils.incCol('C', colI);
          return `=MAX(OFFSET($${col}$10:$${col},MAX(0,COUNT($${col}$10:$${col})-$A$3),0,$A$3,1))`
        });
    let expectedMin = Array.from({length:13},(v,colI)=> {
          let col = this.utils.incCol('C', colI);
          return `=MIN(OFFSET($${col}$10:$${col},MAX(0,COUNT($${col}$10:$${col})-$A$3),0,$A$3,1))`
        });
    //WHEN
    let resultAverage = this.spr.getFormulas('C4:O4');
    let resultSum = this.spr.getFormulas('C5:N5');
    let resultMax = this.spr.getFormulas('C6:O6');
    let resultMin = this.spr.getFormulas('C7:O7');
    //THEN
    this.assertEquals(resultAverage, expectedAverage);
    this.assertEquals(resultSum, expectedSum);
    this.assertEquals(resultMax, expectedMax);
    this.assertEquals(resultMin, expectedMin);
  }

  shouldHistorySheetBackgroundCalculationsHaveCorrectFormula(){
    //GIVEN 
    let expected = '=IFS(B3="Last 7 days", 7, B3="Last 30 days", 30, B3="Last 90 days", 90, B3 = "Overall", 99999)';
    //WHEN
    let result = this.spr.getFormula('A3');
    //THEN
    this.assertEquals(result, expected);
  }

  shouldHistorySheetStatisticsHaveCorrectFormat(){
    //GIVEN
    let expected = ['0 kcal', '0 kcal', '0 kcal', '0 g', '0 g', '0 g', '0 g', '0 g', '0 g', '0 g', '0 g', '0 mg', '0.00'];
    //WHEN
    let resultAverage = this.spr.getDisplayValues('C4:O4');
    let resultSum = this.spr.getDisplayValues('C5:N5');
    let resultMax = this.spr.getDisplayValues('C6:O6');
    let resultMin = this.spr.getDisplayValues('C7:O7');
    //THEN
    this.assertEquals(resultAverage, expected);
    this.assertEquals(resultSum, expected.slice(0, 12));
    this.assertEquals(resultMax, expected);
    this.assertEquals(resultMin, expected);
  }

  shouldHistorySheetDaysHaveCorrectFormat(){
    //GIVEN
    let days = [['01/01/2024', 1000, 600, 400, 15, 20, 25, 30, 35, 40, 45, 50, 55, 10.15, '✔️', '❌', '✔️']];
    let expected = ['01/01/2024', '1,000 kcal', '600 kcal', '400 kcal', '15 g', '20 g', '25 g', '30 g', '35 g', '40 g', '45 g', '50 g', '55 mg', '10.15', '✔️', '❌', '✔️', '']
    //WHEN
    this.spr.putDataAtEnd(days);
    let result = this.spr.getDisplayValues('B10:S10');
    //THEN
    this.assertEquals(result, expected);
  }

  shouldHistorySheetCalculateCorrectSummaryInCaseOfLast7DaysSeleceted() {
    //GIVEN
    this.populateHistory();
    let expectedSummary = [
      [97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109],
      [679, 686, 693, 700, 707, 714, 721, 728, 735, 742, 749, 756, '-------'],
      [100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112],
      [94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106]
    ]
    //WHEN
    this.intervalRng.setValue('Last 7 days');
    let result = this.spr.getValues('C4:O7');
    //THEN
    this.assertEquals(result, expectedSummary);
  }

  shouldHistorySheetCalculateCorrectSummaryInCaseOfLast30DaysSeleceted() {
    //GIVEN
    this.populateHistory();
    let expectedSummary = [
      [85.5, 86.5, 87.5, 88.5, 89.5, 90.5, 91.5, 92.5, 93.5, 94.5, 95.5, 96.5, 97.5],
      [2565, 2595, 2625, 2655, 2685, 2715, 2745, 2775, 2805, 2835, 2865, 2895, '-------'],
      [100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112],
      [71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83]
    ]
    //WHEN
    this.intervalRng.setValue('Last 30 days');
    let result = this.spr.getValues('C4:O7');
    //THEN
    this.assertEquals(result, expectedSummary);
  }

  shouldHistorySheetCalculateCorrectSummaryInCaseOfLast90DaysSeleceted() {
    //GIVEN
    this.populateHistory();
    let expectedSummary = [
      [55.5, 56.5, 57.5, 58.5, 59.5, 60.5, 61.5, 62.5, 63.5, 64.5, 65.5, 66.5, 67.5],
      [4995, 5085, 5175, 5265, 5355, 5445, 5535, 5625, 5715, 5805, 5895, 5985, '-------'],
      [100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112],
      [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
    ]
    //WHEN
    this.intervalRng.setValue('Last 90 days');
    let result = this.spr.getValues('C4:O7');
    //THEN
    this.assertEquals(result, expectedSummary);
  }

  shouldHistorySheetCalculateCorrectSummaryInCaseOfOverallSeleceted() {
    //GIVEN
    this.populateHistory();
    let expectedSummary = [
      [50.5, 51.5, 52.5, 53.5, 54.5, 55.5, 56.5, 57.5, 58.5, 59.5, 60.5, 61.5, 62.5],
      [5050, 5150, 5250, 5350, 5450, 5550, 5650, 5750, 5850, 5950, 6050, 6150, '-------'],
      [100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
    ]
    //WHEN
    this.intervalRng.setValue('Overall');
    let result = this.spr.getValues('C4:O7');
    //THEN
    this.assertEquals(result, expectedSummary);
  }

  shouldThrowExceptionIfInvalidTimePeriodSeleceted(){
    // GIVEN WHEN THEN
    this.assertException(() => {
      this.intervalRng.setValue('Non existing period');
    }, true);
    // RESET
    this.intervalRng.setValue('Last 7 days');
  }

  populateHistory(){
    let days = Array.from({length:100},(v,row)=> 
      Array.from({length:14},(v,col)=> row + col)
    );
    this.spr.putDataAtEnd(days);
  }
}

var runHistoryTests = () => new HistoryTest().runAllTests();
