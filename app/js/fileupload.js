//web worker
var file = [],
    p = true;

function upload(blobOrFile){
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/server', false);
    xhr.onload = function(e){

    };
    xhr.send(blobOrFile);
}

function process(){
    for(var j = 0; j < file.length; j++){
        var blob = file[j];

        const BYTES_PER_CHUNCK = 1024 * 1024;
        //1 mb chunks
        const SIZE = blob.size;

        var start = 0,
            end = BYTES_PER_CHUNCK;

        while(start < SIZE){
            if('mozSlice' in blob){
                var chunk = blob.mozSlice(start, end);
            } else {
                var chunk = blob.webkitSlice(start, end);
            }

            upload(chunk);

            start = end;
            end = start + BYTES_PER_CHUNCK;
        }
        p = (j = file.length - 1) ? true : false;
        self.postMessage(blob.name + " Uploaded Successfully!");
    }
}

self.onMessage = function(e){
    for(var j = 0; j < e.data.length; j++){
        files.push(e.data[j]);

        if(p){
            process();
        }
    }
}