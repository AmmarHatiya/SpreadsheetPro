/* (e.g. {"date": "2021/03/02", 
"duration": "2:51"}) */
scores = [
    ["Date", "Duration"],
    ["2021/01/17", "3:41"],
    ["2021/01/21", "4:01"],
    ["2021/02/01/","2:52" ],
    ["2021/02/17", "3:08"],
    ["2021/03/02", "2:51"]
];


window.onload = function () {
    createTable(scores);
}



function createTable(tableData) {

    //Create a Table
    var table = document.createElement("table");
    //Get the count of columns.
    var colcount = tableData[0].length;

    //Add the header data
    var row = table.insertRow(-1);
    for (var i = 0; i < colcount; i++) {
        var headerCell = document.createElement("TH");
        headerCell.innerHTML =`<div id=headerrow>${tableData[0][i]}</div>`;
        row.appendChild(headerCell);
    }

    //Add the row data 
    for (var i = 1; i < tableData.length; i++) {
        row = table.insertRow(-1);
        
        for (var j = 0; j < colcount; j++) {
            var cell = row.insertCell(-1);
            cell.innerHTML = tableData[i][j];
        }
    }

    var scorest = document.getElementById("s_table");
    scorest.appendChild(table);

}