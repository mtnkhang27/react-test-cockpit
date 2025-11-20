sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/core/HTML"
], function (UIComponent, HTML) {
    "use strict";

    return UIComponent.extend("cnmaguestportal.Component", {
        metadata: {
            manifest: "json"
        },

        init: function () {
            // Call parent init
            UIComponent.prototype.init.apply(this, arguments);

            // Create HTML control to host React app
            var oRootControl = new HTML({
                content: '<div id="root" style="width:100%;height:100%"></div>'
            });

            // Set as root control
            this.setAggregation("rootControl", oRootControl);

            // Wait for DOM ready, then load React
            setTimeout(() => {
                this._loadReactApp();
            }, 100);
        },

        _loadReactApp: function () {
    var sBasePath = this.getManifestObject().resolveUri("./");
    
    // Load React runtime, then main bundle
    Promise.all([
        this._loadScript(sBasePath + "static/js/main.js")
    ]).then(() => {
        // Call React render function
        if (window.renderReactApp) {
            window.renderReactApp();
        }
    }).catch((error) => {
        console.error("Failed to load React app:", error);
    });
},

        _loadScript: function (src) {
            return new Promise((resolve, reject) => {
                var script = document.createElement('script');
                script.src = src;
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
        }
    });
});