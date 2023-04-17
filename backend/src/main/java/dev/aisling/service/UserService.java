package dev.aisling.service;

import dev.aisling.dto.ClothingItemDTO;
import dev.aisling.dto.UserDTO;
import dev.aisling.model.User;
import dev.aisling.dto.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import org.bson.types.ObjectId;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;



    //GET method to read all users
    public List<UserDTO> allUsers() {
        return userRepository.findAll();
    }

    //GET method to read single user by using username
    public Optional<UserDTO> singleUser(String userName) {

        return userRepository.findUserByUserName(userName);
    }

    //DELETE method to delete user by username
    public String removeUser(ObjectId id) {
        if(!userRepository.existsById(id)) {
            try {
                throw new UserNotFoundException(id);
            } catch (UserNotFoundException e) {
                e.printStackTrace();
            }
        }
        userRepository.deleteById(id);
        return "User with id "+id+ " has been successfully deleted.";
    }

//    //DELETE method to delete user by username
//    public String removeUserByName(String userName) {
//        Optional<UserDTO> userToBeDeleted = singleUser(userName);
//        userRepository.delete(userToBeDeleted);
//        return "User with id "+userToBeDeleted+ " has been successfully deleted.";
//    }

    //POST method to add user
    public UserDTO createUser (User user) {
        UserDTO userDto = new UserDTO();

        userDto.setUserName(user.getUserName());
        //password encrypted
        userDto.setPassword(passwordEncoder.encode(user.getPassword()));
        userDto.setLastName(user.getLastName());
        userDto.setFirstName(user.getFirstName());
        userDto.setEmail(user.getEmail());
        userDto.setAddress(user.getAddress());
        userDto.setPhone(user.getPhone());
        userDto.setClothingItems(null);
        userDto.setOrders(null);
        userDto.setRole("ROLE_USER");

        return userRepository.save(userDto);
    }

    //UPDATE method - patch
    public Optional<UserDTO> updateUserAddress(String userName, User user) {
        Optional<UserDTO> userDto = singleUser(userName);
        if(userDto.isPresent()) {
            UserDTO userFound = userDto.get();
            userFound.setAddress(user.getAddress());
            userRepository.save(userFound);

        }

        return userDto;

    }


    public Optional<UserDTO> getUserDetails(ObjectId userId) {
        return userRepository.findById(userId);
    }
}
