package dev.aisling;

import dev.aisling.config.RsaKeyProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.web.bind.annotation.*;
;

@SpringBootApplication
@EnableConfigurationProperties(RsaKeyProperties.class)
@RestController
public class ClothingProjectApplication {

    public static void main(String[] args) {
        SpringApplication.run(ClothingProjectApplication.class, args);
    }

}
