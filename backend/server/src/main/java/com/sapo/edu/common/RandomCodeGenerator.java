package com.sapo.edu.common;

import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;

public class RandomCodeGenerator {
    public static String genCode(String prefix, Integer length, boolean useLetters, boolean useNumbers) {
        String generatedCode = RandomStringUtils.random(length, useLetters, useNumbers);

        return StringUtils.prependIfMissing(generatedCode, prefix.toUpperCase());
    }
}
