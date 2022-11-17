const MemoryContainer = require("../../containers/memory.container");

class ProductMemoryDao extends MemoryContainer {
    constructor() {
        super(resource);
    }
}

module.exports = ProductMemoryDao;