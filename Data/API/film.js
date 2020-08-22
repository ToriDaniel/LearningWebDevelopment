var filmPromise = d3.json("https://ghibliapi.herokuapp.com/films");

var setTitle = function(txt)
{
    d3.select("#title").text(txt);
}

var createRules = function(films)
{
    var box = d3.select("#rules")
                .text("This is a trivia game. Below you will find a description of a film. Your job is to guess the film name. If you are stuck, hover over the description to get a hint. If you think you know the answer, click on the description to see the answer. ")
}

var clearDiv = function()
{
    d3.select("#gameAns *").remove();
}
var displayAnswer = function(films)
{
  
    d3.select("#gameAns").append("div")
    .text(films.title);
    
    

}

var displayHint = function (films)
{
    d3.select("#gameHint").append("div")
    .text("Director:" + films.director);
}


var createGame = function(films)
{
    var box2 = d3.select("#gameDesc").append("div")
                .selectAll("p")
                .data(films)
                .enter()
                .append("p")
                .text(function(d)
                {
                    return d.description;    
                })
                .on("mouseover", function(d){displayHint(d)})
                .on("click", function(d){displayAnswer(d)});
    
    
    

}



filmPromise.then(
    function(films)
    {
        console.log(films);
        setTitle("Studio Ghibli API Film Trivia");
        createRules(films);
        createGame(films);
        
    },
    function(err)
    {
        console.log("fail");
        setTitle("Sorry, no games today");
        
    }

);