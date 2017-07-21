(function () {
    'use strict';

    angular
        .module('gamesList')
        .factory('Game', gamesService);

    gamesService.$inject = ['$resource'];

    function gamesService($resource) {
        return $resource('content/data/games-list.json', {}, {
            get: {
                method: 'GET',
                isArray: true
            }
        });
    }
})();