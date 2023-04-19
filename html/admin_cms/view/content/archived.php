<div class="navigation">
    <a href="/SIA/content_ms/cms/index">Panel</a>
    <a href="/SIA/content_ms/cms/content">Content</a>
    <a href="/SIA/content_ms/cms/rooms">Rooms</a>
    <a href="/SIA/content_ms/cms/about">About us</a>

    <br />
    <br />

    <a href="/SIA/content_ms/cms/logout">(Temporary)Logout</a>
</div>
<h1>Events</h1>

<table>
    <thead>
        <th>Title</th>
        <th>Description</th>
        <th>Date</th>
        <th>Time</th>
        <th>Media</th>
        <th>Action</th>
    </thead>

    <?php foreach ($archivedEve_results as $content) :  ?>
        <tbody>
            <td><?php echo $content['title']; ?></td>
            <td><?php echo $content['description']; ?></td>
            <td><?php echo $content['date']; ?></td>
            <td><?php echo $content['time']; ?></td>
            <td>
                <img src="../../cms_media/content/<?php echo $content['media']; ?> " height="150px" width="300px" />
            </td>
            <!-- archive -->
            <td> <a href="javascript:void(0)" onclick="confirmArchive(<?php echo $content['id']; ?>)">Unarchive</a>
            </td>
        </tbody>
    <?php endforeach; ?>
</table>


<h1>Announcements</h1>

<table>
    <thead>
        <th>Title</th>
        <th>Description</th>
        <th>Media</th>
        <th>Action</th>
    </thead>

    <?php foreach ($archivedAnn_results as $content) :  ?>
        <tbody>
            <td><?php echo $content['title']; ?></td>
            <td><?php echo $content['description']; ?></td>

            <td>
                <img src="../../cms_media/content/<?php echo $content['media']; ?> " height="150px" width="300px" />
            </td>
            <!-- archive -->
            <td> <a href="javascript:void(0)" onclick="confirmArchive(<?php echo $content['id']; ?>)">Unarchive</a>
            </td>
        </tbody>
    <?php endforeach; ?>
</table>
<h1>Gallery</h1>
<table>
    <thead>
        <th>id</th>
        <th>Images</th>
        <th>action</th>
    </thead>

    <?php foreach ($archivedImg_results as $img_content) : ?>

        <tbody>
            <td>
                <?php echo $img_content['id']; ?>

            </td>
            <td>
                <img src="../../cms_media/uploads/<?php echo $img_content['media']; ?> " height="150px" width="300px" />
            </td>

            <!-- archive -->
            <td>
                <a href="javascript:void(0)" onclick="confirmArchiveImg(<?php echo $img_content['id']; ?>)">Unarchive</a>
            </td>
        </tbody>
    <?php endforeach; ?>

</table>

<?php include_once "script/script.php"; ?>
<?php include_once "script/imgsScript.php"; ?>