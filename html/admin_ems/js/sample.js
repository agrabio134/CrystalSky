let url = "http://localhost/CrystalSky/html/admin_ems/restApi/";

$(document).ready(function () {
  getDepartments();

  
});

function getDepartments() {
    $.ajax({
      url: url + "getDepartments",
      type: "post",
      dataType: "json",
    })
      // if success
      .done(function (data) {
        let departments_data = data.payload;
        console.log(data.remarks)
        // accessing all items in the payload
        let str = `
        <table id="departmentsTable">
          <thead>
            <tr>
              <th class="thLeft"> DepartmentID</th>
              <th>Department Name</th>
            </tr>
          </thead>
          <tbody>
        `;


        departments_data.forEach((dept) => {
          str += `
        <tr>
              <td>${dept.id}</td>
              <td>${dept.department_name}</td>
            </tr>
        `;
        });
        str += `
      </tbody>
    </table>`;

        $("#departments").append(str);

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
        console.error("not okay");
      });
  }
