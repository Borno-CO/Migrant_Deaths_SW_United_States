// =============================================================================
// =============================================================================
// CREATE BUBBLE CHART (THIS CHART WILL NOT BE UPDATED)
// =============================================================================
var portBubbles = document.getElementById('ports');

var portData = {
    datasets: [{
            label: ["Andrade"],
            backgroundColor: "rgba(255,140,0,0.2",
            borderColor: "rgba(255,140,0,1)",
            hoverBackgroundColor: "rgba(124,252,0,0.2)",
            hoverBorderColor: "rgba(34,139,34,1)",
            hoverBorderWidth: 5,
            hoverRadius: 5,
            data: [{
                x: 69741,
                y: .07,
                r: .6    
            }]
        },  {
            label: ["Boquillas"],
            backgroundColor: "rgba(255,0,0,0.2",
            borderColor: "rgba(255,0,0,1)",
            hoverBackgroundColor: "rgba(124,252,0,0.2)",
            hoverBorderColor: "rgba(34,139,34,1)",
            hoverBorderWidth: 5,
            hoverRadius: 5,
            data: [{
                x: 726,
                y: .3,
                r: 4.2    
            }]
        },  {
            label: ["Brownsville"],
            backgroundColor: "rgba(0,255,0,0.2",
            borderColor: "rgba(0,255,0,1)",
            hoverBackgroundColor: "rgba(124,252,0,0.2)",
            hoverBorderColor: "rgba(34,139,34,1)",
            hoverBorderWidth: 5,
            hoverRadius: 5,
            data: [{
                x: 212730,
                y: .27,
                r: 3.2    
            }]
        }, {
            label: ["Calexico"],
            backgroundColor: "rgba(30,144,255,0.2",
            borderColor: "rgba(30,144,255,1)",
            hoverBackgroundColor: "rgba(124,252,0,0.2)",
            hoverBorderColor: "rgba(34,139,34,1)",
            hoverBorderWidth: 5,
            hoverRadius: 5,
            data: [{
                x: 359390,
                y: .47,
                r: 5.6  
            }]
        }, {
            label: ["Calexico East"],
            backgroundColor: "rgba(255,255,0,0.2",
            borderColor: "rgba(244,164,96,1)",
            hoverBackgroundColor: "rgba(124,252,0,0.2)",
            hoverBorderColor: "rgba(34,139,34,1)",
            hoverBorderWidth: 5,
            hoverRadius: 5,
            data: [{
                x: 22477,
                y: .32,
                r: 3.8   
            }]
        },{
            label: ["Columbus"],
            backgroundColor: "rgba(30,144,255,0.2",
            borderColor: "rgba(30,144,255,1)",
            hoverBackgroundColor: "rgba(124,252,0,0.2)",
            hoverBorderColor: "rgba(34,139,34,1)",
            hoverBorderWidth: 5,
            hoverRadius: 5,
            data: [{
                x: 23094,
                y: .07,
                r: .6     
            }]
        }, {
            label: ["Cross Border Xpress"],
            backgroundColor: "rgba(192,192,192,0.2",
            borderColor: "rgba(192,192,192,1)",
            hoverBackgroundColor: "rgba(124,252,0,0.2)",
            hoverBorderColor: "rgba(34,139,34,1)",
            hoverBorderWidth: 5,
            hoverRadius: 5,
            data: [{
                x: 26039,
                y: 0,
                r: .4       
            }]
        }, {
            label: ["DelRio"],
            backgroundColor: "rgba(205,133,63,0.2",
            borderColor: "rgba(205,133,63,1)",
            hoverBackgroundColor: "rgba(124,252,0,0.2)",
            hoverBorderColor: "rgba(34,139,34,1)",
            hoverBorderWidth: 5,
            hoverRadius: 5,
            data: [{
                x: 13207,
                y: 2.57,
                r: 3.4   
            }]
        },{
            label: ["Douglas"],
            backgroundColor: "rgba(220,20,60,0.2",
            borderColor: "rgba(220,20,60,1)",
            hoverBackgroundColor: "rgba(124,252,0,0.2)",
            hoverBorderColor: "rgba(34,139,34,1)",
            hoverBorderWidth: 5,
            hoverRadius: 5,
            data: [{
                x: 77244,
                y: .07,
                r: .8   
            }]
        },{
            label: ["EaglePass"],
            backgroundColor: "rgba(64,224,208,0.3",
            borderColor: "rgba(64,224,208,1)",
            hoverBackgroundColor: "rgba(124,252,0,0.2)",
            hoverBorderColor: "rgba(34,139,34,1)",
            hoverBorderWidth: 5,
            hoverRadius: 5,
            data: [{
                x: 69301,
                y: 1.62,
                r: 16  
            }]
        }, {
            label: ["El Paso"],
            backgroundColor: "rgba(0,255,127,0.2",
            borderColor: "rgba(0,255,127,1)",
            hoverBackgroundColor: "rgba(124,252,0,0.2)",
            hoverBorderColor: "rgba(34,139,34,1)",
            hoverBorderWidth: 5,
            hoverRadius: 5,
            data: [{
                x: 575915,
                y: .25,
                r: 2.4   
            }]
        },{
            label: ["Hidalgo"],
            backgroundColor: "rgba(148,0,211,0.2",
            borderColor: "rgba(148,0,211,1)",
            hoverBackgroundColor: "rgba(124,252,0,0.2)",
            hoverBorderColor: "rgba(34,139,34,1)",
            hoverBorderWidth: 5,
            hoverRadius: 5,
            data: [{
                x: 192266,
                y: 2.32,
                r: 22.8   
            }]
        },{
            label: ["Laredo"],
            backgroundColor: "rgba(0,128,0,0.2)",
            borderColor: "rgba(0,128,0,1)",
            opacity: .5,
            hoverBackgroundColor: "rgba(124,252,0,0.2)",
            hoverBorderColor: "rgba(34,139,34,1)",
            hoverBorderWidth: 5,
            hoverRadius: 5,
            data: [{
                x: 288026,
                y: 4.73,
                r: 20.6   
            }]
        }, {
            label: ["Lukeville"],
            backgroundColor: "#rgba(0,0,255,0.2)",
            borderColor: "#rgba(0,0,255,1)",
            opacity: .5,
            hoverBackgroundColor: "rgba(124,252,0,0.2)",
            hoverBorderColor: "rgba(34,139,34,1)",
            hoverBorderWidth: 5,
            hoverRadius: 5,
            data: [{
                x: 3815,
                y: 5.3,
                r: 63.4   
            }]
        }, {
            label: ["Naco"],
            backgroundColor: "rgba(255,99,71,0.2",
            borderColor: "rgba(255,99,71,1)",
            hoverBackgroundColor: "rgba(124,252,0,0.2)",
            hoverBorderColor: "rgba(34,139,34,1)",
            hoverBorderWidth: 5,
            hoverRadius: 5,
            data: [{
                x: 8283,
                y: .15,
                r: 1.8     
            }]
        }, {
            label: ["Nogales"],
            backgroundColor: "rgba(112,128,144,0.2",
            borderColor: "rgba(112,128,144,1)",
            hoverBackgroundColor: "rgba(124,252,0,0.2)",
            hoverBorderColor: "rgba(34,139,34,1)",
            hoverBorderWidth: 5,
            hoverRadius: 5,
            data: [{
                x: 270177,
                y: .27,
                r: 3.2     
            }]
        }, {
            label: ["Otay Mesa"],
            backgroundColor: "rgba(255,20,147,0.2",
            borderColor: "rgba(255,20,147,1)",
            hoverBackgroundColor: "rgba(124,252,0,0.2)",
            hoverBorderColor: "rgba(34,139,34,1)",
            hoverBorderWidth: 5,
            hoverRadius: 5,
            data: [{
                x: 284751,
                y: .28,
                r: 2.6     
            }]
        }, {
            label: ["Presidio"],
            backgroundColor: "rgba(154,205,50,0.2",
            borderColor: "rgba(154,205,50,1)",
            hoverBackgroundColor: "rgba(124,252,0,0.2)",
            hoverBorderColor: "rgba(34,139,34,1)",
            hoverBorderWidth: 5,
            hoverRadius: 5,
            data: [{
                x: 9658,
                y: .2,
                r: 1.8     
            }]
        }, {
            label: ["Progresso"],
            backgroundColor: "rgba(255,0,255,0.2",
            borderColor: "rgba(255,0,255,1)",
            hoverBackgroundColor: "rgba(124,252,0,0.2)",
            hoverBorderColor: "rgba(34,139,34,1)",
            hoverBorderWidth: 5,
            hoverRadius: 5,
            data: [{
                x: 70538,
                y: .55,
                r: 6.6       
            }]
        }, {
            label: ["Rio Grande City"],
            backgroundColor: "rgba(218,165,32,0.3)",
            borderColor: "rgba(218,165,32,1)",
            opacity: .5,
            hoverBackgroundColor: "rgba(124,252,0,0.2)",
            hoverBorderColor: "rgba(34,139,34,1)",
            hoverBorderWidth: 5,
            hoverRadius: 5,
            data: [{
                x: 4957,
                y: 2.98,
                r: 21.4   
            }]
        }, {
            label: ["Roma"],
            backgroundColor: "#ac78df",
            borderColor: "#663399",
            opacity: .5,
            hoverBackgroundColor: "rgba(124,252,0,0.2)",
            hoverBorderColor: "rgba(34,139,34,1)",
            hoverBorderWidth: 5,
            hoverRadius: 5,
            data: [{
                x: 20124,
                y: .183,
                r: 1.8   
            }]
        }, {
            label: ["San Luis"],
            backgroundColor: "rgba(0,0,0,0.2)",
            borderColor: "rgba(0,0,0,1)",
            opacity: .5,
            hoverBackgroundColor: "rgba(124,252,0,0.2)",
            hoverBorderColor: "rgba(34,139,34,1)",
            hoverBorderWidth: 5,
            hoverRadius: 5,
            data: [{
                x: 208489,
                y: .67,
                r: .8   
            }]
        }, {
            label: ["San Ysidro"],
            backgroundColor: "rgba(0,0,128,0.2",
            borderColor: "rgba(0,0,128,1)",
            hoverBackgroundColor: "rgba(124,252,0,0.2)",
            hoverBorderColor: "rgba(34,139,34,1)",
            hoverBorderWidth: 5,
            hoverRadius: 5,
            data: [{
                x: 667977,
                y: .133,
                r: 1.2        
            }]
        }, {
            label: ["Santa Teresa"],
            backgroundColor: "rgba(193,46,12,0.2",
            borderColor: "rgba(193,46,12,1)",
            hoverBackgroundColor: "rgba(124,252,0,0.2)",
            hoverBorderColor: "rgba(34,139,34,1)",
            hoverBorderWidth: 5,
            hoverRadius: 5,
            data: [{
                x: 12925,
                y: .02,
                r: .2       
            }]
        }, {
            label: ["Sasabe"],
            backgroundColor: "rgba(255,165,0,0.2",
            borderColor: "rgba(255,165,0,1)",
            hoverBackgroundColor: "rgba(124,252,0,0.2)",
            hoverBorderColor: "rgba(34,139,34,1)",
            hoverBorderWidth: 5,
            hoverRadius: 5,
            data: [{
                x: 70,
                y: 5.38,
                r: 64        
            }]
        }, {
            label: ["Tecate"],
            backgroundColor: "rgba(0,250,154,0.2",
            borderColor: "rgba(0,250,154,1)",
            hoverBackgroundColor: "rgba(124,252,0,0.2)",
            hoverBorderColor: "rgba(34,139,34,1)",
            hoverBorderWidth: 5,
            hoverRadius: 5,
            data: [{
                x: 60579,
                y: .2,
                r: 1.8        
            }]
        }, {
            label: ["Tornillo-Fabens"],
            backgroundColor: "rgba(0,100,0,0.2",
            borderColor: "rgba(0,100,0,1)",
            hoverBackgroundColor: "rgba(124,252,0,0.2)",
            hoverBorderColor: "rgba(34,139,34,1)",
            hoverBorderWidth: 5,
            hoverRadius: 5,
            data: [{
                x: 3240,
                y: .133,
                r: 1.4        
            }]
        }]  
};

