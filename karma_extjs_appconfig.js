Ext.Loader.setConfig({
   enabled: true,
   paths: {
       'AM': 'base/app'
   },
   disableCaching: false 
});

// if you have other overrides for ExtJS, this is a good place to add them, 
// or you add them as seperate files after this file in the files:[] array in your karma_start.js config.

// Ext.Ajax.timeout = 300000;