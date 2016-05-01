

export class Router {

    constructor() {
        this.currentComponent = null;
        this.params = null;
    }

    goto(component, params = {}) {
        this.currentComponent = component;
        this.params = params;
    }

    getCurrentComponent() {
        return this.currentComponent;
    }

    getParams() {
        return this.params;
    }
}
