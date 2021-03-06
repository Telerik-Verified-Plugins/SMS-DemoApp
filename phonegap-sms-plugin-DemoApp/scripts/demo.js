(function (global) {
    var DemoViewModel,
        app = global.app = global.app || {};

    DemoViewModel = kendo.data.ObservableObject.extend({

        sendInteractiveSMS: function () {
            if (!this.checkSimulator()) {
                var options = {
                  android: {
                    intent: 'INTENT'
                  }
                };
                window.sms.send('0123456789', 'Hi there!', options, this.onSuccess, this.onError);
            }
        },
        
        sendNonInteractiveSMS: function () {
            if (!this.checkSimulator()) {
                var options = {
                  android: {
                    intent: ''
                  }
                };
                window.sms.send('0123456789', 'Hi there!', options, this.onSuccess, this.onError);
            }
        },
        
        checkSimulator: function() {
            if (window.navigator.simulator === true) {
                alert('This plugin is not available in the simulator.');
                return true;
            } else if (window.sms === undefined) {
                alert('Plugin not found. Maybe you are running in AppBuilder Companion app which currently does not support this plugin.');
                return true;
            } else {
                return false;
            }
        },

		// callbacks (wrapping alerts in a timeout, because they would otherwise freeze the UI on iOS)
        onSuccess: function(msg) {
            setTimeout(function() {
 	           alert('SMS success: ' + msg);                
            }, 1);
        },

        onError: function(msg) {
            setTimeout(function() {
 	           alert('SMS error: ' + msg);                
            }, 1);
        }
    });

    app.demoService = {
        viewModel: new DemoViewModel()
    };
})(window);