let url = "http://localhost/CrystalSky/html/admin_cms/api/";

$(document).ready(function () {
  getAllRoomCategories();
});

const getAllRoomCategories = () => {
  $.ajax({
    url: url + "getRoomsCateg",
    type: "post",
    dataType: "json",
  })

    // if success

    .done(function (data) {
      let AllRoomCategories = data.payload;
      // accessing all items in the payload
      //   console.log(data.remarks);

      // $("#ArchivedGallery").empty();

      let str = `
      <style>
 

      </style>
      
      <table>
      <thead>
      <tr>
      <th>ID</th>
      <th>Media</th>
      <th>Name</th>
      <th>Price</th>
      <th>Capacity</th>
      <th>Description</th>
      <th class="">Action</th>
      </tr>
      <thead>
      <tbody>`;

      AllRoomCategories.map((content) => {
        str += ` <tr>
        <td>${content.id}</td>
        
        <td id="categ_images_${content.id}" ></td>
        <td class="category_content_name">${content.name}</td>
        <td>${content.price}</td>
        <td>${content.capacity}</td>
        <td class="category_content_description">${content.description}</td>
        <td class="category_buttons_action">
        <a href="admin_cms_edit_category.html?id=${content.id}" data-id="${content.id}" class="edit-link defBtn editBtn" >Edit</a>
        <a href="#" data-id="${content.id}" class="delete-link defBtn deletebtn">Delete</a>
        </td>
        </tr>
       
   
        `;
      });
      str += `
      <tbody>
      </table>`;

      $("#getAllRoomCategories").append(str);

      console.log(data);
    })
    // if failed
    .fail(function (data) {
      console.error("not working");
    });
};

$(document).ready(function () {
  getCategoryForm();
});

const getCategoryForm = () => {
  // NAGLAGAY AKO UNTING STYLE LINE 121
  let str = `

      <style>
      .preview-img-container{
        display: flex;
        // flex-wrap: wrap;
  
      }

      .preview-img-container img {
        width: 200px;
        height: auto;
        margin-top: 10px;
        object-fit: contain;
      }
      .create_category_images_container{
        display: flex;
        flex-direction: column;
        // justify-content: start;
        width: 100%;
        //  border: 1px solid red;
      }
      .category_images_conts::-webkit-file-upload-button{
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
      }
      .capacity_container{
        display: flex;
        align-items: center;
         width: 30%;
      }
      .price_category{
        display: flex;
        align-items: center;
         width: 30%;
      }
      .capacity_label{
        font-family: montserrat-medium;
        font-size: 20px;
        letter-spacing: 1px;
        color: #424857;
      }
      .input_capacity_number{
        font-family: montserrat-medium;
        font-size: 15px;
        letter-spacing: 1px;
        box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0), 0 2px 5px 0 rgba(0, 0, 0, 0.15);
        font-family: heebo;
        width: 70%;
        height: 15px;
        border: 1px solid #dad9d9;
        border-radius: 4px;
        resize: vertical;
        margin-left: 10px;
      }
      .input_price_category{
        font-family: montserrat-medium;
        font-size: 15px;
        letter-spacing: 1px;
        box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0), 0 2px 5px 0 rgba(0, 0, 0, 0.15);
        font-family: heebo;
        width: 70%;
        height: 15px;
        border: 1px solid #dad9d9;
        border-radius: 4px;
        resize: vertical;
        margin-left: 10px;
      }
      </style>

      <form class="form_arc" id="AddCategory"  method="post" enctype="multipart/form-data">
      <div class="n_p_c">
        <div class="label_category_name">
          <label class="cat_lab_name" for="name">Name:</label>
          <input class="input_name_category" type="text" id="name" name="name" placeholder="Category name.." required>
        </div>
        <div class="price_category">
          <label class="price_category_label" for=price>Price: </label>
          <input class="input_price_category" type="number" name="price" min="1"  required>
        </div>
        <div class="capacity_container">
          <label class="capacity_label" for="Capacity">Capacity: </label>
          <input class="input_capacity_number" type="number" name="capacity" min="1" required>
        </div>
      </div>

     

      <div class="category_description_label">
            <div class="category_description">      
          <label class="desc_lab" for="description">Description:</label>
          </div>

            <div class="div_category">
            <textarea class="description_text_label_category" id="description" name="description" placeholder="Category description.." required></textarea>
              
            </div>
      </div>

      <div class="create_category_images_container">
      <input class="category_images_conts" type="file"  multiple accept="image/jpeg,image/png" onchange="previewImages(event)"  id="image" name="media[]" multiple>
      <div id="preview-container" class="preview-img-container"></div>
      </div>


      <div class="category_submit">
      <input class="submit_category_button" type="submit" value="SUBMIT">
      </div>
      </form>`;

  $("#getCategoryForm").append(str);

  $("#AddCategory").submit(function (e) {
    e.preventDefault();
    
    Swal.fire({
      title: "Confirmation",
      text: "Are you sure you want to add the room category?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        var data = $(this).serialize();
        
        $.ajax({
          type: "POST",
          url: url + "addRoomCategory",
          data: data,
          success: function (data) {
            if (data.error) {
              Swal.fire({
                title: "Error!",
                text: "Please fill up all fields",
                icon: "error",
                confirmButtonText: "Ok",
              });
            } else {
              Swal.fire({
                title: "Success!",
                text: "Successfully added a room category!",
                icon: "success",
                confirmButtonText: "Ok",
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              });
            }
          },
          error: function (data) {
            console.log("error");
          },
        });
      }
    });
  });
  

  //   console.log(data);
};

