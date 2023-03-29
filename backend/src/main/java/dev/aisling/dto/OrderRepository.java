package dev.aisling.dto;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface OrderRepository extends MongoRepository<OrderDTO, ObjectId> {
    OrderDTO findOrderById(ObjectId id);

//    List<OrderDTO> getUserOrders(ObjectId id);



}



