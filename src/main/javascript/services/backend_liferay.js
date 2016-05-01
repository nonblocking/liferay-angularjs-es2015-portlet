import { Backend } from './backend';

export class BackendLiferay extends Backend {

    constructor($http, $httpParamSerializerJQLike, portletConfig) {
        super();
        this.$http = $http;
        this.$httpParamSerializerJQLike = $httpParamSerializerJQLike;
        this.portletConfig = portletConfig;
    }

    userList(startIndex, limit) {
        return this.ajaxPost('userList', { startIndex: startIndex, limit: limit });
    }

    userDetail(userId) {
        return this.ajaxPost('userDetail', { userId: userId });
    }

    ajaxPost(method, data){
        return this.$http({
            url: this.portletConfig.ajaxUrl + '&p_p_resource_id=' + method,
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: this.$httpParamSerializerJQLike(data)
        });
    }
}