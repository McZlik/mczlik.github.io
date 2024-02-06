// https://progur.com/2017/02/create-mandelbrot-fractal-javascript.html
//https://hacks.mozilla.org/2016/01/webgl-off-the-main-thread/
(function(){
    var canvas = document.createElement("canvas");
    canvas.width = 1920;
    canvas.height = 1080;
    document.body.appendChild(canvas);
    var offscreen = canvas.transferControlToOffscreen();
    var worker = new Worker('mandelbrot.js');
    worker.postMessage({canvas: offscreen}, [offscreen]);

    var magnification = 200;
    worker.postMessage({magnification: magnification});

    worker.onmessage = function(event){
        console.log(event.data + ' magnification: ' + magnification);
        magnification += 10;
        worker.postMessage({magnification: magnification});
    }

    //createMandelBrot();
    
    var i = setInterval(function() {
       
    }, 1000)
    
})();