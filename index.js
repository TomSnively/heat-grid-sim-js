function cellClicked (row, column) {
    grid[row][column].selected = !grid[row][column].selected;
    console.log(row, column, grid[row][column].selected);

    // change the border for that cell
    var cellID = 'r' + row + '-' + column;
    console.log(cellID);
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
            gridHTML += '<div class=\"cell\" id="r' + i + '-' + j + '\" onclick=\"cellClicked(' + i + ', ' + j + ')\">1</div>';


        }
        gridHTML += '</div>';
    }

    grid.style.width = (size * 30) + 'px';
    grid.style.height = (size * 30) + 'px';

    //console.log(gridHTML);
    grid.innerHTML = gridHTML;
}


// MAIN ROUTINE HERE

console.log ('index.js starting...');
var gridSize = 7;

initializeGridHTML(gridSize);

// initialize a 2-dimensional array
var grid = new Array(gridSize + 1);
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
        grid[i][j].selected = false;
    }
}

// Ok, this works; we can set a particular cell.
grid[2][3].temperature = 1;


// object.addEventListener("click", myScript);


/*
cell[3,2].temp
cell[3,2].selected
*/