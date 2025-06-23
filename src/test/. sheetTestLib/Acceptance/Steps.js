class Steps{
    
    /**
     * Constructor for Steps
     * @param {AcceptanceTestBase} owner test for the steps
     */
    constructor(owner){
        this.test = owner;
    }

    /**
     * Simulate a click on the given button
     * @param {String} sht Name of the Sheet where you button located
     * @param {String} rng Name of the range for you button
     */
    clickButton(sht, rng){
        getRng(rng).setValue(true);
        getObj(EventService).testButton(sht, rng);
    }

    /**
     * Simulate a change of value on the given combobox
     * @param {String} sht Name of the Sheet where you button located
     * @param {String} rng Name of the range for you button
     * @param {Obj} value New value for the Cbox
     */
    changeCbox(sht, rng, value){
        getRng(rng).setValue(value);
        getObj(EventService).testButton(sht, rng);
    }

    /**
     * Simulate a change of value on the given combobox
     * @param {String} sht Name of the Sheet where you button located
     * @param {String} rng Name of the range for you button
     * @param {Integer} to Index in the validation criteria range for the combo box
     */
    changeCboxToIndex(sht, rng, to){
        let r = getRng(rng);
        let values = r.getValidationCriteriaRangeValues();
        r.setValue(values[to]);
        getObj(EventService).testButton(sht, rng);
    }

    /**
     * Simulate an onOpen Event
     */
    onOpen(){
        getObj(EventService).onOpen();
    }
}