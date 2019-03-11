/**
 * Custom Queue System
 * Use Case:
 *      Any application that requires storage of a cataloging system or
 *      an application that needs to send information when an internet
 *      connection is not available.
 * Dependencies:
 *      Local Storage Support
 * @author Joseph Kasavage
 */
var customQueue = {
    /**
     * Queue Name
     * @param string
     */
    queueName: "customQueue",

    /**
     * Queue List
     * @param array
     */
    queueList: [],

    /**
     * URL to Send Events
     * @param string
     */
    queueEndPoint = "www.yourSiteToProcessQueueItems.com",

    /**
     * Queue Timer
     * @param integer
     */
    queueTimer: 5000,

    /**
     * Start Queue
     * @return void
     */
    queueStart: function () {
        let previousQueue = localStorage.getItem(this.queueName);

        if(previousQueue)
        {
            this.queueList = peviousQueue;
        }

        setTimeout(this.queueCheck(), this.queueTimer);
    },

    /**
     * Check if there are valid Queue Events
     * @return void
     */
    queueCheck: function () {
        if(this.queueList.length > 0) {
            this.queuePush();
        }
    },

    /**
     * Send Events to End Point
     * @return void
     */
    queuePush: function () {
        // Internet Explorer 5/6 does no support XMLHTTPRequest
        // Added support for ActiveXObject
        let xhr = (window.XMLHTTPRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

        let event = this.queueList.pop();

        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4 && xhr.status == 200) {
                return true;
            } else {
                alert("Queue Service\n\nThere was an error attempt to process some procedures. If this continues please contact support.");
                return false;
            }
        };

        xhr.open("POST", this.queueEndPoint, true);
        xhr.send("queue=" + event);
    },

    /**
     * Add Item to Queue
     * @param string item
     * @return void
     */
    queueAdd: function (item) {
        this.queueHistory.unshift(item);
    },

    /**
     * Save Queue
     * @return void
     */
    storeQueue: function () {
        localStorage.setItem(this.queueName, this.queueList);
    },

    /**
     * Set Queue Name
     * @param string name 
     */
    setQueueName: function (name) {
        this.queueName = name;
    },

    /**
     * Set End Point
     * @param string endPoint 
     */
    setQueueEndPoint: function (endPoint) {
        this.queueEndPoint = endPoint;
    },

    /**
     * Set Queue Timer
     * @param integer timer 
     */
    setQueueTimer: function(timer) {
        this.queueTimer = timer;
    }
};