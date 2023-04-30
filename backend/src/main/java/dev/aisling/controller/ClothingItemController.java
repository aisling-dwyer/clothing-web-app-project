package dev.aisling.controller;

import dev.aisling.dto.ClothingItemDTO;
import dev.aisling.dto.User;
import dev.aisling.dto.UserDTO;
import dev.aisling.model.ClothingItem;
import dev.aisling.service.ClothingItemService;
import dev.aisling.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;


@RestController
@RequestMapping("/clothingitems")
public class ClothingItemController {
    @Autowired
    private ClothingItemService clothingItemService;
    @Autowired
    private UserService userService;

    //GET METHOD
    @GetMapping(value = "/all")
    public ResponseEntity<List<ClothingItem>> allClothingItems() {
        return new ResponseEntity<List<ClothingItem>>(clothingItemService.allClothingItems(), HttpStatus.OK);
    }

    //GET method get clothing item details by item ID
    @GetMapping(value = "/{itemIdString}/item-details")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<ClothingItem> getClothingItemDetailsById(@PathVariable String itemIdString) {
        ObjectId itemId = new ObjectId(itemIdString);
        return new ResponseEntity<ClothingItem>(clothingItemService.getClothingItemDetailsResponse(itemId), HttpStatus.OK);
    }

    //GET method get user clothing items by user Id
    @GetMapping(value = "/{userIdString}/clothing-items")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<ClothingItem>> getUserClothingItems(@PathVariable String userIdString) {
        ObjectId userId = new ObjectId(userIdString);
        return new ResponseEntity<List<ClothingItem>>(clothingItemService.getUserClothingItemsList(userId), HttpStatus.OK);
    }


    //DELETE METHOD delete by id
    @DeleteMapping(value = "/user/{userIdString}/delete-item/{itemIdString}")
     public void deleteUserItem(@PathVariable String userIdString, @PathVariable String itemIdString){
        ObjectId userId = new ObjectId(userIdString);
        ObjectId itemId = new ObjectId(itemIdString);
        clothingItemService.removeClothingItem(userId, itemId);
    }

    //POST METHOD
    @PostMapping(value = "/{userIdString}/addclothingitem")
    public ResponseEntity<ClothingItemDTO> addClothingItem(@PathVariable String userIdString, @RequestBody ClothingItem clothingItem) {
        ObjectId userId = new ObjectId(userIdString);
        ClothingItemDTO clothingItemDto = clothingItemService.addClothingItem(clothingItem, userId);

        Optional<UserDTO> userFound = userService.getUserDetails(userId);
        ObjectId[] clothingItems = userFound.get().getClothingItems();
        ObjectId[] updatedClothingItems = new ObjectId[(clothingItems != null ? clothingItems.length + 1 : 1)];
        if(clothingItems == null){
            updatedClothingItems[0] = clothingItemDto.getId();
        }
            else {
            for (int i = 0; i < updatedClothingItems.length; i++) {
                if (i == clothingItems.length) {
                    updatedClothingItems[i] = clothingItemDto.getId();
                } else {
                    updatedClothingItems[i] = clothingItems[i];
                }

            }
        }
        userFound.get().setClothingItems(updatedClothingItems);
        userService.updateUserDetails(userFound.get());
        return ResponseEntity
                .created(URI
                        .create(String.format("/%s", clothingItemDto.getType())))
                .body(clothingItemDto);
    }

//    //UPDATE METHOD
//    @PatchMapping(value = "/edit-item/{itemIdString}")
//    public ResponseEntity<ClothingItemDTO> changeItemAvailability(@PathVariable String itemIdString, @RequestBody ClothingItem clothingItem) {
//        ObjectId itemId = new ObjectId(itemIdString);
//        ClothingItemDTO itemToBeUpdated = clothingItemService.updateItemAvailability(itemId, clothingItem);
//        return ResponseEntity.ok(itemToBeUpdated);
//    }


}
