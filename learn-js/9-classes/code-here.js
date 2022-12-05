class Store {
    constructor(model) {
        this.model = model
    }
    // getName() {
    //     console.log(this.model)
    // }
}

Store.prototype.getName = function () {
    console.log(this.model)
}

const moscowStore = new Store('ReStore Москва')
moscowStore.getName()

