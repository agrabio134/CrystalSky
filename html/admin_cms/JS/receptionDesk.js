let url = "http://localhost/CrystalSky/html/admin_cms/api/";

$(document).ready(function () {
  getAllReceptionFacilities();
});

const getAllReceptionFacilities = () => {
  $.ajax({
    url: url + "getreceptionFacilities",
    type: "post",
    dataType: "json",
  })

    // if success

    .done(function (data) {
      let getreceptionFacilities = data.payload;
      // accessing all items in the payload
      //   console.log(data.remarks);

      // $("#ArchivedGallery").empty();
      console.log(data);

      let str = `
      <style>
      <style>
  .tableMainCont{
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.tableCont {
    border: 1px solid #dfdede;
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0), 0 2px 5px 0 rgba(0, 0, 0, 0.10);
    width: 99.9%;
}

table {
    font-family: 'montserrat-medium';
    border-collapse: collapse;
    width: 100%;
    color: #424857;
  }
  
  td, th {
    padding: 8px;
    text-align: center !important;
  }


  .thRight {
    border-radius: 0 15px 0 0;
  }

  td {
    font-size: 14px;
    padding-top: 15px !important;
    padding-bottom: 15px !important;
  }

  th {
    text-transform: uppercase;
    font-family: 'montserrat-bold';
    font-size: 17px;
    padding: 20px !important;
    background: #F1F1F1;
  }
  .defBtn {
  padding: 7px 10px;
  border: none;
  border-radius: 3px;
  font-family: 'montserrat-medium';
  color: white;
}
.editBtn {
  background-color: #4BB1F7;
  text-decoration: none;
}
.deletebtn{
  background-color: #FF5D5D;
  text-decoration: none;
}
.category_content_name{
  text-align: justify !important;
}
.category_content_description{
  text-align: justify !important;
  width: 40%;
}
.category_buttons_action{
  display: flex;
  width: 100%;
  flex-direction: row;
  gap: 3px;
}

      </style>
      
      <table>
      <thead>
      <tr>
      <th>ID</th>
      <th>Media</th>
      <th>Name</th>
      <th>Description</th>
      <th>Price</th>
      <th class="">Action</th>
      </tr>
      <thead>
      <tbody>`;

      getreceptionFacilities.map((content) => {
        str += ` <tr>
        <td>${content.id}</td>
        
        <td> <img src="/assets/SUBSYSTEM_PHOTOS/CMS/${content.image}" alt="${content.image}" width="100" height="100"></td>

        <td class="category_content_name">${content.name}</td>
        <td>${content.description}</td>
        <td>${content.price}</td>
        <td class="category_buttons_action">
        <a href="admin_cms_edit_reception.html?id=${content.id}" data-id="${content.id}" class="edit-link defBtn editBtn" >Edit</a>
        <a href="#" data-id="${content.id}" class="delete-link defBtn deletebtn">Delete</a>
        </td>
        </tr>
       
   
        `;
      });
      str += `
      <tbody>
      </table>`;

      $("#getreceptionFacilities").append(str);

      console.log(data);
    })
    // if failed
    .fail(function (data) {
      console.error("not working");
    });
};

$(document).ready(function () {
  getReceptionForm();
});

