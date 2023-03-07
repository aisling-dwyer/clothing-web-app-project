package dev.aisling.service;

import dev.aisling.dto.UserDTO;
import dev.aisling.model.User;
import dev.aisling.dto.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import org.bson.types.ObjectId;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    //GET method to read all users
    public List<UserDTO> allUsers() {
        return userRepository.findAll();
    }

    //GET method to read single user by using username
    public UserDTO singleUser(String userName) {
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

    //DELETE method to delete user by username
    public String removeUserByName(String userName) {
        UserDTO userToBeDeleted = singleUser(userName);
        userRepository.delete(userToBeDeleted);
        return "User with id "+userToBeDeleted+ " has been successfully deleted.";
    }

    //POST method to add user
    public UserDTO createUser (User user) {
        UserDTO userDto = new UserDTO();

        userDto.setUserName(user.getUserName());
        userDto.setPassword(user.getPassword());
        userDto.setLastName(user.getLastName());
        userDto.setFirstName(user.getFirstName());
        userDto.setEmail(user.getEmail());
        userDto.setAddress(user.getAddress());
        userDto.setPhone(user.getPhone());

        return userRepository.save(userDto);
    }

    //UPDATE method
    public UserDTO updateUserAddress(String userName, User user) {
        UserDTO userDto = singleUser(userName);

        userDto.setAddress(user.getAddress());

        return userRepository.save(userDto);
    }
}
