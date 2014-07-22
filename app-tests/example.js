// mimick the old waitsFor function in Jasmine 1.x
// ExtJS has ajax calls via store proxies, etc.
// for which we can't pass the done function
// therefore this hack allows us to deal with async 
// ala Jasmine 1.x

var myWaitsFor = function(conditionFunc, execFunc, timeOut) {
    var t, i;

    // will be called if the conditionFunc never returns true
    t = setTimeout(function() {
        clearAll();
        execFunc();
    }, timeOut);
 
    // clearing both timers.
    function clearAll(){
        clearInterval(i);
        clearTimeout(t);
    }
  
    // at 30 milliseconds internal, this is polling for conditionFunc to return true, so that it can
    // clear the timers and run the execFunc() to finalize the loop
    i = setInterval(function() {
        if (conditionFunc()) {
            clearAll();
            execFunc();
        }
    }, 30);
  
};

describe("Basic Ext Assumption", function() {
   it("has ExtJS 4 loaded", function() {
      expect(Ext).toBeDefined();
      expect(Ext.getVersion()).toBeTruthy();
      expect(Ext.getVersion().major).toEqual(4); 
   });
   
   describe("Basic Controller Assumption", function() {
      
      var UsersController = null;
      var store = null;
      
      beforeEach(function(done) {
        if(!UsersController) {
            UsersController = Ext.create("AM.controller.Users");
            console.log("UsersController" + UsersController);
            UsersController.init();
        }         
        
        if(!store) {
            // asynchronous exections should be wrapped in a 'runs' function
            // this store has an autoLoad: true, thus will make an ajax call via its proxy.
            store = UsersController.getStore("Users");
        }

        // custom function which compensates for scenarios where you can't pass the done function into the success of an ajax call
        // in the case of a store load.        
        myWaitsFor(function() {
            return !store.isLoading();
        }, function() {
            done();
        }, 2000); 
        
      });
      
      it("Expect UsersController Controller", function() {
          expect(UsersController).toBeTruthy();
      });
      
      it("Expect Users Store", function() {
         expect(store).toBeTruthy(); 
      });
      
      it("Expect 2 items in the store", function() {
         expect(store.getCount()).toEqual(2);
      });
   });
   
    describe("Ext.Ajax.request demo", function() {
        var data,
            expectedData = {
                success: true,
                users: [
                    {id: 1, name: 'Ed',    email: 'ed@sencha.com'},
                    {id: 2, name: 'Tommy', email: 'tommy@sencha.com'}
                ]
            };

        function doAjaxCall(done) {
            Ext.Ajax.request({
                url: "data/users.json",
                success: function(resp) {
                    console.log("is callback being called?");
                    data = Ext.decode(resp.responseText);
                    this.done();
                },
                scope: {
                    done: done,
                    scope: this
                }  
            });
        }  
        
        beforeEach(function(done) {
            doAjaxCall(done);
        });

        it("should make a real AJAX request", function () {
            console.log("it data is: " + data);
            expect(data).toEqual(expectedData);
        });
    });     
});
