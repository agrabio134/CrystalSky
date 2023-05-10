-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 10, 2023 at 11:01 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crystalsky_db_5`
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
  `balance` float DEFAULT NULL,
  `total_amount` float DEFAULT NULL,
  `payment_status` varchar(15) NOT NULL DEFAULT 'Unpaid' COMMENT 'status = unpaid, paid',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `billing_invoice`
--

INSERT INTO `billing_invoice` (`id`, `total_room_charge`, `total_food_charge`, `total_add_on`, `downpayment_amount`, `balance`, `total_amount`, `payment_status`, `created_at`) VALUES
(1, 5000, 3000, 500, 1000, 7500, 8500, 'Unpaid', '2023-04-10 08:20:18'),
(2, 2000, 1000, 200, 1000, 2200, 3200, 'Unpaid', '2023-04-10 08:22:48'),
(3, 1000, 500, 200, 500, 1200, 1700, 'Unpaid', '2023-04-10 08:22:56'),
(4, 2000, 1000, 1000, 2000, 2000, 4000, 'Unpaid', '2023-04-10 08:23:36'),
(5, 2500, 500, 500, 1000, 2000, 3000, 'Unpaid', '2023-04-10 08:23:42');

-- --------------------------------------------------------

--
-- Table structure for table `cdm_ban`
--

CREATE TABLE `cdm_ban` (
  `id` int(11) NOT NULL,
  `guest_id` int(11) DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `banning_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cdm_ban`
--

INSERT INTO `cdm_ban` (`id`, `guest_id`, `reason`, `banning_date`) VALUES
(101, 4, 'awdasd', '2023-04-08 06:58:08'),
(102, 1, 'awdasd', '2023-04-08 06:58:11'),
(103, 1, 'ban sample 2', '2023-04-08 07:36:32'),
(104, 1, 'ban sample 3', '2023-04-08 07:36:43'),
(105, 2, 'awdasd', '2023-04-08 07:37:07'),
(106, 3, 'yes', '2023-04-08 09:11:58'),
(107, 1, 'awdasdawd sample 4', '2023-04-08 10:32:17'),
(108, 4, 'wadasd', '2023-04-09 23:53:38');

-- --------------------------------------------------------

--
-- Table structure for table `cdm_cancellation`
--

CREATE TABLE `cdm_cancellation` (
  `id` int(11) NOT NULL,
  `reservation_appointments_id` int(11) NOT NULL,
  `remarks` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cdm_cancellation`
--

INSERT INTO `cdm_cancellation` (`id`, `reservation_appointments_id`, `remarks`) VALUES
(18, 4, 'yes'),
(19, 5, 'awdasd'),
(20, 5, 'health issue'),
(21, 5, 'awdsadwasd'),
(22, 6, 'asdwa'),
(23, 7, 'awdasd'),
(24, 7, 'awdasd'),
(25, 7, 'awdasd'),
(26, 5, 'awdasd'),
(27, 6, 'testing');

-- --------------------------------------------------------

--
-- Table structure for table `cdm_feedback`
--

