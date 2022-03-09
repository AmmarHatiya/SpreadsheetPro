/* (e.g. {"date": "2021/03/02", 
"duration": "2:51"}) */
var selected_num;
scores = [
    ["-1", "1", "-1", "-1", "-1", "-1", "-1", "9", "-1"],
    ["-1", "-1", "4", "-1", "-1", "-1", "2", "-1", "-1"],
    ["-1", "-1", "8", "-1", "-1", "5", "-1", "-1", "-1"],
    ["-1", "-1", "-1", "-1", "-1", "-1", "-1", "3", "-1"],
    ["2", "-1", "-1", "-1", "4", "-1", "1", "-1", "-1"],
    ["-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1"],
    ["-1", "-1", "1", "8", "-1", "-1", "6", "-1", "-1"],
    ["-1", "3", "-1", "-1", "-1", "-1", "-1", "8", "-1"],
    ["-1", "-1", "6", "-1", "-1", "-1", "-1", "-1", "-1"]
];
var lastmoveloc;

window.onload = function () {
    tble = createTable(scores);

    $(".pllt > table > tbody > tr > td ").on('click', function ( /* e */ ) {


        $('.pllt td').css('background-color', '');
        $(this).css('background-color', '#7cebff');

        // if valid number digit in pallete is clicked
        if (this.id != "undoid") {
            selected_num = this.innerHTML;
        } // if undo button is clicked
        else if (selected_num != undefined && this.id == "undoid" && lastmoveloc != undefined){
            //console.log("After UNDO, lml: ", lastmoveloc.innerHTML);
            lastmoveloc.innerHTML = "";
            $('#tbl tr').each(function () {
                $(this).find('td').each(function () {
                    $(this).css('backgroundColor', '#ffffff')
    
                })
            })
            
        }
    });
    $(".board > table > tbody > tr > td").on('click', function () {
        lastmoveloc = this;
        //console.log("LAST MOVE LOCATION: ", lastmoveloc.className);
        var tmp = this;
        var selectname = this.className;
        var rownum = selectname[4];
        var colnum = selectname[5];

        // Update board with selected number from palette
        updateboard(tmp);


        // Loop through each cell and find if there exist any 
        // rule breaks
        $('#tbl tr').each(function () {
            $(this).find('td').each(function () {
                loc = this;
                currname = this.className;
                currrow = currname[4];
                currcol = currname[5];
                // Makes sure clicked cell is not iterated over
                if (currname != selectname && this.innerHTML != "") {
                    if (sameBlock(rownum, colnum, currrow, currcol) || 
                    sameRow(rownum, colnum, currrow, currcol) || 
                    sameColumn(rownum, colnum, currrow, currcol)) {
                        // IF problem cell is found
                        if (this.innerHTML == tmp.innerHTML){
                            //console.log("FOUND MATCHING NUMBER @ ", currname);
                            $(this).css('background-color', '#f76c5e');

                            $("#undoid").on('click', function () {
                                tmp.innerHTML = "";
                            }); 
                        }
                    }
                }
            }) // same as below
        }) // looping through to find errors

    }); // clicking a cell on the sdk board
} // windows onload

function updateboard(x){
    if (selected_num != undefined && x.innerHTML=="") {
        x.innerHTML = selected_num;
    }
}

// Start of function from slides
function sameBlock(x1, y1, x2, y2) {
    let firstRow = Math.floor(y1 / 3) * 3;
    let firstCol = Math.floor(x1 / 3) * 3;
    return (y2 >= firstRow && y2 <= (firstRow + 2) && x2 >= firstCol && x2 <= (firstCol + 2));
}

function sameColumn(x1, y1, x2, y2) {
    return y1 == y2;
}

function sameRow(x1, y1, x2, y2) {
    return x1 == x2;
}
// end

// create a dynamic sudoku table
function createTable(tableData) {

    //Create a Table
    var table = document.createElement("table");
    table.id = "tbl";
    //Get the count of columns.
    var colcount = tableData[0].length;


    //Add the row data 
    for (var i = 0; i < tableData.length; i++) {
        row = table.insertRow(-1);

        for (var j = 0; j < colcount; j++) {
            var cell = row.insertCell(-1);

            if (tableData[i][j] != -1) {
                cell.innerHTML = tableData[i][j];
                cell.className = `cell${i}${j}`;
            } else {
                cell.className = `cell${i}${j}`;
            }

        }
    }

    var scorest = document.getElementById("sdkuID");
    scorest.appendChild(table);

}