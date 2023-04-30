package dev.aisling.controller;

import dev.aisling.dto.UserDTO;
import dev.aisling.dto.User;
import dev.aisling.service.UserService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.security.Principal;
import java.util.List;
import java.util.Optional;



@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    //GET method get all users
    @GetMapping (value =  "/all")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return new ResponseEntity<List<UserDTO>>(userService.allUsers(), HttpStatus.OK);
    }

    //GET method get user account by username
    @GetMapping(value = "/{userName}")
    public User getSingleUser(@PathVariable String userName) {
        Optional<UserDTO> userDto  = userService.singleUser(userName);
        User user = new User();
        user.setId(userDto.get().getId().toString());
        user.setUserName(userDto.get().getUserName());
        user.setPassword(userDto.get().getPassword());
        user.setUserName(userDto.get().getUserName());
        return user;
    }

    //GET method get user account by user ID
    @GetMapping(value = "/{userIdString}/user-details")
    public ResponseEntity<User> getUserDetailsById(@PathVariable String userIdString) {
        ObjectId userId = new ObjectId(userIdString);
        return new ResponseEntity<User>(userService.getUserDetailsResponse(userId), HttpStatus.OK);
    }


    //DELETE method by id
    @DeleteMapping(value = "/delete/{id}")
    public void deleteUser(@PathVariable ObjectId id){
        userService.removeUser(id);
    }


//    //DELETE method by username
//    @DeleteMapping(value = "/deletebyusername/{userName}")
//    @PreAuthorize("hasAuthority('ROLE_USER')")
//    public void deleteUserByUserName(@PathVariable String userName){
//        userService.removeUserByName(userName);
//    }

    // POST method add user
    @PostMapping(value = "/add")
    public ResponseEntity<UserDTO> createUser(@RequestBody User user) {
        UserDTO userDto = userService.createUser(user);
        return ResponseEntity
                .created(URI
                        .create(String.format("/user/%s", userDto.getFirstName())))
                .body(userDto);
    }






}
