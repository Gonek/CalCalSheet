class AcceptanceTestBuilder{
    constructor(owner, receiver){
        this.owner = owner;
        this.receiver = receiver;
    }

    /**
     * Return given steps
     * @returns {Step} given steps
     */
    given(){
        console.info("| Given:");
        return this.owner.givenSteps;
    }

    /**
     * Return when steps
     * @returns {Step} when steps
     */
    when(){
        console.info("| When:");
        return this.owner.whenSteps;
    }

    /**
     * Return then steps
     * @returns {Step} then steps
     */
    then(){
        console.info("| Then:");
        return this.owner.thenSteps;
    }

    /**
     * Chain muliple step together
     * @returns {Step} steps
     */
    and(){
        return this.receiver;
    }
}