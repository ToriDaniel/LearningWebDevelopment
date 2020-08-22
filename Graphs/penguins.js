var pennPromise = d3.json("penguins/classData.json");

var screen = {width:900, height:700};
var margins = {top:10, right:50, bottom:50, left:50};

var setup = function(classroom)
{
    d3.select("svg")
    .attr("width", screen.width)
    .attr("height", screen.height)
    .append("g")
    .attr("id", "graph")
    .attr("transform", "translate("+margins.left+","+margins.top+")");
    
    
    var width = screen.width - margins.left -margins.right;
    var height = screen.height - margins.top - margins.bottom;
    
    var xScale = d3.scaleLinear()
                    .domain([0,38])
                    .range([0,width]);
    
    var yScale = d3.scaleLinear()
                    .domain([0, 10])
                    .range([height, 0]);
    
    var cScale = d3.scaleOrdinal(d3.schemeTableau10);
    
    var xAxis = d3.axisBottom(xScale)
    var yAxis = d3.axisLeft(yScale)
    d3.select("svg")
    .append("g")
    .classed("axis", true);
    
    d3.select(".axis")
    .append("g")
    .attr("id", "xAxis")
    .attr("transform", "translate("+margins.left+","+(margins.top+height) + ")")
    .call(xAxis)
    
    d3.select(".axis")
    .append("g")
    .attr("id", "yAxis")
    .attr("transform", "translate(25,"+margins.top+")")
    .call(yAxis);
    
    //drawLegend(classroom, cScale);
    drawArray(classroom, xScale, yScale, cScale);
}

var getGrades = function(quiz)
{
    return quiz.grade;
}

var getQuizes = function(penguin)
{
    var folder = {};
    folder.pic = penguin.picture;
    folder.arr = penguin.quizes.map(getGrades);
    return folder;
}

var drawArray = function(classroom, xScale, yScale, cScale)
{
    
    var count = -1;
    var temp =classroom.map(getQuizes);
    console.log(temp);
    var arrays = d3.select("#graph")
        .selectAll("g")
        .data(temp)
        .enter()
        .append("g")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("class", function(folder)
        {
        
        count=count+1;
        return count
        }
         )
    .attr("stroke-width", 3)
    .on("mouseover", function(folder)
    {
        d3.select(this).attr("stroke", function(f)
        {
            return cScale(f);
        });  
        d3.select(this).attr("stroke-width", 5);
        
        
        var t = "penguins/" + temp[d3.select(this).attr("class")].pic 
        d3.select("#picture").append("img").attr("src", t);
        
       
    }).on("mouseout", function(arr)
    {
        d3.select("#picture *").remove();
        d3.select(this).attr("stroke", "black");
        d3.select(this).attr("stroke-width", 3);
    }
    );
    
    
    var lineGen = d3.line()
    .x(function(num, index) 
       {return xScale(index)})
    .y(function(num)
       {return yScale(num)})
    .curve(d3.curveNatural);
    

    arrays.datum(function(obj){
        return obj.arr})
    .append('path')
    .attr("d", lineGen);
}

pennPromise.then(
function(data)
{
    console.log("works", data);
    setup(data);
    
},
function(err)
{
    console.log("broken", err);
});