// object holding styling options for bubble chart
var options = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
        display: false
     },
    title: {
        display: true,
        fontFamily: 'Arial',
            fontSize: 16,
            fontColor: 'darkslategray',
            text: ['Ports of Entry on the Southern U.S. Border', '( pedestrian crossings/mo,  deaths/mo,  incidents/yr )', '2014 - 2018']
      }, scales: {
            yAxes: [{ 
                scaleLabel: {
                    display: true,
                    fontFamily: 'Arial',
                    fontSize: 14,
                    fontStyle: 'bold',
                    fontColor: 'darkslategray',
                    labelString: "Migrant Deaths per Month"
                },
                ticks: {
                    display: true,
                    fontFamily: 'Arial',
                    fontSize: 16,
                    fontColor: 'darkslategray',
                }
            }],
            xAxes: [{ 
                scaleLabel: {
                    display: true,
                    fontFamily: 'Arial',
                    fontSize: 14,
                    fontStyle: 'bold',
                    fontColor: 'darkslategray',
                    labelString: "Pedestrian Crossings per Month",
                    ticks: {
                        display: true,
                        fontFamily: 'Arial',
                        fontSize: 16,
                        fontColor: 'darkslategray',
                    }
                }
            }]
      }
};

// generate the chart
var bubbleChart = new Chart(portBubbles, {
    type: 'bubble',
    data: portData,
    options: options
});


