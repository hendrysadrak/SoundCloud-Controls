"use strict";

var service = analytics.getService('hs.soundcloud_controls');
var tracker = service.getTracker('UA-62812857-3');

tracker.sendAppView('MainView');
tracker.sendEvent('View', 'Open', 'Main');

/**
 * main code
 */
document.addEventListener('DOMContentLoaded', function () {
    /**
     * trackMethod
     * @type {string}
     */
    var trackMethod;

    function onControlsClick(e) {
        /**
         * Set the trackMethod
         */
        trackMethod = $(this).data('type') || e;

        /**
         * send ga
         */
        tracker.sendEvent('Controls', 'Click', trackMethod);

        /**
         * Get soundcloud tabs
         */
        chrome.tabs.query({
            currentWindow: true,
            url: "*://soundcloud.com/*"
        }, runScriptInTabs);
    }

    function runScriptInTabs(tabs) {
        for (var key in tabs) {
            var tab = tabs[key];

            runScriptInTab(tab);
        }
    }

    function runScriptInTab(tab) {
        var tabId = tab.id;

        chrome.tabs.sendMessage(tabId, {
            trackMethod: trackMethod
        }, setBtnIsPlaying);
    }

    function setBtnIsPlaying(c) {
        if (c.isPlaying) {
            $('.btn-pause')
                .attr('title', 'Pause')
                .removeClass('is-play');
        }
        else {
            $('.btn-pause')
                .attr('title', 'Play')
                .addClass('is-play');
        }
    };

    function main() {
        $('.btn-control').on('click', onControlsClick);

        $('.js-settings').on('click', function (e) {
            e.preventDefault();

            tracker.sendEvent('Settings', 'Click', 'Open');
        });

        $('.js-author').on('click', function (e) {
            tracker.sendEvent('Author', 'Click', 'Twitter');
        });
    }

    /**
     * Start the party!
     */
    main();

    /**
     * Send fake call
     */
    onControlsClick('fake');
});

/**
 * ripple effect
 */
$(document).on('click', '.ripple', function (e) {
    var $rippleElement = $('<span class="ripple-effect" />'),
        $buttonElement = $(this),
        btnOffset = $buttonElement.offset(),
        xPos = e.pageX - btnOffset.left,
        yPos = e.pageY - btnOffset.top,
        size = parseInt(Math.min($buttonElement.height(), $buttonElement.width()) * 0.5),
        animateSize = parseInt(Math.max($buttonElement.width(), $buttonElement.height()) * Math.PI);

    $rippleElement
        .css({
            top: yPos,
            left: xPos,
            width: size,
            height: size,

            backgroundColor: $buttonElement.data("ripple-color")
        })
        .appendTo($buttonElement)
        .animate({
            width: animateSize,
            height: animateSize,
            opacity: 0
        }, {
            duration: 500,
            complete: function () {
                $(this).remove();
            }
        });
});
