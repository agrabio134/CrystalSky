let url = "http://localhost/CrystalSky/html/admin_cms/api/";

$(document).ready(function () {
  getArchivedEvents();
});

const getArchivedEvents = () => {
  $.ajax({
    url: url + "getArchivedEvents",
    type: "post",
    dataType: "json",
  })
    // if success

    .done(function (data) {
      let inactiveContent = data.payload;
      // accessing all items in the payload
      $("#getArchivedEvents").empty();

      let str = ` <div class="filterDiv events">

             
      `;

      inactiveContent.forEach((content) => {
        str += ` 
             <div class="">
                <p>${content.title} </p>
                </div>
                <div class="announcement_paragraph">
                    <a href="">${content.description} </a>
                    
                </div>

                <div>
                <button onclick="document.getElementById('id01').style.display='block'" class="restore">
                    <p>Retrieve</p>
                </button> 
                </div>
        `;
      });

      str += `      
           </div>
     
           

  `;

      $("#archiveEvents").append(str);

      console.log(data);
    })
    // if failed
    .fail(function (data) {
      console.error("not okay");
    });
};

$(document).ready(function () {
  getArchivedAnnouncements();
});

const getArchivedAnnouncements = () => {
  $.ajax({
    url: url + "getArchivedAnnouncements",
    type: "post",
    dataType: "json",
  })
    // if success

    .done(function (data) {
      let inactiveContent = data.payload;
      // accessing all items in the payload
      $("#getArchivedAnnouncements").empty();
      str = `
        <div class=" announce">
        `;

      inactiveContent.forEach((content) => {
        str += `

          <div class="archived_text_aerobics">
          <a href="">${content.title} </a>
          </div>
          <div class="announcement_paragraph">
              <a href="">${content.description} </a>
              
          </div>
          <button onclick="document.getElementById('id01').style.display='block'" class="restore">
              <p>Retrieve</p>
          </button>
         `;
      });

      str += `  <div id="id01" class="modal">
      <span onclick="document.getElementById('id01').style.display='none'" class="close"
          title="Close Modal">×</span>
      <form class="modal-content" action="#">
          <div class="container">
              <a>Retrieve Post</a>
              <p>Are you sure you want to retrieve your post?</p>

              <div class="clearfix">
                  <button type="button"
                      onclick="document.getElementById('id01').style.display='none'"
                      class="cancelbtn">No</button>
                  <button type="button"
                      onclick="document.getElementById('id01').style.display='none'"
                      class="deletebtn">Yes</button>
              </div>
          </div>
    
          
      </form>
  </div>
           

  `;

      $("#ArchivedAnnouncements").append(str);

      console.log(data);
    })
    // if failed
    .fail(function (data) {
      console.error("not okay");
    });
};

$(document).ready(function () {
  getArchivedGallery();
});

const getArchivedGallery = () => {
  $.ajax({
    url: url + "getArchivedGallery",
    type: "post",
    dataType: "json",
  })
    // if success

    .done(function (data) {
      let inactiveContent = data.payload;
      // accessing all items in the payload
      console.log(data.remarks);

      // $("#ArchivedGallery").empty();

      let str = `<div class="filterDiv">
      `;

      inactiveContent.forEach((content) => {
        str += `
                
          <img src="/assets/SUBSYSTEM_PHOTOS/CMS/${content.media}">
          <button onclick="document.getElementById('id01').style.display='block'" class="restore">
              <p>Retrieve</p>
          </button>
         
                 
   
        `;
      });
      str += ` </div>
      
  `;

      $("#ArchivedGallery").append(str);

      console.log(data);
    })
    // if failed
    .fail(function (data) {
      console.error("not okay");
    });
};






