<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About us</title>
</head>

<body>

    <div class="navigation">
        <a href="/SIA/content_ms/cms/index">Panel</a>
        <a href="/SIA/content_ms/cms/content">Content</a>
        <a href="/SIA/content_ms/cms/rooms">Rooms</a>
        <a href="/SIA/content_ms/cms/about">About us</a>

        <br />
        <br />

        <a href="/SIA/content_ms/cms/logout">(Temporary)Logout</a>
    </div>



    <h1>About US</h1>
    <?php foreach ($contacts as $contact) : ?>


        <form action="../api/routes.php?request=update_contact" method="post" enctype="multipart/form-data">
            <!-- user id  -->
            <input type="hidden" name="user_id" value="<?php echo $_SESSION['id']; ?>">
            <label for="title">Title</label>
            <input type="text" name="title" id="title" placeholder="<?php echo $contact['title'] ?>" value="<?php echo $contact['title'] ?>">

            <label for="description">Description</label>
            <textarea name="description" id="description" cols="30" rows="10" placeholder="<?php echo $contact['description'] ?>"><?php echo $contact['description'] ?></textarea>

            <label for="contact_no">Contact number: </label>
            <input type="text" name="contact_no" id="contact_no" placeholder="<?php echo $contact['contact_no'] ?>" value="<?php echo $contact['contact_no'] ?>">

            <label for="email">Email: </label>
            <input type="email" name="email" id="email" placeholder="<?php echo $contact['email'] ?>" value="<?php echo $contact['email'] ?>">


            <label for="location">location: </label>
            <input type="text" name="location" id="location" placeholder="<?php echo $contact['location'] ?>" value="<?php echo $contact['location'] ?>">

            <label for="image">Media</label>
            <input type="file" name="image" id="image" default="<?php echo $contact['image'] ?>">

            <p> preview: <br><img src="../../cms_media/about/<?php echo $contact['image'] ?>" width="300px" /></p>


            <input type="submit" value="Submit">

        <?php endforeach; ?>
        </form>


</body>

</html>