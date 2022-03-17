window.onload = function (){
    
    $(".Spreadsheettable th").on('click', function () {
        //deselect();

        var index = $(this).attr('class').charAt($(this).attr('class').length-1);
        var headertype = $(this).attr('class').charAt(0);

        //console.log(headertype);
        //console.log(index);
        if (headertype == 'c'){
            selectColumn(index);
        }
        else if(headertype == 'r'){
            selectRow(index);
        }
        
    });
}

function deselectAll() {
    $('.Spreadsheet td').css('background-color', 'white');  
}

function selectRow(rowIndex){
    deselectAll();
    $(`[id = "row${rowIndex}" ]`).css('background-color', '#e0e0ff');
}

function selectColumn(colIndex){
    deselectAll();
    $(`.Spreadsheet .col${colIndex}`).css('background-color', '#e0e0ff');
}


