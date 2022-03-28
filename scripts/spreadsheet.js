window.onload = function (){

    $("td").click(function(event){
        if($(this).children("input").length > 0)
              return false;
    
        var tagCell = $(this);
        var previousText = tagCell.html();
        var tagInput = $("<input type='text' />");
        tagCell.html("");
    
        tagInput.width(tagCell.width())
                .height(tagCell.height())
                .css({border:"0px",fontSize:"17px"})
                .val(previousText)
                .appendTo(tagCell)
                .trigger("focus")
                .trigger("select");
    
        tagInput.keyup(function(event){
          if(13 == event.which) { // press ENTER
            var text = $(this).val();
            tagCell.html(text);
          }
          else if(27 == event.which) {  // press ESC
            tagCell.html(previousText);
          }
        });
    
        tagInput.click(function(){
          return false;
        });
      });
    
    $(".Spreadsheettable th").on('click', function () {

        var index = $(this).attr('class').charAt($(this).attr('class').length-1);
        var headertype = $(this).attr('class').charAt(0);


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


