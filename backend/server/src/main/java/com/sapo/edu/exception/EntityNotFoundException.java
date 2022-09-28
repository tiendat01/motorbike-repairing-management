package com.sapo.edu.exception;

import org.springframework.util.StringUtils;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.IntStream;


/**
 * Error response: after handle EntityNotFoundException
 *
 * {
 *  "...": {
 *    ...,
 *    "subError": [{
 *          ...,
 *          "message": "Entity was not found for parameters {id=2}"
 *     },]
 *   }
 * }
 */
public class EntityNotFoundException extends RuntimeException {

    private static String object = null;

    public EntityNotFoundException(Class clazz, String... searchParamsMap) {
        super(EntityNotFoundException.generateMessage(clazz.getSimpleName(), toMap(String.class, String.class, searchParamsMap)));
    }

    private static String generateMessage(String entity, Map<String, String> searchParams) {
        object = entity;

        // using map => this exception apply to GET request when send List of id of entities to get data
        return StringUtils.capitalize(entity) +
                " was not found for parameters " +
                searchParams;
    }

    private static <K, V> Map<K, V> toMap(
            Class<K> keyType, Class<V> valueType, Object... entries) {

        // entry is a pair of k-v => length of entries is even
        if (entries.length % 2 == 1)
            throw new IllegalArgumentException("Invalid entries");

        return IntStream.range(0, entries.length / 2).map(i -> i * 2)
                .collect(HashMap::new,
                        (m, i) -> m.put(keyType.cast(entries[i]), valueType.cast(entries[i + 1])),
                        Map::putAll);
    }

    public String getObject() {
        return EntityNotFoundException.object;
    }

}