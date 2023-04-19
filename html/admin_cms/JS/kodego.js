let url = "http://localhost/CrystalSky/html/admin_cms/api/";


$(document).ready(function () {
  getContentAboutFacilities();
});

const getContentAboutFacilities = () => {
  $.ajax({
    url: url + "getContentAboutFacilities",
    type: "post",
    dataType: "json",
  })
    // if success

    .done(function (data) {
      let AboutFacilitiesContent = data.payload;
      // accessing all items in the payload
      console.log(data.remarks);

      // $("#ArchivedGallery").empty();

      let str = ``;

      AboutFacilitiesContent.forEach((content) => {
        str += `    
   
        `;
      });
      str += ``;

      $("#getContentAboutFacilities").append(str);

      console.log(data);
    })
    // if failed
    .fail(function (data) {
      console.error("not okay");
    });
};
