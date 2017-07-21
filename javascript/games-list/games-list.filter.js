(function () {
    'use strict';

    angular
        .module('gamesList')
        .filter('orderGamesBy', orderGamesByFilter);

    orderGamesByFilter.$inject = ['orderByFilter'];

    function orderGamesByFilter(orderByFilter) {
        return function (games, filter) {
            if (filter.type === 'name') {
                return orderByFilter(games, filter.type);
            }

            if (filter.type === 'popularity' && filter.selectedCategoryId) {
                return sortByPopularity(games, filter.selectedCategoryId);
            }

            return games;
        };
    }

    function sortByPopularity(games, categoryId) {
        return games.sort(function (gameA, gameB) {
            return compareGamesPopularity(gameA, gameB, categoryId);
        });
    }

    function compareGamesPopularity(gameA, gameB, categoryId) {
        var popularityOfGameA = getOrderNumberByCategory(gameA, categoryId);
        var popularityOfGameB = getOrderNumberByCategory(gameB, categoryId);

        return popularityOfGameB - popularityOfGameA;
    }

    function getOrderNumberByCategory(game, categoryId) {
        var category = null;

        for (var i = 0; i < game.categories.length; i++) {
            if (game.categories[i].selectedCategoryId === categoryId) {
                category = game.categories[i];
            }
        }

        if (category && category.orderNumber) {
            return category.orderNumber;
        }

        return 0;
    }
})();