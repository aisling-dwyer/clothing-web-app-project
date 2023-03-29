package dev.aisling.controller;

import dev.aisling.dto.UserDTO;
import dev.aisling.model.User;
import dev.aisling.service.UserService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.ResponseErrorHandler;
import java.net.URI;
import java.util.List;
import java.util.Optional;



@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    @Autowired
    private UserService userService;

    //GET method get all users

    @GetMapping (value =  "/allusers")
//    @PreAuthorize("hasAuthority('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return new ResponseEntity<List<UserDTO>>(userService.allUsers(), HttpStatus.OK);
    }

    //GET method get user by username
    @GetMapping(value = "/{userName}")
//    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Optional<UserDTO>> getSingleUser(@PathVariable String userName) {
        return new ResponseEntity<Optional<UserDTO>>(userService.singleUser(userName), HttpStatus.OK);
    }


    //DELETE method by id
    @DeleteMapping(value = "/delete/{id}")
    @PreAuthorize("hasAuthority('ROLE_USER')")
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
    @PostMapping(value = "/adduser")
//    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<UserDTO> createUser(@RequestBody User user) {
        UserDTO userDto = userService.createUser(user);
        return ResponseEntity
                .created(URI
                        .create(String.format("/user/%s", userDto.getFirstName())))
                .body(userDto);
    }

    //UPDATE method updating user address
    @PatchMapping(value = "/updateuseraddress/{userName}")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Optional<UserDTO>> updateUserAddress(@PathVariable String userName, @RequestBody User user) {
        Optional<UserDTO> userToBeUpdated = userService.updateUserAddress(userName, user);
        return ResponseEntity.ok(userToBeUpdated);
    }




}
