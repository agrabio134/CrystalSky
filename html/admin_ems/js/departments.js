let url = "http://localhost/CrystalSky/html/admin_ems/restApi/";

function getDepartments() {
  $.ajax({
    url: url + "getDepartments",
    type: "post",
    dataType: "json",
  })
    // if success
    .done(function (data) {
      $(".departments").empty();
      let departments_data = data.payload;
      // accessing all items in the payload
      let str = `
      <table id="departmentsTable">
        <thead>
          <tr>
            <th class="thLeft"> DepartmentID</th>
            <th>Department Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
      `;

      departments_data.forEach((department) => {
        str += `
      <tr>
            <td>${department.id}</td>
            <td>${department.department_name}</td>
            <td><button type="button" data-id="${department.id}" data-name="${department.department_name}" class="editDepartmentBtn defBtn keepBtn" id="makeActiveBtn${department.id}" >Edit</button>
            </td>
          </tr>
      `;
      });
      str += `
    </tbody>
  </table>`;

      $(".departments").append(str);

      var table = $("#departmentsTable").DataTable({
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
      $(".departments").empty();
      let str = `
    <table id="departmentsTable">
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

      $(".departments").append(str);

      var table = $("#departmentsTable").DataTable({
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

let editModal = document.getElementById("editModal");

// My departments edit button
$(document).on("click", ".editDepartmentBtn", function () {
  editModal.style.display = "block";

  let editmodalCancel = document.getElementById("editmodalCancel");
  // Get the <span> element that closes the modal
  let editcloseBtn = document.getElementById("editcloseBtn");

  // When the user clicks on <span> (x), close the modal
  editcloseBtn.onclick = function () {
    editModal.style.display = "none";
  };

  editmodalCancel.onclick = function () {
    editModal.style.display = "none";
  };

  let id = $(this).attr("data-id");
  let department_name = $(this).attr("data-name");

  $("#departmentID").val(id);
  $("#department_name").val(department_name);
  // $.ajax({
  //   url: url + "editDepartment",
  //   method: "POST",
  //   dataType: "json",
  //   success: function (response) {
  //     getAllCooks();
  //   },
  // });
});

$(document).ready(function () {
  getDepartments();

  $("#editModalAccept").click(function () {
    let id = $("#departmentID").val();
    let department_name = $("#department_name").val();

    
    if (department_name == "") {
      $("#edit_error_message").prop("hidden", false);
    } else {
      $("#edit_error_message").prop("hidden", true);
      item = {};
      item["id"] = id;
      item["department_name"] = department_name;
  
      item = JSON.stringify(item);
  
      $.ajax({
        url: url + "editDepartment",
        method: "POST",
        dataType: "json",
        data: item,
      })
        // if success
        .done(function () {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Edited Successfully!",
          });
  
          editModal.style.display = "none";
          getDepartments();
        })
        // if failed
        .fail(function (data) {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Department Name already exist! Can't modify the information!",
          });
        });
    
    
    }
  });

  $("#addDepartment").click(function () {
    var department = document.getElementById("department_field").value;

    if (department == "") {
      $("#error_message").prop("hidden", false);
    } else {
      $("#error_message").prop("hidden", true);

      addDepartment(department);
    }
  });
});

function addDepartment(department) {
  let department_name = toTitleCase(department);

  item = {};
  // inputs will be turned into objects
  item["department_name"] = department_name;
  // stringify the object
  item = JSON.stringify(item);

  // console.log(item);

  $.ajax({
    url: url + "addDepartment",
    type: "post",
    dataType: "json",
    data: item,
  })
    // if success
    .done(function () {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Successfully added new department!",
      });
      getDepartments();
    })
    // if failed
    .fail(function (data) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Department Name already exist!",
      });
    });
}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
