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

      let str = `<style>
      // .announcement-card {
      //   display: flex;
      //   flex-direction: column;
      //   justify-content: space-between;
      //   border-radius: 8px;
      //   box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0), 0 2px 5px 0 rgba(0, 0, 0, 0.15);
      //   border: 1px solid #dad9d9;
      //    overflow: hidden;
      //   margin-bottom: 20px;
      // }
      
      .announcement-card__image {
        width: 100%;
        height: 200px;
        object-fit: cover;
        // border: 1px solid purple;
      }
      
      .announcement-card__image img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      
      .announcement-card__content {
        margin-top:10px;
        font-family: montserrat-bold;
        color: #424857;
        height: 30px;
        // border: 1px solid red;
      }
      
      .announcement-card__title {
        font-size: 20px;
        font-weight: bold;
        width: 10%;
        margin-bottom: 10px;
      }
      
      .announcement-card__description {
        font-size: 16px;
        margin-top: 0;
        margin-bottom: 10px;
      }
      
      .announcement-card__button {
        border: none;
        background-color: #BB9441;
        color: white;
        padding: 10px;
        border-radius: 4px;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        margin-top: 10px;
        width: 100%;
      }
      
      

      .filterDiv.images {
        width: 29.4%;
        min-height: 250px;
        background-color: white;
        border-radius: 8px;
        box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.1);
        padding: 10px;
        // border: 1px solid blue;
      }
      </style>`;

      galleryContent.forEach((content) => {
        str += `    
                <div class="filterDiv images">
                <div class="announcement-card__image">

                <img src="/assets/SUBSYSTEM_PHOTOS/CMS/${content.media}">
                </div>
                <div class="announcement-card__content">

                <h3 class="announcement-card__title">${content.title}</h3>

                </div>
                <button onclick="GalleryRestore(${content.id})" id="GalleryRestore${content.id}" class="announcement-card__button">
                <span>Retrieve</span>
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

      let str = `<style>
    //   .event_card {
    //     display: flex;
    //     flex-direction: column;
    //     justify-content: space-between;
    //     border-radius: 8px;
    //      box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0), 0 2px 5px 0 rgba(0, 0, 0, 0.15);
    //     border: 1px solid #dad9d9;
    //     overflow: hidden;
    //      margin-bottom: 20px;
    // }
    
    .event_card_image {
        width: 100%;
        height: 200px;
        object-fit: cover;
    }
    
    .event_card_content {
      padding-top: 10px;
      padding-bottom: 10px;
        // border: 1px solid red;
    }
    
    .event_card_title {
        font-size: 20px;
        font-family: montserrat-bold;
        margin-bottom: 10px;
        color: #424857;
    }
    
    .event_card_description {
        font-size: 15px;
        height: 80px;
        font-family: montserrat-medium;
        letter-spacing: 1px;
        word-break: break-all;
        // text-align: justify;
        overflow: scroll;
        overflow-x: hidden;
        margin-bottom: 10px;
        color: #424857;
    }
    
    .event_card_details {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .event_card_date, .event_card_time {
        font-size: 15px;
        font-family:Montserrat-medium;
        color: #424857;
    }
    
    .event_card_button {
        border: none;
        background-color: #3297db;
        color: white;
        padding: 10px;
        border-radius: 4px;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        margin-top: 10px;
        width: 100%;
    }
    .filterDiv.events {
      width: 29.4%;
      min-height: 250px;
      background-color: white;
      border-radius: 8px;
      // box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.1);
      padding: 10px;
      // border: 1px solid blue;
    }
    
      </style>
      
      `;

      eventContent.forEach((content) => {
        str += `    
        <div class="filterDiv events ">

        <div class="event_card">

        <img class="event_card_image" src="/assets/SUBSYSTEM_PHOTOS/CMS/${content.media}" alt="${content.media}">
        <div class="event_card_content">
            <h3 class="event_card_title">${content.title}</h3>
            <p class="event_card_description">${content.description}</p>
            <div class="event_card_details">
                <p class="event_card_date">${content.date}</p>
                <p class="event_card_time">${content.time}</p>
            </div>
            <button onclick="EventRestore(${content.id})" id="EventRestore${content.id}" class="event_card_button">Retrieve</button>
        </div>
    </div>
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
      let eventContent = data.payload;
      // accessing all items in the payload
      //   console.log(data.remarks);

      // $("#ArchivedGallery").empty();

    
   
    
      let str = `<style>
      //  .announcement-card {
      //    display: flex;
      //    flex-direction: column;
      //    justify-content: space-between;
      //    border-radius: 8px;
      //    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0), 0 2px 5px 0 rgba(0, 0, 0, 0.15);
      //    border: 1px solid #dad9d9;
      //    overflow: hidden;
      //    margin-bottom: 20px;
      //  }
      
      .announce_images_main_content {
        width: 100%;
        height: 200px;
        object-fit: cover;
      }
      
      // .announcement_card__archived img {
      //   display: block;
      //   width: 100%;
      //   height: 100%;
      //   object-fit: cover;
      // }

      
      .announce_archived_content {
        padding-top: 10px;
        padding-bottom: 10px;
        // border: 1px solid red;
      }
      
      .announcement_archived {
        font-size: 20px;
        font-family: montserrat-bold;
        margin-bottom: 10px;
        color: #424857;
      }
      
      .announce_description_archived {
         font-size: 15px;
        height: 80px;
        font-family: montserrat-medium;
        letter-spacing: 1px;
        word-break: break-all;
        // text-align: justify;
        overflow: scroll;
        overflow-x: hidden;
        margin-bottom: 10px;
        color: #424857;
      }
      
      .announcement-card__button {
        border: none;
        background-color: #3297db;
        color: white;
        padding: 10px;
        border-radius: 4px;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        margin-top: 10px;
      }
      
      

      .filterDiv.announce_archived{
        width: 29.4%;
      min-height: 250px;
      background-color: white;
      border-radius: 8px;
      // box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.1);
      padding: 10px;
      // border: 1px solid blue;
      }
      </style>`;

      eventContent.forEach((content) => {
        str += `    
        
        <div class="filterDiv announce_archived">
        <div class="announcement-card">
 
    <img class="announce_images_main_content" src="/assets/SUBSYSTEM_PHOTOS/CMS/${content.media}" alt="${content.media}">
 
  <div class="announce_archived_content">
    <h3 class="announcement_archived">${content.title}</h3>
    <p class="announce_description_archived">${content.description}</p>
    <button onclick="AnnouncementRestore(${content.id})" id="AnnouncementRestore${content.id}" class="announcement-card__button">
      <span>Retrieve</span>
    </button>
  </div>
</div>

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
};
const EventRestore = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "Are you sure you want to restore this?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, restore it!",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      item = {};
      item["id"] = id;
      item = JSON.stringify(item);

      console.log(item);

      $.ajax({
        url: url + "EventRestore",
        type: "post",
        dataType: "json",
        data: item,
      })
        .done(function (data) {
          Swal.fire({
            title: "Restored!",
            text: "Event has been restored.",
            icon: "success",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          }
          );
        
        })
        .fail(function (data) {
          console.log("not working");
        });
    }
  });
};

const AnnouncementRestore = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "Are you sure you want to restore this?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, restore it!",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      item = {};
      item["id"] = id;
      item = JSON.stringify(item);

      console.log(item);

      $.ajax({
        url: url + "AnnouncementRestore",
        type: "post",
        dataType: "json",
        data: item,
      })
        .done(function (data) {
          Swal.fire({
            title: "Restored!",
            text: "Announcement has been restored.",
            icon: "success",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        })
        .fail(function (data) {
          console.log("not working");
        });
    }
  });
};
const GalleryRestore = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "Are you sure you want to restore this?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, restore it!",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      item = {};
      item["id"] = id;
      item = JSON.stringify(item);

      console.log(item);

      $.ajax({
        url: url + "GalleryRestore",
        type: "post",
        dataType: "json",
        data: item,
      })
        .done(function (data) {
          Swal.fire({
            title: "Restored!",
            text: "Gallery has been restored.",
            icon: "success",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        })
        .fail(function (data) {
          console.log("not working");
        });
    }
  });
};
