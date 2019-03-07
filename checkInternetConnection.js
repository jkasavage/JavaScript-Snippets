/**
 * Check Internet Connection
 * 
 * Use Case:
 *      Applications that require checking the Internet Connection. 
 *      For example, a website that has a queue system for offline
 *      content.
 * 
 * @author Joseph Kasavage
 */
var checkInternetConnection = {
    /**
     * Notify User of Connectivity Issues
     * 
     * @param bool
     */
    notify: true,

    /**
     * Counter 
     * 
     * For how many times the process has been called
     * 
     * @param integer
     */
    counter: 0,

    /**
     * Counter Limit
     * 
     * How many times the process should be called prior to alerting
     * the User of inactive internet connection
     * 
     * @param integer
     */
    limit: 3,

    /**
     * Process Timer 
     * 
     * Set how many miliseconds to wait prior to repeating the process
     * 
     * @param integer
     */
    timer : 5000,

    /**
     * Website Array
     * 
     * In the event that Google is not up, which is unlikely, you
     * can add websites to reference
     * 
     * @param array
     */
    siteList: [
        "http://www.google.com"
    ],

    /**
     * Check Connection
     * 
     * Go through the steps to verify Internet Connection
     * Keep in mind that if for some reason a firewall has the
     * incoming IP blocked or does not allow the connection it
     * would show the behavior of not having connectivity
     * 
     * @return void
     */
    checkConnection: function() {
        // Internet Explorer 5/6 does no support XMLHTTPRequest
        // Added support for ActiveXObject just in case
        var xhr = (window.XMLHTTPRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

        xhr.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200) {
                if(!checkInternetConnection.notify) {
                    checkInternetConnection.notify = true;
                }

                checkInternetConnection.connectionGood();
            } else {
                checkInternetConnection.counter++;

                if(checkInternetConnection.counter >= checkInternetConnection.limit) {
                    checkInternetConnection.notify = false;
                }

                checkInternetConnection.connectionBad();
            }
        };

        var site;

        if(checkInternetConnection.siteList.length > 1)
        {
            site = checkInternetConnection.siteList[Math.floor(Math.random()*checkInternetConnection.siteList.length)];
        } else {
            site = checkInternetConnection.siteList[0];
        }

        xhr.open("GET", site, true);
        xhr.send();

        setTimeout(function() { checkInternetConnection.checkConnection(); }, checkInternetConnection.timer);
    },

    /**
     * Good Connection Events
     * 
     * Process Events for a Good Connection
     * 
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
     * 
     * Process Events for a Bad Connection
     * 
     * @return void
     */
    connectionBad: function() {
        var connectionStatusImage = document.getElementById("connectionStatusImage");

        if(connectionStatusImage.src == "green.gif") {
            connectionStatusImage.src = "red.gif";
        }

        if(checkInternetConnection.notify) {
            var connectionErrorDiv = document.getElementById("connectionErrorDiv");

            connectionErrorDiv.innerHTML = "<b style='color: red;'>There appears to be an issue with your Internet Connection. Please check connectivity.</b>";
        }
    },
};