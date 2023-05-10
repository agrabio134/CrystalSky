let url = "http://localhost/CrystalSky/html/admin_ems/restApi/";

// Modal

// Get the modal
let modal = document.getElementById("myModal");
let addmodal = document.getElementById("addModal");
let editModal = document.getElementById("editModal");

/////////////////////////////////////////////////////////////////////////////////////////////////////
// OPEN MODAL FUNCTION FOR ADDING OF EMPLOYEES

function openAddModal() {
  addmodal.style.display = "block";

  let addmodalCancel = document.getElementById("addmodalCancel");
  // Get the <span> element that closes the modal
  let addcloseBtn = document.getElementById("addcloseBtn");

  // When the user clicks on <span> (x), close the modal
  addcloseBtn.onclick = function () {
    document.getElementById("addConfirmBtn").reset();
    addmodal.style.display = "none";
    $("#username_less").prop("hidden", true);
    $("#username_error").prop("hidden", true);
    $("#username_accept").prop("hidden", true);
  };

  addmodalCancel.onclick = function () {
    document.getElementById("addConfirmBtn").reset();
    addmodal.style.display = "none";
    $("#username_less").prop("hidden", true);
    $("#username_error").prop("hidden", true);
    $("#username_accept").prop("hidden", true);
  };
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

// BODY ONLOAD FUNCTION

$(document).ready(function () {
  getActiveEmployees();
  getInactiveEmployees();
  getDepartments();

  /////////////////////////////////////////////////////////////////////////////////////////////////////
  //ONCLICK FUNCTION ON BUTTONS FOR EDIT ON DATATABLE TO SHOW EDIT MODAL
  $(document).on("click", ".editEmployeeBtn", function () {
    editModal.style.display = "block";

    let editmodalCancel = document.getElementById("editmodalCancel");
    // Get the <span> element that closes the modal
    let editcloseBtn = document.getElementById("editcloseBtn");

    // When the user clicks on <span> (x), close the modal
    editcloseBtn.onclick = function () {
      editModal.style.display = "none";
      
    $("#edit_username_less").prop("hidden", true);
    $("#edit_username_error").prop("hidden", true);
    $("#edit_username_accept").prop("hidden", true);
    };

    editmodalCancel.onclick = function () {
      editModal.style.display = "none";
      $("#edit_username_less").prop("hidden", true);
      $("#edit_username_error").prop("hidden", true);
      $("#edit_username_accept").prop("hidden", true);
    };

    let id = $(this).attr("data-id");

    item = {};
    item["id"] = id;

    item = JSON.stringify(item);
    console.log(item)

    $.ajax({
      url: url + "getEmployeeDetails",
      method: "POST",
      dataType: "json",
      data: item,
    })
      // if success
      .done(function (data) {
        let employee_data = data.payload;
        // editModal.style.display = "none";
        // getDepartments();

        editgetDepartments(employee_data);
      })
      // if failed
      .fail(function (data) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Cannot get employee information for edit of employees!",
        });
      });
  });

  ////////////////////////////////////////////////////////////////////////////////////

  $("#editConfirmBtn").submit(function (event) {
    event.preventDefault();

    // $("#editmodalConfirmBtn").click(function () {
    let employee_number = $("#edit_employee_number").val();
    let id = $("#employee_id").val();
    let firstname = $("#edit_firstname").val();
    let lastname = $("#edit_lastname").val();
    let fullname = firstname + " " + lastname;
    let gender = $("#edit_gender").val();
    let birthday = $("#edit_birthday").val();
    let house_number = $("#edit_house_number").val();
    let street = $("#edit_street").val();
    let barangay = $("#edit_barangay").val();
    let city = $("#edit_city").val();
    let contact_number = $("#edit_contact_number").val();
    let dept_id = $("#edit_department").val();
    let position = $("#edit_position").val();
    let salary = $("#edit_salary").val();
    let hourly_rate = $("#edit_hourly_rate").val();
    let shift_in = $("#edit_shift_in").val();
    let shift_out = $("#edit_shift_out").val();
    let username = $("#edit_username").val();
    // let password = $("#edit_password").val();
    if (gender == "Male") {
      var profile_pic =
        "../../assets/SUBSYSTEM_PHOTOS/EMS/profile_pic/default_boy.png";
    } else {
      var profile_pic =
        "../../assets/SUBSYSTEM_PHOTOS/EMS/profile_pic/default_girl.png";
    }

    if (check2) {
      item = {};
      item["employee_number"] = employee_number;
      item["id"] = id;
      item["fullname"] = fullname;
      item["firstname"] = firstname;
      item["lastname"] = lastname;
      item["gender"] = gender;
      item["birthday"] = birthday;
      item["house_number"] = house_number;
      item["street"] = street;
      item["barangay"] = barangay;
      item["city"] = city;
      item["contact_number"] = contact_number;
      item["dept_id"] = dept_id;
      item["position"] = position;
      item["salary"] = salary;
      item["hourly_rate"] = hourly_rate;
      item["shift_in"] = shift_in;
      item["shift_out"] = shift_out;
      item["profile_pic"] = profile_pic;
      item["username"] = username;
      // item["password"] = password;
      item = JSON.stringify(item);

      // console.log(item);
      $.ajax({
        url: url + "editEmployeeDetails",
        type: "post",
        dataType: "json",
        data: item,
      })
        // if success
        .done(function (data) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Successfully edited employee information!",
          });
          // set id as local storage
          editModal.style.display = "none";
          getActiveEmployees();
          getInactiveEmployees();
        })
        // if failed
        .fail(function (data) {
          console.log("Error add new employee");
        });
    }
  });

  /////////////////////////////////////////////////////////////////////////////////////////////

  // $("#editEmployeeBtn").click(function () {
  //   let id = $("#departmentID").val();
  //   let department_name = $("#department_name").val();

  //   item = {};
  //   item["id"] = id;
  //   item["department_name"] = department_name;

  //   item = JSON.stringify(item);

  //   $.ajax({
  //     url: url + "editDepartment",
  //     method: "POST",
  //     dataType: "json",
  //     data: item,
  //   })
  //     // if success
  //     .done(function () {
  //       Swal.fire({
  //         icon: "success",
  //         title: "Success!",
  //         text: "Edited Successfully!",
  //       });

  //       editModal.style.display = "none";
  //       getDepartments();
  //     })
  //     // if failed
  //     .fail(function (data) {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Error!",
  //         text: "Department Name already exist! Can't modify the information!",
  //       });
  //     });
  // });

  /////////////////////////////////////////////////////////////////////////////////////////////////////

  //FUNCTION FOR TAB CHANGING MODES FOR INACTIVE AND ACTIVE EMPLOYEES

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

  /////////////////////////////////////////////////////////////////////////////////////////////////////
  // FUNCTION FOR SETTING MIN DATE 18 YEARS AGO
  $(function () {
    var dtToday = new Date();

    var month = dtToday.getMonth() + 1; // jan=0; feb=1 .......
    var day = dtToday.getDate();
    var year = dtToday.getFullYear() - 18;
    if (month < 10) month = "0" + month.toString();
    if (day < 10) day = "0" + day.toString();
    var minDate = year + "-" + month + "-" + day;
    var maxDate = year + "-" + month + "-" + day;
    $("#birthday").attr("max", maxDate);
    $("#edit_birthday").attr("max", maxDate);
  });

  /////////////////////////////////////////////////////////////////////////////////////////////////////
});

