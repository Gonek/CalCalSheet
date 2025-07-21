class DayRepositoryTest extends TestBase {
    beforeAll(){
        super.beforeAll();
        this.daysSht = mockSht(SHT.DAYS);
        this.prevDayIndexRng = mockRng(RNG.DAY_PREV_DAY_INDEX);
        this.deleteDaysUntilRng = mockRng(RNG.DELETE_DAYS_UNTIL);
        this.deleteDaysFromRng = mockRng(RNG.DELETE_DAYS_FROM);
        this.firstEmptyDayIndexRng = mockRng(RNG.FIRST_EMPTY_DAY_INDEX);
        this.defaultDayRng = mockRng(RNG.DEFAULT_DAY);
        this.createDaysFromRng = mockRng(RNG.CREATE_DAYS_FROM);
        this.createDaysRng = mockRng(RNG.CREATE_DAYS);

        this.dayRepository = new DayRepository();
    }

    shouldSaveSaveDayToPosition(){
        // GIVEN
        var day = new Day(Array.from({length:90},(v,k)=>[`Item ${k}`, '', k]));
        when(this.prevDayIndexRng).getValue().thenReturn(10);
        // WHEN
        var result = this.dayRepository.saveAs(day);
        // THEN
        verify(this.daysSht).setAreaValueAtPos(13, 2, [['Item 0', 0, 'Item 15', 15, 'Item 30', 30, 'Item 45', 45, 'Item 60', 60, 'Item 75', 75], 
                                                       ['Item 1', 1, 'Item 16', 16, 'Item 31', 31, 'Item 46', 46, 'Item 61', 61, 'Item 76', 76], 
                                                       ['Item 2', 2, 'Item 17', 17, 'Item 32', 32, 'Item 47', 47, 'Item 62', 62, 'Item 77', 77], 
                                                       ['Item 3', 3, 'Item 18', 18, 'Item 33', 33, 'Item 48', 48, 'Item 63', 63, 'Item 78', 78], 
                                                       ['Item 4', 4, 'Item 19', 19, 'Item 34', 34, 'Item 49', 49, 'Item 64', 64, 'Item 79', 79], 
                                                       ['Item 5', 5, 'Item 20', 20, 'Item 35', 35, 'Item 50', 50, 'Item 65', 65, 'Item 80', 80], 
                                                       ['Item 6', 6, 'Item 21', 21, 'Item 36', 36, 'Item 51', 51, 'Item 66', 66, 'Item 81', 81], 
                                                       ['Item 7', 7, 'Item 22', 22, 'Item 37', 37, 'Item 52', 52, 'Item 67', 67, 'Item 82', 82], 
                                                       ['Item 8', 8, 'Item 23', 23, 'Item 38', 38, 'Item 53', 53, 'Item 68', 68, 'Item 83', 83], 
                                                       ['Item 9', 9, 'Item 24', 24, 'Item 39', 39, 'Item 54', 54, 'Item 69', 69, 'Item 84', 84],
                                                       ['Item 10', 10, 'Item 25', 25,'Item 40', 40, 'Item 55', 55, 'Item 70', 70, 'Item 85', 85], 
                                                       ['Item 11', 11, 'Item 26', 26, 'Item 41', 41, 'Item 56', 56, 'Item 71', 71, 'Item 86', 86], 
                                                       ['Item 12', 12, 'Item 27', 27, 'Item 42', 42, 'Item 57', 57, 'Item 72', 72, 'Item 87', 87], 
                                                       ['Item 13', 13, 'Item 28', 28, 'Item 43', 43, 'Item 58', 58, 'Item 73', 73, 'Item 88', 88], 
                                                       ['Item 14', 14, 'Item 29', 29, 'Item 44', 44, 'Item 59', 59, 'Item 74', 74, 'Item 89', 89]]).calledOnce();
        assertEquals(result, true);
    }

    shouldDeletePastDaysDeleteRowsTillDeleteDaysUntil(){
        // GIVEN
        when(this.deleteDaysUntilRng).getValue().thenReturn(40);
        // WHEN
        this.dayRepository.deletePastDays();
        // THEN
        verify(this.daysSht).deleteRows(19,41).calledOnce();
    }

    shouldDeletePastDaysNotDeleteRowsIfDeleteDaysUntilIsZero(){
        // GIVEN
        when(this.deleteDaysUntilRng).getValue().thenReturn(0);
        // WHEN
        this.dayRepository.deletePastDays();
        // THEN
        verify(this.daysSht).deleteRows(any()).neverCalled();
    }

    shouldDeleteFutureDaysDeleteRowsFormDeleteDaysFromTillFirstEmpty(){
        // GIVEN
        when(this.deleteDaysFromRng).getValue().thenReturn(40);
        when(this.firstEmptyDayIndexRng).getValue().thenReturn(80);
        // WHEN
        this.dayRepository.deleteFutureDays();
        // THEN
        verify(this.daysSht).deleteRows(40,80).calledOnce();
    }

    shouldDeleteFutureDaysNotDeleteRowsIfDeleteDaysFromIsZero(){
        // GIVEN
        when(this.deleteDaysFromRng).getValue().thenReturn(0);
        when(this.firstEmptyDayIndexRng).getValue().thenReturn(80);
        // WHEN
        this.dayRepository.deleteFutureDays();
        // THEN
        verify(this.daysSht).deleteRows(any()).neverCalled();
    }
    
    shouldCopyDefaultForFutureDays(){
        // GIVEN
        when(this.createDaysFromRng).getValue().thenReturn('01/01/2025');
        when(this.createDaysRng).getValue().thenReturn(2);
        when(this.firstEmptyDayIndexRng).getValue().thenReturn(100);
        var rng1 = {toString() { return 'rng1'}};
        var rng2 = {toString() { return 'rng2'}};
        when(this.daysSht).getRng('A100:N115').thenReturn(rng1);
        when(this.daysSht).getRng('A115:N130').thenReturn(rng2);
        // WHEN
        this.dayRepository.copyDefaultForFutureDays();
        // THEN
        verify(this.defaultDayRng).copyTo(rng1).calledOnce();
        verify(this.daysSht).setPosValue(100, 1, new Date('01/01/2025')).calledOnce();
        verify(this.defaultDayRng).copyTo(rng2).calledOnce();
        verify(this.daysSht).setPosValue(115, 1, new Date('01/02/2025')).calledOnce();
    }

    shouldCopyMeals(){
        // GIVEN
        var mealsMaps = new Map();
        mealsMaps.set(2,[['Item 1', 10]]);
        mealsMaps.set(4,[['Item 2', 20]]);
        var copyToRows = [15,30];
        // WHEN
        this.dayRepository.copyMeals(mealsMaps, copyToRows);
        // THEN
        verify(this.daysSht).setAreaValue(15, 4, 15, 2, [['Item 1', 10]]).calledOnce();
        verify(this.daysSht).setAreaValue(30, 4, 15, 2, [['Item 1', 10]]).calledOnce();
        verify(this.daysSht).setAreaValue(15, 8, 15, 2, [['Item 2', 20]]).calledOnce();
        verify(this.daysSht).setAreaValue(30, 8, 15, 2, [['Item 2', 20]]).calledOnce();
    }
}

var runDayRepositoryTests = () => new DayRepositoryTest().runAllTests();