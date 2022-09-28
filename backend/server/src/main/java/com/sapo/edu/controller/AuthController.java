package com.sapo.edu.controller;

import com.sapo.edu.payload.crudrequest.LoginRequest;
import com.sapo.edu.security.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    UserService userService;


    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        return ResponseEntity.ok(userService.login(loginRequest.getUsername(), loginRequest.getPassword()));
    }

    @GetMapping("/profile")
    @PreAuthorize(value = "hasRole('ROLE_MODERATOR') or hasRole('ROLE_ADMIN') or hasRole('ROLE_CASHIER')")
    public ResponseEntity<?> getUserDetail() {
        return ResponseEntity.ok(userService.getUserDetail());
    }
}