/////////////////////////////////////////////////////////////////////////////////////////////////////
// FUNCTION FOR GETTING ALL ACTIVE EMPLOYEES

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
            <button type="button" style="margin-bottom:5px" id="editEmployee${employee.id}.style.color = "#2FA83F"" data-id="${employee.id}" class="editEmployeeBtn defBtn acceptBtn">Edit</button>

            <button type="button" onclick="makeActive(${employee.id}, 'Inactive')" class="defBtn banBtn".style.color = "#FF5D5D
            " id="makeActiveBtn${employee.id}" >Inactive</button>
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
      $(".activeEmployeesTableCont").empty();
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

/////////////////////////////////////////////////////////////////////////////////////////////////////

// FUNCTION FOR GETTING ALL INACTIVE EMPLOYEES
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
            
              <button type="button" onclick="makeActive(${employee.id}, 'Active')" class="defBtn keepBtn" id="makeActiveBtn${employee.id}">Active</button>
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

/////////////////////////////////////////////////////////////////////////////////////////////////////
// FUNCTION FOR BUTTON CREATION ON MODALS FOR EMPLOYEE CHANGING STATUS

function makeActive(id, type) {
  modal.style.display = "block";

  $("#buttonsModal").empty();
  if (type == "Active") {
    $("#headTitle").empty();
    $("#modalBody").empty();

    let str = `<h1>MAKE ACTIVE CONFIRMATION</h1>`;
    let str2 = `<h1>Do you really want to make this employee Active?</h1>`;

    $("#headTitle").append(str);
    $("#modalBody").append(str2);
  } else {
    $("#headTitle").empty();
    $("#modalBody").empty();

    let str = `<h1>MAKE INACTIVE CONFIRMATION</h1>`;
    let str2 = `<h1>Do you really want to make this employee Inactive?</h1>`;

    $("#headTitle").append(str);
    $("#modalBody").append(str2);
  }

  let str3 = `
  <button class="modalBtn modalConfirmBtn " onclick="confirmChangeStatus(${id}, '${type}')">CONFIRM</button>
  <button class="modalBtn banBtn" id="modalCancel">CANCEL</button>`;
  $("#buttonsModal").append(str3);

  let modalCancel = document.getElementById("modalCancel");
  // Get the <span> element that closes the modal
  let span = document.getElementById("closeBtn");

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  modalCancel.onclick = function () {
    modal.style.display = "none";
  };
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

// FUNCTION FOR CHANGING THE STATUS OF EMPLOYEE INTO ACTIVE OR INACTIVE

function confirmChangeStatus(id, type) {
  item = {};
  // inputs will be turned into objects
  item["id"] = id;
  item["status"] = type;
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
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Successfully made the employee " + type + "!",
      });
      // set id as local storage
      modal.style.display = "none";
      getActiveEmployees();
      getInactiveEmployees();
    })
    // if failed
    .fail(function (data) {
      console.log("wala d pwede");
      // console.log("Error add to cart");
    });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

