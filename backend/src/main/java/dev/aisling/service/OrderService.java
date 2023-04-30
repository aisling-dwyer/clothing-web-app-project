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

    public OrderDTO createOrder(ObjectId userId, Order order) {
        OrderDTO orderDto = new OrderDTO();
        orderDto.setOrderDate(new Date());
        orderDto.setNumItemsOrdered(order.getNumItemsOrdered());
        orderDto.setAmount(10*(order.getNumItemsOrdered()));
        orderDto.setClothingItemsBorrowed(order.getClothingItemsBorrowed());
        orderDto.setUserId(userId);
        return orderRepository.save(orderDto);
    }

    //GET method list of order objects by user id
    public List<Order> getUserOrdersList(ObjectId userId) {

        List<OrderDTO> orders = orderRepository.findByUserId(userId);
        List<Order> ordersList = new ArrayList<>();

        for(OrderDTO order : orders) {
            Order orderModel = new Order();
            orderModel.setId(order.getId().toString());
            orderModel.setOrderDate(order.getOrderDate().toString());
            orderModel.setNumItemsOrdered(order.getNumItemsOrdered());
            orderModel.setAmount(order.getNumItemsOrdered()*10);
            orderModel.setClothingItemsBorrowed(order.getClothingItemsBorrowed());
            orderModel.setUserId(order.getUserId().toString());
            ordersList.add(orderModel);
        }



        return ordersList;
    }


}
