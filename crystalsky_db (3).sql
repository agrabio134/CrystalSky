-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 07, 2023 at 09:45 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crystalsky_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `billing_invoice`
--

CREATE TABLE `billing_invoice` (
  `id` int(11) NOT NULL,
  `total_room_charge` float DEFAULT NULL,
  `total_food_charge` float DEFAULT NULL,
  `total_add_on` float DEFAULT NULL,
  `downpayment_amount` float DEFAULT NULL,
  `total_amount` float DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `billing_invoice`
--

INSERT INTO `billing_invoice` (`id`, `total_room_charge`, `total_food_charge`, `total_add_on`, `downpayment_amount`, `total_amount`, `created_at`) VALUES
(1, 5000, 3000, 500, 1000, 7500, '2023-04-04 07:07:42'),
(2, 2000, 1000, 200, 1000, 2200, '2023-04-04 07:07:48'),
(3, 1000, 500, 200, 500, 1200, '2023-04-04 07:07:54'),
(4, 2000, 1000, 1000, 2000, 2000, '2023-04-04 07:07:59'),
(5, 2500, 500, 500, 1000, 2000, '2023-04-04 07:08:32');

-- --------------------------------------------------------

--
-- Table structure for table `cdm_ban`
--

CREATE TABLE `cdm_ban` (
  `id` int(11) NOT NULL,
  `guest_id` int(11) DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cdm_ban`
--

INSERT INTO `cdm_ban` (`id`, `guest_id`, `reason`, `created_at`) VALUES
(1, 1, 'broke a hotel property', '2023-04-04 15:28:52');

-- --------------------------------------------------------

--
-- Table structure for table `cdm_feedback`
--

CREATE TABLE `cdm_feedback` (
  `id` int(11) NOT NULL,
  `guest_id` int(11) DEFAULT NULL,
  `feedback` varchar(255) DEFAULT NULL,
  `rating` tinyint(4) DEFAULT NULL,
  `status` varchar(255) DEFAULT 'Keep'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cdm_feedback`
--

INSERT INTO `cdm_feedback` (`id`, `guest_id`, `feedback`, `rating`, `status`) VALUES
(1, 1, 'really enjoyed its location in the city center where everything is within walking distance. The staff was very helpful, breakfast really delicious, and the room nice. I appreciated the luggage room option as well.', 5, 'KEEP'),
(2, 2, 'bad experience', 2, 'SAVED');

-- --------------------------------------------------------

--
-- Table structure for table `cdm_guest`
--

CREATE TABLE `cdm_guest` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `contact_no` varchar(11) DEFAULT NULL,
  `tel_num` varchar(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `block` varchar(255) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `postal_code` int(11) DEFAULT NULL,
  `role` varchar(255) DEFAULT 'Regular',
  `status` varchar(255) DEFAULT 'Active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cdm_guest`
--

INSERT INTO `cdm_guest` (`id`, `first_name`, `last_name`, `gender`, `contact_no`, `tel_num`, `email`, `username`, `password`, `block`, `street`, `city`, `country`, `postal_code`, `role`, `status`, `created_at`) VALUES
(1, 'Jasper', 'Mamaril', 'Male', '09454738960', '81234567', 'jsprmmrl@gmail.com', 'SCYP', 'password123', 'n/a', 'Rizal', 'Olongapo City', 'Philippines', 2200, 'VIP', 'BANNED', '2023-04-04 16:48:22'),
(2, 'Lou', 'Ballesteros', 'Male', '09283842822', '12345609', 'lbryn@gmail.com', 'cybercrime', 'password123', '12161', 'Ramirez', 'Olongapo City', 'Phillippines', 2200, 'REGULAR', 'ACTIVE', '2023-04-04 16:51:05'),
(3, 'Jmie Lyn', 'Boluntate', 'Female', '09276981790', '12345678', 'jmlynblntt@gmail.com', 'jmlyn86', 'password123', '13', 'Donor', 'Olongapo City', 'Philippines', 2200, 'VIP', 'ACTIVE', '2023-04-04 16:54:32');

-- --------------------------------------------------------

--
-- Table structure for table `cms_about_us`
--

CREATE TABLE `cms_about_us` (
  `id` int(11) NOT NULL,
  `credentials_id` int(11) DEFAULT NULL,
  `icon_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `contact_no` int(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `uploaded_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cms_about_us`
--

INSERT INTO `cms_about_us` (`id`, `credentials_id`, `icon_id`, `title`, `description`, `contact_no`, `email`, `location`, `uploaded_at`) VALUES
(1, 1, 1, 'About Us', 'We are a team of passionate professionals dedicated to delivering high-quality products and services to our clients. Our mission is to help businesses succeed by providing innovative solutions that meet their unique needs. With years of experience and a d', NULL, 'info@mycompany.com', 'New York, NY', '2023-04-05 01:14:21');

-- --------------------------------------------------------

--
-- Table structure for table `cms_announcements`
--

CREATE TABLE `cms_announcements` (
  `id` int(11) NOT NULL,
  `credentials_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `label_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `media` varchar(255) DEFAULT NULL,
  `is_archived` int(11) DEFAULT 0,
  `is_published` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cms_announcements`
--

INSERT INTO `cms_announcements` (`id`, `credentials_id`, `category_id`, `label_id`, `title`, `description`, `media`, `is_archived`, `is_published`, `created_at`) VALUES
(1, NULL, 1, 1, 'New Product Launch', 'We are excited to announce the launch of our new product line, featuring cutting-edge technology and innovative design. Visit our website today to learn more and place your order!', 'image1.jpg', 0, 0, '2023-04-07 15:18:05'),
(2, NULL, 2, 2, 'Upcoming Event', 'Join us for our annual industry conference, where you will have the opportunity to learn from experts in the field, network with peers, and discover new strategies for success. Register now to secure your spot!', 'image1.jpg', 0, 0, '2023-04-07 15:18:10'),
(3, NULL, 3, 3, 'Important Update', 'In response to recent developments, we have updated our privacy policy to better protect our customers\' personal information. Please take a moment to review the changes and contact us with any questions or concerns.', 'image1.jpg', 0, 0, '2023-04-07 15:18:14'),
(4, NULL, 1, 4, 'Limited Time Offer', 'For a limited time only, enjoy exclusive discounts on select products and services. Don\'t miss this opportunity to save big and improve your bottom line. Visit our website or contact us for more information.', 'image1.jpg', 1, 0, '2023-04-07 19:41:34'),
(5, NULL, 2, 5, 'New Hire Announcement', 'We are thrilled to welcome our newest team member, Jane Smith, to the company. With years of experience in the industry and a passion for innovation, Jane will be a valuable asset to our team. Please join us in extending a warm welcome to Jane!', 'image1.jpg', 0, 1, '2023-04-07 19:41:17'),
(6, 1, 1, 2, 'test Announcement', 'this is just a test announcement, see if it\'s uploading', 'testannouncement.jpg', 1, 0, '2023-04-07 19:41:14'),
(15, 1, 1, 4, 'test', 'Enter description here.test..', 'testimg.jpg', 1, 0, '2023-04-07 19:41:22'),
(16, 1, 1, 1, 'test is announcement is workin', 'Enter destest is announcement is workincription here...test is announcement is workin', 'testimg.jpg', 1, 0, '2023-04-07 19:41:25');

-- --------------------------------------------------------

--
-- Table structure for table `cms_categories`
--

CREATE TABLE `cms_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cms_categories`
--

INSERT INTO `cms_categories` (`id`, `name`, `price`, `description`) VALUES
(1, 'STANDARD ROOM', 500, 'test'),
(2, 'DELUXE ROOM', 10000, 'Deluxe rooms are usually larger than standard rooms, have a bathtub and a shower in the bathroom, and have more high-end amenities. Many deluxe hotel rooms are also advertised based on the type of view they provide: bay view, city view, and so on.'),
(3, 'STANDARD ROOM', 5000, 'This room type is separated from the suite. This translates into a room with plain equipment and not-so-fancy as what you might think of. It falls under the category of the hotel\'s least expensive and lowest-priced room.'),
(4, 'DELUXE ROOM', 10000, 'Deluxe rooms are usually larger than standard rooms, have a bathtub and a shower in the bathroom, and have more high-end amenities. Many deluxe hotel rooms are also advertised based on the type of view they provide: bay view, city view, and so on.'),
(5, 'SUITE', 20000, 'Suites typically have a separate living area and bedroom, and may include additional amenities like a kitchenette, dining table, or whirlpool tub.'),
(6, 'PENTHOUSE', 50000, 'Penthouses are typically the most luxurious and spacious accommodations in a hotel, often featuring multiple bedrooms, balconies, and stunning views.'),
(7, 'SPA', 15000, 'Spa rooms are designed for guests who want to enjoy spa treatments and relaxation in the privacy of their own room. These rooms may include massage tables, saunas, or other spa amenities.'),
(8, 'EXECUTIVE', 12000, 'Executive rooms are designed for business travelers, with amenities like a work desk, ergonomic chair, and access to a business center or meeting room.'),
(9, 'FAMILY', 8000, 'Family rooms are designed to accommodate families or larger groups, with multiple beds or a pull-out sofa.'),
(10, 'PET-FRIENDLY', 7000, 'Pet-friendly rooms allow guests to travel with their furry friends, and may include amenities like a pet bed, food and water bowls, and nearby pet-friendly activities.'),
(11, 'ACCESSIBLE', 9000, 'Accessible rooms are designed to accommodate guests with disabilities or mobility issues, with features like wider doorways, grab bars, and roll-in showers.'),
(12, 'OCEAN VIEW', 18000, 'Ocean view rooms offer stunning views of the ocean, and may include a balcony or terrace for guests to enjoy the sights and sounds of the sea.');

-- --------------------------------------------------------

--
-- Table structure for table `cms_content_categ`
--

CREATE TABLE `cms_content_categ` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cms_content_categ`
--

INSERT INTO `cms_content_categ` (`id`, `name`) VALUES
(1, 'Event'),
(2, 'Announcement');

-- --------------------------------------------------------

--
-- Table structure for table `cms_events`
--

CREATE TABLE `cms_events` (
  `id` int(11) NOT NULL,
  `credentials_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `media` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL,
  `is_archived` int(11) DEFAULT 0,
  `is_published` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cms_events`
--

INSERT INTO `cms_events` (`id`, `credentials_id`, `title`, `category_id`, `description`, `media`, `date`, `time`, `is_archived`, `is_published`, `created_at`) VALUES
(1, 3, 'Annual Conference', 2, 'Join us for our annual conference on the latest trends in technology', 'image3.jpg', '2023-08-12', '10:00:00', 0, 0, '2023-04-07 15:19:24'),
(2, 4, 'Product Launch', 2, 'Be the first to know about our latest product launch', 'image3.jpg', '2023-05-18', '14:30:00', 0, 0, '2023-04-07 15:19:27'),
(3, 3, 'Team Building Event', 2, 'Let\'s strengthen our teamwork and have fun at the same time!', 'image3.jpg', '2023-06-30', '09:00:00', 1, 0, '2023-04-07 19:42:17'),
(4, 5, 'Holiday Party', 1, 'Celebrate the holiday season with us!', 'image3.jpg', '2023-12-22', '18:00:00', 1, 1, '2023-04-07 19:42:14'),
(5, 2, 'Training Session', 2, 'Join our training session on effective communication skills', 'image3.jpg', '2023-04-20', '11:00:00', 1, 1, '2023-04-07 19:42:10'),
(9, 1, 'this is another test data', 2, 'test description', 'about.jpg', '0000-00-00', '05:05:00', 1, 0, '2023-04-07 19:24:17');

-- --------------------------------------------------------

--
-- Table structure for table `cms_gallery`
--

CREATE TABLE `cms_gallery` (
  `id` int(11) NOT NULL,
  `credentials_id` int(11) DEFAULT NULL,
  `media` varchar(255) DEFAULT NULL,
  `is_published` tinyint(4) DEFAULT 0,
  `is_archived` tinyint(4) DEFAULT 0,
  `uploaded_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cms_gallery`
--

INSERT INTO `cms_gallery` (`id`, `credentials_id`, `media`, `is_published`, `is_archived`, `uploaded_at`) VALUES
(1, 1, 'image1.jpg', 1, 0, '2023-04-07 19:44:09'),
(2, 1, 'image2.jpg', 0, 1, '2023-04-07 19:44:21'),
(3, 2, 'image3.jpg', 0, 1, '2023-04-07 19:44:02'),
(4, 2, 'image4.jpg', 0, 1, '2023-04-07 19:43:56'),
(5, 3, 'image5.jpg', 0, 1, '2023-04-07 19:44:12');

-- --------------------------------------------------------

--
-- Table structure for table `cms_icon`
--

CREATE TABLE `cms_icon` (
  `id` int(11) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cms_icon`
--

INSERT INTO `cms_icon` (`id`, `description`, `image`) VALUES
(1, 'Edit icon', 'icon1.png'),
(2, 'Save icon', 'icon2.png'),
(3, 'Upload icon', 'icon3.png'),
(4, 'Email icon', 'icon4.png'),
(5, 'Logout icon', 'icon5.png');

-- --------------------------------------------------------

--
-- Table structure for table `cms_label`
--

CREATE TABLE `cms_label` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cms_label`
--

INSERT INTO `cms_label` (`id`, `name`, `color`) VALUES
(1, 'Triathlon', 'green'),
(2, 'Birthday', 'pink'),
(3, 'Dinning', 'blue'),
(4, 'Wedding', 'red'),
(5, 'Aerobics', 'lightblue'),
(6, 'Pool parties', 'brown');

-- --------------------------------------------------------

--
-- Table structure for table `cms_rooms`
--

CREATE TABLE `cms_rooms` (
  `id` int(11) NOT NULL,
  `room_number` int(11) DEFAULT NULL,
  `status` int(50) DEFAULT NULL,
  `is_published` int(11) NOT NULL DEFAULT 0,
  `category_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cms_rooms`
--

INSERT INTO `cms_rooms` (`id`, `room_number`, `status`, `is_published`, `category_id`, `created_at`) VALUES
(1, 101, 1, 1, 1, '2023-04-05 08:29:18'),
(2, 102, 2, 1, 1, '2023-04-05 08:29:40'),
(3, 103, 3, 1, 2, '2023-04-05 08:29:47'),
(4, 104, 4, 0, 2, '2023-04-07 17:07:51'),
(5, 105, 1, 0, 1, '2023-04-07 17:07:34'),
(6, 106, 2, 0, 3, '2023-04-07 17:06:46'),
(7, 107, 3, 0, 1, '2023-04-05 01:14:21'),
(8, 108, 2, 0, 4, '2023-04-07 17:06:50'),
(9, 109, 1, 0, 1, '2023-04-05 01:14:21'),
(10, 110, 2, 0, 1, '2023-04-05 01:14:21');

-- --------------------------------------------------------

--
-- Table structure for table `cms_room_images`
--

CREATE TABLE `cms_room_images` (
  `id` int(11) NOT NULL,
  `room_id` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cms_room_images`
--

INSERT INTO `cms_room_images` (`id`, `room_id`, `image`) VALUES
(1, 1, 'image1.jpg'),
(2, 2, 'image2.jpg'),
(3, 3, 'image3.jpg'),
(4, 4, 'image4.jpg'),
(5, 5, 'image5.jpg'),
(6, 0, 'room_643057d41c48c.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `ems_credentials`
--

CREATE TABLE `ems_credentials` (
  `id` int(11) NOT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT 'password123',
  `token` varchar(255) DEFAULT NULL,
  `created_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ems_credentials`
--

INSERT INTO `ems_credentials` (`id`, `employee_id`, `username`, `password`, `token`, `created_at`) VALUES
(1, 1, 'kpadua', 'password123', NULL, NULL),
(2, 2, 'jsmith', 'password123', NULL, NULL),
(3, 3, 'mcruz', 'password123', NULL, NULL),
(4, 6, 'karpadua', 'password123', NULL, NULL),
(5, 7, 'jpopovich', 'password123', NULL, NULL),
(6, 8, 'mpimentel', 'password123', NULL, NULL),
(7, 9, 'mclara', 'password123', NULL, NULL),
(8, 10, 'bken', 'password123', NULL, NULL),
(9, 11, 'csky', 'password123', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ems_departments`
--

CREATE TABLE `ems_departments` (
  `id` int(11) NOT NULL,
  `department_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ems_departments`
--

INSERT INTO `ems_departments` (`id`, `department_name`) VALUES
(1, 'IT'),
(2, 'Human Resources'),
(3, 'Accounting'),
(4, 'Front Office'),
(5, 'Housekeeping'),
(6, 'Security'),
(7, 'Kitchen'),
(8, 'Back Office'),
(9, 'Sales');

-- --------------------------------------------------------

--
-- Table structure for table `ems_employees`
--

CREATE TABLE `ems_employees` (
  `id` int(11) NOT NULL,
  `employee_number` varchar(255) DEFAULT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `house_number` varchar(255) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `barangay` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `contact_number` varchar(255) DEFAULT NULL,
  `dept_id` int(11) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `salary` float DEFAULT NULL,
  `hourly_rate` float DEFAULT NULL,
  `shift_in` time DEFAULT NULL,
  `shift_out` time DEFAULT NULL,
  `status` varchar(255) DEFAULT 'Active',
  `profile_pic` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ems_employees`
--

INSERT INTO `ems_employees` (`id`, `employee_number`, `fullname`, `firstname`, `lastname`, `gender`, `birthday`, `house_number`, `street`, `barangay`, `city`, `contact_number`, `dept_id`, `position`, `salary`, `hourly_rate`, `shift_in`, `shift_out`, `status`, `profile_pic`) VALUES
(1, '0001', 'Kim Padua', 'Kim', 'Padua', 'Male', '1994-05-30', '114', 'Hansen Street', 'East Tapinac', 'Olongapo City', '09076625319', 1, 'Associate', 10000, 62.5, '07:00:00', '15:00:00', 'Active', '../../assets/SUBSYSTEM_PHOTOS/EMS/profile_pic/default_boy.png'),
(2, '0002', 'James Smith', 'James', 'Smith', 'Male', '1998-09-21', '20', 'Ohio Street', 'Kalaklan', 'Olongapo City', '09076611111', 2, 'Associate', 10000, 62.5, '07:00:00', '15:00:00', 'Inactive', '../../assets/SUBSYSTEM_PHOTOS/EMS/profile_pic/default_boy.png'),
(3, '0003', 'Mark Cruz', 'Mark', 'Cruz', 'Male', '2002-06-04', '29', '23rd Street', 'East Bajac-bajac', 'Olongapo City', '09080102003', 3, 'Associate', 10000, 62.5, '07:00:00', '15:00:00', 'Active', '../../assets/SUBSYSTEM_PHOTOS/EMS/profile_pic/default_boy.png'),
(6, '0004', 'Karen Padua', 'Karen', 'Padua', 'Female', '1994-05-30', '114', 'Hansen Street', 'East Tapinac', 'Olongapo City', '09076625319', 1, 'Associate', 10000, 62.5, '07:00:00', '15:00:00', 'Inactive', '../../assets/SUBSYSTEM_PHOTOS/EMS/profile_pic/default_girl.png'),
(7, '0005', 'James Popovich', 'James', 'Popovich', 'Male', '1998-09-21', '20', 'Ohio Street', 'Kalaklan', 'Olongapo City', '09076611111', 2, 'Associate', 10000, 62.5, '07:00:00', '15:00:00', 'Active', '../../assets/SUBSYSTEM_PHOTOS/EMS/profile_pic/default_boy.png'),
(8, '0006', 'Mark Pimentel', 'Mark', 'Pimentel', 'Male', '2002-06-04', '29', '23rd Street', 'East Bajac-bajac', 'Olongapo City', '09080102003', 3, 'Associate', 10000, 62.5, '07:00:00', '15:00:00', 'Inactive', '../../assets/SUBSYSTEM_PHOTOS/EMS/profile_pic/default_boy.png'),
(9, '0007', 'Maria Clara', 'Maria', 'Clara', 'Female', '1994-05-30', '114', 'Hansen Street', 'East Tapinac', 'Olongapo City', '09076625319', 1, 'Associate', 10000, 62.5, '07:00:00', '15:00:00', 'Active', '../../assets/SUBSYSTEM_PHOTOS/EMS/profile_pic/default_girl.png'),
(10, '0008', 'Barbie Ken', 'Barbie', 'Ken', 'Female', '1998-09-21', '20', 'Ohio Street', 'Kalaklan', 'Olongapo City', '09076611111', 2, 'Associate', 10000, 62.5, '07:00:00', '15:00:00', 'Inactive', '../../assets/SUBSYSTEM_PHOTOS/EMS/profile_pic/default_girl.png'),
(11, '0009', 'Crystal Sky', 'Crystal', 'Sky', 'Female', '2002-06-04', '29', '23rd Street', 'East Bajac-bajac', 'Olongapo City', '09080102003', 3, 'Associate', 10000, 62.5, '07:00:00', '15:00:00', 'Active', '../../assets/SUBSYSTEM_PHOTOS/EMS/profile_pic/default_girl.png');

-- --------------------------------------------------------

--
-- Table structure for table `ems_holidays`
--

CREATE TABLE `ems_holidays` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `holiday_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ems_leavebalances`
--

CREATE TABLE `ems_leavebalances` (
  `id` int(11) NOT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `sick_leave` int(11) DEFAULT NULL,
  `vacation_leave` int(11) DEFAULT NULL,
  `personal_leave` int(11) DEFAULT NULL,
  `maternity_leave` int(11) DEFAULT NULL,
  `paternity_leave` int(11) DEFAULT NULL,
  `solo_parent` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ems_leavefiles`
--

CREATE TABLE `ems_leavefiles` (
  `id` int(11) NOT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `dates` date DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ems_payhistory`
--

CREATE TABLE `ems_payhistory` (
  `id` int(11) NOT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `month` varchar(255) DEFAULT NULL,
  `period` varchar(255) DEFAULT NULL,
  `year` varchar(255) DEFAULT NULL,
  `reg_basic` float DEFAULT NULL,
  `bonus` float DEFAULT NULL,
  `leave_pay` float DEFAULT NULL,
  `reg_nd` float DEFAULT NULL,
  `rh_basic` float DEFAULT NULL,
  `rh_nd` float DEFAULT NULL,
  `sh_basic` float DEFAULT NULL,
  `sh_nd` float DEFAULT NULL,
  `hdmf_deduction` float DEFAULT NULL,
  `sss_deduction` float DEFAULT NULL,
  `pagibig_deduction` float DEFAULT NULL,
  `total_deductions` float DEFAULT NULL,
  `gross_earning` float DEFAULT NULL,
  `net_pay` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ems_timelogs`
--

CREATE TABLE `ems_timelogs` (
  `id` int(11) NOT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `timelog` time DEFAULT NULL,
  `date_filed` date DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ems_timerecords`
--

CREATE TABLE `ems_timerecords` (
  `id` int(11) NOT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `dates` date DEFAULT NULL,
  `day` varchar(255) DEFAULT NULL,
  `time_in` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `timeout` time DEFAULT NULL,
  `hours` float DEFAULT NULL,
  `overtime` float DEFAULT NULL,
  `tardy` float DEFAULT NULL,
  `undertime` float DEFAULT NULL,
  `night_dif` float DEFAULT NULL,
  `is_holiday` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `housekeeping_roomstatus`
--

CREATE TABLE `housekeeping_roomstatus` (
  `id` int(11) NOT NULL,
  `roomstatus_name` varchar(255) DEFAULT NULL,
  `roomstatus_description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `housekeeping_roomstatus`
--

INSERT INTO `housekeeping_roomstatus` (`id`, `roomstatus_name`, `roomstatus_description`) VALUES
(1, 'Vacant Dirty', 'The room is dirty.'),
(2, 'Vacant Clean', 'The room is clean, but not yet inspected'),
(3, 'Vacant Clean Inspected', 'The room is clean and fully inspected.'),
(4, 'Out of Order', 'Room Maintenance');

-- --------------------------------------------------------

--
-- Table structure for table `housekeeping_tasks`
--

CREATE TABLE `housekeeping_tasks` (
  `id` int(11) NOT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `task_name` varchar(255) DEFAULT NULL,
  `task_description` varchar(255) DEFAULT NULL,
  `task_status` varchar(255) DEFAULT NULL,
  `task_time` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `housekeeping_tasks`
--

INSERT INTO `housekeeping_tasks` (`id`, `employee_id`, `task_name`, `task_description`, `task_status`, `task_time`) VALUES
(1, 1, 'Clean room 101', 'Vacuum floors, dust furniture, clean bathroom, make bed, and restock amenities', 'Incomplete', '09:00:00'),
(2, 2, 'Clean room 102', 'Change linens, dust furniture, tidy up room, clean bathroom, and empty trash cans', 'Complete', '10:30:00'),
(3, 3, 'Clean room 103', 'Clean bathroom, dust surfaces, and mop floors', 'Incomplete', '12:00:00'),
(4, 6, 'Clean room 104', 'Vacuum floors, dust furniture, make bed, and restock amenities', 'Complete', '14:00:00'),
(5, 7, 'Clean room 105', 'Mop floors, wipe surfaces, clean bathroom, and empty trash cans', 'Incomplete', '16:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `inventory_edit_history`
--

CREATE TABLE `inventory_edit_history` (
  `id` int(11) NOT NULL,
  `credentials_id` int(11) DEFAULT NULL,
  `prod_id` int(11) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `inventory_orders`
--

CREATE TABLE `inventory_orders` (
  `id` int(11) NOT NULL,
  `supp_id` int(11) DEFAULT NULL,
  `prod_id` int(11) DEFAULT NULL,
  `prod_price` float DEFAULT NULL,
  `expenses` int(11) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `inventory_products`
--

CREATE TABLE `inventory_products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `amount` float DEFAULT NULL,
  `price` float DEFAULT NULL,
  `unit` varchar(255) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `inventory_purchase`
--

CREATE TABLE `inventory_purchase` (
  `id` int(11) NOT NULL,
  `prod_id` int(11) DEFAULT NULL,
  `supp_id` int(11) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `inventory_requests`
--

CREATE TABLE `inventory_requests` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `supplier_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `inventory_suppliers`
--

CREATE TABLE `inventory_suppliers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `contact` int(11) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `inventory_transactions`
--

CREATE TABLE `inventory_transactions` (
  `id` int(11) NOT NULL,
  `prod_id` int(11) DEFAULT NULL,
  `purch_id` int(11) DEFAULT NULL,
  `order_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pos_cart`
--

CREATE TABLE `pos_cart` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `dish_id` int(11) DEFAULT NULL,
  `item_quantity` varchar(255) DEFAULT NULL,
  `item_total` float DEFAULT NULL,
  `grand_total` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pos_dish`
--

CREATE TABLE `pos_dish` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pos_ingredient`
--

CREATE TABLE `pos_ingredient` (
  `id` int(11) NOT NULL,
  `dish_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pos_orders`
--

CREATE TABLE `pos_orders` (
  `id` int(11) NOT NULL,
  `invoice_id` int(11) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `table_id` int(11) DEFAULT NULL,
  `time` time DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `payment_mode` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `is_paid` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pos_table`
--

CREATE TABLE `pos_table` (
  `id` int(11) NOT NULL,
  `is_avail` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reservation_addons`
--

CREATE TABLE `reservation_addons` (
  `id` int(11) NOT NULL,
  `invoice_id` int(11) DEFAULT NULL,
  `commodity` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `amount` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reservation_appointments`
--

CREATE TABLE `reservation_appointments` (
  `id` int(11) NOT NULL,
  `guest_id` int(11) DEFAULT NULL,
  `room_id` int(11) DEFAULT NULL,
  `facility_id` int(11) DEFAULT NULL,
  `invoice_id` int(11) DEFAULT NULL,
  `check_in` date DEFAULT NULL,
  `check_out` date DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reservation_appointments`
--

INSERT INTO `reservation_appointments` (`id`, `guest_id`, `room_id`, `facility_id`, `invoice_id`, `check_in`, `check_out`, `status`, `created_at`) VALUES
(1, 1, 1, NULL, NULL, '2023-04-18', '2023-04-20', 'TENTATIVE', '2023-04-04 04:06:40'),
(2, 2, 2, NULL, NULL, '2023-04-25', '2023-04-27', 'TENTATIVE', '2023-04-04 04:17:23'),
(3, 2, 2, NULL, NULL, '2023-04-25', '2023-04-27', 'COMPLETE', '2023-04-04 04:17:44');

-- --------------------------------------------------------

--
-- Table structure for table `reservation_facilities`
--

CREATE TABLE `reservation_facilities` (
  `id` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `billing_invoice`
--
ALTER TABLE `billing_invoice`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cdm_ban`
--
ALTER TABLE `cdm_ban`
  ADD PRIMARY KEY (`id`),
  ADD KEY `guest_id` (`guest_id`);

--
-- Indexes for table `cdm_feedback`
--
ALTER TABLE `cdm_feedback`
  ADD PRIMARY KEY (`id`),
  ADD KEY `guest_id` (`guest_id`);

--
-- Indexes for table `cdm_guest`
--
ALTER TABLE `cdm_guest`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cms_about_us`
--
ALTER TABLE `cms_about_us`
  ADD PRIMARY KEY (`id`),
  ADD KEY `icon_id` (`icon_id`),
  ADD KEY `credentials_id` (`credentials_id`);

--
-- Indexes for table `cms_announcements`
--
ALTER TABLE `cms_announcements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `label_id` (`label_id`),
  ADD KEY `credentials_id` (`credentials_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `cms_categories`
--
ALTER TABLE `cms_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cms_content_categ`
--
ALTER TABLE `cms_content_categ`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cms_events`
--
ALTER TABLE `cms_events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `credentials_id` (`credentials_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `cms_gallery`
--
ALTER TABLE `cms_gallery`
  ADD PRIMARY KEY (`id`),
  ADD KEY `credentials_id` (`credentials_id`);

--
-- Indexes for table `cms_icon`
--
ALTER TABLE `cms_icon`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cms_label`
--
ALTER TABLE `cms_label`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cms_rooms`
--
ALTER TABLE `cms_rooms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `status` (`status`);

--
-- Indexes for table `cms_room_images`
--
ALTER TABLE `cms_room_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `room_id` (`room_id`);

--
-- Indexes for table `ems_credentials`
--
ALTER TABLE `ems_credentials`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `ems_departments`
--
ALTER TABLE `ems_departments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ems_employees`
--
ALTER TABLE `ems_employees`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `employee_number` (`employee_number`),
  ADD KEY `dept_id` (`dept_id`);

--
-- Indexes for table `ems_holidays`
--
ALTER TABLE `ems_holidays`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ems_leavebalances`
--
ALTER TABLE `ems_leavebalances`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `ems_leavefiles`
--
ALTER TABLE `ems_leavefiles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `ems_payhistory`
--
ALTER TABLE `ems_payhistory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `ems_timelogs`
--
ALTER TABLE `ems_timelogs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `ems_timerecords`
--
ALTER TABLE `ems_timerecords`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee_id` (`employee_id`),
  ADD KEY `is_holiday` (`is_holiday`);

--
-- Indexes for table `housekeeping_roomstatus`
--
ALTER TABLE `housekeeping_roomstatus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `housekeeping_tasks`
--
ALTER TABLE `housekeeping_tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `inventory_edit_history`
--
ALTER TABLE `inventory_edit_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `credentials_id` (`credentials_id`),
  ADD KEY `prod_id` (`prod_id`);

--
-- Indexes for table `inventory_orders`
--
ALTER TABLE `inventory_orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `supp_id` (`supp_id`),
  ADD KEY `prod_id` (`prod_id`);

--
-- Indexes for table `inventory_products`
--
ALTER TABLE `inventory_products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inventory_purchase`
--
ALTER TABLE `inventory_purchase`
  ADD PRIMARY KEY (`id`),
  ADD KEY `prod_id` (`prod_id`),
  ADD KEY `supp_id` (`supp_id`);

--
-- Indexes for table `inventory_requests`
--
ALTER TABLE `inventory_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `supplier_id` (`supplier_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `inventory_suppliers`
--
ALTER TABLE `inventory_suppliers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inventory_transactions`
--
ALTER TABLE `inventory_transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `prod_id` (`prod_id`),
  ADD KEY `purch_id` (`purch_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `pos_cart`
--
ALTER TABLE `pos_cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dish_id` (`dish_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `pos_dish`
--
ALTER TABLE `pos_dish`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pos_ingredient`
--
ALTER TABLE `pos_ingredient`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dish_id` (`dish_id`);

--
-- Indexes for table `pos_orders`
--
ALTER TABLE `pos_orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `invoice_id` (`invoice_id`),
  ADD KEY `table_id` (`table_id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `pos_table`
--
ALTER TABLE `pos_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reservation_addons`
--
ALTER TABLE `reservation_addons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `invoice_id` (`invoice_id`);

--
-- Indexes for table `reservation_appointments`
--
ALTER TABLE `reservation_appointments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `invoice_id` (`invoice_id`),
  ADD KEY `room_id` (`room_id`),
  ADD KEY `facility_id` (`facility_id`),
  ADD KEY `guest_id` (`guest_id`);

--
-- Indexes for table `reservation_facilities`
--
ALTER TABLE `reservation_facilities`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `billing_invoice`
--
ALTER TABLE `billing_invoice`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `cdm_ban`
--
ALTER TABLE `cdm_ban`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cdm_feedback`
--
ALTER TABLE `cdm_feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `cdm_guest`
--
ALTER TABLE `cdm_guest`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `cms_about_us`
--
ALTER TABLE `cms_about_us`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cms_announcements`
--
ALTER TABLE `cms_announcements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `cms_categories`
--
ALTER TABLE `cms_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `cms_content_categ`
--
ALTER TABLE `cms_content_categ`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `cms_events`
--
ALTER TABLE `cms_events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `cms_gallery`
--
ALTER TABLE `cms_gallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `cms_icon`
--
ALTER TABLE `cms_icon`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `cms_label`
--
ALTER TABLE `cms_label`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `cms_rooms`
--
ALTER TABLE `cms_rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `cms_room_images`
--
ALTER TABLE `cms_room_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `ems_credentials`
--
ALTER TABLE `ems_credentials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `ems_departments`
--
ALTER TABLE `ems_departments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `ems_employees`
--
ALTER TABLE `ems_employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `ems_holidays`
--
ALTER TABLE `ems_holidays`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ems_leavebalances`
--
ALTER TABLE `ems_leavebalances`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ems_leavefiles`
--
ALTER TABLE `ems_leavefiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ems_payhistory`
--
ALTER TABLE `ems_payhistory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ems_timelogs`
--
ALTER TABLE `ems_timelogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ems_timerecords`
--
ALTER TABLE `ems_timerecords`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `housekeeping_roomstatus`
--
ALTER TABLE `housekeeping_roomstatus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `housekeeping_tasks`
--
ALTER TABLE `housekeeping_tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `inventory_edit_history`
--
ALTER TABLE `inventory_edit_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inventory_orders`
--
ALTER TABLE `inventory_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inventory_products`
--
ALTER TABLE `inventory_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inventory_purchase`
--
ALTER TABLE `inventory_purchase`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inventory_requests`
--
ALTER TABLE `inventory_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inventory_suppliers`
--
ALTER TABLE `inventory_suppliers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inventory_transactions`
--
ALTER TABLE `inventory_transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pos_cart`
--
ALTER TABLE `pos_cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pos_dish`
--
ALTER TABLE `pos_dish`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pos_ingredient`
--
ALTER TABLE `pos_ingredient`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pos_orders`
--
ALTER TABLE `pos_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pos_table`
--
ALTER TABLE `pos_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reservation_addons`
--
ALTER TABLE `reservation_addons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reservation_appointments`
--
ALTER TABLE `reservation_appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `reservation_facilities`
--
ALTER TABLE `reservation_facilities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cdm_ban`
--
ALTER TABLE `cdm_ban`
  ADD CONSTRAINT `cdm_ban_ibfk_1` FOREIGN KEY (`guest_id`) REFERENCES `cdm_guest` (`id`);

--
-- Constraints for table `cdm_feedback`
--
ALTER TABLE `cdm_feedback`
  ADD CONSTRAINT `cdm_feedback_ibfk_1` FOREIGN KEY (`guest_id`) REFERENCES `cdm_guest` (`id`);

--
-- Constraints for table `cms_about_us`
--
ALTER TABLE `cms_about_us`
  ADD CONSTRAINT `cms_about_us_ibfk_1` FOREIGN KEY (`icon_id`) REFERENCES `cms_icon` (`id`),
  ADD CONSTRAINT `cms_about_us_ibfk_2` FOREIGN KEY (`credentials_id`) REFERENCES `ems_credentials` (`id`);

--
-- Constraints for table `cms_events`
--
ALTER TABLE `cms_events`
  ADD CONSTRAINT `cms_events_ibfk_1` FOREIGN KEY (`credentials_id`) REFERENCES `ems_credentials` (`id`),
  ADD CONSTRAINT `cms_events_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `cms_content_categ` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
