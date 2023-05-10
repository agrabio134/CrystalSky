$('input[name="date"]').daterangepicker();

let url = 'http://localhost/CrystalSky/samplerest/';

const date = new Date();
const date_string = date.toDateString();
document.getElementById('date').innerHTML = date_string;

function refreshTime() {
    const time = new Date().toLocaleTimeString();
    document.getElementById("time").innerHTML = time;
}
    setInterval(refreshTime, 1000);
    
$(document).ready(function () {
    totalSalesGraph()
    mostAvailedFoodsGraph()
    mostBookedRoomsGraph()
    peopleTransacting()
    totalNumberOfMemberships()
    totalNumberOfEmployees()

})
    
//Most Availed Foods CHART
var mostAvailedFoodsGraph = function () {
    var dataPoints = [];
    // var averageSales = [];
    var chart = new CanvasJS.Chart("most_availed_foods_chart", {
        animationEnabled: true,
        exportEnabled: true,
        data: [{
            type: "doughnut",
            startAngle: 60,
            //innerRadius: 60,
            indexLabelFontSize: 12,
            indexLabel: "{label} - #percent%",
            toolTipContent: "<b>{label}:</b> {y} (#percent%)",
            dataPoints: dataPoints
        }]
    });

    $.ajax({
        url: url + 'getMostAvailedFoods',
        type: 'get',
        dataType: 'json'
    })
        // if success
        .done(function (data) {
            let foods = data.payload;
            foods.forEach(foods_info => {
                dataPoints.push({
                    y: foods_info.totalMostAvailedFoods,
                    label: foods_info.name
                });
            
            })
            chart.render();
        })

        // if failed
        .fail(function (data) {
            console.error("NO PRODUCTS AVAILABLE");
        });
}

// Most Booked Rooms CHART
var mostBookedRoomsGraph = function () {
    var dataPoints = [];
    // var averageSales = [];

    var chart = new CanvasJS.Chart("most_booked_rooms_chart", {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light1", // "light1", "light2", "dark1", "dark2"
          axisY: {
          includeZero: true
        },
        data: [{
            type: "column", //change type to bar, line, area, pie, etc
            //indexLabel: "{y}", //Shows y value on all Data Points
            indexLabelFontColor: "#5A5757",
            indexLabelFontSize: 16,
            indexLabelPlacement: "outside",
            dataPoints: dataPoints
        }]
    });

    $.ajax({
        url: url + 'getMostBookedRooms',
        type: 'get',
        dataType: 'json'
    })
        // if success
        .done(function (data) {
            let rooms = data.payload;
            rooms.forEach(rooms_info => {
                dataPoints.push({
                    y: rooms_info.totalRooms,
                    label: rooms_info.category_id
                });
            
            })
            chart.render();
        })

        // if failed
        .fail(function (data) {
            console.error("NO PRODUCTS AVAILABLE");
        });
}

// People Transacting CHART
var peopleTransacting = function () {
    var dataPoints = [];
    // var averageSales = [];

    var chart = new CanvasJS.Chart("number_of_people_transacting_chart", {
        animationEnabled: true,
        exportEnabled: true,
        data: [{
            type: "pie",
            startAngle: 240,
            xValueFormatString: "##0.00\"%\"",
            indexLabel: "{label} {x}",
            dataPoints: dataPoints
        }]
    });

    $.ajax({
        url: url + 'getPeopleTransacting',
        type: 'get',
        dataType: 'json'
    })
        // if success
        .done(function (data) {
            let people = data.payload;
            people.forEach(people_info => {
                dataPoints.push({
                    x: people_info.totalPeople,
                    y: people_info.numberOfPeople,
                    label: people_info.role
                });
            
            })
            chart.render();
        })

        // if failed
        .fail(function (data) {
            console.error("NO PRODUCTS AVAILABLE");
        });
}

var totalNumberOfMemberships = function () {
    var dataPoints = [];
    // var averageSales = [];
    var chart = new CanvasJS.Chart("number_of_memberships_chart", {
        animationEnabled: true,
        theme: "light2",

        data: [{        
            type: "line",
            indexLabelFontSize: 16,
            dataPoints: dataPoints
        }]
    });

    $.ajax({
        url: url + 'getNumberOfMemberships',
        type: 'get',
        dataType: 'json'
    })
        // if success
        .done(function (data) {
            let members = data.payload;
            members.forEach(members_info => {
                dataPoints.push({
                    // x: members_info.dateName,
                    y: members_info.totalMemberships,
                });
            
            })
            chart.render();
        })

        // if failed
        .fail(function (data) {
            console.error("NO PRODUCTS AVAILABLE");
        });
}


