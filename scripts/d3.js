window.onload = function () {

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


    gradeData = new Array(0);

    graphData = [{
            'letterGrade': 'A',
            'Grade': 0
        },
        {
            'letterGrade': 'B',
            'Grade': 0
        },
        {
            'letterGrade': 'C',
            'Grade': 0
        },
        {
            'letterGrade': 'D',
            'Grade': 0
        },
        {
            'letterGrade': 'F',
            'Grade': 0
        },
    ]

    $(".Spreadsheettable th").on('click', function () {
        freqData = [0, 0, 0, 0, 0];
        freqGrade = [0, 0, 0, 0, 0];
        gradeData = [];
        graphData = [{
                'letterGrade': 'A',
                'Grade': 0
            },
            {
                'letterGrade': 'B',
                'Grade': 0
            },
            {
                'letterGrade': 'C',
                'Grade': 0
            },
            {
                'letterGrade': 'D',
                'Grade': 0
            },
            {
                'letterGrade': 'F',
                'Grade': 0
            },
        ]

        var index = $(this).attr('class').charAt($(this).attr('class').length - 1); // index of column/row
        var headertype = $(this).attr('class').charAt(0); // row or column (r or c)
        //console.log("Index is", index);
        if (headertype == 'c') {
            selectColumn(index);
        } else if (headertype == 'r') {
            selectRow(index);
        }
        for (i = 0; i < gradeData.length; i++) { // for each element in gradeData,  
            // calculate lettergrade, and put in appropriate freqGrade  
            letgrade = getGrade(gradeData[i]);

            if (letgrade == 'F') {
                freqGrade[4] += 1;
            } else if (letgrade == 'D') {
                freqGrade[3] += 1;
            } else if (letgrade == 'C') {
                freqGrade[2] += 1;
            } else if (letgrade == 'B') {
                freqGrade[1] += 1;
            } else {
                freqGrade[0] += 1
            }
        }
        console.log("This is Freq Grade after loop", freqGrade);
        freqData[0] = freqGrade[0] / gradeData.length;
        freqData[1] = freqGrade[1] / gradeData.length;
        freqData[2] = freqGrade[2] / gradeData.length;
        freqData[3] = freqGrade[3] / gradeData.length;
        freqData[4] = freqGrade[4] / gradeData.length;



        console.log("Frequency of Grade: ", freqGrade);

        graphData = [{
                'letterGrade': 'A',
                'Grade': freqData[0]
            },
            {
                'letterGrade': 'B',
                'Grade': freqData[1]

            },
            {
                'letterGrade': 'C',
                'Grade': freqData[2]
            },
            {
                'letterGrade': 'D',
                'Grade': freqData[3]
            },
            {
                'letterGrade': 'F',
                'Grade': freqData[4]
            },
        ];



        console.log("Graph Dictionary", graphData);

        d3.select('svg').remove();

        const margin = 50;
        const width = 800;
        const height = 500;
        const chartWidth = width - 2 * margin;
        const chartHeight = height - 2 * margin;

        const colourScale = d3.scaleLinear()
            .domain([0, 1])
            .range(['lightskyblue', 'blue']);

        const xScale = d3.scaleBand()
            .range([0, chartWidth])
            .domain(graphData.map((s) => s.letterGrade))
            .padding(0.3);

        const yScale = d3.scaleLinear()
            .range([chartHeight, 0])
            .domain([0, 1.1]);

        const svg = d3.select('body')
            .append('svg')
            .attr('width', width)
            .attr('height', height);

        const canvas = svg.append('g')
            .attr('transform', `translate(${margin}, ${margin})`);

        // chart title
        svg.append('text')
            .attr('x', margin + chartWidth / 2)
            .attr('y', margin)
            .attr('text-anchor', 'middle')
            .text('Frequency of Grades');

        // x-axis and label
        canvas.append('g')
            .attr('transform', `translate(${margin}, ${chartHeight})`)
            .call(d3.axisBottom(xScale));

        svg.append('text')
            .attr('x', margin + chartWidth / 2 + margin)
            .attr('y', chartHeight + 2 * margin - 15)
            .attr('text-anchor', 'middle')
            .text('Letter Grade');

        // y-axis and label
        canvas.append('g')
            .attr('transform', `translate(${margin}, 0)`)
            .call(d3.axisLeft(yScale));

        svg.append('text')
            .attr('x', -margin + -(chartWidth / 2))
            .attr('y', margin)
            .attr('transform', 'rotate(-90)')
            .attr('text-anchor', 'middle')
            .text('Frequency');

        // the bar chart
        const bars = canvas.selectAll('rect')
            .data(graphData)
            .enter()
            .append('rect')
            .attr('x', (data) => margin + xScale(data.letterGrade))
            .attr('y', chartHeight)
            .attr('height', 0)
            .attr('width', xScale.bandwidth())
            .attr('fill', (data) => colourScale(data.Grade))
            .on('mouseenter', function (source, index) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('opacity', 0.5);
            })
            .on('mouseleave', function (source, index) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('opacity', 1.0);
            });
        bars.transition()
            .ease(d3.easeElastic)
            .duration(800)
            .delay((data, index) => index * 50)
            .attr('y', (data) => yScale(data.Grade))
            .attr('height', (data) => chartHeight - yScale(data.Grade));


    });


};

function deselectAll() {
    $('.Spreadsheet td').css('background-color', 'white');
}

function selectRow(rowIndex) {
    deselectAll();
    $(`[id = "row${rowIndex}" ]`).css('background-color', '#e0e0ff');
    var textBoxes = document.querySelectorAll(`[id^="row${rowIndex}"]`);
    for (var i = 0; i < textBoxes.length; i++) {
        gradeData[i] = (textBoxes[i].innerHTML);
    }
}

function selectColumn(colIndex) {
    deselectAll();
    $(`.Spreadsheet .col${colIndex}`).css('background-color', '#e0e0ff');
    var textBoxes = document.querySelectorAll(`.Spreadsheet .col${colIndex}`);
    for (var i = 0; i < textBoxes.length; i++) {
        gradeData[i] = (textBoxes[i].innerHTML);
    }

}

function getGrade(mark) {
    if (mark < 50.0) {
        return 'F';
    } else if (mark < 60.0) {
        return 'D';
    } else if (mark < 70.0) {
        return 'C';
    } else if (mark < 80.0) {
        return 'B';
    } else {
        return 'A';
    }
}