require.config({

    baseUrl: 'lib',

    paths: {
        app: '../js',
        tpl: '../tpl'
    },

    map: {
        '*': {
            'adapters/product': 'app/adapters/product-websql'
        }
    },
    shim: {
        'handlebars': {
            exports: 'Handlebars'
        }
    }

});

require(["fastclick", 'app/router'], function (FastClick, router) {

    "use strict";

    $(function () {
        FastClick.attach(document.body);
    });

    router.start();

});
