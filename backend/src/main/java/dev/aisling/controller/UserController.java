package dev.aisling.controller;

import dev.aisling.dto.UserDTO;
import dev.aisling.model.User;
import dev.aisling.service.UserService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.ResponseErrorHandler;

import java.net.URI;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    //GET method get all users
    @GetMapping (value =  "/allusers")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return new ResponseEntity<List<UserDTO>>(userService.allUsers(), HttpStatus.OK);
    }

    //GET method get user by username
    @GetMapping(
            value = "/{userName}")
    public ResponseEntity<UserDTO> getSingleUser(@PathVariable String userName) {
        return new ResponseEntity<UserDTO>(userService.singleUser(userName), HttpStatus.OK);
    }

    //DELETE method by id
    @DeleteMapping(value = "/delete/{id}")
    public void deleteUser(@PathVariable ObjectId id){
        userService.removeUser(id);
    }

    //DELETE method by username
    @DeleteMapping(value = "/deletebyname/{userName}")
    public void deleteUserByUserName(@PathVariable String userName){
        userService.removeUserByName(userName);
    }

    // POST method add user
    @PostMapping(
            value = "/adduser")
    public ResponseEntity<UserDTO> createUser(@RequestBody User user) {
        UserDTO userDto = userService.createUser(user);
        return ResponseEntity
                .created(URI
                        .create(String.format("/user/%s", userDto.getFirstName())))
                .body(userDto);
    }

    //UPDATE method updating user address
    @PutMapping(value = "/updateuseraddress/{userName}")
    public ResponseEntity<UserDTO> updateUserAddress(@PathVariable String userName, @RequestBody User user) {
        UserDTO userToBeUpdated = userService.updateUserAddress(userName, user);
        return ResponseEntity.ok(userToBeUpdated);
    }




}