// =============================================================================
// =============================================================================
// CREATE DROP DOWN MENU OF PORT NAMES
// =============================================================================

var port_names = [];

var crossings_API_link = "https://migrant-crossing-app.herokuapp.com/api/v1/summary_crossings";

d3.json(crossings_API_link).then(function(xData) {

    xData.forEach(function(data) {
        port = data.port_name
        if (port_names.indexOf(port) === -1) {
            port_names.push(port);
        }
    });

    port_names.sort();
    
    // Get dropdown element from DOM
    var dropdown = document.getElementById("selDataset");

    /* check to see if there are select options present, if so then remove
        this prevents adding redundant (duplicate) options to the dropdown menu */
    if (dropdown.length > 0) {
        for (var i = 0; i < dropdown.length; i++) {
            dropdown.remove(0);
        };
    };

    // create option elements
    var option = document.createElement("option");
    // Loop through the names array to populate dropdown options
    for (var i = 0; i < port_names.length; ++i) {
        // Append the option to the end of the dropdown element
        dropdown.add( new Option(port_names[i]));
    };
});





// =============================================================================
// =============================================================================
// INITIALIZE STACKED LINE CHART
// =============================================================================
var myLineChart = null;

function initLineChart () {
    var crossings_API_link = "https://migrant-crossing-app.herokuapp.com/api/v1/summary_crossings";

    // get the crossings data
    d3.json(crossings_API_link).then(function(crossingData) {
    
        // create empty objects to hold required data extracted from json object
        var female_fatalities = {};
        var male_fatalities = {};
        var total_fatalities = {};
        var unknown_sex = [];
        var years = [];

        // iterate through the json data and populate objects with appropriate data
        crossingData.forEach(function(crossings_data) {
            var year = crossings_data.year_reported;
            if (year in years) {
            } else {
                years.push(year);
            }
            if (crossings_data.female_casualties != null) {
                if (year in female_fatalities) {
                    female_fatalities[year] += Number(crossings_data.female_casualties);
                } else {
                    female_fatalities[year] = Number(crossings_data.female_casualties);
                }
            } 
            if (crossings_data.male_casualties != null) {
                if (year in male_fatalities) {
                    male_fatalities[year] += Number(crossings_data.male_casualties);
                } else {
                    male_fatalities[year] = Number(crossings_data.male_casualties);
                }
            }
            if (crossings_data.casualties != null) {
                if (year in total_fatalities) {
                    total_fatalities[year] += Number(crossings_data.casualties);
                } else {
                    total_fatalities[year] = Number(crossings_data.casualties);
                }
            }
            if (crossings_data.casualties != null) {
                if (year in unknown_sex) {
                    unknown_sex[year] += (Number(crossings_data.casualties) - Number(crossings_data.female_casualties) - Number(crossings_data.male_casualties));
                } else {
                    unknown_sex[year] = (Number(crossings_data.casualties) - Number(crossings_data.female_casualties) - Number(crossings_data.male_casualties));
                }
            }
        });

        // create chart variables
        var allPort_labels = Object.keys(female_fatalities);
        var allPort_female_fatalities = Object.values(female_fatalities);
        var allPort_male_fatalities = Object.values(male_fatalities);
        // var allPort_fatalities = Object.values(total_fatalities);
        var allPort_unknown_sex = Object.values(unknown_sex);
    
        // set chart location to variable 
        var ctx = document.getElementById('fatalities').getContext("2d");

        // construct colors
        const colors = {
            graytone: {
            fill: 'rgba(220,220,220,1)',
            stroke: 'rgba(105,105,105,1)',
            },
            lightBlue: {
                stroke: '#6fccdd',
            },
            redtone: {
            fill: 'rgba(240,128,128,1)',
            stroke: 'rgba(205,92,92,1)',
            },
            purpletone: {
            fill: '#8fa8c8',
            stroke: '#75539e',
            },
        };

        // create chart
        const LineChart = new Chart(ctx, {
            type: 'line',
            data: {
            labels: allPort_labels,
            datasets: [{
                label: "Male",
                fill: true,
                backgroundColor: colors.purpletone.fill,
                pointBackgroundColor: colors.purpletone.stroke,
                borderColor: colors.purpletone.stroke,
                pointHighlightStroke: colors.purpletone.stroke,
                borderCapStyle: 'butt',
                data: allPort_male_fatalities,
        
                }, {
                label: "Female",
                fill: true,
                backgroundColor: colors.redtone.fill,
                pointBackgroundColor: colors.redtone.stroke,
                borderColor: colors.redtone.stroke,
                pointHighlightStroke: colors.redtone.stroke,
                borderCapStyle: 'butt',
                data: allPort_female_fatalities,
            }, {
                label: "Sex Not Determined",
                fill: true,
                backgroundColor: colors.graytone.fill,
                pointBackgroundColor: colors.graytone.stroke,
                borderColor: colors.graytone.stroke,
                pointHighlightStroke: colors.graytone.stroke,
                borderCapStyle: 'butt',
                data: allPort_unknown_sex,
            }]
            },
            options: {
                responsive: true,
                // maintainAspectRatio: false,
                title: {
                    display: true,
                    fontFamily: 'Arial',
                    fontSize: 16,
                    fontColor: 'darkslategray',
                    text: ['Migrant Fatalities - 2014-2018', 'All Ports Combined'],
                    }, 
                scales: {
                    yAxes: [{
                    stacked: true,
                    scaleLabel: {
                        display: true,
                        fontFamily: 'Arial',
                        fontSize: 14,
                        fontStyle: 'bold',
                        fontColor: 'darkslategray',
                        labelString: "Deaths per Year"
                        }   
                    }]
                },
                animation: {
                    duration: 750,
                },
            }
        });
    });
};