// FUNCTION FOR GETTING ALL DEPARTMENTS AND TIME GENERATION FOR SHIFT IN AND SHIFT OUT FOR MODAL DROPDOWN SELECTS

function getDepartments() {
  let str = `
              
  <div class="row">
    <div class="col">
      <label for="salary">Salary:</label>      
    </div>
    <div class="col">
      <label for="hourlyrate">Hourly Rate:</label>
    </div>
    <div class="col">
      <label for="shiftIn">Shift In:</label>
    </div>
    <div class="col">
      <label for="shiftOut">Shift Out:</label>
    </div>
  </div>
  <div class="row row-bottom">
    <div class="col bottom">
      <input type="number" step="any" onchange="nozero(this);computeRate(this.value)" id="salary" placeholder="Salary" required/>       
    </div>
    <div class="col bottom">
      <input type="number" step="any" onchange="nozero(this)" id="hourly_rate" placeholder="Hourly Rate" required readonly />  
    </div>
    <div class="col bottom">
      <select id="shift_in">`;

  for (var i = 1; i <= 24; i++) {
    if (i <= 12) {
      if (i == 12) {
        var time = i + ":00:00";
        var timeDisplay = i + ":00 PM";
      } else if (i > 9) {
        var time = i + ":00:00";
        var timeDisplay = i + ":00 AM";
      } else {
        var time = "0" + i + ":00:00";
        var timeDisplay = "0" + i + ":00 AM";
      }
    } else {
      var hr = i % 12;
      if (i == 24) {
        var time = i + ":00:00";
        var timeDisplay = 12 + ":00 AM";
      } else if (i > 21) {
        var time = i + ":00:00";
        var timeDisplay = hr + ":00 PM";
      } else {
        var time = i + ":00:00";
        var timeDisplay = "0" + hr + ":00 PM";
      }
    }

    str += `<option value="${time}">${timeDisplay}</option>`;
  }

  str += `  </select> </div>
            <div class="col bottom">
              <select id="shift_out">
              `;

  for (var i = 1; i <= 24; i++) {
    if (i <= 12) {
      if (i == 12) {
        var time = i + ":00:00";
        var timeDisplay = i + ":00 PM";
      } else if (i > 9) {
        var time = i + ":00:00";
        var timeDisplay = i + ":00 AM";
      } else {
        var time = "0" + i + ":00:00";
        var timeDisplay = "0" + i + ":00 AM";
      }
    } else {
      var hr = i % 12;
      if (i == 24) {
        var time = i + ":00:00";
        var timeDisplay = 12 + ":00 AM";
      } else if (i > 21) {
        var time = i + ":00:00";
        var timeDisplay = hr + ":00 PM";
      } else {
        var time = i + ":00:00";
        var timeDisplay = "0" + hr + ":00 PM";
      }
    }

    str += `<option value="${time}">${timeDisplay}</option>`;
  }
  str += `</select> 
    </div>
  </div>   `;

  $("#salaryRow").empty();
  $("#salaryRow").append(str);

  $.ajax({
    url: url + "getDepartments",
    type: "post",
    dataType: "json",
  })
    // if success
    .done(function (data) {
      $("#departmentRow").empty();
      let departments_data = data.payload;
      // accessing all items in the payload
      let str = `
      <div class="row">
        <div class="col">
          <label for="department">Department:</label>   
        </div>
        <div class="col">
          <label for="position">Position:</label>
        </div>
      </div>
      <div class="row row-bottom">
        <div class="col bottom">
          <select id="department" required> 
      `;

      departments_data.forEach((department) => {
        str += `
        <option value="${department.id}">${department.department_name}</option>
        `;
      });
      str += `</select></div>     
        <div class="col bottom">      
          <input type="text" id="position" placeholder="Position" required/>
        </div>      
      </div>      
      `;

      $("#departmentRow").append(str);
    })
    // if failed
    .fail(function (data) {
      console.log("Error get all departments");
    });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

// FUNCTION FOR FOR ADDING OF EMPLOYEE

var check1 = false;

$("#addConfirmBtn").submit(function (event) {
  event.preventDefault();
  let employee_number = $("#employee_number").val();
  let firstname = $("#firstname").val();
  let lastname = $("#lastname").val();
  let fullname = firstname + " " + lastname;
  let gender = $("#gender").val();
  let birthday = $("#birthday").val();
  let house_number = $("#house_number").val();
  let street = $("#street").val();
  let barangay = $("#barangay").val();
  let city = $("#city").val();
  let contact_number = $("#contact_number").val();
  let dept_id = $("#department").val();
  let position = $("#position").val();
  let salary = $("#salary").val();
  let hourly_rate = $("#hourly_rate").val();
  let shift_in = $("#shift_in").val();
  let shift_out = $("#shift_out").val();
  let username = $("#username").val();
  let password = $("#password").val();
  if (gender == "Male") {
    var profile_pic =
      "../../assets/SUBSYSTEM_PHOTOS/EMS/profile_pic/default_boy.png";
  } else {
    var profile_pic =
      "../../assets/SUBSYSTEM_PHOTOS/EMS/profile_pic/default_girl.png";
  }
  if (check1 && check3) {
    item = {};
    item["employee_number"] = employee_number;
    item["fullname"] = fullname;
    item["firstname"] = firstname;
    item["lastname"] = lastname;
    item["gender"] = gender;
    item["birthday"] = birthday;
    item["house_number"] = house_number;
    item["street"] = street;
    item["barangay"] = barangay;
    item["city"] = city;
    item["contact_number"] = contact_number;
    item["dept_id"] = dept_id;
    item["position"] = position;
    item["salary"] = salary;
    item["hourly_rate"] = hourly_rate;
    item["shift_in"] = shift_in;
    item["shift_out"] = shift_out;
    item["profile_pic"] = profile_pic;
    item = JSON.stringify(item);

    $.ajax({
      url: url + "employeeCheck",
      type: "post",
      dataType: "json",
      data: item,
    })
      // if success
      .done(function (data) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Employee already exists!",
        });
      })
      // if failed
      .fail(function (data) {
        $.ajax({
          url: url + "addNewEmployee",
          type: "post",
          dataType: "json",
          data: item,
        })
          // if success
          .done(function (data) {
            let id = data.payload.id;
            item = {};

            item["username"] = username;
            item["password"] = password;
            item["employee_id"] = id;
            item = JSON.stringify(item);

            console.log(item);
            $.ajax({
              url: url + "addNewCredentials",
              type: "post",
              dataType: "json",
              data: item,
            })
              // if success
              .done(function (data) {
                Swal.fire({
                  icon: "success",
                  title: "Success!",
                  text: "Successfully added new employee!",
                });
                // set id as local storage
                document.getElementById("addConfirmBtn").reset();
                $("#edit_username_less").prop("hidden", true);
                $("#edit_username_error").prop("hidden", true);
                $("#edit_username_accept").prop("hidden", true);
                addmodal.style.display = "none";
                getActiveEmployees();
                getInactiveEmployees();
              })
              // if failed
              .fail(function (data) {
                console.log("Error add new credentials");
              });
          })
          // if failed
          .fail(function (data) {
            console.log("Error add new employee");
          });
      });
  } else {
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: "Please check all information you've provided!",
    });
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////
// for edit of employees

