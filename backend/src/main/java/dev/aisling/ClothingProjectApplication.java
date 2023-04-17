package dev.aisling;

import dev.aisling.config.RsaKeyProperties;
import dev.aisling.controller.AuthController;
import dev.aisling.dto.UserDTO;
import dev.aisling.service.TokenService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.security.Principal;

@SpringBootApplication
@EnableConfigurationProperties(RsaKeyProperties.class)
@RestController
public class ClothingProjectApplication {

    public static void main(String[] args) {
        SpringApplication.run(ClothingProjectApplication.class, args);
    }

    @GetMapping("/")
    public String welcome(Principal principal) {
        return "Hello " +principal.getName()+ ", welcome to Your Friendly Neighbourhood Wardrobe!";
    }

//    //POST mapping to log in
//    @CrossOrigin(origins = "http://localhost:3000")
//    @PostMapping("/login")
//    public ResponseEntity<String> login(@RequestParam String userName, @RequestParam String password) {
//        if (userName == null || password == null || !userName.equals("valid_username") || !password.equals("valid_password")) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
//        }
//        String token = TokenService.generateToken(userName, password);
//    }

//    @Bean
//    public WebMvcConfigurer corsConfigurer() {
//        return new WebMvcConfigurer() {
//            @Override
//            public void addCorsMappings(CorsRegistry registry) {
//                registry.addMapping("/**")
//                        .allowedOrigins("https://localhost:3000")
//                                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH")
//                                .allowedHeaders("*")
//                                .allowCredentials(true);
//            }
//        };
//    }

}
