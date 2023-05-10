<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
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

    <div>
        <h4>Total Announcements</h4>
        <?php echo $count_announcements; ?>
    </div>

    <div>
        <h4>Total Events</h4>
        <?php echo $count_events; ?>
    </div>

    <div>
        <h4>Total Post</h4>
        <?php echo $count_total; ?>
    </div>

    <h4>Total Images</h4>
    <?php echo $count_imgs; ?>
    </div>

</body>

</html>