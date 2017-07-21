(function () {
    'use strict';

    angular
        .module('categoriesList')
        .component('categoriesList', {
            require: { gamesCtrl: '^gamesList' },
            templateUrl: 'javascript/categories-list/categories-list.template.html',
            controller: CategoriesController
        });

    CategoriesController.$inject = ['$http', 'Category'];

    function CategoriesController($http, Category) {
        var self = this;
        self.$onInit = function () {
            Category.getAll(function (categories) {
                self.categories = categories;
                self.gamesCtrl.selectedCategoryId = self.categories[0].id;
            });
        };

        self.selectCategory = selectCategory;
        self.isSelected = isSelected;
    }

    function selectCategory(categoryId) {
        this.gamesCtrl.currentPage = 1;
        this.gamesCtrl.selectedCategoryId = categoryId;
    }

    function isSelected(category) {
        return category.id === this.gamesCtrl.selectedCategoryId;
    }
})();