// =============================================================================
// =============================================================================
// INITIALIZE PIE CHART
// =============================================================================

var myPieChart = null;

function initPieChart () {

    var incidents_API_link = "https://migrant-crossing-app.herokuapp.com/api/v1/migrant_incidents";

    // get the migrant incident data
    d3.json(incidents_API_link).then(function(migrantData) {

        // create empty object to hold cause-of-death data
        var total_causes = {};

        // iterate through the migrant data and collect the cause-of-death data
        migrantData.forEach(function(migrant_data) {

            var sum_cause = migrant_data.cause_of_death_category;
            // console.log(`sum_cause: ${sum_cause}`);
            
            if (sum_cause.toLowerCase() in total_causes) {
                total_causes[sum_cause.toLowerCase()] += Number(migrant_data.fatalities);
            } else {
                total_causes[sum_cause.toLowerCase()] = Number(migrant_data.fatalities);
            }
            
        });
        
        // create variables holding data for the charts
        var total_cause_labels = Object.keys(total_causes);
        var total_cause_fatalities = Object.values(total_causes);
 
        // create the chart
        const PieChart = new Chart(document.getElementById("causeDeath"), {
            type: 'pie',
            data: {
            labels: total_cause_labels,
            datasets: [{
                label: "2014-2018 Fatalities", 
                backgroundColor: ["#B0C4DE", "#3e95cd", "#3cba9f", "#c45850", "#FFD700", "#e8c3b9", "#00FFFF", "#7CFC00", "#8e5ea2", "#FF4500"],
                data: total_cause_fatalities
            }]
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    fontFamily: 'Arial',
                    fontSize: 16,
                    fontColor: 'darkslategray',
                    text: ['Cause of Death - 2014-2018', 'All Ports Combined'],
                }
            }
        });
    });
};


