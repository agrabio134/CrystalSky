// ===================== AJAX FUNCTIONS ========================== //
var rec_data;
var rec_id;
var edit_data;
var act;
// document init functions ready
$(document).ready(function(){
    getactbooks();
    getbsitbooks();
    getbscsbooks();
    getbsemcbooks();
    getact();
    getacttotal();
    getbscstotal();
    getbsittotal();
    getbsemctotal();
    get_breport();
    get_ureport();
    get_utotal();
    get_btotal();
    changeFunc();
});
// url of api sample rest
var url = 'http://localhost/GCLIB/samplerest/';

$(".book").on('click', 'a', function(e){ 
    e.preventDefault(); 
    var url = $(this).attr('href'); 
    window.open(url, '_blank');
});

// get all books from database
function getact() {
    var x = localStorage.getItem("book");
    $.ajax({
        url: url+'getbooks',
        type: 'POST',
        dataType: 'JSON',
        success: function(response){
            console.log(response)
            book = response.payload;
            var len = book.length;
            for(var i=0; i<len; i++){
                var book_id = book[i].book_id;
                var course_name = book[i].course_name;
                var author = book[i].author;
                var title = book[i].title;
                var date = book[i].date;
                var book_location = book[i].book_location;
                var tr_str = "<tr>" +
                "<td>" + book_id + "</td>" +
                "<td>" + course_name + "</td>" +
                "<td>" + author + "</td>" +
                "<td>" + "<a href="+ book_location +">" + title + "</a>" + "</td>" +
                "<td>" + date + "</td>" +
                "<td> <button onclick=addpdf("+book_id+") style='background-color:rgb(67, 173, 243);'> Add File </button><button onclick=update("+book_id+") style='background-color:rgb(67, 173, 243);'> Edit Book </button><button onclick=del("+book_id+") style='background-color:rgb(243, 67, 67);'> Delete Book </button> </td>"
                "</tr>";
                $("#act tbody").append(tr_str);
            }   
        }
    });
    
}

// category filter
function changeFunc() {
    var selectBox = document.getElementById("selectBox");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    var x = localStorage.getItem("book");
    if (selectedValue == 1) {
        var sort_url = url+'actreport';
    } if (selectedValue == 2) {
        var sort_url = url+'bscsreport';
    } if (selectedValue == 3) {
        var sort_url = url+'bsitreport';
    } if (selectedValue == 4) {
        var sort_url = url+'bsemcreport';
    }
        $.ajax({
            url: sort_url,
            type: 'POST',
            dataType: 'JSON',
            success: function(response){
                $("#sort_tbl tbody").empty();
                console.log(response)
                book = response.payload;
                var len = book.length;
                // for loop each course
                for(var i=0; i<len; i++){
                    // each field as variable
                    var book_id = book[i].book_id;
                    var course_name = book[i].course_name;
                    var author = book[i].author;
                    var title = book[i].title;
                    var date = book[i].date;
                    var book_location = book[i].book_location;
                    // html string for table row with field variables
                    var tr_str = "<tr>" +
                    "<td>" + book_id + "</td>" +
                    "<td>" + course_name + "</td>" +
                    "<td>" + author + "</td>" +
                    "<td>" + "<a href="+ book_location +">" + title + "</a>" + "</td>" +
                    "<td>" + date + "</td>" +
                    "</tr>";
                    $("#sort_tbl tbody").append(tr_str);
                    // chane that h1 text into the user name
                } 
            }
        });
   }


// get ACT books
function getactdata() {
    // gets user from local storage
   
    $.ajax({
        // url course -> gets user
        url: url+'actreport',
        type: 'POST',
        dataType: 'JSON',
        success: function(response){
            console.log(response)
            book = response.payload;
            var len = book.length;
            // for loop each course
            for(var i=0; i<len; i++){
                // each field as variable
                var book_id = book[i].book_id;
                var course_name = book[i].course_name;
                var author = book[i].author;
                var title = book[i].title;
                var date = book[i].date;
                var book_location = book[i].book_location;
                // html string for table row with field variables
                var tr_str = "<tr>" +
                "<td>" + book_id + "</td>" +
                "<td>" + course_name + "</td>" +
                "<td>" + author + "</td>" +
                "<td>" + "<a href="+ book_location +">" + title + "</a>" + "</td>" +
                "<td>" + date + "</td>" +
                "</tr>";
                $("#act tbody").append(tr_str);
                // chane that h1 text into the user name
            }
        }
    });
}

