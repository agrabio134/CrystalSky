let url = "http://localhost/CrystalSky/html/admin_cms/api/";

$(document).ready(function () {
  getLabels();
});

const getLabels = () => {
  $.ajax({
    url: url + "getLabels",
    type: "post",
    dataType: "json",
  })
    // if success

    .done(function (data) {
      let labels = data.payload;
      // accessing all items in the payload
      console.log(data.remarks);

      // $("#ArchivedGallery").empty();

      let str = ``;

      labels.forEach((content) => {
        str += `  

        <style>
        .birthday_div{
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          // border: 1px solid blue;
        }
        .Birthday_color${content.id} {
        display:flex;
        align-items: center;
        justify-content: center;  
        width: 3%;
        background-color: ${content.color};
        height: 35px;
        margin-top: 10px;
        margin-bottom: 10px;
        border-radius: 4px;
        // border: 1px solid gold;
        
        // border: 5px solid blue;
}
.Birthday_pink{
    //  border: 2px solid black;
    display: flex;
    width: 50%;
    align-items: center;
    justify-content: center;
}
.Birthday_pink p{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

}
.color_edit{
    background-color: #4BB1F7;
    // border: 2px solid red;
    border: 1px solid #dad9d9;
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0), 0 2px 5px 0 rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    width: 30%;
    height: 25px;
    align-items: center;
    justify-content: center;
    display: flex;
    margin-right: 20px;
}
.color_edit a{
  text-decoration: none;
    font-family: montserrat-medium;
    color: white;
    align-items: center;
    justify-content: center;
    display: flex;
    width: 100%;
    height: 1;
}

/* Modal styles */




/* Close button styles */
.close1 {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 28px;
  font-weight: bold;
  padding: 8px 12px;
  line-height: 1;
  cursor: pointer;
}

</style>
<div class="birthday_div">
        <div class="Birthday_color${content.id}"></div>
                                <div class="Birthday_pink">
                                    <p>${content.name}</p>
                                    </div>
                                    <div class="color_edit">
                                        <a href="#"  class="edit-btn" id="${content.id}">Edit</a>
                                    </div>
                                </div>
                                
        `;
      });
      str += ``;

      $("#getLabels").append(str);

      console.log(data);

      $(document).on("click", ".edit-btn", function () {
        const contentId = $(this).attr("id");

        console.log(contentId);
        if ($(".modal1").length) {
          // Show existing modal
          $(".modal1").show();
        } else {
          // Create modal element
          const modal = `
      <div class="modal1">
        <div class="modal-content">
          
        <form id="editForm" action="${url}editLabel" method="post">
        <div class="modalHeader">
          <span class="close" id="closeBtn"><i class="fa fa-times-circle-o" aria-hidden="true"></i></span>
            <h2>EDIT CONTENT</h2>
            <div class="modalLine"></div>
            </div>

            <input type="hidden" name="id" value="${contentId}"/>
            <div class="modalBody">
            <div>
            <label class="modal_name_content" for="name">Name</label>
            </div>

            <div class="modal_name_text_content">
            <input class="modal_name_text_edit" type="text" name="name" id="name"  value="${name}"/>
            </div>

            <div class="color_container">
            <label class="color_label" for="color">Color Picker</label>
            <input class="color_label_picker" type="color" name="color" id="color" />
            </div>

            <div class="announce_modal_content">
            <input class="announce_modal_input" type="submit"/>
            <span>
            <button class="cancelButton_about" type="button" id="btnCancel">CANCEL</button>
          </span>            </div>

            </div>
          </form>
        </div>
      </div>
    `;

          console.log("clicked!");
          // Add modal element to the DOM
          $("body").append(modal);

          // Add event listener to the "close" button
          $("#closeBtn").click(function () {
            // Remove modal element from the DOM
            $(".modal1").remove();
          });

          // Add event listener to the document object
          $(document).on("click", function (event) {
            // Check if the click occurred outside of the modal
            if (
              !$(event.target).closest(".modal-content").length &&
              !$(event.target).is(".edit-btn")
            ) {
              // Remove modal element from the DOM
              $(".modal1").remove();
            }
          });


          
          document
            .getElementById("editForm")
            .addEventListener("submit", function (event) {
              event.preventDefault(); // Prevent the default form submission

              Swal.fire({
                title: "Are you sure?",
                text: "This action cannot be undone.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, proceed!",
                cancelButtonText: "Cancel",
              }).then((result) => {
                if (result.isConfirmed) {
                  // If user confirms, submit the form
                  document.getElementById("editForm").submit();
                }
              });
            });

            document.getElementById("btnCancel").addEventListener("click", function () {
              Swal.fire({
                title: "Are you sure?",
                text: "Any unsaved changes will be discarded.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, cancel!",
                cancelButtonText: "No",
              }).then((result) => {
                if (result.isConfirmed) {
                  // If user confirms, navigate back or perform desired action
                  $(".modal1").remove(); // Remove modal element from the DOM
                  window.history.back(); // Navigate back
                }
              });
            });
            
        }
      });
    })
    // if failed
    .fail(function (data) {
      console.error("not okay");
    });
};

