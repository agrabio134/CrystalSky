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
  let confirmArchive = confirm("Are you sure to Archive?")

  if (confirmArchive){
    item = {};
  // inputs will be turned into objects
  item["id"] = id;
  // stringify the object
  item = JSON.stringify(item);

  console.log(item);

  $.ajax({
    url: url + "ImgArchive",
    type: "post",
    dataType: "json",
    data: item,
  })
    // if success
    .done(function (data) {
      // set id as local storage
      // reload page
      window.location.reload();

      getGallery();
    })
    // if failed
    .fail(function (data) {
      console.log("not working");
    });
  }
  
}