function getactbooks() {
    // gets user from local storage
    var x = localStorage.getItem("book");
    $.ajax({
        // url course -> gets user
        url: url+'getactbooks',
        type: 'POST',
        dataType: 'JSON',
        success: function(response){
            console.log(response)
            book = response.payload;
            var len = book.length;
            // for loop each course
            for(var i=0; i<len; i++){
                // each field as variable
                var title = book[i].title;
                var book_location = book[i].book_location;
                // html string for table row with field variables
                var tr_str =
                 "<div> <a href="+ book_location + ">" + title + "</a> </div>";
                $("#actbooks").append(tr_str);
                // chane that h1 text into the user name
            }
        }
    });
}

function getbscsbooks() {
    // gets user from local storage
    var x = localStorage.getItem("book");
    $.ajax({
        // url course -> gets user
        url: url+'getbscsbooks',
        type: 'POST',
        dataType: 'JSON',
        success: function(response){
            console.log(response)
            book = response.payload;
            var len = book.length;
            // for loop each course
            for(var i=0; i<len; i++){
                var title = book[i].title;
                var book_location = book[i].book_location;
                var tr_str =
                 "<div> <a href="+ book_location + ">" + title + "</a> </div>";
                $("#bscsbooks").append(tr_str);
            }
        }
    });
}

function getbsitbooks() {
    // gets user from local storage
    var x = localStorage.getItem("book");
    $.ajax({
        // url course -> gets user
        url: url+'getbsitbooks',
        type: 'POST',
        dataType: 'JSON',
        success: function(response){
            console.log(response)
            book = response.payload;
            var len = book.length;
            // for loop each course
            for(var i=0; i<len; i++){
                // each field as variable
                var title = book[i].title;
                var book_location = book[i].book_location;
                // html string for table row with field variables
                var tr_str =
                 "<div> <a href="+ book_location + ">" + title + "</a> </div>";
                $("#bsitbooks").append(tr_str);
                // chane that h1 text into the user name
            }
        }
    });
}

function getbsemcbooks() {
    // gets user from local storage
    var x = localStorage.getItem("book");
    $.ajax({
        // url course -> gets user
        url: url+'getbsemcbooks',
        type: 'POST',
        dataType: 'JSON',
        success: function(response){
            console.log(response)
            book = response.payload;
            var len = book.length;
            // for loop each course
            for(var i=0; i<len; i++){
                // each field as variable
                var title = book[i].title;
                var book_location = book[i].book_location;
                // html string for table row with field variables
                var tr_str =
                 "<div> <a href="+ book_location + ">" + title + "</a> </div>";
                $("#bsemcbooks").append(tr_str);
                // chane that h1 text into the user name
            }
        }
    });
}

function get_breport() {
    // gets user from local storage
    var x = localStorage.getItem("book");
    $.ajax({
        // url course -> gets user
        url: url+'bookReport',
        type: 'POST',
        dataType: 'JSON',
        success: function(response){
            console.log(response)
            book = response.payload;
            // for loop each course
        
                // each field as variable
                var record = book[0].record;
                // html string for table row with field variables
                var tr_str = "<h3>" + record + "<h3>";
                $("#nbook").append(tr_str);
                // chane that h1 text into the user name
        }
    });
}

function get_ureport() {
    // gets user from local storage
    var x = localStorage.getItem("user");
    $.ajax({
        // url course -> gets user
        url: url+'userReport',
        type: 'POST',
        dataType: 'JSON',
        success: function(response){
            console.log(response)
            user = response.payload;
            // for loop each course
        
                // each field as variable
                var record = user[0].record;
                // html string for table row with field variables
                var tr_str = "<h3>" + record + "<h3>";
                $("#nuser").append(tr_str);
                // chane that h1 text into the user name
        }
    });
}

function get_utotal() {
    // gets user from local storage
    var x = localStorage.getItem("user");
    $.ajax({
        // url course -> gets user
        url: url+'utotal',
        type: 'POST',
        dataType: 'JSON',
        success: function(response){
            console.log(response)
            user = response.payload;
            // for loop each course
        
                // each field as variable
                var record = user[0].record;
                // html string for table row with field variables
                var tr_str = "<h3>" + record + "<h3>";
                $("#utotal").append(tr_str);
                // chane that h1 text into the user name
        }
    });
}

function get_btotal() {
    // gets user from local storage
    var x = localStorage.getItem("book");
    $.ajax({
        // url course -> gets user
        url: url+'btotal',
        type: 'POST',
        dataType: 'JSON',
        success: function(response){
            console.log(response)
            book = response.payload;
            // for loop each course
        
                // each field as variable
                var record = book[0].record;
                // html string for table row with field variables
                var tr_str = "<h3>" + record + "<h3>";
                $("#btotal").append(tr_str);
                // chane that h1 text into the user name
        }
    });
}



