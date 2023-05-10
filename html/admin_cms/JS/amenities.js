let url = "http://localhost/CrystalSky/html/admin_cms/api/";

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
            <form id="addAmenitiy" method="POST" enctype="multipart/form-data">
            
            <div class="amenity_sub_main_cont">

            

            <div class="amenities_category_container">
            <div class="choose_category_amenities">Choose Category:</div>
            <select class="category_drop_container" id="category" name="category">
            
           `;

      RoomContent.forEach((content) => {
        str += ` 
                  
                  
                  <option value="${content.id}">${content.name}</option>
  
            `;
      });
      str += `  
            </select>
            </div>

            <div class="amenities_item_container">
            <div id="amenities-container" >
            <div class="add_amenity_item_cont">Add Amenities Item:</div>
            <div class="amenity-item">
              <input class="amenity_name_input" type="text" name="amenity_name" id="amenity_name" placeholder="Type here..." required>
            </div>
          </div>
          </div>
          </div>

        <div class="amenities_submit_input_container">
          <input class="amenities_submit_input" type="submit" value="SUBMIT">
          </div>
  
          </form>`;
      console.log(data);

      $("#getAmenitiesForm").append(str);

      // addAmenitiy
      $("#addAmenitiy").submit(function (e) {
        e.preventDefault();

        let category = $("#category").val();
        let amenity_name = $("#amenity_name").val();

        // Show confirmation dialog using SweetAlert
        Swal.fire({
          title: "Confirmation",
          text: "Are you sure you want to add this amenity?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.isConfirmed) {
            // User confirmed, proceed with AJAX call
            $.ajax({
              url: url + "addAmenitiy",
              type: "post",
              data: {
                category: category,
                amenity_name: amenity_name,
              },
              success: function (response) {
                // Handle success response
                console.log(response);

                // Show success message using SweetAlert
                Swal.fire({
                  title: "Success!",
                  text: "Amenity has been added",
                  icon: "success",
                  confirmButtonText: "Ok",
                }).then((result) => {
                  if (result.isConfirmed) {
                    location.reload();
                  }
                });

                // Clear the form fields
                $("#category").val("");
                $("#amenity_name").val("");
              },
              error: function (xhr) {
                // Handle error response
                console.log(xhr);
              },
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

function previewImage() {
  const preview = document.getElementById("amenity_image_preview");
  const file = document.querySelector("input[type=file]").files[0];
  const reader = new FileReader();

  reader.onloadend = function () {
    const image = document.createElement("img");
    image.src = reader.result;
    preview.innerHTML = "";
    preview.appendChild(image);
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.innerHTML = "";
  }
}

$(document).ready(function () {
  getAllAmenities();
});

const getAllAmenities = () => {
  $.ajax({
    url: url + "getAllAmenities",
    type: "post",
    dataType: "json",
  })
    // if success

    .done(function (data) {
      let AllAmenities = data.payload;
      // accessing all items in the payload
      console.log(data.remarks);

      // $("#ArchivedGallery").empty();

      let str = `
      <style>
      .amenitiesDelbtn{
          padding: 7px 10px;
          border: none;
          border-radius: 3px;
          font-family: 'montserrat-medium';
          color: white;
          background-color: #FF5D5D;
          text-decoration: none;
      }
      .amenitiesEditBtn{
        padding: 7px 10px;
        border: none;
        border-radius: 3px;
        font-family: 'montserrat-medium';
        color: white;
        cursor: pointer;
        background-color: #4BB1F7;
        text-decoration: none;
      }
      </style>

      <table>
      <tr>
        <th>id</th>

       
        <th>Amenities Item</th>
        <th>Category</th>
     
        <th>Actions</th>
      </tr>`;

      AllAmenities.forEach((content) => {
        str += `    
        <tr>
          <td>${content.amn_id}</td>
          
          
          <td>${content.item}</td>
          <td>${content.name}</td>
        
          <td>
          <button type="button" id="editRoom${content.amn_id}" class="btn btn-primary edit-button edit_about amenitiesEditBtn" data-id="${content.amn_id}" data-toggle="modal" data-target="#editModal">Edit</button>
          <a href="#" data-id="${content.amn_id}" class="delete-link amenitiesDelbtn">Delete</a>
          </td>
        </tr>


   
    
        `;
      });
      str += `
      </table>`;

      $("#getAllAmenities").append(str);

      console.log(data);
    })
    // if failed
    .fail(function (data) {
      console.error("not okay");
    });
};

// Show the modal when the edit button is clicked
$(document).on("click", ".edit-button", function () {
  let id = $(this).data("id");

  $(".modal-container").fadeIn();
});

// Hide the modal when the cancel button is clicked
$(document).on("click", "#cancelButton", function () {
  $(".modal-container").fadeOut();
});

// form

$(document).ready(function () {
  getRoomsCategory();
});

// $(document).ready(function () {
//   getRoomsCategory();
// });

const getRoomsCategory = () => {
  $.ajax({
    url: url + "getRoomsCateg",
    type: "post",
    dataType: "json",
  })
    .done(function (data) {
      let getCateg = data.payload;

      let str = ` 
              <form class="form_container_about">
                  <div class="modalBody">
                    <div class="about_text_container">
                    <input type="number" id="amn_id" style="display: none;">

                      <div class="edit_item_amenities">Edit Item</div>
                      <input class="amenities_input_edit" type="amenities" id="amenities" placeholder="Edit Amenities" >
                    </div>
                    <div class="amenities_textarea_container">
                      <div class="edit_category_amenities">Edit Category:</div>
                      <select class="amenities_text_select" id="categoriInput">
        `;

      getCateg.forEach((content) => {
        str += `  
                <option value="${content.id}">${content.name}</option>
                `;
      });
      str += `
                  </select>
                </div>
                <div class="submit_button_amenities">
                  <button class="saveButtonAmenities" type="button" id="saveButtonUpdate">SAVE</button>
                  <button class="cancelButtonAmenities" type="button" id="cancelButton">CANCEL</button>
                </div>
              </div>
            </form>`;

      $("#getCategoryID").append(str);

      console.log(data.payload);

    })
    .fail(function (data) {
      console.error("not okay");
    });
};
$(document).on("click", ".edit-button", function () {
  let id = $(this).data("id");
  $("#amn_id").val(id);
});

$(document).on("click", "#saveButtonUpdate", function () {
  // Get the values from the form
  let id = $("#amn_id").val();
  let category = $("#categoriInput").val();
  let amenities = $("#amenities").val();

  // Send a POST request to the server
  $.ajax({
    url: url + "updateAmenities",
    type: "POST",
    data: {
      id: id,
      category: category,
      amenities: amenities,
    },
    dataType: "json",
    success: function (data) {
      if (data) {
        // Show a success message
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Category has been updated.",
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
        });
        console.log(data);

        console.log(id, category, amenities)

        // Hide the modal
        $(".modal-container").fadeOut();
      } else {
        // Show an error message
        alert(response.message);
      }
    },
    error: function () {
      // Handle error if AJAX request failed
      alert("Error: Failed to send AJAX request.");
    },
  });
});


$(document).on("click", ".delete-link", function () {
  let id = $(this).data("id");

  // Confirm delete action using SweetAlert
  Swal.fire({
    title: "Confirmation",
    text: "Are you sure you want to delete this category?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      // User confirmed, proceed with AJAX call to delete category
      $.ajax({
        url: url + "deleteAmenities",
        type: "post",
        dataType: "json",
        data: {
          id: id,
        },
        success: function (data) {
          console.log(data);

          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Category has been deleted.",
            showConfirmButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
              location.reload();
            }
          });

         
        },
        error: function (data) {
          console.log(data);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        },
      });
    }
  });
});
