function sizeChecked(size) {
    //var sizeRadio = document.getElementById("gridSize");
    //console.log(sizeRadio);
    gridSize = size;
    initializeGridHTML(gridSize);
    initializeGridData(gridSize);
}

function cellClicked (row, column) {
    grid[row][column].selected = !grid[row][column].selected;
    //console.log(row, column, grid[row][column].selected);

    // change the border for that cell
    var cellID = 'r' + row + '-' + column;
    //console.log(cellID);
    var cell = document.getElementById(cellID);

    if (grid[row][column].selected) {
        cell.style.borderColor = "red";
    } else {
        cell.style.borderColor = "black";
    }

}

function initializeGridHTML(size) {
    console.log('initializing grid HTML');
    var grid = document.getElementById("grid");

    var gridHTML = "";

    for (var i = 1; i <= size; i++) {
        gridHTML += '<div class=\"row\">';

        for (var j = 1; j <= size; j++) {
            gridHTML += '<div class=\"cell\" id="r' + i + '-' + j + '\" onclick=\"cellClicked(' + i + ', ' + j + ')\">0</div>';
        }
        gridHTML += '</div>';
    }

    grid.style.width = (size * 30) + 'px';
    grid.style.height = (size * 30) + 'px';

    //console.log(gridHTML);
    grid.innerHTML = gridHTML;
}

function initializeGridData(size) {
    // initialize a 2-dimensional array
    grid = new Array(gridSize + 1);
    for (var i=0; i <= gridSize + 1; i++) {
        grid[i] = new Array(gridSize + 1);
    }

// the grid is going to go from 0 to gridsize+1.
// The 0 row and column and gridsize+1 row and column will have temperature 0, and never change.
    console.log ('initializing grid data...');
    for (i=0; i <= gridSize + 1; i++) {
        for (var j=0; j <= gridSize + 1; j++) {
            grid[i][j] = new Object();
            grid[i][j].temperature = 0;
            grid[i][j].lasttemp = 0;
            grid[i][j].selected = false;     // should start off
        }
    }


}



function heatInterval(size) {
    //console.log ('in heatInterval');

    for (var i = 1; i <= size; i++) {
        for (var j = 1; j <= size; j++) {
            // First, increase temperature for all selected by 1 degree.
            if (grid[i][j].selected) {
                grid[i][j].temperature += heatIncrease;
            }
            // Then, save a copy of the temperatures so we can do averages based on them.
            grid[i][j].lasttemp = grid[i][j].temperature;
        }
    }

    // Now set new temperatures based on the average of your temperature and the cell on each side of you.
    // Note: cells on the edge and on the corners have invisible cells off the grid whose temp is always 0.
    for (i = 1; i <= size; i++) {
        for (j = 1; j <= size; j++) {
            grid[i][j].temperature = (
                grid[i-1][j-1].lasttemp +
                grid[i-1][j].lasttemp +
                grid[i-1][j+1].lasttemp +
                grid[i][j-1].lasttemp +
                grid[i][j].lasttemp +
                grid[i][j+1].lasttemp +
                grid[i+1][j-1].lasttemp +
                grid[i+1][j].lasttemp +
                grid[i+1][j+1].lasttemp
            ) / 9;
        }
    }

    //console.log('4,4 is ' + grid[4][4].temperature);
}

function updateGridHTML(size) {
    //console.log('in updateGridHTML');

    var totalHeat = 0;
    for (var i = 1; i <= size; i++) {
        for (var j = 1; j <= size; j++) {
            totalHeat += grid[i][j].temperature;
            var cell = document.getElementById('r' + i + '-' + j);
            cell.innerHTML = Math.round(grid[i][j].temperature*10)/10;
        }
    }
    document.getElementById('totalHeat').innerHTML = Math.round(totalHeat*10)/10;
}

// MAIN ROUTINE HERE

console.log ('index.js starting...');
var gridSize = 11;
var heatIncrease = 1;
var grid = "";

initializeGridHTML(gridSize);

initializeGridData(gridSize);

window.setInterval(function(){
    heatInterval(gridSize);
    updateGridHTML(gridSize);
}, 1000);