function getacttotal() {
    // gets user from local storage
    var x = localStorage.getItem("book");
    $.ajax({
        // url course -> gets user
        url: url+'getacttotal',
        type: 'POST',
        dataType: 'JSON',
        success: function(response){
            console.log(response)
            book = response.payload;
            // for loop each course
        
                // each field as variable
                var record = book[0].record;
                // html string for table row with field variables
                var tr_str = "<h3>" + record + "<h3>";
                $("#record1").append(tr_str);
                // chane that h1 text into the user name
        }
    });
}

function getbscstotal() {
    // gets user from local storage
    var x = localStorage.getItem("book");
    $.ajax({
        // url course -> gets user
        url: url+'getbscstotal',
        type: 'POST',
        dataType: 'JSON',
        success: function(response){
            console.log(response)
            book = response.payload;
            // for loop each course
        
                // each field as variable
                var record = book[0].record;
                // html string for table row with field variables
                var tr_str = "<h3>" + record + "<h3>";
                $("#record2").append(tr_str);
                // chane that h1 text into the user name
        }
    });
}

function getbsittotal() {
    // gets user from local storage
    var x = localStorage.getItem("book");
    $.ajax({
        // url course -> gets user
        url: url+'getbsittotal',
        type: 'POST',
        dataType: 'JSON',
        success: function(response){
            console.log(response)
            book = response.payload;
            // for loop each course
        
                // each field as variable
                var record = book[0].record;
                // html string for table row with field variables
                var tr_str = "<h3>" + record + "<h3>";
                $("#record3").append(tr_str);
                // chane that h1 text into the user name
        }
    });
}

function getbsemctotal() {
    // gets user from local storage
    var x = localStorage.getItem("book");
    $.ajax({
        // url course -> gets user
        url: url+'getbsemctotal',
        type: 'POST',
        dataType: 'JSON',
        success: function(response){
            console.log(response)
            book = response.payload;
            // for loop each course
        
                // each field as variable
                var record = book[0].record;
                // html string for table row with field variables
                var tr_str = "<h3>" + record + "<h3>";
                $("#record4").append(tr_str);
                // chane that h1 text into the user name
        }
    });
}

// add record
function register() {
    // get input value from id's
    const fname = $("#firstname").val();
    const lname = $("#lastname").val();
    const email = $("#email").val();
    const password= $("#password").val();
    // if empty..
    if (fname===""){
        alert("Invalid!")
    }
    else if (lname===""){
        alert("Invalid!")
    }
    else if (email===""){
        alert("Invalid!")
    }
    else if (password===""){
        alert("Invalid!")
    }
    else{
        // object variable
        item = {}
        // inputs will be turned into object
        item ["firstname"] = fname;
        item ["lastname"] = lname;
        item ["email"] = email;
        item ["password"] = password;
        // stringify the object
        item = JSON.stringify(item);
        // ajax
        $.ajax({
            // var url + course
            url: url+'register', 
            type: 'post',
            dataType: 'json',
            // data as item
            data:  item 
        })
        // if success
        .done( function( data ) {
            
            // remove all rows
            $("users tbody tr").remove(); 
            location.reload();
        })
        // if failed
        .fail( function( data ) {
        });
        alert('Registered Succesfully!');
    }
}

function login() {
    const email = $("#useremail").val();
    const password = $("#userpassword").val();
    // object variable
    item = {}
    // inputs will be turned into object
    item ["email"] = email;
    item ["password"] = password;
    // stringify the object
    item = JSON.stringify(item);
    // ajax
    $.ajax({
        // var url + student/instructor
        url: url+'login', 
        type: 'post',
        dataType: 'json',
        // data as item
        data:  item 
    })
    // if success
    .done( function( data ) {
        // set id as local storage
        localStorage.setItem("user", data.payload.usernum);
        // change the page
        document.location.href = "../html/home.html";
        // alert message
        alert('Logged In Succesfully!');
    })
    // if failed
    .fail( function( data ) {
        console.log(data);
    });
    
}
    function loginadmin() {
        const email = $("#email").val();
        const password = $("#password").val();
        // object variable
        item = {}
        // inputs will be turned into object
        item ["email"] = email;
        item ["password"] = password;
        // stringify the object
        item = JSON.stringify(item);
        // ajax
        $.ajax({
            // var url + student/instructor
            url: url+'adminlogin', 
            type: 'post',
            dataType: 'json',
            // data as item
            data:  item 
        })
        // if success
        .done( function( data ) {
            // set id as local storage
            localStorage.setItem("admin", data.payload.adminnum);
            // change the page
            document.location.href = "../html/dashboardpanel.html";
            // alert message
            alert('Welcome Administrator!');
        })
        // if failed
        .fail( function( data ) {
            console.log(data);
        });
    }

