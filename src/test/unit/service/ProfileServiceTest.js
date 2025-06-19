class ProfileServiceTest extends TestBase {
    beforeAll(){
        super.beforeAll();
        this.macroProfileRng = mockRng(RNG.MACRO_PROFILES);
        this.calculatorCaloriesRng = mockRng(RNG.CALCULATOR_CALORIES);
        this.profileService = new ProfileService();
    }

    shouldCopyCaloriesCopyCaloriesFromTheCalculatorToTheSelectedProfile(){
        // GIVEN
        when(this.calculatorCaloriesRng).getValue(1,4).thenReturn(5);
        when(this.calculatorCaloriesRng).getValue(1,1).thenReturn(1000);
        when(this.calculatorCaloriesRng).getValue(2,1).thenReturn(2000);
        // WHEN
        this.profileService.copyCalories();
        // THEN
        verify(this.macroProfileRng).setValue(1000,2,5).calledOnce();
        verify(this.macroProfileRng).setValue(2000,2,6).calledOnce();
    }

    shouldNextMacroProfileNameReturnSelectedProfileNameOnNextPosition(){
        // GIVEN
        when(this.macroProfileRng).getValue(0,3).thenReturn('NextProfileName');
        // WHEN
        let result = this.profileService.getNextMacroProfileName(2);
        // THEN
        assertEquals(result, 'NextProfileName');
    }

    shouldNextMacroProfileNameReturnSelectedProfileNameFirstPositionWhenProfileIndexIsSeven(){
        // GIVEN
        when(this.macroProfileRng).getValue(0,1).thenReturn('FirstProfileName');
        // WHEN
        let result = this.profileService.getNextMacroProfileName(7);
        // THEN
        assertEquals(result, 'FirstProfileName');
    }
}

var runProfileServiceTests = () => new ProfileServiceTest().runAllTests();