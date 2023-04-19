
<script>
function confirmPublishImg(id) {
    if (confirm("Are you sure you want to Published this content?")) {
        // Create a new form element
        var form = document.createElement("form");

        // Set the form attributes
        form.method = "POST";
        form.action = "../api/routes.php?request=publishImg&id=" + id;

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

function confirmArchiveImg(id) {
    if (confirm("Are you sure you want to archive this content?")) {
        // Create a new form element
        var form = document.createElement("form");

        // Set the form attributes
        form.method = "POST";
        form.action = "../api/routes.php?request=archiveImg&id=" + id;

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

</script>