-- Insert data:
INSERT INTO roles(`name`) VALUES('ROLE_ADMIN');
INSERT INTO roles(`name`) VALUES('ROLE_MODERATOR');
INSERT INTO roles(`name`) VALUES('ROLE_CASHIER'); 
INSERT INTO roles(`name`) VALUES('ROLE_MECHANIC');


INSERT INTO `employees`(`code`, `name`, `phone`, `address`, `working_status`, `available`, `username`, `password`)
VALUES 
('NV000', 'SUPERUSER', '0123456789', 'Hà Nội', 1, 1, 'superuser', '$2a$10$jBXQrLZdg.CNXs5Epfcdfu36SA72vogKa3eKoJGru3EvTLpNVlajS'), -- pass: superuser 
('NV001', 'Tiến Đạt', '0966770601', NULL, 1, 1, 'tiendat', '$2a$10$i/cLXDSy8EqyOJGlvoNExeRzxF6plQ0xjlrKak1ZmM3y7769PYocq'), -- pass: 1234
('NV002', 'admin', '9876543210', NULL, '1', '1', 'admin', '$2a$10$hxFSn22.oI5SXDehLsoU1uEQo5Zr6dQGqKVJnbuO9.aLPAgtP2ive'), -- pass: 1234
('NV003', 'mod', '9876543211', NULL, '1', '1', 'mod', '$2a$10$0BrIyOJ4kzhiYLZi9PaTGeQdQkE.0k/NLknMPaTT0Mt8ZPSQLmFKi'), -- pass: 1234
('NV004', 'cashier', '9876543212', NULL, '1', '1', 'cashier', '$2a$10$7sikzaNtwZYPNcjppK.0Bu2Qclw0X37oa7ImlYoJlDkjp/qXiPD.6'), -- pass: 1234

('NV006', 'Trần Trinh', '9876543213', NULL, '1', '1', NULL, NULL),
('NV007', 'Chí Mai', '9876543214', NULL, '1', '1', NULL, NULL),
('NV008', 'Mỹ Nhi', '9876543215', NULL, '1', '1', NULL, NULL),
('NV009', 'Hải Bách', '9876543216', NULL, '1', '1', NULL, NULL),
('NV010', 'Chiêu Thương', '9876543217', NULL, '1', '1', NULL, NULL),
('NV011', 'Nguyễn Phương Uyên', '9876543218', NULL, '1', '1', NULL, NULL),
('NV012', 'Phạm Khôi', '9876543219', NULL, '1', '1', NULL, NULL),
('NV013', 'Vân Trang', '9876543220', NULL, '1', '1', NULL, NULL),
('NV014', 'Lê Huy', '9876543221', NULL, '1', '1', NULL, NULL),
('NV015', 'Đặng Ngân', '9876543222', NULL, '1', '1', NULL, NULL),
('NV016', 'Võ Công', '9876543223', NULL, '1', '1', NULL, NULL),
('NV017', 'Huỳnh Trang', '9876543224', NULL, '1', '1', NULL, NULL),
('NV018', 'Nhân Hùng', '9876543225', NULL, '1', '1', NULL, NULL),
('NV019', 'Thế Phong', '9876543226', NULL, '1', '1', NULL, NULL),
('NV020', 'Châu Đặng', '9876543227', NULL, '1', '1', NULL, NULL);

-- IMPORTANT: if insert associations directly in db => the set in JPA entities cannot save these associations => cannot remove associations because set is null !
INSERT INTO `employees_roles`(`employee_id`, `role_id`)
VALUES 
(1,1),(1,2),(1,3),(1,4),
(2,1),(2,2),(2,3),(2,4),
(3,1),
(4,2),
(5,3),
(6,4),
(7,4),
(8,4),
(9,4),
(10,4),
(11,4),
(12,4),
(13,4),
(14,4),
(15,4),
(16,4),
(17,4),
(18,4),
(19,4),
(20,4);


INSERT INTO `brands`(`brand_name`)
VALUES ('Honda'), ('Yamaha'), ('Suzuki'), ('Piaggio'), ('Vinfast');

