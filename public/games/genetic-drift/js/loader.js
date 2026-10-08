require.config({
    // The upstream page is served from the site root, so its requirejs config and
    // module ids are all root-relative. Embedded under /games/genetic-drift/ they
    // must resolve against the game folder instead, so every entry is remapped
    // here rather than being patched across the CoffeeScript sources.
    baseUrl: './coffee',
    paths: {
        img: '../img',
        data: '../data',
        cs: '../js/lib/require/plugins/cs',
        'coffee-script': '../js/lib/require/plugins/coffee-script',
        image: '../js/lib/require/plugins/image',
        boxbox: '../js/lib/boxbox/boxbox.min',
        text: '../js/lib/require/plugins/text',
        json: '../js/lib/require/plugins/json'
    },
    shim: {
        boxbox: {
            deps: ['js/lib/boxbox/Box2dWeb-2.1.a.3.min.js'],
            exports: 'boxbox'
        }
    }
});

require(['cs!app'], function(app) {
});
