package com.sapo.edu.exception;

import org.apache.commons.lang3.StringUtils;

// if unique constraint contain 1 field-value.
public class DuplicateEntityException extends RuntimeException {

    private static String objectName = null;
    private static String fieldName = null;
    private static String value = null;

    public DuplicateEntityException(Class entityType, String uniqueField, String duplicateParam) {
        super(generateMessage(entityType.getSimpleName(), uniqueField, duplicateParam));
    }

    private static String generateMessage(String entity, String field, String value) {
        objectName = entity;
        fieldName = field;
        DuplicateEntityException.value = value;

        if(StringUtils.capitalize(entity).contains("Employee"))
            return "Không thể tạo nhân viên vì " + field + " " + value + " đã tồn tại!";
        return StringUtils.capitalize(entity) +
                " cannot be created for parameters {" +
                fieldName + "=" + value + "} because this value is already existed!";
    }

    public String getObject() {
        return objectName;
    }
    public String getFieldName() {
        return fieldName;
    }


}
