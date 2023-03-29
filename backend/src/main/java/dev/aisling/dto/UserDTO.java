package dev.aisling.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Optional;

@Document(collection = "user")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
   @Id
   private ObjectId id;
   private String userName;
   private String password;
   private String lastName;
   private String firstName;
   private String email;
   private String address;
   private String phone;
   private ObjectId[] clothingItems;
   private ObjectId[] orders;
   private String role;

}
