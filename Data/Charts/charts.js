var pi = function(datas)
{
    var pie = d3.pie(datas);

    var w = 400;
    var h = 400;

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var outerRadius = w/2;
    var innerRadius = 0;
    var arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

    var svg= d3.select("#Pie")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

    var arcs = svg.selectAll("g.arc")
    .data(pie(datas))
    .enter()
    .append("g")
    .attr("class", "arc")
    .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

    arcs.append("path")
        .attr("fill", function(d, i)
      {
            return color(i);
    })
        .attr("d", arc);
}
var donut = function(datas)
{
    var pie = d3.pie(datas);

    var w = 400;
    var h = 400;

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var outerRadius = w/2;
    var innerRadius = w/3;
    var arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

    var svg= d3.select("#Donut")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

    var arcs = svg.selectAll("g.arc")
    .data(pie(datas))
    .enter()
    .append("g")
    .attr("class", "arc")
    .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

    arcs.append("path")
        .attr("fill", function(d, i)
      {
            return color(i);
    })
        .attr("d", arc);
}

var stacks = function()
{


          
}

var dataset = [5, 10, 20, 45, 6, 25 ];
pi(dataset);
donut(dataset);
var dset = [
    {apples:5, oranges:10, grapes:22},
    {apples:4, oranges:12, grapes:28},
    {apples:2, oranges:19, grapes:32},
    {apples:7, oranges:23, grapes:35},
    {apples:23, oranges:17, grapes:43}
];
stacks(dset);