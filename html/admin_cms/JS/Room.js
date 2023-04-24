let url = "http://localhost/CrystalSky/html/admin_cms/api/";

$(document).ready(function () {
  
  getRoomCateg();
});

$(document).ready(function () {
  getRooms();
});



const getRoomCateg =() => {
  $.ajax({
    url: url + "getRoomsCateg",
    type: "post",
    dataType: "json",
  })
  
  .done(function (data) {
    let CategContent = data.payload;
    // accessing all items in the payload
    console.log(data);
  
    
    let str = ``;
  CategContent.forEach((content) => {
        str += `    
        
               <option class="category_inside" value="${content.id}">${content.name}</option>
                 `;
      });
    str += `
    `;
  
    $("#getRoomCateg").append(str);
  
    console.log(data);
  
  })
}

const getRooms = () => {
 
  
  $.ajax({
    url: url + "getRoomDetails",
    type: "post",
    dataType: "json",
  })
  
    // if success

    .done(function (data) {
      let RoomContent = data.payload;
      // accessing all items in the payload
      // console.log(data.remarks);

      // $("#ArchivedGallery").empty();

      let str = `      
      <style>
      
      </style>

      

      

        

          
          
        
       



 
      
      
        

          
          

          `;

      RoomContent.forEach((content) => {
        str += `            
              
                `;
      });
      str += `

                
                
                    `;
      // RoomContent.forEach((content) => {
      //   str += `    
              //  <option class="category_inside" value="${content.category_id}">${content.category_name}</option>
      //            `;
      // });
      str += ` 
               


            

  
          
      `;

      $("#getEditRoomsForm").append(str);

      console.log(data);
    })
    // if failed
    .fail(function (data) {
      console.error("not okay");
    });
};





$(document).ready(function () {
  getContentFormRooms();
});

const getContentFormRooms = () => {
  // if success

  // $("#ArchivedGallery").empty();

  let str = `<form action="${url}post_facilities" method="post" enctype="multipart/form-data">
                  <label for="name">Rooms</label>
                  <input type="text" id="text" name="name" placeholder="Add Facility name..." required>
                  <label for="edit_description">Rooms Description</label>
                  <textarea id="edit_description" name="description" placeholder="Add description..." required></textarea>  
                  <label for="image">Add Icon</label>
                  <input type ="file" name="image" required />
    
                            
                                    <button type="submit" class="submit-btn">Submit</button>
                                </form>`;


  $("#getContentFormRooms").append(str);
};




$(document).ready(function () {
  getCategoryForm();
});

const getCategoryForm = () => {
  $.ajax({
    url: url + "getCategoryForm",
    type: "post",
    dataType: "json",
  })
    // if success

    .done(function (data) {
      let AboutFacilitiesContent = data.payload;
      console.log(data.remarks);


      let str = ``;

      AboutFacilitiesContent.forEach((content) => {
        str += `    
   
        `;
      });
      str += ``;

      $("#getCategoryForm").append(str);

      console.log(data);
    })
    // if failed
    .fail(function (data) {
      console.error("not okay");
    });
};
