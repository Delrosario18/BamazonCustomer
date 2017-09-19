-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 20, 2017 at 12:22 AM
-- Server version: 10.1.16-MariaDB
-- PHP Version: 7.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bamazon`
--

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `department_id` int(11) NOT NULL,
  `department_name` varchar(255) NOT NULL,
  `over_head_cost` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`department_id`, `department_name`, `over_head_cost`) VALUES
(1, 'grocery', 1000),
(2, 'soft drinks', 200),
(3, 'smart phone', 5000),
(4, 'vegetables', 1000),
(5, 'tea leaves', 250),
(6, 'fast moving food', 500),
(7, 'utensils', 2000),
(8, 'fruits', 1000),
(9, 'cereals', 200),
(10, 'beer', 1000);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `item_id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `department_name` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `stock` int(11) NOT NULL,
  `product_sales` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`item_id`, `product_name`, `department_name`, `price`, `stock`, `product_sales`) VALUES
(1, 'potatoes', 'grocery', 20, 88, 40),
(2, 'soda', 'soft drinks', 40, 2, 0),
(3, 'techno y3', 'smart phone', 170, 5, 0),
(4, 'cabbages', 'vegetables', 10, 91, 0),
(6, 'tea leaves', 'tea leaves', 20, 27, 0),
(7, 'salt', 'fast moving food', 25, 7, 0),
(8, 'knife', 'utensils', 45, 8, 0),
(9, 'spoon', 'utensils', 15, 110, 0),
(10, 'mangoes', 'fruits', 20, 100, 0),
(11, 'salt', 'beverages', 15, 80, 300),
(12, 'coffee', 'beverage', 15, 30, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`department_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`item_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `department_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
