import { Backend } from './backend';

export class BackendTest extends Backend {

    constructor($http, portletConfig) {
        super();
        this.$http = $http;
        this.portletConfig = portletConfig;
    }

    userList(startIndex, limit) {
        var jsonFile = startIndex === 0 ? 'users.json' : 'users2.json';

        return this.$http({
            url: this.portletConfig.ajaxUrl + jsonFile,
            method: 'GET'
        });
    }

    userDetail(userId) {
        return this.$http({
            url: this.portletConfig.ajaxUrl + 'userDetails.json',
            method: 'GET'
        });
    }

}