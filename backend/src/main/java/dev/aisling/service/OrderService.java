package dev.aisling.service;

import dev.aisling.dto.OrderDTO;
import dev.aisling.dto.OrderRepository;
import dev.aisling.model.Order;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Date;
import java.util.Optional;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    public OrderDTO singleOrderDetails(ObjectId id) {
        return orderRepository.findOrderById(id);
    }

    public List<OrderDTO> allOrders() {
        return orderRepository.findAll();
    }

    public OrderDTO createOrder(Order order) {
        OrderDTO orderDto = new OrderDTO();
        orderDto.setOrderDate(new Date());
        orderDto.setNumItemsOrdered(order.getNumItemsOrdered());
        orderDto.setAmount(order.getAmount());
        orderDto.setClothingItemsBorrowed(order.getClothingItemsBorrowed());
        return orderRepository.save(orderDto);
    }

//    public List<OrderDTO> ordersByUserId(ObjectId id) {
//        return orderRepository.getUserOrders(id);
//    }

}
