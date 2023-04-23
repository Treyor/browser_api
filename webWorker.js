
if (typeof(Worker)==="undefined") {
    alert("Ops, your browser doesn't support HTML5 Web Worker! Please choose another modern browser and try again.");
}

function nonWebWorker() {
    preStart();
    var a = [];

    for (var i = 50000; i >= 0; i--) {
        a.push(i);
    };
        
    function bubbleSort(a)
    {
        var swapped;
        do {
            swapped = false;
            for (var i=0; i < a.length-1; i++) {
                if (a[i] > a[i+1]) {
                    var temp = a[i];
                    a[i] = a[i+1];
                    a[i+1] = temp;
                    swapped = true;
                }
            }
        } while (swapped);
    }

    var start = new Date().getTime();
    bubbleSort(a);
    var end = new Date().getTime();
    var time = end - start;
    afterStop(time, false);
}

function withWebWorker() {
    preStart();
    var worker = new Worker("worker.js");
    worker.onmessage = function(e) {
        afterStop(e.data, true);
    };

    worker.postMessage("start");
}

function preStart() {
    $("#resultBox").hide(500);
    $("#withWW").hide();
    $("#withoutWW").hide()
    $("#progressbar").show(500);
}

function afterStop(spentTime, mode) {
    $("#timespent").html(spentTime + "ms");
    $("#progressbar").hide(500, function() {
    mode ? $("#withWW").show() : $("#withoutWW").show();
    $("#resultBox").show(500);
    });
    
}