function editgetDepartments(employee_data) {
  let gender = "";
  let dept_id = "";
  let edit_position = "";
  let salary = "";
  let hourly_rate = "";
  let shift_in = "";
  let shift_out = "";
  let employee_id = "";

  employee_data.forEach((employee) => {
    $("#edit_employee_number").val(employee.employee_number);
    $("#edit_firstname").val(employee.firstname);
    $("#edit_lastname").val(employee.lastname);
    $("#edit_gender").val(employee.gender);
    $("#edit_birthday").val(employee.birthday);
    $("#edit_house_number").val(employee.house_number);
    $("#edit_street").val(employee.street);
    $("#edit_barangay").val(employee.barangay);
    $("#edit_city").val(employee.city);
    $("#edit_contact_number").val(employee.contact_number);
    //  $("#edit_department").val(employee.dept_id);
    //  $("#edit_shift_in").val(employee.shift_in);
    //  $("#edit_shift_out").val(employee.shift_out);
    $("#edit_username").val(employee.username);
    // $("#edit_password").val(employee.password);

    gender = employee.gender;
    employee_id = employee.id;
    dept_id = employee.dept_id;
    edit_position = employee.position;
    salary = employee.salary;
    hourly_rate = employee.hourly_rate;
    shift_in = employee.shift_in;
    shift_out = employee.shift_out;
  });

  let str = ` <div class="row">
                <div class="col">
                  <label for="edit_salary">Salary:</label>
                </div>
                <div class="col">
                  <label for="edit_hourlyrate">Hourly Rate:</label>
                </div>
                <div class="col">
                  <label for="edit_shiftIn">Shift In:</label>
                </div>
                <div class="col">
                  <label for="edit_shiftOut">Shift Out:</label>
                </div>
              </div>
              <div class="row row row-bottom">
                <div class="col bottom">
                  <input type="number" step="any" onchange="nozero(this)" id="edit_salary" placeholder="Salary" required/> 
                </div>
                <div class="col bottom">
                  <input type="number" step="any" onchange="nozero(this)" id="edit_hourly_rate" placeholder="Hourly Rate" required/>  
                </div>
                <div class="col bottom">
                  <input type="text" id="employee_id" value="${employee_id}" hidden disabled/>  

                  <select id="edit_shift_in">`;

  for (var i = 1; i <= 24; i++) {
    if (i <= 12) {
      if (i == 12) {
        var time = i + ":00:00";
        var timeDisplay = i + ":00 PM";
      } else if (i > 9) {
        var time = i + ":00:00";
        var timeDisplay = i + ":00 AM";
      } else {
        var time = "0" + i + ":00:00";
        var timeDisplay = "0" + i + ":00 AM";
      }
    } else {
      var hr = i % 12;
      if (i == 24) {
        var time = i + ":00:00";
        var timeDisplay = 12 + ":00 AM";
      } else if (i > 21) {
        var time = i + ":00:00";
        var timeDisplay = hr + ":00 PM";
      } else {
        var time = i + ":00:00";
        var timeDisplay = "0" + hr + ":00 PM";
      }
    }

    if (time == shift_in) {
      str += `<option value="${time}" selected>${timeDisplay}</option>`;
    } else {
      str += `<option value="${time}">${timeDisplay}</option>`;
    }
  }

  str += `    </select> 
            </div>
            <div class="col bottom">
              <select id="edit_shift_out">
              `;

  for (var i = 1; i <= 24; i++) {
    if (i <= 12) {
      if (i == 12) {
        var time = i + ":00:00";
        var timeDisplay = i + ":00 PM";
      } else if (i > 9) {
        var time = i + ":00:00";
        var timeDisplay = i + ":00 AM";
      } else {
        var time = "0" + i + ":00:00";
        var timeDisplay = "0" + i + ":00 AM";
      }
    } else {
      var hr = i % 12;
      if (i == 24) {
        var time = i + ":00:00";
        var timeDisplay = 12 + ":00 AM";
      } else if (i > 21) {
        var time = i + ":00:00";
        var timeDisplay = hr + ":00 PM";
      } else {
        var time = i + ":00:00";
        var timeDisplay = "0" + hr + ":00 PM";
      }
    }
    if (time == shift_out) {
      str += `<option value="${time}" selected>${timeDisplay}</option>`;
    } else {
      str += `<option value="${time}">${timeDisplay}</option>`;
    }
  }
  str += `</select> 
        </div>
      </div>
  `;

  $("#edit_salaryRow").empty();
  $("#edit_salaryRow").append(str);

  $.ajax({
    url: url + "getDepartments",
    type: "post",
    dataType: "json",
  })
    // if success
    .done(function (data) {
      $("#edit_departmentRow").empty();
      let departments_data = data.payload;
      // accessing all items in the payload
      let str = `
              <div class="row">
                <div class="col">
                  <label for="edit_department">Department:</label>
                </div>
                <div class="col">
                  <label for="edit_position">Position:</label>  
                </div>
              </div>
              <div class="row row-bottom">
                <div class="col bottom">
                  <select id="edit_department" required> 
      `;

      departments_data.forEach((department) => {
        if (dept_id == department.id) {
          str += `
        <option value="${department.id}" selected>${department.department_name}</option>
        `;
        } else {
          str += `
          <option value="${department.id}">${department.department_name}</option>
          `;
        }
      });
      str += `</select></div>
      <div class="col bottom">       
        <input type="text" id="edit_position" value="${edit_position}" required />      
        </div>
        </div>
      
      `;
      $("#edit_departmentRow").append(str);
    })
    // if failed
    .fail(function (data) {
      console.log("Error get all departments");
    });

  $("#edit_salary").val(salary);
  $("#edit_hourly_rate").val(hourly_rate);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

var check2 = true;

function num_checker2(val) {
  if (val.length == 11) {
    document.getElementById("edit_contactNumberError").innerHTML =
      "Ex. 09001234567";
    document.getElementById("edit_contactNumberError").style.color = "gray";
    check2 = true;
  } else {
    document.getElementById("edit_contactNumberError").innerHTML =
      "*Contact Number should be 11 digits.";
    document.getElementById("edit_contactNumberError").style.color = "#DE188E";
    check2 = false;
  }
}

var check3 = false;
function username_check(val) {
  if(val.length == 0){
    $("#username_less").prop("hidden", true);
    $("#username_error").prop("hidden", true);
    $("#username_accept").prop("hidden", true);
  }
  else if (val.length < 4) {
    $("#username_less").prop("hidden", false);
    $("#username_error").prop("hidden", true);
    $("#username_accept").prop("hidden", true);
    check3 = false;
  } else {
    $("#username_less").prop("hidden", true);
    $("#username_error").prop("hidden", true);
    $("#username_accept").prop("hidden", true);
    item = {};
    item["username"] = val;
    item = JSON.stringify(item);

    $.ajax({
      url: url + "usernameCheck",
      type: "post",
      dataType: "json",
      data: item,
    })
      // if success
      .done(function (data) {
        check3 = false;
        $("#username_error").prop("hidden", false);
        $("#username_accept").prop("hidden", true);
      })
      // if failed
      .fail(function () {
        check3 = true;
        $("#username_error").prop("hidden", true);
        $("#username_accept").prop("hidden", false);
      });
  }
}

function computeRate(val) {
  let rate = parseFloat(val) / 160;
  $("#hourly_rate").val(parseFloat(rate));
}

function num_checker(val) {
  if (val.length == 11) {
    document.getElementById("contactNumberError").innerHTML = "Ex. 09001234567";
    document.getElementById("contactNumberError").style.color = "gray";
    check1 = true;
  } else {
    document.getElementById("contactNumberError").innerHTML =
      "*Contact Number should be 11 digits.";
    document.getElementById("contactNumberError").style.color = "#DE188E";
    check1 = false;
  }
}

function nozero(val) {
  if (val.value < 0) {
    val.value = 0;
  }
}

function resetPassword(){
  employee_id = $("#employee_id").val();
  item = {};
  item["employee_id"] = employee_id;
  item["password"] = "password123";
  item = JSON.stringify(item);
  $.ajax({
    url: url + "resetPassword",
    type: "post",
    dataType: "json",
    data: item,
  })
    // if success
    .done(function (data) {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Password Reset Successful!",
      });
    })
    // if failed
    .fail(function () {
      console.log("Password did not reset.")
    });
}

var check4 = true;
function username_check2(val) {
  employee_id = $("#employee_id").val();
  if(val.length == 0){
    $("#edit_username_less").prop("hidden", true);
    $("#edit_username_error").prop("hidden", true);
    $("#edit_username_accept").prop("hidden", true);
  }
  else if (val.length < 4) {
    $("#edit_username_less").prop("hidden", false);
    $("#edit_username_error").prop("hidden", true);
    $("#edit_username_accept").prop("hidden", true);
    check4 = false;
  } else {
    $("#edit_username_less").prop("hidden", true);
    $("#edit_username_error").prop("hidden", true);
    $("#edit_username_accept").prop("hidden", true);
    item = {};
    item["username"] = val;
    item["employee_id"] = employee_id;
    item = JSON.stringify(item);

    $.ajax({
      url: url + "usernameCheckEdit",
      type: "post",
      dataType: "json",
      data: item,
    })
      // if success
      .done(function (data) {
        check4 = false;
        $("#edit_username_error").prop("hidden", false);
        $("#edit_username_accept").prop("hidden", true);
      })
      // if failed
      .fail(function () {
        check4 = true;
        $("#edit_username_error").prop("hidden", true);
        $("#edit_username_accept").prop("hidden", false);
      });
  }
}
