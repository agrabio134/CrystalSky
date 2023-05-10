let url = "http://localhost/CrystalSky/html/admin_cms/api/";

$(document).ready(function () {
  getRooms();
});

const getRooms = () => {
  $.ajax({
    url: url + "getRoomsPreview",
    type: "post",
    dataType: "json",
  })

    .done(function (data) {
      let RoomContent = data.payload;

      RoomContent.sort((a, b) => a.room_number - b.room_number);


      let str = `
        <style>
  .tableMainCont{
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.tableCont {
    border: 1px solid #dfdede;
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0), 0 2px 5px 0 rgba(0, 0, 0, 0.10);
    width: 99.9%;
}

table {
    font-family: 'montserrat-medium';
    border-collapse: collapse;
    width: 100%;
    color: #424857;
  }
  
  td, th {
    padding: 8px;
    text-align: center !important;
  }


  .thRight {
    border-radius: 0 15px 0 0;
  }

  td {
    font-size: 14px;
    padding-top: 15px !important;
    padding-bottom: 15px !important;
    vertical-align: middle;
  }

  th {
    text-transform: uppercase;
    font-family: 'montserrat-bold';
    font-size: 17px;
    padding: 20px !important;
    background: #F1F1F1;
  }
  .defBtn {
  padding: 7px 10px;
  border: none;
  border-radius: 3px;
  font-family: 'montserrat-medium';
  color: white;
}
.editBtn {
  background-color: #4BB1F7;
  cursor: pointer;
}
.deletebtn{
  background-color: #FF5D5D;
  text-decoration: none;
}
        </style>
    
        <table>
          <thead>
              <tr>
                <th class="thLeft">Room number</th>
                <th>Category</th>
                <th>Price</th>
                <th class="thRight">Action</th>
            </tr>
          <thead>
          <tbody>
          `;

      RoomContent.forEach((content) => {
        str += `
             
            <tr>
                <td>${content.room_number}</td>
                <td>${content.name}</td>
                <td>${content.price.toFixed(2)}</td>
                <td>
                <button type="button" id="editRoom${content.id}" class="btn btn-primary edit-button edit_about defBtn editBtn" data-id="${content.id}" data-toggle="modal" data-target="#editModal">Edit</button>
                <a href="#" data-id="${content.id}" class="delete-button defBtn deletebtn ">Delete</a>
                </td>
            </tr>
            
          
        `;
      });
      str += `<tbody>
        </table>`;

      $(".tableCont").append(str);

      console.log(data);
    })
    // if failed
    .fail(function (data) {
      console.error("not okay");
    });
};



$(document).ready(function() {
  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get('id');

  if (roomId) {
    setTimeout(function() {
      $(`#editRoom${roomId}`).trigger('click');
      // Trigger click event on the edit button with the corresponding roomId
    }, 600);
    // Delay triggering the click event by 1 second
  }
});

$(document).ready(function () {
  getRoomForm();
});

const getRoomForm = () => {
  $.ajax({
    url: url + "getRoomsCateg",
    type: "post",
    dataType: "json",
  })

    .done(function (data) {
      let RoomContent = data.payload;

      let str = `   
        <style>
          
        </style>    


        <form id="postNewRoom" method="post" class="form_create_room">
        <div class="div_create_rooms">
          <div class="room_container">
            <label class="room_number_label" for="room_number">Room number: </label>
            <input class="Room_number_input" type="number" id="room_number" name="room_number"  min="1" placeholder="Room number.." required>
          </div>

          <div class="label_container">
            <label class="category_name" for="category_id">Category:</label>
            <select class="category_id_cont" id="category_id" name="category_id"> `;

      RoomContent.forEach((content) => {
        str += ` 
                <option value="${content.id}">${content.name}</option>

          `;
      });
      str += `  
        </select>
        </div>
        <div class="submit_cont">
        <input class="submit_input" type="submit" value="SUBMIT">
        </div>
        </div>

        
        </form>
        `;



      console.log(data);



      $("#getRoomForm").append(str);

      $("#postNewRoom").submit(function (e) {
        e.preventDefault();
        
        var roomNumber = $("#room_number").val();
        var categoryId = $("#category_id").val();
      
        // Display a confirmation dialog
        Swal.fire({
          icon: "question",
          title: "Confirmation",
          text: "Are you sure you want to post this new room?",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No"
        }).then((result) => {
          if (result.isConfirmed) {
            // User confirmed, make the AJAX request to the server
            $.ajax({
              url: url + "postNewRoom",
              method: "POST",
              data: {
                room_number: roomNumber,
                category_id: categoryId
              },
              success: function (response) {
                // Handle the success response from the server
                console.log(response);
                Swal.fire({
                  icon: "success",
                  title: "Success!",
                  text: "New room has been posted.",
                  showConfirmButton: true,
                }).then((result) => {
                  if (result.isConfirmed) {
                    location.reload();
                  }
                });
                
                // Add any additional logic or redirection here
              },
              error: function (xhr, status, error) {
                // Handle the error response from the server
                console.log(xhr.responseText);
                Swal.fire({
                  icon: "error",
                  title: "Error!",
                  text: "Failed to post new room."
                });
              }
            });
          }
        });
      });
      

        
    })
    // if failed
    .fail(function (data) {
      console.error("not okay");
    });

  //   console.log(data);
};

