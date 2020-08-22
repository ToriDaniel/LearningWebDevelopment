var penPromise = d3.json("planets.json");

var Names = ["Tori", "Alexandra", "Matt"];


var Arnames = function(names)
{

    var linames =  d3.select("#A2")
    .selectAll("div")
    .data(names)
    .enter()
    .append("div")
    .text(function(d){return d;});
    
}



penPromise.then 
(
    function(data)
    {
        Arnames (Names);
        addH1(data);
        images (data);
        nlist (data);
        table (data);
        table2(data);
          addH(data);
        table3(data);
        console.log("works", data);
    
    },
    function(err) 
    {
        console.log ("broke", err);
    }
);



var images = function (img) 
{
    var b3 = d3.select("#B3")
    .selectAll("img")
    .data(img)
    .enter()
    .append("img")
    .attr("src", function(d) {return d.img});
}

var nlist = function (names)
{
    var planets = d3.select("#B4")
    .append("ol")
    .selectAll("li")
    .data(names)
    .enter()
    .append("li")
    .append("span")
    .text (function(d) {return d.name});
}

var table = function (data)
{
    var empty = d3.select("#C1")
    .append("table")
    .selectAll("tr")
    .data(data)
    .enter()
    .append("tr")
}


var table2 = function (data)
{
    var column = d3.select("#C2")
    .append("table")
    .selectAll("tr")
    .data(data)
    .enter()
    .append("tr")
    .append("span")
    .text(function (d) {return d.name});
}

var addH = function(data)
{
    d3.select("#C3").append("h1").text("Attributes of the Universe")
}

var addH1 = function(data)
{
    d3.select("#B3").append("h1").text("Pictures of the Planets")
}


var table3 = function (data)
{
    var columns = d3.select("#C3")
    .append("table")
    .selectAll("tr")
    .data(data)
    .enter()
    .append("tr")
    .append("span")
    .text(function (d) {return d.name});
    
    columns.append("td")
    .append("img")
    .attr("src", function (d) {return d.img});
    
    columns.append("td")
    .append("span")
    .text(function (d) {return d.distance});
    
    columns.append("td")
    .append("span")
    .text(function (d) {return d.radius});
    
      columns.append("td")
    .append("span")
    .text(function (d) {return d.density});
    
      columns.append("td")
    .append("span")
    .text(function (d) {return d.moons});
    
}