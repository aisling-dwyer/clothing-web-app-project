package dev.aisling;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.security.Principal;

@SpringBootApplication
@RestController
public class ClothingProjectApplication {
    public static void main(String[] args) {
        SpringApplication.run(ClothingProjectApplication.class, args);
    }

    @GetMapping("/")
    public String welcome(Principal principal) {
        return "Hello " +principal.getName()+ ", welcome to Your Friendly Neighbourhood Wardrobe!";
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/users/allusers").allowedOrigins("https://localhost:8090");
            }
        };
    }
}
