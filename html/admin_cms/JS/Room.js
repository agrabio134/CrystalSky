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
      .form_container{
        display: flex;
         align-items: center;
         width: 100%;
         min-height: 100px;
        //  border: 1px solid green;
        flex-direction: column;
      }
      
      .rooms_list{
        display: flex;
        width: 100%;
        height: 40px;
        // border:1px solid blue;
        margin-bottom: 15px;
      }
      .room_number{
        // border: 1px solid red;
        display:flex;
        height: 40px;
        width: 33.33%;
        // gap: -20px;
        align-items: center;
        justify-content: center;
      }
      .room_number p{
        font-size: 20px;
        font-family: montserrat-bold;
        letter-spacing: 1px;
        margin-left: 30px;
      }
      .room_dropdown_number{
        margin-left: 15px;
        width: 100px;
        height: 80%;
        padding-left:15px;
        background-color: white;
        border-radius:4px;
        border: 1px solid #dad9d9;
        box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0), 0 2px 5px 0 rgba(0, 0, 0, 0.15);
        font-family: montserrat-medium;
      }
      .room_inside{
        font-size: 15px;
        font-family: montserrat-medium;
      }
      .room_category{
        display: flex;
        // border:1px solid purple;
        width: 33.33%;
        align-items: center;
        justify-content: center;
      }
      .room_category p{
        font-size: 20px;
        font-family: montserrat-bold;
        letter-spacing: 1px;
      }
      .room_dropdown{
        display: flex;
        width: 170px;
        margin-left: 15px;
        height: 80%;
        padding-left:15px;
        background-color: white;
        border-radius:4px;
        border: 1px solid #dad9d9;
        box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0), 0 2px 5px 0 rgba(0, 0, 0, 0.15);
        font-family: montserrat-medium;
      }
      .category_inside{
        font-size: 15px;
        font-family: montserrat-medium;
        letter-spacing: 1px;
      }
      .room_status{
        display: flex;
        width:33.33%;
        justify-content: center;
        align-items: center;
        // border:1px solid green;
      }
      .room_status p{
        font-size: 20px;
        font-family: montserrat-bold;
        letter-spacing: 1px;
      }
      .status_dropdown{
        display: flex;
        width: 170px;
        margin-left: 15px;
        height: 80%;
        padding-left:15px;
        background-color: white;
        border-radius:4px;
        border: 1px solid #dad9d9;
        box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0), 0 2px 5px 0 rgba(0, 0, 0, 0.15);
        font-family: montserrat-medium;
      }
      .status_inside{
        font-size: 15px;
        font-family: montserrat-medium;
        letter-spacing: 1px;
      }
      .room_price{
        display: flex;
        flex-direction: row;
        align-items: center;
       gap:20px;
        width: 100%;
        // border: 1px solid green;
        height: 50px;
        margin-bottom:15px;
      }
      .room_price_title{
        //  border:1px solid black; 
        align-items: center;
        justify-content: center;
        display: flex;
        height: 40px;
        margin-left:40px;
      }
      .room_price_title p{
        font-family: montserrat-bold;
        font-size: 20px;
      }
      .price_container{
          width: 100%;
          height: 15px;
          border: 1px solid #dad9d9;
          border-radius: 4px;
          box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0), 0 2px 5px 0 rgba(0, 0, 0, 0.15);
      }
      input[type=number]{
        font-family: montserrat-medium;
        padding:10px
      }
      .room_description_container{
        display: flex;
        flex-direction:column;
        width: 100%;
        height: 100%;
      //  border: 1px solid yellow;
         margin-bottom:10px;
      }
      .room_title_text{
        margin-bottom:15px;
        //  border:1px solid green;
        margin-left:98px;
      }
      .room_title_text p{
        font-size: 20px;
        font-family: montserrat-bold;
        letter-spacing: 1px;
      }
      .room_container{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 92%;
        margin-left:45px;
        // border:1px solid purple;
      }
      input[type=text]{
        padding:10px;
         border: 3px solid black;
        border: 1px solid #dad9d9;
         width: 100%;
        height: 60px;
        background-color: white;
        border-radius: 4px;
        box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0), 0 2px 5px 0 rgba(0, 0, 0, 0.15);
      }


      
      .room_images_button{
        display: flex;
        align-items: center;
        // border:1px solid blue;
        width: 100%;
        height: 40px;
      }
      .room_input_image{
        display: flex;
        margin-left:60px;
        //  border:1px solid red;
      }
      input[type=file]{
        font-family: montserrat-medium;
        font-size: 15px;
      }
      .room_input_image::-webkit-file-upload-button{
        width: 120px;
        height: 30px;
        background-color:white;
        border: 2px solid #dad9d9;
        box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0), 0 2px 5px 0 rgba(0, 0, 0, 0.15);
        // border: 1px solid black;
        font-family: montserrat-medium;
        cursor: pointer;
        font-size: 15x;
        border-radius: 4px;
      }

      .submit_button_container{
          display: flex;
        align-items: center;
        justify-content: center;
        width: 33.33%;
        height: 45px;
          //  border: 1px solid red;
      }
      .submit_inside{
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #2FA83F;
        height: 80%;
        border: none;
        width: 33.33%;
        cursor: pointer;
        border-radius: 4px;
      }
      input[type="submit"]{
        font-family: montserrat-medium;
        font-size: 15px;
        color: white;
      }
      .room_title_container{
        display: flex; 
        align-items: center;
        border: 1px solid red;
        width: 100%;
        margin-top:30px;
        margin-bottom:30px;
        height: 40px;
      }
      .room_title_container p{
        //  border: 1px solid blue;
        font-size: 20px;
        font-family: montserrat-bold;
        letter-spacing: 1px;
        margin-left: 30px;
        color: #424857;
      }
      
      .category_title{
        display:flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        // border: 1px solid purple;
        height:45px;
      }
      .category_title a{
        display: flex;
        align-items: center;
        justify-content: center;
        height:80%;
        text-decoration: none;
        color: white;
        width: 100%;
        background-color:#4BB1F7;
        font-family: montserrat-medium;
        font-size: 15px;
        border-radius: 4px;
      }
      .create_submit{
        display:flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        // border: 1px solid purple;
        height:45px;
      }
      .create_submit a{
        display: flex;
        align-items: center;
        justify-content: center;
        height:80%;
        text-decoration: none;
        color: white;
        width: 100%;
        background-color:#424857;
        font-family: montserrat-medium;
        font-size: 15px;
        border-radius: 4px;
      }
      .amenities_submit{
        display:flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        // border: 1px solid purple;
        height:45px;
      }
      .amenities_submit a{
        display: flex;
        align-items: center;
        justify-content: center;
        height:80%;
        text-decoration: none;
        color: white;
        width: 100%;
        background-color:#BB9441;
        font-family: montserrat-medium;
        font-size: 15px;
        border-radius: 4px;
      }
      .submit_divs{
        display: flex;
        gap:10px;
        align-items: center;
        flex-direction: row;
        // border: 1px solid blue;
        width: 100%;
        min-height: 100px;
      }
      
      .category_title_container{
        background-color: white;
        padding: 10px;
        width: 33.33%;
        border-radius: 8px;
        box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0), 0 2px 5px 0 rgba(0, 0, 0, 0.15);
        border: 1px solid #dad9d9;
        margin-top: 10px;
        /* margin: 10px; */
        /* margin-bottom: 10px; */
      }
      .create_submit_container{
        background-color: white;
        padding: 10px;
        width: 33.33%;
        border-radius: 8px;
        box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0), 0 2px 5px 0 rgba(0, 0, 0, 0.15);
        border: 1px solid #dad9d9;
        margin-top: 10px;
        /* margin: 10px; */
        /* margin-bottom: 10px; */
      }
      .amenities_submit_container{
        background-color: white;
        padding: 10px;
        width: 33.33%;
        border-radius: 8px;
        box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0), 0 2px 5px 0 rgba(0, 0, 0, 0.15);
        border: 1px solid #dad9d9;
        margin-top: 10px;
        /* margin: 10px; */
        /* margin-bottom: 10px; */
      }
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
