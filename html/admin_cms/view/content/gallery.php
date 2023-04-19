<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gallery</title>
</head>

<body>


    <div class="navigation">
        <a href="/SIA/content_ms/cms/index">Panel</a>
        <a href="/SIA/content_ms/cms/content">Content</a>
        <a href="/SIA/content_ms/cms/rooms">Rooms</a>
        <a href="/SIA/content_ms/cms/about">About us</a>

        <br />
        <br />

        <a href="/content_ms/cms/logout">(Temporary)Logout</a>
    </div>

    <div class="content_nav">
        <a href="/SIA/content_ms/cms/postevents">Events</a>
        <a href="/SIA/content_ms/cms/postannouncements">Announcements</a>
        <a href="/SIA/content_ms/cms/postimages">Gallery</a>
        <a href="/SIA/content_ms/cms/archived">Archived</a>


    </div>
    <form action="../api/routes.php?request=upload_image" method="post" enctype="multipart/form-data">
        <input type="file" name="images[]" multiple>
        <input type="submit" name="submit" value="Upload">
    </form>



    <h1>Unpublished</h1>


    <table>
        <thead>
            <th>id</th>
            <th>Images</th>
            <th>action</th>
        </thead>

        <?php foreach ($unpublished_images as $content) : ?>

            <tbody>
                <td>
                    <?php echo $content['id']; ?>
                </td>
                <td>
                    <img src="../../cms_media/uploads/<?php echo $content['media']; ?> " height="150px" width="300px" />
                </td>
                <td><a href="javascript:void(0)" onclick="confirmArchiveImg(<?php echo $content['id']; ?>)">Archive</a>
                    <a href="javascript:void(0)" onclick="confirmPublishImg(<?php echo $content['id']; ?>)">Publish</a>
                </td>
            </tbody>
        <?php endforeach; ?>

    </table>


    <h1>Live</h1>

    <table>
        <thead>
            <th>id</th>
            <th>Images</th>
            <th>action</th>
        </thead>

        <?php foreach ($published_images as $content) : ?>
            <tbody>
                <td>
                    <?php echo $content['id']; ?>
                </td>
                <td>
                    <img src="../../cms_media/uploads/<?php echo $content['media']; ?> " height="150px" width="300px"/>
                </td>
                <td><a href="javascript:void(0)" onclick="confirmArchiveImg(<?php echo $content['id']; ?>)">Archive</a>
                    <a href="javascript:void(0)" onclick="confirmPublishImg(<?php echo $content['id']; ?>)">Unpublish</a>
                </td>
            </tbody>
        <?php endforeach; ?>

    </table>



</body>
<?php include_once "script/imgsScript.php"; ?>

</html>