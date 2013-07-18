var MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    db;

var mongoClient = new MongoClient(new Server('localhost', 27017));
mongoClient.open(function (err, mongoClient) {
    db = mongoClient.db("productdb");
    db.collection('products', {strict: true}, function (err, collection) {
        if (err) {
            console.log("The 'products' collection doesn't exist. Creating it with sample data...");
            populateDB();
        }
    });
});

exports.findById = function (req, res) {
    console.log(req.params);
    var id = parseInt(req.params.id);
    console.log('findById: ' + id);
    db.collection('products', function (err, collection) {
        collection.findOne({'id': id}, function (err, item) {
            console.log(item);
            res.jsonp(item);
        });
    });
};

exports.findAll = function (req, res) {
    var name = req.query["name"];
    db.collection('products', function (err, collection) {
        if (name) {
            collection.find({"name": new RegExp(name, "i")}).toArray(function (err, items) {
                res.jsonp(items);
            });
        } else {
            collection.find().toArray(function (err, items) {
                res.jsonp(items);
            });
        }
    });
};

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function () {

    console.log("Populating product database...");
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

    db.collection('products', function (err, collection) {
        collection.insert(products, {safe: true}, function (err, result) {
        });
    });

};