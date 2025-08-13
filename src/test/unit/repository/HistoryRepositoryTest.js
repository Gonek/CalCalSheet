class HistoryRepositoryTest extends TestBase {
    beforeAll(){
        super.beforeAll();
        this.historySht = mockSht(SHT.HISTORY);
        this.selectedHistoryDayRng = mockRng(RNG.SELECETED_HISTORY_DAY);
        this.historyRepository = new HistoryRepository();
    }

    shouldAddOrUpdateAddHistoryIfSelectedDayZero(){
        // GIVEN
        var history = new History('01/01/2025', [2000, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 2500, 85.5, ['✔️', '❌', '✔️']);
        when(this.selectedHistoryDayRng).getValue().thenReturn(0);
        when(this.historySht).getLastRow().thenReturn(9);
        // WHEN
        this.historyRepository.addOrUpdate(history);
        // THEN
        verify(this.historySht).appendRow(['', '01/01/2025', 2000, 2500, '=IFERROR(D10-C10)', 10, 11, 12, 13, 14, 15, 16, 17, 18, 85.5, '19.00', '✔️', '❌', '✔️']).calledOnce();
        verify(this.historySht).sort(2).calledOnce();
    }

    shouldAddOrUpdateUpdateHistoryIfSelectedDayNotZero(){
        // GIVEN
        var history = new History('01/01/2025', [2000, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 2500, 85.5, ['✔️', '❌', '✔️']);
        when(this.selectedHistoryDayRng).getValue().thenReturn(10);
        // WHEN
        this.historyRepository.addOrUpdate(history);
        // THEN
        verify(this.historySht).setAreaValue(19, 1, 1, 19, [['', '01/01/2025', 2000, 2500, '=IFERROR(D19-C19)', 10, 11, 12, 13, 14, 15, 16, 17, 18, 85.5, '19.00', '✔️', '❌', '✔️']]).calledOnce();
    }

    shouldAddAddHistoryToTheEndOfTheHistorySheet(){
        // GIVEN
        var history = new History('01/01/2025', [2000, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 2500, 85.5, ['✔️', '❌', '✔️']);
        when(this.historySht).getLastRow().thenReturn(9);
        // WHEN
        this.historyRepository.add(history);
        // THEN
        verify(this.historySht).appendRow(['', '01/01/2025', 2000, 2500, '=IFERROR(D10-C10)', 10, 11, 12, 13, 14, 15, 16, 17, 18, 85.5, '19.00', '✔️', '❌', '✔️']).calledOnce();
        verify(this.historySht).sort(2).calledOnce();
    }

    shouldUpdateUpdateTheExistingHistoryField(){
        // GIVEN
        var history = new History('01/01/2025', [2000, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 2500, 85.5, ['✔️', '❌', '✔️']);
        // WHEN
        this.historyRepository.update(history, 10);
        // THEN
        verify(this.historySht).setAreaValue(19, 1, 1, 19, [['', '01/01/2025', 2000, 2500, '=IFERROR(D19-C19)', 10, 11, 12, 13, 14, 15, 16, 17, 18,  85.5, '19.00', '✔️', '❌', '✔️']]).calledOnce();
    }
}

var runHistoryRepositoryTests = () => new HistoryRepositoryTest().runAllTests();