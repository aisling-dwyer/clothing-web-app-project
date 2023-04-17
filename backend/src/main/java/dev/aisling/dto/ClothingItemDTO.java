package dev.aisling.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Document(collection = "clothing_item")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClothingItemDTO {
    @Id
    private ObjectId id;
    private String type;
    private String size;
    private String colour;
    @CreatedDate
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date dateAdded;
    private Boolean available;
    private String url;
    private ObjectId userId;

}
