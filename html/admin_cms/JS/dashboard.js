let url = "http://localhost/CrystalSky/html/admin_cms/api/";

$(document).ready(function () {
  getAnnCount();
});

const getAnnCount = () => {
  $.ajax({
    url: url + "getAnnCount",
    type: "post",
    dataType: "json",
  })
    // if success

    .done(function (data) {
      let annCount = data.payload[0].count;
      console.log(annCount);
      // $("#ArchivedGallery").empty();

      let str = ``;
      str += ` 
        <p>   ${annCount} </p>
        `;
      // });
      str += ``;

      $("#getAnnCount").append(str);

      // console.log(data);
    })
    // if failed
    .fail(function (data) {
      console.error("not okay");
    });
};

$(document).ready(function () {
  getEveCount();
});

const getEveCount = () => {
  $.ajax({
    url: url + "getEveCount",
    type: "post",
    dataType: "json",
  })
    // if success

    .done(function (data) {
      let eveCount = data.payload[0].count;
      console.log(eveCount);
      // $("#ArchivedGallery").empty();

      let str = ``;
      str += ` 
        <p>   ${eveCount} </p>
        `;
      // });
      str += ``;

      $("#getEveCount").append(str);

      // console.log(data);
    })
    // if failed
    .fail(function (data) {
      console.error("not okay");
    });
};

$(document).ready(function () {
  getImgCount();
});

const getImgCount = () => {
  $.ajax({
    url: url + "getImgCount",
    type: "post",
    dataType: "json",
  })
    // if success

    .done(function (data) {
      let imgCount = data.payload[0].count;
      console.log(imgCount);
      // $("#ArchivedGallery").empty();

      let str = ``;
      str += ` 
        <p>   ${imgCount} </p>
        `;
      // });
      str += ``;

      $("#getImgCount").append(str);

      // console.log(data);
    })
    // if failed
    .fail(function (data) {
      console.error("not okay");
    });
};

$(document).ready(function () {
  getTotalCount();
});

const getTotalCount = () => {
  $.ajax({
    url: url + "getTotalCount",
    type: "post",
    dataType: "json",
  })

    .done(function (data) {
      let TotalCount = data.payload[0].count;
      console.log(TotalCount);
      // $("#ArchivedGallery").empty();

      let str = ``;
      str += ` 
      <p>   ${TotalCount} </p>
      `;
      // });
      str += ``;

      $("#getTotalCount").append(str);

      // console.log(data);
    })
    // if failed
    .fail(function (data) {
      console.log(data.payload[0].count);
      console.error("not okay");
    });
};

//rooms

$(document).ready(function () {
  getRoomPreview();
});

const getRoomPreview = () => {
  $.ajax({
    url: url + "getRooms",
    type: "post",
    dataType: "json",
  })
    // if success

    .done(function (data) {
      let Rooms = data.payload;
      // accessing all items in the payload
      // console.log(data.remarks);

      let str = ``;

      Rooms.forEach((content) => {
        str += `<style>
          #more {display: none;}
        </style>

                      <div class="dashboard_item_container_2">
                                <div class="dashboard_item_row_2_container">
                                    <div class="dashboard_img">
                                        <img src="/assets/SUBSYSTEM_PHOTOS/CMS/${content.image}" style="width:100%" height="200px">
                                        <div class="gray">
                                            <div class="gray_background">
                                                <div class="icon_img">
                                                    <img src="/assets/SUBSYSTEM_PHOTOS/CMS/user.png">
                                                    <p>${content.capacity} Guest</p>
                                                </div>
                                                <div class="icon_img_2">
                                                    <img src="/assets/SUBSYSTEM_PHOTOS/CMS/floorplan.png" >
                                                    <a>${content.room_number}</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="paragraph_1">
                                    <div class="dashboard_title_2">
                                        <a>${content.name}</a>
                                    </div>
                                    <div class="paragraph_rooms">
                                        <p>${content.description}
                                          
                                        </p>
                                    </div>
                                </div>
                                <div class="button">
                                    <div class="edit_button">
                                    <a onclick="editRoom(${content.id})">EDIT</a>
                                                                        </div>
                                    <div class="publish_button">
                                    <a type="button" onclick="RoomPublish(${content.id})" class="defBtn acceptBtn" id="RoomPublish${content.id}" >PUBLISH</a>
                                    </div>
                                </div>
                            </div>
   
        `;
      });
      str += ``;

      $("#getRooms").append(str);

      console.log(data);
    })
    // if failed
    .fail(function (data) {
      console.log(data.payload);
      console.error("not okay");
    });
};

// start ng read more
function myFunction() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("myBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less";
    moreText.style.display = "inline";
  }
}
// end ng bago kong add sa readmore

$(".see-more").click(function (event) {
  event.preventDefault();
  $(this).prev(".text1").css("white-space", "normal");
  $(this).remove();
});

let timeouts = {};

