DROP DATABASE IF EXISTS `db_motor_repair_store`;
CREATE DATABASE `db_motor_repair_store`;
USE `db_motor_repair_store`;

CREATE TABLE `roles` (
	`id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(20)
);

CREATE TABLE `employees` (
	`id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `code` VARCHAR(20) NOT NULL UNIQUE, -- "NVxxx"
    `name` VARCHAR(50) NOT NULL,
    `phone` VARCHAR(25) UNIQUE,
    `address` VARCHAR(100),
    `working_status` BOOLEAN DEFAULT TRUE,
    `available` BOOLEAN DEFAULT TRUE, -- apply only to repairing department
	`username` VARCHAR(50) UNIQUE,
    `password` VARCHAR(120),
    `created_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_date` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `active` BOOLEAN DEFAULT TRUE
) COLLATE=utf8_vietnamese_ci    /* utf8 character set Vietnamese */;

CREATE TABLE `employees_roles` (
    `employee_id` INT NOT NULL,
    `role_id` INT NOT NULL,

    PRIMARY KEY (`employee_id`, `role_id`),    
    FOREIGN KEY(`employee_id`) REFERENCES `employees`(`id`),
    FOREIGN KEY(`role_id`) REFERENCES `roles`(`id`)
);



CREATE TABLE `brands` (
	`id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `brand_name` VARCHAR(50) NOT NULL UNIQUE
) COLLATE=utf8_vietnamese_ci    /* utf8 character set Vietnamese */;

CREATE TABLE `models` (
	`id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `brand_id` INT NOT NULL,
    `model_name` VARCHAR(50) NOT NULL,

	UNIQUE(`brand_id`, `model_name`),
    FOREIGN KEY(`brand_id`) REFERENCES `brands`(`id`)
) COLLATE=utf8_vietnamese_ci    /* utf8 character set Vietnamese */;

CREATE TABLE `motorbikes` (
	`id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `license_plates` VARCHAR(20) NOT NULL UNIQUE,
    `model_id` INT NOT NULL,
    
    FOREIGN KEY (`model_id`) REFERENCES models(id)
) COLLATE=utf8_vietnamese_ci    /* utf8 character set Vietnamese */;



CREATE TABLE `customers` (
	`id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `phone` VARCHAR(25) NOT NULL UNIQUE,
    `address` VARCHAR(100),
    `created_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_date` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `active` BOOLEAN DEFAULT TRUE
) COLLATE=utf8_vietnamese_ci    /* utf8 character set Vietnamese */;



CREATE TABLE `categories` (
	`id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `code` VARCHAR(20) NOT NULL UNIQUE, -- "DMxxx"
    `name` VARCHAR(50) NOT NULL,
    `description` VARCHAR(1024)
) COLLATE=utf8_vietnamese_ci    /* utf8 character set Vietnamese */;

CREATE TABLE `products` (
	`id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `code` VARCHAR(20) NOT NULL UNIQUE, -- "SPxxx"
    `name` VARCHAR(100) NOT NULL,
    `description` VARCHAR(1024),
    `category_id` INT NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `quantity` INT DEFAULT 0,
	`unit` VARCHAR(50),
	`image` VARCHAR(512),
    `created_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_date` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `active` BOOLEAN DEFAULT TRUE,

    FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`)
) COLLATE=utf8_vietnamese_ci    /* utf8 character set Vietnamese */;

CREATE TABLE `services` (
	`id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `code` VARCHAR(20) NOT NULL UNIQUE, -- "DVxxx"
    `name` VARCHAR(50) NOT NULL,
    `description` VARCHAR(1024),
    `price` DECIMAL(10, 2) NOT NULL,
    `created_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_date` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `active` BOOLEAN DEFAULT TRUE
    
) COLLATE=utf8_vietnamese_ci    /* utf8 character set Vietnamese */;





