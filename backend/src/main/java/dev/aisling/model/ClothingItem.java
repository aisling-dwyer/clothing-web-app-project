package dev.aisling.model;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClothingItem {
    private String id;
    private String type;
    private String size;
    private String colour;
    private String dateAdded;
    private Boolean available;
    private String image;
    private String userId;

}