function RoomPublish(id) {
  Swal.fire({
    title: "Publish Room",
    text: "Do you want to publish this room now or schedule it for later?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#4BB1F7",
    cancelButtonColor: "#BB9441",
    confirmButtonText: "PUBLISH NOW",
    cancelButtonText: "SCHEDULE FOR LATER",
  }).then((result) => {
    if (result.isConfirmed) {
      publishRoom(id);
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire({
        title: "SCHEDULE ROOM",
        html:
          '<div style="display:flex; flex-direction: column; text-align: start;">' +
          '<label for="publish-date" style="display:block; margin-bottom:10px; color:">Publish Date</label>' +
          '<input type="date" id="publish-date" style="padding:5px; border-radius: 4px; border: 1px solid #dad9d9; color: #424857; height: 30px; padding-left:14px; padding-right:14px;">' +
          '<label for="publish-time" style="display:block; margin-top:10px; margin-bottom:10px;">Publish Time</label>' +
          '<input type="time" id="publish-time" style="padding:5px; padding-left:14px; padding-right:14px; border-radius: 4px; border: 1px solid #dad9d9; color: #424857; height: 30px;" >',
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "SCHEDULE",
      }).then((result) => {
        if (result.isConfirmed) {
          const date = document.getElementById("publish-date").value;
          const time = document.getElementById("publish-time").value;
          if (date === "" || time === "") {
            Swal.fire({
              title: "Error",
              text: "Please select a valid date and time.",
              icon: "error",
              confirmButtonColor: "#3085d6",
            });
            return;
          }

          const publishDateTime = new Date(`${date} ${time}`).getTime();
          const now = new Date().getTime();
          const delay = publishDateTime - now;
          localStorage.setItem(`scheduled_${id}`, publishDateTime);

          $(`#RoomPublish${id}`).text("SCHEDULED");
          $(`#RoomPublish${id}`).addClass("scheduled");
          // color change
          $(`#RoomPublish${id}`).css("background-color", "#FFC107", "Font-family", "montserrat-medium", "border-radius", "4px");
          $(`#RoomPublish${id}`).off("click");
          $(`#RoomPublish${id}`).click(function () {
            Swal.fire({
              title: "Scheduled Room",
              text: `This room is scheduled to be published on ${date} at ${time}.`,
              icon: "info",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "CANCEL SCHEDULE",
              cancelButtonText: "CLOSE",
            }).then((result) => {
              if (result.isConfirmed) {
                cancelRoomSchedule(id);
              }
            });
          });

          timeouts[id] = setTimeout(function () {
            publishRoom(id);
          }, delay);

          Swal.fire({
            title: "Room Scheduled",
            text: "The room has been scheduled for publication.",
            icon: "success",
            confirmButtonColor: "#3085d6",
          });
        }
      });
    }
  });
}

// check local storage for scheduled date and time

function cancelRoomSchedule(id) {
  // Remove "scheduled" class and change text to "Publish"
  $(`#RoomPublish${id}`).text("Publish");
  $(`#RoomPublish${id}`).removeClass("scheduled");
  // color change
  $(`#RoomPublish${id}`).css("background-color", "#4CAF50");

  // Remove existing click event and add RoomPublish function as click event
  $(`#RoomPublish${id}`).off("click");
  $(`#RoomPublish${id}`).click(function () {
    RoomPublish(id);
  });

  clearTimeout(timeouts[id]);

  // Clear timeout associated with scheduled publish

  // Remove "Cancel Scheduled" button and replace with "Schedule for Later"
  $(`#RoomCancel${id}`).remove();

  // Add click event for "Schedule for Later" button
  $(`#RoomSchedule${id}`).click(function () {
    scheduleRoom(id);
  });
}

