define(function (require) {

    "use strict";

    var $ = require('jquery'),

        findById = function (id) {
            var deferred = $.Deferred(),
                product = null,
                l = products.length;
            for (var i = 0; i < l; i++) {
                if (products[i].id === id) {
                    product = products[i];
                    break;
                }
            }
            deferred.resolve(product);
            return deferred.promise();
        },

        findByName = function (searchKey) {
            var deferred = $.Deferred();
            var results = products.filter(function (element) {
                return element.name.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
            });
            deferred.resolve(results);
            return deferred.promise();
        },

        products = [
            {   "id": 1,
                "name": "Chimay Triple",
                "brewery": "Bières de Chimay",
                "origin": "Baileux, Belgium",
                "style": "Trappist Beer",
                "color": "Gold",
                "alcohol": 8,
                "smallPic": "chimay_tripel.jpg",
                "largePic": "chimay_tripel_large.jpg"
            },
            {   "id": 2,
                "name": "Chimay Rouge",
                "brewery": "Chimay Brewery",
                "origin": "Chimay, Belgium",
                "style": "Trappist Beer",
                "color": "Copper",
                "alcohol": 7,
                "smallPic": "chimay_red.jpg",
                "largePic": "chimay_red_large.jpg"
            },
            {   "id": 3,
                "name": "Chimay Bleue",
                "brewery": "Chimay Brewery",
                "origin": "Chimay, Belgium",
                "style": "Trappist Beer",
                "color": "Brown",
                "alcohol": 9,
                "smallPic": "chimay_blue.jpg",
                "largePic": "chimay_blue_large.jpg"
            },
            {   "id": 4,
                "name": "Leffe Blonde",
                "brewery": "Abbaye de Leffe",
                "origin": "Dinant, Belgium",
                "style": "Belgian Ale",
                "color": "Gold",
                "alcohol": 6.6,
                "smallPic": "leffe_blond.jpg",
                "largePic": "leffe_blond_large.jpg"
            },
            {   "id": 5,
                "name": "Leffe Rituel",
                "brewery": "Abbaye de Leffe",
                "origin": "Dinant, Belgium",
                "style": "Belgian Dark Ale",
                "color": "Dark",
                "alcohol": 9,
                "smallPic": "leffe_rituel.jpg",
                "largePic": "leffe_rituel_large.jpg"
            },
            {   "id": 6,
                "name": "Leffe Triple",
                "brewery": "Abbaye de Leffe",
                "origin": "Dinant, Belgium",
                "style": "Abbey Tripel",
                "color": "Gold",
                "alcohol": 8.5,
                "smallPic": "leffe_tripel.jpg",
                "largePic": "leffe_tripel_large.jpg"
            },
            {   "id": 7,
                "name": "Affligem Blond",
                "brewery": "Brouwerij De Smedt",
                "origin": "Opwijk, Belgium",
                "style": "Belgian Ale",
                "color": "Gold",
                "alcohol": 6.8,
                "smallPic": "affligem_blond.jpg",
                "largePic": "affligem_blond_large.jpg"
            },
            {   "id": 8,
                "name": "Affligem Tripel",
                "brewery": "Brouwerij De Smedt",
                "origin": "Opwijk, Belgium",
                "style": "Tripel",
                "color": "Gold",
                "alcohol": 9.5,
                "smallPic": "affligem_tripel.jpg",
                "largePic": "affligem_tripel_large.jpg"
            }
        ];

    // The public API
    return {
        findById: findById,
        findByName: findByName
    };

});