const getReceptionForm = () => {
  let str = `

      <style>
      .preview-img-container{
        display: flex;
        flex-wrap: wrap;
  
      }

      .preview-img-container img {
        width: 200px;
        height: auto;
        object-fit: contain;
      }
      .create_category_images_container{
        display: flex;
        flex-direction: column;
        justify-content: start;
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
        //  border: 1px solid black;
        font-family: montserrat-medium;
        cursor: pointer;
        border-radius: 4px;
      }
      input[type=file]{
        font-family: montserrat-medium;
        font-size: 15px;
         color: #424857;
      }
      .capacity_container{
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
        width: 40%;
        height: 15px;
        border: 1px solid #dad9d9;
        border-radius: 4px;
        resize: vertical;
        margin-left: 10px;
      }
      </style>

      <form class="form_arc" id="addReception"  method="post" enctype="multipart/form-data">
      <div class="n_p_c">
        <div class="label_category_name">
          <label class="cat_lab_name" for="name">Name:</label>
          <input class="input_name_category" type="text" id="name" name="name" placeholder="Category name.." required>
        </div>
        <div class="price_category">
          <label class="price_category_label" for=price>Price: </label>
          <input class="input_type_category" type="number" name="price" min="0" required>
        </div>
      
      </div>

     

      <div class="category_description_label">
            <div class="category_description">      
          <label class="desc_lab" for="description">Description:</label>
          </div>

            <div class="div_category">
            <textarea class="description_text_label_category" id="description" name="description" placeholder="Category description.." required> </textarea>
              
            </div>
      </div>

      <div class="create_category_images_container">
      <input class="category_images_conts" type="file"   accept="image/jpeg,image/png" onchange="previewImages(event)"  id="image" name="media">
      <div id="preview-container" class="preview-img-container"></div>
      </div>


      <div class="category_submit">
      <input class="submit_category_button" type="submit" value="SUBMIT">
      </div>
      </form>`;

  $("#getReceptionForm").append(str);
  $("#addReception").submit(function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    console.log(formData);

    // Confirm form submission
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to create this reception facility?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          url: url + "addReceptionFacility",
          type: "post",
          data: formData,
          contentType: false,
          processData: false,
        })
          .done(function (data) {
            console.log(data);
            Swal.fire({
              icon: "success",
              title: "Successfully Created Reception Facility",
              showConfirmButton: true,
                
            }).then((result) => { 

              if (result.isConfirmed) {

                location.reload();
              }
            }

            );


          })
          .fail(function (data) {
            console.log(data);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
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
    url: url + "getRoomReceptionById",
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
          <form  id="editForm" method="post" enctype="multipart/form-data">
            <div class="edit_cont">
              <div class="name_edit">
                <label class="edit_name_label" for="name">Name:</label>
                <input class="input_edit_name" type="text" id="name" name="name" placeholder="Facility name.." value="${content.name}">
              </div>

              <div class="price_div">
                <label class="label_price_edit" for=price>Price: </label>
                <input class="input_number_edit_cat" type="number" name="price"  min="0" value="${content.price}">
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
            <input class="category_input_edit_images" type="file"   id="image" name="image"  accept="image/jpeg,image/png" onchange="previewImages(event)" >
            <div id="preview-container" class="preview-img-container"></div>
            </div>



            <input type="hidden" id="id" name="id" value="${content.id}">
            
            <div class="submit_edit_categ">
              <input class="input_submit_edit_categ" type="submit" value="SUBMIT">
            </div>
      

            
          </form>
        `;
      });
      $("#getCategoryEditForm").append(str);

      // Add event listener to form submit event
      $("#editForm").on("submit", function (e) {
        e.preventDefault(); // Prevent default form submission behavior

        Swal.fire({
          title: "Are you sure?",
          text: "Do you want to update the facility?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.isConfirmed) {
            // Get form data
            const formData = new FormData(this);

            // Send form data to server using Ajax
            $.ajax({
              url: url + "updateReceptionFacility",
              type: "post",
              dataType: "json",
              data: formData,
              processData: false,
              contentType: false,
            })
              .done(function (data) {
                console.log(data);
                Swal.fire({
                  icon: "success",
                  title: "Facility updated successfully",
                  showConfirmButton: true,
                  // timer: 1500,
                }).then((result) => {
                  window.location.href = "admin_cms_reception_desk.html";
                });
              })
              .fail(function (data) {
                console.error("not okay");
                console.log(data);
              });
          }
        });
      });
    })
    .fail(function (data) {
      console.error("not okay");
    });
};

// update

$(document).on("click", ".delete-link", function () {
  let id = $(this).data("id");

  // Confirm delete action
  Swal.fire({
    title: "Are you sure?",
    text: "Do you want to delete this facility?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      // AJAX call to delete category
      $.ajax({
        url: url + "deleteReceptionById",
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
            showConfirmButton: false,
            timer: 1500,
          });

          setTimeout(function () {
            location.reload();
          }, 1800);
        })
        .fail(function (data) {
          console.log(data);
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Category has been deleted.",
            showConfirmButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
              location.reload();
            }
          });
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
