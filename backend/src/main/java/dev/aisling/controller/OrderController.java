package dev.aisling.controller;

import com.nimbusds.jose.util.ArrayUtils;
import dev.aisling.dto.ClothingItemDTO;
import dev.aisling.dto.OrderDTO;
import dev.aisling.dto.UserDTO;
import dev.aisling.model.Order;
import dev.aisling.service.OrderService;
import dev.aisling.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Collections;
import java.util.Optional;
import java.net.URI;
import org.bson.types.ObjectId;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {
        @Autowired
        private OrderService orderService;
        @Autowired
        private UserService userService;

        //GET method get all orders
        @GetMapping(value = "/all")
        public ResponseEntity<List<OrderDTO>> getAllOrders() {
                return new ResponseEntity<List<OrderDTO>>(orderService.allOrders(), HttpStatus.OK);
        }

//        //GET method get order by order id
//        @GetMapping(value = "/orderid/{id}")
//        @PreAuthorize("hasAuthority('ROLE_USER')")
//        public ResponseEntity<OrderDTO> getSingleOrderDetails(@PathVariable ObjectId id) {
//                return new ResponseEntity<OrderDTO>(orderService.singleOrderDetails(id), HttpStatus.OK);
//        }


        //GET method get user orders by user Id
        @GetMapping(value = "/{userIdString}/order-details")

        public ResponseEntity<List<Order>> getUserOrders(@PathVariable String userIdString) {
                ObjectId userId = new ObjectId(userIdString);
                return new ResponseEntity<List<Order>>(orderService.getUserOrdersList(userId), HttpStatus.OK);
        }

        //POST method create order
        @PostMapping(value = "/{userIdString}/create-order")
        public ResponseEntity<OrderDTO> createOrder(@PathVariable String userIdString, @RequestBody Order order) {
                ObjectId userId = new ObjectId(userIdString);
                OrderDTO orderDto = orderService.createOrder(userId, order);
                Optional<UserDTO> userFound = userService.getUserDetails(userId);
                ObjectId[] userOrders = userFound.get().getOrders();
                ObjectId[] updatedOrders = new ObjectId[(userOrders != null ? userOrders.length + 1 : 1)];

                for (int i = 0; i < updatedOrders.length; i++) {
                        if (i == (updatedOrders.length - 1)) {
                                updatedOrders[i] = orderDto.getId();
                        } else {
                                updatedOrders[i] = userOrders[i];
                        }
                }
                userFound.get().setOrders(updatedOrders);
                userService.updateUserDetails(userFound.get());
                return ResponseEntity
                        .created(URI
                                .create(String.format("/order/%s", orderDto.getId().toString())))
                        .body(orderDto);
        }
}