CREATE TABLE `tickets` (
	`id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `code` VARCHAR(20) NOT NULL UNIQUE, -- "HDxxx"
    `description` VARCHAR(1024),
    `note` VARCHAR(1024),
    `status` TINYINT NOT NULL DEFAULT 0, -- NOTE: -1: Huỷ đơn | 0: Khởi tạo | 1: Chờ khách duyệt | 2: Đang sửa | 3: Chờ thanh toán | 4: Hoàn thành
    
    `discount` DECIMAL(20, 2),
    `total_price` DECIMAL(20, 2),
    `payment_method` VARCHAR(100) DEFAULT  'Thanh toán bằng tiền mặt', -- should be TINYINT
    
    `motorbike_id` INT NOT NULL,
    `customer_id` INT,
    `repairing_employee_id` INT,
    `cashier_name` VARCHAR(50),
    
    `appointment_date` DATETIME,
    `created_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_date` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `active` BOOLEAN DEFAULT TRUE,
    
    FOREIGN KEY (`motorbike_id`) REFERENCES motorbikes(id),
    FOREIGN KEY (`customer_id`) REFERENCES customers(id),
    FOREIGN KEY (`repairing_employee_id`) REFERENCES employees(id)
) COLLATE=utf8_vietnamese_ci    /* utf8 character set Vietnamese */;

CREATE TABLE `tickets_products` (
	`price` DECIMAL NOT NULL,
	`quantity` INT NOT NULL,
    `ticket_id` INT NOT NULL,
    `product_id` INT NOT NULL,
    
    PRIMARY KEY(`ticket_id`, `product_id`),
	FOREIGN KEY(`ticket_id`) REFERENCES `tickets`(`id`),
    FOREIGN KEY(`product_id`) REFERENCES `products`(`id`)
) COLLATE=utf8_vietnamese_ci    /* utf8 character set Vietnamese */;

CREATE TABLE `tickets_services` (
	`price` DECIMAL NOT NULL,
    `ticket_id` INT NOT NULL,
    `service_id` INT NOT NULL,
    
    PRIMARY KEY(`ticket_id`, `service_id`),
	FOREIGN KEY(`ticket_id`) REFERENCES `tickets`(`id`),
    FOREIGN KEY(`service_id`) REFERENCES `services`(`id`)
) COLLATE=utf8_vietnamese_ci    /* utf8 character set Vietnamese */;



CREATE TABLE `products_models` (
	`model_id` INT NOT NULL,
    `product_id` INT NOT NULL,
    
    PRIMARY KEY(`model_id`, `product_id`),
	FOREIGN KEY(`model_id`) REFERENCES models(id),
    FOREIGN KEY(`product_id`) REFERENCES products(id)
);



CREATE TABLE `motorbikes_customers` (
	`motorbike_id` INT NOT NULL,
    `customer_id` INT NOT NULL,
    
    PRIMARY KEY(`motorbike_id`, `customer_id`),
	FOREIGN KEY(`motorbike_id`) REFERENCES `motorbikes`(`id`),
    FOREIGN KEY(`customer_id`) REFERENCES `customers`(`id`)
);


CREATE TABLE `ticket_updated_histories` (
	`id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `ticket_id` INT NOT NULL,
    `updated_by` INT NOT NULL,
	`updated_date` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- when creating this track record
    `old_status` INT NOT NULL,
    `new_status` INT NOT NULL,
    `content` VARCHAR(1024),
    
    FOREIGN KEY(`ticket_id`) REFERENCES `tickets`(`id`),
    FOREIGN KEY(`updated_by`) REFERENCES `employees`(`id`)
);



-- Procedure:
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `select_revenue_by_date` (IN start_date datetime, IN end_date datetime)
BEGIN
	DECLARE errno INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    
    BEGIN
    GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
    SELECT errno AS MYSQL_ERROR;
    ROLLBACK;
    END;
    
    SELECT DATE(updated_date) as `date`, sum(total_price - discount) as `revenue`
    FROM tickets
    WHERE updated_date BETWEEN start_date AND end_date
    AND status = 4
    GROUP BY DATE(updated_date)
    ORDER BY DATE(updated_date);
END //
DELIMITER ;


DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `select_revenue_by_month` (IN start_date datetime, IN end_date datetime)
BEGIN
	DECLARE errno INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    
    BEGIN
    GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
    SELECT errno AS MYSQL_ERROR;
    ROLLBACK;
    END;
    
    SELECT YEAR(updated_date) as `year`, MONTH(updated_date) as `month`, sum(total_price - discount) as `revenue`
    FROM tickets
    WHERE updated_date BETWEEN start_date AND end_date
    AND status = 4
    GROUP BY YEAR(updated_date), MONTH(updated_date)
    ORDER BY YEAR(updated_date), MONTH(updated_date);
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS `select_top_mechanic_by_date`;
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `select_top_mechanic_by_date` (IN start_date datetime, IN end_date datetime, IN top INT)
BEGIN
	DECLARE errno INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    
    BEGIN
    GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
    SELECT errno AS MYSQL_ERROR;
    ROLLBACK;
    END;
    
    SELECT coalesce(t.repairing_employee_id, -1) as `idMechanic`,
		count(coalesce(t.repairing_employee_id, -1)) as `numTickets`, -- total ticket complete only !
		coalesce(e.name, "Nhân viên ẩn danh") as `mechanicName`
    FROM tickets as t LEFT JOIN employees e ON t.repairing_employee_id = e.id
    WHERE (t.updated_date BETWEEN start_date AND end_date)
    AND status = 4
    GROUP BY `idMechanic`
    ORDER BY `numTickets` DESC
    LIMIT top;
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS `select_mechanic_ticket`;
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `select_mechanic_ticket` (IN start_date datetime, IN end_date datetime)
BEGIN
	DECLARE errno INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    
    BEGIN
    GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
    SELECT errno AS MYSQL_ERROR;
    ROLLBACK;
    END;
    
    -- total tickets per mechanic
    DROP TABLE IF EXISTS total;
    CREATE TEMPORARY TABLE total AS (SELECT coalesce(t.repairing_employee_id, -1) as `idMechanic`,
		COUNT(coalesce(t.repairing_employee_id, -1)) as `total`
    FROM tickets as t 
    WHERE (t.updated_date BETWEEN start_date AND end_date)
    GROUP BY t.repairing_employee_id);
    
    -- completed tickets per mechanic
    DROP TABLE IF EXISTS completed;
    CREATE TEMPORARY TABLE completed AS (SELECT coalesce(t.repairing_employee_id, -1) as `idMechanic`,
		COUNT(coalesce(t.repairing_employee_id, -1)) as `completed`
    FROM tickets as t 
    WHERE (t.updated_date BETWEEN start_date AND end_date)
    AND status = 4
    GROUP BY t.repairing_employee_id);
    
    -- onProcess tickets per mechanic
    DROP TABLE IF EXISTS on_process;
    CREATE TEMPORARY TABLE on_process AS (SELECT coalesce(t.repairing_employee_id, -1) as `idMechanic`,
		COUNT(coalesce(t.repairing_employee_id, -1)) as `on_process`
    FROM tickets as t 
    WHERE (t.updated_date BETWEEN start_date AND end_date)
    AND status <> -1 and status <> 4
    GROUP BY t.repairing_employee_id);
    
    -- canceled tickets per mechanic
    DROP TABLE IF EXISTS canceled;
    CREATE TEMPORARY TABLE canceled AS (SELECT coalesce(t.repairing_employee_id, -1) as `idMechanic`,
		COUNT(coalesce(t.repairing_employee_id, -1)) as `canceled`
    FROM tickets as t 
    WHERE (t.updated_date BETWEEN start_date AND end_date)
    AND status = -1
    GROUP BY t.repairing_employee_id);
    
    -- value per mechanic
    DROP TABLE IF EXISTS total_value;
    CREATE TEMPORARY TABLE total_value AS (SELECT coalesce(t.repairing_employee_id, -1) as `idMechanic`,
		SUM(t.total_price - t.discount) as `total_value`
    FROM tickets as t 
    WHERE (t.updated_date BETWEEN start_date AND end_date)
    AND status = 4
    GROUP BY t.repairing_employee_id);
    
