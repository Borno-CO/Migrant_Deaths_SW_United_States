//Handle changes to dropdown
function optionChanged(id) {

  // Create summary crossing info

    d3.json("https://migrant-crossing-app.herokuapp.com/api/v1/summary_crossings",function(data) {
      console.log(id)
      var port_matches = data.filter(s => s.port_name.toString() === id)
      console.log(port_matches)

      port_years = []
      port_pops = []

      for (index = 0; index < port_matches.length; index ++) {
          var year_index = port_matches[index]
          var port_year = year_index.year_reported
          var port_pop = year_index.pedestrian_x
          port_years.push(port_year)
          port_pops.push(port_pop)
      }
    
      console.log(port_years)
      console.log(port_pops)

      var trace2 = {
        x: port_years,
        y: port_pops,
        type: "line"
      };
      
      var data = [trace2];
      
      var layout = {
        title: `Pedestrian Port Crossing for ${id}`,
        xaxis: {
          title: "Year"
        },
        yaxis: {
          title: "Number of Pedestrian Crossings"
        },
        width: 400
      };
      
      Plotly.newPlot("border-graph-tag", data, layout);

  })

  // Create migrant incident data
  d3.json("https://migrant-crossing-app.herokuapp.com/api/v1/migrant_incidents",function(myData) {
    console.log(id)
    var incident_matches = myData.filter(s => s.nearest_port_name.toString() === id)
    console.log(incident_matches)

    var result = [];
    incident_matches.reduce(function(res, value) {
      if (!res[value.year_reported]) {
        res[value.year_reported] = {year_reported: value.year_reported, casualties: 0};
        result.push(res[value.year_reported])
      }
      res[value.year_reported].casualties += value.casualties;
      return res;
    }, {});
    
    incidents_year = []
    incidents_cas = []

    console.log("Incident Year", incidents_year)
    console.log("Incident Cas", incidents_cas)

    for (y = 0; y < result.length; y++) {
      y_index = result[y]
      y_year = y_index.year_reported
      y_cas = y_index.casualties
      incidents_year.push(y_year)
      incidents_cas.push(y_cas)
    }

    var trace1 = {
      x: incidents_year,
      y: incidents_cas,
      type: "bar"
    };
    
    var data1 = [trace1];
    
    var layout1 = {
      title: `Migrant Casualties By Nearest Port of ${id}`,
      xaxis: {
        title: "Year"
      },
      yaxis: {
        title: "Casualties"
      }
    };
    
    Plotly.newPlot("migrant-graph-tag", data1, layout1);

})
}

// JSON test file '../../static/test-data/migrant_incidents_date_fix.json'
var migrant_API_link = "https://migrant-crossing-app.herokuapp.com/api/v1/migrant_incidents"

d3.json(migrant_API_link, function(incident_data) {


  var port_coord_organizer = []
  
  
  for (var nearest_port_index = 0; nearest_port_index < incident_data.length; nearest_port_index++) {

    var nearest_port_record = incident_data[nearest_port_index]
    
    var nearest_name = nearest_port_record.nearest_port_name
    var nearest_port_lat = nearest_port_record.nearest_port_lat
    var nearest_port_lng = nearest_port_record.nearest_port_lng
  

    if (port_coord_organizer.includes(nearest_name) === false) {
      port_coord_organizer.push(nearest_name)
      port_coord_organizer.push([nearest_port_lat, nearest_port_lng])
    } 
    
  
  }
  

  // Populate well with port data
  var select_Port_Values = d3
  .selectAll("#portSelection")
  .selectAll(`port`)
  .data(
    d3.map(incident_data, function(d){
      return d.nearest_port_name
    }).keys()
  )


  // FILTER DATA TO DISTINCT PORT VALUES
  select_Port_Values
  .enter()
  .append('option')
  .classed(`port`, true)
  .attr('value', function(d) {
      return d;
    })
  .text(function(d) {
      return `${d}`;
  })
  .exit()
  .remove()  

  // Select all dropdown items and fire updatePlotly on change
  d3.selectAll("#portSelection").on("change", update);

  function update() {
    var portMenu_selection = d3.select("#portSelection");
    var selected_Port = portMenu_selection.property("value");
    console.log(`Menu: Selection made for Port: ${selected_Port}`)
    
    function indexer (array) {
      return port_coord_organizer.indexOf(array)
    }

    var port_index_val = indexer(selected_Port)

    // data[port_index_value]
    var selected_port_coords = port_coord_organizer[port_index_val+1]
    console.log("coords for port:", selected_port_coords)

    // Handler event
    optionChanged(selected_Port)

  }
 

})

d3.json(migrant_API_link, function(incident_data) {

  // This function sends the incident data to dashboard-leaflet.js for plotting on the map
  sendIncidentsToLeaflet(incident_data)

})




// JSON test file = '../../static/test-data/summary_crossings.json'
var border_API_link = "https://migrant-crossing-app.herokuapp.com/api/v1/summary_crossings"

d3.json(border_API_link, function(port_data) {


  // This function sends the border data to dashboard-leaflet.js for plotting on the map
  sendBordersToLeaflet(port_data)
})

//Init page with default data 
function init() {
  var trace2 = {
    x: [2014,2015,2016,2017,2018],
    y: [3447437, 3542190, 3573992, 3016801, 3701135],
    type: "line"
  };
  
  var data = [trace2];
  
  var layout = {
    title: "Pedestrian Port Crossing for Laredo",
    xaxis: {
      title: "Year"
    },
    yaxis: {
      title: "Number of Pedestrian Crossings"
    },
    width: 400
  };
  
  Plotly.newPlot("border-graph-tag", data, layout);
}

var trace1 = {
  x: [2015,2016,2017,2018,2019],
  y: [19,107,88,74,4],
  type: "bar"
};

var data1 = [trace1];

var layout1 = {
  title: "Migrant Casualties By Nearest Port of Laredo",
  xaxis: {
    title: "Year"
  },
  yaxis: {
    title: "Casualties"
  }
};

Plotly.newPlot("migrant-graph-tag", data1, layout1);

init();


