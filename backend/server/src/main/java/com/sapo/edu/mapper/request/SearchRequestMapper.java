package com.sapo.edu.mapper.request;

import com.sapo.edu.payload.searchrequest.SearchCriteria;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Component
public class SearchRequestMapper {
    public SearchCriteria toSearchCriteria(String searchParam) {
        Pattern pattern = Pattern.compile("(\\w*?)(==|>=|<=|:)(.*)", Pattern.UNICODE_CHARACTER_CLASS);
        Matcher matcher = pattern.matcher(searchParam);

        while(matcher.find()) {
            return new SearchCriteria(matcher.group(1),
                    matcher.group(2), matcher.group(3));
        }
        return null;
    }
    public List<SearchCriteria> toSearchCriterias(List<String> searchParams) {
        return searchParams.stream()
                .map(this::toSearchCriteria)
                .collect(Collectors.toList());
    }

}
