let url = "http://localhost/CrystalSky/html/admin_cms/api/";


$(document).ready(function () {
    getArchive();
});

const getArchive = () => {
        $.ajax({
            url: url + "getArchivedGallery",
            type: "post",
            dataType: "json",
          })
            // if success
        
            .done(function (data) {
              let galleryContent = data.payload;
              // accessing all items in the payload
              console.log(data.remarks);
        
              // $("#ArchivedGallery").empty();
        
              let str = ``;
        
              galleryContent.forEach((content) => {
                str += `    
                <div class="filterDiv images">
                <img src="/assets/SUBSYSTEM_PHOTOS/CMS/${content.media}">
                <button onclick="GalleryRestore(${content.id})" id="GalleryRestore${content.id}" class="restore">
                <p>Retrieve</p>
            </button>
           
            </div>
            
            
                `;
              });
              str += ``;
        
              $("#getArchivedGallery").append(str);
        
              console.log(data);
            })
            // if failed
            .fail(function (data) {
              console.error("not okay");
            });




};







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
      let eventContent = data.payload;
      // accessing all items in the payload
    //   console.log(data.remarks);

      // $("#ArchivedGallery").empty();

      let str = ``;

      eventContent.forEach((content) => {
        str += `    
        <div class="filterDiv events ">
        <p>${content.title}</p>
        <p>${content.description}</p>
        <p>${content.date}</p>
        <p>${content.time}</p>



        <button onclick="EventRestore(${content.id})" id="EventRestore${content.id}" class="restore">
        <p>Retrieve</p>
    </button>

    </div>
        `;
      });
      str += ``;

      $("#getArchivedEvents").append(str);

      console.log(data);
    })
    // if failed
    .fail(function (data) {
      console.error("not okay");
    });



}


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
      let eventContent = data.payload;
      // accessing all items in the payload
    //   console.log(data.remarks);

      // $("#ArchivedGallery").empty();

      let str = ``;

      eventContent.forEach((content) => {
        str += `    
        
        <div class="filterDiv announce">
        <div class="archived_text_dinning">
            <p>${content.title}</p>
        </div>
        <div class="announcement_paragraph">
            <a href="">${content.description} </a>
        </div>
        <button onclick="AnnouncementRestore(${content.id})" id="AnnouncementRestore${content.id}" class="restore">
        <p>Retrieve</p>
    </button>
        
    </div>
        `;
      });
      str += ``;

      $("#getArchivedAnnouncements").append(str);

      console.log(data);
    })
    // if failed
    .fail(function (data) {
      console.error("not okay");
    });



}




const EventRestore = (id) => {
    let confirmRestore = confirm("Are you sure to Restore this?");
  
    if (confirmRestore) {
      item = {};
      // inputs will be turned into objects
      item["id"] = id;
      // stringify the object
      item = JSON.stringify(item);
  
      console.log(item);
  
      $.ajax({
        url: url + "EventRestore",
        type: "post",
        dataType: "json",
        data: item,
      })
        // if success
        .done(function (data) {
          // set id as local storage
          // reload page
          window.location.reload();
  
          getRooms();
        })
        // if failed
        .fail(function (data) {
          console.log("not working");
        });
    }
  }
const AnnouncementRestore = (id) => {
    let confirmRestore = confirm("Are you sure to Restore this?");
  
    if (confirmRestore) {
      item = {};
      // inputs will be turned into objects
      item["id"] = id;
      // stringify the object
      item = JSON.stringify(item);
  
      console.log(item);
  
      $.ajax({
        url: url + "AnnouncementRestore",
        type: "post",
        dataType: "json",
        data: item,
      })
        // if success
        .done(function (data) {
          // set id as local storage
          // reload page
          window.location.reload();
  
          getRooms();
        })
        // if failed
        .fail(function (data) {
          console.log("not working");
        });
    }
  }
const GalleryRestore = (id) => {
    let confirmRestore = confirm("Are you sure to Restore this?");
  
    if (confirmRestore) {
      item = {};
      // inputs will be turned into objects
      item["id"] = id;
      // stringify the object
      item = JSON.stringify(item);
  
      console.log(item);
  
      $.ajax({
        url: url + "GalleryRestore",
        type: "post",
        dataType: "json",
        data: item,
      })
        // if success
        .done(function (data) {
          // set id as local storage
          // reload page
          window.location.reload();
  
          getRooms();
        })
        // if failed
        .fail(function (data) {
          console.log("not working");
        });
    }
  }