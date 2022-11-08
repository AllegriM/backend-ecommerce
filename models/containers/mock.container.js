const MemoryContainer = require("./memory.container");

class MockContainer extends MemoryContainer {
    constructor(resource){
        super(resource)
    }
}

module.exports = MockContainer;