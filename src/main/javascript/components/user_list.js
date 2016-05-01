
class UserListController {

    constructor(backend, router) {
        this.backend = backend;
        this.router = router;

        this.entriesPerPage = 10;
        this.currentPage = 0;
        this.totalEntries = 0;
        this.users = [];

        this.loadUsers();
    }

    totalPages() {
        return Math.floor(this.totalEntries / this.entriesPerPage) + 1;
    }

     isLastPage() {
        return this.totalEntries < (this.currentPage + 1) * this.entriesPerPage;
    }

    isFirstPage() {
        return this.currentPage === 0;
    }

    nextPage() {
        if (!this.isLastPage()) {
            this.currentPage += 1;
            this.loadUsers();
        }
    }

    previousPage() {
        if (!this.isFirstPage()) {
            this.currentPage -= 1;
            this.loadUsers();
        }
    }

    showDetails(userId) {
        this.router.goto('userDetail', {
            selectedUserId: userId
        });
    }

    loadUsers() {
        this.backend.userList( this.currentPage * this.entriesPerPage, this.entriesPerPage).then(
            (response) => {
                this.totalEntries = response.data.total;
                this.users = response.data.users;
            }, (response) => {
                alert('Error: ' + response.status);
            });
    }
}

const component = {
    bindings: {
    },
    controllerAs: 'ctrl',
    controller: UserListController,
    template: `
        <h3>Portal User List</h3>
        <div>
            <table class="ng1-portlet-user-table">
                <tr>
                    <th>Screen Name</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>EMail Address</th>
                    <th></th>
                </tr>
                <tr ng-repeat="user in ctrl.users" ng-class-even="'even'">
                    <td>{{user.screenName}}</td>
                    <td>{{user.firstName}}</td>
                    <td>{{user.lastName}}</td>
                    <td>{{user.emailAddress}}</td>
                    <td><a href="" ng-click="ctrl.showDetails(user.userId)">Details</a></td>
                </tr>
            </table>
        </div>
        <div class="ng1-portlet-controls">
            Page {{currentPage + 1}} of {{totalPages()}}
            &nbsp;
            <a href="#" ng-click="ctrl.previousPage()" ng-class="{ 'disabled': ctrl.isFirstPage() }">Previous Page</a>
            |
            <a href="#" ng-click="ctrl.nextPage()" ng-class="{ 'disabled': ctrl.isLastPage() }">Next Page</a>
        </div>
    `
};

export default component;