/*global document,vis*/

// de base : http://visjs.org/examples/timeline/basicUsage.html
// contenu html : http://visjs.org/examples/timeline/items/htmlContents.html
// pour groupes : http://visjs.org/examples/timeline/groups/groups.html

// Create vars
var container, timeline, options, groups, items;

// Create a Timeline
container = document.getElementById('visualization');
timeline = new vis.Timeline(container);

// Configuration for the Timeline
options = {
  stack: false,
  height: '500px',
  min: new Date(1968, 0, 1),
  max: new Date(2020, 0, 1),
  zoomMin: 1000 * 60 * 60 * 24 * 31 * 12 * 10, // 10 ans
  zoomMax: 1000 * 60 * 60 * 24 * 31 * 12 * 75 // 75 ans
};
timeline.setOptions(options);

function sgorder(a, b) {
    return b.subgroupOrder - a.subgroupOrder;
}
groups = new vis.DataSet([
    {id: 0, content: "DUT", subgroupOrder: sgorder},
    {id: 1, content: "LP", subgroupOrder: sgorder},
    {id: 2, content: "FC", subgroupOrder: sgorder},
    {id: 3, content: "Autres", subgroupOrder: sgorder}
]);
timeline.setGroups(groups);


// Create a DataSet (allows two way data-binding)
items = new vis.DataSet([
    {id: 101, content: 'Pierre<br>Lecointe', start: '1968-09', end: '1975-08', type: 'background', className: 'periode'},
    {id: 102, content: 'Francis<br>Maurin', start: '1975-09', end: '1982-04', type: 'background', className: 'alterne'},
    {id: 103, content: 'Michèle<br>Maleus', start: '1982-05', end: '1986-08', type: 'background', className: 'periode'},
    {id: 104, content: 'Serge<br>Blumenthal', start: '1986-09', end: '1989-08', type: 'background', className: 'alterne'},
    {id: 105, content: 'Michèle<br>Maleus', start: '1989-09', end: '1996-06', type: 'background', className: 'periode'},
    {id: 106, content: 'Serge<br>Blumenthal', start: '1996-07', end: '2002-08', type: 'background', className: 'alterne'},
    {id: 107, content: 'Michel<br>Larmande', start: '2002-09', end: '2008-08', type: 'background', className: 'periode'},
    {id: 108, content: 'Guillaume<br>Bordry', start: '2008-09', end: '2010-12', type: 'background', className: 'alterne'},
    {id: 109, content: 'François-Xavier<br>Jollois', start: '2011-01', end: '2014-08', type: 'background', className: 'periode'},
    {id: 110, content: 'Florence<br>Muri', start: '2014-09', end: '2017-08', type: 'background', className: 'alterne'},
    {id: 111, content: 'Servane<br>Gey', start: '2017-09', end: '2020-08', type: 'background', className: 'periode'},
    
    {id: 1, group: 0, content: 'STQG', start: '1968-09', end: '1985-12-31', subgroup: '00', subgroupOrder: 0},
    {id: 2, group: 0, content: 'STID', start: '1986', end: '2009-12-31', subgroup: '00', subgroupOrder: 0},
    {id: 3, group: 0, content: 'STID*', start: '2009', end: '2021', subgroup: '00', subgroupOrder: 0},
    {id: 4, group: 0, content: 'Année Spéciale', start: '1986', end: '2014', subgroup: '01', subgroupOrder: 3},
    {id: 5, group: 0, content: '2A en alternance', start: '2015', end: '2021', subgroup: '02', subgroupOrder: 2},
  
    {id: 6, group: 1, content: 'Data-Mining', start: '2001', end: '2006-12-31', subgroup: '10', subgroupOrder: 0},
    {id: 7, group: 1, content: 'Alternance', start: '2007', end: '2021', subgroup: '10', subgroupOrder: 0},
    {id: 8, group: 1, content: 'Santé', start: '2006', end: '2014-12-31', subgroup: '11', subgroupOrder: 1},
    {id: 9, group: 1, content: 'Alternance', start: '2015', end: '2021', subgroup: '11', subgroupOrder: 1},
    
    {id: 10, group: 2, content: "Big data", start: '2014', end: '2021', subgroup: '20', subgroupOrder: 0},
    {id: 11, group: 2, content: "Dataviz", start: '2015', end: '2021', subgroup: '21', subgroupOrder: 1},
  
    {id: 12, group: 3, content: "concours Dataviz", start: '2015', end: '2021'}
]);
timeline.setItems(items);

