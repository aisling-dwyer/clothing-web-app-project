package dev.aisling.service;

import dev.aisling.dto.ClothingItemDTO;
import dev.aisling.dto.OrderDTO;
import dev.aisling.dto.OrderRepository;
import dev.aisling.model.Order;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
        orderDto.setAmount(10*(order.getNumItemsOrdered()));
        orderDto.setClothingItemsBorrowed(order.getClothingItemsBorrowed());
        orderDto.setUserId(order.getUserId());
        return orderRepository.save(orderDto);
    }

    //GET method list of order objects by user id
    public List<OrderDTO> getUserOrdersList(ObjectId userId) {

        List<OrderDTO> orders = orderRepository.findByUserId(userId);
        List<OrderDTO> orderDTOS = new ArrayList<>();

        for(OrderDTO order : orders) {
            OrderDTO orderDTO = new OrderDTO();
            orderDTO.setId(order.getId());
            orderDTO.setOrderDate(order.getOrderDate());
            orderDTO.setNumItemsOrdered(order.getNumItemsOrdered());
            orderDTO.setAmount(order.getAmount());
            orderDTO.setClothingItemsBorrowed(order.getClothingItemsBorrowed());
            orderDTO.setUserId(order.getUserId());
            orderDTOS.add(orderDTO);
        }

        return orderDTOS;
    }


}
