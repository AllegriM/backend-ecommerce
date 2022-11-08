const { HTTP_STATUS } = require("../../constants/api.constants");
const { HttpError } = require("../../utils/api.utils");

class MemoryContainer {
    constructor(resource) {
        this.items = [];
        this.resource = resource;
    }

    getAll() {
        return [...this.items]
    }

    getById(id) {
        const obj = this.items.find(item => item.id == id)
        if (!obj) {
            const message = `${this.resource} with id ${id} does not exist in our records`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
        } else {
            return obj
        }
    }

    save(obj) {

        let newId;
        if (this.items.length == 0) {
            newId = 1
        } else {
            newId = this.items[this.items.length - 1].id + 1
        }

        const newObj = { ...obj, id: newId }
        this.items.push(newObj)
        return newObj

    }

    update(id, obj) {
        const index = this.items.findIndex(item => item.id == id)
        if (index < 0) {
            const message = `${this.resource} with id ${id} does not exist in our records`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
        }    
        const updatedItem = {
            id,
            ...obj
        };
        this.items[index] = updatedItem;
        return updatedItem;
    }

    delete(id) {
        const index = this.items.findIndex(item => item.id == id)
        if (index < 0) {
            const message = `${this.resource} with id ${id} does not exist in our records`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
        } else {
            return this.items.splice(index, 1)
        }
    }

    borrarAll() {
        this.items = []
    }
}

module.exports = MemoryContainer