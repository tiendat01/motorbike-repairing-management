package com.sapo.edu.controller.base;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import javax.validation.Valid;

public interface BaseController<T> {
    ResponseEntity<?> all();

    ResponseEntity<?> one(@PathVariable Long id);

    ResponseEntity<?> create(@RequestBody @Valid T entity);

    ResponseEntity<?> update(@RequestBody @Valid T entity, @PathVariable Long id);

    ResponseEntity<?> delete(@PathVariable Long id);

    ResponseEntity<?> all(@RequestParam(defaultValue = "0", required = false) int page,
                          @RequestParam(defaultValue = "3", required = false) int size);
}
