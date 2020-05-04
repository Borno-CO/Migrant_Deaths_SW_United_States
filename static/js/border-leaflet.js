// Map Center Coords
var map_center_lat = 31.763441
var map_center_long = -106.504839

  // Create street tile layer  
  var border_street_layer = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: mapbox_api_key
  });

  // Create satellite tile layer  
  var border_sat_layer = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.satellite",
  accessToken: mapbox_api_key
  });

  // Adding base maps
  var map_base_maps = {
    "Street View": border_street_layer,
    "Satellite View": border_sat_layer
    
    
  };
  
  // Creating Satellite Map for Border Crossings / Incidents

var southern_border_map = L.map("map", {
  // Center point - El Paso, Texas
  center: [map_center_lat, map_center_long],
  zoom: 5,
  layers: [border_street_layer]
});

L.control.layers(map_base_maps).addTo(southern_border_map);



// JSON Test file = '../../static/test-data/migrant_incidents_date_fix.json'
// Load Missing Migrants data to map
var migrant_API_link = "https://migrant-crossing-app.herokuapp.com/api/v1/migrant_incidents"
d3.json(migrant_API_link, function(migrant_southern_data) {
  console.log('Migrant Data response', migrant_southern_data)

  
  
  var incident_markers = L.markerClusterGroup();

    for (var data_index = 0; data_index < migrant_southern_data.length; data_index++) {
      var data_record = migrant_southern_data[data_index]
      var incident_coords = [data_record.rev_incident_lat, data_record.rev_incident_lng]
      var incident_location_tag = data_record.incident_lat
      
      // Create incident marker and pop-up
      if (incident_location_tag) {
        incident_markers.addLayer(L.marker([incident_coords[0], incident_coords[1]])
        .bindPopup(
          `<h2>${data_record.location_desc}*</h2>
          <h3 style="line-height: .5;">${data_record.date_reported}</h3>
          <hr/>
          <h3 style="line-height: .3;">Incident Summary</h3>
          <ul>
            <li>Total Fatalities: ${data_record.fatalities}</li>
            <li>Number of Male Casualties: ${data_record.male_casualties}</li>
            <li>Number of Female Casualties: ${data_record.female_casualties}</li>
            <li>Number of Child Casualties: ${data_record.child_casualties}</li>
            <li>Minimum Number of Individuals Missing: ${data_record.missing}</li>
            <li>Cause of Death: ${data_record.cause_of_death}</li>
            <li>Incident Coordinates: ${incident_coords[0]}, ${incident_coords[1]}</li>
          </ul>
          <hr/>
          <h3 style="line-height: .3;">Nearest Port Data</h3>
          <ul>
            <li>Nearest Port Location: ${data_record.nearest_port_name}, ${data_record.nearest_port_state}</li>
            <li>Nearest Port Coordinates: ${data_record.nearest_port_lat}, ${data_record.nearest_port_lng}</li>
          </ul>
          <hr/>
          <h3 style="line-height: .3;">Further Information</h3>
          <ul>
            <li>Source URL: ${data_record.url_desc}</li>
            <li>Source Description: ${data_record.source_desc}</li>
          </ul>
          <p>*The original dataset from which this data was retrieved was assembled from several sources of varying quality. Information regarding this incident might not be fully accurate or complete.</p>
          `
          ))}

          
          
      }
    // Send all markers to the cluster group
    southern_border_map.addLayer(incident_markers);
    
    
    


})

// JSON Test file = '../../static/test-data/summary_crossings.json'
var border_API_link = "https://migrant-crossing-app.herokuapp.com/api/v1/summary_crossings"