$(document).ready(function () {
  getAnnouncements();
});

const getAnnouncements = () => {
  $.ajax({
    url: url + "getAnnouncements",
    type: "post",
    dataType: "json",
  })
    // if success

    .done(function (data) {
      let Announcements = data.payload;
      // accessing all items in the payload
      console.log(data.remarks);

      // $("#ArchivedGallery").empty();

      let str = `<table id="myTable">`;

      Announcements.forEach((content) => {
        str += `  
          
    
        <tr>
            <td class="second">${content.title}</td>
            <td class="first"><p style="color: ${content.color}">${content.name}</p></td>
            
      
            
                
                

    </tr>
      
          `;
      });
      str += `</table>`;

      $("#getAnnouncements").append(str);

      console.log(data);
    })
    // if failed
    .fail(function (data) {
      console.error("not okay");
    });
};

$(document).ready(function () {
  addLabel();
});

const addLabel = () => {
  let str = `<form id="addLabelData" >
    
      
      <div class="modalBody">
      <div class="modal_name_container">
      <Label class="modal_name_content" for="name">Category Name:</Label>
      </div>
      
      <div class="modal_name_text_content">
      <input class="modal_name_text_edit" type="text" name="name" id="name" required/>
      </div>

      <div class="color_container">
      <Label class="color_label" for="name">Color:</Label>
      <input class="color_label_picker" type="color" name="color" id="color"/>
      </div>

      <div class="announce_modal_content">
      <input class="announce_modal_input" type="submit"/>
      <button class="cancelButton_about" type="button" id="btnCancel">CANCEL</button>
      </div>
      </div>
      </form>


      
      `;

  $("#Labels").append(str);

  /// Submit form
  document.getElementById("btnCancel").addEventListener("click", function () {
    Swal.fire({
      title: "Are you sure?",
      text: "Any unsaved changes will be discarded.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel!",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        // If user confirms, navigate back or perform desired action
        $(".modal").remove(); // Remove modal element from the DOM
      }
    });
  });
  
  $("#addLabelData").submit(function (e) {
    e.preventDefault();
    console.log("clicked!");

    // Get form data
    let formData = new FormData(this);
    formData.append("name", $("#name").val());
    formData.append("color", $("#color").val());

    // Confirm form submission
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to add this label?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          url: url + "addLabel",
          type: "post",
          dataType: "json",
          data: formData,
          processData: false,
          contentType: false,
        })
          .done(function (data) {
            console.log(data);
            Swal.fire({
              title: "Success!",
              text: "Label has been added!",
              icon: "success",
              confirmButtonText: "Ok",
            }).then((result) => {
              location.reload();
            });
          })
          .fail(function (data) {
            console.log(data);
            Swal.fire({
              title: "Success!",
              text: "Label has been added!",
              icon: "success",
              confirmButtonText: "Ok",
            }).then((result) => {
              location.reload();
            });
            
          });
      }
    });
  });

  //

  console.log(data);
};

//GET LABEL ANNOUNCEMENT
$(document).on("click", "#cancelButton", function () {
  $(".modal-container").fadeOut();
});

$(document).ready(function () {
  getLabelsAnnouncements();
});

