import { createDirectiveFactory } from '../utils/directives_utils';

class RouterViewDirective {

    constructor($compile, router) {
        this.router = router;
        this.$compile = $compile;
    }

    link(scope, element, attrs) {
        scope.$watch(
            () => this.router.getCurrentComponent(),
            () => this.renderComponent(scope, element)
        );
    }

    renderComponent(scope, element) {
        const componentTag = this.camelToDash(this.router.getCurrentComponent());
        element.html(`<${componentTag}></${componentTag}>`);
        this.$compile(element.contents())(scope);
    }

    camelToDash(str) {
        return str.replace(/\W+/g, '-').replace(/([a-z\d])([A-Z])/g, '$1-$2');
    }
}

const directive = {
    scope: {
    },
    restrict: 'E',
    template: `
        <div>Test</div>
    `
};


export default createDirectiveFactory(directive, RouterViewDirective);