CREATE TABLE `cdm_feedback` (
  `id` int(11) NOT NULL,
  `guest_id` int(11) DEFAULT NULL,
  `reservation_appointments_id` int(11) DEFAULT NULL,
  `feedback` longtext DEFAULT NULL,
  `rating` tinyint(4) DEFAULT NULL,
  `status` varchar(255) DEFAULT 'KEEP' COMMENT 'ACCEPT, KEEP, SAVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cdm_feedback`
--

INSERT INTO `cdm_feedback` (`id`, `guest_id`, `reservation_appointments_id`, `feedback`, `rating`, `status`) VALUES
(32, 4, 2, '\"The hotel room was clean, nice and spacious. Breakfast offered with a wide variety of food. The staff were friendly and helpful. The location is just perfect for a walk around the city centre.\"', 5, 'SAVE'),
(33, 1, 3, '\"The hotel located in the city center and lots of public transport, nearby restaurants, bars etc. The hotel staff are nice and friendly. Breakfast not bad. The room a bit small but the bed is really comfortable.\"', 5, 'KEEP'),
(34, 2, 4, 'bad service and hospitality', 1, 'KEEP'),
(35, NULL, 4, 'awdsad', NULL, 'KEEP');

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
  `barangay` varchar(255) DEFAULT NULL,
  `block_street` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `postal_code` int(11) DEFAULT NULL,
  `role` varchar(255) DEFAULT 'Regular',
  `status` varchar(255) DEFAULT 'Active',
  `profile_picture` longtext NOT NULL DEFAULT './images/default_profile.png',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cdm_guest`
--

INSERT INTO `cdm_guest` (`id`, `first_name`, `last_name`, `gender`, `contact_no`, `tel_num`, `email`, `username`, `password`, `barangay`, `block_street`, `city`, `country`, `postal_code`, `role`, `status`, `profile_picture`, `created_at`) VALUES
(1, 'Jasper', 'Dela Cruz', 'Male', '09454738960', '12345678', 'jsprmm@gmail.com', 'SCYP', 'password123', 'Barretto', '19 Rizal', 'Olongapo City', 'Philippines', 2200, 'REGULAR', 'BANNED', './images/default_profile.png', '2023-04-10 01:24:22'),
(2, 'Lou', 'Ballesteros', 'Male', '09283842822', '12345609', 'lbryn@gmail.com', 'cybercrime', 'password123', 'Gordon Heights', 'Ramirez', 'Olongapo City', 'Phillippines', 2200, 'VIP', 'ACTIVE', './images/default_profile.png', '2023-04-08 10:32:52'),
(3, 'Jmie Lyn', 'Boluntate', 'Female', '09276981790', '12345678', 'jmlynblntt@gmail.com', 'jmlyn86', 'password123', 'East Tapinac', 'Donor', 'Olongapo City', 'Philippines', 2200, 'REGULAR', 'BANNED', './images/default_profile.png', '2023-04-08 09:11:58'),
(4, 'Amil', 'Musa', 'Male', '09198119666', '12345678', 'amilmusa02@gmail.com', 'amilbans', '$2y$10$YzkzOWY1MmRmNDdmMTAwO.vmURzrJjoAn9ItpQnrSeltMOK2sZkWa', 'Mabayuan', 'Filtration', 'Olongapo', 'Philippines', 2200, 'LOYAL', 'ACTIVE', './images/default_profile.png', '2023-04-09 23:53:44');

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
  `is_published` tinyint(4) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cms_announcements`
--

INSERT INTO `cms_announcements` (`id`, `credentials_id`, `category_id`, `label_id`, `title`, `description`, `media`, `is_archived`, `is_published`, `created_at`) VALUES
(1, NULL, 1, 1, 'New Product Launch', 'We are excited to announce the launch of our new product line, featuring cutting-edge technology and innovative design. Visit our website today to learn more and place your order!', 'https://example.com/product-launch.jpg', 0, 0, '2023-04-05 01:14:21'),
(2, NULL, 2, 2, 'Upcoming Event', 'Join us for our annual industry conference, where you will have the opportunity to learn from experts in the field, network with peers, and discover new strategies for success. Register now to secure your spot!', 'flyer.pdf', 0, 0, '2023-04-05 01:14:21'),
(3, NULL, 3, 3, 'Important Update', 'In response to recent developments, we have updated our privacy policy to better protect our customers\' personal information. Please take a moment to review the changes and contact us with any questions or concerns.', NULL, 0, 0, '2023-04-05 01:14:21'),
(4, NULL, 1, 4, 'Limited Time Offer', 'For a limited time only, enjoy exclusive discounts on select products and services. Don\'t miss this opportunity to save big and improve your bottom line. Visit our website or contact us for more information.', 'banner.jpg', 0, 0, '2023-04-05 01:14:21'),
(5, NULL, 2, 5, 'New Hire Announcement', 'We are thrilled to welcome our newest team member, Jane Smith, to the company. With years of experience in the industry and a passion for innovation, Jane will be a valuable asset to our team. Please join us in extending a warm welcome to Jane!', 'welcome-jane.jpg', 0, 0, '2023-04-05 01:14:21');

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
(1, 'STANDARD ROOM', 5000, 'This room type is separated from the suite. This translates into a room with plain equipment and not-so-fancy as what you might think of. It falls under the category of the hotel\'s least expensive and lowest-priced room.'),
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
  `is_published` tinyint(4) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cms_events`
--

INSERT INTO `cms_events` (`id`, `credentials_id`, `title`, `category_id`, `description`, `media`, `date`, `time`, `is_archived`, `is_published`, `created_at`) VALUES
(1, 3, 'Annual Conference', 2, 'Join us for our annual conference on the latest trends in technology', 'conference.jpg', '2023-08-12', '10:00:00', 0, 0, '2023-04-05 01:14:21'),
(2, 4, 'Product Launch', 2, 'Be the first to know about our latest product launch', 'product_launch.mp4', '2023-05-18', '14:30:00', 0, 0, '2023-04-05 01:14:21'),
(3, 3, 'Team Building Event', 2, 'Let\'s strengthen our teamwork and have fun at the same time!', 'team_building.png', '2023-06-30', '09:00:00', 0, 0, '2023-04-05 01:14:21'),
(4, 5, 'Holiday Party', 1, 'Celebrate the holiday season with us!', 'holiday_party.jpg', '2023-12-22', '18:00:00', 0, 0, '2023-04-05 01:14:21'),
(5, 2, 'Training Session', 2, 'Join our training session on effective communication skills', 'training_session.pdf', '2023-04-20', '11:00:00', 0, 0, '2023-04-05 01:14:21');

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
(1, 1, 'image1.jpg', 1, 0, '2023-04-05 01:14:21'),
(2, 1, 'image2.jpg', 1, 0, '2023-04-05 01:14:21'),
(3, 2, 'image3.jpg', 0, 0, '2023-04-05 01:14:21'),
(4, 2, 'image4.jpg', 1, 1, '2023-04-05 01:14:21'),
(5, 3, 'image5.jpg', 1, 0, '2023-04-05 01:14:21');

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
  `category_id` int(11) DEFAULT NULL,
  `is_published` tinyint(4) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cms_rooms`
--

INSERT INTO `cms_rooms` (`id`, `room_number`, `status`, `category_id`, `is_published`, `created_at`) VALUES
(1, 101, 1, 1, 0, '2023-04-04 19:40:53'),
(2, 102, 2, 1, 0, '2023-04-04 19:41:11'),
(3, 103, 3, 2, 0, '2023-04-04 19:41:18'),
(4, 104, 4, 2, 0, '2023-04-04 19:41:26'),
(5, 105, 1, 1, 0, '2023-04-05 01:14:21'),
(6, 106, 2, 1, 0, '2023-04-05 01:14:21'),
(7, 107, 3, 1, 0, '2023-04-05 01:14:21'),
(8, 108, 2, 1, 0, '2023-04-05 01:14:21'),
(9, 109, 1, 1, 0, '2023-04-05 01:14:21'),
(10, 110, 2, 1, 0, '2023-04-05 01:14:21');

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
(5, 5, 'image5.jpg');

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
  `created_at` date DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ems_credentials`
--

INSERT INTO `ems_credentials` (`id`, `employee_id`, `username`, `password`, `token`, `created_at`) VALUES
(1, 1, 'kpadua', '$2y$10$ZjBkMDg2ZWRmNGI2MmQ3MeYJJhjPm/8/2zXndvw5/GmbEnpxscm.6', NULL, NULL),
(2, 2, 'jsmith', '$2y$10$ZjBkMDg2ZWRmNGI2MmQ3MeYJJhjPm/8/2zXndvw5/GmbEnpxscm.6', NULL, NULL),
(3, 3, 'mcruz', '$2y$10$ZjBkMDg2ZWRmNGI2MmQ3MeYJJhjPm/8/2zXndvw5/GmbEnpxscm.6', NULL, NULL),
(4, 6, 'karpadua', '$2y$10$ZjBkMDg2ZWRmNGI2MmQ3MeYJJhjPm/8/2zXndvw5/GmbEnpxscm.6', NULL, NULL),
(5, 7, 'jpopovich', '$2y$10$ZjBkMDg2ZWRmNGI2MmQ3MeYJJhjPm/8/2zXndvw5/GmbEnpxscm.6', NULL, NULL),
(6, 8, 'mpimentel', '$2y$10$ZjBkMDg2ZWRmNGI2MmQ3MeYJJhjPm/8/2zXndvw5/GmbEnpxscm.6', NULL, NULL),
(7, 9, 'mclara', '$2y$10$ZjBkMDg2ZWRmNGI2MmQ3MeYJJhjPm/8/2zXndvw5/GmbEnpxscm.6', NULL, NULL),
(8, 10, 'bken', '$2y$10$ZjBkMDg2ZWRmNGI2MmQ3MeYJJhjPm/8/2zXndvw5/GmbEnpxscm.6', NULL, NULL),
(9, 11, 'csky', '$2y$10$ZjBkMDg2ZWRmNGI2MmQ3MeYJJhjPm/8/2zXndvw5/GmbEnpxscm.6', NULL, NULL);

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
(2, '0002', 'James Smith', 'James', 'Smith', 'Male', '1998-09-21', '20', 'Ohio Street', 'Kalaklan', 'Olongapo City', '09076611111', 2, 'Associate', 10000, 62.5, '07:00:00', '15:00:00', 'Active', '../../assets/SUBSYSTEM_PHOTOS/EMS/profile_pic/default_boy.png'),
(3, '0003', 'Mark Cruz', 'Mark', 'Cruz', 'Male', '2002-06-04', '29', '23rd Street', 'East Bajac-bajac', 'Olongapo City', '09080102003', 3, 'Associate', 10000, 62.5, '07:00:00', '15:00:00', 'Active', '../../assets/SUBSYSTEM_PHOTOS/EMS/profile_pic/default_boy.png'),
(6, '0004', 'Karen Padua', 'Karen', 'Padua', 'Female', '1994-05-30', '114', 'Hansen Street', 'East Tapinac', 'Olongapo City', '09076625319', 1, 'Associate', 10000, 62.5, '07:00:00', '15:00:00', 'Active', '../../assets/SUBSYSTEM_PHOTOS/EMS/profile_pic/default_girl.png'),
(7, '0005', 'James Popovich', 'James', 'Popovich', 'Male', '1998-09-21', '20', 'Ohio Street', 'Kalaklan', 'Olongapo City', '09076611111', 2, 'Associate', 10000, 62.5, '07:00:00', '15:00:00', 'Active', '../../assets/SUBSYSTEM_PHOTOS/EMS/profile_pic/default_boy.png'),
(8, '0006', 'Mark Pimentel', 'Mark', 'Pimentel', 'Male', '2002-06-04', '29', '23rd Street', 'East Bajac-bajac', 'Olongapo City', '09080102003', 3, 'Associate', 10000, 62.5, '07:00:00', '15:00:00', 'Active', '../../assets/SUBSYSTEM_PHOTOS/EMS/profile_pic/default_boy.png'),
(9, '0007', 'Maria Clara', 'Maria', 'Clara', 'Female', '1994-05-30', '114', 'Hansen Street', 'East Tapinac', 'Olongapo City', '09076625319', 1, 'Associate', 10000, 62.5, '07:00:00', '15:00:00', 'Active', '../../assets/SUBSYSTEM_PHOTOS/EMS/profile_pic/default_girl.png'),
(10, '0008', 'Barbie Ken', 'Barbie', 'Ken', 'Female', '1998-09-21', '20', 'Ohio Street', 'Kalaklan', 'Olongapo City', '09076611111', 2, 'Associate', 10000, 62.5, '07:00:00', '15:00:00', 'Active', '../../assets/SUBSYSTEM_PHOTOS/EMS/profile_pic/default_girl.png'),
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
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inventory_edit_history`
--

INSERT INTO `inventory_edit_history` (`id`, `credentials_id`, `prod_id`, `type`, `created_at`) VALUES
(1, 1, 2, 'Price', '2023-04-05 03:41:23'),
(2, 4, 1, 'Name', '2023-04-05 03:41:23'),
(3, 1, 9, 'Price', '2023-04-05 03:41:23'),
(4, 2, 6, 'Category', '2023-04-05 03:41:23'),
(5, 3, 7, 'Name', '2023-04-05 03:41:23');

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
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `type` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inventory_orders`
--

INSERT INTO `inventory_orders` (`id`, `supp_id`, `prod_id`, `prod_price`, `expenses`, `qty`, `created_at`, `type`) VALUES
(1, 4, 4, 80, 80, 1, '2023-04-05 03:42:44', 'Cash_on'),
(2, 4, 5, 300, 600, 2, '2023-04-05 03:42:44', 'Credit_card');

-- --------------------------------------------------------

--
-- Table structure for table `inventory_products`
--

CREATE TABLE `inventory_products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `unit` varchar(255) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inventory_products`
--

INSERT INTO `inventory_products` (`id`, `name`, `category`, `qty`, `price`, `unit`, `picture`) VALUES
(1, 'Shampoo', 'Commodity', 10, 20, 'Bottle', 'image1'),
(2, 'Conditioner', 'Commodity', 250, 30, 'Bottle', 'image2'),
(3, 'Soap', 'Commodity', 30, 50, 'Piece', 'image3'),
(4, 'Toothpaste', 'Commodity', 55, 80, 'Tube', 'image4'),
(5, 'Towel', 'Commodity', 33, 300, 'Piece', 'image5'),
(6, 'Onion', 'Ingredient', 40, 110, 'KG', 'image6'),
(7, 'Pepper', 'Ingredient', 80, 34, 'Grams', 'image7'),
(8, 'Garlic', 'Ingredient', 40, 35, 'KG', 'image8'),
(9, 'Salt', 'Ingredient', 70, 30, 'Grams', 'image9'),
(10, 'Cooking Oil', 'Ingredient', 100, 50, 'Liter', 'image10');

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

--
-- Dumping data for table `inventory_purchase`
--

INSERT INTO `inventory_purchase` (`id`, `prod_id`, `supp_id`, `qty`, `created_at`) VALUES
(1, 2, 4, 1, '2023-04-05 03:43:56'),
(2, 1, 4, 5, '2023-04-05 03:43:56'),
(3, 5, 2, 1, '2023-04-05 03:43:56');

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
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inventory_requests`
--

INSERT INTO `inventory_requests` (`id`, `name`, `email`, `supplier_id`, `product_id`, `quantity`, `created_at`) VALUES
(1, 'Dick Gordon', 'dick.gordon@gmail.com', 2, 2, 100, '2023-04-05 03:46:01'),
(2, 'Cathy Sweet', 'cath.sweet@gmail.com', 4, 4, 50, '2023-04-05 03:46:01'),
(3, 'Jane Dela Cruz', 'dc.jane@gmail.com', 1, 3, 200, '2023-04-05 03:46:01'),
(4, 'John Doe', 'johndoe@gmail.com', 3, 6, 100, '2023-04-05 03:46:01');

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

--
-- Dumping data for table `inventory_suppliers`
--

INSERT INTO `inventory_suppliers` (`id`, `name`, `email`, `contact`, `address`) VALUES
(1, 'Juan Dela Cruz', 'dc.juan@gmail.com', 919123456, '523 Mlle. de Binondo, st. com1, Manila, 1006 Metro Manila'),
(2, 'Dick Gordon', 'dick.gordon@gmail.com', 929987456, 'Filinvest City, Unit 2116, Entrata Tower 1, 2609 Civic Drive, Filinvest City, Alabang, Muntinlupa, 1781 Metro Manila'),
(3, 'John Doe', 'johndoe@gmail.com', 97847654, '523 Mlle. de Binondo, st. com1, Manila, 1006 Metro Manila'),
(4, 'Cathy Sweet', 'cath.sweet@gmail.com', 989465468, 'Yrreverre Building, 888 Mindanao Avenue, Quezon City, Metro Manila');

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

--
-- Dumping data for table `inventory_transactions`
--

INSERT INTO `inventory_transactions` (`id`, `prod_id`, `purch_id`, `order_id`, `created_at`) VALUES
(1, 5, 1, 2, '2023-04-05 03:49:32'),
(2, 4, 2, 1, '2023-04-05 03:49:32');

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

--
-- Dumping data for table `pos_cart`
--

INSERT INTO `pos_cart` (`id`, `order_id`, `product_id`, `dish_id`, `item_quantity`, `item_total`, `grand_total`) VALUES
(1, 1, 1, 1, '1', 79, 99),
(2, 2, 2, 2, '1', 75, 199),
(3, 3, 3, 3, '1', 79, 139);

-- --------------------------------------------------------

--
-- Table structure for table `pos_dish`
--

CREATE TABLE `pos_dish` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pos_dish`
--

INSERT INTO `pos_dish` (`id`, `name`, `price`, `category`, `status`, `image`) VALUES
(1, 'Chicken Enchilada Dip ', 79, 'Appetizers', 'available', 'image1'),
(2, 'Cowboy Caviar ', 79, 'Appetizers', 'available', 'image2'),
(3, 'Lighter Stuffed Pasta Shells', 149, 'Light Meal', 'available', 'image3'),
(4, 'Quick Udon Noodle Soup ', 169, 'Light Meal', 'not-available', 'image4'),
(5, 'Butter Chicken ', 199, 'Main Course', 'available', 'image5'),
(6, 'Grilled Chicken with fresh cherry salsa ', 249, 'Main Course', 'available', 'image6'),
(7, 'Bottomless Iced Tea ', 79, 'Beverages', 'available', 'image7'),
(8, 'Coke in Can', 69, 'Beverages', 'available', 'image8'),
(9, 'Vanilla Cake', 79, 'Desserts', 'available', 'image9'),
(10, 'Cookies', 49, 'Desserts', 'not-available', 'image10');

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

--
-- Dumping data for table `pos_ingredient`
--

INSERT INTO `pos_ingredient` (`id`, `dish_id`, `product_id`, `quantity`) VALUES
(1, 1, 1, 1),
(2, 1, 2, 1),
(3, 2, 1, 1);

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

--
-- Dumping data for table `pos_orders`
--

INSERT INTO `pos_orders` (`id`, `invoice_id`, `employee_id`, `table_id`, `time`, `location`, `payment_mode`, `status`, `is_paid`, `created_at`) VALUES
(1, 1, 1, 1, '10:32:34', 'room1', 'cash', 'active', 'y', '2023-04-05 04:37:35'),
(2, 2, 2, 2, '10:32:34', 'room2', 'cash', 'active', 'y', '2023-04-05 04:38:41'),
(3, 3, 3, 3, '10:32:34', 'room3', 'cash', 'archive', 'n', '2023-04-05 04:48:49');

-- --------------------------------------------------------

--
-- Table structure for table `pos_table`
--

CREATE TABLE `pos_table` (
  `id` int(11) NOT NULL,
  `is_avail` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pos_table`
--

INSERT INTO `pos_table` (`id`, `is_avail`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 1);

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

--
-- Dumping data for table `reservation_addons`
--

INSERT INTO `reservation_addons` (`id`, `invoice_id`, `commodity`, `quantity`, `amount`) VALUES
(1, 1, 'Extra Bed', 1, 100);

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
  `status` varchar(255) DEFAULT 'TENTATIVE',
  `booking_feedback_status` varchar(40) NOT NULL DEFAULT 'NONE' COMMENT 'booking history feedback status',
  `created_at` date NOT NULL DEFAULT current_timestamp() COMMENT 'try DATESTAMPT'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reservation_appointments`
--

INSERT INTO `reservation_appointments` (`id`, `guest_id`, `room_id`, `facility_id`, `invoice_id`, `check_in`, `check_out`, `status`, `booking_feedback_status`, `created_at`) VALUES
(1, 1, 1, NULL, NULL, '2023-04-18', '2023-04-20', 'TENTATIVE', '', '2023-04-07'),
(2, 2, 2, NULL, 5, '2023-04-25', '2023-04-27', 'TENTATIVE', '', '2023-04-07'),
(3, 3, 9, NULL, 1, '2023-04-25', '2023-04-27', 'TENTATIVE', '', '2023-04-07'),
(4, 4, 4, 4, 4, '2023-04-29', '2023-04-30', 'COMPLETE', '', '2023-04-07'),
(5, 4, 10, 3, 3, '2023-04-09', '2023-04-11', 'CANCELLED', '', '2023-04-07'),
(6, 4, 4, 3, 4, '2023-04-24', '2023-04-26', 'CANCELLED', '', '2023-04-07'),
(7, 4, 6, 2, 4, '2023-04-27', '2023-04-29', 'TENTATIVE', '', '2023-04-07'),
(8, 2, 8, 6, 2, '2023-04-26', '2023-04-26', 'COMPLETE', '', '2023-04-10'),
(9, 2, 8, 6, 2, '2023-04-26', '2023-04-26', 'COMPLETE', '', '2023-04-10'),
(10, 2, 8, 6, 2, '2023-04-26', '2023-04-26', 'COMPLETE', '', '2023-04-10'),
(11, 2, 8, 6, 2, '2023-04-26', '2023-04-26', 'COMPLETE', '', '2023-04-10'),
(12, 2, 8, 6, 2, '2023-04-26', '2023-04-26', 'COMPLETE', '', '2023-04-10'),
(13, 2, 8, 6, 2, '2023-04-26', '2023-04-26', 'COMPLETE', '', '2023-04-10'),
(14, 2, 8, 6, 2, '2023-04-26', '2023-04-26', 'COMPLETE', '', '2023-04-10'),
(15, 2, 8, 6, 2, '2023-04-26', '2023-04-26', 'COMPLETE', '', '2023-04-10'),
(16, 2, 8, 6, 2, '2023-04-26', '2023-04-26', 'COMPLETE', '', '2023-04-10'),
(17, 2, 8, 6, 2, '2023-04-26', '2023-04-26', 'COMPLETE', '', '2023-04-10'),
(18, 2, 8, 6, 2, '2023-04-26', '2023-04-26', 'COMPLETE', '', '2023-04-10'),
(19, 2, 8, 6, 2, '2023-04-26', '2023-04-26', 'COMPLETE', '', '2023-04-10'),
(20, 2, 8, 6, 2, '2023-04-26', '2023-04-26', 'COMPLETE', '', '2023-04-10'),
(21, 2, 8, 6, 2, '2023-04-26', '2023-04-26', 'COMPLETE', '', '2023-04-10'),
(22, 2, 8, 6, 2, '2023-04-26', '2023-04-26', 'COMPLETE', '', '2023-04-10'),
(23, 2, 8, 6, 2, '2023-04-26', '2023-04-26', 'COMPLETE', '', '2023-04-10'),
(24, 2, 8, 6, 2, '2023-04-26', '2023-04-26', 'COMPLETE', '', '2023-04-10'),
(25, 2, 8, 6, 2, '2023-04-26', '2023-04-26', 'COMPLETE', '', '2023-04-10'),
(26, 2, 8, 6, 2, '2023-04-26', '2023-04-26', 'COMPLETE', '', '2023-04-10'),
(27, 2, 8, 6, 2, '2023-04-26', '2023-04-26', 'COMPLETE', '', '2023-04-10'),
(28, 2, 8, 6, 2, '2023-04-26', '2023-04-26', 'COMPLETE', '', '2023-04-10');

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
-- Dumping data for table `reservation_facilities`
--

INSERT INTO `reservation_facilities` (`id`, `image`, `name`, `description`, `price`, `created_at`) VALUES
(1, 'images/reception/pic1.jpg', 'ROOM', 'A Hotel Room is an area designed and built to be occupied by one or more people on Hotel Property that is separate from other people occupying the Hotel Property. A Hotel Room has a secure entrance as well as sleeping and sanitation facilities', 1000, '2023-04-05 09:32:26'),
(2, 'images/reception/pic2.jpg', 'BANGQUET HALL', 'Banquet halls are structures or portions of structures that are reserved by individuals or groups of individuals for private functions such as weddings, anniversaries, birthday parties, and so on. They are typically built as integral ...', 500, '2023-04-05 09:33:20'),
(3, 'images/reception/pic3.jpg', 'MEETING ROOM', 'A Place for Us to Reconvene There\'s nothing like meeting in person. Choose from reimagined meeting spaces across 30 trusted hotel brands, whether fully in-person or with hybrid technology. You\'ll find a versatile indoor or outdoor', 500, '2023-04-05 09:34:08'),
(4, 'images/reception/pic7.jpg', 'HOTEL KITCHEN', 'The kitchen is essentially the area dedicated to food preparation and cooking. The main kitchen is centrally located in the hotel, and the sequence of food receiving, storing, preparing, cooking, serving, and clearing areas is clearly', 500, '2023-04-05 09:35:11'),
(5, 'images/reception/pic5.jpg', 'MINI BAR', 'In a hotel room or cruise ship stateroom, a minibar is a small refrigerator, usually an absorption refrigerator. The hotel staff stock it with drinks and snacks for guests to purchase while staying. It has a precise inventory of goods as ...', 500, '2023-04-05 09:35:49'),
(6, 'images/reception/pic6.jpg', 'SWIMMING POOL', 'Swimming pools provide guests with a place to have fun, relax, and be entertained. They have excellent features for both adult and child recreational activities. Many pools are designed to incorporate the most recent technological ...', 500, '2023-04-05 09:36:23');

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
-- Indexes for table `cdm_cancellation`
--
ALTER TABLE `cdm_cancellation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reservation_appointments_id` (`reservation_appointments_id`);

--
-- Indexes for table `cdm_feedback`
--
ALTER TABLE `cdm_feedback`
  ADD PRIMARY KEY (`id`),
  ADD KEY `guest_id` (`reservation_appointments_id`),
  ADD KEY `guest_id_2` (`guest_id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=109;

--
-- AUTO_INCREMENT for table `cdm_cancellation`
--
ALTER TABLE `cdm_cancellation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `cdm_feedback`
--
ALTER TABLE `cdm_feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `cdm_guest`
--
ALTER TABLE `cdm_guest`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `cms_about_us`
--
ALTER TABLE `cms_about_us`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cms_announcements`
--
ALTER TABLE `cms_announcements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `cms_gallery`
--
ALTER TABLE `cms_gallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `cms_icon`
--
ALTER TABLE `cms_icon`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `cms_label`
--
ALTER TABLE `cms_label`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `cms_rooms`
--
ALTER TABLE `cms_rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `cms_room_images`
--
ALTER TABLE `cms_room_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `inventory_orders`
--
ALTER TABLE `inventory_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `inventory_products`
--
ALTER TABLE `inventory_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `inventory_purchase`
--
ALTER TABLE `inventory_purchase`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `inventory_requests`
--
ALTER TABLE `inventory_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `inventory_suppliers`
--
ALTER TABLE `inventory_suppliers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `inventory_transactions`
--
ALTER TABLE `inventory_transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pos_cart`
--
ALTER TABLE `pos_cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `pos_dish`
--
ALTER TABLE `pos_dish`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `pos_ingredient`
--
ALTER TABLE `pos_ingredient`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `pos_orders`
--
ALTER TABLE `pos_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `pos_table`
--
ALTER TABLE `pos_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `reservation_addons`
--
ALTER TABLE `reservation_addons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `reservation_appointments`
--
ALTER TABLE `reservation_appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `reservation_facilities`
--
ALTER TABLE `reservation_facilities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cdm_ban`
--
ALTER TABLE `cdm_ban`
  ADD CONSTRAINT `cdm_ban_ibfk_1` FOREIGN KEY (`guest_id`) REFERENCES `cdm_guest` (`id`);

--
-- Constraints for table `cdm_cancellation`
--
ALTER TABLE `cdm_cancellation`
  ADD CONSTRAINT `reservation_appointments_id` FOREIGN KEY (`reservation_appointments_id`) REFERENCES `reservation_appointments` (`id`);

--
-- Constraints for table `cdm_feedback`
--
ALTER TABLE `cdm_feedback`
  ADD CONSTRAINT `cdm_feedback_ibfk_1` FOREIGN KEY (`reservation_appointments_id`) REFERENCES `reservation_appointments` (`id`),
  ADD CONSTRAINT `cdm_feedback_ibfk_2` FOREIGN KEY (`guest_id`) REFERENCES `cdm_guest` (`id`);

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

--
-- Constraints for table `reservation_appointments`
--
ALTER TABLE `reservation_appointments`
  ADD CONSTRAINT `facility_id` FOREIGN KEY (`facility_id`) REFERENCES `reservation_facilities` (`id`),
  ADD CONSTRAINT `guest_id` FOREIGN KEY (`guest_id`) REFERENCES `cdm_guest` (`id`),
  ADD CONSTRAINT `invoice` FOREIGN KEY (`invoice_id`) REFERENCES `billing_invoice` (`id`),
  ADD CONSTRAINT `room_id` FOREIGN KEY (`room_id`) REFERENCES `cms_rooms` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