insert into models (brand_id, model_name) values (2, 'Jupiter');
insert into models (brand_id, model_name) values (1, 'Wave Alpha 110 (2022)');
insert into models (brand_id, model_name) values (1, 'Vision (2022)');
insert into models (brand_id, model_name) values (3, 'Rider R150');
insert into models (brand_id, model_name) values (1, 'Air Blade(2022)');
insert into models (brand_id, model_name) values (2, 'Serius (2022)');
insert into models (brand_id, model_name) values (4, 'Liberty S 125');
insert into models (brand_id, model_name) values (2, 'Exciter (2022)');
insert into models (brand_id, model_name) values (1, 'Lead (2022)');
insert into models (brand_id, model_name) values (5, 'Klara S (2022)');


insert into motorbikes (license_plates, model_id) values ('29-A1 99991', 3);
insert into motorbikes (license_plates, model_id) values ('29-B1 99992', 4);
insert into motorbikes (license_plates, model_id) values ('29-C1 99993', 4);
insert into motorbikes (license_plates, model_id) values ('29-D1 99994', 2);
insert into motorbikes (license_plates, model_id) values ('29-E1 99995', 4);
insert into motorbikes (license_plates, model_id) values ('29-F1 99996', 3);
insert into motorbikes (license_plates, model_id) values ('29-G1 99997', 6);
insert into motorbikes (license_plates, model_id) values ('29-H1 99998', 7);
insert into motorbikes (license_plates, model_id) values ('29-I1 99999', 2);
insert into motorbikes (license_plates, model_id) values ('29-K1 00000', 2);
insert into motorbikes (license_plates, model_id) values ('30-A1 99991', 1);
insert into motorbikes (license_plates, model_id) values ('30-B1 99992', 2);
insert into motorbikes (license_plates, model_id) values ('30-C1 99993', 3);
insert into motorbikes (license_plates, model_id) values ('30-D1 99994', 4);
insert into motorbikes (license_plates, model_id) values ('30-E1 99995', 5);
insert into motorbikes (license_plates, model_id) values ('30-F1 99996', 6);
insert into motorbikes (license_plates, model_id) values ('30-G1 99997', 6);
insert into motorbikes (license_plates, model_id) values ('30-H1 99998', 7);
insert into motorbikes (license_plates, model_id) values ('30-I1 99999', 8);
insert into motorbikes (license_plates, model_id) values ('30-K1 00000', 9);


insert into customers (name, phone, address) values ('Khách Trần Trinh', '204 504 5690', null);
insert into customers (name, phone, address) values ('Khách Chí Mai', '969 680 6766', null);
insert into customers (name, phone, address) values ('Khách Mỹ Nhi', '845 519 3606', 'Hà Nội');
insert into customers (name, phone, address) values ('Khách Hải Bách', '872 404 2666', 'Nam Định');
insert into customers (name, phone, address) values ('Khách Chiêu Thương', '386 984 3751', null);
insert into customers (name, phone, address) values ('Khách Phương Uyên', '693 373 1336', null);
insert into customers (name, phone, address) values ('Khách Phạm Khôi', '677 762 7798', null);
insert into customers (name, phone, address) values ('Khách Vân Trang', '635 225 5522', null);
insert into customers (name, phone, address) values ('Khách Lê Huy', '370 807 3824', null);
insert into customers (name, phone, address) values ('Khách Đặng Ngân', '434 837 0067', 'Thành phố Hồ Chí Minh');
insert into customers (name, phone, address) values ('Khách Võ Công', '204 504 56901', null);
insert into customers (name, phone, address) values ('Khách Huỳnh Trang', '969 680 67661', null);
insert into customers (name, phone, address) values ('Khách Nhân Hùng', '845 519 36061', 'Hà Nội');
insert into customers (name, phone, address) values ('Khách Thế Phong', '872 404 26661', 'Nam Định');
insert into customers (name, phone, address) values ('Khách Châu Đặng', '386 984 37511', null);
insert into customers (name, phone, address) values ('Khách Phúc Bảo', '693 373 13361', null);
insert into customers (name, phone, address) values ('Khách Sơn Minh', '677 762 77981', null);
insert into customers (name, phone, address) values ('Khách Đàm Quang', '635 225 55221', null);
insert into customers (name, phone, address) values ('Khách Phạm Thuỷ', '370 807 38241', null);
insert into customers (name, phone, address) values ('Khách Bá Mạnh', '434 837 00671', 'Yên Bái');


