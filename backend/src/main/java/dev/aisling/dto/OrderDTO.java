package dev.aisling.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

import java.util.Date;
import org.springframework.format.annotation.DateTimeFormat;

@Document(collection = "order")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO {
    @Id
    private ObjectId id;
    @CreatedDate
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date orderDate;
    private int numItemsOrdered;
    private double amount;
    private String[] clothingItemsBorrowed;
    private ObjectId userId;


//    public String[] getOrderItemsBorrowed(String[] clothingItemsBorrowed) {
//        String[] borrowedItems = new String[clothingItemsBorrowed.length];
//        for(int i = 0; i < clothingItemsBorrowed.length; i++) {
//            clothingItemsBorrowed[i].toString();
//        }
//        return borrowedItems;
//
//    }
}