const getLabelsAnnouncements = () => {
  $.ajax({
    url: url + "getLabels",
    type: "post",
    dataType: "json",
  })

    // if success

    .done(function (data) {
      let label = data.payload;
      // accessing all items in the payload
      console.log(data.remarks);

      // $("#ArchivedGallery").empty();

      let str = `
      <style>
      .form_container{
        width: 100%;
        height: 100%;
      }
      .title_announcement{
        width: 100%;
        height: 10%;
        //  border: 1px solid green;
        display: flex;
        align-items: center;
      }
      .title_announcement p{
        font-family: montserrat-bold;
        font-size: 20px;
        letter-spacing: 1px;
        color: #424857;
      }
      .form_text_announcement{
        width: 100%;
        height: 7%;
        display: flex;
        // border: 1px solid green;
        margin-bottom: 20px;
      }
      input[type=text]{
        font-family: montserrat-medium;
        letter-spacing: 1px;
      }
      input:focus,input:active{
    outline: none;
}
      .form_text_announcement input{
        width: 40%;
        height: 40px;
        border-radius: 4px;
        border: 1px solid #dad9d9;
        box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0), 0 2px 5px 0 rgba(0, 0, 0, 0.15);
    
        padding-left: 30px;
      }
      .form_labels_announcement{
        display: flex;
        flex-direction: column;
        width: 100%;
          //  border: 1px solid black;
        min-height: 10px;
        
      }
      .select_category {
        display: flex;
        width: 20%;
        text-align: center;
        padding: 10px;
        border: 1px solid #dad9d9;
        box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0), 0 2px 5px 0 rgba(0, 0, 0, 0.15);
        border-radius: 4px;
        font-family: montserrat-medium;
        color: #424857;
      }

      .select_category:any-link, .select_category:focus, .select_category:active{
        outline:none;
      }
      .label_category_announcement{
        display: flex;
        justify-content: start;
        width: 100%;
        align-items: center;
        //  border: 1px solid black;
        margin-bottom: 10px;
        color: #424857;
      }
      .label_category_announcement:any-link, .label_category_announcement:focus, .label_category_announcement:active{
        outline: none;
      }
      .label_category_announcement p{
        font-family: montserrat-bold;
        font-size: 20px;
      }
      .description_form_add_announcement{
        // border: 1px solid red;
        width: 100%;
        height: 10%;
        display: flex;
        align-items: center;
        margin-top: 5px;
        
      }
      .description_form_add_announcement p{
        font-family: montserrat-bold;
        font-size: 20px;
        letter-spacing: 1px;
        color: #424857;
      }
      .description_text{
        width: 100%;
        display: flex;
        // border: 1px solid blue;
        height:20%;
        margin-bottom:20px;
      }
      .description_text .text_textarea{
        width: 100%;
        padding: 20px;
        border: 3px solid #dad9d9;
        resize: vertical;
        box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0), 0 2px 5px 0 rgba(0, 0, 0, 0.15);
        resize: none;
        font-family: montserrat-medium;
        letter-spacing: 1px;
        color: #424857; 
      }
      .text_textarea:focus, .text_textarea:active{
        outline: none;
      }
      .thumnail_container{
        display: flex;
        width: 100%;
        height: 10%;
        align-items: center;
        gap: 5px;
        //  border:1px solid green;
      }
      .thumbnail_text{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 12%;
        height: 50%;
        // border: 1px solid red;
      }
      .thumbnail_text p{
        font-family: montserrat-bold;
        font-size: 15px;
        color: #424857;
      }
      .thumbnail_images{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center; 
        width: 20%;
        height: 50%;
        //  border: 1px solid black;
        
      }
       .img_thumb::-webkit-file-upload-button{
        width: 120px;
        height: 30px;
        color: white;
        background-color:#424857;
        border: 2px solid #dad9d9;
        box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0), 0 2px 5px 0 rgba(0, 0, 0, 0.15);
        // border: 1px solid black;
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
      .submit_announcement{
        display: flex;
        align-items: center;
        justify-content: end;
        width: 100%;
        height: 8%;
        
        //  border: 1px solid black;  
      }
      .submit_announcement_button{
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #2FA83F;
        height: 80%;
        border: none;
        width: 10%;
        margin-right: 30px;
        cursor: pointer;
        border-radius: 4px;
        // margin-left: 950px;
      }
      input[type="submit"]{
        font-family: montserrat-medium;
        font-size: 15px;
        color: white;
      }
      </style>

      <form method="post" enctype="multipart/form-data" action="${url}post_announcements" id="postForm" class="form_container">
      
        <div class="title_announcement">
          <label for="title"><p>Add Announcement:</p></label>
        </div>
          <div class="form_text_announcement">
            <input placeholder="Add title" type="text" id="title" name="title" required />
          </div>

      <div class="form_labels_announcement">
      <div class="label_category_announcement"><p> Choose Labels</p></div>
            <select id="label" name="label" class="select_category">
                `;

      label.forEach((content) => {
        str += `  
            <option value="${content.id}">${content.name}</option>
            `;
      });
      str += `
       </select>
       </div>

       <div class="description_form_add_announcement">
        <label for="description"><p>Description:</p></label>
        </div>

        <div class="description_text"> 
          <textarea class="text_textarea" id="description" placeholder="Enter description here..." name="description" required></textarea>
          </div>
          
      <div class="thumnail_container">
        <div class="thumbnail_text">
          <label for="media"><p>Add Thumbnail:</p></label>
        </div>
          <div class="thumbnail_images">
            <input class="img_thumb" type="file" id="media" name="media" accept="image/*, video/*" />
          </div>
        </div>
        <div class="submit_announcement">
        <input class="submit_announcement_button" type="submit" value="SUBMIT" />
        
        </div>
 </form>`;

      $("#getLabelAnnouncementForm").append(str);
      $("#getLabelAnnouncementForm").on("submit", "form", function (event) {
        event.preventDefault(); // Prevent the default form submission
      
        Swal.fire({
          title: "Are you sure?",
          text: "Do you want to submit this announcement?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, submit!",
          cancelButtonText: "Cancel",
        }).then((result) => {
          if (result.isConfirmed) {
            // If user confirms, submit the form
            // redirect to the home page

            document.getElementById("postForm").submit();



            // $(this).off("submit"); // Remove the event listener to avoid infinite loop
            // $(this).submit();
          }
        });
      });
      
      console.log(data);
    })

    // if failed
    .fail(function (data) {
      console.error("not okay");
    });

  // .always(function () {
  //   location.reload();
  // });
};

$(document).ready(function () {
  // Add submit event listener to the form
  $("form").submit(function () {
    // Reload the page after submitting the form
    // location.reload();
  });
});