function publishRoom(id) {
  item = {};
  // inputs will be turned into objects
  item["id"] = id;
  // stringify the object
  item = JSON.stringify(item);

  console.log(item);

  $.ajax({
    url: url + "RoomPublish",
    type: "post",
    dataType: "json",
    data: item,
  })
    // if success
    .done(function (data) {
      // set id as local storage
      // reload page
      Swal.fire({
        icon: "success",
        title: "Done!",
        confirmButtonColor: "#4BB1F7",
        text: "Room has been published.",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(function () {
        location.reload();
      }, 1800);

      getRooms();
    })
    // if failed
    .fail(function (data) {
      console.log("not working");
    });
}

//LIVE ROOM

//rooms

$(document).ready(function () {
  getLiveRooms();
});

const getLiveRooms = () => {
  $.ajax({
    url: url + "getLiveRooms",
    type: "post",
    dataType: "json",
  })
    // if success

    .done(function (data) {
      let LiveRooms = data.payload;
      // accessing all items in the payload
      // console.log(data.remarks);

      let str = ``;

      LiveRooms.forEach((content) => {
        str += `    

        <div class="dashboard_item_container_2">
                                <div class="dashboard_item_row_2_container">
                                    <div class="dashboard_img">
                                        <img src="/assets/SUBSYSTEM_PHOTOS/CMS/${content.image}" style="width:100%" height="200px"
>
                                        <div class="gray">
                                            <div class="gray_background">
                                                <div class="icon_img">
                                                    <img src="/assets/SUBSYSTEM_PHOTOS/CMS/user.png">
                                                    <p>${content.capacity} Guest</p>
                                                </div>
                                                <div class="icon_img_2">
                                                    <img src="/assets/SUBSYSTEM_PHOTOS/CMS/floorplan.png">
                                                    <a>${content.room_number}</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="paragraph_1">
                                    <div class="dashboard_title_2">
                                        <a>${content.name}</a>
                                    </div>
                                    <div class="paragraph_rooms">
                                        <p>${content.description}
                                        </p>
                                    </div>
                                </div>
                                <div class="button">
                                <div class="edit_button">
                                <a onclick="editRoom(${content.id})">EDIT</a>
                                                                    </div>
                                    <div class="live_publish_button">

                                    <a type="button" onclick="RoomUnPublish(${content.id})" class="defBtn acceptBtn" id="RoomUnPublish${content.id}" >UNPUBLISH</a>

                                    </div>
                                    
                                </div>
                            </div>
   
        `;
      });
      str += ``;

      $("#getLiveRooms").append(str);

      console.log(data);
    })
    // if failed
    .fail(function (data) {
      console.error("not okay");
    });
};

function RoomUnPublish(id) {
  let confirmUnPublish = confirm("Are you sure to Publish?");

  if (confirmUnPublish) {
    item = {};
    // inputs will be turned into objects
    item["id"] = id;
    // stringify the object
    item = JSON.stringify(item);

    console.log(item);

    $.ajax({
      url: url + "RoomUnPublish",
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

$(document).ready(function () {
  getGalleryUnPublish();
});

const getGalleryUnPublish = () => {
  $.ajax({
    url: url + "getGalleryUnPublish",
    type: "post",
    dataType: "json",
  })
    // if success

    .done(function (data) {
      let gallery = data.payload;
      // accessing all items in the payload
      console.log(data.remarks);

      // $("#ArchivedGallery").empty();

      let str = ` 
      <style>
        </style>
`;

      gallery.forEach((content) => {
        str += `   

        <div class="content_gallery" >
                      
                      <img id="chosen-image" src="/assets/SUBSYSTEM_PHOTOS/CMS/${content.media}" alt="Mountains" class="gallery_img" style="width:100%" height="200px" >
                     
                        <div class="gallery_publish_button">
                            <div class="publish_button_text">
                                <a type="button" onclick="galleryPublish(${content.id})" class="defBtn acceptBtn" id="galleryPublish${content.id}" >PUBLISH</a>
                            </div>
                            <div class="publish_button_archived">
                                <a type="button" onclick="galleryArchive(${content.id})" class="defBtn acceptBtn" id="galleryArchive${content.id}" >ARCHIVE</a>
                            </div>
                        </div>
        </div>
        `;
      });
      str += `
                                  `;

      $("#getGalleryUnPublish").append(str);

      console.log(data);
    })
    // if failed
    .fail(function (data) {
      console.error("not okay");
    });
};

$(document).ready(function () {
  getGalleryPublish();
});

const getGalleryPublish = () => {
  $.ajax({
    url: url + "getGalleryPublish",
    type: "post",
    dataType: "json",
  })
    // if success

    .done(function (data) {
      let publishGallery = data.payload;
      // accessing all items in the payload
      console.log(data.remarks);

      // $("#ArchivedGallery").empty();

      let str = ` 
      
`;

      publishGallery.forEach((content) => {
        str += `    

     
            <div class="content_gallery" >
            <img id="chosen-image" src="/assets/SUBSYSTEM_PHOTOS/CMS/${content.media}"
            alt="Mountains" class="gallery_img" style="width:100%" height="200px">
            <div class="gallery_publish_button">
            <div class="live_button_text">
            <a type="button" onclick="galleryUnPublish(${content.id})" class="defBtn acceptBtn" id="galleryUnPublish${content.id}" >UNPUBLISH</a>
            </div>
            </div>
            </div>
        `;
      });
      str += `
                                  `;

      $("#getGalleryPublish").append(str);

      console.log(data);
    })
    // if failed
    .fail(function (data) {
      console.error("not okay");
    });
};

function galleryPublish(id) {
  Swal.fire({
    title: "Publish Gallery",
    text: "Do you want to publish this Image now or schedule it for later?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Publish Now",
    cancelButtonText: "Schedule for Later",
  }).then((result) => {
    if (result.isConfirmed) {
      publishGallery(id);
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire({
        title: "Schedule Post",
        html:
          '<label for="publish-date" style="display:block; margin-bottom:10px;">Publish Date</label>' +
          '<input type="date" id="publish-date" style="padding:5px;">' +
          '<label for="publish-time" style="display:block; margin-top:10px; margin-bottom:10px;">Publish Time</label>' +
          '<input type="time" id="publish-time" style="padding:5px; padding-left:14px; padding-right:14px;">',
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Schedule",
      }).then((result) => {
        if (result.isConfirmed) {
          const date = document.getElementById("publish-date").value;
          const time = document.getElementById("publish-time").value;
          if (date === "" || time === "") {
            Swal.fire({
              title: "Error",
              text: "Please select a valid date and time.",
              icon: "error",
              confirmButtonColor: "#3085d6",
            });
            return;
          }

          const publishDateTime = new Date(`${date} ${time}`).getTime();
          const now = new Date().getTime();
          const delay = publishDateTime - now;
          $(`#galleryPublish${id}`).text("Scheduled");
          $(`#galleryPublish${id}`).addClass("scheduled");
          $(`#galleryPublish${id}`).css("background-color", "#FFC107");

          $(`#galleryPublish${id}`).off("click");
          $(`#galleryPublish${id}`).click(function () {
            Swal.fire({
              title: "Scheduled Post",
              text: `This room is scheduled to be published on ${date} at ${time}.`,
              icon: "info",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Cancel Schedule",
              cancelButtonText: "Close",
            }).then((result) => {
              if (result.isConfirmed) {
                cancelGallerySchedule(id);
              }
            });
          });

          timeouts[id] = setTimeout(function () {
            publishGallery(id);
          }, delay);

          Swal.fire({
            title: "Post Scheduled",
            text: "The room has been scheduled for publication.",
            icon: "success",
            confirmButtonColor: "#3085d6",
          });
        }
      });
    }
  });
}
function cancelGallerySchedule(id) {
  // Remove "scheduled" class and change text to "Publish"
  $(`#galleryPublish${id}`).text("Publish");
  $(`#galleryPublish${id}`).removeClass("scheduled");
  $(`#galleryPublish${id}`).css("background-color", "#4CAF50");

  // Remove existing click event and add RoomPublish function as click event
  $(`#galleryPublish${id}`).off("click");
  $(`#galleryPublish${id}`).click(function () {
    galleryPublish(id);
  });

  clearTimeout(timeouts[id]);
}

function publishGallery(id) {
  item = {};
  // inputs will be turned into objects
  item["id"] = id;
  // stringify the object
  item = JSON.stringify(item);

  console.log(item);

  $.ajax({
    url: url + "galleryPublish",
    type: "post",
    dataType: "json",
    data: item,
  })
    // if success
    .done(function (data) {
      // set id as local storage
      // reload page
      Swal.fire({
        icon: "success",
        title: "Done!",
        confirmButtonColor: "#4BB1F7",
        text: "Room has been published.",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(function () {
        location.reload();
      }, 1800);

      getRooms();
    })
    // if failed
    .fail(function (data) {
      console.log("not working");
    });
}

// const galleryPublish = (id) => {
//   let confirmUnPublish = confirm("Are you sure to Publish?");

//   if (confirmUnPublish) {
//     item = {};
//     // inputs will be turned into objects
//     item["id"] = id;
//     // stringify the object
//     item = JSON.stringify(item);

//     console.log(item);

//     $.ajax({
//       url: url + "galleryPublish",
//       type: "post",
//       dataType: "json",
//       data: item,
//     })
//       // if success
//       .done(function (data) {
//         // set id as local storage
//         // reload page
//         window.location.reload();

//         getRooms();
//       })
//       // if failed
//       .fail(function (data) {
//         console.log("not working");
//       });
//   }
// };

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
      let Announcement = data.payload;
      // accessing all items in the payload
      console.log(data.remarks);

      // $("#ArchivedGallery").empty();

      let str = ``;

      Announcement.forEach((content) => {
        str += `    
        <style>
        .publish_title_announcement${content.id}{
         display:flex;
         width: 100%;
         align-items: center;
         height: 30px;
          // border: 1px solid red;
         margin-top: 5px;
         margin-bottom: 5px;
         
        }
        .publish_title_announcement${content.id} p{
          font-family: montserrat-bold;
          letter-spacing:1px;
          font-size:20px;
          color:  #424857;
           width: 100%; 
           white-space: nowrap;
           text-overflow: ellipsis;
          overflow: hidden;
          font-weight: bold;
        }
        </style>

                                <div class="content_announcement">
                              <img id="chosen-image" src="/assets/SUBSYSTEM_PHOTOS/CMS/${content.media}"
alt="Mountains" style="width:100%" height="200px" class="announcement_img">

                                        <div class="publish_title_announcement${content.id}">
                                            <p>${content.title}</p>
                                        </div>
                                        <div class="publish_paragraph_announcement">
                                            <p>${content.description}</p>
                                        </div>

                                        <div class="announcement_publish_button">
                                            <div class="announcement_publish_button_text">
<a type="button" onclick="announcementPublish(${content.id})" class="defBtn acceptBtn" id="announcementPublish${content.id}" >PUBLISH</a>
                                            </div>
                                            <div class="publish_button_text_announcement">
<a type="button" onclick="announcementArchive(${content.id})" class="defBtn acceptBtn" id="announcementArchive${content.id}" >ARCHIVE</a>
</div>
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

/// announcement bagong script ko check mo to men meron nato sa taas diko alam bat dina read kaya nag lagay nalang ako dito sa dashboard yung isa men

function myFunction() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("myBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less";
    moreText.style.display = "inline";
  }
}

$(document).ready(function () {
  getAnnouncementsPublish();
});

const getAnnouncementsPublish = () => {
  $.ajax({
    url: url + "getAnnouncementsPublish",
    type: "post",
    dataType: "json",
  })
    // if success

    .done(function (data) {
      let AnnouncementPublished = data.payload;
      // accessing all items in the payload
      console.log(data.remarks);

      // $("#ArchivedGallery").empty();

      let str = ``;

      AnnouncementPublished.forEach((content) => {
        str += `    
        <style>
        .publish_title_announcement${content.id}{
         display:flex;
         width: 100%;
         min-height: 20px;
        //  border: 1px solid red;
         margin-top: 5px;
         margin-bottom: 5px;
        }
        .publish_title_announcement${content.id} p{
          font-family: montserrat-bold;
          letter-spacing:1px;
          font-size:20px;
          color:  #424857;
           width: 100%; 
           white-space: nowrap;
           text-overflow: ellipsis;
          overflow: hidden;
          font-weight: bold;
        }
        </style>

                                <div class="content_announcement">
                              <img id="chosen-image" src="/assets/SUBSYSTEM_PHOTOS/CMS/${content.media}"
alt="Mountains" style="width:100%" height="200px"
 class="announcement_img">

                                        <div class="publish_title_announcement${content.id}">
                                            <p>${content.title}</p>
                                        </div>
                                        <div class="publish_paragraph_announcement">
                                            <p>${content.description}</p>
                                        </div>

                                        <div class="announcement_publish_button">
                                            <div class="announcement_live_button_text">
<a type="button" onclick="announcementUnPublish(${content.id})" class="defBtn acceptBtn" id="announcementUnPublish${content.id}" >UNPUBLISH</a>
                                            </div>
                                        </div>
                                    </div>
        `;
      });
      str += ``;

      $("#getAnnouncementsPublish").append(str);

      console.log(test);
    })
    // if failed
    .fail(function (data) {
      console.error("not okay");
    });
};

function announcementPublish(id) {
  Swal.fire({
    title: "Publish Gallery",
    text: "Do you want to publish this Announcement now or schedule it for later?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Publish Now",
    cancelButtonText: "Schedule for Later",
  }).then((result) => {
    if (result.isConfirmed) {
      publishAnnouncement(id);
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire({
        title: "Schedule Post",
        html:
          '<label for="publish-date" style="display:block; margin-bottom:10px;">Publish Date</label>' +
          '<input type="date" id="publish-date" style="padding:5px;">' +
          '<label for="publish-time" style="display:block; margin-top:10px; margin-bottom:10px;">Publish Time</label>' +
          '<input type="time" id="publish-time" style="padding:5px; padding-left:14px; padding-right:14px;">',
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Schedule",
      }).then((result) => {
        if (result.isConfirmed) {
          const date = document.getElementById("publish-date").value;
          const time = document.getElementById("publish-time").value;
          if (date === "" || time === "") {
            Swal.fire({
              title: "Error",
              text: "Please select a valid date and time.",
              icon: "error",
              confirmButtonColor: "#3085d6",
            });
            return;
          }

          const publishDateTime = new Date(`${date} ${time}`).getTime();
          const now = new Date().getTime();
          const delay = publishDateTime - now;
          $(`#announcementPublish${id}`).text("Scheduled");
          $(`#announcementPublish${id}`).addClass("scheduled");
          $(`#announcementPublish${id}`).css("background-color", "#FFC107");

          $(`#announcementPublish${id}`).off("click");
          $(`#announcementPublish${id}`).click(function () {
            Swal.fire({
              title: "Scheduled Announcement",
              text: `This room is scheduled to be published on ${date} at ${time}.`,
              icon: "info",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Cancel Schedule",
              cancelButtonText: "Close",
            }).then((result) => {
              if (result.isConfirmed) {
                cancelAnnouncementSchedule(id);
              }
            });
          });

          timeouts[id] = setTimeout(function () {
            publishAnnouncement(id);
          }, delay);

          Swal.fire({
            title: "Post Scheduled",
            text: "The room has been scheduled for publication.",
            icon: "success",
            confirmButtonColor: "#3085d6",
          });
        }
      });
    }
  });
}
function cancelAnnouncementSchedule(id) {
  // Remove "scheduled" class and change text to "Publish"
  $(`#announcementPublish${id}`).text("Publish");
  $(`#announcementPublish${id}`).removeClass("scheduled");
  $(`#announcementPublish${id}`).css("background-color", "#4CAF50");

  // Remove existing click event and add RoomPublish function as click event
  $(`#announcementPublish${id}`).off("click");
  $(`#announcementPublish${id}`).click(function () {
    announcementPublish(id);
  });

  clearTimeout(timeouts[id]);
}

function publishAnnouncement(id) {
  item = {};
  // inputs will be turned into objects
  item["id"] = id;
  // stringify the object
  item = JSON.stringify(item);

  console.log(item);

  $.ajax({
    url: url + "announcementPublish",
    type: "post",
    dataType: "json",
    data: item,
  })
    // if success
    .done(function (data) {
      // set id as local storage
      // reload page
      Swal.fire({
        icon: "success",
        title: "Done!",
        confirmButtonColor: "#4BB1F7",
        text: "Room has been published.",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(function () {
        location.reload();
      }, 1800);

      getRooms();
    })
    // if failed
    .fail(function (data) {
      console.log("not working");
    });
}

function eventPublish(id) {
  Swal.fire({
    title: "Publish Gallery",
    text: "Do you want to publish this Event now or schedule it for later?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Publish Now",
    cancelButtonText: "Schedule for Later",
  }).then((result) => {
    if (result.isConfirmed) {
      publishEvent(id);
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire({
        title: "Schedule Post",
        html:
          '<label for="publish-date" style="display:block; margin-bottom:10px;">Publish Date</label>' +
          '<input type="date" id="publish-date" style="padding:5px;">' +
          '<label for="publish-time" style="display:block; margin-top:10px; margin-bottom:10px;">Publish Time</label>' +
          '<input type="time" id="publish-time" style="padding:5px; padding-left:14px; padding-right:14px;">',
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Schedule",
      }).then((result) => {
        if (result.isConfirmed) {
          const date = document.getElementById("publish-date").value;
          const time = document.getElementById("publish-time").value;
          if (date === "" || time === "") {
            Swal.fire({
              title: "Error",
              text: "Please select a valid date and time.",
              icon: "error",
              confirmButtonColor: "#3085d6",
            });
            return;
          }

          const publishDateTime = new Date(`${date} ${time}`).getTime();
          const now = new Date().getTime();
          const delay = publishDateTime - now;
          $(`#eventPublish${id}`).text("Scheduled");
          $(`#eventPublish${id}`).addClass("scheduled");
          $(`#eventPublish${id}`).css("background-color", "#FFC107");

          $(`#eventPublish${id}`).off("click");
          $(`#eventPublish${id}`).click(function () {
            Swal.fire({
              title: "Scheduled Event",
              text: `This room is scheduled to be published on ${date} at ${time}.`,
              icon: "info",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Cancel Schedule",
              cancelButtonText: "Close",
            }).then((result) => {
              if (result.isConfirmed) {
                cancelEventSchedule(id);
              }
            });
          });

          timeouts[id] = setTimeout(function () {
            publishEvent(id);
          }, delay);

          Swal.fire({
            title: "Post Scheduled",
            text: "The room has been scheduled for publication.",
            icon: "success",
            confirmButtonColor: "#3085d6",
          });
        }
      });
    }
  });
}
function cancelEventSchedule(id) {
  // Remove "scheduled" class and change text to "Publish"
  $(`#eventPublish${id}`).text("Publish");
  $(`#eventPublish${id}`).removeClass("scheduled");

  $(`#eventPublish${id}`).css("background-color", "#4CAF50");

  // Remove existing click event and add RoomPublish function as click event
  $(`#eventPublish${id}`).off("click");
  $(`#eventPublish${id}`).click(function () {
    eventPublish(id);
  });

  clearTimeout(timeouts[id]);
}

function publishEvent(id) {
  item = {};
  // inputs will be turned into objects
  item["id"] = id;
  // stringify the object
  item = JSON.stringify(item);

  console.log(item);

  $.ajax({
    url: url + "eventPublish",
    type: "post",
    dataType: "json",
    data: item,
  })
    // if success
    .done(function (data) {
      // set id as local storage
      // reload page
      Swal.fire({
        icon: "success",
        title: "Done!",
        confirmButtonColor: "#4BB1F7",
        text: "Room has been published.",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(function () {
        location.reload();
      }, 1800);

      getEventPublish();
    })
    // if failed
    .fail(function (data) {
      console.log("not working");
    });
}

// const eventPublish = (id) => {
//   let confirmUnPublish = confirm("Are you sure to Publish?");

//   if (confirmUnPublish) {
//     item = {};
//     // inputs will be turned into objects
//     item["id"] = id;
//     // stringify the object
//     item = JSON.stringify(item);

//     console.log(item);

//     $.ajax({
//       url: url + "eventPublish",
//       type: "post",
//       dataType: "json",
//       data: item,
//     })
//       // if success
//       .done(function (data) {
//         // set id as local storage
//         // reload page
//         Swal.fire({
//           icon: "success",
//           title: "Done!",
//           confirmButtonColor: "#4BB1F7",
//           text: "Event has been published.",
//           showConfirmButton: false,
//           timer: 1500,
//         });

//         setTimeout(function () {
//           location.reload();
//         }, 1800);
//       })
//       // if failed
//       .fail(function (data) {
//         console.log("not working");
//       });
//   }
// };
// $(document).ready(function () {
//   getAnnouncements();
// });

$(document).ready(function () {
  getEventUnpublish();
});

const getEventUnpublish = () => {
  $.ajax({
    url: url + "getEventUnpublish",
    type: "post",
    dataType: "json",
  })
    // if success

    .done(function (data) {
      let inactiveContent = data.payload;
      // accessing all items in the payload
      console.log(data.remarks);

      // $("#ArchivedGallery").empty();

      let str = ``;

      inactiveContent.forEach((content) => {
        str += `    
        <div class="content_events_panel">
                                        <img id="chosen-image4" src="/assets/SUBSYSTEM_PHOTOS/CMS/${content.media}"
                                            alt="${content.media}" class="event_img" style="width:100%" height="200px">

                                        <div class="publish_title_events_panel">
                                            <p>${content.title}</p>
                                        </div>

                                       
                                            <div class="event_time_to">
                                                <p>${content.time}</p>
                                            </div>

                                        <div class="publish_paragraph_events_panel">
                                            <p>${content.description}</p>
                                        </div>

                                        <div class="events_panel_publish_button">
                                            <div class="events_panel_publish_button_text">
                                              <a type="button" onclick="eventPublish(${content.id})" class="defBtn acceptBtn" id="eventPublish${content.id}" >PUBLISH</a>
                                            </div>

                                            <div class="event_publish_button_text">
                                              <a type="button" onclick="eventArchive(${content.id})" class="defBtn acceptBtn" id="eventArchive${content.id}" >ARCHIVE</a>
                                            </div>
                                         </div>
                                        
        </div>
   
        `;
      });
      str += ``;

      $("#getEventUnpublish").append(str);

      console.log(data);
    })
    // if failed
    .fail(function (data) {
      console.error("not okay");
    });
};

$(document).ready(function () {
  getEventPublish();
});

const getEventPublish = () => {
  $.ajax({
    url: url + "getEventPublish",
    type: "post",
    dataType: "json",
  })
    // if success

    .done(function (data) {
      let activeContent = data.payload;
      // accessing all items in the payload
      console.log(data.remarks);

      // $("#ArchivedGallery").empty();

      let str = ``;

      activeContent.forEach((content) => {
        str += `    
        <div class="content_events_panel">
                                        <img id="chosen-image4" src="/assets/SUBSYSTEM_PHOTOS/CMS/${content.media}"
                                            alt="${content.media}" class="event_img" style="width:100%" height="200px">

                                        <div class="publish_title_events_panel">
                                            <p>${content.title}</p>
                                        </div>

                                       
                                            <div class="event_time_to">
                                                <p>${content.time}</p>
                                            </div>

                                        <div class="publish_paragraph_events_panel">
                                            <p>${content.description}</p>
                                        </div>

                                        <div class="events_panel_publish_button">
                                            <div class="events_panel_live_button_text">
                                            <a type="button" onclick="eventUnPublish(${content.id})" class="defBtn acceptBtn" id="eventUnPublish${content.id}" >UNPUBLISH</a>
                                            </div>
                                        </div>
                                    </div>
   
        `;
      });
      str += ``;

      $("#getEventPublish").append(str);

      console.log(data);
    })
    // if failed
    .fail(function (data) {
      console.error("not okay");
    });
};

const eventUnPublish = (id) => {
  let confirmUnPublish = confirm("Are you sure to unpublish?");

  if (confirmUnPublish) {
    item = {};
    // inputs will be turned into objects
    item["id"] = id;
    // stringify the object
    item = JSON.stringify(item);

    console.log(item);

    $.ajax({
      url: url + "eventUnPublish",
      type: "post",
      dataType: "json",
      data: item,
    })
      // if success
      .done(function (data) {
        // set id as local storage
        // reload page
        Swal.fire({
          icon: "success",
          title: "Done!",
          confirmButtonColor: "#4BB1F7",
          text: "You unpublished an event.",
          showConfirmButton: false,
          timer: 1500,
        });

        setTimeout(function () {
          location.reload();
        }, 1800);
      })
      // if failed
      .fail(function (data) {
        console.log("not working");
      });
  }
};

const announcementUnPublish = (id) => {
  let confirmUnPublish = confirm("Are you sure to unpublish?");

  if (confirmUnPublish) {
    item = {};
    // inputs will be turned into objects
    item["id"] = id;
    // stringify the object
    item = JSON.stringify(item);

    console.log(item);

    $.ajax({
      url: url + "announcementUnPublish",
      type: "post",
      dataType: "json",
      data: item,
    })
      // if success
      .done(function (data) {
        // set id as local storage
        // reload page
        Swal.fire({
          icon: "success",
          title: "Done!",
          confirmButtonColor: "#4BB1F7",
          text: "You unpublished an announcement.",
          showConfirmButton: false,
          timer: 1500,
        });

        setTimeout(function () {
          location.reload();
        }, 1800);
      })
      // if failed
      .fail(function (data) {
        console.log("not working");
      });
  }
};
const galleryUnPublish = (id) => {
  let confirmUnPublish = confirm("Are you sure to unpublish?");

  if (confirmUnPublish) {
    item = {};
    // inputs will be turned into objects
    item["id"] = id;
    // stringify the object
    item = JSON.stringify(item);

    console.log(item);

    $.ajax({
      url: url + "galleryUnPublish",
      type: "post",
      dataType: "json",
      data: item,
    })
      // if success
      .done(function (data) {
        // set id as local storage
        // reload page
        Swal.fire({
          icon: "success",
          title: "Done!",
          confirmButtonColor: "#4BB1F7",
          text: "Image has unpublished.",
          showConfirmButton: false,
          timer: 1500,
        });

        setTimeout(function () {
          location.reload();
        }, 1800);
      })
      // if failed
      .fail(function (data) {
        console.log("not working");
      });
  }
};

$(document).ready(function () {
  // Add click listener to preview button
  $(".preview-btn").click(function () {
    // Hide live divs
    $('.publish_gallery_content[data-status="preview"]').hide();
    // Show preview divs
    $('.publish_gallery_content[data-status="live"]').show();
  });

  // Add click listener to live button
  $(".live-btn").click(function () {
    // Hide preview divs
    $('.publish_gallery_content[data-status="live"]').hide();
    // Show live divs
    $('.publish_gallery_content[data-status="preview"]').show();
  });
});

// archive
const galleryArchive = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "Are you sure you want to archive this?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, archive it!",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      item = {};
      item["id"] = id;
      item = JSON.stringify(item);

      console.log(item);

      $.ajax({
        url: url + "galleryArchive",
        type: "post",
        dataType: "json",
        data: item,
      })
        .done(function (data) {
          Swal.fire({
            icon: "success",
            title: "Done!",
            confirmButtonColor: "#4BB1F7",
            text: "You archived an image.",
          }).then((result) => {
            if (result.isConfirmed) {
              location.reload();
            }
          });
        })
        .fail(function (data) {
          console.log("not working");
        });
    }
  });
};

const eventArchive = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "Are you sure you want to archive this?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, archive it!",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      item = {};
      item["id"] = id;
      item = JSON.stringify(item);

      console.log(item);

      $.ajax({
        url: url + "eventArchive",
        type: "post",
        dataType: "json",
        data: item,
      })
        .done(function (data) {
          Swal.fire({
            icon: "success",
            title: "Done!",
            confirmButtonColor: "#4BB1F7",
            text: "You archived an event.",
          }).then((result) => {
            if (result.isConfirmed) {
              location.reload();
            }
          });
        })
        .fail(function (data) {
          console.log("not working");
        });
    }
  });
};
const announcementArchive = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "Are you sure you want to Archive this?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, archive it!",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      item = {};
      item["id"] = id;
      item = JSON.stringify(item);

      console.log(item);

      $.ajax({
        url: url + "announcementArchive",
        type: "post",
        dataType: "json",
        data: item,
      })
        .done(function (data) {
          Swal.fire({
            icon: "success",
            title: "Done!",
            confirmButtonColor: "#4BB1F7",
            text: "You archived an announcement.",
          }).then((result) => {
            if (result.isConfirmed) {
              location.reload();
            }
          });
        })
        .fail(function (data) {
          console.log("not working");
        });
    }
  });
};





$(document).ready(function () {
  getRooms();
});

const editRoom = (roomId) => {
  $.ajax({
    url: url + "getRooms",
    type: "post",
    dataType: "json",
  })
    // if success

    .done(function (data) {
      let Rooms = data.payload;

      const roomNumber = Rooms.find((content) => content.id === roomId);
      window.location.href = `http://127.0.0.1:5501//html/admin_cms/admin_cms_create_room.html?id=${roomId}`;
      // i want to auto click the edit button by room id
    })
    // if failed
    .fail(function (data) {
      console.error("not okay");
    });
};
// Swal.fire({
//   title: 'Change Profile Picture',
//   text: "Are you sure you want update your profile picture?",
//   icon: 'warning',
//   showCancelButton: true,
//   background: '#222222',
//   confirmButtonText: 'Continue',
//   confirmButtonColor: "#00AEAE",
//   color: '#b7b7b7',
//   confirmButtonText: 'Yes'
// })
