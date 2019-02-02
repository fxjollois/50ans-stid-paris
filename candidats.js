/*global d3*/

(function () {
    "use strict";
    
    var data = [
        { annee: "1998-1999", candidats:  504, inscrits:  95 },
        { annee: "1999-2000", candidats:  430, inscrits:  95 },
        { annee: "2000-2001", candidats:  445, inscrits:  85 },
        { annee: "2001-2002", candidats:  372, inscrits:  87 },
        { annee: "2002-2003", candidats:  407, inscrits:  92 },
        { annee: "2003-2004", candidats:  296, inscrits:  85 },
        { annee: "2004-2005", candidats:  283, inscrits:  89 },
        { annee: "2005-2006", candidats:  296, inscrits:  92 },
        { annee: "2006-2007", candidats:  291, inscrits:  92 },
        { annee: "2007-2008", candidats:  305, inscrits:  96 },
        { annee: "2008-2009", candidats:  322, inscrits: 101 },
        { annee: "2009-2010", candidats:  648, inscrits:  83 }, // 699
        { annee: "2010-2011", candidats:  436, inscrits:  92 }, // 806
        { annee: "2011-2012", candidats:  443, inscrits:  94 }, // 762
        { annee: "2012-2013", candidats:  590, inscrits:  96 }, // 754
        { annee: "2013-2014", candidats:  701, inscrits: 107 }, // 538 et 830
        { annee: "2014-2015", candidats:  801, inscrits:  99 },
        { annee: "2015-2016", candidats:  877, inscrits:  98 },
        { annee: "2016-2017", candidats:  943, inscrits:  95 },
        { annee: "2017-2018", candidats: 1051, inscrits:  99 },
        { annee: "2018-2019", candidats: 1201, inscrits: 102 }
    ],

        margin = {top: 20, right: 80, bottom: 70, left: 50},
        widthGlobal = d3.select("body").node().getBoundingClientRect().width,
        width = widthGlobal - margin.left - margin.right,
        heightGlobal = 400,
        height = heightGlobal - margin.top - margin.bottom,

        x = d3.scaleBand()
        .domain(data.map(function (e) { return e.annee.split("-")[0]; }))
        .range([0, width]),

        y = d3.scaleLinear()
        .domain([0, 1200]) // d3.max(data.map(function (e) { return e.candidats; }))])
        .range([height, 0]),

        line1 = d3.line()
        .x(function (d) { return x(d.annee.split("-")[0]) + x.bandwidth() / 2; })
        .y(function (d) { return y(d.candidats); }),

        line2 = d3.line()
        .x(function (d) { return x(d.annee.split("-")[0]) + x.bandwidth() / 2; })
        .y(function (d) { return y(d.inscrits); }),

        candidats = d3.select("#candidats").append("svg")
        .attr("width", widthGlobal)
        .attr("height", heightGlobal)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("width", width)
        .attr("height", height);

    candidats.append("g").selectAll(".horizontal")
        .data(y.ticks())
        .enter().append("line")
        .attr('class', 'horizontal')
        .attr('x1', x.range()[0])
        .attr('y1', function (e) { return y(e); })
        .attr('x2', x.range()[1])
        .attr('y2', function (e) { return y(e); });
    candidats.append("g").selectAll(".vertical")
        .data(x.domain())
        .enter().append("line")
        .attr('class', 'vertical')
        .attr('x1', function (e) { return x(e) + x.bandwidth() / 2; })
        .attr('y1', y.range()[0])
        .attr('x2', function (e) { return x(e) + x.bandwidth() / 2; })
        .attr('y2', y.range()[1]);

    candidats.append("path")
        .datum(data)
        .attr("class", "line lineC")
        .attr("d", line1);
    candidats.append("path")
        .datum(data)
        .attr("class", "line lineI")
        .attr("d", line2);
    
    candidats.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom().scale(x));
    candidats.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft().scale(y));
    
    // Pas très propre mais cela fonctionne
    candidats.append("text")
        .attr("class", "legende lineI")
        .attr("x", x(2018) + x.bandwidth() / 2 + 5)
        .attr("y", y(100))
        .attr("text-anchor", "start")
        .text("Inscrits");
    candidats.append("text")
        .attr("class", "legende lineC")
        .attr("x", x(2018) + x.bandwidth() / 2 + 5)
        .attr("y", y(1200))
        .attr("text-anchor", "start")
        .text("Candidats");
    // console.log(y1.ticks());
}());