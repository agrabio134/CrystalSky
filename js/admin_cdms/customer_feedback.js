let url = "http://localhost/CrystalSkyAdmin/html/admin_cdms/restApi/";
var minDate;
var maxDate;
// document init functions ready

$.fn.dataTable.ext.search.push(
  function( settings, data, dataIndex ) {
      var min = minDate.val();
      var max = maxDate.val();
      // console.log(min + max)
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
getSavedFeedbacks()
getFeedbacks()
getPublishFeedbacks()



});

// unfinished
function getFeedbacks() {
  $.ajax({
    url: url + "getFeedback",
    type: "post",
    dataType: "json",
  })
    // if success
    .done(function (data) {
      let user_data = data.payload;
      // accessing all items in the payload
      let str = `
      <table id="feedTable">
        <thead>
            <tr>
                <th class="thLeft">Name</th>
                <th>Contact no.</th>
                <th>Reservation Date</th>
                <th>Username</th>
                <th class="thRight">Action</th>
            </tr>
        </thead>
      <tbody>
      `;

      user_data.forEach((user) => {
        
        str += `
        <input id="guest_id" name="guest_id" value="${user.id}" type="hidden">
        <tr>
          <td>${user.first_name} ${user.last_name}</td>
          <td>${user.contact_no}</td>
          <td>${user.created_at}</td>
          <td>${user.username}</td>
          <td>
              <button type="button" class="defBtn viewBtn" id="keptViewBtn" onclick='getFeedbackModal(${user.reservation_appointments_id})'>VIEW</button>
              <button type="button" class="defBtn acceptBtn" onclick='publishFeedback(${user.reservation_appointments_id})'>PUBLISH</button>
              <button type="button" class="defBtn keepBtn" onclick='saveFeedback(${user.reservation_appointments_id})'>SAVE</button>
          </td>
        </tr>
        
      `;
      });
      str += `
    </tbody>
  </table>`;

      $(".ftableCont").append(str);

      var table = $("#feedTable").DataTable({
        language: {
          paginate: {
            next: '<i class="fa fa-chevron-right" aria-hidden="true">',
            previous: '<i class="fa fa-chevron-left" aria-hidden="true">',
          },
        },
        dom: "rtip",
      });
      $('#feedTable').DataTable().draw();

      $("#searchInput").keyup(function () {
        table.search($("#searchInput").val()).draw();
      });
      $('#min, #max').on('change', function () {
        table.draw();
      });

    })
    // if failed
    .fail(function (data) {
    });
}


    
      $("#saved").attr("hidden",true);

  $('#searchInput').keyup( function () {
      feedbacktable.search($('#searchInput').val()).draw();
      savedfeedbacktable.search($('#searchInput').val()).draw();
      customertable.search($('#searchInput').val()).draw();
    } );

    $(".feedbackPageBtn").css("background-color", "#4BB1F7");
    $(".feedbackPageBtn").css("color", "white");
    $("#publish").attr("hidden",true);
  

