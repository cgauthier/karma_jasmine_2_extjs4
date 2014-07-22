var karmaLoadedFunction = window.__karma__.loaded;
window.__karma__.loaded = function() {};

Ext.onReady(function() {
    console.log('Starting Tests...');
    window.__karma__.loaded =  karmaLoadedFunction;
    window.__karma__.loaded();
});
