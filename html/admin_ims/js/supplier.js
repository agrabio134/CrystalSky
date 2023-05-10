let url = "http://localhost/CrystalSky/html/admin_ims/restApi/";

$(document).ready(function () {
  
  getSuppliers();

  $(document).on("click", ".deleteItemBtn", function () {
    let id = $(this).attr("data-id");
    
    if (confirm("Do you want to delete this suppler?")) {
        $.ajax({
            url: url + "deleteSupplier",
            method: "POST",
            data: JSON.stringify({
                item_id: id
            }),
            dataType: 'json',
            
            success: function (response) {
              getSuppliers();
  
            }
  
            
            
        })
        .fail(function() {
          console.log('mali');
        });
    }
  });


  function getSuppliers() {
      $.ajax({
        url: url + "getSuppliers",
        method: "POST",
        dataType: "json",
        success: function (response) {
  
            let innerHTML = `        <table id="suppliertable">
            <thead>
              <tr>
              <th class="thLeft">ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Address</th>
              <th class="thRight">Actions</th>
              </tr>
            </thead>
            <tbody>`;
            for (a in response.payload) {
  
                innerHTML += `<tr>
                                <td>${response.payload[a].id}</td>
                                <td>${response.payload[a].name}</td>
                                <td>${response.payload[a].email}</td>
                                <td>${response.payload[a].contact}</td>
                                <td>${response.payload[a].address}</td>
                                <td>
                                    <button style="background-color:'red';"  data-id="${response.payload[a].id}" class="deleteItemBtn" >Delete</button>
                                </td>
                            </tr>`;
  
                            
            }
  
  
            innerHTML += `<tbody></table>`;
  
            $(".suppliertable").html(innerHTML);
            var table = $("#suppliertable").DataTable({
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

    function getSuppliersex() {
    $.ajax({
      url: url + "getSuppliers",
      type: "post",
      dataType: "json",
    })
      // if success
      .done(function (data) {
        let suppliers_data = data.payload;
        // accessing all items in the payload
        let str = `
        <table id="supplierTable">
          <thead>
            <tr>
              <th class="thLeft">ID</th>
              <th style="width:2000%;>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Address</th>
              <th class="thRight">Actions</th>
            </tr>
          </thead>
          <tbody>
        `;

        suppliers_data.forEach((suppliers) => {
          str += `
        <tr>
              <td>${suppliers.id}    </td>
              <td>${suppliers.name}</td>
              <td>${suppliers.email}</td>
              <td>${suppliers.contact}</td>
              <td>${suppliers.address}</td>
              <td>
              <button type="button" class="defBtn viewBtn">DELETE</button>  
            </td>
        </tr>
        `;
        });
        str += `
      </tbody>
    </table>`;

        $(".suppliertable").append(str);

        var table = $("#supplierTable").DataTable({
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


function addSupplier() {
  // get input value from id's
  
  const Name = $("#SuppName").val();
  const Email = $("#SuppEmail").val();
  const Contact = $("#SuppContact").val();
  const Address = $("#SuppAddress").val();


  // if empty..
  if (Name===""){
      alert("Invalid!")
  }
  else if (Email===""){
      alert("Invalid!")
  }
  else if (Contact===""){
      alert("Invalid!")
  }
  else if (Address===""){
      alert("Invalid!")
  }

  else{
      // object variable
      item = {}
      
      // inputs will be turned into object
      item ["name"] = Name;
      item ["email"] = Email;
      item ["contact"] = Contact;
      item ["address"] = Address;

      
      // stringify the object
      item = JSON.stringify(item);
      console.log(item)
      // ajax
      $.ajax({
          // var url + course
          url: url+'addSupplier', 
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
