package dev.aisling.dto;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ClothingItemRepository extends MongoRepository<ClothingItemDTO, ObjectId> {
    ClothingItemDTO getItemById(ObjectId id);

    List<ClothingItemDTO> findByUserId(ObjectId userId);

}
