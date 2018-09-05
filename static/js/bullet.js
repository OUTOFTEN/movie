// let screenWidth=document.documentElement.clientWidth;
// let screenHeight=;
// let baseX=200,baseY=200;
let divWidth=558,divHeight=206;
let margin={left:120,top:5,bottom:20,right:30};
let width=divWidth;
let height=divHeight/4-margin.top-margin.bottom;

var chart = d3.bullet()
    .width(width)
    .height(height);

d3.json("/s_bullet/",function (error,data) {
    if(error)
        console.log(error);
        throw error;

    console.log(data);

    var svg = d3.select("#bullet").selectAll("svg")
        .data(data)
        .enter().append("svg")
        .attr("class", "bullet")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height+margin.top+margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(chart);

    var title = svg.append("g")
        .style("text-anchor", "end")
        .attr("transform", "translate(-6," + height / 2 + ")");

    title.append("text")
        .attr("class", "title")
        .text(function(d) { return d.title; });

    title.append("text")
        .attr("class", "subtitle")
        .attr("dy", "1em")
        .text(function(d) { return d.subtitle; });

    d3.selectAll("button").on("click", function() {
        svg.datum(randomize).call(chart.duration(1000)); // TODO automatic transition
    });
});

function randomize(d) {
    if (!d.randomizer) d.randomizer = randomizer(d);
    d.ranges = d.ranges.map(d.randomizer);
    d.average = d.average.map(d.randomizer);
    d.practical = d.practical.map(d.randomizer);
    return d;
}

function randomizer(d) {
    var k = d3.max(d.ranges) * .2;
    return function(d) {
        return Math.max(0, d + k * (Math.random() - .5));
    };
}


