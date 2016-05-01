import angular from 'angular';

import { Router } from './services/router';
import { BackendTest } from './services/backend_test';
import { BackendLiferay } from './services/backend_liferay';
import appComponent from './components/app';
import userListComponent from './components/user_list';
import userDetailComponent from './components/user_detail';
import routerViewDirective from './directives/router_view';

function start(appRootElement, portletConfig) {
    const portletDemoModule = angular.module('nonblocking.ng1.portletDemoES2015', []);
    portletDemoModule.constant('portletConfig', portletConfig);

    portletDemoModule.service('router', Router);
    if (portletConfig.isStandalone) {
        portletDemoModule.service('backend', BackendTest);
    }  else {
        portletDemoModule.service('backend', BackendLiferay);
    }

    portletDemoModule.component('demoPortletNg1Es2015', appComponent);
    portletDemoModule.component('userList', userListComponent);
    portletDemoModule.component('userDetail', userDetailComponent);

    portletDemoModule.directive('routerView', routerViewDirective);

    portletDemoModule.run((router) => {
        router.goto('userList')
    });

    angular.bootstrap(appRootElement, [ 'nonblocking.ng1.portletDemoES2015' ]);
}

global.startAngularPortletDemoApp = start;