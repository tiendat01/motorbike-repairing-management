package com.sapo.edu.common;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class DateConverter {
    public static LocalDateTime toLocalDateTime(String datePicker) {
        datePicker += " 00:00:00";
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return LocalDateTime.parse(datePicker, dateTimeFormatter);
    }

    public static String dateTimeToString(LocalDateTime dateTime) {
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        return dateTimeFormatter.format(dateTime);
    }

    public static String dateToString(LocalDate date) {
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        return dateTimeFormatter.format(date);
    }

}
