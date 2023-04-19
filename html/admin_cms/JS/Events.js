const url = "http://localhost/CrystalSky/html/admin_cms/api/";

const addEventPost = () => {
  // Get the input values

  
  const title = $(".event-name").val();
  const date = $(".event-date").val();
  const timeFrom = $(".event-time-from").val();
  const timeTo = $(".event-time-to").val();
  const description = $(".event-description").val();
  const image = $(".event-image").val();

  // Prepare the data to be sent to the server
  const data = {
    title: title,
    date: date,
    time_from: timeFrom,
    time_to: timeTo,
    description: description,
    image: image,
  };
  console.log(data);

  // Send the data to the server using Ajax
  $.ajax({
    url: url + "addEventPost",
    type: "POST",
    dataType: "json",
    data: data,
    success: function (response) {
      // If the server returns a success response, show a success message
      alert("Event added successfully!");
    },
    error: function (xhr, status, error) {
      // If the server returns an error response, show an error message
      alert("Error: " + xhr.responseText);
    },
  });
};