$(document).ready(function () {
  getCategoryEditForm(categoryId);
});

const urlParams = new URLSearchParams(window.location.search);
const categoryId = urlParams.get("id");

const getCategoryEditForm = (categoryId) => {
  console.log(categoryId);

  $.ajax({
    url: url + "getRoomCategoryById",
    type: "post",
    dataType: "json",
    data: {
      id: categoryId,
    },
  })
    .done(function (data) {
      const currentCategory = data.payload;
      let str = "";
      currentCategory.forEach((content) => {
        str = `
          <form id="submit_edit_categ" method="post" class="form_edit_category">
            <div class="edit_cont">
              <div class="name_edit">
                <label class="edit_name_label" for="name">Name:</label>
                <input class="input_edit_name" type="text" id="name" name="category" placeholder="Category name.." value="${content.name}">
              </div>

              <div class="price_div">
                <label class="label_price_edit" for=price>Price: </label>
                <input class="input_number_edit_cat" type="number" name="price" value="${content.price}" min="0">
              </div>
              

              <div class="capacity_div">
                <label class="label_capacity_edit" for="capacity">Capacity: </label>
                <input class="input_capacity_edit_cat" type="number" name="RoomCapacity"   value="${content.capacity}">
              </div>
            </div>
        

            <div class="edit_description">
              <div class="edit_categ_cont">
                <label class="edit_description_label" for="description">Description:</label>
              </div>
              <div class="input_edit_place">
              <input class="input_desc_edit_category" type="text" id="description" name="description" placeholder="Category description.." value="${content.description}">
              </div>
            </div>

            <div class="category_edit_container">
            <!--
            <p>Update image Dipa to gumagana</p>
            <input class="category_input_edit_images" type="file"  multiple accept="image/jpeg,image/png" onchange="previewImages(event)"  id="image" name="media[]" multiple>
            <div id="preview-container" class="preview-img-container">
            
            -->
            </div>
            </div>
      

            <input type="hidden" id="id" name="id" value="${content.id}">
            
            <div class="submit_edit_categ">
              <input class="input_submit_edit_categ" type="submit" value="SUBMIT">
            </div>
          </form>
        `;
      });
      $("#getCategoryEditForm").append(str);

      $("#submit_edit_categ").submit(function (e) {
        e.preventDefault();

        Swal.fire({
          title: "Confirmation",
          text: "Are you sure you want to update the room category?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.isConfirmed) {
            var data = $(this).serialize();

            $.ajax({
              type: "POST",
              url: url + "updateRoomCategory",
              data: data,
              success: function (data) {
                if (data.error) {
                  Swal.fire({
                    title: "Error!",
                    text: "Please fill up all fields",
                    icon: "error",
                    confirmButtonText: "Ok",
                  });
                } else {
                  Swal.fire({
                    title: "Success!",
                    text: "Successfully updated a room category!",
                    icon: "success",
                    confirmButtonText: "Ok",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      window.location.reload();
                    }
                  });
                }
              },
              error: function (data) {
                console.log("error");
              },
            });
          }
        });
      });

      console.log(data);
    })
    .fail(function (data) {
      console.error("not okay");
    });
};

$(document).on("click", ".delete-link", function () {
  let id = $(this).data("id");

  // Confirm delete action
  Swal.fire({
    title: "Confirmation",
    text: "Are you sure you want to delete this category?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      // AJAX call to delete category
      $.ajax({
        url: url + "delete_categoryById",
        type: "post",
        dataType: "json",
        data: {
          id: id,
        },
      })
        .done(function (data) {
          console.log(data);
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Category has been deleted.",
            showConfirmButton: true,
            //if i click ok, it refreshes the page

            timer: 1500,

          }).then((result) => {
            if (result.isConfirmed) {
              event.preventDefault(); // Prevent page refresh
              // Add any additional logic or redirection here
              location.reload();
            }
          });

          // setTimeout(function () {
          //   location.reload();
          // }, 1800);
        })
        .fail(function (data) {
          console.log(data.responseText);
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "An error occurred while deleting the category.",
            showConfirmButton: true,
            timer: 1500,
          });

          // setTimeout(function () {
          //   location.reload();
          // }, 1800);

          console.log("not okay");
          
        });
    }
  });
});


const previewImages = (event) => {
  var files = event.target.files;
  var previewContainer = document.getElementById("preview-container");
  previewContainer.innerHTML = "";

  for (var i = 0; i < files.length; i++) {
    var reader = new FileReader();
    reader.onload = (function (file) {
      return function () {
        var image = new Image();
        image.src = this.result;
        image.width = 200;
        var container = document.createElement("div");
        container.appendChild(image);
        previewContainer.appendChild(container);
      };
    })(files[i]);
    reader.readAsDataURL(files[i]);
  }
};

$(document).ready(function () {
  getRoomsCategImages();
});
const getRoomsCategImages = () => {
  $.ajax({
    url: url + "getRoomsCategImages",
    type: "post",
    dataType: "json",
  })
    .done(function (data) {
      let getRoomsCategImages = data.payload;

      getRoomsCategImages.forEach((content) => {
        const img = $("<img>")
          .attr("src", `/assets/SUBSYSTEM_PHOTOS/CMS/${content.image}`)
          .css("width", "40%");
        $(`#categ_images_${content.category_id}`).append(img);
      });

      console.log(data);
    })
    .fail(function (data) {
      console.error("not okay");
    });
};
