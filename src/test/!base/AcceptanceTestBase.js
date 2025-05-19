class AcceptanceTestBase extends TestBase{

    constructor(given, when, then){
        super();
        var owner = this;
        const acceptanceHandler = {
            get(target, prop, receiver) {
                return function (...args) {
                    console.info(`|   ${owner.printStep(prop, args)}`);
                    target[prop](...args);
                    return new AcceptanceTestBuilder(owner, receiver);
                }
            }
        }
        this.givenSteps = new Proxy(new given(this), acceptanceHandler);
        this.whenSteps = new Proxy(new when(this), acceptanceHandler);
        this.thenSteps = new Proxy(new then(this), acceptanceHandler);
    }

    
    scenario(description){
        console.info(description);
        return new AcceptanceTestBuilder(this, null);
    }

    printStep(prop, args){
        let step = String(prop[0]).toUpperCase() + String(prop).slice(1).replaceAll('_', ' ');
        return step + (args ? ' ' + args : '');
    }
}