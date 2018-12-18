/*global d3,console*/

var margin = {top: 40, right: 0, bottom: 40, left: 0},
    widthGlobal = 1200,
    width = widthGlobal - margin.left - margin.right,
    heightGlobal = 500,
    height = heightGlobal - margin.top - margin.bottom,
    fin = new Date(2020, 12, 31),
    
    //scales
	x = d3.scaleTime()
        .domain([new Date(1968, 9, 1), fin])
        .range([0, width]),
    xAxis = d3.axisBottom()
        .scale(x)
		// .ticks(50)
		//.tickFormat(formatNumber)
		// .orient("bottom")
,
    
    y = d3.scaleBand()
        .domain(["DUT", "DUT AS", "DUT FA", "LP 1", "LP 2", "DU 1", "DU 2", "Autres 1", "Autres 2"])
        .rangeRound([0, height])
        .paddingInner([0.1])
        .paddingOuter([0.1]),
    
    // div
    svg = d3.select("#timeline")
        .append("svg")
        .attr("width", widthGlobal)
        .attr("height", heightGlobal),
    timeline = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("width", width)
        .attr("height", height),
    
    // chefs de dep
    chefs = [
        {content: 'Pierre Lecointe', start: new Date(1968, 9, 1), end: new Date(1975, 8, 31), classe: 'periode'},
        {content: 'Francis Maurin', start: new Date(1975, 9, 1), end: new Date(1982, 4, 30), classe: 'alterne'},
        {content: 'Michèle Maleus', start: new Date(1982, 5, 1), end: new Date(1986, 8, 31), classe: 'periode'},
        {content: 'Serge Blumenthal', start: new Date(1986, 9, 1), end: new Date(1989, 8, 31), classe: 'alterne'},
        {content: 'Michèle Maleus', start: new Date(1989, 9, 1), end: new Date(1996, 6, 30), classe: 'periode'},
        {content: 'Serge Blumenthal', start: new Date(1996, 7, 1), end: new Date(2002, 8, 31), classe: 'alterne'},
        {content: 'Michel Larmande', start: new Date(2002, 9, 1), end: new Date(2008, 8, 31), classe: 'periode'},
        {content: 'Guillaume Bordry', start: new Date(2008, 9, 1), end: new Date(2010, 12, 31), classe: 'alterne'},
        {content: 'François-Xavier Jollois', start: new Date(2011, 1, 1), end: new Date(2014, 8, 31), classe: 'periode'},
        {content: 'Florence Muri', start: new Date(2014, 9, 1), end: new Date(2017, 8, 31), classe: 'alterne'},
        {content: 'Servane Gey', start: new Date(2017, 9, 1), end: fin, classe: 'periode'}
    ],
    // Data
    items = [
        {group: "DUT", content: 'STQG', start: new Date(1968, 9, 1), end: new Date(1985, 12, 31), classe: "DUT"},
        {group: "DUT", content: 'STID', start: new Date(1986, 1, 1), end: new Date(2008, 12, 31), classe: "DUT"},
        {group: "DUT", content: 'STID*', start: new Date(2009, 1, 1), end: fin, classe: "DUT"},
        {group: "DUT AS", content: 'Année Spéciale', start: new Date(1986, 9, 1), end: new Date(2014, 8, 31), classe: "DUT"},
        {group: "DUT FA", content: 'Alternance', start: new Date(2015, 9, 1), end: fin, classe: "DUT"},
        
        {group: "LP 1", content: 'Data-Mining', start: new Date(2001, 9, 1), end: new Date(2007, 8, 31), classe: "LP"},
        {group: "LP 1", content: 'Alternance', start: new Date(2007, 9, 1), end: fin, classe: "LP"},
        {group: "LP 2", content: 'Santé', start: new Date(2006, 9, 1), end: new Date(2015, 8, 31), classe: "LP"},
        {group: "LP 2", content: 'Alternance', start: new Date(2015, 9, 1), end: fin, classe: "LP"},
        
        {group: "DU 1", content: "Big data", start: new Date(2014, 1, 1), end: fin, classe: "DU"},
        {group: "DU 2", content: "Dataviz", start: new Date(2015, 1, 1), end: fin, classe: "DU"},
  
        {group: "Autres 1", content: "Concours Dataviz", start: new Date(2015, 5, 18), end: fin, classe: "autre"},
        {group: "Autres 2", content: "Réunion anciens", start: new Date(2008, 1, 1), end: fin, classe: "autre"}
    ];

timeline.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

timeline.append("g").selectAll(".chef")
    .data(chefs)
    .enter().append("rect")
    .attr("class", function (d) { return "chef " + d.classe; })
    .attr("x", function (d) {return x(d.start); })
    .attr("y", 0)
    .attr("width", function (d) {return x(d.end) - x(d.start); })
    .attr("height", height);
timeline.append("g").selectAll(".chef")
    .data(chefs)
    .enter().append("text")
    .attr("class", function (d) { return "chef-text " + d.classe; })
    .attr("x", function (d) {return x(d.start); })
    .attr("y", function (d) { if (d.classe == "periode") { return -5; } else { return -20; }})
    .html(function (d) { return d.content; });

timeline.append("text")
    .attr("class", "infos")
    .attr("x", 5)
    .attr("y", y("DUT FA") - y.step()/2)
    .html("DUT")
timeline.append("text")
    .attr("class", "infos")
    .attr("x", 5)
    .attr("y", y("LP 2"))
    .html("Licences Professionnelles")
timeline.append("text")
    .attr("class", "infos")
    .attr("x", 5)
    .attr("y", y("DU 2"))
    .html("Diplôme d'Université (FC)")
timeline.append("text")
    .attr("class", "infos")
    .attr("x", 5)
    .attr("y", y("Autres 2"))
    .html("Autres évènements")

function separation(fois) {
    return (fois + y.paddingOuter() - .05) * y.step()
}
timeline.append("g").selectAll(".separation")
    .data([3, 5, 7])
    .enter().append("line")
    .attr('class', 'separation')
    .attr('x1', x.range()[0])
    .attr('y1', function(d) { return separation(d); })
    .attr('x2', x.range()[1])
    .attr('y2', function(d) { return separation(d); });

timeline.append("g").selectAll(".item")
    .data(items)
    .enter().append("rect")
    .attr("class", function (d) { return "item " + d.classe; })
    .attr("x", function (d) {return x(d.start); })
    .attr("y", function (d) {return y(d.group); })
    .attr("width", function (d) {return x(d.end) - x(d.start); })
    .attr("height", y.bandwidth());
timeline.append("g").selectAll(".item")
    .data(items)
    .enter().append("text")
    .attr("class", "item-text")
    .attr("x", function (d) {return x(d.start) + 5; })
    .attr("y", function (d) {return y(d.group) + y.bandwidth() / 2; })
    .html(function (d) { return d.content; });


