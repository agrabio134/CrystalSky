let url = "http://localhost/CrystalSky/html/admin_ems/restApi/";

$(document).ready(function () {
  getActiveEmployees();
  getInactiveEmployees();

  $("#activeBtn").click(function () {
    $("#activeBtn").css("background-color", "#4BB1F7");
    $("#activeBtn").css("color", "white");

    $("#inactiveBtn").css("background-color", "#FFFFFF");
    $("#inactiveBtn").css("color", "#5E6574");

    $(".activeEmployeesTableCont").prop("hidden", false);
    $(".inactiveEmployeesTableCont").prop("hidden", true);
  });

  $("#inactiveBtn").click(function () {
    $("#inactiveBtn").css("background-color", "#4BB1F7");
    $("#inactiveBtn").css("color", "white");

    $("#activeBtn").css("background-color", "#FFFFFF");
    $("#activeBtn").css("color", "#5E6574");
    $(".activeEmployeesTableCont").prop("hidden", true);
    $(".inactiveEmployeesTableCont").prop("hidden", false);
  });
});

function getActiveEmployees() {
  $.ajax({
    url: url + "getActiveEmployees",
    type: "post",
    dataType: "json",
  })
    // if success
    .done(function (data) {
      $(".activeEmployeesTableCont").empty();
      let employees_data = data.payload;
      // accessing all items in the payload
      let str = `
      <table id="actives">
        <thead>
          <tr>
            <th class="thLeft">Emp ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Position</th>
            <th>Salary</th>
            <th class="thRight">Action</th>
          </tr>
        </thead>
        <tbody>
      `;

      employees_data.forEach((employee) => {
        str += `
      <tr>
            <td>${employee.employee_number}</td>
            <td>
              <div class="employeePicDiv">
                <div width="20%" class="employee_image">
                  <img src="${employee.profile_pic}" class="profile_pic" />
                </div>
                <div width="10%" style="width:100%"></div>
                <div width="70%" class="fullnameDiv">
                  <p>${employee.fullname}</p> 
                </div>
              </div>
            </td>
            <td>${employee.department_name}</td>
            <td>${employee.position}</td>
            <td>${employee.salary}</td>
            <td>
            <button type="button" class="defBtn keepBtn" id="makeInactiveBtn">Make Inactive</button>
            </td>
          </tr>
      `;
      });
      str += `
    </tbody>
  </table>`;

      $(".activeEmployeesTableCont").append(str);

      var table = $("#actives").DataTable({
        language: {
          paginate: {
            next: '<i class="fa fa-chevron-right" aria-hidden="true">',
            previous: '<i class="fa fa-chevron-left" aria-hidden="true">',
          },
        },
        dom: "rtip",
      });

      $("#searchInput").keyup(function () {
        table.search($("#searchInput").val()).draw();
      });
    })
    // if failed
    .fail(function (data) {
      let str = `
      <table id="actives">
        <thead>
          <tr>
            <th class="thLeft">Emp ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Position</th>
            <th>Salary</th>
            <th class="thRight">Action</th>
          </tr>
        </thead>
        <tbody>
        <tr>
        <td></td>
        <td></td>
        <td>No records found in this section</td>
        <td></td>
        <td></td>
        <td></td>
        </tr>
    </tbody>
  </table>`;

      $(".activeEmployeesTableCont").append(str);

      var table = $("#actives").DataTable({
        language: {
          paginate: {
            next: '<i class="fa fa-chevron-right" aria-hidden="true">',
            previous: '<i class="fa fa-chevron-left" aria-hidden="true">',
          },
        },
        dom: "rtip",
      });

      $("#searchInput").keyup(function () {
        table.search($("#searchInput").val()).draw();
      });
    });
}

function getInactiveEmployees() {
  $.ajax({
    url: url + "getInactiveEmployees",
    type: "post",
    dataType: "json",
  })
    // if success
    .done(function (data) {
      let employees_data = data.payload;
      // accessing all items in the payload
      $(".inactiveEmployeesTableCont").empty();
      let str = `
      <table id="inactives">
        <thead>
          <tr>
            <th class="thLeft">Emp ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Position</th>
            <th>Salary</th>
            <th class="thRight">Action</th>
          </tr>
        </thead>
        <tbody>
      `;

      employees_data.forEach((employee) => {
        str += `
      <tr>
            <td>${employee.employee_number}</td>
            <td>
              <div class="employeePicDiv">
                <div width="20%" class="employee_image">
                  <img src="${employee.profile_pic}" class="profile_pic" />
                </div>
                <div width="10%" style="width:100%"></div>
                <div width="70%" class="fullnameDiv">
                  <p>${employee.fullname}</p> 
                </div>
              </div>
            </td>
            <td>${employee.department_name}</td>
            <td>${employee.position}</td>
            <td>${employee.salary}</td>
            <td>
              <button type="button" onclick="makeActive(${employee.id})" class="defBtn acceptBtn" id="makeActiveBtn${employee.id}" >Make Active</button>
            </td>
          </tr>
      `;
      });
      str += `
    </tbody>
  </table>`;

      $(".inactiveEmployeesTableCont").append(str);

      var table = $("#inactives").DataTable({
        language: {
          paginate: {
            next: '<i class="fa fa-chevron-right" aria-hidden="true">',
            previous: '<i class="fa fa-chevron-left" aria-hidden="true">',
          },
        },
        dom: "rtip",
      });

      $("#searchInput").keyup(function () {
        table.search($("#searchInput").val()).draw();
      });
    })
    // if failed
    .fail(function (data) {
      let str = `
      <table id="inactives">
        <thead>
          <tr>
            <th class="thLeft">Emp ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Position</th>
            <th>Salary</th>
            <th class="thRight">Action</th>
          </tr>
        </thead>
        <tbody>
        <tr>
        <td></td>
        <td></td>
        <td>No records found in this section</td>
        <td></td>
        <td></td>
        <td></td>
        </tr>
    </tbody>
  </table>`;

      $(".inactiveEmployeesTableCont").append(str);

      var table = $("#inactives").DataTable({
        language: {
          paginate: {
            next: '<i class="fa fa-chevron-right" aria-hidden="true">',
            previous: '<i class="fa fa-chevron-left" aria-hidden="true">',
          },
        },
        dom: "rtip",
      });

      $("#searchInput").keyup(function () {
        table.search($("#searchInput").val()).draw();
      });
    });
}

function makeActive(id) {
  item = {};
  // inputs will be turned into objects
  item["id"] = id;
  // stringify the object
  item = JSON.stringify(item);

  console.log(item);

  $.ajax({
    url: url + "makeActive",
    type: "post",
    dataType: "json",
    data: item,
  })
    // if success
    .done(function (data) {
      // set id as local storage

      getActiveEmployees();
      getInactiveEmployees();
    })
    // if failed
    .fail(function (data) {
      console.log("wala d pwede");
      // console.log("Error add to cart");
    });
}


document.addEventListener("DOMContentLoaded", () => {
  setupTabs();



  // Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
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
}); 

