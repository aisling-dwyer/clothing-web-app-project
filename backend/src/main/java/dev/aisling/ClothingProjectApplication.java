package dev.aisling;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@SpringBootApplication
@RestController
public class ClothingProjectApplication {
    public static void main(String[] args) {
        SpringApplication.run(ClothingProjectApplication.class, args);
    }

    @GetMapping("/")
    public String apiRoot() {
        return "Hello, World!";
    }
}
