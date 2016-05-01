
class AppController {

    constructor(portletConfig) {
        this.authenticatedUser = portletConfig.authenticatedUser;
    }

}

const component = {
    bindings: {
    },
    controllerAs: 'ctrl',
    controller: AppController,
    template: `
        <h2>AngularJS Portlet Demo ES2015</h2>
        <p>Authenticated User: <strong>{{ctrl.authenticatedUser}}</strong></p>
        <router-view>Loading...</router-view>
    `
};

export default component;
