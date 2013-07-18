define(function (require) {

    "use strict";

    var $ = require('jquery'),

        db = window.openDatabase("ProductDB", "1.0", "Product Demo DB", 200000),

        findByName = function (searchKey) {
            var deferred = $.Deferred();
            db.transaction(
                function (tx) {

                    var sql = "SELECT * FROM product WHERE name LIKE ? ORDER BY name";

                    tx.executeSql(sql, ['%' + searchKey + '%'], function (tx, results) {
                        var len = results.rows.length,
                            products = [],
                            i = 0;
                        for (; i < len; i = i + 1) {
                            products[i] = results.rows.item(i);
                        }
                        deferred.resolve(products);
                    });
                },
                function (error) {
                    deferred.reject("Transaction Error: " + error.message);
                }
            );
            return deferred.promise();
        },

        findById = function (id) {
            var deferred = $.Deferred();
            db.transaction(
                function (tx) {

                    var sql = "SELECT * FROM product WHERE id=:id";

                    tx.executeSql(sql, [id], function (tx, results) {
                        deferred.resolve(results.rows.length === 1 ? results.rows.item(0) : null);
                    });
                },
                function (error) {
                    deferred.reject("Transaction Error: " + error.message);
                }
            );
            return deferred.promise();
        },

        createTable = function (tx) {
            tx.executeSql('DROP TABLE IF EXISTS product');
            var sql = "CREATE TABLE IF NOT EXISTS product ( " +
                "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                "name VARCHAR(50), " +
                "style VARCHAR(50), " +
                "brewery VARCHAR(50), " +
                "origin VARCHAR(50), " +
                "color VARCHAR(50), " +
                "smallPic VARCHAR(50), " +
                "largePic VARCHAR(50), " +
                "alcohol REAL)";
            tx.executeSql(sql, null,
                function () {
                    console.log('Create table success');
                },
                function (tx, error) {
                    alert('Create table error: ' + error.message);
                });
        },

        addSampleData = function (tx, products) {
            var products = [
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
            var l = products.length;
            var sql = "INSERT OR REPLACE INTO product " +
                "(id, name, style, origin, color, brewery, smallPic, largePic, alcohol) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            var e;
            for (var i = 0; i < l; i++) {
                e = products[i];
                tx.executeSql(sql, [e.id, e.name, e.style, e.origin, e.color, e.brewery, e.smallPic, e.largePic, e.alcohol],
                    function () {
                        console.log('INSERT success');
                    },
                    function (tx, error) {
                        alert('INSERT error: ' + error.message);
                    });
            }
        };

    // In this sample app we reinitialize the database every time the app is started
    db.transaction(
        function (tx) {
            createTable(tx);
            addSampleData(tx);
        },
        function (error) {
            console.log('Transaction error: ' + error);
        },
        function () {
            console.log('Transaction success');
        }
    );

    // The public API
    return {
        findById: findById,
        findByName: findByName
    };

});