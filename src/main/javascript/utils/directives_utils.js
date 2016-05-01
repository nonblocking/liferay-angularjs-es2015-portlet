import angular from 'angular';

/*
 * To be able to use classes for directives we have to do some magic here.
 *
 * createDirectiveFactory() takes a directive definition (see Angular documentation) and
 * merges it with a class that contains link(), compile() or controller() methods.
 *
 * Usage:
 *   module.directive('myDirective', createDirectiveFactory(def, myClass))
 */

function getParameters(target) {
    const funcStr = target.toString();
    const startIndex = funcStr.indexOf('(');
    const endIndex = funcStr.indexOf(')', startIndex + 1);
    const argStr = funcStr.substring(startIndex + 1, endIndex);
    return argStr.split(',').map((arg) => arg.trim());
}

function fixThisScope(inst, methodName) {
    if (inst[methodName]) {
        const original = inst[methodName];
        inst[methodName] = function() {
            return original.apply(inst, arguments);
        };
    }
}

export function createDirectiveFactory(definition, directiveClass) {
    const parameters = getParameters(directiveClass);
    const factoryArray = parameters.slice();
    factoryArray.push((...parameters) => {
        let inst = new directiveClass(...parameters);
        angular.extend(inst, definition);
        fixThisScope(inst, 'link');
        fixThisScope(inst, 'compile');
        fixThisScope(inst, 'controller');
        return inst;
    });
    return factoryArray;
}