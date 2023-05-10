
let link = 'http://localhost/CrystalSky/samplerest/';

// var baseURL = "http://" + port + "/CrystalSky/samplerest/"
// var port = "localhost:8080";
// var port = "localhost";

function login() {
    event.preventDefault();

    let username = $("#loginUsername").val();
    let password = $("#loginPassword").val();

    //   alert(port)
    $.ajax({
        url: link + "login",
        method: "POST",
        data: JSON.stringify({
            username: username,
            password: password
        }),
        success: function (response) {
            console.log("Successfully logged in");
            localStorage.setItem('fullname', response.payload.fullname);
            window.location.href = "../../html/admin_index/admin_index.html";
            // window.location.href = "../html/admin_login/admin_login.html";
        },
        error: function (err) {
            Swal.fire({
                icon: 'error',
                title: 'Ooops!',
                text: 'Please check your username and password...',
                // text: err
            });
            // alert("Please check your username and password...")
        }
    })
}

getAdminInfo();
function getAdminInfo() {
    $("#accountName").html(`${localStorage.getItem('fullname')}`);
    // $("#idNumber").html(localStorage.getItem('id'));
}

// logout function
function logout() {
    if (confirm("Do you really want to Log out?")) {
        localStorage.clear();
        window.location.href = "../../html/admin_login/admin_login.html";
    }

}
