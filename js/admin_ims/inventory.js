

$(document).ready(function () {
    var table = $('#ActiveIngredients').DataTable({
      language: {
        paginate: {
        next: '<i class="fa fa-chevron-right" aria-hidden="true">',
        previous: '<i class="fa fa-chevron-left" aria-hidden="true">'  
       }
        },
        "dom": 'rtip'
      });

    $('#searchInput').keyup( function () {
        table.search($('#searchInput').val()).draw();
      } );
});



$(document).ready(function () {
  var table = $('#example1').DataTable({
    language: {
      paginate: {
      next: '<i class="fa fa-chevron-right" aria-hidden="true">',
      previous: '<i class="fa fa-chevron-left" aria-hidden="true">'  
     }
      },
      "dom": 'rtip'
    });

  $('#searchInput').keyup( function () {
      table.search($('#searchInput').val()).draw();
    } );
});

$(document).ready(function () {
  var table = $('#example2').DataTable({
    language: {
      paginate: {
      next: '<i class="fa fa-chevron-right" aria-hidden="true">',
      previous: '<i class="fa fa-chevron-left" aria-hidden="true">'  
     }
      },
      "dom": 'rtip'
    });

  $('#searchInput').keyup( function () {
      table.search($('#searchInput').val()).draw();
    } );
});

$(document).ready(function () {
var table = $('#example3').DataTable({
  language: {
    paginate: {
    next: '<i class="fa fa-chevron-right" aria-hidden="true">',
    previous: '<i class="fa fa-chevron-left" aria-hidden="true">'  
   }
    },
    "dom": 'rtip'
  });

$('#searchInput').keyup( function () {
    table.search($('#searchInput').val()).draw();
  } );
});

function setupTabs () {
  document.querySelectorAll(".PageBtn").forEach(button=> {
    button.addEventListener("click", () => {
      const sideBar = button.parentElement;
      const tabsContainer = sideBar.parentElement;
      const tabNumber =button.dataset.forTab;
      const tabToActivate = tabsContainer.querySelector(`.tableCont[data-tab="${tabNumber}"]`);

      console.log(tabNumber)

      sideBar.querySelectorAll(".PageBtn").forEach(button => {
        button.classList.remove("PageBtnActive");
      });

      tabsContainer.querySelectorAll(".tableCont").forEach(tab => {
        tab.classList.remove("tableContActive");
      });

      button.classList.add("PageBtnActive");
      tabToActivate.classList.add("tableContActive");
  });
});
}






