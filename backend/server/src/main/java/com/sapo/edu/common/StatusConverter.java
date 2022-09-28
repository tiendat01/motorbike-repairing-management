package com.sapo.edu.common;

public class StatusConverter {
    public static String toStatusString(Byte status) {
        switch (status) {
            case -1:
                return "Đã huỷ";
            case 0:
                return "Khởi tạo";
            case 1:
                return "Chờ khách duyệt";
            case 2:
                return "Đang sửa";
            case 3:
                return "Chờ thanh toán";
            case 4:
                return "Hoàn thành";
            default:
                return "Không xác định";
        }
    }
}