insert into categories (`code`, `name`, `description`) values ('DM001', 'Phụ tùng thay thế', 'Linh kiện thiết bị dùng để thay thế cho xe máy');
insert into categories (`code`, `name`, `description`) values ('DM002', 'Đồ chơi xe máy', 'Các loại kính hậu, bao tay, Tay thắng, Đèn led xe máy');
insert into categories (`code`, `name`, `description`) values ('DM003', 'Vỏ khung xe máy', 'Vỏ xe máy, lốp xe Michelin, Dunlop, Maxxis...');
insert into categories (`code`, `name`, `description`) values ('DM004', 'Nhớt xe máy', 'Các loại dầu nhớt thay/tra cho xe: Shell, Motul, Repsol...');
insert into categories (`code`, `name`, `description`) values ('DM005', 'Phụ kiện cho biker', 'Các phụ kiện dành cho các tay lái lụa, tay đua, bốc đầu, dân phượt: Nón bảo hiểm, Đồ phượt');
insert into categories (`code`, `name`, `description`) values ('DM006', 'Khác', 'Các linh kiện, phụ tùng khác');


insert into products (code, name, description, category_id, price, quantity, image, unit) values ('SP001', 'Giáp inox bảo hộ Pro Biker (chính hãng)', '', 5, 1000000.00, 100, 'https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png', 'cái');
insert into products (code, name, description, category_id, price, quantity, image, unit) values ('SP002', 'Vỏ Michelin City Grip 2 130/70-16', '', 3, 150000.00, 100, 'https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png', 'cái');
insert into products (code, name, description, category_id, price, quantity, image, unit) values ('SP003', 'Shell Advance Xe công nghệ Scooter 10W40 1L', '', 4, 80000.00, 100, 'https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png', 'chai');
insert into products (code, name, description, category_id, price, quantity, image, unit) values ('SP004', 'Phuộc Nitron bình dầu chính hãng Việt Nam cho Wave, Dream, Future', '', 1, 2000000.00, 100, 'https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png', 'cái');
insert into products (code, name, description, category_id, price, quantity, image, unit) values ('SP005', 'Bộ nhông sên dĩa Light cho Yamaha Sirius/Jupiter xăng cơ', '', 1, 540000.00, 100, 'https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png', 'bộ');
insert into products (code, name, description, category_id, price, quantity, image, unit) values ('SP006', 'Tay thắng Carbon cho AB160', '', 2, 230000.00, 100, 'https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png', 'cái');
insert into products (code, name, description, category_id, price, quantity, image, unit) values ('SP007', 'Lọc gió DNA chính hãng cho Honda SHVN 2020 - 2021 - 2022', '', 1, 500000.00, 100, 'https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png', 'cái');
insert into products (code, name, description, category_id, price, quantity, image, unit) values ('SP008', 'Kính CNC 002 mẫu mới', '', 2, 1030000.00, 100, 'https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png', 'chiếc');
insert into products (code, name, description, category_id, price, quantity, image, unit) values ('SP009', 'Nhớt Repsol Racing 10W40 1lit', '', 4, 180000.00, 100, 'https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png', 'chai');
insert into products (code, name, description, category_id, price, quantity, image, unit) values ('SP010', 'Găng tay bảo hộ dài ngón Mechanix Mpact', '', 5, 200000.00, 100, 'https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png', 'đôi');
insert into products (code, name, description, category_id, price, quantity, image, unit) values ('SP011', '(1) Giáp inox bảo hộ Pro Biker (chính hãng)', '', 5, 1000000.00, 100, 'https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png', 'cái');
insert into products (code, name, description, category_id, price, quantity, image, unit) values ('SP012', '(1) Vỏ Michelin City Grip 2 130/70-16', '', 3, 150000.00, 100, 'https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png', 'cái');
insert into products (code, name, description, category_id, price, quantity, image, unit) values ('SP013', '(1) Shell Advance Xe công nghệ Scooter 10W40 1L', '', 4, 80000.00, 100, 'https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png', 'chai');
insert into products (code, name, description, category_id, price, quantity, image, unit) values ('SP014', '(1) Phuộc Nitron bình dầu chính hãng Việt Nam cho Wave, Dream, Future', '', 1, 2000000.00, 100, 'https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png', 'cái');
insert into products (code, name, description, category_id, price, quantity, image, unit) values ('SP015', '(1) Bộ nhông sên dĩa Light cho Yamaha Sirius/Jupiter xăng cơ', '', 1, 540000.00, 100, 'https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png', 'bộ');
insert into products (code, name, description, category_id, price, quantity, image, unit) values ('SP016', '(1) Tay thắng Carbon cho AB160', '', 2, 230000.00, 100, 'https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png', 'cái');
insert into products (code, name, description, category_id, price, quantity, image, unit) values ('SP017', '(1) Lọc gió DNA chính hãng cho Honda SHVN 2020 - 2021 - 2022', '', 1, 500000.00, 100, 'https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png', 'cái');
insert into products (code, name, description, category_id, price, quantity, image, unit) values ('SP018', '(1) Kính CNC 002 mẫu mới', '', 2, 1030000.00, 100, 'https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png', 'chiếc');
insert into products (code, name, description, category_id, price, quantity, image, unit) values ('SP019', '(1) Nhớt Repsol Racing 10W40 1lit', '', 4, 180000.00, 100, 'https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png', 'chai');
insert into products (code, name, description, category_id, price, quantity, image, unit) values ('SP020', '(1) Găng tay bảo hộ dài ngón Mechanix Mpact', '', 5, 200000.00, 100, 'https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png', 'đôi');


