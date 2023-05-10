let url = "http://localhost/CrystalSky/html/admin_ims/restApi/";

$(document).ready(function () {
  
  // getCommodities();

  getAllActiveIngredients();
  getAllActiveCommodities();
  getAllInactive();
  
  warningBackgrounds();
  
  // $(".deleteProduct").click(function () {
  //   var product = document.getElementsByClassName("deleteProduct");

  //   deleteProduct(product);
    
  // });






$(document).on("click", ".archiveSubmitBtn", function () {
  let id = $(this).attr("data-id");
  

      $.ajax({
          url: url + "archiveProduct",
          method: "POST",
          data: JSON.stringify({
              is_archived: 1,
              item_id: id
          }),
          dataType: 'json',
          
          success: function (response) {
            getAllActiveIngredients();
            getAllActiveCommodities();
            getAllInactive();

          }

          
          
      })
      .fail(function() {
        console.log('mali');
      });

});

$(document).on("click", ".archiveModalBtn", function () {
  let id = $(this).attr("data-id");
  // Get the modals

  var btn = document.getElementById("archiveModalBtn" + id)
  console.log(btn)
  var modal = document.getElementById("archiveModal" + id);
  console.log(modal)

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("archiveModalClose" + id)[0];
  console.log(span)
  // When the user clicks the button, open the modal 
  btn.onclick = function () {
    modal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
});

$(document).on("click", ".myBtn", function () {
  let id = $(this).attr("data-id");
  // Get the modal

  var btn = document.getElementById("MyBtn"+id)
  console.log(btn)
  var modal = document.getElementById("myModal"+id);
  console.log(modal)
  
  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close"+id)[0];
  console.log(span)
  // When the user clicks the button, open the modal 
  btn.onclick = function() {
    modal.style.display = "block";
  }
  
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
});


$(document).on("click", ".archiveSubmitBtn", function () {
  let id = $(this).attr("data-id");

  $.ajax({
    url: url + "archiveProduct",
    method: "POST",
    data: JSON.stringify({
      is_archived: 1,
      item_id: id
    }),
    dataType: 'json',

    success: function (response) {
      getPending();
      getForReview();
      getInProgress();
      getCompleted();

    }
  })
    .fail(function () {
      console.log('mali');
    });
});

$(document).on("click", ".restoreItemBtn", function () {
  let id = $(this).attr("data-id");

  if (confirm("Do you want to restore this Item?")) {
      $.ajax({
          url: url + "restoreProduct",
          method: "POST",
          data: JSON.stringify({
              is_archived: 0,
              item_id: id
          }),
          dataType: 'json',
          success: function (response) {
            getAllActiveIngredients();
            getAllActiveCommodities();
            getAllInactive();
          }
      })
      .fail(function() {
        console.log('mali');
      });
  }
});
});

function warningBackgrounds(){
var elements = document.getElementsByClassName('prodQuantity');

for (var i = 0; i < elements.length; i++) {
var value = elements[i].innerText || elements[i].textContent;

if (value > parseInt('75')) {
  elements[i].style.backgroundColor = 'none';
} else if (value < parseInt('50')) {
  elements[i].style.backgroundColor = '#FFB4B4';
  elements[i].style.color = 'black';
} else if (value <= parseInt('75')) {
  elements[i].style.backgroundColor = '#FFDEB4';
  elements[i].style.color = 'black';
} 
}
}

  function addProduct() {
    // get input value from id's
    
    const Name = $("#formname").val();
    const Category = $("#formcategorydrop").val();
    const Quantity = $("#formquantity").val();
    const Price = $("#formprice").val();
    const Unit = $("#formunit").val();
    const Path = "/assets/SUBSYSTEM_PHOTOS/IMS/";
    console.log(Path);
    const Image = Path + document.getElementById("formimage").files[0].name;


    // if empty..
    if (Name===""){
        alert("Invalid!")
    }
    else if (Category===""){
        alert("Invalid!")
    }
    else if (Quantity===""){
        alert("Invalid!")
    }
    else if (Price===""){
        alert("Invalid!")
    }
    else if (Unit===""){
      alert("Invalid!")
  }

    else{
        // object variable
        item = {}
        
        // inputs will be turned into object
        item ["name"] = Name;
        item ["category"] = Category;
        item ["qty"] = Quantity;
        item ["price"] = Price;
        item ["unit"] = Unit;
        item ["picture"] = Image;
        
        // stringify the object
        item = JSON.stringify(item);
        console.log(item)
        // ajax
        $.ajax({
            // var url + course
            url: url+'addProduct', 
            type: 'post',
            dataType: 'json',
            // data as item
            data:  item 
        })
        // if success
        .done( function( data ) {
            //alert course name that was added
            alert('Record succesfully added');
            // remove all rows

            // call get course

            location.reload();
        })
        // if failed
        .fail( function( data ) {
        });
    }
  }

  function updateProduct(ID) {
    // get input value from id's
    const ItemID =$("#formid"+ID).val();
    const Name = $("#formname"+ID).val();
    const Category = $("#formcategorydrop"+ID).val();
    const Quantity = $("#formquantity"+ID).val();
    const Price = $("#formprice"+ID).val();
    const Unit = $("#formunit"+ID).val();
    const Path = "/assets/SUBSYSTEM_PHOTOS/IMS/";
    console.log(Path);
    const Image = Path + document.getElementById("formimage"+ID).files[0].name;


    // if empty..
    if (ItemID===""){
      alert("Invalid!")
    }
    else if (Name===""){
        alert("Invalid!")
    }
    else if (Category===""){
        alert("Invalid!")
    }
    else if (Quantity===""){
        alert("Invalid!")
    }
    else if (Price===""){
        alert("Invalid!")
    }
    else if (Unit===""){
      alert("Invalid!")
  }

    else{
        // object variable
        item = {}
        
        // inputs will be turned into object
        item ["id"] = ItemID;
        item ["name"] = Name;
        item ["category"] = Category;
        item ["qty"] = Quantity;
        item ["price"] = Price;
        item ["unit"] = Unit;
        item ["picture"] = Image;
        
        // stringify the object
        item = JSON.stringify(item);
        console.log(item)
        // ajax
        $.ajax({
            // var url + course
            url: url+'updateProduct', 
            type: 'post',
            dataType: 'json',
            // data as item
            data:  item 
        })
        // if success
        .done( function( data ) {
            //alert course name that was added
            // alert('Record succesfully updated');
            Swal.fire(
              'Updated!',
              '',
              'success'
            )
            // remove all rows
            $("act tbody tr").remove(); 
            // call get course
getAllActiveCommodities();
getAllActiveIngredients();
getAllInactive();
            // location.reload();
        })
        // if failed
        .fail( function( data ) {
          alert('something is wrong')
        });
    }
  }

function getAllActiveCommodities() {
  console.log("hellopo");
    $.ajax({
      url: url + "getAllActiveCommodities",
      method: "GET",
      dataType: "json",
      success: function (response) {

          let innerHTML = `        <table style="vertical-align: middle;"id="ActiveCommodities">
          <thead>
            <tr>
              <th class="thLeft"> ID</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Unit</th>
              <th>Picture</th>
              <th class="thRight">Actions</th>
            </tr>
          </thead>
          <tbody>`;
          for (a in response.payload) {

              innerHTML += `<tr>
                              <td>${response.payload[a].id}</td>
                              <td>${response.payload[a].name}</td>
                              <td class="prodQuantity">${response.payload[a].qty}</td>
                              <td>${response.payload[a].price}</td>
                              <td>${response.payload[a].unit}</td>
                              <td><img src="${response.payload[a].picture}" alt="No Picture Found" width="70" height="70"></td>
                              <td style="width:20%;">
                              <button data-id="${response.payload[a].id}" class="updateItemBtn myBtn" id="MyBtn${response.payload[a].id}">Update</button>
                              <button data-id="${response.payload[a].id}" class="archiveItemBtn archiveModalBtn" id="archiveModalBtn${response.payload[a].id}">Archive</button> 
                              </td>
                          </tr>

                          <div id="myModal${response.payload[a].id}" class="modal">



                          <div class="modal-update">
                            <span class="close${response.payload[a].id} close">&times;</span>
                            <div class="container">
                              <h1 class="request-form">Update Product</h1>
                              <div class="content">
                                <form action="#">

                                  <div class="user-details-add">
                                  <div class="input-box">
                                    <span class="details">ID</span>
                                    <input id="formid${response.payload[a].id}" type="text" READONLY placeholder="Enter Product Name" value="${response.payload[a].id}" required>
                                  </div>
                                </div>
              

                                    <div class="user-details-add">
                                      <div class="input-box">
                                        <span class="details">Name</span>
                                        <input id="formname${response.payload[a].id}" type="text" placeholder="Enter Product Name" value="${response.payload[a].name}"required>
                                      </div>
                                    </div>
                  
                                    <div class="user-details-add">
                                    <div class="input-box">
                                    <span class="details">Category</span>
        
                                        <select name="category" id="formcategorydrop${response.payload[a].id}">
                                          <option value="Commodity">Commodity</option>
                                          <option value="Ingredient">Ingredient</option>
                                        </select>
                                    </div>
                                    </div>
                  
                                    <div class="user-details-add">
                                      <div class="input-box">
                                        <span class="details">Quantity</span>
                                        <input id="formquantity${response.payload[a].id}" type="number" placeholder="Enter Product Quantity" value="${response.payload[a].qty}"required>
                                      </div>
                                    </div>
                  
                                    <div class="user-details-add">
                                      <div class="input-box">
                                        <span class="details">Price</span>
                                        <input id="formprice${response.payload[a].id}" type="number" placeholder="Enter Product Price" value="${response.payload[a].price}"required>
                                      </div>
                                    </div>
                  
                                    <div class="user-details-add">
                                      <div class="input-box">
                                        <span class="details">Unit</span>
                                        <input id="formunit${response.payload[a].id}" type="text" placeholder="Enter Product Unit" value="${response.payload[a].unit}"required>
                                      </div>
                                    </div>

                                    <div class="user-details-add">
                                    <div class="input-box">
                                      <span class="details" id="formpath">Image</span>
                                      <input id="formimage${response.payload[a].id}" type="file" placeholder="Enter Product Unit" value="${response.payload[a].picture}"required>
                                    </div>
                                  </div>

                                    <div onclick="updateProduct(${response.payload[a].id})" class="updatebutton">
                                      <input class="formsubmit" type="submit" value="Submit">
                                    </div>
                  
                                </div>
                              
                                    </form>
                                  </div>
                                </div>
                              </div>
                        </div>`;

                        innerHTML += `
                        <div id="archiveModal${response.payload[a].id}" class="modal">
                        
                        <div class="modal-alert">
                
                        <!-- Modal content -->
                                
                                <div class="modal-content">
                                    <div class="modalHeader">
                                        
                                        <h1>RECEIVE</h1>
                
                                    </div>
                                    <div class="modalBody">
                                        <h1>Mark this item as received?</h1>
                                    </div>
                                    <div class="modalFooter">
                                        <div class="modalButtonCont">
                                        <button class="ordersNoBtn archiveModalClose${response.payload[a].id}">No</button>
                                        <button class="ordersYesBtn archiveSubmitBtn" data-id="${response.payload[a].id}">Yes</button>
                                        
                                        </div>
                                    </div>
                                </div>
                
                          </div>
                
                      </div>
                        `;
                          
          }


          innerHTML += `<tbody></table>`;

          $("#tableofcommodities").html(innerHTML);

          var table = $("#ActiveCommodities").DataTable({
            language: {
              paginate: {
                next: '<i class="fa fa-chevron-right" aria-hidden="true">',
                previous: '<i class="fa fa-chevron-left" aria-hidden="true">',
              },
            },
            dom: "rtip",
          });
  
          $("#searchInput").keyup(function () {
            table.search($("#searchInput").val()).draw();
          });
          

          warningBackgrounds();
      },
      error: function (err) {

          console.error("not okay");
          let str = `
          <div style="text-align: center; margin-left:50px;"><p  style=" text-align: center;">no records found</p></div>
                  `;
                  $(".ordertable1").html(str);  

      }
      
  })
  
}

function getAllActiveIngredients() {
  console.log("hellopo");
    $.ajax({
      url: url + "getAllActiveIngredients",
      method: "GET",
      dataType: "json",
      success: function (response) {

          let innerHTML = `        <table style="vertical-align: middle;" id="ActiveIngredients">
          <thead>
            <tr>
              <th class="thLeft"> ID</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Unit</th>
              <th>Picture</th>
              <th class="thRight">Actions</th>
            </tr>
          </thead>
          <tbody>`;
          for (a in response.payload) {

              innerHTML += `<tr>
                              <td>${response.payload[a].id}</td>
                              <td>${response.payload[a].name}</td>
                              <td class="prodQuantity">${response.payload[a].qty}</td>
                              <td>${response.payload[a].price}</td>
                              <td>${response.payload[a].unit}</td>
                              <td><img src="${response.payload[a].picture}" alt="No Picture Found" width="70" height="70"></td>
                              <td>
                                  <button data-id="${response.payload[a].id}" class="updateItemBtn myBtn" id="MyBtn${response.payload[a].id}">Update</button>
                                  <button data-id="${response.payload[a].id}" class="archiveItemBtn archiveModalBtn" id="archiveModalBtn${response.payload[a].id}">Archive</button>
                              </td>
                          </tr>

                          <div id="myModal${response.payload[a].id}" class="modal">



                          <div class="modal-update">
                            <span class="close${response.payload[a].id} close">&times;</span>
                            <div class="container">
                              <h1 class="request-form">Update Product</h1>
                              <div class="content">
                                <form action="#">

                                  <div class="user-details-add">
                                  <div class="input-box">
                                    <span class="details">ID</span>
                                    <input id="formid${response.payload[a].id}" type="text" READONLY placeholder="Enter Product Name" value="${response.payload[a].id}" required>
                                  </div>
                                </div>
              

                                    <div class="user-details-add">
                                      <div class="input-box">
                                        <span class="details">Name</span>
                                        <input id="formname${response.payload[a].id}" type="text" placeholder="Enter Product Name" value="${response.payload[a].name}"required>
                                      </div>
                                    </div>
                  
                                    <div class="user-details-add">
                                    <div class="input-box">
                                    <span class="details">Category</span>
        
                                        <select name="category" id="formcategorydrop${response.payload[a].id}">
                                          <option value="Ingredient">Ingredient</option>
                                          <option value="Commodity">Commodity</option>
                                        </select>
                                    </div>
                                    </div>
                  
                                    <div class="user-details-add">
                                      <div class="input-box">
                                        <span class="details">Quantity</span>
                                        <input id="formquantity${response.payload[a].id}" type="number" placeholder="Enter Product Quantity" value="${response.payload[a].qty}"required>
                                      </div>
                                    </div>
                  
                                    <div class="user-details-add">
                                      <div class="input-box">
                                        <span class="details">Price</span>
                                        <input id="formprice${response.payload[a].id}" type="number" placeholder="Enter Product Price" value="${response.payload[a].price}"required>
                                      </div>
                                    </div>
                  
                                    <div class="user-details-add">
                                      <div class="input-box">
                                        <span class="details">Unit</span>
                                        <input id="formunit${response.payload[a].id}" type="text" placeholder="Enter Product Unit" value="${response.payload[a].unit}"required>
                                      </div>
                                    </div>

                                    <div class="user-details-add">
                                    <div class="input-box">
                                      <span class="details" id="formpath">Image</span>
                                      <input id="formimage${response.payload[a].id}" type="file" placeholder="Enter Product Unit" value="${response.payload[a].picture}"required>
                                    </div>
                                  </div>

                                    <div onclick="updateProduct(${response.payload[a].id})" class="updatebutton">
                                      <input class="formsubmit" type="submit" value="Submit">
                                    </div>
                  
                                </div>
                              
                                    </form>
                                  </div>
                                </div>
                              </div>
                        </div>`;

                        innerHTML += `
                        <div id="archiveModal${response.payload[a].id}" class="modal">
                        
                        <div class="modal-alert">
                
                        <!-- Modal content -->
                                
                                <div class="modal-content">
                                    <div class="modalHeader">
                                        
                                        <h1>RECEIVE</h1>
                
                                    </div>
                                    <div class="modalBody">
                                        <h1>Mark this item as received?</h1>
                                    </div>
                                    <div class="modalFooter">
                                        <div class="modalButtonCont">
                                        <button class="ordersNoBtn archiveModalClose${response.payload[a].id}">No</button>
                                        <button class="ordersYesBtn archiveSubmitBtn" data-id="${response.payload[a].id}">Yes</button>
                                        
                                        </div>
                                    </div>
                                </div>
                
                          </div>
                
                      </div>
                        `;    
          }


          innerHTML += `<tbody></table>`;

          $("#tableofingredients").html(innerHTML);
          var table = $("#ActiveIngredients").DataTable({
            language: {
              paginate: {
                next: '<i class="fa fa-chevron-right" aria-hidden="true">',
                previous: '<i class="fa fa-chevron-left" aria-hidden="true">',
              },
            },
            dom: "rtip",
          });
  
          $("#searchInput").keyup(function () {
            table.search($("#searchInput").val()).draw();
          });
          
          
      },
      error: function (err) {

        console.error("not okay");
        let str = `
        <div style="text-align: center; margin-left:50px;"><p  style=" text-align: center;">no records found</p></div>
                `;
                $("#tableofarchive").html(str);  

    }
  })
  
}

function getAllInactive() {
  $.ajax({
      url: url + "getAllInactive",
      method: "GET",
      dataType: "json",
      success: function (response) {
          console.log(response);
          let innerHTML = `        <table style="vertical-align: middle; id="InactiveProducts">
          <thead>
            <tr>
              <th class="thLeft"> ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Unit</th>
              <th>Category</th>
              <th class="thRight">Actions</th>
            </tr>
          </thead>
          <tbody>`;
          for (a in response.payload) {

              innerHTML += `<tr>
                              <td>${response.payload[a].id}</td>
                              <td>${response.payload[a].name}</td>
                              <td>${response.payload[a].price}</td>
                              <td>${response.payload[a].unit}</td>
                              <td>${response.payload[a].category}</td>
                              <td>
                                  <button data-id="${response.payload[a].id}" class="restoreItemBtn">Restore</button>
                              </td>
                          </tr>`;

                          
          }


          innerHTML += `<tbody></table>`;

          $("#tableofarchive").html(innerHTML);

          var table = $("#InactiveProducts").DataTable({
            language: {
              paginate: {
                next: '<i class="fa fa-chevron-right" aria-hidden="true">',
                previous: '<i class="fa fa-chevron-left" aria-hidden="true">',
              },
            },
            dom: "rtip",
          });
  
          $("#searchInput").keyup(function () {
            table.search($("#searchInput").val()).draw();
          });
          
      },
      
      error: function (err) {

        console.error("not okay");
        let str = `
        <div style="text-align: center; margin-left:50px;"><p  style=" text-align: center;">no records found</p></div>
                `;
                $("#tableofarchive").html(str);  

    }
  })

  
}




  function getCommodities() {
    $.ajax({
      url: url + "getCommodities",
      type: "post",
      dataType: "json",
    })
      // if success
      .done(function (data) {
        let products_data = data.payload;
        // accessing all items in the payload
        let str = `
        <table id="commoditiesTable">
          <thead>
            <tr>
              <th class="thLeft"> ID</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Unit</th>
              <th class="thRight">Actions</th>
            </tr>
          </thead>
          <tbody>
        `;

        products_data.forEach((product) => {
          str += `
        <tr>
              <td>${product.id}    </td>
              <td>${product.name}</td>
              <td class="prodQuantity">${product.qty}</td>
              <td>${product.price}</td>
              <td>${product.unit}</td>
              <td>
              <button type="button" class="defBtn keepBtn">EDIT</button>
              <button type="button" class="defBtn viewBtn">DELETE</button>  
            </td>
        </tr>
        `;
        });
        str += `
      </tbody>
    </table>`;

        $(".table1").append(str);

        var table = $("#commoditiesTable").DataTable({
          language: {
            paginate: {
              next: '<i class="fa fa-chevron-right" aria-hidden="true">',
              previous: '<i class="fa fa-chevron-left" aria-hidden="true">',
            },
          },
          dom: "rtip",
        });

        $("#searchInput").keyup(function () {
          table.search($("#searchInput").val()).draw();
        });
      })
      // if failed
      .fail(function (data) {
        console.error("not okay");
      });

      
  }



function addDepartment(department) {
  let department_name = department;
  item = {};
  // inputs will be turned into objects
  item["department_name"] = department_name;
  // stringify the object
  item = JSON.stringify(item);

  console.log(item);

  $.ajax({
    url: url + "addDepartment",
    type: "post",
    dataType: "json",
    data: item,
  })
    // if success
    .done(function (data) {
      // set id as local storage
      getDepartments();
    })
    // if failed
    .fail(function (data) {
      console.log("wala d pwede");
      // console.log("Error add to cart");
    });
}

document.addEventListener("DOMContentLoaded", () => {
  setupTabs();

  var elements = document.getElementsByClassName('prodQuantity');

  for (var i = 0; i < elements.length; i++) {
  var value = elements[i].innerText || elements[i].textContent;
  
  if (value > parseInt('20')) {
    elements[i].style.backgroundColor = 'none';
  } else if (value <= parseInt('30')) {
    elements[i].style.backgroundColor = '#ce4842';
    elements[i].style.color = 'white';
  }
  }

  // Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
}); 

document.addEventListener("click", () => {
  var elements = document.getElementsByClassName('prodQuantity');

  for (var i = 0; i < elements.length; i++) {
  var value = elements[i].innerText || elements[i].textContent;
  
  if (value > parseInt('75')) {
    elements[i].style.backgroundColor = 'none';
  } else if (value < parseInt('50')) {
    elements[i].style.backgroundColor = '#FFB4B4';
    elements[i].style.color = 'black';
  } else if (value <= parseInt('75')) {
    elements[i].style.backgroundColor = '#FFDEB4';
    elements[i].style.color = 'black';
  } 
  }


});