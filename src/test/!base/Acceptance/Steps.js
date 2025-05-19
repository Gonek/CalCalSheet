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
     * @param {String} spr Name of the Sheet where you button located
     * @param {String} rng Name of the range for you button
     */
    clickButton(spr, rng){
        getRng(rng).setValue(true);
        getObj(EventService).testButton(spr, rng);
    }
}