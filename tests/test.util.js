var observeDOM = (function(){
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

    return function( obj, callback ){
        if( MutationObserver ){
            // define a new observer
            var observer = new MutationObserver(function( mutations ){
                var matches = mutations.filter(function( mutation ){
                  return mutation.addedNodes.length ||
                    mutation.removedNodes.length;
                });
                if( matches.length ) {
                    callback();
                }
            });
            // have the observer observe foo for changes in children
            observer.observe( obj, { childList: true, subtree: true, attributes: true, characterData:true } );
            return;
        }
        [
          "DOMNodeInserted", "DOMNodeRemoved", "DOMSubtreeModified", "DOMAttrModified", "DOMCharacterDataModified"
        ].forEach(function( ev ){
          obj.addEventListener( ev, callback, false );
        });
    };
})();

exports.observeDOM = observeDOM;