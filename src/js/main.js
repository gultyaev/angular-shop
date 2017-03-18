'use strict';
var app = angular.module('app', []);

app.controller('SwitchShow', function () {
    this.showType = 2;
    this.switch = function switchShow(val) {
        this.showType = val;
    }
});

app.controller('StoreController', function() {
    this.products = [
        {
            name: 'Рыба',
            cost: '17',
            src: '//lorempixel.com//200/200/food'
        },
        {
            name: 'Ананас',
            cost: '27',
            src: '//lorempixel.com//200/200/food'
        },
        {
            name: 'Пельмени',
            cost: '15',
            src: '//lorempixel.com//200/200/food'
        },
        {
            name: 'Вареники',
            cost: '17',
            src: '//lorempixel.com//200/200/food'
        }
    ]
});

app.directive('item', function() {
    return {
        restrict: 'EA',
        templateUrl: 'app/item.html',
        scope: {
            info: '=',
            style: '='
        }
    }
});

app.directive('cartPopup', function() {
    return {
        restrict: 'E',
        templateUrl: 'app/cart-popup.html',
        controller: function() {
            this.isPromo = false;
            this.typedPromo = '';
            this.setPromo = function() {
                console.log('I started');
                if (this.typedPromo == '1234') {
                    this.isPromo = true;
                    console.log('success');
                }
                this.typedPromo = "";
            };
        },
        controllerAs: 'cart',
        replace: true
    }
});