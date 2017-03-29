(function () {
    "use strict";

    if ( window.hasHSInject ) return;
    else window.hasHSInject = true;

    var methodObject = {
        next:  function () {
            clickButtonElement( getElement( '.playControls__next' ) );
        },
        pause: function () {
            clickButtonElement( getElement( '.playControls__play' ) );
        },
        prev:  function () {
            clickButtonElement( getElement( '.playControls__prev' ) );
        }
    };

    function getElement( className ) {
        return document.querySelector( '.playControls ' + className );
    }

    function clickButtonElement( $button ) {
        $button.click();
    }

    function runMethod( trackMethod ) {
        methodObject[ trackMethod ]();
    }

    chrome.runtime.onMessage.addListener( function ( message, sender, sendResponse ) {
        /**
         * do the running
         */
        if ( message.trackMethod != 'fake' ) runMethod( message.trackMethod );

        /**
         * Send back if is playing
         */
        var isPlaying    = getElement( '.playControls__play' ).classList.contains( 'playing' );
        var currentTrack = getElement( '.playbackSoundBadge__title' ).title;

        sendResponse( {
            isPlaying:    isPlaying,
            currentTrack: currentTrack
        } );
    } );
})();
