var mountainPuzzle = {
    mapSize: 1,
    cell_width: 0,
    row_width: 0,
    height: 0,
    stepCount: 0,
    currentList: [],
    random: false,

    startGame: function(random, mapSize) {
        // set default values for parameters -
        // syntax: variable = boolean_expression ? true_value : false_value;
        this.random = typeof random !== 'undefined' ? random : false;
        this.mapSize = typeof mapSize !== 'undefined' ? mapSize : 1;
        console.log(this);
        this.setSize(this.mapSize);
        this.buildMap();

        if (this.random) {$('#sortable').randomize();}
        this.enableSwapping('#sortable li');
        this.stepCount = 0;
    },
    setSize: function (mapSize) {
        // set or reset height and width of cells and rows
        switch (mapSize){
            case 1:
                this.height = 404;
                this.cell_width = 417;
                this.row_width = 10008;
                break;
            case 2:
                this.height = 202;
                this.cell_width = 208;
                this.row_width = 4992;
                break;
            case 3:
                this.height = 101;
                this.cell_width = 104;
                this.row_width = 2496;
        }
        $( "#sortable li" ).height( this.height ).width( this.cell_width );
        $( "#sortable" ).width( this.row_width );
        $( "#sortable li").css({
            'background-size': this.cell_width + 'px ' + this.height + 'px'
        });
    },
    buildMap: function () {
        // build DOM elements including images
        var image = '' ;
        $('#sortable').empty();
        for (var i = 0; i < 312; i++) {
            image = ('images/jj_' + i + '.jpeg');
            var li = $('<li class="item" data-value="' + (i) + '"></li>').css({
                'background-image': 'url(' + image + ')'//,
            });
            $('#sortable').append(li);
        }
    },
    enableSwapping: function (elem) {
        $(elem).draggable({
            snap: '#droppable',
            snapMode: 'outer',
            revert: "invalid",
            helper: "clone"
        });
        $(elem).droppable({
            drop: function (event, ui) {
                var $dragElem = $(ui.draggable).clone().replaceAll(this);
                $(this).replaceAll(ui.draggable);
                currentList = $('#sortable > li').map(function (i, el) { return $(el).attr('data-value') });
                // update score and scoreboard
                mountainPuzzle.stepCount++;
                $('.stepCount').text(mountainPuzzle.stepCount);
                // check list to see if it is correctly sorted -
                if (isSorted(currentList)) {
                    mountainPuzzle.stepCount = 0;
                    $('#msg').html('Game Over! Map is correct!');
                }
                //$('.stepCount').text(mountainPuzzle.stepCount);
                mountainPuzzle.enableSwapping(this);
                mountainPuzzle.enableSwapping($dragElem);
            }
        });
    }
};

function isSorted(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        if (arr[i] != i)
            return false;
    }
    return true;
}


$.fn.randomize = function (selector) {
    var $elems = selector ? $(this).find(selector) : $(this).children(),
        $parents = $elems.parent();

    $parents.each(function () {
        $(this).children(selector).sort(function () {
            return Math.round(Math.random()) - 0.5;
        }).remove().appendTo(this);
    });
    return this;
};
/*
 // Why doesn't this version work?
 function randomize(selector) {
    var $elems = selector ? $(this).find(selector) : $(this).children(),
        $parents = $elems.parent();

    $parents.each(function () {
        $(this).children(selector).sort(function () {
            return Math.round(Math.random()) - 0.5;
        }).remove().appendTo(this);
    });
    return this;
};
*/
//
/*x = 9;
var module = {
    x: 81,
    getX: function () {
        return this.x;
    }
};

module.getX(); // 81

var getX = module.getX;
getX(); // 9, because in this case, "this" refers to the global object

// create a new function with 'this' bound to module
var boundGetX = getX.bind(module);
boundGetX(); // 81
    */