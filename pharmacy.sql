-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql-127637-db.mysql-127637:19967
-- Generation Time: May 28, 2023 at 01:47 PM
-- Server version: 8.0.26
-- PHP Version: 7.2.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pharmacy`
--

-- --------------------------------------------------------

--
-- Table structure for table `brand`
--

CREATE TABLE `brand` (
  `id` int NOT NULL,
  `name` varchar(55) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `image` varchar(55) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `slug` varchar(55) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `brand`
--

INSERT INTO `brand` (`id`, `name`, `image`, `slug`) VALUES
(1, 'GSK', 'img1.png', 'gsk'),
(2, 'Hải Linh', 'img2.png', 'hai-linh'),
(3, 'Tất Thành', 'img3.png', 'tat-thanh'),
(4, 'Thành Công', 'img4.png', 'thanh-cong'),
(5, 'Nature\'s Bounty', 'img5.png', 'natures-bounty'),
(6, 'Nhãn khác', 'img6.png', 'null'),
(7, 'QD-Meliphar', 'img7.png', 'qd-meliphar'),
(8, 'Ecogreen', 'img8.png', 'ecogreen'),
(9, 'CVI Pharma', 'img9.png', 'cvi-pharma'),
(10, 'GMP', 'img10.png', 'GMP'),
(11, 'Pure NZ', 'img11.png', 'pure-nz'),
(13, 'Tâm Bình', 'img12.png', 'tam-binh'),
(14, 'Fixderma', 'img13.png', 'fixderma'),
(16, 'Rejuvaskin', 'img14.png', 'rejuvaskin'),
(18, 'Bio-Oil', 'img15.png', 'bio-oil'),
(19, 'Acnes', 'img16.png', 'acnes'),
(20, ' SVR', 'img17.png', 'svr'),
(21, 'Rosette', 'img18.png', 'rosette'),
(22, 'Kingphar', NULL, 'kingphar');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `medicine_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `create_date` varchar(25) DEFAULT NULL,
  `update_date` varchar(25) NOT NULL,
  `unit_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `user_id`, `medicine_id`, `quantity`, `create_date`, `update_date`, `unit_id`) VALUES
(68, 101, 1, 1, '26/05/2023', '', 22),
(70, 101, 10, 1, '26/05/2023', '', 14),
(71, 103, 10, 1, '26/05/2023', '', 14),
(72, 103, 27, 1, '27/05/2023', '', 29);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int NOT NULL,
  `field` int DEFAULT NULL,
  `category` varchar(55) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `image` varchar(9) DEFAULT NULL,
  `slug` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `field`, `category`, `image`, `slug`) VALUES
(1, 1, 'Dinh dưỡng', 'img1.png', 'dinh-duong'),
(2, 1, 'Sinh lý - nội tiết tố', 'img2.png', 'sinh-ly-noi-tiet-tot'),
(3, 1, 'Cải thiện tăng cường chức năng', 'img3.png', 'cai-thien-tang-cuong-chuc-nang'),
(4, 1, 'Hỗ trợ làm đẹp', 'img4.png', 'ho-tro-lam-dep'),
(5, 1, 'Thần kinh não', 'img5.png', 'than-kinh-nao'),
(6, 1, 'Hỗ trợ tiêu hóa', 'img6.png', 'ho-tro-tieu-hoa'),
(7, 1, 'Sức khỏe tim mạch', 'img7.png', 'suc-khoe-tim-mach'),
(8, 1, 'Vitamin & khoáng chất', 'img8.png', 'vitamin-&-khoang-chat'),
(9, 1, 'Hỗ trợ điều trị', 'img9.png', 'ho-tro-dieu-tri'),
(10, 2, 'Mỹ phẩm trang điểm', 'img10.png', 'my-pham-trang-diem'),
(11, 2, 'Chăm sóc cơ thể', 'img11.png', 'cham-soc-co-the'),
(12, 2, 'Chăm sóc da mặt', 'img12.png', 'cham-soc-da-mat'),
(13, 2, 'Chăm sóc vùng mắt', 'img13.png', 'cham-soc-vung-mat'),
(14, 2, 'Chăm sóc tóc da đầu', 'img14.png', 'cham-soc-toc-da-dau'),
(15, 2, 'Sản phẩm từ thiên nhiên', 'img15.png', 'san-pham-tu-thien-nhien'),
(16, 2, 'Giải pháp làn da', 'img16.png', 'giai-phap-lan-da'),
(17, 3, 'Thiết bị làm đẹp', 'img17.png', 'thiet-bi-lam-dep'),
(18, 3, 'Chăm sóc răng miệng', 'img18.png', 'cham-soc-rang-mieng'),
(19, 3, 'Hỗ trợ tình dục', 'img19.png', 'ho-tro-tinh-duc'),
(20, 3, 'Vệ sinh cá nhân', 'img20.png', 've-sinh-ca-nhan'),
(21, 3, 'Hàng tổng hợp', 'img21.png', 'hang-tong-hop'),
(22, 3, 'Đồ dùng gia đình', 'img22.png', 'do-dung-gia-dinh'),
(23, 3, 'Thực phẩm - đồ uống', 'img23.png', 'thuc-pham---do-uong'),
(24, 3, 'Tinh dầu các loại', 'img24.png', 'tinh-dau-cac-loai'),
(25, 4, 'Thuốc', 'img25.png', 'thuoc'),
(26, 4, 'Dược chất', 'img26.png', 'duoc-chat'),
(27, 4, 'Dược liệu', 'img27.png', 'duoc-lieu'),
(28, 5, 'Dụng cụ y tế', 'img28.png', 'dung-cu-y-te'),
(29, 5, 'Dụng cụ theo dõi', 'img29.png', 'dung-cu-theo-doi'),
(30, 5, 'Dụng cụ sơ cứu', 'img30.png', 'dung-cu-so-cuu'),
(31, 5, 'Khẩu trang', 'img31.png', 'khau-trang');

-- --------------------------------------------------------

--
-- Table structure for table `category_detail`
--

CREATE TABLE `category_detail` (
  `id` int NOT NULL,
  `name` varchar(55) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `image` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `slug` varchar(55) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `category_detail`
--

INSERT INTO `category_detail` (`id`, `name`, `image`, `category_id`, `slug`) VALUES
(1, 'Dinh dưỡng trẻ em', 'img1.png', 1, 'dinh-duong-tre-em'),
(2, 'Sữa', 'img2.png', 1, 'sua'),
(3, 'Sinh lý nữ', 'img3.png', 2, 'sinh-ly-nu'),
(4, 'Sinh lý nam', 'img4.png', 2, 'sinh-ly-nam'),
(5, 'Sức khỏe tình dục', 'img5.png', 2, 'suc-khoe-tinh-duc'),
(6, 'Cân bằng nội tiết tố', 'img6.png', 2, 'can-bang-noi-tiet-to'),
(7, 'Hỗ trợ mãn kinh', 'img7.png', 2, 'ho-tro-man-kinh'),
(8, 'Chức năng gan', 'img8.png', 3, 'chuc-nang-gan'),
(9, 'Bổ mắt , bảo vệ mắt', 'img9.png', 3, 'bo-mat-,-bao-ve-mat'),
(10, 'Chống lão hóa', 'img10.png', 3, 'chong-lao-hoa'),
(11, 'Tăng sức đề kháng, miễn dịch', 'img11.png', 3, 'tang-suc-de-khang,-mien-dich'),
(12, 'Hỗ trợ trao đổi chất', 'img12.png', 3, 'ho-tro-trao-doi-chat'),
(13, 'Giải rượu, cai rượu', 'img13.png', 3, 'giai-ruou,-cai-ruou'),
(14, 'Hỗ trợ giảm cân', 'img14.png', 4, 'ho-tro-giam-can'),
(15, 'Da', 'img15.png', 4, 'da'),
(16, 'Tóc', 'img16.png', 4, 'toc'),
(17, 'Kích cỡ ngực', 'img17.png', 4, 'kich-co-nguc'),
(18, 'Thực phẩm tăng cân', 'img18.png', 4, 'thuc-pham-tang-can'),
(19, 'Hỗ trợ giấc ngủ ngon', 'img19.png', 5, 'ho-tro-giac-ngu-ngon'),
(20, 'Kiểm soát căng thẳng', 'img20.png', 5, 'kiem-soat-cang-thang'),
(21, 'Bổ não - cải thiện trí nhớ', 'img21.png', 5, 'bo-nao-cai-thien-tri-nho'),
(22, 'Tuần hoàn máu', 'img22.png', 5, 'tuan-hoan-mau'),
(23, 'Hoạt huyết', 'img23.png', 5, 'hoat-huyet'),
(24, 'Vi sinh - Probiotic', 'img24.png', 6, 'vi-sinh-probiotic'),
(25, 'Đại tràng', 'img25.png', 6, 'dai-trang'),
(26, 'Táo bón', 'img26.png', 6, 'tao-bon'),
(27, 'Khó tiêu', 'img27.png', 6, 'kho-tieu'),
(28, 'Dạ dày, tá tràng', 'img28.png', 6, 'da-day,ta-trang'),
(29, 'Suy giãn tĩnh mạch', 'img29.png', 7, 'suy-gian-tinh-mach'),
(30, 'Giảm Cholesterol', 'img30.png', 7, 'giam-cholesterol'),
(31, 'Huyết áp', 'img31.png', 7, 'huyet-ap'),
(32, 'Vitamin C các loại', 'img32.png', 8, 'vitamin-c-cac-loai'),
(33, 'Vitamin E Các loại', 'img33.png', 8, 'vitamin-e-cac-loai'),
(34, 'Vitamin tổng hợp', 'img34.png', 8, 'vitamin-tong-hop'),
(35, 'Cơ xương khớp', 'img35.png', 9, 'co-xuong-khop'),
(36, 'Hô hấp, ho xoang ', 'img36.png', 9, 'ho-hap,ho-xoang'),
(37, 'Hỗ trợ điều trị ung thư', 'img37.png', 9, 'ho-tro-dieu-tri-ung-thu'),
(38, 'Hỗ trợ điều trị tiểu đường', 'img38.png', 9, 'ho-tro-dieu-tri-tieu-duong'),
(39, 'Trang điểm mặt', 'img39.png', 10, 'trang-diem-mat'),
(40, 'Dụng cụ trang điểm', 'img40.png', 10, 'dung-cu-trang-diem'),
(41, 'Son môi', 'img41.png', 10, 'son-moi'),
(42, 'Sữa tắm xà bông', 'img42.png', 11, 'sua-tam-xa-bong'),
(43, 'Chống năng toàn thân', 'img43.png', 11, 'chong-nang-toan-than'),
(44, 'Khử mùi', 'img44.png', 11, 'khu-mui'),
(45, 'Mặt nạ', 'img45.png', 12, 'mat-na'),
(46, 'Tẩy trang ', 'img46.png', 12, 'tay-trang'),
(47, 'Tẩy tế bào chết', 'img47.png', 12, 'tay-te-bao-chet'),
(48, 'Dưỡng da mắt', 'img48.png', 13, 'duong-da-mat'),
(49, 'Xóa nếp nhăn vùng mắt', 'img49.png', 13, 'xoa-nep-nhan-vung-mat'),
(50, 'Dầu gội, dầu xả', 'img50.png', 14, 'dau-goi,dau-xa'),
(51, 'Dưỡng ủ tóc', 'img51.png', 14, 'duong-u-toc'),
(52, 'Dầu gội trị nấm', 'img52.png', 14, 'dau-goi-tri-nam'),
(53, 'Tinh dầu', 'img53.png', 15, 'tinh-dau'),
(54, 'Dầu dừa', 'img54.png', 15, 'dau-dua'),
(55, 'Da bị mụn', 'img55.png', 16, 'da-bi-mun'),
(56, 'Trị sẹo, mờ vết thâm', 'img56.png', 16, 'tri-seo,mo-vet-tham'),
(57, 'Viêm da cơ địa', 'img57.png', 16, 'viem-da-co-dia'),
(58, 'Dụng cụ cạo râu', 'img58.png', 17, 'dung-cu-cao-rau'),
(59, 'Dụng cụ tẩy lông', 'img59.png', 17, 'dung-cu-tay-long'),
(60, 'Nước súc miệng', 'img60.png', 18, 'nuoc-suc-mieng'),
(61, 'Chỉ nha khoa', 'img61.png', 18, 'chi-nha-khoa'),
(62, 'Kem đánh răng', 'img62.png', 18, 'kem-danh-rang'),
(63, 'Bao cao su', 'img63.png', 19, 'bao-cao-su'),
(64, 'Gel bôi trơn', 'img64.png', 19, 'gel-boi-tron'),
(65, 'Nước rửa tay', 'img65.png', 20, 'nuoc-rua-tay'),
(66, 'Băng vệ sinh', 'img66.png', 20, 'bang-ve-sinh'),
(67, 'Vệ sinh tai', 'img67.png', 20, 've-sinh-tai'),
(68, 'Khăn giấy, khăn ướt', 'img68.png', 21, 'khan-giay,-khan-uot'),
(69, 'Đồ dùng cho bé', 'img69.png', 22, 'do-dung-cho-be'),
(70, 'Đồ dùng cho mẹ', 'img70.png', 22, 'do-dung-cho-me'),
(71, 'Chống mũi & côn trùng', 'img71.png', 22, 'chong-mui-&-con-trung'),
(72, 'Kẹo cứng', 'img72.png', 23, 'keo-cung'),
(73, 'Kẹo dẻo', 'img73.png', 23, 'keo-deo'),
(74, 'Kẹo cao su', 'img74.png', 23, 'keo-cao-su'),
(75, 'Trà', 'img75.png', 23, 'tra'),
(76, 'Tinh dầu trị cảm', 'img76.png', 24, 'tinh-dau-tri-cam'),
(77, 'Tinh dầu xông', 'img77.png', 24, 'tinh-dau-xong'),
(78, 'Túi chườm', 'img78.png', 28, 'tui-chuom'),
(79, 'Dụng cụ vệ sinh mũi', 'img79.png', 28, 'dung-cu-ve-sinh-mui'),
(80, 'Kim các loại', 'img80.png', 28, 'kim-cac-loai'),
(81, 'Dụng cụ khác', 'img81.png', 28, 'dung-cu-khac'),
(82, 'Đai lưng', 'img82.png', 28, 'dai-lung'),
(83, 'Dụng cụ vệ sinh tai', 'img83.png', 28, 'dung-cu-ve-sinh-tai'),
(84, 'Vớ ngăn tĩnh mạch', 'img84.png', 28, 'vo-ngan-tinh-mach'),
(85, 'Máy massage', 'img85.png', 28, 'may-massage'),
(86, 'Đai nẹp', 'img86.png', 28, 'dai-nep'),
(87, 'Găng tay', 'img87.png', 28, 'gang-tay'),
(88, 'Kit test covid', 'img88.png', 29, 'kit-test-covid'),
(89, 'Máy đo SpO2', 'img89.png', 29, 'may-do-spo2'),
(90, 'Nhiệt kế', 'img90.png', 29, 'nhiet-ke'),
(91, 'Thử thai', 'img91.png', 29, 'thu-thai'),
(92, 'Máy đo huyết áp', 'img92.png', 29, 'may-do-huyet-ap'),
(93, 'Máy, que thử đường huyết', 'img93.png', 29, 'may-que-thu-duong-huyet'),
(94, 'Bông y tế', 'img94.png', 30, 'bong-y-te'),
(95, 'Băng y tế', 'img95.png', 30, 'bang-y-te'),
(96, 'Cồn và nước sát trùng', 'img96.png', 30, 'con-va-nuoc-sat-trung'),
(97, 'Chăm sóc vết thương', 'img97.png', 30, 'cham-soc-vet-thuong'),
(98, 'Xịt giảm đau', 'img98.png', 30, 'xit-giam-dau'),
(99, 'Miếng dán giảm đau', 'img99.png', 30, 'mieng-dan-giam-dau'),
(100, 'Thuốc dị ứng', 'img100.png', 25, 'thuoc-di-ung'),
(101, 'Thuốc chống vi rút', 'img101.png', 25, 'thuoc-chong-vi-rut'),
(102, 'Thuốc chống ung thư', 'img102.png', 25, 'thuoc-chong-ung-thu'),
(103, 'Thuốc tâm lý trị liệu', 'img103.png', 25, 'thuoc-tam-ly-tri-lieu'),
(104, 'Thuốc phóng xạ', 'img104.png', 25, 'thuoc-phong-xa'),
(105, 'Thuốc ngừa thai', 'img105.png', 25, 'thuoc-ngua-thai'),
(106, 'Trị sẹo, mờ vết thâm', 'img106.png', 16, 'tri-seo-mo-vet-tham'),
(107, 'Da bị mụn', 'img107.png', 16, 'da-bi-mun'),
(110, 'Viêm da cơ địa', 'img108.png', 16, 'viem-da-co-dia'),
(111, 'Da bị kích ứng', 'img109.png', 16, 'da-bi-kich-ung'),
(114, 'Sữa tắm, xà bông', 'img110.png', 11, 'sua-tam-xa-bong'),
(115, 'Dưỡng thể', 'img111.png', 11, 'duong-the'),
(116, 'Chăm sóc ngực', 'img112.png', 11, 'cham-soc-nguc'),
(117, 'Khử mùi', 'img113.png', 11, 'khu-mui'),
(118, 'Trị nứt da', 'img114.png', 11, 'tri-nut-da'),
(124, 'Sửa rửa mặt', 'img115.png', 12, 'sua-rua-mat'),
(125, 'Chống nắng da mặt', 'img116.png', 12, 'chong-nang-da-mat'),
(126, 'Xịt khoáng', 'img117.png', 12, 'xit-khoang'),
(127, 'Tẩy trang', 'img118.png', 12, 'tay-trang'),
(128, 'Tẩy tế bào chế', 'img119.png', 12, 'tay-te-bao-chet'),
(134, 'Dầu gội dầu xã', 'img120.png', 14, 'dau-goi-dau-xa'),
(135, 'Dưỡng tóc, ủ tóc', 'img121.png', 14, 'duong-toc-u-toc'),
(136, 'Đặc trị cho tóc', 'img122.png', 14, 'dac-tri-cho-toc'),
(137, 'Dầu gội trị nấm', 'img123.png', 14, 'dau-goi-tri-nam'),
(142, 'Dưỡng da mắt', 'img124.png', 13, 'duong-da-mat'),
(143, 'Trị quầng thâm, bọng mắt', 'img125.png', 13, 'tri-quang-tham-bong-mat'),
(144, 'Xóa nếp nhăn vùng mắt', 'img126.png', 13, 'xoa-nep-nhan-vung-mat');

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `medicine_id` int DEFAULT NULL,
  `content` varchar(555) DEFAULT NULL,
  `reply_id` varchar(4) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '0',
  `create_date` varchar(45) DEFAULT NULL,
  `like_number` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`id`, `user_id`, `medicine_id`, `content`, `reply_id`, `create_date`, `like_number`) VALUES
(9, 101, 6, 'Tôi không hài lòng với sản phẩm này. Chất lượng không đáng giá tiền và không hoạt động như quảng cáo.', '0', '24/05/2023 14:17:55', 0),
(10, 97, 6, 'Sản phẩm này thực sự vượt qua mong đợi của tôi. Nó đã cung cấp những kết quả tuyệt vời và tôi không thể hạnh phúc hơn.', '0', '24/05/2023 14:46:00', 0),
(14, 103, 10, 'Tôi rất thích thiết kế của sản phẩm. Nó trông sang trọng và hiện đại, tạo điểm nhấn cho không gian của tôi.', '0', '26/05/2023 17:55:56', 0),
(15, 103, 10, 'Hàng dùng tốt nhé mọi người. Nên mua', '0', '26/05/2023 17:59:56', 0),
(16, 86, 28, 'Mặc dù giá cả hơi cao, nhưng sản phẩm này đáng mỗi đồng. Tôi đã nhận được sự hỗ trợ tuyệt vời từ nó.', '0', '26/05/2023 17:55:56', 0),
(17, 103, 29, 'Tôi đã dùng sản phẩm này trong một thời gian và tôi thực sự thấy nó cải thiện cuộc sống của mình. Tôi rất hài lòng với kết quả mà nó mang lại.', '0', '27/05/2023 14:55:56', 0),
(18, 96, 8, 'Tôi đã sử dụng sản phẩm này trong vài tuần và thực sự hài lòng với kết quả. Nó thực hiện công việc tốt và đáng tin cậy.', '0', '22/05/2023 17:55:56', 0),
(19, 103, 8, 'Sản phẩm này thực sự tuyệt vời! Chất lượng tốt, giá cả hợp lý và đáng đồng tiền bát gạo.\r\n\r\n', '0', '20/05/2023 17:55:56', 0);

-- --------------------------------------------------------

--
-- Table structure for table `description`
--

CREATE TABLE `description` (
  `id` int NOT NULL,
  `medicine_id` int DEFAULT NULL,
  `title` varchar(87) DEFAULT NULL,
  `description` varchar(1133) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `description`
--

INSERT INTO `description` (`id`, `medicine_id`, `title`, `description`) VALUES
(1, 1, 'null', 'Panadol Extra được sản xuất bởi GlaxoSmithKline (GSK), với thành phần chính Paracetamol và Caffeine, là thuốc được dùng để điều trị hầu hết các triệu chứng đau từ nhẹ đến trung bình và hạ sốt.'),
(2, 2, 'Bổ sung vi chất cho sự phát triển của trẻ', 'Thành phần của Siro Healthy New gồm các loại acid amin, các vitamin và khoáng chất thiết yếu giúp trẻ ăn ngon miệng, hấp thụ tốt, tăng sức đề kháng và phát triển toàn diện. Sản phẩm đã được hàng triệu bà mẹ tin dùng cho con.\n\nCó thể nói rằng, vi chất dinh dưỡng là những chất đóng vai trò rất quan trọng đối với sự tăng trưởng, phát triển trí tuệ, giúp duy trì và nâng cao sức khỏe, phòng chống bệnh tật, nhất là ở những trẻ nhỏ. Bởi lẽ, chỉ có khi trẻ được cung cấp đầy đủ khoáng chất, các chất dinh dưỡng và vitamin cần thiết thì cơ thể mới phát triển bình thường và khỏe mạnh. Theo đó, có đến 90 vi chất dinh dưỡng khác nhau rất cần thiết cho cơ thể. Trong đó phải kể đến như vitamin nhóm B, nhóm C hay các loại khoáng chất như sắt, kẽm, đồng, iốt, magie, mangan…\n\nSiro Healthy New có tác dụng bổ sung lượng vi chất rất cần thiết cho sự phát triển của trẻ nhỏ. Sản phẩm giúp cung cấp cho cơ thể trẻ một cách đầy đủ, không thiếu, không thừa các loại khoáng chất và vitamin cần thiết và quan trọng cho cơ thể. '),
(3, 2, 'Hỗ trợ kích thích tiêu hóa, giúp trẻ ăn ngon miệng hơn', 'Siro Ăn Ngon Healthy New với các loại khoáng chất, acid amin và một số loại vitamin cần thiết có tác dụng tăng cường tiêu hóa, giúp trẻ được hấp thụ các chất dinh dưỡng, kích thích trẻ ăn ngon miệng, nâng cao sức đề kháng. Sản phẩm giúp kích thích trung tâm ăn ngon ở trên não bộ, tạo cảm giác thèm ăn cho trẻ, giúp trẻ được ăn ngon, hấp thụ dưỡng chất tốt và giảm sự rối loạn tiêu hóa. Đặc biệt là ở những trẻ bị suy dinh dưỡng, còi xương, siro giúp cho trẻ được duy trì sức khỏe tổng thể và sự phát triển cần thiết cho cơ thể.'),
(4, 2, 'Hỗ trợ tăng cường sức khỏe, nâng cao sức đề kháng', 'Đối với trẻ nhỏ, sức đề kháng chính là hàng rào giúp bảo vệ cơ thể trẻ tránh khỏi những tác nhân xâm nhập gây hại từ bên ngoài. Nhờ vậy mà trẻ mới có thể phát triển khỏe mạnh và hạn chế tình trạng bị đau ốm.\n\nSản phẩm Siro Ăn Ngon Healthy New không chỉ giúp trẻ bổ sung các loại vi chất cần thiết, giúp trẻ được kích thích ăn uống mà còn tăng cường sức đề kháng giúp trẻ lớn mạnh và lớn nhanh hơn mỗi ngày. Sử dụng Siro Ăn Ngon Healthy New, các mẹ sẽ không cần quá lo lắng về tình trạng trẻ bị gầy gò và thường xuyên đau ốm nhé.'),
(5, 2, 'An toàn, lành tính, dễ uống', 'Siro Ăn Ngon Healthy New với bảng thành phần gồm các loại vitamin và khoáng chất cần thiết. Những chất này đã trải qua quá trình nghiên cứu cũng như được kiểm soát nghiêm ngặt, chặt chẽ về độ an toàn. Bằng sự nghiên cứu kỹ lưỡng cũng như sự chuyển giao công thức tối ưu, sản phẩm đã đáp ứng được tiêu chí vừa đảm bảo được sự an toàn, vừa mang lại hiệu quả cao mà không hề gây ra bất cứ tác dụng phụ nào đối với cơ thể của trẻ.\n\nBên cạnh đó, vì rất hiểu tâm lý của trẻ nhỏ nên sản phẩm được bào chế ở dạng siro có vị rất dễ uống và thu hút, kích thích được cảm giác của trẻ. Siro Ăn Ngon Healthy New được thiết kế đơn giản và chắc chắn, rất tiện lợi cho cả việc sử dụng và bảo quản.\n\nSiro Ăn Ngon Healthy New được sản xuất bởi Công ty Cổ phần Dược phẩm Quốc tế Dolexphar. Đây là đơn vị hàng đầu trong lĩnh vực nghiên cứu công thức cũng như sản xuất các loại thực phẩm bảo vệ sức khỏe, trang thiết bị y tế và mỹ phẩm phục vụ nhu cầu người tiêu dùng. Nhằm nâng cao chất lượng sản phẩm cũng như đáp ứng được nhu cầu của khách hàng, công ty đã xây dựng nên nhà máy đạt tiêu chuẩn GMP do Cục an toàn thực phẩm - Bộ y tế cấp giấy chứng nhận'),
(6, 3, 'Tăng cường đề kháng, chống suy nhược cơ thể', 'Viên sủi Immune++ chứa beta glucan, vitamin C, nhóm B và nhiều khoáng chất giúp nâng cao sức đề kháng, tăng cường hoạt động tiêu hóa nhằm cải thiện tình trạng chán ăn và suy nhược cơ thể hiệu quả. Sản phẩm không đường, hương vị thơm ngon, an toàn cho sức khỏe. Thích hợp để bổ sung năng lượng và dinh dưỡng cho trẻ từ 1 tuổi trở lên và người lớn.'),
(7, 3, 'Nâng cao sức đề kháng', 'Viên sủi Immune++ được bổ sung beta glucan, kẽm, canxi, magie, sắt cùng hàng chục loại vitamin và khoáng chất thiết yếu, góp phần nâng cao sức đề kháng, tạo nên \'rào chắn\' hữu hiệu trước các loại virus, vi khuẩn gây bệnh. '),
(8, 3, 'Tăng cường tiêu hóa', 'Thỉnh thoảng, người lớn chúng ta hay gặp phải các triệu chứng tiêu hóa như đau bụng, đầy hơi, ợ chua, buồn nôn, táo bón hoặc tiêu chảy. Đây chính là nguyên nhân gây nên chứng chán ăn - căn nguyên của tình trạng suy dinh dưỡng. Bên cạnh đó, rất nhiều trẻ nhỏ có triệu chứng chán ăn thường có thể trạng gầy yếu, hay bệnh vặt do sức đề kháng kém.\n\nImmune++ có chứa kẽm cùng hàng loạt vi chất khác như sắt, magie, canxi, vitamin nhóm B,… hỗ trợ cải thiện hiệu quả triệu chứng chán ăn, tăng cường sức khỏe đường ruột và ngăn ngừa các triệu chứng khó chịu về đường tiêu hóa.'),
(9, 3, 'Hỗ trợ chống suy nhược cơ thể', 'Suy nhược là tình trạng xảy ra khi cơ thể bị thiếu vitamin, khoáng chất và các chất dinh dưỡng khác cần thiết để duy trì các mô và chức năng cơ quan. Cùng với chế độ ăn uống đầy đủ, việc bổ sung vi chất rất cần thiết giúp cơ thể lấy lại sự cân bằng.\n\nImmune++ chứa gần như đầy đủ các vitamin và khoáng chất thiết yếu, không chỉ giúp phòng ngừa mà còn hỗ trợ điều trị hiệu quả tình trạng suy nhược thể chất. Đặc biệt, đối với những trẻ em hoặc người lớn có chế độ ăn không cung cấp đủ dưỡng chất, việc bổ sung viên sủi Immune++ hàng ngày là rất cần thiết để cung cấp năng lượng, ngăn ngừa mệt mỏi và duy trì cơ thể khỏe mạnh.'),
(10, 4, 'Tăng cường thể lực - Cải thiện giấc ngủ', 'Trùng Thảo Gold chứa đông trùng hạ thảo, linh chi, nhân sâm, sữa ong chúa và 12 dưỡng chất khác giúp nâng cao sức khỏe, cải thiện giấc ngủ. Đặc biệt thích hợp cho những người sức khỏe kém, ăn ngủ kém, người cần tăng cường hoặc phục hồi sức khỏe.'),
(11, 4, 'Cải thiện giấc ngủ\n', 'Giảm căng thẳng, lo âu: Ổn định tinh thần, điều hòa nhịp tim, thư giãn thần kinh. Khi tâm trạng thoải mái, giấc ngủ sẽ đến nhanh hơn.\nTăng cường lưu thông máu não: Thiếu máu não khiến não không được cung cấp đủ oxy và các dưỡng chất làm suy nhược hệ thần kinh trung ương, gây tình trạng đau đầu, chóng mặt, mất ngủ. \nĐiều hòa nhịp sinh học: Thay đổi môi trường, lệch múi giờ là nguyên nhân gây rối loạn nhịp thức - ngủ của bạn. Thành phần melatonin trong Trùng Thảo Gold hỗ trợ điều chỉnh nhịp điệu sinh học của cơ thể, giảm rối loạn giấc ngủ. '),
(12, 4, 'Giúp ăn ngon miệng', 'Một số hoạt chất của Trùng Thảo Gold giúp tác động đến vị giác, tăng khả năng cảm nhận mùi vị. Bên cạnh đó còn kích thích tiêu hóa diễn ra thuận lợi, gia tăng chuyển hóa hấp thu dinh dưỡng. Những hoạt động có lợi này sẽ giúp bạn cảm thấy ăn ngon hơn, tiêu thụ được nhiều thực phẩm hơn và cơ thể cũng sẽ nhận đủ các chất để hoạt động tốt.'),
(13, 4, 'Nâng cao sức đề kháng\n', 'Đề kháng khỏe giúp chống lại sự xâm nhập của các yếu tố ngoại lai gây bệnh như: virus, vi khuẩn, ký sinh trùng,... Trùng Thảo Gold góp phần xây dựng hàng rào đề kháng của bạn thêm vững mạnh, ngăn ngừa nhiễm bệnh hoặc khi bị bệnh cũng hạn chế nguy cơ tiến triển nặng, rút ngắn thời gian bệnh, giúp mau chóng phục hồi sức khỏe.\n\n'),
(14, 5, 'Hỗ trợ cung cấp collagen để làn da luôn căng mịn\n', 'Viên uống bổ sung Hydro Lyzed Collagen With Vitamin C giúp làm đầy lớp biểu bì, chống oxy hóa, tăng sức đề kháng cơ thể, góp phần gia tăng collagen tự nhiên. Sử dụng sản phẩm hằng ngày sẽ cải thiện dấu hiệu lão hóa đáng kể.\n\n'),
(15, 5, 'Tăng cường sản xuất collagen tự nhiên, chống lão hoá, phục hồi và nuôi dưỡng tế bào da\n', 'Sản phẩm bổ sung hàm lượng cao (4000mg) collagen thủy phân tinh khiết và tự nhiên kết hợp với vitamin C mang lại hiệu quả tối ưu. \n\nCollagen thủy phân (hydrolyzed collagen) áp dụng công nghệ khiến những phân tử collagen được bẻ gãy các kết nối phức tạp tạo thành những phân tử nhỏ và đơn giản hơn, thuận lợi cho việc hấp thu collagen vào cơ thể dễ dàng. \n\nTrong collagen thủy phân chứa lượng axit amin, proline, glycine và hydroxyproline cao hơn 10 - 20 lần so với những loại protein thông thường. Các axit amin này đóng vai trò quan trọng trong việc hình thành các mô liên kết, giúp phục hồi tế bào da và làm chậm quá trình xuất hiện nếp nhăn và khô sạm trên da.'),
(16, 5, 'Tăng sức đề kháng cơ thể, giảm sạm nám, hạn chế tác hại do tia UV\n', 'Khi da tiếp xúc ánh nắng mặt trời sẽ sinh ra nhiều gốc oxy hóa. Các gốc oxy hóa này gây ảnh hưởng đến cấu trúc các sợi collagen tự nhiên có trong da, khiến cho tốc độ lão hóa da nhanh hơn. Vitamin C được chứng minh một chất chống oxy hóa mạnh giúp làn da được bảo vệ khỏi các gốc oxy hóa gây hại. Cơ chế tác dụng không giống như kem chống nắng vì nó không hấp thụ quang phổ UVA hay UVB, thay vào đó khi được kích thích bằng tia UV, các tế bào sừng có nồng độ protein vận chuyển vitamin C tăng cao giúp điều động vitamin C đến bảo vệ da. Tia UV cũng làm giảm đáng kể lượng vitamin C trong da, tác động này phụ thuộc vào tần suất hấp thụ tia UV.\n\n'),
(17, 6, 'Yến sào hữu cơ nhiều dinh dưỡng cho con phát triển toàn diện\n', 'Yến sào cho trẻ em Green Bird Babi hương vani được làm từ thành phần yến sào hữu cơ cao cấp chuẩn Asean Organic, đường hữu cơ không tẩy từ cây mía không nhiễm thuốc trừ sâu và phân bón cùng hương vani từ cây hoa vani tự nhiên. Sản phẩm giúp tăng cường đề kháng và hệ miễn dịch của các bé, hỗ trợ hệ tiêu hóa, cho bé phát triển toàn diện.'),
(18, 6, 'Bổ sung dinh dưỡng và năng lượng cho trẻ\n', 'Cơ thể con trẻ phát triển với tốc độ rất nhanh. Sự lớn lên của các tế bào và cơ quan, những phản ứng trao đổi chất, những hoạt động của hệ cơ xương, quá trình sản sinh nhiệt lượng, sự hình thành những tế bào mới,... đều cần nhiều dinh dưỡng và năng lượng. Tổ yến - vốn được biết đến là thực phẩm cao cấp và quý giá - chứa nhiều giá trị dinh dưỡng và năng lượng, rất có ích cho sự phát triển của trẻ em.\n\nCấu trúc glycoprotein trong tổ yến giúp bổ sung năng lượng và chất dinh dưỡng để cơ thể có thể dễ dàng thấp thu. Yến còn chứa nhiều nguyên tố vi lượng có ích như  phốt pho, sắt, natri, kali và axit sialic, axit amin (lysine, cysteine ​​và arginine)… Đặc biệt, tổ yến có hơn 50% các protein hỗ trợ cho các hoạt động của cơ thể và 18 loại axit amin thiết yếu, trong đó có nhiều axit amin mà cơ thể con người không thể tự tổng hợp được.'),
(19, 6, 'Tăng cường đề kháng và hệ miễn dịch\n', 'Trong yến có chứa thành phần axit sialic, hay còn gọi là axit N-acetylneuraminic, là một trong những chất có khả năng tham gia vào nhiều chức năng sinh lý trên bề mặt tế bào và đóng vai trò quan trọng trong điều hòa chức năng sinh lý và sinh hóa của cơ thể. Chất này là trung gian tuyệt vời cho hệ thống miễn dịch, ảnh hưởng và tác động đến dòng chảy của chất nhờn, hỗ trợ đẩy lùi mầm bệnh xâm nhập vào cơ thể.'),
(20, 6, 'Kích thích hệ tiêu hóa giúp trẻ ăn ngon\n', 'Tổ yến chứa các axit amin quan trọng như histidine, threonine và một nguyên tố quý hiếm là crom, có vai trò rất quan trọng trong việc kích thích hệ tiêu hóa của trẻ em, hỗ trợ hấp thu chất dinh dưỡng làm trẻ ăn uống ngon miệng hơn.'),
(21, 6, 'Phát triển chiều cao và trí tuệ\n', 'Một điều có thể nhiều người chưa biết về tổ yến đó chính là thực phẩm này cung cấp canxi chất lượng cao và dễ hấp thụ, rất tốt cho sự tăng trưởng chiều cao của trẻ. Không chỉ chứa canxi, các axit amin trong yến sào còn giúp phát triển hệ xương chắc khỏe.\n\nNgoài ra, taurine có trong sản phẩm còn hỗ trợ tích cực cho quá trình phát triển trí não của trẻ em.'),
(22, 6, 'Hương vị thơm ngon, phù hợp với khẩu vị trẻ em\n', 'Với mùi hương vani từ cây hoa vani tự nhiên, sản phẩm có mùi thơm dễ chịu, hương vị ngọt ngào không gắt, rất phù hợp với khẩu vị của trẻ.'),
(23, 7, 'Bổ sung dinh dưỡng cho trẻ phát triển vượt bậc', 'Colosmax Q10 là sản phẩm cốm đặc chế dành cho trẻ em, với thành phần đa dạng các loại vitamin và khoáng chất hỗ trợ trẻ hấp thu tốt dinh dưỡng trong thức ăn, chống còi xương, suy dinh dưỡng. Bên cạnh đó sản phẩm thúc đẩy sự phát triển của trí tuệ và hệ miễn dịch, giúp bé phát triển cân đối và vượt trội.'),
(24, 7, 'Kích thích trẻ ăn ngon, hấp thụ tốt', 'Sản phẩm chứa thành phần men bia tươi hàm lượng cao, có tác dụng ổn định đường ruột, góp phần hoàn thiện hệ tiêu hóa còn non yếu của trẻ. Kích thích đường tiêu hóa hoạt động trơn tru, giúp chuyển hóa hấp thu các dưỡng chất hiệu quả hơn và chuyển hóa các chất dinh dưỡng tối đa. Đây là chìa khóa quan trọng giúp bé tăng trưởng vượt trội cả về thể chất và trí tuệ, bắt kịp đà tăng trưởng của bạn bè đồng trang lứa.\n\nBên cạnh đó, Colosmax Q10 còn có chứa các axit amin và khoáng chất (selen, kẽm, photpho, magie) giúp hỗ trợ cải thiện các trường hợp như trẻ không chịu ăn đa dạng thức ăn, cải thiện và chứng suy dinh dưỡng, suy nhược, còi cọc, biếng ăn kinh niên. '),
(25, 7, 'Tăng sức đề kháng cho trẻ', 'Trong sữa non chứa thành phần ganglioside, là một nhóm chất béo cực kỳ quan trọng có tác dụng thúc đẩy trí não trẻ phát triển, ngoài ra còn hỗ trợ hệ tiêu hóa khỏe mạnh. Nhờ đó mà trẻ hạn chế các bệnh về đường hô hấp như viêm phế quản, viêm họng… và hạn chế được ốm vặt. Bên cạnh đó, Colosmax Q10 còn chứa hàm lượng cao DHA và taurin - là các ‘dưỡng chất IQ’ làm nền tảng cho sự phát triển của hệ thần kinh và trí tuệ. DHA và taurin tham gia vào thành phần cấu trúc của tế bào thần kinh và thị giác, giúp não bộ phát triển tối ưu, tăng sự nhạy bén, giúp trẻ nhận biết nhanh và thông minh hơn. Đặc biệt, DHA cũng chiếm tỷ lệ cao trong chất xám (vùng quyết định sự thông minh, nhanh nhạy của não bộ) và độ nhạy của các neuron thần kinh, giúp dẫn truyền thông tin nhanh và chính xác hình thành phản xạ cho bé hiệu quả.'),
(26, 12, 'Giảm thâm mụn, cải thiện chàm da, vảy nến, kích ứng da\r\n', 'Kem mật ong Manuka 18+ Skin Health Crème 40 ml là sản phẩm dưỡng ẩm chuyên biệt cho da khô và da nhạy cảm, cải thiện tình trạng: chàm, vẩy nến, viêm da, kích ứng da. Sản phẩm còn có khả năng thúc đẩy làm lành các tổn thương da thường gặp, làm dịu các vết sưng tấy, mẩn ngứa, bong tróc da.'),
(27, 13, 'Màng sinh học bảo vệ, làm lành da tổn thương', 'Nacurgo là dung dịch xịt trên da, tạo thành một lớp màng sinh học Polyesteramide giúp: làm mát và dịu da; làm sạch da, góp phần thúc đẩy quá trình tái tạo tế bào da; bảo vệ da, góp phần ngăn ngừa vi khuẩn xâm nhập.'),
(28, 12, 'Giảm thâm mụn, cải thiện chàm da, vảy nến, kích ứng da\r\n', 'Kem mật ong Manuka 18+ Skin Health Crème 40 ml là sản phẩm dưỡng ẩm chuyên biệt cho da khô và da nhạy cảm, cải thiện tình trạng: chàm, vẩy nến, viêm da, kích ứng da. Sản phẩm còn có khả năng thúc đẩy làm lành các tổn thương da thường gặp, làm dịu các vết sưng tấy, mẩn ngứa, bong tróc da.'),
(29, 13, 'Màng sinh học bảo vệ, làm lành da tổn thương', 'Nacurgo là dung dịch xịt trên da, tạo thành một lớp màng sinh học Polyesteramide giúp: làm mát và dịu da; làm sạch da, góp phần thúc đẩy quá trình tái tạo tế bào da; bảo vệ da, góp phần ngăn ngừa vi khuẩn xâm nhập.'),
(30, 26, 'Làm sạch sâu và cân bằng độ pH cho da nhạy cảm\r\n', 'Sữa tắm Eucerin pH5 Washlotion kích hoạt cơ chế bảo vệ tự nhiên của da với công thức pH5 Enzyme Protection độc đáo. Nhẹ nhàng làm sạch và duy trì lớp bảo vệ da nhạy cảm trước các tác động của môi trường.'),
(31, 27, 'Dưỡng ẩm toàn thân và bảo vệ da khỏi các tác nhân xấu\r\n', 'Lotion dưỡng ẩm Fixderma Cosmetic Laboratories  Oat Silk Body Lotion là sản phẩm lotion dưỡng ẩm, cân bằng độ ẩm cho da, giúp duy trì sự khỏe mạnh và sức sống cho làn da của bạn (đặc biệt thích hợp cho da khô). Sản phẩm không gây kích ứng cho làn da nhạy cảm.'),
(32, 24, 'Acnes C10 - Giảm vết thâm, làm mờ sẹo hiệu quả\r\n', 'Dung dịch trị sẹo và vết thâm Acnes C10 với hàm lượng Vitamin C nguyên chất 10%, ổn định và thấm tốt qua da, được ví như vị cứu tinh của làn da đặc biệt đối với vết thâm và sẹo do mụn.'),
(33, 25, 'Bio-Oil- Dầu dưỡng chống rạn nứt da và chống sẹo hàng đầu thế giới\r\n', 'Tinh dầu Bio-Oil giúp chăm sóc da chuyên biệt trong các trường hợp da bị sẹo, có vết rạn, da không đều màu, da lão hóa và mất nước.'),
(34, 28, 'Làm sạch sâu, êm dịu như nước dành cho da nhạy cảm\r\n', 'SVR Physiopure Gelee Moussante làm sạch nhẹ nhàng làn da nhạy cảm,  cung cấp sức sống và đồng thời giải độc cho da. Đem lại cảm giác thoải mái và mềm mại cho làn da, ngăn chặn cảm giác da bị căng.'),
(35, 29, 'Tẩy tế bào chết chuyên biệt cho da khô\r\n', 'Rosette Gommage Moist giúp làm mềm lớp sừng, loại bỏ các tế bào chết và bị tổn thương, cho lỗ chân lông luôn được thông thoáng. Thúc đẩy da sản sinh tế bào mới, trẻ hóa và tăng độ khỏe mạnh cho da. Cân bằng độ ẩm, cải thiện độ đàn hồi cho làn da mềm mịn, săn chắc. Cho lớp trang điểm mịn và đẹp hơn.'),
(36, 32, 'Giảm gãy rụng và làm mềm tóc\r\n', 'Nước dưỡng tóc tinh dầu bưởi Cocoon là dòng chăm sóc tóc đến từ thương hiệu mỹ phẩm Cocoon của Việt Nam. Từ tinh dầu vỏ bưởi truyền thống Việt Nam kết hợp với hoạt chất Xylishine, Baicapil, Vitamin B5 và Bisabolol, nước dưỡng tóc tinh dầu bưởi giúp cải thiện trình trạng tóc gãy rụng, nuôi dưỡng chân tóc và cung cấp độ ẩm cần thiết cho mái tóc luôn suôn mượt, mềm mại.'),
(37, 33, 'Hỗ trợ điều trị các vấn đề về tóc, giúp tóc luôn khỏe khoắn\r\n', 'Dưỡng tóc tinh dầu bưởi Yanagiya Hair Tonic giúp ngăn ngừa tóc gãy rụng, tóc thưa mỏng, gàu và ngứa, nuôi dưỡng tóc khỏe mạnh. Thành phần tinh dầu bưởi thiên nhiên giúp làm sạch mềm da đầu, mang lại cảm giác sảng khoái, mùi thơm bưởi thiên nhiên dễ chịu.\r\n\r\n');

-- --------------------------------------------------------

--
-- Table structure for table `field`
--

CREATE TABLE `field` (
  `id` int NOT NULL,
  `name` varchar(19) DEFAULT NULL,
  `slug` varchar(19) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `field`
--

INSERT INTO `field` (`id`, `name`, `slug`) VALUES
(1, 'Thực phẩm chức năng', 'thuc-pham-chuc-nang'),
(2, 'Dược mỹ phẩm', 'duoc-my-pham'),
(3, 'Chăm sóc cá nhân', 'cham-soc-ca-nhan'),
(4, 'Thuốc', 'thuoc'),
(5, 'Thiết bị y tế', 'thiet-bi-y-te');

-- --------------------------------------------------------

--
-- Table structure for table `image`
--

CREATE TABLE `image` (
  `id` int NOT NULL,
  `medicine_id` int DEFAULT NULL,
  `image_1` varchar(11) DEFAULT NULL,
  `image_2` varchar(11) DEFAULT NULL,
  `image_3` varchar(11) DEFAULT NULL,
  `image_4` varchar(11) DEFAULT NULL,
  `image_5` varchar(11) DEFAULT NULL,
  `image_6` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `image`
--

INSERT INTO `image` (`id`, `medicine_id`, `image_1`, `image_2`, `image_3`, `image_4`, `image_5`, `image_6`) VALUES
(1, 1, '1.png', '2.png', '3.png', '4.png', '5.png', '6.png'),
(2, 2, '1.png', '2.png', '3.png', '4.png', '5.png', '6.png'),
(3, 3, '1.png', '2.png', '3.png', '4.png', '5.png', '6.png'),
(4, 4, '1.png', '2.png', '3.png', '4.png', '5.png', '6.png'),
(5, 5, '1.png', '2.png', '3.png', '4.png', '5.png', '6.png'),
(6, 6, '1.png', '2.png', '3.png', '4.png', '5.png', '6.png'),
(7, 7, '1.png', '2.png', '3.png', '4.png', '5.png', '6.png'),
(8, 8, '1.png', '2.png', '3.png', '4.png', '5.png', ''),
(9, 9, '1.png', '2.png', '3.png', '4.png', '5.png', ''),
(10, 10, '1.png', '2.png', '3.png', '4.png', '5.png', '');

-- --------------------------------------------------------

--
-- Table structure for table `ingredient`
--

CREATE TABLE `ingredient` (
  `id` int NOT NULL,
  `name` varchar(55) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `description` varchar(386) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `ingredient`
--

INSERT INTO `ingredient` (`id`, `name`, `description`) VALUES
(1, 'Caffeine', NULL),
(2, 'Paracetamol', NULL),
(3, 'Men bia tươi', 'Giúp lợi tiêu hóa, kích thích sự hấp thụ của thức ăn, hạn chế tình trạng thiếu máu, giúp bảo vệ và cân bằng hệ thần kinh.'),
(4, 'Tá dược vừa đủ', NULL),
(5, 'DHA', 'Giữ vai trò quan trọng cho sự phát triển của võng mạc, hệ thần kinh và não bộ. Việc thiếu hụt DHA sẽ ảnh hưởng tiêu cực đến sự thông minh, khả năng ghi nhớ của trẻ.'),
(6, 'Calcium lactate', NULL),
(7, 'Thymomodulin', NULL),
(8, 'Lysine HCl', NULL),
(9, 'Kẽm Gluconat', 'Kích thích sự phát triển các tế bào lympho B và lympho B, từ đó tạo một hệ thống phòng thủ giúp cơ thể chống lại các tác nhân gây bệnh, tăng cường đề kháng và chống lại nhiễm trùng. Giúp điều hòa vị giác và cảm giác ngon miệng, giúp hấp thu và chuyển hóa các nguyên tố vi lượng khác như: đồng (Cu), mangan (Mn), magne (Mg).'),
(10, 'Selenium', NULL),
(11, 'Vitamin B2', 'Rất tốt cho sự phát triển của hệ thần kinh, da, mắt, giúp cơ thể được giải phóng năng lượng từ những thực phẩm được tiêu thụ hàng ngày.'),
(12, 'Vitamin D3', 'Giúp chuyển hóa các chất vô cơ, đặc biệt là phosphat và canxi, có vai trò quan trọng trong việc tạo nên cấu trúc xương.'),
(13, 'Vitamin B1', NULL),
(14, 'Vitamin B5', 'Giúp não bộ hoạt động tốt, tăng cường sự phát triển trí não, giúp trẻ ngủ ngon và sâu giấc hơn.'),
(15, 'Vitamin B6', 'Cần thiết cho quá trình tổng hợp pyridoxal phosphate - một coenzym tham gia vào hơn 100 quá trình trao đổi chất khác nhau.'),
(16, 'Taurine', NULL),
(17, 'Betaglucan', 'Giúp phòng ngừa, ngăn chặn các bệnh lý hô hấp và tăng cường hệ miễn dịch tự nhiên. Giảm xơ vữa động mạch, giảm nguy cơ mắc bệnh tim mạch, tăng nhu động ruột giúp cải thiện tiêu hóa, tăng cường sức khỏe.'),
(19, 'Magnesium gluconate', 'Là nguồn cung cấp khoáng chất dồi dào, giúp ngăn ngừa và điều trị tình trạng lượng magie thấp trong máu, cải thiện chứng chán ăn và phòng ngừa suy nhược cơ thể.'),
(20, 'Sắt fumarate', 'Tham gia vào thành phần của một enzym trong hệ miễn dịch, giúp tăng sức đề kháng và bảo vệ cơ thể trước các tác nhân gây hại. Bên cạnh đó, sắt còn có vai trò quan trọng để tạo hồng cầu, ngăn ngừa tình trạng thiếu máu, từ đó điều trị và phòng ngừa suy nhược cơ thể.'),
(21, 'Vitamin C', 'Tăng cường miễn dịch, kích hoạt các tế bào hồng cầu, bảo vệ cơ thể khỏi yếu tố tấn công bên ngoài. Thúc đẩy hệ thống thải độc của cơ thể hoạt động hiệu quả, từ đó nâng cao sức khỏe và ngăn ngừa sự hình thành của tế bào ung thư.'),
(22, 'Vitamin B12', NULL),
(23, 'Echinacea', 'Có hiệu quả như một chất kích thích hệ thống miễn dịch hoạt động, chống viêm nhiễm - nguồn gốc của nhiều loại bệnh tật phát sinh. Ngoài ra, echinacea còn có tác dụng điều trị cảm cúm cũng như các bệnh viêm đường hô hấp, có tác dụng như một loại thuốc nhuận tràng tự nhiên nên giúp hỗ trợ tiêu hóa, kích thích cảm giác thèm ăn.'),
(24, 'Hoàng kỳ', 'Được dùng để chữa bệnh cảm cúm, nhiễm trùng đường hô hấp trên, dị ứng, đau cơ, thiếu máu, tiểu đường, huyết áp cao, đồng thời có chức năng tăng cường cũng như điều chỉnh hệ thống miễn dịch.'),
(25, 'Vitamin B9', NULL),
(26, 'Vitamin nhóm B', 'Multivitamin chứa vitamin B1, vitamin B2, vitamin B3, vitamin B5, vitamin B6, vitamin B9, vitamin B12, giúp cơ thể tăng sức đề kháng, góp phần thúc đầy quá trình trao đổi chất của các tế bào, kích thích cảm giác thèm ăn, giúp cơ thể khỏe mạnh hơn và phòng ngừa suy dinh dưỡng'),
(27, 'Lá Neem', NULL),
(29, 'Sữa ong chúa\n\n', 'Duy trì vẻ đẹp mịn màng và sự tươi trẻ của làn da; ổn định hệ thần kinh, chống stress; thúc đẩy sinh trưởng và hồi phục tế bào; tăng cường sinh lý nam giới; tăng sức đề kháng; cải thiện tình trạng đau cứng các khớp, đau xương, làm hệ xương chắc khỏe; phòng ngừa thiếu máu, bệnh tim mạch; cải thiện hệ tiêu hóa, chống táo bón và có tác dụng kháng khuẩn.'),
(30, 'Cao nhân sâm', NULL),
(31, 'lá sen\n\n', 'Giảm co thắt cơ trơn, ức chế thần kinh trung ương, chống viêm, giảm đau, chống ho, kháng serotonin và ức chế thụ thể adrenergic. Giúp an thần do hoạt chất nuciferin ức chế tế bào não, flavonoid ức chế quá trình peroxy hóa ở não. Chống rối loạn nhịp tim. Chữa mất nước khi bị tiêu chảy, giúp mang lại giấc ngủ cho người khó ngủ, phòng chống béo phì, uống thay trà để giải nhiệt, làm mát.'),
(32, 'Enzym Amylase', 'Hỗ trợ tiêu hóa thức ăn, giúp quá trình tiêu hóa và hấp thu tinh bột ở ruột non diễn ra nhanh chóng và dễ dàng.'),
(33, 'Enzym Protease', 'Cho phép hấp thụ axit amin, rất cần thiết cho việc xây dựng và sửa chữa mô; tăng cường hệ thống miễn dịch; ngăn ngừa cục máu đông và xơ cứng động mạch; chống nhiễm trùng, chống oxy hóa.'),
(34, 'Đông trùng hạ thảo', 'Tăng cường hệ thống miễn dịch; tăng lưu lượng tuần hoàn não và tim, làm giảm huyết áp, điều chỉnh mỡ máu, ngăn ngừa xơ vữa mạch máu; chống oxy hóa, hạn chế tác hại tia phóng xạ với cơ thể; tăng chức năng tiêu hóa và hấp thu chất dinh dưỡng; điều hòa đường huyết; trấn tĩnh thần kinh.'),
(35, 'Sodium', 'null'),
(36, 'L-ornithine hydrochloride', 'Là một axit amin trung hòa lượng amoniac thừa trong cơ thể, giúp giải độc cơ thể, cải thiện hệ thống miễn dịch.'),
(37, 'Collagen', 'Collagen qua quá trình thủy phân sẽ trở thành nhưng phân tử nhỏ và đơn giản hơn giúp cơ thể hấp thụ dễ dàng. Với hàm lượng collagen cao, Collagen With Vitamin C đẩy nhanh quá trình tái tạo da, phục hồi thương tổn, xóa thâm, mờ sẹo.'),
(38, 'Chất làm dày', NULL),
(40, 'Nước (aqua)', NULL),
(42, 'Chất ổn định', NULL),
(43, 'Hương vani giống tự nhiên', NULL),
(44, 'Sợi yến', NULL),
(45, 'Đường phèn', NULL),
(46, 'Vitamin A', NULL),
(47, 'Phospho', NULL),
(52, 'Sữa ong chúa', ''),
(54, 'Honey', NULL),
(55, 'Beeswax', NULL),
(56, 'Propolis wax', NULL),
(57, 'Evening primrose oil', NULL),
(58, 'Water', NULL),
(67, 'Nano Curcumin', NULL),
(68, 'Polyesteramide', NULL),
(69, 'Camellia Sinensis Leaf Extract', NULL),
(75, 'PEPTAN F.', NULL),
(77, 'Bạch quả', NULL),
(78, 'Muira puama', NULL),
(79, 'Damiana Leaf', NULL),
(80, 'Dong Quai', NULL),
(81, 'Black cohosh', NULL),
(82, 'Hoa Hòe', NULL),
(83, 'Hồng hoa', NULL),
(84, 'Đinh lăng', NULL),
(85, 'Khương hoạt', NULL),
(86, 'Xuyên khung', NULL),
(87, 'Đương quy', NULL),
(88, 'Cảo bản', NULL),
(89, 'Sài Hồ', NULL),
(90, 'Mạn kinh tử', NULL),
(91, 'Tinh chất Red Clover', NULL),
(92, 'Zinc', NULL),
(93, 'Vitamin E', NULL),
(94, 'Sa nhân', NULL),
(98, 'Nhục đậu khấu', NULL),
(99, 'Mộc hương bắc', NULL),
(100, 'Trần bì', NULL),
(101, 'Hoàng liên', NULL),
(102, 'Bạch truật', NULL),
(103, 'Đảng Sâm', NULL),
(104, 'Bạch linh', NULL),
(105, 'Cam thảo', NULL),
(128, 'Aqua', NULL),
(130, 'Allium Cepa Bulb Extract', NULL),
(131, 'Aloe barbadensis leaf juice', NULL),
(134, 'Nicotinamide', NULL),
(135, 'Glycerol', NULL),
(136, 'Allantoin', NULL),
(137, 'Xanthan gum\r\n\r\nPhenoxyethanol', NULL),
(138, 'Ethylhexylglycerin', NULL),
(139, 'Panthenol', NULL),
(140, 'Lactic Acid\r\n\r\n', NULL),
(141, 'Disodium EDTA', NULL),
(142, 'Fragrance', NULL),
(143, 'Tá dược vừa đủ\r\n\r\n', NULL),
(144, 'Vitamin', 'Retinyl Palmitate (Vitamin A), Tocopheryl Acetate (Vitamin E) thúc đẩy hình thành collagen mới. Bảo vệ da khỏi các gốc tự do và ánh nắng.'),
(145, 'Purcellin Oil', 'Công thức dầu Purcellin độc quyền giúp làm giảm độ đặc của sản phẩm, giúp các chiết xuất từ tinh dầu thực vật và vitamins dễ dàng thấm nhanh và sâu qua da. Ngoài ra Purcellin Oil còn giúp dưỡng ẩm, giữ da mềm mịn.'),
(146, 'Ascorbic Acid', 'Dẫn xuất phổ biến nhất của Vitamin C, có đầy đủ công dụng của Vitamin C, làm mờ vết thâm và sẹo mụn hiệu quả. '),
(147, 'Grapefruit Extract', 'Chiết xuất bưởi hồng giàu Vitamin A và C, giúp chống oxy hóa, kháng viêm.'),
(148, 'Propylene Glycol', 'Hút ẩm từ môi trường ngoài để duy trì độ ẩm cần thiết cho da.'),
(149, 'Ethoxydiglycol', 'Giúp ổn định và đưa Vitamin C thấm sâu vào da.'),
(150, 'Caster Oil', 'Làm sạch và làm mềm da hiệu quả.'),
(151, 'Dexpanthenol và Glycerin', ' Dưỡng ẩm và duy trì độ ẩm lý tưởng cho da, tăng cường hàng rào bảo vệ da, kích thích tái tạo da.'),
(152, 'Shea Butter Ethyl Esters', 'Phục hồi lớp hydrolipid trên da.'),
(153, 'Linoleic Acid, Linolenic Acid', 'Duy trì màng tế bào, cải thiện hấp thu chất dinh dưỡng, kiểm soát sự trao đổi chất của tế bào. Đồng thời, tạo ra prostaglandin - Một hoạt chất kích thích tuần hoàn máu, thúc đẩy tái tạo tế bào da mới.'),
(154, 'Avena Sativa (Oat) Meal Extract', 'Làm dịu vùng da bị mụn, giảm kích ứng và ngứa rát.'),
(155, 'AHA từ trái cây', 'Tẩy tế bào chết nhẹ nhàng, làm mềm và loại bỏ lớp da chết xỉn màu, đồng thời giúp thông thoáng lỗ chân lông.'),
(156, 'Chiết xuất trà xanh', 'Giúp kháng viêm, giảm sưng, làm dịu và dưỡng da ẩm mịn.'),
(157, 'Chiết xuất từ đậu nành lên men', 'Duy trì lớp màng ẩm trên da.'),
(158, 'Glycerin', 'Bổ sung độ ẩm và dưỡng da ẩm mịn tức thì.'),
(159, 'Oxygenating Magnesium', 'Magiê (Mg) có tác dụng làm chậm quá trình lão hóa và tăng đề kháng cho da. Khi được bổ sung Oxy, Mg trở thành hoạt chất “Oxygenating Magnesium”, mang lại tác dụng rất tốt trong việc phục hồi sức sống và tăng thêm sinh lực cho làn da. Giúp tăng khả năng chống chịu của da trước các yếu tố độc hại.'),
(160, 'Phức hợp dưỡng ẩm độc quyền', 'Duy trì làm da ẩm mịn khi làm sạch da, mang lại cảm giác mềm mại cho da, tránh làm da căng tức.'),
(161, NULL, NULL),
(162, 'Hạt dẻ ngựa', 'có tác dụng kháng viêm mạnh, đồng thời hoạt chất Aescin có trong thành phần này còn làm tăng co thắt tĩnh mạch, giúp dễ dàng đẩy máu trở lại tim, tăng cường lưu thông máu. '),
(163, 'Diếp cá', 'Giúp ngăn ngừa táo bón, nguyên nhân chính dẫn đến tình trạng ách tắc trong ruột gây áp lực nặng nề lên các mạch máu, khiến tình trạng giãn tĩnh mạch trở nên tồi tệ hơn.'),
(164, 'Vitamin B5 (Panthenol)', 'Cung cấp độ ẩm cho tóc, ngăn ngừa hư tổn, làm dày tóc và cải thiện độ bóng khỏe của mái tóc.'),
(165, 'Xylishine', 'Được chiết xuất từ các loại đường tự nhiên từ gỗ và từ tảo nâu Pelvetia Canaliculata giúp cấp ẩm, phục hồi và tăng cường độ bóng của tóc.'),
(166, 'Baicapil', 'Kích thích mọc tóc, giảm rụng tóc, gia tăng mật độ của tóc và làm cho sợi tóc dày, chắc khoẻ hơn chỉ trong vòng 3 tháng.'),
(167, 'Bisabolol', 'Chiết xuất từ tinh dầu hoa cúc, có tác dụng bảo vệ và chữa lành da đầu khỏi tác động của căng thẳng hàng ngày. Ngoài ra bisabolol còn có tác dụng giữ ẩm và kiểm soát bã nhờn trên da đầu.'),
(168, 'Tocopheryl acetate (vitamin E)', 'Chất chống oxy hóa tự nhiên, giúp bảo vệ da đầu khỏi những tổn thương, thúc đẩy các nang tóc phát triển.'),
(169, 'Dipotassium Glycyrrhizate', 'Một thành phần được chiết xuất từ rễ cam thảo, giúp làm dịu, giảm nhanh tình trạng kích ứng, xót ngứa da đầu. '),
(170, 'Citric Acid', 'Axit yếu có trong các trái cây họ cam quýt giúp tẩy tế bào chết, loại bỏ dầu thừa ở các nang tóc. '),
(171, 'Menthol Citrus Unshiu Peel Extract', 'Một chiết xuất từ vỏ cam Satsuma thuộc chi Cam chanh, hỗ trợ kháng khuẩn, nấm ngứa da đầu.'),
(172, 'Lactoserum Atomisat', 'Thành phần có tác dụng sát khuẩn nhẹ, giúp bảo vệ vùng da nhạy cảm khỏi các tác nhân gây ngứa.'),
(173, 'Chất nhũ hóa 322', 'Có tác dụng làm mềm da và nhẹ nhàng trên da, làm da có cảm giác mềm mại.'),
(174, 'Prunus Flora Extract', 'Thành phần có tác dụng xóa bỏ quầng thâm, sẫm màu dưới da mắt.'),
(175, 'Pacomiae Lactiflora Extract', 'Có tác dụng làm mờ các vết thâm, cải thiện tình trạng chảy xệ, bảo vệ và làm trắng vùng da dưới mắt.'),
(176, 'Chất cân bằng pH', 'Sử dụng toner sau bước rửa mặt có thể giúp làn da của bạn trung hòa những chất có tính kiềm gây tác động xấu cho da và làm tối ưu hóa độ pH của da.');

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `id` int NOT NULL,
  `comment_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `create_date` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`id`, `comment_id`, `user_id`, `create_date`) VALUES
