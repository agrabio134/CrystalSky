    const editEvent = (id) => {

    // Create a new form element
    var form = document.createElement("form");

    // Set the form attributes
    form.method = "POST";
    form.action = ".http://localhost/SIA/content_ms/api/routes.php?request=editEvent&id=" + id;

    // Create a new input element for the ID
    var input = document.createElement("input");
    input.type = "hidden";
    input.name = "id";
    input.value = id;

    // Append the input element to the form
    form.appendChild(input);

    // Append the form to the body and submit it
    document.body.appendChild(form);
    form.submit();

}

const editAnnouncement =(id)=> {

// Create a new form element
var form = document.createElement("form");

// Set the form attributes
form.method = "POST";
form.action = ".http://localhost/SIA/content_ms/api/routes.php?request=editAnnouncement&id=" + id;

// Create a new input element for the ID
var input = document.createElement("input");
input.type = "hidden";
input.name = "id";
input.value = id;

// Append the input element to the form
form.appendChild(input);

// Append the form to the body and submit it
document.body.appendChild(form);
form.submit();

}




const confirmArchive = (id) => {
    if (confirm("Are you sure you want to archive this content?")) {
        // Create a new form element
        var form = document.createElement("form");

        // Set the form attributes
        form.method = "POST";
        form.action = "http://localhost/SIA/content_ms/api/routes.php?request=archive&id=" + id;

        // Create a new input element for the ID
        var input = document.createElement("input");
        input.type = "hidden";
        input.name = "id";
        input.value = id;

        // Append the input element to the form
        form.appendChild(input);

        // Append the form to the body and submit it
        document.body.appendChild(form);
        form.submit();
    } else {
        // If the user cancels, do nothing
        return;
    }
}