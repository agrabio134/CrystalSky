let url = "http://localhost/CrystalSkyAdmin/html/admin_cdms/restApi/";

$(document).ready(function () {
  getActiveUsers();
  getBannedAccounts();
  banningHistory();
  
    function getActiveUsers() {
      $.ajax({
        url: url + "getUser",
        type: "post",
        dataType: "json",
      })
        // if success
        .done(function (data) {
          let user_data = data.payload;
          // accessing all items in the payload
          let str = `
          <table id="active">
          <thead>
              <tr>
                  <th class="thLeft">Name</th>
                  <th>Contact no.</th>
                  <th>Username</th>
                  <th>Role</th>
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
            <td>${user.username}</td>
            <td>
                <select name="role" id="role${user.id}" class="selectCont" onchange="editrole(${user.id})">`;
                if (user.role == "Regular") {
                  str += `<option value="Regular" selected>Regular</option>
                          <option value="Loyal">Loyal</option>
                          <option value="Vip">Vip</option>`;
                } 
                else if (user.role == "Loyal") {
                  str += `<option value="Regular">Regular</option>
                          <option value="Loyal" selected>Loyal</option>
                          <option value="Vip">Vipp</option>`;
                }   
                else if (user.role == "Vip") {
                  str += `<option value="Regular">Regular</option>
                          <option value="Loyal">Loyal</option>
                          <option value="Vip" selected>Vip</option>`;
                }   
                
                str +=` </select>
            </td>
              <td>
                <button type="button" class="defBtn viewBtn" id="viewBtn" onclick='getAccountDetails(${user.id})'>DETAILS</button>
                <button type="button" class="defBtn banBtn" onclick="getStatus(${user.id})">BAN</button>
              </td>
            </tr>
            
          `;
          });
          str += `
        </tbody>
      </table>`;
  
          $(".userTableCont").append(str);
  
          var table = $("#active").DataTable({
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
        });
    }

    // **get account details for admin side

    
  

        // get banned accounts
        function getBannedAccounts(){
          $.ajax({
            url: url + "getBannedUser",
            type: "post",
            dataType: "json",
          })
          
            // if success
            .done(function (data) {
              let user_data = data.payload;
              // accessing all items in the payload
              let str = `
              <table id="banned">
                <thead>
                    <tr>
                      <th class="thLeft tableHeading">Name</th>
                      <th class="tableHeading">contact no.</th>
                      <th class="tableHeading">Username</th>
                      <th class="tableHeading">Details</th>
                      <th class="thRight tableHeading">Action</th>
                    </tr>
                </thead>
              <tbody>
              `;
        
              user_data.forEach((user) => {
                
                str += `
                <input id="guest_id" name="guest_id" value="${user.id}" type="hidden">
                  <tr>
                    <td class="tableData">${user.first_name} ${user.last_name}</td>
                    <td class="tableData">${user.contact_no}</td>
                    <td class="tableData">${user.username}</td>
                    <td class="tableData">
                        <button type="button" class="defBtn viewBtn" id="viewBtn" onclick='getbanDetails(${user.id})'>VIEW</button>
                    </td>
                    <td class="tableData">
                      <button type="button" class="defBtn viewBtn" id="viewBtn" onclick='getAccountDetails(${user.id})'>DETAILS</button>
                        <button type="button" class="defBtn acceptBtn" id="${user.id}" onclick="unbanAccount(${user.id})">UNBAN</button>
                    </td>
                  </tr>
              `;
              });
              str += `
            </tbody>
          </table>`;
        
              $(".bannedUserTableCont").append(str);
        
              // the problem (unable to hide on show Active accounts)
              var table = $("#banned").DataTable({
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
            });
        }
  });

  // get banning history
  function banningHistory(){
    $.ajax({
      url: url + "banningHistory",
      type: "post",
      dataType: "json",
    })
    
      // if success
      .done(function (data) {
        let user_data = data.payload;
        // accessing all items in the payload
        let str = `
        <table id="history">
          <thead>
              <tr>
                <th class="thLeft tableHeading">Username</th>
                <th class="tableHeading">Contact no.</th>
                <th class="tableHeading">Banning Date</th>
                <th class="thRight tableHeading">Details</th>
              </tr>
          </thead>
        <tbody>
        `;
  
        user_data.forEach((user) => {
          
          str += `
          <input id="guest_id" name="guest_id" value="${user.id}" type="hidden">
            <tr>
              <td class="tableData">${user.username}</td>
              <td class="tableData">${user.contact_no}</td>
              <td class="tableData">${user.banning_date}</td>
              <td class="tableData">
                  <button type="button" class="defBtn viewBtn" id="viewBtn" onclick='banningHistoryDetails(${user.id})'>VIEW</button>
              </td>
            </tr>
        `;
        });
        str += `
      </tbody>
    </table>`;
  
        $(".banningHistoryTableCont").append(str);
  
        // the problem (unable to hide on show Active accounts)
        var table = $("#history").DataTable({
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
      });
  }
  
  function banningHistoryDetails(id){
    document.getElementById("banHistoryModal").style.display = "block";
    $.ajax({
        // url course -> gets user
        url: url + 'banningHistoryDetails/' + id,
        type: 'POST',
        dataType: 'JSON',
        success: function (response) {
            guest = response.payload;
            var len = guest.length;
            // for loop each course
            for (var i = 0; i < len; i++) {
                var id = guest[i].guest_id;
                var reason = guest[i].reason;
                var ban_date = guest[i].banning_date;
                var fname = guest[i].first_name;
                var lname = guest[i].last_name;
                $("#hbanID").val(id);
                $("#hbanReason").val(reason);
                $("#hbanfname").val(lname + ", " + fname);
                $("#hban_date").val(ban_date);


            }
        }
    });
  }

  function banUser(id, status){
    document.getElementById("banModal").style.display = "block";
    $("#guestModalID").val(id);
}

  $("#ActivePageBtn").click(function () {
    $("#ActivePageBtn").css("background-color", "#4BB1F7");
    $("#ActivePageBtn").css("color", "white");
    
    $("#BanningHistoryPageBtn").css("background-color", "#FFFFFF"); // WHITE
    $("#BanningHistoryPageBtn").css("color", "#5E6574"); // TEXT BLACK
    $("#BannedPageBtn").css("background-color", "#FFFFFF"); 
    $("#BannedPageBtn").css("color", "#5E6574");
  
    $(".userTableCont").prop("hidden", false);
    $(".bannedUserTableCont").prop("hidden", true);
    $(".banningHistoryTableCont").prop("hidden", true);
  });
  
  $("#BannedPageBtn").click(function () {
    $("#BannedPageBtn").css("background-color", "#4BB1F7"); // BLUE
    $("#BannedPageBtn").css("color", "white");
    
    $("#BanningHistoryPageBtn").css("background-color", "#FFFFFF"); // WHITE
    $("#BanningHistoryPageBtn").css("color", "#5E6574"); // TEXT BLACK
    $("#ActivePageBtn").css("background-color", "#FFFFFF"); // WHITE
    $("#ActivePageBtn").css("color", "#5E6574"); // TEXT BLACK
    $(".userTableCont").prop("hidden", true);
    $(".bannedUserTableCont").prop("hidden", false);
    $(".banningHistoryTableCont").prop("hidden", true);
  });

  $("#BanningHistoryPageBtn").click(function () {
    $("#BanningHistoryPageBtn").css("background-color", "#4BB1F7");
    $("#BanningHistoryPageBtn").css("color", "white");

    $("#BannedPageBtn").css("background-color", "#FFFFFF"); 
    $("#BannedPageBtn").css("color", "#5E6574");
    $("#ActivePageBtn").css("background-color", "#FFFFFF");
    $("#ActivePageBtn").css("color", "#5E6574");
    $(".userTableCont").prop("hidden", true);
    $(".bannedUserTableCont").prop("hidden", true);
    $(".banningHistoryTableCont").prop("hidden", false);
  });
  

  function getStatus(data){
    document.getElementById("banModal").style.display = "block";
    $.ajax({
        // url course -> gets user
        url: url + 'getUserDetails/' + data,
        type: 'POST',
        dataType: 'JSON',
        success: function (response) {
            guest = response.payload;
            var len = guest.length;
            // for loop each course
            for (var i = 0; i < len; i++) {
                var id = guest[i].id;
                var status = guest[i].status;
                $("#guestModalID").val(id);
                $("#guestModalStatus").val(status);
            }
        }
    });
}

function getbanDetails(data){
  document.getElementById("banDetailModal").style.display = "block";
  $.ajax({
      // url course -> gets user
      url: url + 'getBanDetails/' + data,
      type: 'POST',
      dataType: 'JSON',
      success: function (response) {
          guest = response.payload;
          var len = guest.length;
          // for loop each course
          for (var i = 0; i < len; i++) {
              var id = guest[i].guest_id;
              var reason = guest[i].reason;
              var ban_date = guest[i].banning_date;
              var fname = guest[i].first_name;
              var lname = guest[i].last_name;
              var res_date = guest[i].created_at;
              $("#banID").val(id);
              $("#banReason").val(reason);
              $("#banfname").val(lname +", " + fname);
              $("#ban_date").val(ban_date);
              $("#res_date").val(res_date);
          }
      }
  });
}

function getAccountDetails(data) {
  document.getElementById("accountModal").style.display = "block";
  $.ajax({
      // **no routes and get.php function yet!
      url: url + 'getAccount/' + data,
      type: 'POST',
      dataType: 'JSON',
      // data:item,
      success: function (response) {
          guest = response.payload;
          var len = guest.length;
          // for loop each course
          for (var i = 0; i < len; i++) {
              // each field as variable
              var account = guest[i].id;
              var fname = guest[i].first_name;
              var lname = guest[i].last_name;

               // gender and bday field
              var gender = guest[i].gender;
              var bday = guest[i].birthday;

              var contact = guest[i].contact_no;
              var tel = guest[i].tel_num;
              var email = guest[i].email;
              var username = guest[i].username;
              var pword = guest[i].password;
              var brgy = guest[i].barangay;
              var blk_st = guest[i].block_street;
              var city = guest[i].city;
              var country = guest[i].country;
              var postal = guest[i].postal_code;
              $("#accountID").val(account);
              $("#fullname").val(lname + ", " + fname);
              // gender and bday field
              $("#gender").val(gender);
              $("#birthday").val(bday);

              $("#contactNumber").val(contact);
              $("#telNumber").val(tel);
              $("#email").val(email);
              $("#username").val(username);
              $("#userpassword").val(pword);
              $("#address").val(blk_st + ", " + brgy  + ", " + city  + ", " + country  + " " + postal);
          }
      }
  });
}


function unbanAccount(data){
  // document.getElementById("unbanModal").style.display = "block";
  Swal.fire({
    title: 'Warning',
    text: 'Do you really want to unban this user?',
    icon: 'warning',
    showDenyButton: true,
    // showCancelButton: true,
    confirmButtonText: 'Unban',
    denyButtonText: `Cancel`,
    confirmButtonColor: '#4BB1F7',
    denyButtonColor: '#F27171',
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      $.ajax({
        // url course -> gets user
        url: url + 'unbanAccount/' + data,
        type: 'POST',
        dataType: 'JSON',
        success: function (response) {
                  Swal.fire({
                    text: 'Account Succesfully Unbanned!',
                    title: 'Success',
                    icon: 'success',
                    confirmButtonColor: '#4BB1F7',
                    confirmButtonText: 'Continue'
                  }).then((result) => {
                    // Reload the Page
                    location.reload();
                  });
          // location.reload();
        }
    });
    } else if (result.isDenied) {
      Swal.fire('Changes are not saved', '', 'info')
    }
  })
  
}



  
function inputRemarks() {
    
  const id = $("#guestModalID").val();
  const reason = $("#banRemarksInput").val();

  // if empty..
  if (reason===""){
      // alert("Reason can\'t be empty!")
      Swal.fire({
        title: 'Error',
        text: 'Reason can\'t be empty!',
        icon: 'error',
        confirmButtonColor: '#F27171',
        confirmButtonText: 'Try again'
      })

  }
  else{
      // object variable
      item = {}
      // inputs will be turned into object
      item ["guest_id"] = id;
      item ["reason"] = reason;
      // stringify the object
      item = JSON.stringify(item);
      // ajax
      $.ajax({
          // var url + course
          url: url+'banCustomer', 
          type: 'post',
          dataType: 'json',
          // data as item
          data:  item 
      })
      // if success
      .done( function( data ) {
          //alert course name that was added
          Swal.fire({
              text: 'Account Succesfully Banned!',
              title: 'Success',
              icon: 'success',
              confirmButtonColor: '#4BB1F7',
              confirmButtonText: 'Continue'
            }).then((result) => {
              // Reload the Page
              location.reload();
            });
      })
      // if failed
      .fail( function( data ) {
      });
  }
}

  function showFeedbackTable(){
    $("#feedbackTableCont").attr("hidden",false);
    $("#saved").attr("hidden",true);
    $(".feedbackPageBtn").css("background-color", "#4BB1F7");
    $(".feedbackPageBtn").css("color", "white");
    $(".savedPageBtn").css("background-color", "white");
    $(".savedPageBtn").css("color", "#5E6574");
    }
  
  function hideFeedbackTable(){
    $(".feedbackPageBtn").css("background-color", "white");
    $(".feedbackPageBtn").css("color", "#5E6574");
    $(".savedPageBtn").css("background-color", "#4BB1F7");
    $(".savedPageBtn").css("color", "white");
    $("#saved").attr("hidden",false);
    $("#feedbackTableCont").attr("hidden",true);
  }
  
  function editrole(id) {
    const role = $("#role" + id).val();
  
    item = {}
    item["role"] = role;
    item["id"] = id;
    item = JSON.stringify(item);
    $.ajax({
        url: url + 'updateRole',
        type: 'POST',
        dataType: 'json',
        data: item
    })
        .done(function (data) {
          Swal.fire({
            text: 'Role Succesfully Updated!',
            title: 'Success',
            icon: 'success',
            confirmButtonColor: '#4BB1F7',
            confirmButtonText: 'Continue'
          })
          
        })
        .fail(function (data) {
          alert('Error');
        });
  }

  
  function closebanModal(){
    document.getElementById("banModal").style.display = "none";
  }

  function closeunbanModal(){
    document.getElementById("unbanModal").style.display = "none";
  }

  function closebaDetailModal(){
    document.getElementById("banDetailModal").style.display = "none";
  }
  
  function closebanHistoryDetailModal(){
    document.getElementById("banHistoryModal").style.display = "none";
  }

  function closeaccountModal(){
    document.getElementById("accountModal").style.display = "none";
  }
  
 
  