--     statistics:
    SELECT total.idMechanic, 
    coalesce(employees.name, 'Nhân viên ẩn danh') as `mechanicName`,
    coalesce(total_value, 0) as `totalValue`,
    coalesce(total, 0) as `numTickets`, -- total ticket receieved !
    coalesce(completed, 0) as `completed`, 
    coalesce(on_process, 0) as `onProcess`, 
    coalesce(canceled, 0) as `canceled`
    FROM total LEFT JOIN employees ON total.idMechanic = employees.id
    LEFT JOIN completed ON total.idMechanic = completed.idMechanic
    LEFT JOIN on_process ON total.idMechanic = on_process.idMechanic
    LEFT JOIN canceled ON total.idMechanic = canceled.idMechanic
    LEFT JOIN total_value ON total.idMechanic = total_value.idMechanic
    ORDER BY `completed` DESC;
    
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS `select_top_used_products_by_date`;
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `select_top_used_products_by_date` (IN start_date datetime, IN end_date datetime, IN top INT)
BEGIN
	DECLARE errno INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    
    BEGIN
    GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
    SELECT errno AS MYSQL_ERROR;
    ROLLBACK;
    END;
    
    SELECT tp.product_id as `productId`,
		sum(tp.quantity) as `usedQuantity`, -- total ticket complete only !
        p.name as `productName`
    FROM tickets_products as tp 
    INNER JOIN tickets as t ON t.id = tp.ticket_id
    INNER JOIN products as p ON p.id = tp.product_id
    WHERE (t.updated_date BETWEEN start_date AND end_date)
    AND (status = 4 or status = 3)
    GROUP BY tp.product_id
    ORDER BY `usedQuantity` DESC
    LIMIT top;
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS `select_top_used_services_by_date`;
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `select_top_used_services_by_date` (IN start_date datetime, IN end_date datetime, IN top INT)
BEGIN
	DECLARE errno INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    
    BEGIN
    GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
    SELECT errno AS MYSQL_ERROR;
    ROLLBACK;
    END;
    
    SELECT ts.service_id as `serviceId`,
		count(ts.service_id) as `usedFrequency`, -- total ticket complete only !
        s.name as `serviceName`
    FROM tickets_services as ts
    INNER JOIN tickets as t ON t.id = ts.ticket_id
    INNER JOIN services as s ON s.id = ts.service_id
    WHERE (t.updated_date BETWEEN start_date AND end_date)
    AND (t.status = 4 or t.status = 3)
    GROUP BY ts.service_id
    ORDER BY `usedFrequency` DESC
    LIMIT top;
END //
DELIMITER ;



-- customer
DROP PROCEDURE IF EXISTS `select_top_customer`;
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `select_top_customer`(IN top INT)
BEGIN
	DECLARE errno INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    
    BEGIN
    GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
    SELECT errno AS MYSQL_ERROR;
    ROLLBACK;
    END;
    
    SELECT coalesce(t.customer_id, -1) as `customerId`,
		coalesce(c.name, 'Khách hàng ẩn danh') as `customerName`,
        count(coalesce(t.customer_id, -1)) as `frequency`,
        sum(t.total_price - t.discount) as `moneyPaid`
    FROM tickets AS t LEFT JOIN customers AS c ON t.customer_id = c.id
    GROUP BY t.customer_id
    LIMIT top;
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS `select_new_customer_by_date`;
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `select_new_customer_by_date` (IN start_date datetime, IN end_date datetime)
BEGIN
	DECLARE errno INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    
    BEGIN
    GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
    SELECT errno AS MYSQL_ERROR;
    ROLLBACK;
    END;
    
    SELECT DATE(created_date) as `date`, count(id) as `numberOfNewCustomers`
    FROM customers
	WHERE created_date BETWEEN start_date AND end_date
    AND active = 1
    GROUP BY DATE(created_date)
    ORDER BY DATE(created_date);
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS `select_new_customer_by_month`;
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `select_new_customer_by_month` (IN start_date datetime, IN end_date datetime)
BEGIN
	DECLARE errno INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    
    BEGIN
    GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
    SELECT errno AS MYSQL_ERROR;
    ROLLBACK;
    END;
    
    SELECT YEAR(created_date) as `year`, MONTH(created_date) as `month`, count(id) as `numberOfNewCustomers`
    FROM customers
    WHERE created_date BETWEEN start_date AND end_date
    AND active = 1
    GROUP BY YEAR(created_date), MONTH(created_date)
    ORDER BY YEAR(created_date), MONTH(created_date);
END //
DELIMITER ;



-- test:
CALL `select_new_customer_by_date`('2022-09-01', '2022-10-02');
CALL `select_new_customer_by_month`('2022-09-01', '2022-10-02');

-- CALL `select_top_customer`(10);

-- CALL `select_top_mechanic_by_date`('2022-09-01', '2022-10-01', 10);
-- CALL `select_mechanic_ticket`('2022-09-01', '2022-10-01');

-- CALL `select_top_used_products_by_date`('2022-09-01', '2022-10-01', 10); 
-- CALL `select_top_used_services_by_date`('2022-09-01', '2022-10-01', 10); 