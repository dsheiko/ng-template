export var observeDOM = (function(){
    var MutationObserver = (<any>window).MutationObserver || (<any>window).WebKitMutationObserver;

    return function( el: Element, callback: Function ){
        if( MutationObserver ){
            // define a new observer
            var observer = new MutationObserver(function( mutations: any[] ){
                var matches = mutations.filter(function( mutation: any ){
                  return mutation.addedNodes.length ||
                    mutation.removedNodes.length || mutation.type === "attributes";
                });
                if( matches.length ) {
                    callback();
                }
            });
            // have the observer observe foo for changes in children
            observer.observe( el, { childList: true, subtree: true, attributes: true, characterData:true } );
            return;
        }
        [
          "DOMNodeInserted",
          "DOMNodeRemoved",
          "DOMSubtreeModified",
          "DOMAttrModified",
          "DOMAttributeNameChanged",
          "DOMCharacterDataModified"
        ].forEach(function( ev: string ){
          el.addEventListener( ev, <EventListener>callback, false );
        });
    };
})();