insert into services (code, name, description, price) values ('DV001', 'Bảo dưỡng xe máy các hãng', '', 1500000.00);
insert into services (code, name, description, price) values ('DV002', 'Làm nồi xe tay ga', '', 2000000.00);
insert into services (code, name, description, price) values ('DV003', 'Vệ sinh kim phun xăng điện tử', '', 1000000.00);
insert into services (code, name, description, price) values ('DV004', 'Sửa phuộc, thay chén cổ xe máy', '', 1500000.00);
insert into services (code, name, description, price) values ('DV005', 'Vệ sinh nồi xe các loại', '', 1800000.00);
insert into services (code, name, description, price) values ('DV006', 'Rửa xe bình dân', 'Dịch vụ cơ bản', 20000.00);
insert into services (code, name, description, price) values ('DV007', 'Rửa xe vip', 'Chăm sóc massage xe \'xịn\'', 200000.19);





-- IMPORTANT: if insert associations directly in db => the set in JPA entities cannot save these associations => cannot remove associations because set is null !
-- INSERT INTO `db_motor_repair_store`.`products_models` (`model_id`, `product_id`) VALUES ('1', '1');
-- INSERT INTO `db_motor_repair_store`.`products_models` (`model_id`, `product_id`) VALUES ('2', '1');
-- INSERT INTO `db_motor_repair_store`.`products_models` (`model_id`, `product_id`) VALUES ('3', '2');
-- INSERT INTO `db_motor_repair_store`.`products_models` (`model_id`, `product_id`) VALUES ('4', '2');
-- INSERT INTO `db_motor_repair_store`.`products_models` (`model_id`, `product_id`) VALUES ('5', '3');
-- INSERT INTO `db_motor_repair_store`.`products_models` (`model_id`, `product_id`) VALUES ('6', '3');
-- INSERT INTO `db_motor_repair_store`.`products_models` (`model_id`, `product_id`) VALUES ('7', '4');
-- INSERT INTO `db_motor_repair_store`.`products_models` (`model_id`, `product_id`) VALUES ('8', '4');
-- INSERT INTO `db_motor_repair_store`.`products_models` (`model_id`, `product_id`) VALUES ('9', '5');
-- INSERT INTO `db_motor_repair_store`.`products_models` (`model_id`, `product_id`) VALUES ('10', '5');
-- INSERT INTO `db_motor_repair_store`.`products_models` (`model_id`, `product_id`) VALUES ('1', '6');
-- INSERT INTO `db_motor_repair_store`.`products_models` (`model_id`, `product_id`) VALUES ('2', '6');
-- INSERT INTO `db_motor_repair_store`.`products_models` (`model_id`, `product_id`) VALUES ('3', '7');
-- INSERT INTO `db_motor_repair_store`.`products_models` (`model_id`, `product_id`) VALUES ('4', '7');





-- INSERT INTO `db_motor_repair_store`.`tickets` (`id`, `code`, `description`, `note`, `status`, `discount`, `total_price`, `payment_method`, `motorbike_id`, `customer_id`, `repairing_employee_id`, `appointment_date`, `created_date`, `updated_date`) VALUES ('1', 'HD03351', 'Phiếu sửa chữa được tạo để test', 'Các thông tin lưu ý và bổ sung', '1', '50000', '2000000.00', 'Thanh toán bằng tiền mặt', '1', '1', '1', '2022-08-30 00:00:00', '2022-09-09 00:00:58', '2022-09-09 00:04:27');

