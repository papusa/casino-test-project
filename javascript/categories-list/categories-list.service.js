(function () {
    'use strict';

    angular
        .module('categoriesList')
        .factory('Category', categoriesService);

    categoriesService.$inject = ['$resource'];

    function categoriesService($resource) {
        return $resource('content/data/categories-list.json', {}, {
            getAll: {
                method: 'GET',
                isArray: true
            }
        });
    }
})();