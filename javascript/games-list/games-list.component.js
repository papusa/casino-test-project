(function () {
    'use strict';

    angular
        .module('gamesList')
        .component('gamesList', {
            templateUrl: 'javascript/games-list/games-list.template.html',
            controller: GamesController
        });

    GamesController.$inject = ['$http', 'Game'];

    var defaultFilter = { displayName: 'Popularity', type: 'popularity' };
    var pageSizeForGrid = 20;
    var pageSizeForList = 40;

    function GamesController($http, Game) {
        var self = this;
        self.isLoading = true;

        Game.get(function (data) {
            self.games = data;
            self.isLoading = false;
            self.totalItems = self.games.length;
        });

        self.gridView = { type: 'grid', cssClass: 'games-grid' };
        self.listView = { type: 'list', cssClass: 'games-list' };
        self.currentView = self.gridView;
        self.currentFilter = defaultFilter;
        self.filters = [defaultFilter, { displayName: 'Alphabetically', type: 'name' }];
        self.currentPage = 1;
        self.numberOfPages = 10;

        self.startsWith = startsWith;
        self.sortGamesBy = sortGamesBy;
        self.isCurrentFilter = isCurrentFilter;
        self.selectGridView = selectGridView;
        self.selectListView = selectListView;
        self.isGridViewSelected = isGridViewSelected;
        self.getGameImage = getGameImage;
        self.setPageSize = setPageSize;
        self.resetPaging = resetPaging;

        self.setPageSize();
    }

    function startsWith(actual, expected) {
        return actual.toLowerCase().indexOf(expected.toLowerCase()) === 0;
    }

    function sortGamesBy(filter) {
        this.currentFilter = filter;
    }

    function isCurrentFilter(filter) {
        return this.currentFilter.type === filter.type;
    }

    function selectGridView() {
        this.currentView = this.gridView;
        this.setPageSize();
    }

    function selectListView() {
        this.currentView = this.listView;
        this.setPageSize();
    }

    function isGridViewSelected() {
        return this.currentView.type === this.gridView.type;
    }

    function getGameImage(gameId) {
        return 'https://assets.igamingcloud.com/game-icons/' + gameId + '.jpg';
    }

    function setPageSize() {
        this.pageSize = this.isGridViewSelected() ? pageSizeForGrid : pageSizeForList;
    }

    function resetPaging() {
        this.currentPage = 1;
    }
})();