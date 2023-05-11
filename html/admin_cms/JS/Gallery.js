let url = "http://localhost/CrystalSky/html/admin_cms/api/";


$(document).ready(function () {
    getGallery();
});

const getGallery = () => {
  $.ajax({
    url: url + "getGallery",
    type: "post",
    dataType: "json",
  })
    // if success

    .done(function (data) {
      let GalleryContent = data.payload;
      // accessing all items in the payload
      console.log(data.remarks);

      // $("#ArchivedGallery").empty();

// eto yung binura ko sa choose a photo
      // <input type="file" id="upload-button" accept="image/*">
       // <label for="upload-button">
       //   <i class="fas fa-upload"></i> &nbsp; Choose A Photo
//</label> 


      let str = `
      <style>
      .archived_button{
        display: flex;
        width:100%;
        height: 40px;
        // border: 1px solid green;
        margin-top: 10px;
        
      }
      
      .acceptBtn{
        background-color:#FF5D5D;
        width: 100%;
        border-radius: 4px;
        font-family: montserrat-bold;
        font-size:15px;
        color: white;
        box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0), 0 2px 5px 0 rgba(0, 0, 0, 0.15);
      border: 1px solid #dad9d9;
      cursor: pointer;
       
      }

      
      </style>
      <div class="row_gallery">

      `;

      GalleryContent.forEach((content) => {
        str += `  
        <div class="column " style="display:flex" >
        <div class="content">
        <img id="chosen-image" src="/assets/SUBSYSTEM_PHOTOS/CMS/${content.media}"
        alt="Mountains" style="width:100%" height="200px">
      <div class="archived_button">
      <button type="button" onclick="ImgArchive(${content.id})" class="defBtn acceptBtn" id="ImgArchive${content.id}" >Archive</button>
      </div>


      
      </div>
      </div>

        `;
      });
      str += `  
      </div>
      `
      ;

      $("#galleryImages").append(str);

      console.log(data);
    })
    // if failed
    .fail(function (data) {

      console.log(data);
      console.error("not okay");
    });
};


// archived image

 
function ImgArchive(id) {
  Swal.fire({
    title: "Confirm Archive",
    text: "Are you sure you want to archive?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Archive",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      // Perform the archive operation
      const item = { id: id };
      const jsonItem = JSON.stringify(item);

      $.ajax({
        url: url + "ImgArchive",
        type: "post",
        dataType: "json",
        data: jsonItem,
      })
        .done(function (data) {
          Swal.fire({
            title: "Success!",
            text: "Image has been archived",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Okay",
          }).then((result) => {



          window.location.reload();
          });
          getGallery();
        })
        .fail(function (data) {
          console.log("Archive operation failed");
        });
    }
  });
}
