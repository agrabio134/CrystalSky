let url = "http://localhost/CrystalSky/html/admin_ims/restApi/";

$(document).ready(function () {

  getPending();
  getForReview();
  getInProgress();
  getCompleted();

  $(document).on("click", ".approveSubmitBtn", function () {
    let id = $(this).attr("data-id");


    $.ajax({
      url: url + "approveOrder",
      method: "POST",
      data: JSON.stringify({
        status: 'For Review',
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

  $(document).on("click", ".reviewSubmitBtn", function () {
    let id = $(this).attr("data-id");


    $.ajax({
      url: url + "reviewOrder",
      method: "POST",
      data: JSON.stringify({
        status: 'In Progress',
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


  $(document).on("click", ".cancelSubmitBtn", function () {
    let id = $(this).attr("data-id");


    $.ajax({
      url: url + "cancelOrder",
      method: "POST",
      data: JSON.stringify({
        status: 'Cancelled',
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

  $(document).on("click", ".receiveSubmitBtn", function () {
    let id = $(this).attr("data-id");
    let qty = $(this).attr("data-qty");
    let prodid = $(this).attr("data-prodid");

    $.ajax({
      url: url + "receiveOrder",
      method: "POST",
      data: JSON.stringify({
        status: 'Completed',
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

    $.ajax({
      url: url + "receiveAddQty",
      method: "POST",
      data: JSON.stringify({
        quantity: qty,
        item_id: prodid
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

  $(document).on("click", ".myBtn", function () {
    let id = $(this).attr("data-id");
    // Get the modal

    var btn = document.getElementById("MyBtn" + id)
    console.log(btn)
    var modal = document.getElementById("myModal" + id);
    console.log(modal)

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close" + id)[0];
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


  $(document).on("click", ".cancelModalBtn", function () {
    let id = $(this).attr("data-id");
    // Get the modal

    var btn = document.getElementById("cancelModalBtn" + id)
    console.log(btn)
    var modal = document.getElementById("cancelModal" + id);
    console.log(modal)

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("cancelModalClose" + id)[0];
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


  $(document).on("click", ".receiveModalBtn", function () {
    let id = $(this).attr("data-id");
    // Get the modal

    var btn = document.getElementById("receiveModalBtn" + id)
    console.log(btn)
    var modal = document.getElementById("receiveModal" + id);
    console.log(modal)

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("receiveModalClose" + id)[0];
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


  $(document).on("click", ".approveModalBtn", function () {
    let id = $(this).attr("data-id");
    // Get the modal

    var btn = document.getElementById("approveModalBtn" + id)
    console.log(btn)
    var modal = document.getElementById("approveModal" + id);
    console.log(modal)

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("approveModalClose" + id)[0];
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

  $(document).on("click", ".reviewModalBtn", function () {
    let id = $(this).attr("data-id");
    // Get the modal

    var btn = document.getElementById("reviewModalBtn" + id)
    console.log(btn)
    var modal = document.getElementById("reviewModal" + id);
    console.log(modal)

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("reviewModalClose" + id)[0];
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

  function getCompleted() {
    $.ajax({
      url: url + "getCompleted",
      type: "post",
      dataType: "json",
    })
      // if success
      .done(function (data) {
        let orders_data = data.payload;
        // accessing all items in the payload
        let str = `
        <table style="vertical-align: middle;" id="completedTable">
          <thead>
            <tr>
              <th class="thLeft"> ID</th>
              <th>Supplier</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Expenses</th>
              <th>Status</th>

            </tr>
          </thead>
          <tbody>
        `;

        orders_data.forEach((orders) => {
          str += `
        <tr>
              <td>${orders.id}    </td>
              <td>${orders.supp_name}</td>
              <td>${orders.prod_name}</td>
              <td>${orders.product_price}</td>
              <td>${orders.qty}</td>
              <td>${orders.product_price * orders.qty}</td>
              <td class="orderCompleted">${orders.status}</td>

            </td>
        </tr>
        `;
        });


        str += `
      </tbody>
    </table>`;

        $(".ordertable4").html(str);

        var table = $("#completedTable").DataTable({
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
        let str = `
        <div style="text-align: center; margin-left:50px;"><p  style=" text-align: center;">no records found</p></div>
                `;
        $(".ordertable1").html(str);
      });
  }

  function getInProgress() {
    $.ajax({
      url: url + "getInProgress",
      type: "post",
      dataType: "json",
    })
      // if success
      .done(function (data) {
        let orders_data = data.payload;
        // accessing all items in the payload
        console.log(orders_data)
        if (orders_data != null) {
          let str = `
        <table style="vertical-align: middle;" id="inprogressTable">
          <thead>
            <tr>
              <th class="thLeft"> ID</th>
              <th>Supplier</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Expenses</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
        `;



          orders_data.forEach((orders) => {
            str += `
        <tr>
              <td>${orders.id}    </td>
              <td>${orders.supp_name}</td>
              <td>${orders.prod_name}</td>
              <td>${orders.product_price}</td>
              <td>${orders.qty}</td>  
              <td>${orders.product_price * orders.qty}</td>
              <td>
              <button data-prodid="${orders.prod_id}" data-qty="${orders.qty}" data-id="${orders.id}" class="receiveModalBtn receiveItemBtn" id="receiveModalBtn${orders.id}">Receive</button>
              </td>
        </tr>
        `;

            str += `
        <div id="receiveModal${orders.id}" class="modal">
        
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
                          <button class="ordersNoBtn receiveModalClose${orders.id}">No</button>
                          <button data-prodid="${orders.prod_id}" data-qty="${orders.qty}" data-id="${orders.id}" class="ordersYesBtn receiveSubmitBtn" id="receiveItemBtn${orders.id}">Yes</button>
                        
                        </div>
                    </div>
                </div>

          </div>

      </div>
        `;

          });



          str += `
      </tbody>
    </table>`;

          $(".ordertable3").html(str);

          var table = $("#inprogressTable").DataTable({
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
        } else {
          let str = `
<div style="text-align: center; margin-left:50px;"><p  style=" text-align: center;">no records found</p></div>
        `;
          $(".ordertable3").html(str);
        }
      })
      // if failed
      .fail(function (data) {
        let str = `
<div style="text-align: center; margin-left:50px;"><p  style=" text-align: center;">no records found</p></div>
        `;
        $(".ordertable3").html(str);
      });
  }

  function getForReview() {
    $.ajax({
      url: url + "getForReview",
      type: "post",
      dataType: "json",
    })
      // if success
      .done(function (data) {
        let orders_data = data.payload;
        // accessing all items in the payload
        let str = `
        <table style="vertical-align: middle;" id="forreviewTable">
          <thead>
            <tr>
              <th class="thLeft"> ID</th>
              <th>Supplier</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Expenses</th>
              <th class="thRight">Actions</th>
            </tr>
          </thead>
          <tbody>
        `;

        orders_data.forEach((orders) => {
          str += `
        <tr>
              <td>${orders.id}    </td>
              <td>${orders.supp_name}</td>
              <td>${orders.prod_name}</td>
              <td>${orders.product_price}</td>
              <td>${orders.qty}</td>
              <td>${orders.product_price * orders.qty}</td>
              <td style="width:20%;">
              <button style="background-color:'red';"  data-id="${orders.id}" class="updateItemBtn reviewModalBtn" id="reviewModalBtn${orders.id}">Review</button>
              <button style="background-color:'red';"  data-id="${orders.id}" class="archiveItemBtn cancelModalBtn" id="cancelModalBtn${orders.id}">Cancel</button>
              <button data-id="${orders.id}" class="orderDetailsBtn myBtn" id="MyBtn${orders.id}">Details</button>
              </td>
        </tr>`

          str += `
        <div id="cancelModal${orders.id}" class="modal">

        <div class="modal-alert">

        <!-- Modal content -->
                
                <div class="modal-content">
                <div class="modalHeader">
                        
                <h1>CANCEL</h1>

                  </div>
                    <div class="modalBody">
                        <h1>Cancel this item?</h1>
                    </div>
                    <div class="modalFooter">
                        <div class="modalButtonCont">
                          <button class="ordersNoBtn cancelModalClose${orders.id}">No</button>
                          <button class="ordersYesBtn cancelSubmitBtn" data-id="${orders.id}">Yes</button>
                          </div>
                          </div>
                      </div>
      
                </div>
      
            </div>
        `;

          str += `
        <div id="reviewModal${orders.id}" class="modal">


        <div class="modal-alert">

        <!-- Modal content -->
                
                <div class="modal-content">
                <div class="modalHeader">
                        
                <h1>REVIEW</h1>

                  </div>
                    <div class="modalBody">
                        <h1>Mark this item as reviewed?</h1>
                    </div>
                    <div class="modalFooter">
                        <div class="modalButtonCont">
                          <button class="ordersNoBtn reviewModalClose${orders.id}">No</button>
                          <button class="ordersYesBtn reviewSubmitBtn" data-id="${orders.id}">Yes</button>
                          </div>
                          </div>
                      </div>
      
                </div>
      
            </div>
        `;


          str += `
        <div id="myModal${orders.id}" class="modal">


        <div class="modal-add">
          <span class="close${orders.id} close">&times;</span>
            <div class="container">
                <h1 class="request-form">Update Product</h1>
                <div class="content">
                <form action="#">

                <div class="user-details-add">
                <div class="input-box">
                  <h3>Order Details</h3>
                  <span class="details">Order ID: ${orders.id} </span><br>
                  <span class="details">Date Created: ${orders.created_at} </span>
                </div>
              </div>


                  <div class="user-details">
                    <div class="input-box">
                    <h3>Product</h3>
                    <img src="${orders.picture}" alt="No Picture Found" width="100" height="100">
                    <p>ID: ${orders.prod_id} </p>
                    <p>Name: ${orders.prod_name} </p>
                    <p>Category: ${orders.category} </p>
                    <p>Unit: ${orders.unit} </p>
                    </div>
                  </div>
                  
                  <div class="user-details">
                    <div class="input-box">
                    <h3>Supplier</h3>
                    <p>ID: ${orders.supp_id} </p>
                    <p>Name: ${orders.supp_name} </p>
                    </div>
                  </div>



              </div>
            
                  </form>
                </div>
              </div>
        </div>
      
      </div>
        `;
        });
        str += `
      </tbody>
    </table>`;

        $(".ordertable2").html(str);

        var table = $("#forreviewTable").DataTable({
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
        getInProgress();
      })
      // if failed
      .fail(function (data) {
        let str = `
<div style="text-align: center; margin-left:50px;"><p  style=" text-align: center;">no records found</p></div>
        `;
        $(".ordertable2").html(str);

      });
  }

  function getPending() {
    $.ajax({
      url: url + "getPending",
      type: "post",
      dataType: "json",
    })
      // if success
      .done(function (data) {
        let orders_data = data.payload;
        // accessing all items in the payload
        let str = `
        <table style="vertical-align: middle;" id="pendingTable">
          <thead>
            <tr>
              <th class="thLeft"> ID</th>
              <th>Supplier</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Expenses</th>
              <th class="thRight">Actions</th>
            </tr>
          </thead>
          <tbody>
        `;

        orders_data.forEach((orders) => {
          str += `
        <tr>
              <td>${orders.id}    </td>
              <td>${orders.supp_name}</td>
              <td>${orders.prod_name}</td>
              <td>${orders.product_price}</td>
              <td>${orders.qty}</td>
              <td>${orders.product_price * orders.qty}</td>
              <td>
              <button style="background-color:'red';"  data-id="${orders.id}" class="updateItemBtn approveModalBtn" id="approveModalBtn${orders.id}">Approve</button>
              <button style="background-color:'red';"  data-id="${orders.id}" class="archiveItemBtn cancelModalBtn" id="cancelModalBtn${orders.id}">Cancel</button>

            </td>
        </tr>`



          str += `
        <div id="approveModal${orders.id}" class="modal">


        <div class="modal-alert">

        <!-- Modal content -->
                
                <div class="modal-content">
                <div class="modalHeader">
                        
                <h1>APPROVE</h1>

                  </div>
                    <div class="modalBody">
                        <h1>Approve this item?</h1>
                    </div>
                    <div class="modalFooter">
                        <div class="modalButtonCont">
                          <button class="ordersNoBtn approveModalClose${orders.id}">No</button>
                          <button class="ordersYesBtn approveSubmitBtn" data-id="${orders.id}">Yes</button>
                          </div>
                          </div>
                      </div>
      
                </div>
      
            </div>
        `;

          str += `
        <div id="cancelModal${orders.id}" class="modal">


        <div class="modal-alert">

        <!-- Modal content -->
                
                <div class="modal-content">
                <div class="modalHeader">
                        
                <h1>CANCEL</h1>

                  </div>
                    <div class="modalBody">
                        <h1>Cancel this item?</h1>
                    </div>
                    <div class="modalFooter">
                        <div class="modalButtonCont">
                          <button class="ordersNoBtn cancelModalClose${orders.id}">No</button>
                          <button class="ordersYesBtn cancelSubmitBtn" data-id="${orders.id}">Yes</button>
                          </div>
                          </div>
                      </div>
      
                </div>
      
            </div>
        `;
        });
        str += `
      </tbody>
    </table>`;

        $(".ordertable1").html(str);

        var table = $("#pendingTable").DataTable({
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
        let str = `
        <div style="text-align: center; margin-left:50px;"><p  style=" text-align: center;">no records found</p></div>
                `;
        $(".ordertable1").html(str);
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

document.addEventListener("click", () => {
  var elements = document.getElementsByClassName('orderCompleted');

  for (var i = 0; i < elements.length; i++) {
    var value = elements[i].innerText || elements[i].textContent;

    if (value == 'Completed') {
      elements[i].style.color = '#2FA83F';
    } else if (value == 'Cancelled') {
      elements[i].style.color = '#ce4534';


    }
  }
});