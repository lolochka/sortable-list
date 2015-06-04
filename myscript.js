function sortable (rootEl, onUpdate) {
    var dragEl, nextEl;
    
    function dragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        
        var target = e.target;
        if ( target && target != dragEl && target.nodeName == 'LI'){
            
            var rect = target.getBoundingClientRect();
            var next = (e.clientY - rect.top)/(rect.bottom - rect.top) > .1;
            rootEl.insertBefore(dragEl, rootEl.children[0] !== target && target.nextSibling || target);
        }
    }
    
    function dragEnd (e) {
        e.preventDefault();
        
        dragEl.classList.remove('over');
        rootEl.removeEventListener('dragover', dragOver, false);
        rootEl.removeEventListener('dragend', dragEnd, false);
        
        if (nextEl !== dragEl.nextSibling) {
            onUpdate(dragEl);
        }
    }
    
    rootEl.addEventListener('dragstart', function(e) {
        dragEl = e.target;
        nextEl = dragEl.nextSibling;
        
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('Text', dragEl.textContent);
        
        rootEl.addEventListener('dragover', dragOver, false);
        rootEl.addEventListener('dragend', dragEnd, false);
        
        setTimeout(function () {
            dragEl.classList.add('over');
        }, 0)
    }, false);
}

sortable( document.getElementById('columns'), function (item) {
    console.log(item);
})
