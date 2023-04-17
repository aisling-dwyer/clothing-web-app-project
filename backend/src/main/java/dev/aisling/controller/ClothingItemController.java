package dev.aisling.controller;

import dev.aisling.dto.ClothingItemDTO;
import dev.aisling.model.ClothingItem;
import dev.aisling.service.ClothingItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import org.bson.types.ObjectId;

@RestController
@RequestMapping("/clothingitems")
@CrossOrigin(origins = "http://localhost:3000")
public class ClothingItemController {
    @Autowired
    private ClothingItemService clothingItemService;

    //GET METHOD
    @GetMapping(value = "/allitems")
    public ResponseEntity<List<ClothingItemDTO>> allClothingItems() {
        return new ResponseEntity<List<ClothingItemDTO>>(clothingItemService.allClothingItems(), HttpStatus.OK);
    }

    //GET METHOD find item by item id
    @GetMapping(value = "/finditem/{id}")
    public ResponseEntity<ClothingItemDTO> singleClothingItem(@PathVariable ObjectId id) {
        return new ResponseEntity<ClothingItemDTO>(clothingItemService.getItem(id), HttpStatus.OK);
    }

    //GET method get user clothing items by user Id
    @GetMapping(value = "/{userIdString}/clothing-items")
//    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<List<ClothingItemDTO>> getUserClothingItems(@PathVariable String userIdString) {
        ObjectId userId = new ObjectId(userIdString);
        return new ResponseEntity<List<ClothingItemDTO>>(clothingItemService.getUserClothingItemsList(userId), HttpStatus.OK);
    }


    //DELETE METHOD delete by id
    @DeleteMapping(value = "/deleteitembyid/{id}")
    public void deleteUser(@PathVariable ObjectId id){
        clothingItemService.removeClothingItem(id);
    }

    //POST METHOD
    @PostMapping(value = "/addclothingitem")
    public ResponseEntity<ClothingItemDTO> addClothingItem(@RequestBody ClothingItem clothingItem) {
        ClothingItemDTO clothingItemDto = clothingItemService.addClothingItem(clothingItem);
        return ResponseEntity
                .created(URI
                        .create(String.format("/%s", clothingItemDto.getType())))
                .body(clothingItemDto);
    }

    //UPDATE METHOD
    @PutMapping(value = "/changeitemavailability/{id}")
    public ResponseEntity<ClothingItemDTO> changeItemAvailability(@PathVariable ObjectId id, @RequestBody ClothingItem clothingItem) {
        ClothingItemDTO itemToBeUpdated = clothingItemService.updateItemAvailability(id, clothingItem);
        return ResponseEntity.ok(itemToBeUpdated);
    }


}
