package dev.aisling.controller;

import dev.aisling.dto.UserDTO;
import dev.aisling.model.User;
import dev.aisling.dto.ClothingItemDTO;
import dev.aisling.service.UserService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.ResponseErrorHandler;
import java.net.URI;
import java.security.Principal;
import java.util.List;
import java.util.Optional;



@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    @Autowired
    private UserService userService;



    //GET user logged in practice
    @GetMapping (value= "/home")
    public String home(Principal principal) {
        return "Hello, " + principal.getName();
    }

    //GET method get all users
    @GetMapping (value =  "/all")
//    @PreAuthorize("hasAuthority('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return new ResponseEntity<List<UserDTO>>(userService.allUsers(), HttpStatus.OK);
    }

    //GET method get user account by username
    @GetMapping(value = "/{userName}")
//    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Optional<UserDTO>> getSingleUser(@PathVariable String userName) {
        return new ResponseEntity<Optional<UserDTO>>(userService.singleUser(userName), HttpStatus.OK);
    }

    //GET method get user account by user ID
    @GetMapping(value = "/{id}")
//    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Optional<UserDTO>> getUserDetailsById(@PathVariable String userIdString) {
        ObjectId userId = new ObjectId(userIdString);
        return new ResponseEntity<Optional<UserDTO>>(userService.getUserDetails(userId), HttpStatus.OK);
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
    @PostMapping(value = "/add")
//    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<UserDTO> createUser(@RequestBody User user) {
        UserDTO userDto = userService.createUser(user);
        return ResponseEntity
                .created(URI
                        .create(String.format("/user/%s", userDto.getFirstName())))
                .body(userDto);
    }

    //UPDATE method updating user address
    @PatchMapping(value = "/updateuser/{userName}")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Optional<UserDTO>> updateUserAddress(@PathVariable String userName, @RequestBody User user) {
        Optional<UserDTO> userToBeUpdated = userService.updateUserAddress(userName, user);
        return ResponseEntity.ok(userToBeUpdated);
    }




}
