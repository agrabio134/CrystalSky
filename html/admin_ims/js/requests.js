let url = "http://localhost/CrystalSky/html/admin_ims/restApi/";

$(document).ready(function () {
  
  getRequests();
  getSupplierDrop();
  getProductDrop();

  $(document).on("click", ".deleteItemBtn", function () {
    let id = $(this).attr("data-id");
    
    if (confirm("Do you want to delete this request?")) {
        $.ajax({
            url: url + "deleteRequest",
            method: "POST",
            data: JSON.stringify({
                item_id: id
            }),
            dataType: 'json',
            
            success: function (response) {
              getRequests();
  
            }
  
            
            
        })
        .fail(function() {
          console.log('mali');
        });
    }
  });

  


  function getRequests() {
      $.ajax({
        url: url + "getRequests",
        method: "POST",
        dataType: "json",
        success: function (response) {
  
            let innerHTML = `        <table id="requesttable">
            <thead>
              <tr>
                <th class="thLeft">ID</th>
                <th>Supplier</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Date</th>
                <th class="thRight">Actions</th>
              </tr>
            </thead>
            <tbody>`;
            for (a in response.payload) {
  
                innerHTML += `<tr>
                                <td>${response.payload[a].id}</td>
                                <td>${response.payload[a].supp_name}</td>
                                <td class="prodQuantity">${response.payload[a].prod_name}</td>
                                <td>${response.payload[a].quantity}</td>
                                <td>${response.payload[a].created_at}</td>
                                <td>
                                    <button style="background-color:'red';"  data-id="${response.payload[a].id}" class="deleteItemBtn" >Delete</button>
                                </td>
                            </tr>`;
  
                            
            }
  
  
            innerHTML += `<tbody></table>`;
  
            $(".requesttable").html(innerHTML);
            var table = $("#requesttable").DataTable({
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
            console.log(err);
        }
    })
    
  }

  function getSupplierDrop() {
    $.ajax({
      url: url + "getSupplierDrop",
      method: "GET",
      dataType: "json",
      success: function (response) {

          let innerHTML = ``;
          for (a in response.payload) {

              innerHTML += `
              <option value="${response.payload[a].id}">${response.payload[a].name}</option>`;

                          
          }

          $("#supplierSelect").html(innerHTML);   
      },
      error: function (err) {
          console.log(err);
      }
  })
  
}

function getProductDrop() {
  $.ajax({
    url: url + "getProductDrop",
    method: "GET",
    dataType: "json",
    success: function (response) {

        let innerHTML = ``;
        for (a in response.payload) {

            innerHTML += `
            <option value="${response.payload[a].id}">${response.payload[a].name}</option>`;

                        
        }

        $("#prodSelect").html(innerHTML);   
    },
    error: function (err) {
        console.log(err);
    }
})

}

    function getRequestsex() {
    $.ajax({
      url: url + "getRequests",
      type: "post",
      dataType: "json",
    })
      // if success
      .done(function (data) {
        let requests_data = data.payload;
        // accessing all items in the payload
        let str = `
        <table id="requestTable">
          <thead>
            <tr>
              <th class="thLeft">ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Supplier</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Date</th>
              <th class="thRight">Actions</th>
            </tr>
          </thead>
          <tbody>
        `;

        requests_data.forEach((requests) => {
          str += `
        <tr>
              <td>${requests.id}    </td>
              <td>${requests.name}</td>
              <td>${requests.email}</td>
              <td class="prodQuantity">${requests.supp_name}</td>
              <td>${requests.prod_name}</td>
              <td>${requests.quantity}</td>
              <td>${requests.created_at}</td>
              <td>
              <button style="background-color:'red';"  data-id="${requests.id}" class="deleteItemBtn" >Cancel</button>
            </td>
        </tr>
        `;
        });
        str += `
      </tbody>
    </table>`;

        $(".requesttable").append(str);

        var table = $("#requestTable").DataTable({
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

  $("#addDepartment").click(function () {
    var department = document.getElementById("department_field").value;

    if (department == "") {
      $("#error_message").prop("hidden", false);
    } else {
      $("#error_message").prop("hidden", true);

      addDepartment(department);
    }
  });
});


function addRequest() {
  // get input value from id's
  
  const Name = $("#ReqFirstName").val() + $(" #ReqLastName").val();
  const Email = $("#ReqEmail").val();
  const Quantity = $("#ReqQuantity").val();
  const Product = $("#prodSelect").val();
  const Supplier = $("#supplierSelect").val();


  // if empty..
if (Quantity===""){
      alert("Invalid!")
  }
  else if (Product===""){
      alert("Invalid!")
  }
  else if (Supplier===""){
    alert("Invalid!")
}

  else{
      // object variable
      item = {}
      
      // inputs will be turned into object
      item ["name"] = 'Name';
      item ["email"] = 'Email';
      item ["supplier_id"] = Supplier ;
      item ["product_id"] = Product;
      item ["quantity"] = Quantity;
      
      // stringify the object
      item = JSON.stringify(item);
      console.log(item)
      // ajax
      $.ajax({
          // var url + course
          url: url+'addRequest', 
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
          $("act tbody tr").remove(); 
          // call get course


      })
      // if failed
      .fail( function( data ) {
      });
  }
}

function addOrder() {
  // get input value from id's
  

  const Quantity = $("#ReqQuantity").val();
  const Product = $("#prodSelect").val();
  const Supplier = $("#supplierSelect").val();


  // if empty..
  if (Quantity===""){
      alert("Invalid!")
  }
  else if (Product===""){
      alert("Invalid!")
  }
  else if (Supplier===""){
    alert("Invalid!")
}

  else{
      // object variable
      item = {}
      item ["supp_id"] = Supplier ;
      item ["prod_id"] = Product;
      item ["qty"] = Quantity;
      item ["status"] = 'Pending';
      
      // stringify the object
      item = JSON.stringify(item);
      console.log(item)
      // ajax
      $.ajax({
          // var url + course
          url: url+'addOrder', 
          type: 'post',
          dataType: 'json',
          // data as item
          data:  item 
      })
      // if success
      .done( function( data ) {
        alert('order succesfully added');

          // call get course

          location.reload();
      })
      // if failed
      .fail( function( data ) {
      });
  }
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
    elements[i].style.backgroundColor = 'red';
    elements[i].style.color = 'white';
  } else if (value <= parseInt('75')) {
    elements[i].style.backgroundColor = 'orange';
    elements[i].style.color = 'white';
  } 
  }
});

function printDiv(divName) {
  var printContents = document.getElementById(divName).innerHTML;
  var originalContents = document.body.innerHTML;

  document.body.innerHTML = printContents;

  window.print();

  document.body.innerHTML = originalContents;
}