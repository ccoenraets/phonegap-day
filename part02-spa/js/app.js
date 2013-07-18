var app = {};

$(document).ready(function () {

    "use strict";

    function renderList(products) {
        var l = products.length,
            product;
        $('.product-list').empty();
        for (var i = 0; i < l; i++) {
            product = products[i];
            $('.product-list').append(
                '<li class="topcoat-list__product"><a href="#products/' + product.id + '">' +
                    '<p>' + product.name + '</p><p>' + product.style + '</p><span class="chevron"></span></a></li>');
        }
    }

    function renderHomeView() {
        var html =
            '<div class="topcoat-navigation-bar">' +
                '<div class="topcoat-navigation-bar__item center full">' +
                    '<h1 class="topcoat-navigation-bar__title">Belgian Beers</h1>' +
                '</div>' +
            '</div>' +
            '<div class="search-bar">' +
                '<input type="search" placeholder="search" class="topcoat-search-input search-key">' +
            '</div>' +
            '<div class="topcoat-list__container scroller" style="top:138px;">' +
                '<ul class="topcoat-list list product-list"></ul>' +
            '</div>';
        $('body').html(html);
        $('.search-key').on('keyup', findByName);
    }

    function renderProductView(product) {
        var html =
            '<div class="topcoat-navigation-bar">' +
                '<div class="topcoat-navigation-bar__item left quarter">' +
                    '<a class="topcoat-icon-button--quiet back-button" href="#">' +
                        '<span class="topcoat-icon topcoat-icon--back"></span>' +
                    '</a>' +
                '</div>' +
                '<div class="topcoat-navigation-bar__item center half">' +
                    '<h1 class="topcoat-navigation-bar__title">Belgian Beers</h1>' +
                '</div>' +
            '</div>' +
            '<div class="page-body scroller">' +
                '<img class="small-pic" src="../assets/img/' + product.smallPic + '"/>' +
                '<h1 class="product-name">' + product.name + '</h1><br/>' +
                '<h2 class="style">' + product.style + '</h2><br/>' +
                '<a class="topcoat-icon-button topcoat-button--cta fb-btn">' +
                '<span class="topcoat-icon icon-facebook"></span>&nbsp;&nbsp;Share' +
                '</a>' +
                '<ul class="product-list topcoat-list">' +
                    '<li class="topcoat-list__item">' +
                        '<p>Brewery</p>' +
                        '<p class="brewery">' + product.brewery + '</p>' +
                    '</li>' +
                    '<li class="topcoat-list__item">' +
                        '<p>Origin</p>' +
                        '<p class="origin">' + product.origin + '</p>' +
                    '</li>' +
                    '<li class="topcoat-list__item">' +
                        '<p>Color</p>' +
                        '<p class="color">' + product.color + '</p>' +
                    '</li>' +
                    '<li class="topcoat-list__item">' +
                        '<p>Alc. Vol.</p>' +
                        '<p class="alcohol">' + product.alcohol + '</p>' +
                    '</li>' +
                '</ul>' +
                '<div class="large-pic-bg"></div>' +
                '<div class="large-pic" style="background: url(../assets/img/' + product.largePic + ') center center no-repeat;"></div>' +
            '</div>';
        $('body').html(html);
    };

    function route() {
        var hash = window.location.hash,
            detailsURL = /^#products\/(\d{1,})/,
            match;
        if (!hash) {
            renderHomeView();
            return;
        }
        match = hash.match(detailsURL);
        if (match) {
            app.productAdapter.findById(Number(match[1])).done(function (product) {
                renderProductView(product);
            });
        }
    };

    function findByName() {
        app.productAdapter.findByName($('.search-key').val()).done(function (products) {
            renderList(products);
        });
    };

    $(window).on('hashchange', route);

    $("body").on('click', ".small-pic", function () {
        $(".large-pic-bg").show();
        $(".large-pic").show();
    });

    $("body").on('click', ".large-pic", function () {
        $(".large-pic").hide();
        $(".large-pic-bg").hide();
    });

    route();

});

