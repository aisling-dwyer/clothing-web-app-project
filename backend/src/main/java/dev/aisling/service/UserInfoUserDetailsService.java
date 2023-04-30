package dev.aisling.service;

import dev.aisling.config.UserUserDetails;
import dev.aisling.dto.UserDTO;
import dev.aisling.dto.UserRepository;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class UserInfoUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository repository;

    @SneakyThrows
    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        Optional<UserDTO> user = repository.findUserByUserName(userName);
        return user.map(UserUserDetails::new)
                .orElseThrow(() -> new UserNotFoundException("User not found: " + userName));
    }
}