d3.json(border_API_link, function(border_southern_data) {
  console.log('Border Data response', border_southern_data)
  

  // Border Organizer stores all data containing the same port ID
  var border_organizer = {}
  var border_list = [border_organizer]
  for (var border_index = 0; border_index < border_southern_data.length; border_index++) {

    var border_record = border_southern_data[border_index]
    
    var port_code = border_record.port_code
    
  

    if (!border_organizer[port_code]) {
      border_organizer[port_code] = []
      border_organizer[port_code].push(border_record)
    } else {
      border_organizer[port_code].push(border_record)
    } 
    
  
  }
  

  // Unpacking sorted data into data_list
  var data_list = []
  
  border_list.forEach((port) => {

    // Iterate through each key/value
    Object.entries(port).forEach(([key, value]) => {
  
      // Add Values to data_list
      data_list.push(value)
    })
  })
  

  
  for (var port =0; port < data_list.length; port++) {
    // These arrays will store relevant yearly data for use below
    var port_loc = []
    var port_coords =[]
    var port_years = []
    var port_pedestrian_by_year = []
    var port_passenger_bus_by_year = []
    var port_passenger_train_by_year = []
    var port_passenger_personal_vehicle_by_year = []
    var port_passenger_any_by_year = []
    var port_total_peds_and_passengers_by_year = []
    var port_personal_vehicles_by_year = []
    var port_buses_by_year = []
    var port_trains_by_year = []
    var port_trucks_by_year = []
    var port_full_rail_containers_by_year = []
    var port_empty_rail_containers_by_year = []
    var port_full_truck_containers_by_year = []
    var port_empty_truck_containers_by_year = []
    var port_total_vehicle_count = []
    var port_total_container_count = []

    // Port Info will contain all items needed for the pop-ups
    var port_info = []
    
    // Add relevant items to data_list
    data_list[port].forEach(port_index => {
      port_loc.push(port_index.port_name, port_index.port_state, port_index.port_code)
      port_coords.push(port_index.port_lat, port_index.port_lng)
      port_years.push(parseInt(port_index.year_reported))
      port_pedestrian_by_year.push(port_index.pedestrian_x)
      port_passenger_bus_by_year.push(port_index.passenger_x_bus)
      port_passenger_train_by_year.push(port_index.passenger_x_train)
      port_passenger_personal_vehicle_by_year.push(port_index.passenger_x_personal_vehicle)
      port_passenger_any_by_year.push(port_index.passenger_x_any)
      port_total_peds_and_passengers_by_year.push(port_index.pedestrian_and_passenger_x)
      port_personal_vehicles_by_year.push(port_index.personal_vehicles)
      port_buses_by_year.push(port_index.buses)
      port_trains_by_year.push(port_index.trains)
      port_trucks_by_year.push(port_index.trucks)
      port_full_rail_containers_by_year.push(port_index.rail_containers_full)
      port_empty_rail_containers_by_year.push(port_index.rail_containers_empty)
      port_full_truck_containers_by_year.push(port_index.truck_containers_full)
      port_empty_truck_containers_by_year.push(port_index.truck_containers_empty)
      
      
    })
    // addingMachine will be used with the .reduce function to calculate sums of year data
    function addingMachine (total, number) {
      return total + Math.round(number)
    }

    // Find the first year of data recorded
    var earliest_year = Math.min(...port_years)

    // Find the latest year of data recorded
    var latest_year = Math.max(...port_years)
    
    // Sum all values

    // Pedestrians
    var total_port_pedestrian = port_pedestrian_by_year.reduce(addingMachine, 0)
    // Bus Passengers
    var total_port_passenger_bus = port_passenger_bus_by_year.reduce(addingMachine, 0)
    // Train Passengers
    var total_port_passenger_train = port_passenger_train_by_year.reduce(addingMachine, 0)
    // Personal Vehicle Passengers
    var total_port_passenger_personal_vehicle = port_passenger_personal_vehicle_by_year.reduce(addingMachine, 0)
    // Passengers of any vehicle
    var total_port_passenger_any = port_passenger_any_by_year.reduce(addingMachine, 0)
    // Pedestrians + Passengers
    var total_peds_and_passengers = port_total_peds_and_passengers_by_year.reduce(addingMachine, 0)
    // Personal Vehicles
    var total_personal_vehicles = port_personal_vehicles_by_year.reduce(addingMachine, 0)
    // Buses
    var total_buses = port_buses_by_year.reduce(addingMachine, 0)
    // Trains
    var total_trains = port_trains_by_year.reduce(addingMachine, 0)
    // Trucks
    var total_trucks = port_trucks_by_year.reduce(addingMachine, 0)
    // Full Rail Containers
    var total_full_rail_containers = port_full_rail_containers_by_year.reduce(addingMachine, 0)
    // Empty Rail Containers
    var total_empty_rail_containers = port_empty_rail_containers_by_year.reduce(addingMachine, 0)
    // Full Truck Containers
    var total_full_truck_containers = port_full_truck_containers_by_year.reduce(addingMachine, 0)
    // Empty Truck Containers
    var total_empty_truck_containers = port_empty_truck_containers_by_year.reduce(addingMachine, 0)
    
    // Sum total vehicles
    port_total_vehicle_count.push(
      total_personal_vehicles,
      total_buses,
      total_trains,
      total_trucks
    )
    
    var total_vehicle_count = port_total_vehicle_count.reduce(addingMachine, 0)

    // Sum total containers
    port_total_container_count.push(
      total_full_rail_containers,
      total_empty_rail_containers,
      total_full_truck_containers,
      total_empty_truck_containers
    )
    
    var total_container_count = port_total_container_count.reduce(addingMachine, 0)

    // Send all relevant data to port info
    port_info.push(
      port_loc, 
      port_coords, 
      earliest_year,
      latest_year,
      total_port_pedestrian,
      total_port_passenger_bus,
      total_port_passenger_train,
      total_port_passenger_personal_vehicle,
      total_port_passenger_any,
      total_peds_and_passengers,
      total_personal_vehicles,
      total_buses,
      total_trains, 
      total_trucks,
      total_vehicle_count,
      total_full_rail_containers,
      total_empty_rail_containers,
      total_full_truck_containers,
      total_empty_truck_containers,
      total_container_count
      )
    

    // These variables unpack the data list for use in the pop-up 
    var port_popup_loc = port_info[0]
    var port_popup_coords = port_info[1]
    var port_popup_earliest_year = port_info[2]
    var port_popup_latest_year = port_info[3]
    var port_popup_total_peds = port_info[4]
    var port_popup_total_pass_bus = port_info[5]
    var port_popup_total_pass_train = port_info[6]
    var port_popup_total_pass_personal = port_info[7]
    var port_popup_total_pass_all = port_info[8]
    var port_popup_total_peds_and_pass = port_info[9]
    var port_popup_total_personal = port_info[10]
    var port_popup_total_bus = port_info[11]
    var port_popup_total_train = port_info[12]
    var port_popup_total_truck = port_info[13]
    var port_popup_total_vehicles = port_info[14]
    var port_popup_total_full_rail = port_info[15]
    var port_popup_total_empty_rail = port_info[16]
    var port_popup_total_full_truck = port_info[17]
    var port_popup_total_empty_truck = port_info[18]
    var port_popup_total_containers = port_info[19]
   

    // Circle Marker color selections
    var circleoptions = {
      fillColor: "green",
      color: "black"
    }
  
    // Create border port circle-marker and pop-up
    L.circleMarker([port_popup_coords[0], port_popup_coords[1]], circleoptions).bindPopup(
      `<h2 style="line-height: .5; text-align: center;">BORDER PORT</h2> 
      <h2 style="line-height: .5; text-align: center;">${port_popup_loc[0]}, ${port_popup_loc[1]}</h2>
      <h3 style="line-height: .3; text-align: center;">Between ${port_popup_earliest_year} - ${port_popup_latest_year}</h3>
      <hr/>
      <h3 style="line-height: .3;">Total Inbound Crossing Statistics</h3>
      <ul>
        <li>Total Number of Individuals (Pedestrians and Passengers): ${port_popup_total_peds_and_pass}</li>
        <li>Total Number of Passengers: ${port_popup_total_pass_all}</li>
        <li>Total Number of Vehicles: ${port_popup_total_vehicles}</li>
        <li>Total Number of Shipping Containers: ${port_popup_total_containers}</li>
      </ul>
      <hr/>
      <h4 style="line-height: .3;">People (Pedestrians / Passengers)</h4>
      <ul>
        <li>Total Pedestrians: ${port_popup_total_peds}</li>
        <li>Total Personal Vehicle Passengers: ${port_popup_total_pass_personal}</li>
        <li>Total Bus Passengers: ${port_popup_total_pass_bus}</li>
        <li>Total Train Passengers: ${port_popup_total_pass_train}</li>
      </ul>
      <h4 style="line-height: .3;">Vehicles</h4>
      <ul>
        <li>Total Number of Personal Vehicles: ${port_popup_total_personal}</li>
        <li>Total Number of Buses: ${port_popup_total_bus}</li>
        <li>Total Number of Trains: ${port_popup_total_train}</li>
        <li>Total Number of Trucks: ${port_popup_total_truck}</li>
      </ul>
      <h4 style="line-height: .3;">Containers</h4>
      <ul>
        <li>Number of Rail Containers (Full): ${port_popup_total_full_rail}</li>
        <li>Number of Rail Containers (Empty): ${port_popup_total_empty_rail}</li>
        <li>Number of Truck Containers (Full): ${port_popup_total_full_truck}</li>
        <li>Number of Truck Containers (Empty): ${port_popup_total_empty_truck}</li>
      </ul>
      `
    ).addTo(southern_border_map)

  }
  
}) // // 



    
  



 