function getSavedFeedbacks() {
      $.ajax({
        url: url + "getSavedFeedback",
        type: "post",
        dataType: "json",
  
      })
  
        // if success
        .done(function (data) {
          let user_data = data.payload;
          // accessing all items in the payload
          let str = `
          <table id="save" >
                      <thead>
                          <tr>
                              <th class="thLeft">Name</th>
                              <th>Contact no.</th>
                              <th>Reservation Date</th>
                              <th>Username</th>
                              <th class="thRight">Action</th>
                          </tr>
                      </thead>
                      <tbody>
          `;
  
          user_data.forEach((user) => {
            
            str += `
            <input id="guest_id" name="guest_id" value="${user.id}" type="hidden">
            <tr>
              <td>${user.first_name} ${user.last_name}</td>
              <td>${user.contact_no}</td>
              <td>${user.created_at}</td>
              <td>${user.username}</td>
              <td>
                <button type="button" class="defBtn viewBtn" id="keptViewBtn" onclick='getFeedbackModal(${user.reservation_appointments_id})'>VIEW</button>
                <button type="button" class="defBtn keepBtn" onclick='keepFeedback(${user.reservation_appointments_id})'>KEEP</button>             
              </td>
            </tr>
            
          `;
          });
          str += `
        </tbody>
      </table>`;
  
          $(".stableCont").append(str);
  
          var table = $("#save").DataTable({
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
          $('#min, #max').on('change', function () {
            table.draw();
          });
        })
        // if failed
        .fail(function (data) {
        });
    }
  
      var feedbacktable = $('#feedback').DataTable({
        language: {
          paginate: {
          next: '<i class="fa fa-chevron-right" aria-hidden="true">',
          previous: '<i class="fa fa-chevron-left" aria-hidden="true">'  
         }
          },
          "dom": 'rtip'
        });
        
          $("#saved").attr("hidden",true);
  
      $('#searchInput').keyup( function () {
          feedbacktable.search($('#searchInput').val()).draw();
          savedfeedbacktable.search($('#searchInput').val()).draw();
          customertable.search($('#searchInput').val()).draw();
        } );
    
        $(".feedbackPageBtn").css("background-color", "#4BB1F7");
        $(".feedbackPageBtn").css("color", "white");
        // end of get saved feedbacks

        function getPublishFeedbacks() {
          $.ajax({
            url: url + "getPublishFeedback",
            type: "post",
            dataType: "json",
      
          })
      
            // if success
            .done(function (data) {
              let user_data = data.payload;
              // accessing all items in the payload
              let str = `
              <table id="published" >
                          <thead>
                              <tr>
                                  <th class="thLeft">Name</th>
                                  <th>Contact no.</th>
                                  <th>Reservation Date</th>
                                  <th>Username</th>
                                  <th class="thRight">Action</th>
                              </tr>
                          </thead>
                          <tbody>
              `;
      
              user_data.forEach((user) => {
                
                str += `
                <input id="guest_id" name="guest_id" value="${user.id}" type="hidden">
                <tr>
                  <td>${user.first_name} ${user.last_name}</td>
                  <td>${user.contact_no}</td>
                  <td>${user.created_at}</td>
                  <td>${user.username}</td>
                  <td>
                    <button type="button" class="defBtn viewBtn" id="keptViewBtn" onclick='getFeedbackModal(${user.reservation_appointments_id})'>VIEW</button>
                    <button type="button" class="defBtn keepBtn" onclick='keepFeedback(${user.reservation_appointments_id})'>KEEP</button>             
                  </td>
                </tr>
                
              `;
              });
              str += `
            </tbody>
          </table>`;
      
              $(".ptableCont").append(str);
      
              var table = $("#published").DataTable({
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
              $('#min, #max').on('change', function () {
                table.draw();
              });
            })
            // if failed
            .fail(function (data) {     
              let str = `
              <table id="published">
                          <thead>
                              <tr>
                                  <th class="thLeft">Name</th>
                                  <th>Contact no.</th>
                                  <th>Reservation Date</th>
                                  <th>Username</th>
                                  <th class="thRight">Action</th>
                              </tr>
                          </thead>
                          <tbody>
                            <td></td>
                            <td></td>
                            <td>No records found.</td>
                            <td></td>
                            <td></td>
                          </tbody>
                          </table>
              `;
              $(".ptableCont").append(str);
            });
        }
      
          var feedbacktable = $('#feedback').DataTable({
            language: {
              paginate: {
              next: '<i class="fa fa-chevron-right" aria-hidden="true">',
              previous: '<i class="fa fa-chevron-left" aria-hidden="true">'  
             }
              },
              "dom": 'rtip'
            });
          
            var customertable = $('#example').DataTable({
      
              language: {
                paginate: {
                next: '<i class="fa fa-chevron-right" aria-hidden="true">',
                previous: '<i class="fa fa-chevron-left" aria-hidden="true">'  
               }
                },
                "dom": 'rtip'
              });
      
            var savedfeedbacktable = $('#save').DataTable({
              language: {
                paginate: {
                next: '<i class="fa fa-chevron-right" aria-hidden="true">',
                previous: '<i class="fa fa-chevron-left" aria-hidden="true">'  
               }
                },
                "dom": 'rtip'
              });
            
              $("#saved").attr("hidden",true);
              // $("#feedbackTableCont").attr("hidden",true);
      
          $('#searchInput').keyup( function () {
              feedbacktable.search($('#searchInput').val()).draw();
              savedfeedbacktable.search($('#searchInput').val()).draw();
              customertable.search($('#searchInput').val()).draw();
            } );
        
            $(".feedbackPageBtn").css("background-color", "#4BB1F7");
            $(".feedbackPageBtn").css("color", "white");




        function getFeedbackModal(data){
          document.getElementById("feedbackModal").style.display = "block";
          $.ajax({
              // url course -> gets user
              url: url + 'getFeedbackDetails/' + data,
              type: 'POST',
              dataType: 'JSON',
              success: function (response) {
                  guest = response.payload;
                  var len = guest.length;
                  // for loop each course
                  for (var i = 0; i < len; i++) {
                      var feedID= guest[i].id;
                      var id = guest[i].reservation_appointments_id;
                      var fname = guest[i].first_name;
                      var lname = guest[i].last_name;
                      var feedback = guest[i].feedback;
                      var rating = guest[i].rating;
                      $("#feedID").val(id);
                      $("#feedbackArea").val(feedback);
                      $("#name").val(lname +", "+ fname);
                      // $("#star").val(rating);
                      if (rating == 1){
                        $("#star-1").attr('checked', 'checked');
                        
                      }
                      else if (rating == 2){
                        $("#star-2").attr('checked', 'checked');
                        
                      }
                      else if (rating == 3){
                        $("#star-3").attr('checked', 'checked');
                        
                      }
                      else if (rating == 4){
                        $("#star-4").attr('checked', 'checked');
                        
                      }
                      else {
                        $("#star-5").attr('checked', 'checked');
                        
                      }

                      $("#accountID").val(feedID);
                  }
              }
          });
      }

  function saveFeedback(data) {
    Swal.fire({
      title: 'Warning',
      text: 'Do you really want to save this feedback?',
      icon: 'warning',
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Cancel`,
      confirmButtonColor: '#4BB1F7',
      denyButtonColor: '#F27171',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        // Swal.fire('Saved!', '', 'success')
            $.ajax({
              // url course -> gets user
              url: url + 'saveFeedback/' + data,
              type: 'POST',
              dataType: 'JSON',
              success: function (response) {
                        Swal.fire({
                          title: 'Success!',
                          text: 'Feedback successfully saved.',
                          icon: 'success',
                          confirmButtonText: 'Continue',
                          confirmButtonColor: '#4BB1F7',
                        }).then((result) => {
                          // Reload the Page
                          location.reload();
                        });
                // location.reload();
              }
          });
      } else if (result.isDenied) {
        wal.fire({
          title: 'Unsuccessful!',
          icon: 'error',
          confirmButtonText: 'continue',
        }).then((result) => {
          // Reload the Page
          location.reload();
        });
      }
    })
  }

  function keepFeedback(data) {
    Swal.fire({
      title: 'Warning',
      text: 'Do you really want to keep this feedback?',
      icon: 'warning',
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Keep',
      denyButtonText: `Cancel`,
      confirmButtonColor: '#4BB1F7',
      denyButtonColor: '#F27171',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        // Swal.fire('Saved!', '', 'success')
            $.ajax({
              // url course -> gets user
              url: url + 'keepFeedback/' + data,
              type: 'POST',
              dataType: 'JSON',
              success: function (response) {
                        Swal.fire({
                          text: 'Feedback successfully kept.',
                          title: 'Success',
                          icon: 'success',
                          confirmButtonColor: '#4BB1F7',
                        }).then((result) => {
                          // Reload the Page
                          location.reload();
                        });
                // location.reload();
              }
          });
      } else if (result.isDenied) {
        wal.fire({
          title: 'Unsuccessful!',
          icon: 'error',
          confirmButtonText: 'continue',
        }).then((result) => {
          // Reload the Page
          location.reload();
        });
      }
    })
  }

  function publishFeedback(data) {
    Swal.fire({
      text: 'Do you really want to publish this feedback?',
      title: 'Warning',
      icon: 'warning',
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Publish',
      denyButtonText: `Cancel`,
      confirmButtonColor: '#4BB1F7',
      denyButtonColor: '#F27171',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        // Swal.fire('Saved!', '', 'success')
            $.ajax({
              // url course -> gets user
              url: url + 'publishFeedback/' + data,
              type: 'POST',
              dataType: 'JSON',
              success: function (response) {
                        Swal.fire({
                          text: 'Feedback has been published!',
                          title: 'Success',
                          icon: 'success',
                          confirmButtonText: 'continue',
                          confirmButtonColor: '#4BB1F7',
                        }).then((result) => {
                          // Reload the Page
                          location.reload();
                        });
                // location.reload();
              }
          });
      } else if (result.isDenied) {
        wal.fire({
          title: 'Unsuccessful!',
          icon: 'error',
          confirmButtonText: 'continue',
        }).then((result) => {
          // Reload the Page
          location.reload();
        });
      }
    })
  }

function closeModal(){
  document.getElementById("feedbackModal").style.display = "none";
}



function showFeedbackTable(){
  $(".feedbackPageBtn").css("background-color", "#4BB1F7");
  $(".feedbackPageBtn").css("color", "white");
  $(".savedPageBtn").css("background-color", "white");
  $(".savedPageBtn").css("color", "#5E6574");
  $(".publishPageBtn").css("background-color", "white");
  $(".publishPageBtn").css("color", "#5E6574");
  $("#feedbackTableCont").attr("hidden",false); // show 'keep' feedbacks table
  $("#saved").attr("hidden",true);  //  hide 'saved' feedbacks table
  $("#publish").attr("hidden",true); // hide 'published' feedbacks table
  }

function hideFeedbackTable(){
  $(".feedbackPageBtn").css("background-color", "white");
  $(".feedbackPageBtn").css("color", "#5E6574");
  $(".savedPageBtn").css("background-color", "#4BB1F7");
  $(".savedPageBtn").css("color", "white");
  $(".publishPageBtn").css("background-color", "white");
  $(".publishPageBtn").css("color", "#5E6574");
  $("#feedbackTableCont").attr("hidden",true); // hide 'keep' feedbacks table
  $("#saved").attr("hidden",false); // show 'saved' feedbacks table
  $("#publish").attr("hidden",true); // hide 'published' feedbacks table
}

function publishTable(){
  $(".feedbackPageBtn").css("background-color", "white");
  $(".feedbackPageBtn").css("color", "#5E6574");
  $(".savedPageBtn").css("background-color", "white");
  $(".savedPageBtn").css("color", "#5E6574");
  $(".publishPageBtn").css("background-color", "#4BB1F7");
  $(".publishPageBtn").css("color", "white");
  $("#publish").attr("hidden",false); // show 'published' feedbacks table
  $("#feedbackTableCont").attr("hidden",true); //  hide 'keep' feedbacks table
  $("#saved").attr("hidden",true); // hide 'saved' feedbacks table 
}

var modal = document.getElementById("feedbackModal");
// Get the button that opens the modal
var btn = document.getElementById("viewBtn");

var keptViewBtn = document.getElementById("keptViewBtn");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

keptViewBtn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

