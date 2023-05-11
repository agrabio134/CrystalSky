let url = "http://localhost/CrystalSky/html/admin_cms/api/";

$(document).ready(function () {
  getContentContact();
});

const getContentContact = () => {
  $.ajax({
    url: url + "getContentContact",
    type: "post",
    dataType: "json",
  })
    // if success

    .done(function (data) {
      let getContentContact = data.payload;
      // accessing all items in the payload
      // console.log(data.remarks);

      let str = `
  <form id="editContactForm" method="post" class="form_aboutus">


  `;
      getContentContact.forEach((content) => {
        str += `
    

  <div class="contact_form_container">
  
  <div class="contact_email">
    <div class="cont_container">
      <label class="contact_number_container" for="contact_number" >Contact Number: </label>
      <input class="contact_placeholder" placeholder="Add contact number" type="text" pattern="[0-9.]+" id="contact_number" name="phone" value="${content.phone}" inputmode="numeric" oninput="this.value = this.value.replace(/[^0-9.]/g, '');">
      </div>
    <div class="em_cont">
      <label class="email_container" for="email">Email:</label>
      <input class="email_cont" type="email" id="email" placeholder="Add email address" name="email" value="${content.email}" >
      </div>
    </div>
  
  
  
      <label class="location_container" for="address">Address:</label>
      <textarea placeholder="Add address" class="edit_address_container" id="edit_address" name="address" value="${content.address}" > ${content.address}"</textarea>

      <label for="opening_hours" class="opening_hours_label">Opening Hours:</label>
      <input placeholder="Add opening hours" class="openning_hours_input" type="text" id="openning_hours" name="opening_hours" value="${content.opening_hours}" placeholder="Day from - to: time from - to" >
      </div> 


    `;
      });
      str += `
    <button type="submit" class="submit_btn_contact">SUBMIT</button>

  `;
      $("#getContentContactus").append(str);
      // ajax
      $("#editContactForm").submit(function (e) {
        e.preventDefault();

        Swal.fire({
          title: "Are you sure?",
          text: "Do you want to update the contact information?",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "##4BB1F7",
          cancelButtonColor: "#FF5D5D",
          confirmButtonText: "Yes, update it!",
          cancelButtonText: "Cancel",
        }).then((result) => {
          if (result.isConfirmed) {
            var data = $(this).serialize();
            // console.log(data);
            $.ajax({
              type: "POST",
              url: url + "updateContact",
              data: data,
              success: function (data) {
                Swal.fire({
                  title: "Success!",
                  text: "Successfully Updated",
                  icon: "success",
                  confirmButtonColor: "##4BB1F7",
                  confirmButtonText: "Ok",
                }).then((result) => {
                  if (result.isConfirmed) {
                    window.location.reload();
                  }
                });
              },
              error: function (data) {
                console.log("error");
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
};

$(document).ready(function () {
  getContentAbout();
});

const getContentAbout = () => {
  $.ajax({
    url: url + "getContentAbout",
    type: "post",
    dataType: "json",
  })
    // if success

    .done(function (data) {
      let AboutContent = data.payload;
      // accessing all items in the payload
      // console.log(data.remarks);

      let str = `
  
<style>
.form_aboutus{
  width: 100%;
  height: 100%;
  // border: 1px solid purple;
}
.about_form_content{
  width: 100%;
  display:flex;
  flex-direction: column;
  //  border: 1px solid red;
}
.edit_title_1_content{
  display:flex;
  font-family: montserrat-medium;
  font-size: 20px;
  color: #424857;
}
.about_edit_text_content {
  font-family: montserrat-medium;
  font-size: 15px;
    letter-spacing: 1px;
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0), 0 2px 5px 0 rgba(0, 0, 0, 0.15);
      font-family: heebo;
      margin-bottom: 30px; 
      width: 50%;
      border: 1px solid #dad9d9;
      border-radius: 4px;
      resize: vertical;
}
input[type=text]{
  color: #424857;
}

.edit_description_about{
  display:flex;
  font-family: montserrat-medium;
  font-size: 20px;
  color: #424857;
}
.edit_description_about_area{
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0), 0 2px 5px 0 rgba(0, 0, 0, 0.15);
  font-family: heebo;
  margin-bottom: 30px; 
  width: 96%;
  padding: 20px;
  height: 100px;
  border: 1px solid #dad9d9;
  border-radius: 4px;
  resize: vertical;
  font-family:montserrat-medium;
  font-size: 15px;
  letter-spacing: 1px;
  resize: none;
}
.edit_description_about_area:focus, .edit_description_about_area:active{
  outline: none;
}
.contact_us_container{
  font-family: montserrat-bold;
  color: #424857;
  font-size: 20px;
  margin-bottom: 30px;
  letter-spacing: 1px;
}
.contact_form_container{
  display:flex;
  flex-direction: column;
}
.contact_number_container{
  font-family: montserrat-medium;
  color: #424857;
  letter-spacing: 1px;
  font-size: 20px;
  
}
.contact_placeholder{
  font-family: montserrat-medium;
  font-size: 15px;
    letter-spacing: 1px;
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0), 0 2px 5px 0 rgba(0, 0, 0, 0.15);
      font-family: heebo;
      width: 50%;
      border: 1px solid #dad9d9;
      border-radius: 4px;
      resize: vertical;
}
input[type=number]{
  padding:10px;
  font-size:15px;
  letter-spacing: 1px;
  font-family:Montserrat-medium;
}
.email_container{
  font-family: montserrat-medium;
  color: #424857;
  letter-spacing: 1px;
  font-size: 20px;
  margin-left: 10px;
}
.email_cont{
  font-family: montserrat-medium;
  font-size: 15px;
    letter-spacing: 1px;
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0), 0 2px 5px 0 rgba(0, 0, 0, 0.15);
      font-family: heebo;
      width: 50%;
      border: 1px solid #dad9d9;
      border-radius: 4px;
      resize: vertical;
      margin-left: 30px;
}
.contact_email{
  display:flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  // border: 1px solid red;
  margin-bottom: 20px;
}
.cont_container{
  display:flex;
  width: 50%;
  align-items: center;
  gap: 20px;
  // border: 1px solid green;
}
.em_cont{
  display:flex;
  width: 45%;
  align-items: center;
  gap: 20px;
  // border: 1px solid purple;
}
input[type=email]{
  padding:10px;
  font-family:Montserrat-medium;
  color: #424857;
}
input[type=text]{
  padding:10px;
  font-family:Montserrat-medium;
  color: #424857;
}
textarea{
  color: #424857;
  padding: 10px;
  height: 100px;
}
.location_container{
  display:flex;
  font-family: montserrat-medium;
  font-size: 20px;
  color: #424857; 
  letter-spacing:1px;
}
.edit_address_container{
  display:flex;
  border: 1px solid #dad9d9;
  border-radius: 4px;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0), 0 2px 5px 0 rgba(0, 0, 0, 0.15);
  width: 94.5%;
  background-color: white;
  height: 20px;
  padding:10px;
  font-family:Montserrat-medium;
  letter-spacing:1px;
  font-size: 15px;
  margin-bottom:30px;
  resize: none;
}
.edit_address_container:focus, .edit_address_container:active{
  outline: none;
}
input:focus,
input:active {
    outline: none;
}
.opening_hours_label{
  display:flex;
  font-family: montserrat-medium;
  font-size: 20px;
  color: #424857; 
  letter-spacing:1px;
}
.openning_hours_input{
  display:flex;
  border: 1px solid #dad9d9;
  border-radius: 4px;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0), 0 2px 5px 0 rgba(0, 0, 0, 0.15);
  width: 50%;
  background-color: white;
  height: 20px;
  // border: 1px solid red;
}
.modal::-webkit-scrollbar{
        display: none;
    }
</style>

  <form id="editForm" method="post" class="form_aboutus">

  `;
      AboutContent.forEach((content) => {
        str += `  

                              <div class="about_form_content">
                                <label for="edit_title_1" class="edit_title_1_content">Edit Title:</label>
                                <input class="about_edit_text_content" placeholder="Add title" type="text" id="edit_title_1" name="title"  value="${content.title}">
                                <label class="edit_description_about" for="edit_description">Edit About Description:</label>
                                <textarea placeholder="Add description" class="edit_description_about_area" id="edit_description" name="description"
                                value="${content.description}">${content.description}</textarea>
                              </div>
                      
                                `;
      });
      str += `
                                <button type="submit" class="submit_btn_about">SUBMIT</button>
                            </form>`;

      $("#getContentAbout").append(str);

      // ajax
      $("#editForm").submit(function (e) {
        e.preventDefault();

        Swal.fire({
          title: "Are you sure?",
          text: "Do you want to update the form?",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#4BB1F7",
          cancelButtonColor: "#FF5D5D",
          confirmButtonText: "Yes, update it!",
          cancelButtonText: "Cancel",
        }).then((result) => {
          if (result.isConfirmed) {
            var data = $(this).serialize();
            // console.log(data);
            $.ajax({
              type: "POST",
              url: url + "addAboutUs",
              data: data,
              success: function (data) {
                Swal.fire({
                  title: "Success!",
                  text: "Successfully Updated",
                  icon: "success",
                  confirmButtonColor: "#4BB1F7",
                  confirmButtonText: "Ok",
                }).then((result) => {
                  if (result.isConfirmed) {
                    window.location.reload();
                  }
                });
              },
              error: function (data) {
                console.log(data);
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
};

$(document).ready(function () {
  getContentFormFacilities();
});

const getContentFormFacilities = () => {
  // if success

  // $("#ArchivedGallery").empty();

  let str = `<style>
                
                
                .name_facility{
                  // border: 1px solid red;
                  font-family: montserrat-bold;
                  font-size: 20px;
                  color: #4BB1F7;
                  letter-spacing: 1px;
                }
                input:focus,
                input:active {
                    outline: none;
                }
                .add_facility_container{
                  border: 1px solid #dad9d9;
                  border-radius: 4px;
                  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0), 0 2px 5px 0 rgba(0, 0, 0, 0.15);
                  background-color: white;
                }
                .edit_description_container{
                  font-family: montserrat-medium;
                  font-size: 20px;
                  color: #424857;
                  letter-spacing: 1px;
                }
                .edit_facility_container{
                  font-family: montserrat-medium;
                  font-size: 20px;
                  color: #424857;
                  letter-spacing: 1px;
                }
                .add_description_container{
                  border: 1px solid #dad9d9;
                  border-radius: 4px;
                  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0), 0 2px 5px 0 rgba(0, 0, 0, 0.15);
                  padding: 10px;
                  background-color: white;
                  resize: vertical;
                  font-family: montserrat-medium;
                  font-size: 15px;
                  letter-spacing:1px;
                  resize: none;
                }
                .add_description_container:focus, .add_description_container:active{
                  outline: none;
                }
                .add_icon_container{
                  font-family: montserrat-medium;
                  font-size: 20px;
                  color: #424857;
                  letter-spacing: 1px;
                }
                .img_cont{
                   display: flex;
                  flex-direction: column;
                   justify-content: start; 
                  width: 100%;
                  margin-top: 10px;
                  margin-bottom: 10px;
                //  border: 1px solid red; 
                }
                .image_container::-webkit-file-upload-button{
                  width: 120px;
                  height: 30px;
                  color: white;
                  background-color: #424857;
                  border: 2px solid #dad9d9;
                  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0), 0 2px 5px 0 rgba(0, 0, 0, 0.15);
                  font-family: montserrat-medium;
                  cursor: pointer;
                  font-size: 15x;
                  border-radius: 4px;
                }
                input[type=file]{
                  font-family: montserrat-medium;
                  font-size: 15px;
                  color: #424857;
                  }
                  .fname_cont{
                    display: flex;
                    // border: 1px solid red;
                    width: 100%;
                    flex-direction: column;
                    margin-bottom: 20px;
                  }
                  .fdescription_cont{
                      display: flex;
                    // border: 1px solid red;
                    width: 100%;
                    height: 100%;
                    flex-direction: column;
                    margin-bottom: 20px;
                  }
            </style>
  
  <form action="${url}post_facilities" method="post" enctype="multipart/form-data" class="form_add_facilities">
                      
                  
                  
                  <div class="modalBody">
                  <div class="fname_cont">
                  <label class="edit_facility_container" for="edit_description">Facility Name</label>
                  <input class="add_facility_container" type="text" id="text" name="name" placeholder="Add Facility name..." required>
                  </div>
                  <div class="fdescription_cont">
                  <label class="edit_description_container" for="edit_description">Facility Description</label>
                  <textarea class="add_description_container" id="edit_description" name="description" placeholder="Add description..." required></textarea>  
                  </div>
                  <label class="add_icon_container" for="image">Add Icon</label>
                  <div class="img_cont">
                  <input class="image_container" type="file" name="image" required />
                  </div>
                       <div class="submit_button_amenities">     
                  <button type="submit" class="submit_btn_facilities">SUBMIT</button>
                  <button class="cancelButtonAmenities" type="button" id="cancelButton">CANCEL</button>
                  </div>
                    </div>            
                  
                  </form>`;

  $("#getContentFormFacilities").append(str);

  $("#cancelButton").click(function () {
    Swal.fire({
      title: "Are you sure?",
      text: "Any unsaved changes will be discarded. Are you sure you want to cancel?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel",
      cancelButtonText: "No, keep editing",
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform the cancel action here
        window.location.reload(); // Example: Reload the page
      }
    });
  });

  $(".form_add_facilities").submit(function (e) {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to add the facilities?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, add it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        var formData = new FormData(this);

        $.ajax({
          type: "POST",
          url: `${url}post_facilities`,
          data: formData,
          processData: false,
          contentType: false,
          success: function (data) {
            Swal.fire({
              title: "Success!",
              text: "Facilities added successfully",
              icon: "success",
              confirmButtonText: "Ok",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          },
          error: function (data) {
            console.log("error");
          },
        });
      }
    });
  });
};

$(document).ready(function () {
  getContentAboutFacilities();
});

const getContentAboutFacilities = () => {
  $.ajax({
    url: url + "getContentFacilities",
    type: "post",
    dataType: "json",
  })
    // if success

    .done(function (data) {
      let AboutFacilitiesContent = data.payload;
      // accessing all items in the payload
      // console.log(AboutFacilitiesContent);

      // $("#ArchivedGallery").empty();

      let str = `
      <style>
      .add_facilities_button{
        display: flex;
        gap: 3px;
        flex-direction: row;
      }
        .edit_about{
            padding: 7px 10px;
            border: none;
            border-radius: 3px;
            font-family: 'montserrat-medium';
            color: white;
            background-color: #4BB1F7;
            text-decoration: none;
            cursor: pointer;
        }
        .delete_about{
            padding: 7px 10px;
            border: none;
            border-radius: 3px;
            font-family: 'montserrat-medium';
            color: white;
            background-color: #FF5D5D;
            text-decoration: none;
            cursor: pointer;
        }
        .add_facilities_description_td{
          text-align: justify !important;
          width: 70%;
        }
        .add_facilities_name_td{
          text-align: justify !important;
        }
      </style>
      <table>
      <thead>
      <tr>
      <th>ID</th>
      <th>Image</th>
      <th>Name</th>
      <th>Description</th>
      <th>Action</th>

      </tr>
      <thead>
      <tbody>
      `;

      AboutFacilitiesContent.forEach((content) => {
        str += `    
        <tr>
        <td>${content.id}</td>
        <td><img src="/assets/SUBSYSTEM_PHOTOS/CMS/${content.icon}" alt="${content.icon}" width="100px" height="100px"></td>
        <td class="add_facilities_name_td">${content.name}</td>
        <td  class="add_facilities_description_td">${content.description}</td>
        <td class="add_facilities_button">
        <button type="button" class="btn btn-primary edit-button edit_about " data-id="${content.id}" data-toggle="modal" data-target="#editModal">Edit</button>
        <button type="button" class="btn btn-danger delete-button delete_about"  data-id="${content.id}">Delete</button>
        </td>
        </tr>
   
        `;
      });
      str += `<tbody>
      </table>
      
      <input type="hidden" id="editId" name="editId" value="">

      
      
      `;

      $("#getContentAboutFacilities").append(str);

      // console.log(data);
    })
    // if failed
    .fail(function (data) {
      console.error("not okay");
    });
};

// Show the modal when the edit button is clicked
$(document).on("click", ".edit-button", function () {
  // Get the ID of the item being edited
  var itemId = $(this).data("id");
  // Get the current name, description, and image of the item from the table
  var itemName = $(this).closest("tr").find("td:eq(2)").text();
  var itemDesc = $(this).closest("tr").find("td:eq(3)").text();
  var itemImage = $(this).closest("tr").find("img").attr("src");
  // Set the values of the input fields in the modal
  $("#nameInput").val(itemName);
  $("#descriptionInput").val(itemDesc);
  $("#preview").attr("src", itemImage).show();
  // Set the ID of the item being edited in a hidden input field
  $("#editId").val(itemId);
  // Show the modal
  $(".modal-container").fadeIn();
});

// Hide the modal when the cancel button is clicked
$(document).on("click", "#cancelButton", function () {
  $(".modal-container").fadeOut();
});

// Preview the image when a file is selected
$(document).on("change", "#imageInput", function () {
  var file = this.files[0];
  var reader = new FileReader();
  reader.onload = function (event) {
    $("#preview").attr("src", event.target.result).show();
  };
  reader.readAsDataURL(file);
});

// Save the changes when the save button is clicked
$(document).on("click", "#saveButton", function () {
  // Get the values of the input fields
  var itemId = $("#editId").val();
  var itemName = $("#nameInput").val();
  var itemDesc = $("#descriptionInput").val();
  var itemImage = $("#imageInput")[0].files[0];

  

  // Create a FormData object to send the data to the server
  var formData = new FormData();
  formData.append("id", itemId);
  formData.append("name", itemName);
  formData.append("description", itemDesc);
  formData.append("image", itemImage);

  // Show a confirmation dialog using Swal
  Swal.fire({
    title: "Confirmation",
    text: "Are you sure you want to save the changes?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "##4BB1F7",
    cancelButtonColor: "#FF5D5D",
    confirmButtonText: "Save",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      // Send the data to the server
      $.ajax({
        url: url + "updateContentFacilities",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
          Swal.fire({
            icon: "success",
            title: "Saved!",
            text: "Your changes have been saved.",
            showConfirmButton: true,
          }).then((result) => {
            // Reload the page
            location.reload();
          });
        },
      });
    }
  });
});
$(document).on("click", ".delete-button", function () {
  // Get the ID of the item being deleted
  var itemId = $(this).data("id");
  // Confirm with the user before deleting the item
  Swal.fire({
    title: 'Confirmation',
    text: 'Are you sure you want to delete this item?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: "##4BB1F7",
    cancelButtonColor: "#FF5D5D",
    confirmButtonText: 'Delete',
    cancelButtonText: 'Cancel',
  }).then((result) => {
    if (result.isConfirmed) {
      // Send a DELETE request to the server
      $.ajax({
        url: url + "deleteContentFacilities",
        type: "post",
        data: {
          id: itemId,
        },
        success: function (data) {
          // Show success message using Swal
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Category has been deleted.",
            showConfirmButton: true,
          }).then((result) => {
            location.reload();
          }
          );

          // Reload the page after a short delay
          setTimeout(function () {
            location.reload();
          }, 1800);
        },
      });
    }
  });
});