(5, 9, 101, '25/05/2023 22:50:47');

-- --------------------------------------------------------

--
-- Table structure for table `medicine`
--

CREATE TABLE `medicine` (
  `id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `producer` int DEFAULT NULL,
  `brand` int DEFAULT NULL,
  `country` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `category` varchar(55) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `item_form` varchar(81) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `category_detail_id` int DEFAULT NULL,
  `specification` varchar(999) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `price` varchar(7) DEFAULT NULL,
  `discount` int DEFAULT '6',
  `slug` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `total_number` int NOT NULL DEFAULT '191',
  `sale_number` int NOT NULL DEFAULT '34',
  `avatar` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT 'avatar.png'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `medicine`
--

INSERT INTO `medicine` (`id`, `name`, `producer`, `brand`, `country`, `category`, `item_form`, `category_detail_id`, `specification`, `price`, `discount`, `slug`, `active`, `total_number`, `sale_number`, `avatar`) VALUES
(1, 'Thuốc Panadol Extra đỏ GSK giúp giảm đau, hạ sốt (15 vỉ x 12 viên)', 1, 1, 'Anh', 'Hộp', 'Viên nén', 1, 'Hộp 15 Vỉ x 12 Viên', '2000', 12, 'panadol-extra-do-500mg-180v-sanofi', 1, 1002, 181, 'avatar.png'),
(2, 'Siro Healthy New Kids hỗ trợ kích thích tiêu hóa, giúp ăn ngon (120ml)', 1, 2, 'Việt Nam', 'Chai', 'Dung dịch', 11, 'Chai', '2000', 10, 'siro-an-ngon-healthy-new-kid-20', 1, 682, 73, 'avatar.png'),
(3, 'Viên sủi Immune++ Tất Thành không đường hỗ trợ tăng sức đề kháng (20 viên)', 2, 3, 'Việt Nam', 'Tuýp', 'Viên sủi', 34, '1 Tuýp x 20 Viên', '45000', 10, 'vien-sui-khong-duong-multivitamin-tang-suc-de-khang-immune-tuyp-20-vien', 1, 100, 0, 'avatar.png'),
(4, 'Viên uống Trùng Thảo Gold Thành Công hỗ trợ dễ ngủ, ngủ sâu giấc (30 viên)', 3, 4, 'Việt Nam', 'Hộp', 'Viên nén', 19, 'Hộp 30 viên', '173000', 8, 'trung-thao-gold', 1, 100, 13, 'avatar.png'),
(5, 'Viên uống Collagen C Nature\'s Bounty bổ sung collagen, vitamin C cho da (90 viên)', 4, 4, 'Úc', 'Hộp', 'Viên nén', 11, '1 Hộp x 90 Viên', '50000', 9, 'collagen-with-vitamin-c-vien-bo-sung-collagen', 1, 100, 0, 'avatar.png'),
(6, 'Nước Yến Sào cho trẻ em 15% Yến hương vani (4 hũ x 72g)', 6, 5, 'Việt Nam', 'Hộp', 'Hộp', 1, '1 Hộp x 4 Hũ', '13000', 0, 'nuoc-yen-sao-cho-tre-em-15-yen-huong-vani-4-hu-x-72g', 1, 100, 2, 'avatar.png'),
(7, 'Cốm ColosMaxQ10 Gold QD-Meliphar bổ sung vi chất cho trẻ (20 gói)', 6, 7, 'Việt Nam', 'Hộp', 'Cốm', 1, 'Hộp 20 gói', '10000', 0, 'com-colosmaxq10-gold-qd-meliphar-bo-sung-vi-chat-cho-tre-20-goi', 1, 100, 0, 'avatar.png'),
(8, 'Viên sâm Angela Gold Ecogreen hỗ trợ làm đẹp da, tăng cường sinh lý nữ (60 viên)\r\n', 7, 8, 'Anh', 'Hộp', 'Viên nang', 3, 'Hộp 60 Viên', '2000', 12, 'sam-agela-gold-dep-da-can-bang-noi-tiet-to-nu', 1, 99, 1, 'avatar.png'),
(9, 'Viên uống Migrin Plus CVI Pharma hỗ trợ hoạt huyết, tăng cường tuần hoàn máu não (20 viên)', 8, 9, 'Anh', 'Hộp', 'Viên nang mềm', 21, 'Hộp 2 Vỉ x 10 Viên', '2000', 12, 'thuc-pham-chuc-nang-vien-uong-tang-cuong-tuan-hoan-nao-migrin-plus-newtech-pharm-20-vien', 1, 99, 1, 'avatar.png'),
(10, 'Viên uống Evaskin 35 Gmp giúp tăng tính đàn hồi, giảm nếp nhăn trên da (30 viên)', 9, 10, 'Hoa Kỳ', 'Hộp', 'Viên nang', 15, 'Hộp 3 Vỉ x 10 Viên', '45900', 12, 'thuc-pham-chuc-nang-evaskin-ho-tro-lam-dep-da-cho-phu-nu-tuoi-35', 1, 70, 40, 'avatar.jpg'),
(12, 'Kem 18+ Active Manuka Honey & Propolis Skin Health Crème dưỡng ẩm cho da khô và da nhạy cảm (40ml)', 5, 11, 'New Zealand', 'Tuýp', 'Dạng gel', 106, '1 Tuýp x 1 Tuýp', '499000', 0, 'kem-18-active-manuka-honey-and-propolis-skin-health-creme-duong-am-cho-da-kho-va-da-nhay-cam-40ml', 1, 200, 0, 'avatar.png'),
(13, 'Dung dịch xịt bảo vệ da Nacurgo ngăn ngừa vi khuẩn xâm nhập, tái tạo tế bào da (12ml)\r\n', 6, 5, 'Việt Nam', 'Chai', 'Dạng nước', 106, 'Chai 12ml', '119000', 0, 'dung-dich-xit-bao-ve-da-nacurgo-ngan-ngua-vi-khuan-xam-nhap-tai-tao-te-bao-da-12ml', 1, 100, 0, 'avatar.png'),
(16, 'Viên uống Đại Tràng Tâm Bình hỗ trợ giảm các triệu chứng của viêm đại tràng (60 viên)\r\n', 10, 13, 'Việt Nam', ' Hộp', 'Viên nang cứng', 25, 'Hộp 5 vỉ x 12 viên', '89000', 10, 'dai-trang-tam-binh', 1, 100, 10, 'avatar.png'),
(17, 'Gel Fixderma For Scars hỗ trợ làm mờ sẹo do mụn, bỏng, rạn da, vết thương (15ml)', 6, 14, 'Hoa Kỳ', 'Tuýp', 'Tuýp', 106, '1 Tuýp x 1 Tuýp', '278000 ', 0, 'gel-fixderma-for-scars-ho-tro-lam-mo-seo-do-mun-bong-ran-da-vet-thuong-15ml', 1, 567, 345, 'avatar.png'),
(22, 'Kem Rejuvaskin Scar Esthetique Silicone hỗ trợ làm mờ sẹo, mờ vết thâm trên da (10ml)', 6, 14, 'Hoa Kỳ\r\n', 'Tuýp', 'Tuýp', 106, '1 Tuýp x 1 Tuýp', '289000', 0, 'kem-rejuvaskin-scar-esthetique-silicone-ho-tro-lam-mo-seo-mo-vet-tham-tren-da-10ml', 1, 45, 22, 'avatar.png'),
(24, 'Dung dịch Acnes C10 hỗ trợ điều trị sẹo và vết thâm do mụn (15ml)\r\n', 3, 19, 'Việt Nam\r\n', 'Chai', 'Chai', 106, 'Chai 15ml', '319500', 6, 'dung-dich-acnes-c10-ho-tro-djieu-tri-seo-va-vet-tham-do-mun-15ml', 1, 242, 63, 'avatar.png'),
(25, 'Tinh dầu Bio-Oil chăm sóc da chuyên biệt, cải thiện các tình trạng sẹo, rạn da (125ml)', 4, 18, 'Nam Phi\r\n', 'Hộp', 'Hộp', 106, 'Hộp', '319000', 4, 'tinh-dau-bio-oil-cham-soc-da-chuyen-biet-cai-thien-cac-tinh-trang-seo-ran-da-125ml', 1, 215, 34, 'avatar.png'),
(26, 'Sữa tắm không mùi Eucerin pH5 WashLotion Preserves Skin Resilience cho da nhạy cảm (1000ml)', 6, 8, 'Đức', 'Chai', 'Chai', 114, 'Chai 1000ml', '499000', 12, 'sua-tam-khong-mui-eucerin-ph5-washlotion-preserves-skin-resilience-cho-da-nhay-cam-1000ml', 1, 111, 11, 'avatar.png'),
(27, 'Kem dưỡng ẩm Fixderma Cosmetic Laboratories Oat Silk Body Lotion (200ml)', 7, 10, 'Hoa Kỳ', 'Tuýp', 'Tuýp', 115, 'Tuýp 200ml', '450000', 20, 'kem-duong-am-fixderma-cosmetic-laboratories-oat-silk-body-lotion-200ml', 1, 222, 22, 'avatar.png'),
(28, 'Gel rửa mặt SVR Physiopure Gelee Moussante cho da nhạy cảm (55ml)', 3, 20, 'Pháp', 'Tuýp', 'Tuýp', 124, '1 Tuýp x 1 Tuýp', '155000', 3, 'gel-rua-mat-svr-physiopure-gelee-moussante-cho-da-nhay-cam-55ml', 1, 333, 33, 'avatar.png'),
(29, 'Gel tẩy tế bào chết dành cho da khô Rosette Gommage Moist (180g)', 8, 21, 'Nhật Bản', 'Tuýp', 'Tuýp', 128, '1 Tuýp x 1 Tuýp', '175000', 4, 'gel-tay-te-bao-chet-danh-cho-da-kho-rosette-gommage-moist-180g', 1, 444, 44, 'avatar.png'),
(30, 'Viên uống Vững Mạch Chi Kingphar hỗ trợ tăng tính bền thành mạch (60 viên)', 11, 22, 'Việt Nam', ' Hộp', '\r\nViên nén', 29, 'Vững Mạch Chi tăng độ bền tĩnh mạch chi, phòng ngừa và làm giảm các triệu chứng giãn tĩnh mạch chi.', '306000', 2, 'vung-mach-chi-kingphar', 1, 100, 1, 'avatar.png'),
(31, 'Viên uống Thấp Diệu Nang Tâm Bình hỗ trợ điều trị bệnh phong thấp (60 viên)', 10, 13, 'Việt Nam', 'Hộp', '\r\nViên bao', 35, '\r\nHộp 60 viên', '91000', 2, 'thap-dieu-nang-tam-binh-giam-dau-phong-te-thap', 1, 100, 2, 'avatar.png'),
(32, 'Nước dưỡng tóc tinh dầu bưởi Cocoon giảm gãy rụng và làm mềm tóc (140ml)', 3, 7, 'Việt Nam', 'Hộp', 'Hộp', 135, 'Hộp', '165000', 6, 'nuoc-duong-toc-tinh-dau-buoi-cocoon-giam-gay-rung-va-lam-mem-toc-140ml', 1, 191, 34, 'avatar.png'),
(33, 'Dưỡng tóc Yanagiya Hair Tonic hương bưởi ngăn ngừa gãy rụng, gàu, ngứa (240ml)', 6, 8, 'Nhật Bản', 'Chai', 'Chai', 135, 'Chai 240ml', '219000', 6, 'duong-toc-yanagiya-hair-tonic-huong-buoi-ngan-ngua-gay-rung-gau-ngua-240ml', 1, 1912, 34, 'avatar.png'),
(34, 'Mặt nạ Megrhythm Kao xông hơi mắt hương hoa oải hương làm tan biến sự mệt mỏi (5 miếng)', 8, 7, 'Nhật Bản', 'Hộp', 'Hộp', 142, 'Hộp 5 miếng', '112000', 6, 'mat-na-megrhythm-kao-xong-hoi-mat-huong-hoa-oai-huong-lam-tan-bien-su-met-moi-5-mieng', 1, 191, 34, 'avatar.png'),
(35, 'Lăn chăm sóc thâm quầng mất Emco UltraCream Thiên Khánh hỗ trợ giảm nếp nhăn đuôi mắt (15g)', 9, 9, 'Việt Nam', 'Tuýp', 'Tuýp', 143, 'Tuýp 15g', '140000', 6, 'lan-cham-soc-tham-quang-mat-emco-ultracream-thien-khanh-ho-tro-giam-nep-nhan-djuoi-mat-15g', 1, 191, 34, 'avatar.png');

-- --------------------------------------------------------

--
-- Table structure for table `medicine_detail`
--

CREATE TABLE `medicine_detail` (
  `id` int NOT NULL,
  `medicine_id` int DEFAULT NULL,
  `prescription` int DEFAULT '0',
  `age` varchar(555) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT 'Trên 12 tuổi',
  `create_date` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `view_number` int DEFAULT '0',
  `rate_number` int DEFAULT '0',
  `comment_number` int DEFAULT '0',
  `storage` varchar(555) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `usage` varchar(999) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `benefit` varchar(999) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `dosage` varchar(462) DEFAULT NULL,
  `handle_side_effect` varchar(999) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT 'Chưa có thông tin về tác dụng phụ của sản phẩm.',
  `box` varchar(4) DEFAULT NULL,
  `blister_pack` varchar(4) DEFAULT NULL,
  `note` varchar(811) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `medicine_detail`
--

INSERT INTO `medicine_detail` (`id`, `medicine_id`, `prescription`, `age`, `create_date`, `view_number`, `rate_number`, `comment_number`, `storage`, `usage`, `benefit`, `dosage`, `handle_side_effect`, `box`, `blister_pack`, `note`) VALUES
(1, 1, 0, 'Trên 12 tuổi', '24/05/2023', 0, 0, 0, 'Bảo quản ở nơi khô ráo, nhiệt độ dưới 30°C.', 'Thuốc dùng đường uống và có thể dùng khi bụng đói.', 'Panadol Extra được sản xuất bởi GlaxoSmithKline (GSK), với thành phần chính Paracetamol và Caffeine, là thuốc được dùng để điều trị hầu hết các triệu chứng đau từ nhẹ đến trung bình và hạ sốt', 'Người lớn (kể cả người cao tuổi) và trẻ em từ 12 tuổi trở lên\n\nNên dùng 1 hoặc 2 viên mỗi 4 đến 6 giờ nếu cần.\nThời gian tối thiểu dùng liều lặp lại: 4 giờ.\nNên sử dụng liều thấp nhất cần thiết để có hiệu quả trong thời gian điều trị ngắn nhất.\nThời gian tự điều trị không quá 3 ngày.\nLiều tối đa hàng ngày: 8 viên 4000 mg/520 mg (paracetamol/caffeine).\nKhông dùng quá liều chỉ định.\nTrẻ em dưới 12 tuổi\n\nKhông khuyến nghị dùng thuốc này cho trẻ em dưới 12 tuổi.', 'Khi gặp tác dụng phụ của thuốc, cần ngưng sử dụng và thông báo cho bác sĩ hoặc đến cơ sở y tế gần nhất để được xử trí kịp thời.', '15', '12', 'Bác sĩ cần cảnh báo bệnh nhân về các dấu hiệu của phản ứng trên da nghiêm trọng như hội chứng Stevens – Johnson (SJS), hội chứng hoại tử da nhiễm độc (TEN) hay hội chứng Lyell, hội chứng ngoại ban mụn mủ toàn thân cấp tính (AGEP).\n\nKhông dùng với các thuốc khác có chứa paracetamol.\n\nSử dụng đồng thời các thuốc khác có chứa paracetamol có thể dẫn đến tình trạng quá liều.\n\nDùng quá liều paracetamol có thể gây ra suy gan, điều này có thể cần đến việc ghép gan hoặc dẫn đến tử vong.\n\nCác bệnh nhân đang bị các bệnh về gan, có sự gia tăng nguy cơ gây hại của paracetamol đối với gan. Tham khảo ý kiến bác sĩ trước khi dùng thuốc này cho các bệnh nhân được chẩn đoán là suy gan hoặc suy thận.\n\nTránh dùng quá nhiều caffeine (ví dụ như từ cà phê, trà và một số đồ uống đóng hộp khác) trong khi đang dùng thuốc này.'),
(2, 2, 0, 'Tất cả độ tuổi', '2/1/2000', 0, 0, 0, 'Bảo quản nơi khô ráo, thoáng mát, nhiệt độ không quá 30 độ C, tránh ánh sáng. Để xa tầm tay trẻ em.', 'Lắc trước khi sử dụng.', 'Siro Ăn Ngon Healthy New bổ sung vitamin, lysine, taurin cho cơ thể, hỗ trợ kích thích tiêu hóa, giúp ăn ngon, hỗ trợ tăng cường sức khỏe, nâng cao sức đề kháng.', 'Trẻ từ 2 - 6 tuổi: 5ml/lần x 2 lần/ngày.\n\nTrẻ từ 7 - 10 tuổi: 10ml/lần x 2 lần/ngày.\n\nTrẻ trên 10 tuổi và người lớn: 15ml/lần x 2 lần/ngày.', 'Chưa có thông tin về tác dụng phụ của sản phẩm.', 'null', 'null', NULL),
(3, 3, 0, 'Tất cả độ tuổi', '3/1/2000', 0, 0, 0, 'Bảo quản nơi khô ráo, thoáng mát, nhiệt độ không quá 30oC, tránh ánh sáng trực tiếp. Để xa tầm tay trẻ em.', 'Để viên sủi hòa tan hoàn toàn trong 200 - 300ml nước đun sôi để nguội sau đó sử dụng. Không nên sử dụng sản phẩm vào buổi tối.', 'Viên sủi không đường Immune++ bổ sung beta glucan, kẽm, các vitamin và khoáng chất thiết yếu giúp tăng cường sức khỏe, nâng cao sức đề kháng cho cơ thể, giúp tăng cường tiêu hóa ăn ngon miệng', 'Trẻ em từ 1 tuổi trở lên và người lớn: Dùng 1 - 2 viên/ngày.', 'Chưa có thông tin về tác dụng phụ của sản phẩm.', 'null', 'null', 'Không dùng cho người mẫn cảm với bất kỳ thành phần nào của sản phẩm.\n\nTrẻ em dưới 1 tuổi tham khảo ý kiến thầy thuốc trước khi sử dụng.\n\nSản phẩm này không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh.\n\nĐọc kỹ hướng dẫn sử dụng trước khi dùng.'),
(4, 4, 0, 'Tất cả độ tuổi', '4/1/2000', 0, 0, 0, 'Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp từ mặt trời.\n\nĐể xa tầm tay trẻ em.', 'Uống vào buổi tối trước khi đi ngủ.\n\n', 'Trùng Thảo Gold hỗ trợ dễ ngủ, ngủ sâu giấc trong các trường hợp mất ngủ, ngủ kém. Hỗ trợ tăng cường sức khỏe, nâng cao sức đề kháng.\n', '\n\nNgười lớn: Uống 2 viên/lần/ngày.\n\nTrẻ em từ 12 tuổi: Uống 1 viên/lần/ngày.', 'Chưa có thông tin về tác dụng phụ của sản phẩm.', 'null', 'null', 'Không dùng cho người mẫn cảm với bất kỳ thành phần nào của sản phẩm.\n\nTrẻ em dưới 1 tuổi tham khảo ý kiến thầy thuốc trước khi sử dụng.\n\nSản phẩm này không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh.\n\nĐọc kỹ hướng dẫn sử dụng trước khi dùng.'),
(5, 5, 0, 'người lớn từ 18 tuổi trở lên', '5/1/2000', 0, 0, 0, 'Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp từ mặt trời.\n\nĐể xa tầm tay trẻ em.', 'Ngày uống 2 - 5 viên, uống lúc đói.\n\n', 'Hydro Lyzed Collagen With Vitamin C hỗ trợ chống oxy hoá. \n\nHỗ trợ giảm lão hoá da, giúp móng, tóc chắc khoẻ.', 'Ngày uống 2 - 5 viên, uống lúc đói.', 'Chưa có thông tin về tác dụng phụ của sản phẩm.', 'null', 'null', 'Không dùng cho người mẫn cảm với bất kỳ thành phần nào của sản phẩm.\n\nSản phẩm này không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh.\n\nĐọc kỹ hướng dẫn sử dụng trước khi dùng.'),
(6, 6, 0, 'Trẻ từ 12 tháng tuổi', '6/1/2000', 0, 0, 0, 'Nơi sạch sẽ, thoáng mát, tránh tiếp xúc trực tiếp với ánh nắng mặt trời.\n\n', 'Lắc đều trước khi uống, dùng ngon hơn khi uống lạnh.\n\n', 'Bổ sung dinh dưỡng, giúp tăng cường đề kháng và hệ miễn dịch ở trẻ.\n\nKích thích hệ tiêu hóa giúp trẻ ăn ngon hơn.\n\nPhát triển chiều cao và trí tuệ.\n', '', 'Chưa có thông tin về tác dụng phụ của sản phẩm.', 'null', 'null', NULL),
(7, 7, 0, 'trẻ từ 12 tháng tuổi', '7/1/2000', 0, 0, 0, 'Bảo quản nơi khô ráo, thoáng mát, nhiệt độ dưới 30 độ C, tránh ánh nắng trực tiếp từ mặt trời.\n\nĐể xa tầm tay trẻ em.', 'Trẻ em từ 1 tuổi: Uống 1 gói/lần, ngày 2 - 3 lần. Hoặc theo chỉ dẫn của bác sĩ hoặc dược sĩ.\n\nPha 1 gói với khoảng 30ml nước ấm, uống lúc đói. Có thể pha chung với các loại sữa hoặc hoà tan vào các dạng thức ăn loãng.\n\nKhông nên pha với nước hoặc thức ăn quá nóng (trên 40 độ C).', 'ColosMax Q10 cung cấp vitamin, khoáng chất và các enzym tiêu hoá. Hỗ trợ tiêu hóa và hấp thu thức ăn, tăng cường sức đề kháng.', 'Trẻ em từ 1 tuổi: Uống 1 gói/lần, ngày 2 - 3 lần. Hoặc theo chỉ dẫn của bác sĩ hoặc dược sĩ.\n\n', 'Chưa có thông tin về tác dụng phụ của sản phẩm.', '20', 'null', 'Nếu bạn đang mang thai, đang cho con bú, có bất kỳ vấn đề y tế nào hoặc đang có điều kiện y tế nào, cần tư vấn bác sĩ trước khi sử dụng. \n\nNgưng sử dụng và tư vấn bác sĩ của bạn nếu có phản ứng bất lợi xảy ra.\n\n Không sử dụng nếu niêm phong dưới đáy nắp bị vỡ hoặc lỗi.\n\nSản phẩm này không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh.\n\nĐọc kỹ hướng dẫn sử dụng trước khi dùng.'),
(8, 8, 0, 'Trên 12 tuổi', '1/1/2000', 5, 5, 0, 'Bảo quản nơi khô ráo, thoáng mát, nhiệt độ không quá 30 độ C, tránh ánh sáng trực tiếp.', 'Ngày uống 2 lần (sáng, tối), mỗi lần 1 viên.', 'Hỗ trợ tăng cường sinh lý nữ; cải thiện các triệu chứng khó chịu thời kỳ tiền mãn kinh và mãn kinh: bốc hỏa, đổ mồ hôi đêm, cáu gắt, mất ngủ, trầm cảm.', 'Ngày uống 2 lần (sáng, tối), mỗi lần 1 viên.', 'Chưa có thông tin về tác dụng phụ của sản phẩm', NULL, NULL, 'Bảo quản nơi khô ráo, thoáng mát, nhiệt độ không quá 30 độ C, tránh ánh sáng trực tiếp.'),
(9, 9, 0, 'Trên 12 tuổi', '1/1/2000', 5, 5, 0, 'Bảo quản nơi khô ráo, thoáng mát, nhiệt độ không quá 30 độ C, tránh ánh sáng trực tiếp.', 'Ngày uống 2 lần, mỗi lần 2 - 3 viên, uống xa bữa ăn.', 'Migrin Plus hỗ trợ hoạt huyết, tăng cường tuần hoàn máu não, giúp cải thiện các triệu chứng: hoa mắt, chóng mặt, đau nửa đầu, khó ngủ, suy giảm trí nhớ, đau mỏi vai gáy, tê bì chân tay, rối loạn tiền đình do thiểu năng tuần hoàn não.', 'Ngày uống 2 lần, mỗi lần 2 - 3 viên, uống xa bữa ăn.', 'Hiện chưa có thông tin về tác dụng phụ của sản phẩm. Nếu gặp bất kì triệu chứng nào bất thường nên ngừng sử dụng và thông báo cho bác sĩ hoặc chuyên viên y tế để được tư vấn.', '2', '10', 'Bảo quản nơi khô ráo, thoáng mát, nhiệt độ không quá 30 độ C, tránh ánh sáng trực tiếp.'),
(10, 10, 0, 'Trên 35 tuổi', '1/1/2000', 0, 0, 0, 'Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp từ mặt trời.', 'Uống 1 - 2 lần, mỗi lần 1 viên sau bữa ăn hoặc uống nhiều hơn nếu có hướng dẫn của thầy thuốc.', 'Evaskin 35 dùng cho phụ nữ sau 35 tuổi, phụ nữ bị các vết rạn da do tăng cân hoặc sau khi sinh.', 'Uống 1 - 2 lần, mỗi lần 1 viên sau bữa ăn hoặc uống nhiều hơn nếu có hướng dẫn của thầy thuốc.', 'Không dùng cho phụ nữ mang thai hoặc đang cho con bú, người mẫn cảm với bất kỳ thành phần nào của sản phẩm.', '3', '10', NULL),
(11, 12, 0, 'Trên 18 tuổi', '23/05/2023', 0, 0, 0, 'Để ở nhiệt độ phòng. Đóng nắp sau khi sử dụng xong sản phẩm.\r\n\r\nĐể xa tầm tay trẻ em.\r\n\r\n', 'Làm sạch bề mặt da đang cần chăm sóc hoặc điều trị bằng nước ấm. Thoa một lượng kem nhỏ lên trên vùng da cần chăm sóc hoặc điều trị. Massage nhẹ để kem thấm sâu vào da mang hiệu quả tốt hơn.\r\n\r\nCó thể dùng kem vào bất kỳ thời điểm nào trong ngày.', 'Kem mật ong Manuka 18+ Skin Health Crème giảm sưng tấy, mẩn đỏ, mẩn ngứa, bong tróc da. Thúc đẩy làm lành nhanh các tổn thương da.\r\n\r\nDưỡng ẩm chuyên biệt dành cho da (đặc biệt da nhạy cảm và khô). Nuôi dưỡng và phục hồi sức khỏe làn da.\r\n\r\nGiảm mụn, hạn chế tình trạng mụn trứng các, mụn viêm, mụn bọc.\r\n\r\nLàm mờ thâm mụn, sẹo mụn, phục hồi, tái tạo làn da sau thương tổn.\r\n\r\nLàm dịu các vết thương sau điều trị laser, dị ứng mỹ phẩm, sưng tấy do côn trùng đốt…\r\n\r\nLàm chậm quá trình lão hóa của da. Bảo vệ trước những tác nhân gây hại.\r\n\r\nĐiều trị hiệu quả tình trạng: chàm da, vẩy nến, viêm da, kích ứng, dị ứng.', 'Làm sạch bề mặt da đang cần chăm sóc hoặc điều trị bằng nước ấm. Thoa một lượng kem nhỏ lên trên vùng da cần chăm sóc hoặc điều trị. Massage nhẹ để kem thấm sâu vào da mang hiệu quả tốt hơn.\r\n\r\nCó thể dùng kem vào bất kỳ thời điểm nào trong ngày.', 'Chưa có thông tin về tác dụng phụ của sản phẩm.', NULL, NULL, 'Khả năng kháng khuẩn và điều trị của kem mật ong Manuka 18+ rất cao nên sản phẩm được khuyên dùng thông dụng cho đối tượng từ 14 tháng tuổi.\r\n\r\nVới trẻ em dưới 14 tháng tuổi chỉ dùng một lượng rất nhỏ hoặc người dùng sử dụng kem mật ong Manuka có chỉ số UMF thấp hơn là 16+. \r\n\r\nPhụ nữ mang thai trước khi sử dụng sản phẩm y khoa nào tốt nhất nên có sự tham khảo ý kiến chuyên môn của bác sĩ.\r\n\r\nSản phẩm chỉ dùng ngoài da. Tránh tiếp xúc trực tiếp với mắt.\r\n\r\nĐọc kỹ hướng dẫn sử dụng trước khi dùng.'),
(13, 13, 0, 'Trên 12 tuổi', '24/05/2023', 0, 0, 0, 'Bảo quản nơi khô ráo, thoáng mát, tránh ánh sáng trực tiếp.\r\n\r\nĐể xa tầm tay trẻ em.', 'Trong mỗi hộp Nacurgo gồm có:\r\n\r\nChai thủy tinh được bịt kín bởi nắp nhựa + bộ vòi dẫn và nắp chai.\r\n\r\nBước 1: Vặn nắp nhựa trên chai thủy tinh và tháo ra.\r\nBước 2: Lắp bộ vòi dẫn lên miệng chai và vặn chặt lại.\r\nBước 3: Mỗi lần sử dụng ấn nhẹ van xịt 1 - 2 lần cho đến khi dung dịch bao phủ toàn bộ vùng da cần chăm sóc.\r\nDung dịch sau khi khô sẽ tạo thành lớp màng sinh học bảo vệ da, góp phần thúc đẩy quá trình tái tạo da, ngăn ngừa vi khuẩn xâm nhập. Lớp màng này có khả năng tự phân hủy sinh học nên sau mỗi 4 - 5 tiếng, người dùng chỉ cần xịt lớp màng mới đè lên lớp màng cũ.', 'Nacurgo là dung dịch xịt trên da, tạo thành một lớp màng sinh học Polyesteramide giúp:\r\n\r\nLàm mát và dịu da.\r\nLàm sạch da, góp phần thúc đẩy quá trình tái tạo tế bào da.\r\nBảo vệ da, góp phần ngăn ngừa vi khuẩn xâm nhập.', 'Dung dịch xịt bảo vệ da Nacurgo dùng trong các trường hợp:  Vết thương mãn tính như vết loét do tì đè, nằm lâu vết loét bàn chân, loét do biến chứng của bệnh tiểu đường, loét da do tắc tĩnh mạch, lở loét da ở người già yếu. Vết thương cấp tính như vết trầy xước da, vết bỏng, vết khâu - mổ sau phẫu thuật, vết thương hở, vết đứt và rách da, vết côn trùng cắn, chấn thương ngoài da. Bảo vệ và phục hồi các loại mụn nhọt, viêm da.', 'Chưa có thông tin về tác dụng phụ của sản phẩm.', NULL, NULL, 'Sản phẩm chỉ dùng ngoài da. Tránh tiếp xúc trực tiếp với mắt. Trường hợp bị dính vào mắt cần rửa ngay bằng nước sạch.\r\n\r\nNên rửa sạch vùng da cần chăm sóc với dung dịch sát khuẩn (cồn, nước muối sinh lý...).\r\n\r\nDo có tính sát khuẩn, Nacurgo có thể gây ra cảm giác xót khi sử dụng nhưng sẽ dịu lại nhanh chóng.\r\n\r\nNgưng sử dụng và báo cho bác sĩ hoặc nhân viên y tế khi có xảy ra dị ứng với bất kỳ thành phần nào của sản phẩm.\r\n\r\nĐọc kỹ hướng dẫn sử dụng trước khi dùng.'),
(15, 16, 0, 'Trên 12 tuổi', '26/05/2023', 0, 0, 0, 'Bảo quản nơi khô ráo, thoáng mát, tránh ánh sáng, nhiệt độ dưới 30 độ C.\r\n\r\n', 'Ngày uống 2 lần, mỗi lần 3 viên.\r\n\r\n', 'Đại Tràng Tâm Bình hỗ trợ giảm triệu chứng của viêm đại tràng cấp và mãn tính, viêm đại tràng co thắt, rối loạn tiêu hóa, đầy hơi, tiêu chảy.\r\n\r\n', 'Ngày uống 2 lần, mỗi lần 3 viên.\r\n\r\n', 'Chưa có thông tin về tác dụng phụ của sản phẩm.\r\n\r\n', '5', '12', NULL),
(16, 22, 0, 'Trên 12 tuổi', '26/05/2023', 0, 0, 0, 'Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp từ mặt trời.\r\n\r\nĐể xa tầm tay trẻ em.', 'Làm sạch vùng sẹo cần điều trị, lấy lượng kem đủ dùng thoa đều lên vùng sẹo, massage nhẹ nhàng để kem thẩm thấu sâu vào da.', 'Scar Rejuvaskin Esthetique Silicone giúp làm sáng đa, mờ sẹo thâm, làm đầy sẹo rỗ, sẹo lõm.', 'Cứ mỗi 3 - 4 tiếng làm sạch vùng da sẹo và thoa lớp kem mới. Cuối ngày vệ sinh lại da bằng sữa rửa mặt (cho vùng mặt) hoặc sữa tắm (nếu sẹo trên cơ thể).', 'Chưa có thông tin về tác dụng phụ của sản phẩm.', NULL, NULL, 'Sản phẩm không điều trị sẹo lồi. Nếu bạn bị sẹo lồi hoặc vết thương mới, vui lòng sử dụng Rejuvasil Gel và miếng dán Scar Fx sẽ giúp điều trị sẹo lồi tốt hơn.\r\n\r\nRiêng trẻ sơ sinh và phụ nữ có thai nên tham khảo ý kiến của bác sĩ.'),
(18, 17, 0, 'Trên 12 tuổi', '26/05/2023', 0, 0, 0, 'Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp từ mặt trời.\r\n\r\nĐậy nắp sau khi sử dụng.\r\n\r\nĐể xa tầm tay trẻ em.', 'Thoa một lượng gel trị sẹo Fixderma vừa đủ lên vết sẹo 3 - 4 lần/ngày trong vòng 8 - 10 tuần.', 'Gel trị sẹo Fixderma Scar Gel giúp làm mờ sẹo do mụn, bỏng, rạn da, vết thương, phẫu thuật. Làm mềm và mịn da vùng sẹo.\r\n\r\nHiệu quả cao cho:\r\n\r\nSẹo phì đại, sẹo lồi (cũ và mới), sẹo do mụn, bỏng, rạn da, vết thương, phẫu thuật.\r\nSẹo do tai nạn và các lý do khác.', ' 3 - 4 lần/ngày trong vòng 8 - 10 tuần.', 'Chưa có thông tin về tác dụng phụ của sản phẩm.', NULL, NULL, 'Sản phẩm chỉ dùng ngoài da. Tránh để tiếp xúc trực tiếp với mắt. \r\n\r\nĐọc kỹ hướng dẫn sử dụng trước khi dùng.'),
(20, 24, 0, 'Trên 12 tuổi', '27/05/2023', 0, 0, 0, 'Vặn chặt nắp lọ sau khi dùng, để nơi mát (có thể cất giữ ở ngăn mát của tủ tạnh), tránh ánh nắng trực tiếp và nơi có nhiệt độ cao.\r\n\r\n', 'Thoa Serum Acnes C10 ngày 2 lần, xen kẽ trong routine dưỡng da hàng ngày. Dùng ngay sau bước toner, bởi khi đó da có độ pH phù hợp nhất để serum phát huy hiệu quả. Tiếp đến là các bước dưỡng khác như bình thường.', 'Acnes C10 có công dụng mờ vết thâm, sáng da xỉn màu.\r\n\r\nGiúp sẹo mụn trơn phẳng, lỗ chân lông thu nhỏ, da mịn màng\r\n\r\nHỗ trợ mờ nám, tàn nhang và làm giảm nếp nhăn.', 'Bóp nhẹ đầu ống, lấy một lượng thích hợp (3 - 4 giọt) ra lòng bàn tay, dùng đầu ngón tay thoa đều lên vùng da cần chăm sóc 2 lần mỗi ngày (sáng và tối).', 'Chưa có thông tin về tác dụng phụ của sản phẩm.', NULL, NULL, 'Đọc kỹ hướng dẫn sử dụng trước khi dùng.\r\n\r\nKhi thoa Acnes C10 sẽ có cảm giác châm chích nhẹ trên da mặt.\r\n\r\nSản phẩm này không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh.'),
(21, 25, 0, 'Trên 12 tuổi', '27/05/2023', 0, 0, 0, 'Bảo quản nơi khô mát, nhiệt độ dưới 30 độ C, tránh ánh sáng trực tiếp và nước vào.\r\n\r\nĐể xa tầm tay trẻ em.\r\n\r\n', 'Trong thời gian mang thai, thoa bắt đầu từ quý thứ hai của thai kì.\r\n\r\nHiệu quả khác nhau ở mỗi người.', 'Tinh dầu Bio-Oil giúp chăm sóc da chuyên biệt trong các trường hợp da bị sẹo, có vết rạn, da không đều màu, da lão hóa và mất nước.', 'Thoa ngày 2 lần trong khoảng thời gian tối thiểu 3 tháng.\r\n\r\n', 'Chưa có thông tin về tác dụng phụ của sản phẩm.\r\n\r\n', NULL, NULL, 'Chỉ dùng ngoài da. Không dùng cho vết thương hở.\r\n\r\nNgưng sử dụng trong những trường hợp như bị kích ứng da.\r\n\r\nTránh để sản phẩm tiếp xúc với mắt. Nếu sản phẩm rơi vào mắt, rửa cẩn thận với nước.\r\n\r\nĐọc kỹ hướng dẫn sử dụng trước khi dùng.'),
(22, 27, 0, 'Trên 12 tuổi', '27/05/2023', 0, 0, 0, 'Nơi thoáng mát, tránh ánh nắng trực tiếp.\r\n\r\nKhông làm đông lạnh.\r\n\r\n', 'Dùng một lượng Lotion dưỡng ẩm Fixderma Cosmetic Laboratories vừa đủ khi tắm, mát xa nhẹ nhàng và rửa sạch, tránh tiếp xúc với mắt.\r\n\r\nDùng cho toàn thân.', 'Lotion dưỡng ẩm Fixderma Cosmetic Laboratories làm dịu da, giữ ẩm trong 24 giờ để bảo vệ lâu dài và dưỡng ẩm làn da.\r\n\r\nLàm giảm triệu chứng kích ứng da như khô, khó chịu, bong da và ngứa.\r\n\r\nLàm cho da mềm mại và mịn màng.', 'khi tắm, mát xa nhẹ nhàng và rửa sạch, tránh tiếp xúc với mắt.', 'Ngưng sử dụng và báo cho bác sĩ hoặc nhân viên y tế khi có xảy ra dị ứng với bất kỳ thành phần nào của sản phẩm.\r\n\r\n', NULL, NULL, 'Ngưng sử dụng và báo cho bác sĩ hoặc nhân viên y tế khi có xảy ra dị ứng với bất kỳ thành phần nào của sản phẩm\r\n\r\nĐể xa tầm tay trẻ em.'),
(23, 26, 0, 'Trên 12 tuổi', '27/05/2023', 0, 0, 0, 'Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp từ mặt trời.\r\n\r\nĐậy nắp sau khi sử dụng.\r\n\r\nĐể xa tầm tay trẻ em.\r\n\r\n', 'Dùng tắm hằng ngày.\r\n\r\nLàm ướt làn da trước khi thoa sản phẩm. Nhẹ nhàng mát xa để làm sạch cơ thể. Rửa lại với nước sạch.\r\n\r\nKết hợp với pH5 Lotion để mang lại hiệu quả tối ưu.', 'Sữa tắm Eucerin pH5 Washlotion kích hoạt cơ chế bảo vệ tự nhiên của da với công thức pH5 Enzyme Protection độc đáo. Nhẹ nhàng làm sạch và duy trì lớp bảo vệ da nhạy cảm trước các tác động của môi trường.', 'Dùng tắm hằng ngày.\r\n\r\n', 'Chưa có thông tin về tác dụng phụ của sản phẩm.', NULL, NULL, 'Sản phẩm chỉ dùng ngoài da. Tránh để tiếp xúc trực tiếp với mắt. Trường hợp bị dính vào mắt cần rửa ngay bằng nước sạch.\r\n\r\nĐọc kỹ hướng dẫn sử dụng trước khi dùng.'),
(24, 28, 0, 'Trên 12 tuổi', '27/05/2023', 0, 0, 0, 'Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp.\r\n\r\nĐậy nắp sau khi dùng.\r\n\r\nĐể xa tầm tay trẻ em.\r\n\r\n', 'Thoa lên da ướt, tạo bọt và rửa sạch, sử dụng vào buổi sáng và/hoặc buổi tối. Thấm khô nhẹ nhàng, không chà xát.', 'SVR Physiopure Gelee Moussante làm sạch nhẹ nhàng làn da nhạy cảm,  cung cấp sức sống và đồng thời giải độc cho da. Đem lại cảm giác thoải mái và mềm mại cho làn da, ngăn chặn cảm giác da bị căng.', 'Dùng hằng ngày', 'Chưa có thông tin về tác dụng phụ của sản phẩm.', NULL, NULL, 'Không dùng cho vùng da bị kích ứng hoặc vết thương hở.\r\n\r\nKhông sử dụng khi mẫn cảm với bất kỳ thành phần nào trong sản phẩm.\r\n\r\nSản phẩm chỉ dùng ngoài da. Tránh để tiếp xúc trực tiếp với mắt. Trường hợp bị dính vào mắt cần rửa ngay bằng nước sạch.\r\n\r\nĐọc kỹ hướng dẫn sử dụng trước khi dùng.'),
(25, 29, 0, 'Trên 12 tuổi', '27/05/2023', 0, 0, 0, 'Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp.\r\n\r\nĐậy nắp sau khi dùng.\r\n\r\nĐể xa tầm tay trẻ em.\r\n\r\n', 'Sau khi rửa mặt và lau khô, lấy một lượng gel vừa đủ dùng ra lòng bàn tay, nhẹ nhàng massage gel theo chuyển động tròn khắp mặt.\r\n\r\nSau khi gel tạo thành chất như gôm, massage thêm 1 phút nữa, rồi rửa mặt thật sạch với nước.', 'Rosette Gommage Moist giúp làm mềm lớp sừng, loại bỏ các tế bào chết và bị tổn thương, cho lỗ chân lông luôn được thông thoáng.\r\n\r\nThúc đẩy da sản sinh tế bào mới, trẻ hóa và tăng độ khỏe mạnh cho da.\r\n\r\nCân bằng độ ẩm, cải thiện độ đàn hồi cho làn da mềm mịn, săn chắc. Cho lớp trang điểm mịn và đẹp hơn.', 'Sử dụng 2 - 3 lần/tuần.\r\n\r\n', 'Chưa có thông tin về tác dụng phụ của sản phẩm.', NULL, NULL, 'Không dùng cho vùng da bị kích ứng hoặc vết thương hở.\r\n\r\nNgưng sử dụng và tham khảo ý kiến của bác sĩ da liễu nếu xảy ra triệu chứng bất thường.\r\n\r\nKhông sử dụng khi mẫn cảm với bất kỳ thành phần nào trong sản phẩm.\r\n\r\nSản phẩm chỉ dùng ngoài da. Tránh để tiếp xúc trực tiếp với mắt. Trường hợp bị dính vào mắt cần rửa ngay bằng nước sạch.\r\n\r\nĐọc kỹ hướng dẫn sử dụng trước khi dùng.'),
(26, 30, 0, 'Trên 18 tuổi', '24/05/2023', 0, 0, 0, 'Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp từ mặt trời.\r\n\r\n', 'Uống trước khi ăn 30 phút hoặc sau khi ăn 1 - 2 giờ.', 'Vững Mạch Chi hỗ trợ tăng tính bền thành mạch, giảm nguy cơ suy giãn tĩnh mạch.\r\n', 'Uống trước khi ăn 30 phút hoặc sau khi ăn 1 - 2 giờ.\r\n\r\n', 'Không dùng cho người mẫn cảm với bất kỳ thành phần nào của sản phẩm.\r\n\r\n', 'null', 'null', 'Để xa tầm tay trẻ em.'),
(27, 31, 0, '', '24/05/2023', 2, 0, 0, 'Bảo quản nơi khô ráo, thoáng mát, nhiệt độ không quá 30 độ C, tránh ánh sáng.\r\n\r\n', 'Người có tiền sử dạ dày nên uống sau khi ăn.\r\n\r\n', 'Thấp Diệu Nang Tâm Bình hỗ trợ giảm triệu chứng của đau thần kinh tọa, thần kinh liên sườn, đau do thoát vị đĩa đệm, gai cột sống, đau vai gáy, đau nhức mỏi xương khớp, tê buồn chân tay, thấp khớp, viêm khớp dạng thấp.\r\n\r\n', 'Ngày uống 2 lần, mỗi lần 3 viên trước khi ăn 30 phút.\r\n\r\n', 'Chưa có thông tin về tác dụng phụ của sản phẩm.', 'null', 'null', 'Không sử dụng cho người mẫn cảm với bất cứ thành phần nào của sản phẩm. \r\n\r\n'),
(28, 33, 0, 'Trên 12 tuổi', '24/05/2023', 0, 0, 0, 'Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp từ mặt trời.\r\n\r\nĐể xa tầm tay trẻ em.\r\n\r\n', 'Thoa trực tiếp một lượng thích hợp trên da đầu nơi chân tóc và mát xa nhẹ nhàng trên tóc.\r\n\r\nNên dùng 2 - 3 lần mỗi ngày.\r\n\r\nNếu sử dụng sau khi gội đầu thì đổ ra lượng vừa phải trên khăn lau nhẹ lên tóc hoặc có thể xoa nhẹ sát da đầu nơi chân tóc.', 'Dưỡng tóc hương bưởi Yanagiya Hair Tonic giúp ngăn ngừa tóc gãy rụng, tóc thưa mỏng, gàu và ngứa, nuôi dưỡng tóc chắc khỏe. Thành phần bưởi thiên nhiên giúp làm sạch mềm da đầu, mùi hương bưởi thiên nhiên dễ chịu.', 'dùng 2 - 3 lần mỗi ngày.', 'Chưa có thông tin về tác dụng phụ của sản phẩm.', NULL, NULL, 'Không sử dụng cho người có tiền sử nhạy cảm với bất kỳ thành phần nào của sản phẩm.\r\n\r\nSản phẩm chỉ dùng ngoài da. Tránh để tiếp xúc trực tiếp với mắt. Trong trường hợp tiếp xúc mắt nên rửa sạch với nước hay nước ấm ngay lập tức.\r\n\r\nĐọc kỹ hướng dẫn sử dụng trước khi dùng.'),
(29, 33, 0, 'Trên 12 tuổi', '28/05/2023', 0, 0, 0, 'Đậy nắp sau khi sử dụng.\r\n\r\nNơi khô ráo thoáng mát, tránh ánh nắng trực tiếp, nơi có nhiệt độ cao hoặc ẩm ướt.', 'Lắc đều trước khi sử dụng, xịt sản phẩm lên chân tóc và mái tóc, tránh vùng mắt. Mát-xa nhẹ nhàng để dưỡng chất thấm sâu. Dùng mỗi ngày để đạt hiệu quả tốt nhất.', 'Nước dưỡng tóc tinh dầu bưởi Cocoon giúp giảm gãy rụng tóc.\r\n\r\nTăng cường độ bóng và chắc khỏe của tóc.\r\n\r\nCung cấp dưỡng chất giúp tóc suôn mượt và mềm mại.', 'Lượng dùng: 3 - 4 lần xịt đều lên mái tóc.', 'Chưa có thông tin về tác dụng phụ của sản phẩm.', NULL, NULL, 'Tránh dùng vùng mắt, chỉ dùng ngoài da.\r\n\r\n'),
(30, 34, 0, 'Trên 12 tuổi', '28/05/2023', 0, 0, 0, 'Nơi khô ráo, thoáng mát, tránh ánh nắng mặt trời.\r\n\r\n', 'Lấy mặt nạ ra khỏi bao bì. Mặt nạ bắt đầu ấm dần lên ngay lúc mở bao bì. Hãy sử dụng ngay sau khi mở ra.\r\n\r\nTách đường rãnh giữa và đeo quai vào hai tai.', 'Làn hơi ấm dễ chịu 40°C nhẹ nhàng bao phủ đôi mắt giúp đôi mắt mệt mỏi được thư giãn.\r\n\r\nVới công nghệ Self-warming từ Nhật Bản, mặt nạ tự động ấm dần lên ngay sau khi mở, rất tiện lợi để sử dụng.\r\n\r\nTrải nghiệm cảm giác spa tức thì, tận hưởng đến 20 phút thư giản mọi lúc mọi nơi: Trước khi đi ngủ, khi đi máy bay/tàu xe, nghỉ giữa giờ làm, bất kì lúc nào cần thư giãn.', 'Tách đường rãnh giữa và đeo quai vào hai tai.\r\n\r\n', 'Chưa có thông tin về tác dụng phụ của sản phẩm.', NULL, NULL, 'Không sử dụng cùng lúc với các loại mặt nạ mặt khác.\r\n\r\nNếu sử dụng thuốc nhỏ mắt, đợi vài phút trước khi đắp mặt nạ mắt.\r\n\r\nNhắm mắt và không ấn lên mắt trong suốt thời gian sử dụng mặt nạ.\r\n\r\nMặt nạ mắt có thể làm nhòe hoặc trôi lớp trang điểm.\r\n\r\nKhông sử dụng mặt nạ mắt đã bị hư hại.\r\n\r\nKhông tái sử dụng mặt nạ sau khi đã mất độ ấm.\r\n\r\nKhông sử dụng lò vi sóng để làm nóng mặt nạ.'),
(31, 35, 0, 'Trên 12 tuổi', '28/05/2023', 0, 0, 0, 'Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp từ mặt trời.\r\n\r\nĐể xa tầm tay trẻ em.\r\n\r\n', 'Sử dụng một chiếc khăn mềm để vệ sinh vùng da mắt sạch sẽ.\r\n\r\nLấy một lượng kem Emco vừa đủ thoa đều vào vùng da thâm quầng dưới mắt.\r\n\r\nNên sử dụng kem trước khi đi ngủ hoặc những lúc nghỉ ngơi để thời gian cho kem được thấm sâu hơn.', 'Emco giúp làm giảm vết thâm nơi đuôi mắt.\r\n\r\nDưỡng da vùng mắt.', 'Lấy một lượng kem Emco vừa đủ thoa đều vào vùng da thâm quầng dưới mắt.', 'Chưa có báo cáo về tác dụng phụ của sản phẩm.', NULL, NULL, 'Hiệu quả sử dụng tùy cơ địa từng người.\r\n\r\nKhông sử dụng cho người nhạy cảm với bất kỳ thành phần nào của sản phẩm.\r\n\r\nSản phẩm chỉ dùng ngoài da. Tránh để tiếp xúc trực tiếp với mắt.\r\n\r\nĐọc kỹ hướng dẫn sử dụng trước khi dùng.\r\n');

-- --------------------------------------------------------

--
-- Table structure for table `medicine_ingredient`
--

CREATE TABLE `medicine_ingredient` (
  `id` int NOT NULL,
  `medicine_id` int DEFAULT NULL,
  `ingredient_id` int DEFAULT NULL,
  `content` varchar(999) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT 'Không có thông tin cụ thể'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `medicine_ingredient`
--

INSERT INTO `medicine_ingredient` (`id`, `medicine_id`, `ingredient_id`, `content`) VALUES
(1, 1, 1, '65mg'),
(2, 1, 2, '500mg'),
(3, 2, 3, '5000mg'),
(4, 2, 4, 'Không có thông tin cụ thể'),
(5, 2, 5, 'Không có thông tin cụ thể'),
(6, 2, 6, '480mg'),
(7, 2, 7, '360mg'),
(8, 2, 8, '7200mg'),
(9, 2, 9, '120mg'),
(10, 2, 10, '10mcg'),
(11, 2, 11, '24mcg'),
(12, 2, 12, '1200mg'),
(13, 2, 13, '36mg'),
(14, 2, 14, '36mg'),
(15, 2, 15, '36mg'),
(16, 2, 16, '240mg'),
(17, 3, 17, '15mg'),
(18, 3, 6, '5mg'),
(19, 3, 20, '5mg'),
(20, 3, 21, 'null'),
(21, 3, 22, '1mcg'),
(22, 3, 23, '2mg'),
(23, 3, 24, '15mg'),
(24, 3, 25, '1.6mg'),
(25, 3, 26, '15mg'),
(26, 4, 27, '300mg'),
(28, 4, 29, '80cmg'),
(29, 4, 30, '20mg'),
(30, 4, 31, '300mg'),
(31, 4, 32, '100IU'),
(32, 4, 33, '100IU'),
(33, 4, 34, '50mg'),
(34, 5, 21, '10mg'),
(35, 5, 36, '15mg'),
(36, 5, 37, '1000mg'),
(37, 5, 35, '6,25mg'),
(38, 6, 38, 'Không có thông tin cụ thể'),
(40, 6, 40, 'Không có thông tin cụ thể'),
(42, 6, 42, 'Không có thông tin cụ thể'),
(43, 6, 43, 'Không có thông tin cụ thể'),
(44, 6, 44, '0.15mg'),
(45, 6, 45, 'Không có thông tin cụ thể'),
(46, 7, 12, '150'),
(47, 7, 10, '10mcg'),
(48, 7, 19, '1,87mg'),
(49, 7, 15, '0,3mg'),
(50, 7, 5, 'Không có thông tin cụ thể'),
(51, 7, 46, '250'),
(52, 7, 47, '23mg'),
(53, 4, 11, '1-mg'),
(54, 4, 13, '1-mg'),
(55, 4, 15, '1-mg'),
(57, 4, 52, '50-mg'),
(59, 5, 21, '100 mg'),
(60, 5, 24, '10 mg'),
(61, 5, 27, '15 mg'),
(62, 5, 21, '100 mg'),
(63, 5, 24, '10 mg'),
(64, 5, 27, '15 mg'),
(65, 5, 31, '6.2 mg'),
(68, 12, 55, 'Không có thông tin cụ thể'),
(69, 12, 56, 'Không có thông tin cụ thể'),
(70, 12, 57, 'Không có thông tin cụ thể'),
(73, 12, 55, 'Không có thông tin cụ thể'),
(74, 12, 56, 'Không có thông tin cụ thể'),
(75, 12, 57, 'Không có thông tin cụ thể'),
(82, 6, 40, 'Không có thông tin cụ thể'),
(83, 6, 44, 'Không có thông tin cụ thể'),
(86, 7, 11, '30-mg'),
(87, 7, 13, '3-mg'),
(88, 7, 15, '30-mg'),
(90, 7, 15, '5-mg'),
(91, 7, 10, '15'),
(92, 8, 77, '30-mg'),
(93, 8, 78, '100-mg'),
(94, 8, 79, '100-mg'),
(95, 8, 80, '40-mg'),
(96, 8, 81, '5-mg'),
(97, 9, 82, '30-mg'),
(98, 9, 83, '100-mg'),
(99, 9, 84, '100-mg'),
(100, 9, 85, '40-mg'),
(101, 9, 86, '35-mg'),
(102, 9, 87, '290-mg'),
(103, 9, 88, '300-mg'),
(104, 9, 89, '100-mg'),
(105, 9, 90, '450-mg'),
(106, 10, 37, '10 mg'),
(107, 10, 91, '120 mg'),
(108, 10, 92, '6IU'),
(109, 10, 93, '880 mg'),
(111, 16, 98, '25 mg'),
(112, 16, 99, '200 mg'),
(113, 16, 100, '90 mg'),
(114, 16, 101, '100 mg'),
(115, 16, 102, '45 mg'),
(116, 16, 103, '25 mg'),
(117, 16, 104, '5 mg'),
(118, 16, 105, '15 mg'),
(119, 17, 128, 'Không có thông tin cụ thể'),
(121, 17, 130, 'Không có thông tin cụ thể'),
(122, 17, 131, 'Không có thông tin cụ thể'),
(127, 17, 134, 'Không có thông tin cụ thể'),
(128, 17, 135, 'Không có thông tin cụ thể'),
(129, 17, 136, 'Không có thông tin cụ thể'),
(130, 17, 137, 'Không có thông tin cụ thể'),
(131, 17, 138, 'Không có thông tin cụ thể'),
(132, 17, 139, 'Không có thông tin cụ thể'),
(133, 17, 140, 'Không có thông tin cụ thể'),
(134, 17, 141, 'Không có thông tin cụ thể'),
(135, 17, 142, 'Không có thông tin cụ thể'),
(136, 17, 143, 'Không có thông tin cụ thể'),
(137, 25, 145, 'Không có thông tin cụ thể'),
(138, 25, 144, 'Không có thông tin cụ thể'),
(139, 25, 93, 'Không có thông tin cụ thể'),
(140, 25, 46, 'Không có thông tin cụ thể'),
(141, 24, 93, 'Không có thông tin cụ thể'),
(142, 24, 147, 'Không có thông tin cụ thể'),
(143, 24, 148, 'Không có thông tin cụ thể'),
(144, 24, 149, 'Không có thông tin cụ thể'),
(145, 24, 21, 'Không có thông tin cụ thể'),
(146, 24, 142, 'Không có thông tin cụ thể'),
(147, 26, 150, 'Không có thông tin cụ thể'),
(148, 26, 151, 'Không có thông tin cụ thể'),
(149, 27, 135, 'Không có thông tin cụ thể'),
(150, 27, 152, 'Không có thông tin cụ thể'),
(151, 27, 153, 'Không có thông tin cụ thể'),
(152, 27, 154, 'Không có thông tin cụ thể'),
(153, 29, 15, 'Không có thông tin cụ thể'),
(154, 29, 155, 'Không có thông tin cụ thể'),
(155, 29, 158, 'Không có thông tin cụ thể'),
(156, 29, 156, 'Không có thông tin cụ thể'),
(157, 29, 157, 'Không có thông tin cụ thể'),
(158, 28, 159, 'Không có thông tin cụ thể'),
(159, 28, 160, 'Không có thông tin cụ thể'),
(160, 30, 82, '60 mg'),
(161, 30, 83, '60 mg'),
(162, 30, 143, 'Không có thông tin cụ thể'),
(163, 30, 162, '80 mg'),
(164, 30, 163, '80 mg'),
(165, 31, 143, 'Không có thông tin cụ thể'),
(166, 31, 144, 'Không có thông tin cụ thể'),
(169, 31, 34, '10 mg'),
(170, 31, 156, '20 mg'),
(171, 32, 164, 'Không có thông tin cụ thể'),
(172, 32, 165, 'Không có thông tin cụ thể'),
(173, 32, 166, 'Không có thông tin cụ thể'),
(174, 32, 167, 'Không có thông tin cụ thể'),
(175, 33, 168, 'Không có thông tin cụ thể'),
(176, 33, 169, 'Không có thông tin cụ thể'),
(177, 33, 170, 'Không có thông tin cụ thể'),
(178, 33, 171, 'Không có thông tin cụ thể'),
(179, 33, 171, 'Không có thông tin cụ thể'),
(180, 35, 172, 'Không có thông tin cụ thể'),
(181, 35, 173, 'Không có thông tin cụ thể'),
(182, 35, 174, 'Không có thông tin cụ thể'),
(183, 35, 175, 'Không có thông tin cụ thể'),
(184, 35, 176, 'Không có thông tin cụ thể');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `total_payment` int DEFAULT NULL,
  `create_date` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `payment_method` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `address` longtext CHARACTER SET utf8 COLLATE utf8_general_ci,
  `message` longtext CHARACTER SET utf8 COLLATE utf8_general_ci,
  `addressee` longtext CHARACTER SET utf8 COLLATE utf8_general_ci,
  `phone_number` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `status` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `total_payment`, `create_date`, `payment_method`, `address`, `message`, `addressee`, `phone_number`, `status`) VALUES
(58, 101, 96000, '16/05/2023', 'paypal', 'Tỉnh Phú Thọ / Huyện Thanh Thuỷ / Xã Tu Vũ / dfdsf', '', 'Doan Tran Phi Khanh', '0707342530', NULL),
(59, 101, 2000, '16/05/2023', 'paypal', 'Tỉnh Phú Thọ / Huyện Thanh Sơn / Xã Địch Quả / asdasd', '', 'Doan Tran Phi Khanh', '0707342530', NULL),
(60, 103, 45900, '26/05/2023', 'paypal', 'Tỉnh Tuyên Quang / Huyện Lâm Bình / Xã Phúc Yên / 12', '', 'danh', '0324728422', NULL),
(61, 103, 72000, '26/05/2023', 'paypal', 'Tỉnh Cao Bằng / Huyện Trùng Khánh / Xã Quang Hán / 213', '', 'abc', '0327172374', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `order_detail`
--

CREATE TABLE `order_detail` (
  `id` int NOT NULL,
  `order_id` int DEFAULT NULL,
  `medicine_id` int DEFAULT NULL,
  `price` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `unit` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `order_detail`
--

INSERT INTO `order_detail` (`id`, `order_id`, `medicine_id`, `price`, `quantity`, `unit`) VALUES
(67, 58, 2, 48000, 2, 'hộp'),
(68, 59, 2, 2000, 1, 'viên'),
(69, 60, 10, 45900, 1, 'Viên'),
(70, 61, 1, 18000, 4, 'Vỉ'),
(71, 61, 30, 306000, 1, 'hộp'),
(72, 61, 31, 91000, 1, 'hộp');

-- --------------------------------------------------------

--
-- Table structure for table `producer`
--

CREATE TABLE `producer` (
  `id` int NOT NULL,
  `name` varchar(49) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `producer`
--

INSERT INTO `producer` (`id`, `name`) VALUES
(4, 'COLLAGENE'),
(8, 'CÔNG TY CỔ PHẦN DƯỢC PHẨM CVI'),
(2, 'CÔNG TY CỔ PHẦN DƯỢC PHẨM PHÚC LÂM'),
(6, 'CÔNG TY CP DƯỢC PHẨM QD-MELIPHAR'),
(5, 'CÔNG TY CP THỰC PHẨM DINH DƯỠNG NUTRINEST'),
(3, 'CÔNG TY DƯỢC PHẨM VÀ THƯƠNG MẠI THÀNH CÔNG - TNHH'),
(7, 'Ecogreen'),
(9, 'GMP'),
(11, 'kingphar'),
(1, 'SANOFI'),
(10, 'Tâm Bình');

-- --------------------------------------------------------

--
-- Table structure for table `rate`
--

CREATE TABLE `rate` (
  `id` int NOT NULL,
  `medicine_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `star` int DEFAULT NULL,
  `content` varchar(999) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `rate`
--

INSERT INTO `rate` (`id`, `medicine_id`, `user_id`, `star`, `content`) VALUES
(2, 10, 103, 5, 'đánh giá'),
(3, 10, 103, 5, 'a');

-- --------------------------------------------------------

--
-- Table structure for table `saved`
--

CREATE TABLE `saved` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `medicine_id` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `saved`
--

INSERT INTO `saved` (`id`, `user_id`, `medicine_id`, `created_date`) VALUES
(7, 103, 10, '2023-05-26 17:56:27'),
(8, 101, 1, '2023-05-26 18:08:38'),
(9, 103, 27, '2023-05-27 18:48:32');

-- --------------------------------------------------------

--
-- Table structure for table `unit`
--

CREATE TABLE `unit` (
  `id` int NOT NULL,
  `name` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `level` int DEFAULT NULL,
  `medicine_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `price` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `unit`
--

INSERT INTO `unit` (`id`, `name`, `level`, `medicine_id`, `quantity`, `price`) VALUES
(1, 'Viên', 0, 2, 12, 2000),
(2, 'Vỉ', 1, 2, 2, 24000),
(3, 'Hộp', 2, 2, 1, 48000),
(4, 'Hộp', 0, 3, 1, 40000),
(5, 'Hộp', 0, 4, 1, 173000),
(6, 'Hộp', 0, 5, 1, 400000),
(7, 'Hộp', 0, 6, 1, 131200),
(8, 'Hộp', 0, 7, 1, 161000),
(9, 'Viên', 0, 8, 60, 12000),
(10, 'Hộp', 1, 8, 1, 720000),
(11, 'Viên', 0, 9, 10, 8500),
(12, 'Vỉ', 1, 9, 2, 85000),
(13, 'Hộp', 2, 9, 1, 170000),
(14, 'Viên', 0, 10, 10, 45900),
(15, 'Vỉ', 1, 10, 3, 459000),
(16, 'Hộp', 2, 10, 1, 1377000),
(17, 'Tuýp', 0, 13, 100, 119000),
(18, 'Viên', 0, 16, 12, 1483),
(19, 'Vỉ', 1, 16, 5, 17800),
(20, 'Hộp', 2, 16, 1, 89000),
(21, 'Viên', 0, 1, 12, 1500),
(22, 'Vỉ', 1, 1, 15, 18000),
(23, 'Hộp', 2, 1, 1002, 270000),
(24, 'Tuýp', 0, 12, 200, 499000),
(25, 'Tuýp', 0, 17, 567, 278000),
(26, 'Tuýp', 0, 22, 289, 45000),
(27, 'Chai', 0, 25, 215, 319500),
(28, 'Hộp', 0, 24, 242, 319000),
(29, 'Tuýp', 0, 27, 222, 450000),
(30, 'Chai', 0, 26, 111, 499000),
(31, 'Tuýp', 0, 28, 333, 155000),
(32, 'Tuýp', 0, 29, 444, 175000),
(33, 'Hộp', 0, 30, 1, 306000),
(34, 'Hộp', 0, 31, 1, 91000),
(35, 'Hộp', 0, 32, 191, 165000),
(36, 'Chai', 0, 33, 1912, 219000),
(37, 'Hộp', 0, 34, 191, 112000),
(38, 'Tuýp', 0, 35, 191, 140000);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `email` varchar(99) DEFAULT NULL,
  `password` longtext,
  `role` varchar(6) DEFAULT NULL,
  `phone_number` varchar(45) DEFAULT NULL,
  `create_date` varchar(45) DEFAULT NULL,
  `avatar` varchar(555) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `account_type` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `reward_point` int DEFAULT NULL,
  `active` tinyint DEFAULT NULL,
  `code_active_value` varchar(45) DEFAULT NULL,
  `code_active_time` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `role`, `phone_number`, `create_date`, `avatar`, `account_type`, `name`, `reward_point`, `active`, `code_active_value`, `code_active_time`) VALUES
(86, 'khanhdoan1.kd@gmail.com', '$2a$10$FtDyp5oQI7qDVLrV/LeI3OU4hghkw4jLv0aJ8tw2KmfTqcWtfl50W', 'client', NULL, NULL, NULL, 'Facebook', 'Minh Quang', 0, 0, NULL, NULL),
(94, 'test@test', '$2a$10$FtDyp5oQI7qDVLrV/LeI3OU4hghkw4jLv0aJ8tw2KmfTqcWtfl50W', 'client', NULL, '07/05/2023', NULL, 'Normal', 'test@test', 0, 0, NULL, NULL),
(95, 'test@test', '$2a$10$FtDyp5oQI7qDVLrV/LeI3OU4hghkw4jLv0aJ8tw2KmfTqcWtfl50W', 'client', NULL, '07/05/2023', NULL, 'Normal', 'test@test', 0, 0, NULL, NULL),
(96, 'khanhdoanx1.kd@gmail.com', 'iR66VC5MZz+KVXazL5xT9A==', 'client', NULL, '07/05/2023 15:27:00', NULL, 'Normal', 'khanhdoanx1.kd@gmail.com', 0, 0, NULL, NULL),
(97, 'khanhdoanx2.kd@gmail.com', '$2a$10$FtDyp5oQI7qDVLrV/LeI3OU4hghkw4jLv0aJ8tw2KmfTqcWtfl50W', NULL, NULL, NULL, NULL, 'Normal', 'Khánh Đoàn', 0, 1, '221186271', '2023/05/08 04:01'),
(101, 'khanhdoan14.kd@gmail.com', '$2a$10$gNHI0q833SEseagQ8VLyReNkakIi8FIfBdPpTmURr08WMIPabI.iO', 'client', '123123123', NULL, NULL, 'Normal', 'khanhdoan19', 110, 1, '221186271', '2023/05/15 10:57'),
(103, 'minhchanh1681@gmail.com', '$2a$10$hQuCb2TqDky5j2HPMe4BUOsjiblrnuhkGFbS4PNjrd83R4wc7U716', 'client', NULL, '26/05/2023 17:34:40', 'https://lh3.googleusercontent.com/a/AGNmyxaqzFEkPjm_XhrYqV-CznSlfyP81N4Pwcxd7FtUir4=s96-c', 'Google', 'Minh Chánh Lê', 60, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `verification_code`
--

CREATE TABLE `verification_code` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `code` varchar(6) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  `used` tinyint(1) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `expiry_date_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `voucher`
--

CREATE TABLE `voucher` (
  `id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `discount` double NOT NULL,
  `create_date` date NOT NULL,
  `beginning_date` date NOT NULL,
  `expiration_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `voucher`
--

INSERT INTO `voucher` (`id`, `name`, `discount`, `create_date`, `beginning_date`, `expiration_date`) VALUES
(1, 'happy new year', 20, '2023-01-01', '2023-01-01', '2023-08-22'),
(2, 'happy lunar new year', 20, '2023-01-01', '2023-01-02', '2023-08-23'),
(3, 'flash', 15, '2023-05-27', '2023-05-27', '2023-06-06'),
(4, 'black friday 26', 10, '2023-05-27', '2023-05-27', '2023-07-27'),
(5, 'black friday 03', 22, '2023-05-27', '2023-06-03', '2023-06-04');

-- --------------------------------------------------------

--
-- Table structure for table `voucher_detail`
--

CREATE TABLE `voucher_detail` (
  `id` int NOT NULL,
  `voucher_id` int NOT NULL,
  `order_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `voucher_detail`
--

INSERT INTO `voucher_detail` (`id`, `voucher_id`, `order_id`) VALUES
(1, 1, 1),
(2, 1, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `fk_cart_unit` (`unit_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `category` (`category`),
  ADD KEY `field` (`field`);

--
-- Indexes for table `category_detail`
--
ALTER TABLE `category_detail`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `medicine_id` (`medicine_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `description`
--
ALTER TABLE `description`
  ADD PRIMARY KEY (`id`),
  ADD KEY `medicine_id` (`medicine_id`);

--
-- Indexes for table `field`
--
ALTER TABLE `field`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`id`),
  ADD KEY `medicine_id` (`medicine_id`);

--
-- Indexes for table `ingredient`
--
ALTER TABLE `ingredient`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comment_id` (`comment_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `medicine`
--
ALTER TABLE `medicine`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `brand` (`brand`),
  ADD KEY `producer` (`producer`),
  ADD KEY `category_detail_id` (`category_detail_id`);

--
-- Indexes for table `medicine_detail`
--
ALTER TABLE `medicine_detail`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `md_medicine_id_fk` (`medicine_id`);

--
-- Indexes for table `medicine_ingredient`
--
ALTER TABLE `medicine_ingredient`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ingredient_id` (`ingredient_id`),
  ADD KEY `medicine_id` (`medicine_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_order_user_idx` (`user_id`);

--
-- Indexes for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `medicine_id` (`medicine_id`),
  ADD KEY `order_ibfk_2_idx` (`order_id`),
  ADD KEY `unit_ibfk_2_idx` (`price`);

--
-- Indexes for table `producer`
--
ALTER TABLE `producer`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `rate`
--
ALTER TABLE `rate`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `medicine_id` (`medicine_id`);

--
-- Indexes for table `saved`
--
ALTER TABLE `saved`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `saved_user_id_fk` (`user_id`),
  ADD KEY `saved_medicine_id_fk` (`medicine_id`);

--
-- Indexes for table `unit`
--
ALTER TABLE `unit`
  ADD PRIMARY KEY (`id`),
  ADD KEY `medicine_id` (`medicine_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `verification_code`
--
ALTER TABLE `verification_code`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `vc_user_id_fk` (`user_id`);

--
-- Indexes for table `voucher`
--
ALTER TABLE `voucher`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `voucher_detail`
--
ALTER TABLE `voucher_detail`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `brand`
--
ALTER TABLE `brand`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `category_detail`
--
ALTER TABLE `category_detail`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=148;

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `description`
--
ALTER TABLE `description`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `field`
--
ALTER TABLE `field`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `image`
--
ALTER TABLE `image`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `ingredient`
--
ALTER TABLE `ingredient`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=177;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `medicine`
--
ALTER TABLE `medicine`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `medicine_detail`
--
ALTER TABLE `medicine_detail`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `medicine_ingredient`
--
ALTER TABLE `medicine_ingredient`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=185;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `order_detail`
--
ALTER TABLE `order_detail`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `producer`
--
ALTER TABLE `producer`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `rate`
--
ALTER TABLE `rate`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `saved`
--
ALTER TABLE `saved`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `unit`
--
ALTER TABLE `unit`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;

--
-- AUTO_INCREMENT for table `verification_code`
--
ALTER TABLE `verification_code`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `voucher`
--
ALTER TABLE `voucher`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `voucher_detail`
--
ALTER TABLE `voucher_detail`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_cart_unit` FOREIGN KEY (`unit_id`) REFERENCES `unit` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `category`
--
ALTER TABLE `category`
  ADD CONSTRAINT `category_ibfk_1` FOREIGN KEY (`field`) REFERENCES `field` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `category_detail`
--
ALTER TABLE `category_detail`
  ADD CONSTRAINT `category_detail_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`medicine_id`) REFERENCES `medicine` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `description`
--
ALTER TABLE `description`
  ADD CONSTRAINT `description_ibfk_1` FOREIGN KEY (`medicine_id`) REFERENCES `medicine` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `image`
--
ALTER TABLE `image`
  ADD CONSTRAINT `image_ibfk_1` FOREIGN KEY (`medicine_id`) REFERENCES `medicine` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `medicine`
--
ALTER TABLE `medicine`
  ADD CONSTRAINT `medicine_ibfk_1` FOREIGN KEY (`brand`) REFERENCES `brand` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `medicine_ibfk_2` FOREIGN KEY (`producer`) REFERENCES `producer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `medicine_ibfk_3` FOREIGN KEY (`category_detail_id`) REFERENCES `category_detail` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `medicine_detail`
--
ALTER TABLE `medicine_detail`
  ADD CONSTRAINT `md_medicine_id_fk` FOREIGN KEY (`medicine_id`) REFERENCES `medicine` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `medicine_ingredient`
--
ALTER TABLE `medicine_ingredient`
  ADD CONSTRAINT `medicine_ingredient_ibfk_1` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredient` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `medicine_ingredient_ibfk_2` FOREIGN KEY (`medicine_id`) REFERENCES `medicine` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_order_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD CONSTRAINT `order_detail_ibfk_2` FOREIGN KEY (`medicine_id`) REFERENCES `medicine` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `order_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `rate`
--
ALTER TABLE `rate`
  ADD CONSTRAINT `rate_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rate_ibfk_2` FOREIGN KEY (`medicine_id`) REFERENCES `medicine` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `saved`
--
ALTER TABLE `saved`
  ADD CONSTRAINT `saved_medicine_id_fk` FOREIGN KEY (`medicine_id`) REFERENCES `medicine` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `saved_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `unit`
--
ALTER TABLE `unit`
  ADD CONSTRAINT `unit_ibfk_1` FOREIGN KEY (`medicine_id`) REFERENCES `medicine` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `verification_code`
--
ALTER TABLE `verification_code`
  ADD CONSTRAINT `vc_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
