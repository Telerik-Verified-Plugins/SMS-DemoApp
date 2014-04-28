(function (global) {
    var DemoViewModel,
        app = global.app = global.app || {};

    DemoViewModel = kendo.data.ObservableObject.extend({

        sendInteractiveSMS: function () {
            if (sms === undefined) {
                alert('Plugin not available. Are you running in the simulator?');
            } else {
                sms.send('+31650298958', 'Hi there!', 'INTENT', this.onSuccess, this.onError);
            }
        },
        
        sendNonInteractiveSMS: function () {
            if (sms === undefined) {
                alert('Plugin not available. Are you running in the simulator?');
            } else {
                sms.send('+31650298958', 'Hi there!', '', this.onSuccess, this.onError);
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