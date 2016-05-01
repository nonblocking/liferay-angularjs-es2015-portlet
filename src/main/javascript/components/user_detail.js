
class UserDetailController {

    constructor(backend, router) {
        this.backend = backend;
        this.router = router;

        this.selectedUser = null;

       this.loadDetails();
    }

    showList() {
        this.router.goto('userList');
    }

    loadDetails() {
        this.backend.userDetail(this.router.getParams().selectedUserId).then(
            (response) => {
                this.selectedUser = response.data;
            }, (response) => {
                alert('Error: ' + response.status);
            });
    }
}

const component = {
    bindings: {
    },
    controllerAs: 'ctrl',
    controller: UserDetailController,
    template: `
         <h3>Portal User: {{ctrl.selectedUser.screenName}}</h3>
        <div>
            <table class="ng1-portlet-user-table">
                <tr>
                    <td>Screen Name:</td>
                    <td>{{ctrl.selectedUser.screenName}}</td>
                </tr>
                <tr class="even">
                    <td>EMail Address:</td>
                    <td>{{ctrl.selectedUser.emailAddress}}</td>
                </tr>
                <tr>
                    <td>First Name:</td>
                    <td>{{ctrl.selectedUser.firstName}}</td>
                </tr>
                <tr class="even">
                    <td>Last Name:</td>
                    <td>{{ctrl.selectedUser.lastName}}</td>
                </tr>
                <tr>
                    <td>Last Login Date:</td>
                    <td>{{ctrl.selectedUser.lastLoginDate | date:'yyyy-MM-dd'}}</td>
                </tr>
                <tr class="even">
                    <td>Last Login IP:</td>
                    <td>{{ctrl.selectedUser.lastLoginIp}}</td>
                </tr>
                <tr>
                    <td>Language:</td>
                    <td>{{ctrl.selectedUser.languageId}}</td>
                </tr>
                <tr class="even">
                    <td>User Groups:</td>
                    <td>{{ctrl.selectedUser.userGroups}}</td>
                </tr>
                <tr>
                    <td>Roles:</td>
                    <td>{{ctrl.selectedUser.roles}}</td>
                </tr>
            </table>
        </div>
        <div class="angularjs-portlet-controls">
            <a href="#" ng-click="ctrl.showList()">Back</a>
        </div>
    `
};

export default component;