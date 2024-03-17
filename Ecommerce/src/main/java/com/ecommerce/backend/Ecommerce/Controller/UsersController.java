package com.ecommerce.backend.Ecommerce.Controller;

import com.ecommerce.backend.Ecommerce.Entity.Login;
import com.ecommerce.backend.Ecommerce.Entity.Users;
import com.ecommerce.backend.Ecommerce.Repository.UsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@CrossOrigin("*")
public class UsersController {

    @Autowired
    UsersRepo repo;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Login user) {
        Users email = repo.findByUserEmail(user.getEmail());
        if (email == null) {
            return new ResponseEntity<>("User not found", null, 404);
        }
        if (!email.getUserPassword().equals(user.getPassword())) {
            return new ResponseEntity<>("Invalid password", null, 404);
        }
        return new ResponseEntity<>(email.getFirstName(), null, 200);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Users user) {
        Users email = repo.findByUserEmail(user.getUserEmail());
        if (email == null) {
            repo.save(user);
            return new ResponseEntity<>("user registered successfully", null, 201);
        } else {
            return new ResponseEntity<>("User already exists", null, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/changePassword")
    public ResponseEntity<?> changePassword(@RequestBody Login user) {
        Users email = repo.findByUserEmail(user.getEmail());
        if (email == null) {
            return new ResponseEntity<>("User not found", null, 404);
        }
        email.setUserPassword(user.getPassword());
        repo.save(email);
        return new ResponseEntity<>("Password changed successfully", null, 201);
    }

}

