//var dragSrcEl = null;
//
//function handleDragStart(e) {
//    dragSrcEl = this;
//
//    e.dataTransfer.effectAllowed = 'move';
//    e.dataTransfer.setData('text/html', this.innerHTML);
//}
//
//function handleDragOver(e) {
//    if (e.preventDefault) {
//        e.preventDefault(); // Necessary. Allows us to drop.
//    }
//
//    e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
//
//    return false;
//}
//
//function handleDragEnter(e) {
//  // this / e.target is the current hover target.
//    this.classList.add('over');
//}
//
//function handleDragLeave(e) {
//    this.classList.remove('over');  // this / e.target is previous target element.
//}
//
//function handleDrop(e) {
//  // this / e.target is current target element.
//
//    if (e.stopPropagation) {
//        e.stopPropagation(); // stops the browser from redirecting.
//    }
//
//  // See the section on the DataTransfer object.
//    if (dragSrcEl != this) {
//        dragSrcEl.innerHTML = this.innerHTML;
//        this.innerHTML = e.dataTransfer.getData('text/html');
//    }
//    
//    return false;
//}
//
//function handleDragEnd(e) {
//  // this/e.target is the source node.
//
//    [].forEach.call(cols, function (col) {
//        col.classList.remove('over');
//    });
//}
//
//var cols = document.querySelectorAll('#columns .column');
//[].forEach.call(cols, function(col) {
//    col.addEventListener('dragstart', handleDragStart, false);
//    col.addEventListener('dragenter', handleDragEnter, false);
//    col.addEventListener('dragover', handleDragOver, false);
//    col.addEventListener('dragleave', handleDragLeave, false);
//    col.addEventListener('drop', handleDrop, false);
//    col.addEventListener('dragend', handleDragEnd, false);
//});

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




