$(document).ready(function () {
  getRoomsCategory();
});

const getRoomsCategory = () => {
  $.ajax({
    url: url + "getRoomsCateg",
    type: "post",
    dataType: "json",
  })
    // if success

    .done(function (data) {
      let getRoomsCateg = data.payload;
      // accessing all items in the payload
      // console.log(data.remarks);

      // $("#ArchivedGallery").empty();

      let str = ` 
      
          
        
          
              <form class="form_container_about"  >
                <input type="hidden" id="id">

              <div class="modalBody">
                <div class="about_text_container">
                <label class="assign_room_container" for="RoomNumber">Room Number</label>
                  <input class="assign_room_container_input" type="text" id="RoomNumber" min="1" readonly>
                </div>

                <div class="assign_category_container">
                <div class="choose_category_rooms">Choose Category</div>
                <select class="about_textarea_input" id="category">
                <option value="" selected disabled>Select a category</option>

          
        `;

      getRoomsCateg.forEach((content) => {
        
        str += `  
                
                <option value="${content.id}">${content.name}</option>
                


                `;
      });
      str += `
              <select>
              </div>
              
              <div class="submit_button_about">
                <button class="saveButton_about" type="button" id="saveButton">SAVE</button>
      
                <button class="cancelButton_about" type="button" id="cancelButton">CANCEL</button>
              </div>
              </div>
            </form>`;

      $("#getCategoryID").append(str);

      console.log(data);
    })
    // if failed
    .fail(function (data) {
      console.error("not okay");
    });
};

// Show the modal when the edit button is clicked
$(document).on("click", ".edit-button", function () {
  // Get the ID of the item being edited
  let itemId = $(this).data("id");

  let itemName = $(this).closest("tr").find("td:eq(0)").text();
  let itemDesc = $(this).closest("tr").find("td:eq(1)").text();

  $("#RoomNumber").val(itemName);
  // $("#categoriInput").val(itemDesc);

  console.log(itemDesc);

  $("#id").val(itemId);
  console.log(itemId);
  // // Show the modal
  $(".modal-container").fadeIn();
});

// Hide the modal when the cancel button is clicked
$(document).on("click", "#cancelButton", function () {
  $(".modal-container").fadeOut();
});

// Update the item when the save button is clicked
$(document).on("click", "#saveButton", function () {
  // get the values from the form
  let id = $("#id").val();
  let category = $("#category option:selected").val();

  Swal.fire({
    icon: "question",
    title: "Confirmation",
    text: "Are you sure you want to update the room category?",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No"
  }).then((result) => {
    if (result.isConfirmed) {
      // Send a POST request to the server
      $.ajax({
        url: url + "updateRoomCategoryById",
        type: "POST",
        dataType: "json",
        data: {
          id: id,
          category: category,
        },
        success: function (data) {
          console.log(data); // Log the response
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Room category has been updated.",
            showConfirmButton: true,
            timer: 1500
          }).then(() => {
            window.location.href = `/html/admin_cms/admin_cms_create_room.html`;
          });
        },
        error: function (data) {
          console.log(data); // Log the error
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Failed to update room category."
          });
        }
      });
    }
  });
});


$(document).on("click", ".delete-button", function () {
  // Get the ID of the item being deleted
  let itemId = $(this).data("id");
  
  // Display a SweetAlert confirmation dialog
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    // Proceed with deletion if confirmed
    if (result.isConfirmed) {
      // Send a DELETE request to the server
      $.ajax({
        url: url + "deleteRoom",
        type: "post",
        data: {
          id: itemId,
        },
        success: function (data) {
          // Reload the page
          console.log(data);
          // Display success message with SweetAlert
          Swal.fire({
            title: "Success!",
            text: "Room has been deleted",
            icon: "success",
            confirmButtonText: "Ok",
          }).then((result) => {
            // Reload the page
            location.reload();
          }
          );

          
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(textStatus, errorThrown);
        },
      });
    }
  });
});

