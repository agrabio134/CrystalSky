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
.modal1 {
  display: block; /* make modal visible */
  position: fixed; /* position it relative to the viewport */
  z-index: 1; /* make sure modal is above everything else */
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto; /* enable scrolling if modal content overflows */
  background-color: rgba(0, 0, 0, 0.4); /* semi-transparent black background */
}



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

      
$(document).on('click', '.edit-btn', function() {
  const contentId = $(this).attr('id');
  const name = $(this).closest('.birthday_div').find('p').text();
  console.log('Clicked edit button with id:', contentId, 'and name:', name);
  // Check if modal already exists in the DOM

  console.log(contentId);
  if ($('.modal1').length) {
    // Show existing modal
    $('.modal1').show();
  } else {
    // Create modal element
    const modal = `
      <div class="modal1">
        <div class="modal-content">
          <span class="close">&times;</span>
          <form action="${url}editLabel" method="post">
          <div class="modal_edit_content">
            <p>Edit Content</p>
            </div>

            <input type="hidden" name="id" value="${contentId}"/>

            <div>
            <label class="modal_name_content" for="name">Name:</label>
            </div>

            <div class="modal_name_text_content">
            <input class="modal_name_text_edit" type="text" name="name" id="name"  value="${name}"/>
            </div>

            <div class="color_container">
            <label class="color_label" for="color">Color Picker:</label>
            <input class="color_label_picker" type="color" name="color" id="color" />
            </div>

            <div class="announce_modal_content">
            <input class="announce_modal_input" type="submit"/>
            </div>


          </form>
        </div>
      </div>
    `;

    console.log("clicked!");
    // Add modal element to the DOM
    $('body').append(modal);

    // Add event listener to the "close" button
    $('.close').click(function() {
      // Remove modal element from the DOM
      $('.modal1').remove();
    });

    // Add event listener to the document object
    $(document).on('click', function(event) {
      // Check if the click occurred outside of the modal
      if (!$(event.target).closest('.modal-content').length && !$(event.target).is('.edit-btn')) {
        // Remove modal element from the DOM
        $('.modal1').remove();
      }
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

      let str = ``;

      Announcements.forEach((content) => {
        str += `  
          <style>
          .announcement_color${content.id}{
            width: 10px;
            background-color: ${content.color};
            height: 40px;
            margin-top: -15px;
            border-radius: 4px;
            margin-left: -7px;
        }
    .announcement_display{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120vh;
    margin-bottom:-5px;
    flex-direction: row;


}
.announcement_name{
    width: 100%;
    display: flex;
     align-items: center;
        background-color: white;
        height: 60px;
        margin-bottom: 4px;

}
.announcement_name a {
  display: flex;
  align-items: center;
    font-size: 15px;
    padding: 5px;
    font-family: montserrat-medium;
     padding-left: 45px;
     border: 1px solid #dad9d9;
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0), 0 2px 5px 0 rgba(0, 0, 0, 0.15);
    width: 113vh;
    background-color: white;
    height:48px;
    margin-top:-40px;
    // border: 1px solid gold; 
}
.announcement_name  p{
  border:2px solid purple;
  margin-right: 10px;
  margin-left: 800px;
  width: 100px;
  font-family: montserrat-medium;
}
        
      </style>
    <div class="announcement_display_container">
      <div class="announcement_display">
      
            <div class="announcement_name">
            <div class="announcement_color${content.id}"></div>
                <li><p style="color: ${content.color}">${content.name}</p><a href="#">${content.title}</a>
                </div>
                </li>
  </div>
  </div>
    
      
          `;
      });
      str += ``;

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
  // $.ajax({
  //   url: url + "getGallery",
  //   type: "post",
  //   dataType: "json",
  // })
  //   // if success

  //   .done(function (data) {
  //     let inactiveContent = data.payload;
  //     // accessing all items in the payload
  //     console.log(data.remarks);

  //     // $("#ArchivedGallery").empty();

  let str = `<form action="${url}addLabel" method="post">
    
      <div class="modal_edit_content_add">  
      <p>Add Label</p>
      </div>

      <div class="modal_name_container">
      <Label class="modal_name_content" for="name">Category Name:</Label>
      </div>
      
      <div class="modal_name_text_content">
      <input class="modal_name_text_edit" type="text" name="name" id="name"/>
      </div>

      <div class="color_container">
      <Label class="color_label" for="name">Color:</Label>
      <input class="color_label_picker" type="color" name="color" id="color"/>
      </div>

      <div class="announce_modal_content">
      <input class="announce_modal_input" type="submit"/>
      </div>
      </form>


      
      `;

  $("#Labels").append(str);

  console.log(data);
  // })
  // // if failed
  // .fail(function (data) {
  //   console.error("not okay");
  // });
};

//GET LABEL ANNOUNCEMENT

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
        // border: 1px solid green;
        display: flex;
        align-items: center;
      }
      .title_announcement p{
        font-family: montserrat-bold;
        font-size: 20px;
        padding-left: 30px;
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
      .form_text_announcement input{
        width: 40%;
        border-radius: 4px;
        border: 1px solid #dad9d9;
        box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0), 0 2px 5px 0 rgba(0, 0, 0, 0.15);
        margin-left: 30px;
        padding-left: 30px;
      }
      .form_labels_announcement{
        display: flex;
        width: 100%;
        //  border: 1px solid black;
        height: 8%;
        
      }
      .select_category {
        display: flex;
        width: 15%;
        height: 100%;
        border: 1px solid #dad9d9;
        box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0), 0 2px 5px 0 rgba(0, 0, 0, 0.15);
        border-radius: 4px;
        font-family: montserrat-medium;
         padding-left: 20px;
        color: black;
      }
      .label_category_announcement{
        display: flex;
        width: 15%;
        align-items: center;
        justify-content: center;
        // border: 1px solid black;
        margin-left: 15px;
        color: #424857;
      }
      .label_category_announcement{
        font-family: montserrat-bold;
        font-size: 20px;
      }
      .description_form_add_announcement{
        // border: 1px solid red;
        width: 100%;
        height: 8%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 5px;
        
      }
      .description_form_add_announcement p{
        display: flex;
        font-family: montserrat-bold;
        font-size: 22px;
        height: 100%;
        margin-right:950px;
        // border: 1px solid green;
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
        margin-left: 40px;
        margin-right:40px;
        padding: 20px;
        border: 3px solid #dad9d9;
        box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0), 0 2px 5px 0 rgba(0, 0, 0, 0.15);
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
        margin-left: 30px;
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
        justify-content: center;
        width: 100%;
        height: 8%;
        // border: 1px solid black;
      }
      .submit_announcement_button{
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #2FA83F;
        height: 80%;
        border: none;
        width: 10%;
        cursor: pointer;
        border-radius: 4px;
        margin-left: 950px;
      }
      input[type="submit"]{
        font-family: montserrat-medium;
        font-size: 15px;
        color: white;
      }
      </style>

      <form method="post" enctype="multipart/form-data" action="${url}post_announcements" class="form_container">
      
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
        <input class="submit_announcement_button" type="submit" value="Submit" />
        </div>
 </form>`;

      $("#getLabelAnnouncementForm").append(str);

      console.log(data);
    })
    
    // if failed
    .fail(function (data) {
      console.error("not okay");
    })

    // .always(function () {
    //   location.reload();
    // });
};

$(document).ready(function() {
  // Add submit event listener to the form
  $('form').submit(function() {
    // Reload the page after submitting the form
    location.reload();
  });
});
