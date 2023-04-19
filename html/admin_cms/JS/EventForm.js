let url = "http://localhost/CrystalSky/html/admin_cms/api/";


$(document).ready(function () {
    addEventFunction();
});

const addEventFunction = () => {


      let str = `
      
 
 <form method="post" id="add-event-form" enctype="multipart/form-data" action="${url}addEventPost">
 <div class="add-event-input"><div class="today-date">
     <input type="date" name="date" class="event-date" />
 </div>
 </div>
 <div class="add-event-input">
     <input type="text" placeholder="Event Title" name="title"  />
 </div>
 <div class="add-event-input">
     <input type="time" placeholder="Event Time" name="time"  />
 </div>
 <div class="add-event-input">
     <input type="time" placeholder="Event Time To" name="time_to" />
 </div>

 <input type="file" id="upload-button" accept="image/*" name="media"  />
 <label for="upload-button">
     <i class="fas fa-upload"></i> &nbsp; Choose A Photo
 </label>

 <div class="content">
     <input type="text" name="description" placeholder="description" class="event-description"/>
 </div>

<div class="event_form_submit_container_submit">
 <input class="event_form_submit" type="submit" />
 </div>
</form>
`;


      $("#addEventFunction").append(str);

      console.log(data);
};
 