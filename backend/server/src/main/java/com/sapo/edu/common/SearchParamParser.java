package com.sapo.edu.common;

import com.sapo.edu.payload.searchrequest.SearchCriteria;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class SearchParamParser {
    public List<String> toSearchString(String searchParam) {
        List<String> searchStringList = new ArrayList<>();
        Pattern pattern = Pattern.compile("[^;]+"); // split searchParam by ';'
        Matcher matcher = pattern.matcher(searchParam + ";");
        while (matcher.find()) {
            searchStringList.add(matcher.group());
        }
        return searchStringList;
    }
}
