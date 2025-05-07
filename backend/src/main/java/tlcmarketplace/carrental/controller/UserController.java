package tlcmarketplace.carrental.controller;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;  
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tlcmarketplace.carrental.model.User;
import tlcmarketplace.carrental.service.UserService;

@RestController
@RequestMapping("api/v1/user")
public class UserController {
    private final UserService userService;
    private static final Logger logger = LoggerFactory.getLogger(ListingController.class);

    public UserController(UserService userService) {this.userService = userService;}

    @PutMapping("")
    public ResponseEntity<?> updateUser(@RequestBody User user){
        logger.info("updating user with email: " + user.getEmail());
        int rows = userService.updateUser(user);
        logger.info("updated rows: " + rows);
        if(rows == 0) return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "user not created"));
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", "signup successful"));
    }

    @GetMapping("/{email}")
    public ResponseEntity<?> getListingById(@PathVariable("email") String email){
        logger.info("getting user with email: " + email);
        User user = userService.getUser(email);
        return ResponseEntity.ok(user);
    }
}
