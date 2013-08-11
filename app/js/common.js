//implement worker
var worker = new Worker('fileupload.js');
worker.onmessage = function(e){
    alert(e.data);
}

worker.onerror = worker_error;

function worker_error(e){
    console.log('Error Line', e.lineno, ' in ', e.fileName, ': ', e.message);
}

function handleFileSelect(e){
    e.stopPropagation();
    e.preventDefault();

    var files = e.dataTransfer.files || e.target.files;

    //file list obj
    worker.postMessage({
        'files':files
    });

    //send file list to worker
    var output = [];
    for(var i = 0, f; f = files[i]; i++){
        output.push('<li><strong>' + f.name + '</strong>(' + f.type || 'n/a' + '</li>')
    }
    document.querySelector('#list').innerHTML = '<ul>' + output.join('') + '</ul>';
}

function handleDragOver(e){
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    //this is a copy
}

//setup listeners
var dropZone = document.querySelector('#dropZone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);
document.querySelector('#files').addEventListener('change', handleFileSelect, false);
