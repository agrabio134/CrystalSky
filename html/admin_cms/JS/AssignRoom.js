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
          .form_create_room{
            display: flex;
            // margin-left: 30px;
            flex-direction:row;
            width:  100%;
            height: 45px;
            align-items: center;
          }
          .room_container{
            display: flex;
            gap:10px;
            align-items: center;
            height:100%;  
            flex-direction-row;
            // border:1px solid blue;
            width:30%;
          }
          .room_number_label{
            font-family: montserrat-medium;
            font-size: 15px;
            letter-spacing: 1px;
            color: #424857;
            margin-left: 30px;
          }
          .Room_number_input{
            width: 45%;
            height:10px;
            // border: 1px solid green;
            background-color: white;
            box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0), 0 2px 5px 0 rgba(0, 0, 0, 0.15);
            border-radius: 4px;
            border: 1px solid #dad9d9;
          }
          input[type=number]{
            padding:10px;
            font-family:montserrat-medium;
            letter-spacing:1px;  
          }
          .label_container{
            display: flex;
            flex-direction: row;
            align-items: center;
            width:22%;
            // border: 1px solid black;
            height:100%;
            gap:10px;
          }
          .category_name{
            font-family: montserrat-medium;
            font-size: 15px;
            letter-spacing: 1px;
            color: #424857;
          }
          .category_id_cont{
            width: 60%;
            padding-left:5px;
            height:30px;
            background-color: white;
            box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0), 0 2px 5px 0 rgba(0, 0, 0, 0.15);
            border-radius: 4px;
            border: 1px solid #dad9d9;
          }
          .submit_cont{
            display:flex;
            width:40%;
          }
          .submit_input{
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #2FA83F;
            height: 30px;
            border: none;
            width: 20%;
            cursor: pointer;
            border-radius: 4px;
          }
          input[type=submit]{
            font-family: montserrat-medium;
            font-size: 15px;
            color: white;
          }
        </style>    


        <form action="${url}postNewRoom" method="post" class="form_create_room">
        <div class="form_create_room">
          <div class="room_container">
            <label class="room_number_label" for="room_number">Room number: </label>
            <input class="Room_number_input" type="number" id="room_number" name="room_number" placeholder="Room number..">
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
        <input class="submit_input" type="submit" value="Submit">
        </div>

        </div>
        </form>`;
      console.log(data);

      $("#getRoomForm").append(str);
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

      let str = ` <h2>Edit Room</h2>
              <form class="form_container_about">
                <input type="hidden" id="id">

                <div class="about_text_container">
                <label for="RoomNumber">Room Number</label>
                  <input type="text" id="RoomNumber" readonly>
                </div>

                <select class="about_textarea_input" id="categoriInput">
                <option value="" selected disabled>Select a category</option>

          
        `;

      getRoomsCateg.forEach((content) => {
        
        str += `  
                
                <option value="${content.id}">${content.name}</option>



                `;
      });
      str += `
              <select>
              <div class="submit_button_about">
                <button class="saveButton_about" type="button" id="saveButton">Save</button>
      
                <button class="cancelButton_about" type="button" id="cancelButton">Cancel</button>
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
  // let name = $("#RoomNumber").val();

  console.log(id);
  // console.log(name);

  // i want to get the value of the select option by id
  let category = $("#categoriInput option:selected").val();

  console.log(category);
  // console.log(category);
  $(document).ready(function () {
    updateRoomCategory();
  });

  const updateRoomCategory = () => {
    // Send a POST request to the server
    $.ajax({
      url: url + "updateRoomCategoryById",
      type: "POST",
      dataType: "json",
      data: {
        id: id,
        category: category,
      },
    });

    // i want to console log the response
    console.log(id);
    console.log(category);
    // if success
    // post the data to the server
    $.post(url + "updateRoomCategoryById", {
      id: id,
      category: category,
    });
    window.location.href = `/html/admin_cms/create_room.html`;

    

    //   .done(function (data) {
    //     console.log(data);
    //     // Reload the page
    // })
    // // if failed
    // .fail(function (data) {
    //     console.error("not okay");
    // });
  };
});

$(document).on("click", ".delete-button", function () {
  // Get the ID of the item being deleted
  let itemId = $(this).data("id");
  console.log(itemId);
  // Confirm with the user before deleting the item
  if (confirm("Are you sure you want to delete this item?")) {
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
        location.reload();
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
      }
    });
  }
});
