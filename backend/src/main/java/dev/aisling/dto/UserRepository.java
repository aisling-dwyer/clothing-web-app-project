package dev.aisling.dto;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<UserDTO, ObjectId> {
    Optional<UserDTO> findUserByUserName(String userName);


}
