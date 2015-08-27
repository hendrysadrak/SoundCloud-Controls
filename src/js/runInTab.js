(function () {
    "use strict";

    if (window.hasHSInject) return;
    else window.hasHSInject = true;

    var methodObject = {
        next: function () {
            clickButtonElement(getButtonElement('skipControl__next'));
        },
        pause: function () {
            clickButtonElement(getButtonElement('playControl'));
        },
        prev: function () {
            clickButtonElement(getButtonElement('skipControl__previous'));
        }
    };

    function getButtonElement(className) {
        return document.querySelector('.playControls__playPauseSkip .' + className);
    }

    function clickButtonElement($button) {
        $button.click();
    }

    function runMethod(trackMethod) {
        methodObject[trackMethod]();
    }

    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        /**
         * do the running
         */
        if (message.trackMethod != 'fake')runMethod(message.trackMethod);

        /**
         * Send back if is playing
         */
        var isPlaying = getButtonElement('playControl').classList.contains('playing');
        var currentTrack = document.getElementsByClassName('playbackSoundBadge__title')[0].title;

        sendResponse({
            isPlaying: isPlaying,
            currentTrack: currentTrack
        });
    });
})();