function deletefile() {

    var book_id = $("#Dact_id").val();
    var book_location = $("#Dbook_location").val();

    item = {}
    item["book_id"] = book_id;
    item["book_location"] = book_location;
    item = JSON.stringify(item);

    $.ajax({
        url: url + 'deleterecord/' + book_id,
        type: 'post',
        dataType: 'json',
        data: item,
    })
        .done(function (data) {
        alert('Deleted');
        location.reload();
        // remove all rows
        $("act tbody tr").deletefile(); 
        });
}

// add record
function addact() {
    // get input value from id's
    
    const author = $("#author").val();
    const course_id = $("#course_id").val();
    const title = $("#title").val();
    const date = $("#date").val();


    // if empty..
    if (author===""){
        alert("Invalid!")
    }
    else if (course_id===""){
        alert("Invalid!")
    }
    else if (title===""){
        alert("Invalid!")
    }
    else if (date===""){
        alert("Invalid!")
    }

    else{
        // object variable
        item = {}
        // inputs will be turned into object
        item ["author"] = author;
        item ["course_id"] = course_id;
        item ["title"] = title;
        item ["date"] = date;
        // stringify the object
        item = JSON.stringify(item);
        // ajax
        $.ajax({
            // var url + course
            url: url+'addbooks', 
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

// update a course 
function editact() {
    const book_id = $("#Eact_id").val();
    const author = $("#Eauthor").val();
    const course_id = $("#Ecourse_id").val();
    const title = $("#Etitle").val();
    const date = $("#Edate").val();

    item = {}
    item["author"] = author;
    item["course_id"] = course_id;
    item["title"] = title;
    item["date"] = date;
    item["book_id"] = book_id;

    item = JSON.stringify(item);
    $.ajax({
        url: url + 'updatebooks',
        type: 'post',
        dataType: 'json',
        data: item
    })
        .done(function (data) {
            $("#act tbody tr").remove();
            closeEditModal();
            location.reload();
        })
        .fail(function (data) {
        });
        alert('data updated!');
}

function update(data) {
    document.getElementById("editmodal").style.display = "block";
    $.ajax({
        url: url + 'retrieve/' + data,
        type: 'POST',
        dataType: 'JSON',
        success: function (response) {
            console.log(response)
            edit_data = response.payload;
            var len = edit_data.length;
            for (var i = 0; i < len; i++) {
                var author = edit_data[i].author;
                var course_id = edit_data[i].course_id;
                var title = edit_data[i].title;
                var date = edit_data[i].date;
                var book_id = edit_data[i].book_id;
                $("#Eauthor").val(author);
                $("#Ecourse_id").val(course_id);
                $("#Etitle").val(title);
                $("#Edate").val(date);
                $("#Eact_id").val(book_id);
             
            }
        }
    });
}

function addpdf(data) {
    document.getElementById("pdfmodal").style.display = "block";
    $.ajax({
        url: url + 'retrieve/' + data,
        type: 'POST',
        dataType: 'JSON',
        success: function (response) {
            console.log(response)
            edit_data = response.payload;
            var len = edit_data.length;
            for (var i = 0; i < len; i++) {
                var pdf = edit_data[i].pdf;
                var book_id = edit_data[i].book_id;
                $("#sortpicture").val(pdf);
                $("#Tact_id").val(book_id);
            }
        }
    });
}

function del(data) {
    document.getElementById("delmodal").style.display = "block";
    $.ajax({
        url: url + 'retrieve/' + data,
        type: 'POST',
        dataType: 'JSON',
        success: function (response) {
            console.log(response)
            edit_data = response.payload;
            var len = edit_data.length;
            for (var i = 0; i < len; i++) {
                var book_location = edit_data[i].book_location;
                var book_id = edit_data[i].book_id;
                $("#Dbook_location").val(book_location);
                $("#Dact_id").val(book_id);
            }
        }
    });
}

$('#upload').on('click', function() {
    var file_data = $('#sortfile').prop('files')[0];   
    var form_data = new FormData();  
    var book_id = $("#Tact_id").val();                
    form_data.append('file', file_data);

    
    alert(form_data);                             
    $.ajax({
        url: url+'addfile?book_id=' + book_id,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,                        
        type: 'post',
        success: function(php_script_response){
            alert(php_script_response);
        }
     });
});


// close edit modal
function closeEditModal(){
    document.getElementById("editmodal").style.display = "none";
}

function closeDeleteModal(){
    document.getElementById("delmodal").style.display = "none";
}

function closePdfModal(){
    document.getElementById("pdfmodal").style.display = "none";
}

function closeAddModal(){
    document.getElementById("addmodal").style.display = "none";
}