// =============================================================================
// =============================================================================
// EVENT HANDLER
// =============================================================================

// event listener to invoke handler function on change of dropdown menu
d3.selectAll("#selDataset").on("change", optionChanged);

// event handler function to update line chart and pie chart
function optionChanged(value) {
    
    // Assign the value of the dropdown menu option to a variable
    var dataset = this.value;


    // =============================================================================
    // =============================================================================
    // UPDATE STACKED LINE CHART
    // =============================================================================

    var crossings_API_link = "https://migrant-crossing-app.herokuapp.com/api/v1/summary_crossings";

    // get crossings data
    d3.json(crossings_API_link).then(function(xData) {
    
        // initialize empty objects to hold required data
        var females = 0;
        var males = 0;
        var total_deaths = 0;
        var unknowns = 0;
        var year_reported = 0;
        var female_fatalities = [];
        var male_fatalities = [];
        var total_fatalities = [];
        var unknown_sex = [];
        var years = [];
        var port_selected = [];
        
        // iterate through the crossings data to collect the data for the selected port
        xData.forEach(function(data) {
            if(data.port_name === dataset) {
                port_selected = data.port_name;
                // females = data.female_casualties;
                if (data.female_casualties === null) {
                    females = 0;
                } else {
                    females = data.female_casualties;
                };
                // males = data.male_casualties
                if (data.male_casualties === null) {
                    males = 0;
                } else {
                    males = data.male_casualties;
                };
                // total_deaths = data.fatalities;
                if (data.fatalities === null) {
                    total_deaths = 0;
                } else {
                    total_deaths = data.fatalities;
                };
                unknowns = total_deaths - females - males;
                year_reported = data.year_reported;
                female_fatalities.push(females);
                male_fatalities.push(males);
                total_fatalities.push(total_deaths);
                unknown_sex.push(unknowns);     
                years.push(year_reported);
            };
        });
        

        function newLineChart(lineLabels, maleLines, femaleLines, unknownLines) {

            // set the chart location to a variable    
            var ctx = document.getElementById('fatalities').getContext("2d");

            // construct the colors
            const colors = {
                graytone: {
                fill: 'rgba(220,220,220,1)',
                stroke: 'rgba(105,105,105,1)',
                },
                lightBlue: {
                    stroke: '#6fccdd',
                },
                redtone: {
                fill: 'rgba(240,128,128,1)',
                stroke: 'rgba(205,92,92,1)',
                },
                purpletone: {
                fill: '#8fa8c8',
                stroke: '#75539e',
                },
            };

            // set default styling
            Chart.defaults.global.defaultFontFamily = "Arial";
            Chart.defaults.global.defaultFontSize = 16; 

            // create the new line chart
            new Chart(ctx, {
                type: 'line',
                data: {
                labels: lineLabels,
                datasets: [{
                    label: "Male",
                    fill: true,
                    backgroundColor: colors.purpletone.fill,
                    pointBackgroundColor: colors.purpletone.stroke,
                    borderColor: colors.purpletone.stroke,
                    pointHighlightStroke: colors.purpletone.stroke,
                    borderCapStyle: 'butt',
                    data: maleLines,
            
                }, {
                    label: "Female",
                    fill: true,
                    backgroundColor: colors.redtone.fill,
                    pointBackgroundColor: colors.redtone.stroke,
                    borderColor: colors.redtone.stroke,
                    pointHighlightStroke: colors.redtone.stroke,
                    borderCapStyle: 'butt',
                    data: femaleLines,
                }, {
                    label: "Sex Not Determined",
                    fill: true,
                    backgroundColor: colors.graytone.fill,
                    pointBackgroundColor: colors.graytone.stroke,
                    borderColor: colors.graytone.stroke,
                    pointHighlightStroke: colors.graytone.stroke,
                    borderCapStyle: 'butt',
                    data: unknownLines,
                }]
                },
                options: {
                    responsive: true,
                    // maintainAspectRatio: false,
                    title: {
                        display: true,
                        fontFamily: 'Arial',
                        fontSize: 16,
                        fontColor: 'darkslategray',
                        text: ['Migrant Fatalities Nearest to ',port_selected],
                        // text: 'Migrant Fatalities',
                        }, 
                    scales: {
                        yAxes: [{
                        stacked: true,
                        scaleLabel: {
                            display: true,
                            fontFamily: 'Arial',
                            fontSize: 14,
                            fontStyle: 'bold',
                            fontColor: 'darkslategray',
                            labelString: "Deaths per Year"
                            }   
                        }]
                    },
                    animation: {
                        duration: 750,
                    },
                }
            });
        }
        document.getElementById("line-chart").innerHTML = '&nbsp;';
        document.getElementById("line-chart").innerHTML = '<canvas id="fatalities" width="500" height="350"></canvas>'; 
        window.setTimeout(newLineChart(years, male_fatalities, female_fatalities, unknown_sex), 500);
    });

    
    // =============================================================================
    // =============================================================================
    // UPDATE PIE CHART
    // =============================================================================

    var incidents_API_link = "https://migrant-crossing-app.herokuapp.com/api/v1/migrant_incidents";

    // get the migrant incident data
    d3.json(incidents_API_link).then(function(inData) {

        // create empty objects to hold the data for the selected port
        var causes = {};
        var nearest_port = [];

        // iterate through the incident data and collect cause-of-death data for selected port
        inData.forEach(function(incident_data) {
            if (incident_data.nearest_port_name === dataset) {
                nearest_port = incident_data.nearest_port_name;
                var cause = incident_data.cause_of_death_category;
                
                if (cause.toLowerCase() in causes) {
                    causes[cause.toLowerCase()] += Number(incident_data.fatalities);
                } else {
                    causes[cause.toLowerCase()] = Number(incident_data.fatalities);
                }
            };
        });
       
        // create variables to hold data for the chart
        var cause_labels = Object.keys(causes);
        var cause_fatalities = Object.values(causes);
        

        function newPieChart(pieLabels, pieFatalities) {
        // create the new pie chart with data for the selected port
            new Chart(document.getElementById("causeDeath"), {
                type: 'pie',
                data: {
                labels: pieLabels,
                datasets: [{
                    label: "2014-2018 Fatalities", 
                    backgroundColor: ["#B0C4DE", "#3e95cd", "#3cba9f", "#c45850", "#FFD700", "#e8c3b9", "#00FFFF", "#7CFC00", "#8e5ea2", "#FF4500"],
                    data: pieFatalities
                }]
                },
                options: {
                    responsive: true,
                    title: {
                        display: true,
                        fontFamily: 'Arial',
                        fontSize: 16,
                        fontColor: 'darkslategray',
                        text: ['Cause of Death - 2014-2018', nearest_port],
                    }
                }
            });
        }
        document.getElementById("pie-chart").innerHTML = '&nbsp;';
        document.getElementById("pie-chart").innerHTML = '<canvas id="causeDeath" width="500" height="350"></canvas>'; 
        window.setTimeout(newPieChart(cause_labels, cause_fatalities), 600);
    });
};

// initialize charts on page load or refresh
initLineChart();
initPieChart();