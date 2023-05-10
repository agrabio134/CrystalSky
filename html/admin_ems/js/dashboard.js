let url = "http://localhost/CrystalSky/html/admin_ems/restApi/";


$(document).ready(function () {
    getDepartmentCount();
    getAllInEmployees();
    totalNumberOfEmployees();
});

var totalNumberOfEmployees = function () {
  var dataPoints = [];
  // var averageSales = [];

  var chart = new CanvasJS.Chart("chart", {
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
      type: 'POST',
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

function getDepartmentCount(){

    $.ajax({
        url: url + "getDepartmentCount",
        method: "POST",
        dataType: "json",
      })
        // if success
        .done(function (data) {
    
          let departments_data = data.payload;
          
      departments_data.forEach((department) => {
        $("#totaldepartments").html(department.id);
      })
        })
        // if failed
        .fail(function (data) {
          console.log("none ")
        });
}

function getAllInEmployees(){

    $.ajax({
        url: url + "getAllInEmployees",
        method: "POST",
        dataType: "json",
      })
        // if success
        .done(function (data) {
    
          let departments_data = data.payload;
          
      departments_data.forEach((department) => {
        $("#totalemployees").html(department.id);
        $("#totalactive").html(department.active);
        $("#totalinactive").html(department.inactive);
      })
        })
        // if failed
        .fail(function (data) {
          console.log("none ")
        });
}