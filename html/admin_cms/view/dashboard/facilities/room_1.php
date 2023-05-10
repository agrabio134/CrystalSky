<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Room</title>
</head>
<body>


<div class="navigation">
        <a href="/SIA/content_ms/cms/index">Panel</a>
        <a href="/SIA/content_ms/cms/content">Content</a>
        <a href="/SIA/content_ms/cms/rooms">Rooms</a>
        <a href="/SIA/content_ms/cms/about">About us</a>

        <br/>
        <br/>

        <a href="/SIA/content_ms/cms/logout">(Temporary)Logout</a>
    </div>


    <form action="../api/routes.php?request=add_room" method="post" enctype="multipart/form-data">
        <input type="number" name="roomNumber" placeholder="Room number">
        <select name="CategoryName" id="CategoryName">
            <option value="single">Single</option>
            <option value="double">Double</option>
            <option value="family">Family</option>
            <option value="suite">Suite</option>
        </select>
        <input type="text" name="roomPrice" placeholder="Room Price">
        <select name="roomStatus" id="roomStatus">
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="reserved">Reserved</option>
            <option value="outOfOrder">Out of Order</option>
        </select>
        <input type="text" name="roomDescription" placeholder="Room Description">
        <label for="media">Media</label>
        <input type="file" name="roomImage" id="roomImage" required>
        <!-- <input type="file" name="roomImage" placeholder="Room Image"> -->
        <input type="submit" value="Submit">
    </form>

    <table>
        <tr>
            <th>Room Number</th>
            <th>Room Status</th>
            <th>Room category</th>
            <th>Room Price</th>
            <th>Room Description</th>
            <th>Room Image</th>
            <th>Action</th>
        </tr>

        <!-- use code below if may database na for the room -->
        <?php foreach ($rooms as $room) : ?>
            <tr>
                <td><?php echo $room['room_number']; ?></td>
                <td><?php echo $room['status']; ?></td>
                <td><?php echo $room['name']; ?></td>
                <td><?php echo $room['price']; ?></td>

                <td><?php echo $room['description']; ?></td>
                <td><img src="../../cms_media/uploads/<?php echo $room['image']; ?>" alt="Room Image" width="100px"></td>
                
                <td>
                    <a href="/cms/room/editRoom?id=<?php echo $room['id']; ?>">Edit</a>
                    <a href="/cms/room/deleteRoom?id=<?php echo $room['id']; ?>">Delete</a>
                </td>
            </tr>
        <?php endforeach; ?>
    </table>

</body>
</html>