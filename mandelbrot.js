var canvas
var ctx;

onmessage = function(e){
    if(e.data.magnification){
        createMandelBrot(e.data.magnification);
    }
    if(e.data.canvas){
        canvas = e.data.canvas;
        ctx = canvas.getContext("2d");
    }
}

function checkIfBelongsToMandelbrotSet(x, y) {
    var realComponentOfResult = x;
    var imaginaryComponentOfResult = y;
    var maxIterations = 10;

    for (var i = 0; i < maxIterations; i ++){
        // Calculate the real and imaginary components of the result separately
        var tempRealComponent = realComponentOfResult * realComponentOfResult
                                - imaginaryComponentOfResult * imaginaryComponentOfResult
                                + x;

        var tempImaginaryComponent = 2 * realComponentOfResult * imaginaryComponentOfResult
                                        + y;
        realComponentOfResult = tempRealComponent;
        imaginaryComponentOfResult = tempImaginaryComponent;

        if (realComponentOfResult * imaginaryComponentOfResult > 5){
            return (i/maxIterations * 100);
        }
    }
    return 0;
}

function createMandelBrot(magnificationFactor) {
    
    //var magnificationFactor = 200;
    var panX = 2;
    var panY = 1.5;

    for (var x=0; x<canvas.width; x++){
        for(var y=0; y < canvas.height; y++){
            var belongsToSet = checkIfBelongsToMandelbrotSet(x/magnificationFactor - panX, y/magnificationFactor - panY);
            if(belongsToSet == 0) {
                ctx.fillStyle = '#000';
                ctx.fillRect(x,y,1,1);
            } else{
                ctx.fillStyle = 'hsl(0, 100%, ' + belongsToSet + '%)';
                ctx.fillRect(x,y,1,1);
            }
        }
    }

    postMessage("Done");
}