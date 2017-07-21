(function () {
    'use strict';

    angular
        .module('common')
        .filter('startFrom', function () { return startFromFilter; });

    function startFromFilter(input, startPosition) {
        if (input) {
            startPosition = +startPosition;
            return input.slice(startPosition);
        }

        return [];
    }
})();