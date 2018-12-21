/*global d3,data*/

(function () {
    "use strict";
    var margin = {top: 40, right: 180, bottom: 40, left: 180},
        widthGlobal = d3.select("body").node().getBoundingClientRect().width,
        width = widthGlobal - margin.left - margin.right,
        heightGlobal = 400,
        height = heightGlobal - margin.top - margin.bottom,

        x = d3.scaleTime()
            .domain([new Date(2004, 1), new Date(2018, 12)])
            .range([0, width]),

        y1 = d3.scaleBand()
            .domain(data.map(function (e) { return e.recherche; }))
            .range([0, height])
            .padding(0.1),

        y2 = d3.scaleLinear()
            .domain([0, 100])
            .range([y1.bandwidth(), 0]),

        /*
        line = d3.line()
            .x(function (d) { return x(new Date(d.annee, d.mois)); })
            .y(function (d) { var y = y2(d.indice); if (isNaN(y)) {y = y2(0); } return y + y1(d.recherche); }),
        */
        
        area = d3.area()
            .x(function (d) { return x(new Date(d.annee, d.mois)); })
            .y0(function (d) { return y1(d.recherche) + y1.bandwidth(); })
            .y1(function (d) { var y = y2(d.indice); if (isNaN(y)) {y = y2(0); } return y + y1(d.recherche); }),


        motscles = d3.select("#motscles").append("svg")
            .attr("width", widthGlobal)
            .attr("height", heightGlobal)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .attr("width", width)
            .attr("height", height);

    motscles.append("g").selectAll(".vertical")
        .data(x.ticks())
        .enter().append("line")
        .attr('class', 'vertical')
        .attr('x1', function (d) { return x(d); })
        .attr('y1', y1.range()[0])
        .attr('x2', function (d) { return x(d); })
        .attr('y2', y1.range()[1]);

    /*
    motscles.append("g").selectAll(".horizontal")
        .data(data.map(function (e) { return e.recherche; }))
        .enter().append("line")
        .attr('class', 'horizontal')
        .attr('x1', x.range()[0])
        .attr('y1', function (e) { return y1(e) + y1.step(); })
        .attr('x2', x.range()[1])
        .attr('y2', function (e) { return y1(e) + y1.step(); });
    */

    /*
    motscles.selectAll(".evol")
        .data(data)
        .enter().append("path")
        .datum(function (d) { return d.data.map(function (e) {e.recherche = d.recherche; return e; }); }) // 10. Binds data to the line 
        .attr("class", "line") // Assign a class for styling 
        .attr("d", line); // 11. Calls the line generator 
    */

    motscles.append("g").selectAll(".evol")
        .data(data)
        .enter().append("path")
        .datum(function (d) { return d.data.map(function (e) {e.recherche = d.recherche; return e; }); }) // 10. Binds data to the line 
        .attr("class", "area") // Assign a class for styling 
        .attr("d", area); // 11. Calls the line generator 

    motscles.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom().scale(x));
    motscles.append("g")
        .attr("class", "x axis")
        .call(d3.axisTop().scale(x));
    motscles.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft().scale(y1));
    motscles.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + width + ",0)")
        .call(d3.axisRight().scale(y1));
}());