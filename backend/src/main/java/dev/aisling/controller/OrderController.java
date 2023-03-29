package dev.aisling.controller;

import dev.aisling.dto.OrderDTO;
import dev.aisling.model.Order;
import dev.aisling.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.net.URI;
import org.bson.types.ObjectId;
import java.util.List;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {
    @Autowired
    private OrderService orderService;

    //GET method get all orders
    @GetMapping(value = "/allorders")
    public ResponseEntity<List<OrderDTO>> getAllOrders() {
        return new ResponseEntity<List<OrderDTO>>(orderService.allOrders(), HttpStatus.OK);
    }

    //GET method get order by order id
    @GetMapping(value = "/orderid/{id}")
    public ResponseEntity<OrderDTO> getSingleOrderDetails(@PathVariable ObjectId id) {
        return new ResponseEntity<OrderDTO>(orderService.singleOrderDetails(id), HttpStatus.OK);
    }

//    @GetMapping(value = "/userid/{id}")
//    public ResponseEntity<List<OrderDTO>> findOrdersByUserId(@PathVariable ObjectId id) {
//        return new ResponseEntity<List<OrderDTO>>(orderService.ordersByUserId(id), HttpStatus.OK);
//    }

    //POST method create order
    @PostMapping(value = "/createorder")
    public ResponseEntity<OrderDTO> createOrder(@RequestBody Order order) {
        OrderDTO orderDto = orderService.createOrder(order);
        return ResponseEntity
                .created(URI
                        .create(String.format("/order/%s", orderDto.getId())))
                .body(orderDto);
    }


}


