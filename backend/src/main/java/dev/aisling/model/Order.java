package dev.aisling.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;


import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Order {

    private int numItemsOrdered;
    private double amount;
    private ObjectId[] clothingItemsBorrowed;
    private ObjectId userId;
}
