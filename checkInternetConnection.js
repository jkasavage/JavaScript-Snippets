/**
 * Check Internet Connection
 * Use Case:
 *      Applications that require checking the Internet Connection.
 *      For example, a website that has a queue system for offline
 *      content.
 * @author Joseph Kasavage
 */
var checkInternetConnection = {
    /**
     * Notify User of Connectivity Issues
     * @param bool
     */
    notify: true,

    /**
     * Counter
     * For how many times the process has been called
     * @param integer
     */
    counter: 0,

    /**
     * Counter Limit
     * How many times the process should be called prior to alerting
     * the User of inactive internet connection
     * @param integer
     */
    limit: 3,

    /**
     * Process Timer
     * Set how many miliseconds to wait prior to repeating the process
     * @param integer
     */
    timer : 5000,

    /**
     * Website Array
     * In the event that Google is not up, which is unlikely, you
     * can add websites to reference
     * @param array
     */
    siteList: [
        "http://www.google.com"
    ],

    /**
     * Check Connection
     * Go through the steps to verify Internet Connection
     * Keep in mind that if for some reason a firewall has the
     * incoming IP blocked or does not allow the connection it
     * would show the behavior of not having connectivity
     * @return void
     */
    checkConnection: function() {
        // Internet Explorer 5/6 does no support XMLHTTPRequest
        // Added support for ActiveXObject
        var xhr = (window.XMLHTTPRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4 && xhr.status == 200) {
                if(!this.notify) {
                    this.notify = true;
                }

                this.connectionGood();
            } else {
                this.counter++;

                if(this.counter >= this.limit) {
                    this.notify = false;
                }

                this.connectionBad();
            }
        };

        var site;

        if(this.siteList.length > 1)
        {
            site = this.siteList[Math.floor(Math.random()*this.siteList.length)];
        } else {
            site = this.siteList[0];
        }

        xhr.open("GET", site, true);
        xhr.send();

        setTimeout(function() { this.checkConnection(); }, this.timer);
    },

    /**
     * Good Connection Events
     * Process Events for a Good Connection
     * @return void
     */
    connectionGood: function() {
        var connectionStatusImage = document.getElementById("connectionStatusImage");

        if(connectionStatusImage.src == "red.gif") {
            connectionStatusImage.src = "green.gif";
        }

        var connectionErrorDiv = document.getElementById("connectionErrorDiv");

        if(connectionErrorDiv.innerHTML.length > 0) {
            connectionErrorDiv.innerHTML = "";
        }
    },

    /**
     * Bad Connection Events
     * Process Events for a Bad Connection
     * @return void
     */
    connectionBad: function() {
        var connectionStatusImage = document.getElementById("connectionStatusImage");

        if(connectionStatusImage.src == "green.gif") {
            connectionStatusImage.src = "red.gif";
        }

        if(this.notify) {
            var connectionErrorDiv = document.getElementById("connectionErrorDiv");

            connectionErrorDiv.innerHTML = "<b style='color: red;'>There appears to be an issue with your Internet Connection. Please check connectivity.</b>";
        }
    },
};