//Total Sales CHART
var totalSalesGraph = function () {
    var dataPoints = [];
    // var averageSales = [];

    
    var chart = new CanvasJS.Chart("total_sales_chart", {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light2",
        zoomEnabled: true,

        data: [{
            type: "line",
            xValueFormatString: "YYYY",
            yValueFormatString: "₱ #,##0.00",
            dataPoints: dataPoints
        }]
    });

    $.ajax({
        url: url + 'getTotalSales',
        type: 'get',
        dataType: 'json'
    })
        // if success
        .done(function (data) {
            let sales = data.payload;
            sales.forEach(sales_info => {
                dataPoints.push({
                    x: new Date(sales_info.created_at),
                    y: sales_info.totalSales,
                    // value: sales_info.totalSales/sales_info.totalBillsCount
                });
            
            })
            chart.render();
        })

        // if failed
        .fail(function (data) {
            console.error("NO SALES");
        });
}

var totalNumberOfEmployees = function () {
    var dataPoints = [];
    // var averageSales = [];

    var chart = new CanvasJS.Chart("number_of_active_inactive_chart", {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light2", // "light1", "light2", "dark1", "dark2"

        data: [{
            type: "pie",
            startAngle: 240,
            xValueFormatString: "##0.00\"%\"",
            indexLabel: "{label} {x}",
            dataPoints: dataPoints
        }]
    });

    $.ajax({
        url: url + 'getNumberOfEmployees',
        type: 'get',
        dataType: 'json'
    })
        // if success
        .done(function (data) {
            let people = data.payload;
            people.forEach(people_info => {
                dataPoints.push({
                    x: people_info.totalEmployees,
                    y: people_info.numberOfStatus,
                    label: people_info.status
                });
            
            })
            chart.render();
        })

        // if failed
        .fail(function (data) {
            console.error("NO PRODUCTS AVAILABLE");
        });
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
// var btn = document.getElementById("cdms_chart_most_availed_foods_container");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
function generatemodal(type) {
    $("#chart_title_modal").empty();
    $("#modal_body").empty();

    if (type=='most availed foods'){

        let str = 'Most Availed Foods';
        $("#chart_title_modal").append(str);

        var dataPoints = [];
        // var averageSales = [];
        var chart = new CanvasJS.Chart("modal_body", {
            animationEnabled: true,
            exportEnabled: true,
            data: [{
                type: "doughnut",
                startAngle: 60,
                //innerRadius: 60,
                indexLabelFontSize: 23,
                indexLabel: "{label} - #percent%",
                toolTipContent: "<b>{label}:</b> {y} (#percent%)",
                dataPoints: dataPoints
            }]
        });

        $.ajax({
            url: url + 'getMostAvailedFoods',
            type: 'get',
            dataType: 'json'
        })
            // if success
            .done(function (data) {
                let foods = data.payload;
                foods.forEach(foods_info => {
                    dataPoints.push({
                        y: foods_info.totalMostAvailedFoods,
                        label: foods_info.name
                    });
                
                })
                chart.render();
            })

            // if failed
            .fail(function (data) {
                console.error("NO PRODUCTS AVAILABLE");
            });
    } 

    else if (type=='most booked rooms'){

        let str = 'Most Booked Rooms';
        $("#chart_title_modal").append(str);

        var dataPoints = [];
        // var averageSales = [];

        var chart = new CanvasJS.Chart("modal_body", {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light1", // "light1", "light2", "dark1", "dark2"
            axisY: {
            includeZero: true
            },
            data: [{
                type: "column", //change type to bar, line, area, pie, etc
                //indexLabel: "{y}", //Shows y value on all Data Points
                indexLabelFontColor: "#5A5757",
                indexLabelFontSize: 23,
                indexLabelPlacement: "outside",
                dataPoints: dataPoints
            }]
        });

        $.ajax({
            url: url + 'getMostBookedRooms',
            type: 'get',
            dataType: 'json'
        })
            // if success
            .done(function (data) {
                let rooms = data.payload;
                rooms.forEach(rooms_info => {
                    dataPoints.push({
                        y: rooms_info.totalRooms,
                        label: rooms_info.category_id
                    });
                
                })
                chart.render();
            })

            // if failed
            .fail(function (data) {
                console.error("NO PRODUCTS AVAILABLE");
            });
    } 

    else if (type=='people transacting'){

        let str = 'People Transacting';
        $("#chart_title_modal").append(str);

        var dataPoints = [];
        // var averageSales = [];

        var chart = new CanvasJS.Chart("modal_body", {
            animationEnabled: true,
            exportEnabled: true,
            data: [{
                type: "pie",
                startAngle: 240,
                xValueFormatString: "##0.00\"%\"",
                indexLabelFontSize: 23,
                indexLabel: "{label} {x}",
                dataPoints: dataPoints
            }]
        });

        $.ajax({
            url: url + 'getPeopleTransacting',
            type: 'get',
            dataType: 'json'
        })
            // if success
            .done(function (data) {
                let people = data.payload;
                people.forEach(people_info => {
                    dataPoints.push({
                        x: people_info.totalPeople,
                        y: people_info.numberOfPeople,
                        label: people_info.role
                    });
                
                })
                chart.render();
            })

            // if failed
            .fail(function (data) {
                console.error("NO PRODUCTS AVAILABLE");
            });
    } 

    else if (type=='number of memberships'){

        let str = 'Number of Memberships';
        $("#chart_title_modal").append(str);

        var dataPoints = [];
        // var averageSales = [];
        var chart = new CanvasJS.Chart("modal_body", {
            animationEnabled: true,
            theme: "light2",

            data: [{        
                type: "line",
                indexLabelFontSize: 23,
                dataPoints: dataPoints
            }]
        });

        $.ajax({
            url: url + 'getNumberOfMemberships',
            type: 'get',
            dataType: 'json'
        })
            // if success
            .done(function (data) {
                let members = data.payload;
                members.forEach(members_info => {
                    dataPoints.push({
                        // x: members_info.dateName,
                        y: members_info.totalMemberships,
                    });
                
                })
                chart.render();
            })

            // if failed
            .fail(function (data) {
                console.error("NO PRODUCTS AVAILABLE");
            });
    }

    else if (type=='total sales'){

        let str = 'Total Sales';
        $("#chart_title_modal").append(str);

        var dataPoints = [];
        // var averageSales = [];

        var chart = new CanvasJS.Chart("modal_body", {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light2",
            zoomEnabled: true,

            data: [{
                type: "line",
                xValueFormatString: "YYYY",
                yValueFormatString: "₱ #,##0.00",
                dataPoints: dataPoints
            }]
        });

        $.ajax({
            url: url + 'getTotalSales',
            type: 'get',
            dataType: 'json'
        })
            // if success
            .done(function (data) {
                let sales = data.payload;
                sales.forEach(sales_info => {
                    dataPoints.push({
                        x: new Date(sales_info.created_at),
                        y: sales_info.totalSales,
                        // value: sales_info.totalSales/sales_info.totalBillsCount
                    });
                
                })
                chart.render();
            })

            // if failed
            .fail(function (data) {
                console.error("NO SALES");
            });
    }

    else if (type=='active and inactive employees'){

        let str = 'Active and Inactive Employees';
        $("#chart_title_modal").append(str);

        var dataPoints = [];
        // var averageSales = [];

        var chart = new CanvasJS.Chart("modal_body", {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light2", // "light1", "light2", "dark1", "dark2"

            data: [{
                type: "pie",
                startAngle: 240,
                xValueFormatString: "##0.00\"%\"",
                indexLabelFontSize: 23,
                indexLabel: "{label} {x}",
                dataPoints: dataPoints
            }]
        });

        $.ajax({
            url: url + 'getNumberOfEmployees',
            type: 'get',
            dataType: 'json'
        })
            // if success
            .done(function (data) {
                let people = data.payload;
                people.forEach(people_info => {
                    dataPoints.push({
                        x: people_info.totalEmployees,
                        y: people_info.numberOfStatus,
                        label: people_info.status
                    });
                
                })
                chart.render();
            })

            // if failed
            .fail(function (data) {
                console.error("NO PRODUCTS AVAILABLE");
            });
    }

  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}