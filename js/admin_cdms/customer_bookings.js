
var url = 'http://localhost/CrystalSkyAdmin/html/admin_cdms/restApi/';
// ===================== AJAX FUNCTIONS ========================== //
var rec_data;
var rec_id;
var edit_data;
var act;
var startDate;
var endDate;

var minDate;
var maxDate;
// document init functions ready

$.fn.dataTable.ext.search.push(
  function( settings, data, dataIndex ) {
      var min = minDate.val();
      var max = maxDate.val();
      var date = new Date( data[4] );
      if (
          ( min === null && max === null ) ||
          ( min === null && date <= max ) ||
          ( min <= date   && max === null ) ||
          ( min <= date   && date <= max )
      ) {
          return true;
      }
      return false;
  }
);



$(document).ready(function () {
  minDate = new DateTime($('#min'), {
    format: 'MMMM Do YYYY'
});
maxDate = new DateTime($('#max'), {
    format: 'MMMM Do YYYY'
});
    getAllReservations();
    printDiv();
    downloadCSVFile();
    tableToCSV();



});



function getAllReservations() {
    $.ajax({
        url: url + "getReservationList",
        type: "post",
        dataType: "json",
      })
        // if success
        .done(function (data) {
          let reservations_data = data.payload;
          // accessing all items in the payload
          console.log("hello po ako si .done")
          
          let str = `
          <table id="printTable">
                <thead>
                    <tr>
                        <th class="thLeft tableHeading">Name</th>
                        <th class="tableHeading">Transact no.</th>
                        <th class="tableHeading">Accomodation</th>
                        <th class="tableHeading">Room No.</th>
                        <th class="tableHeading">Check-in</th>
                        <th class="tableHeading">Check-out</th>
                        <th class="thRight tableHeading">Status</th>
                    </tr>
                </thead>
            <tbody>
            
          `;
          reservations_data.forEach((reservation) => {
            str += `
            <tr>
                <td class="tableData">${reservation.first_name} ${reservation.last_name}</td>
                <td class="tableData">${reservation.invoice_id}</td>
                <td class="tableData">${reservation.name}</td>
                <td class="tableData">${reservation.room_number}</td>
                <td class="tableData">${reservation.check_in}</td>
                <td class="tableData">${reservation.check_out}</td>
                <td class="tableData">${reservation.status}</td>

            </tr>
          `;
          });
          str += `
        </tbody>
      </table>`;
  
          $(".resTable").append(str);
  
          var table = $("#printTable").DataTable({
            language: {
              paginate: {
                next: '<i class="fa fa-chevron-right" aria-hidden="true">',
                previous: '<i class="fa fa-chevron-left" aria-hidden="true">',
              },
            },
            // dom: "rtip",
            // buttons: ['print']
            dom: 'Bfrtip',
            buttons: [
              {
                  extend: 'csvHtml5',
                  text: '<i class="fa fa-file-excel-o" aria-hidden="true"></i> EXCEL',
                  titleAttr: 'CSV'
              },
              {
                  extend: 'pdfHtml5',
                  text: '<i class="fa fa-file-pdf-o" aria-hidden="true"></i> PDF',
                  titleAttr: 'PDF'
              },
              {
                  extend: 'print',
                  text: '<i class="fa fa-print" aria-hidden="true"></i> PRINT',
                  titleAttr: 'Print'
              }
            ]
          });
          table.buttons().container().appendTo($('#funcButtonCont'));

          $("#searchInput").keyup(function () {
            table.search($("#searchInput").val()).draw();
          });
          $('#min, #max').on('change', function () {
            table.draw();
          });
        })
        // if failed
        .fail(function (data) {
          // console.error("not okay");
        });
}


// close edit modal
function closeEditModal() {
    document.getElementById("editmodal").style.display = "none";
   
}

function closeDeleteModal() {
    document.getElementById("delmodal").style.display = "none";
}

function closePdfModal() {
    document.getElementById("pdfmodal").style.display = "none";
}

function closeAddModal() {
    document.getElementById("addmodal").style.display = "none";
}

// // print PDF
// function printDiv() {
//   var divToPrint=document.getElementById("printTable");
//   newWin= window.open("");
//   newWin.document.write(divToPrint.outerHTML);
//   newWin.print();
//   newWin.close();
// }

// print as CSV
function tableToCSV() {
 
  // Variable to store the final csv data
  var csv_data = [];

  // Get each row data
  var rows = document.getElementsByTagName('tr');
  for (var i = 0; i < rows.length; i++) {

      // Get each column data
      var cols = rows[i].querySelectorAll('td,th');

      // Stores each csv row data
      var csvrow = [];
      for (var j = 0; j < cols.length; j++) {

          // Get the text data of each cell
          // of a row and push it to csvrow
          csvrow.push(cols[j].innerHTML);
      }

      // Combine each column value with comma
      csv_data.push(csvrow.join(","));
  }

  // Combine each row data with new line character
  csv_data = csv_data.join('\n');

  // Call this function to download csv file 
  downloadCSVFile(csv_data);

}

function downloadCSVFile(csv_data) {

  // Create CSV file object and feed
  // our csv_data into it
  CSVFile = new Blob([csv_data], {
      type: "text/csv"
  });

  // Create to temporary link to initiate
  // download process
  var temp_link = document.createElement('a');

  // Download csv file
  temp_link.download = "CDMS-Booking-History.csv";
  var url = window.URL.createObjectURL(CSVFile);
  temp_link.href = url;

  // This link should not be displayed
  temp_link.style.display = "none";
  document.body.appendChild(temp_link);

  // Automatically click the link to
  // trigger download
  temp_link.click();
  document.body.removeChild(temp_link);
}



