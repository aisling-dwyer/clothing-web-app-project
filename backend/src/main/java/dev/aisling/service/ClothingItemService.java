package dev.aisling.service;

import dev.aisling.dto.*;
import dev.aisling.model.ClothingItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

import org.bson.types.ObjectId;

@Service
public class ClothingItemService {
    @Autowired
    private ClothingItemRepository clothingItemRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;

    //GET method all clothing items
    public List<ClothingItem> allClothingItems() {

        List<ClothingItemDTO> itemDTOList = clothingItemRepository.findAll();

        List<ClothingItem> returnList = new ArrayList<>();

        for(ClothingItemDTO item1: itemDTOList) {
            ClothingItem item = new ClothingItem();
            item.setId(item1.getId().toString());
            item.setType(item1.getType());
            item.setSize(item1.getSize());
            item.setColour(item1.getColour());
            item.setDateAdded(item1.getDateAdded().toString());
            item.setImage(item1.getImage());
            item.setAvailable(item1.getAvailable());
            item.setUserId(item1.getUserId().toString());
            returnList.add(item);
        }

        return returnList;

    }


//    public ClothingItemDTO getItem(ObjectId id) {
//
//        ClothingItemDTO clothingItemDTO = clothingItemRepository.getItemById(id);
//
//        System.out.println(clothingItemDTO.getId().toString());
//
//        ClothingItem clothingItem1 = new ClothingItem();
//        clothingItem1.setId(clothingItemDTO.getId().toString());
//        return clothingItemDTO;
//    }

    //GET method single clothing item by id
    public ClothingItem getClothingItemDetailsResponse(ObjectId itemId) {
        Optional<ClothingItemDTO> clothingItem = clothingItemRepository.findById(itemId);
        ClothingItemDTO clothingItemDTO = clothingItem.get();


        ClothingItem clothingItem1 = new ClothingItem();
        clothingItem1.setId(clothingItemDTO.getId().toString());
        clothingItem1.setType(clothingItemDTO.getType());
        clothingItem1.setSize(clothingItemDTO.getSize());
        clothingItem1.setColour(clothingItemDTO.getColour());
        clothingItem1.setDateAdded(clothingItemDTO.getDateAdded().toString());
        clothingItem1.setAvailable(clothingItemDTO.getAvailable());
        clothingItem1.setImage(clothingItemDTO.getImage());
        clothingItem1.setUserId(clothingItemDTO.getUserId().toString());
        return clothingItem1;
    }

    //GET method list of clothing item objects by user id
    public List<ClothingItem> getUserClothingItemsList(ObjectId userId) {

       List<ClothingItemDTO> clothingItems = clothingItemRepository.findByUserId(userId);

       List<ClothingItem> clothingItemReturnList = new ArrayList<>();

       for(ClothingItemDTO clothingItem : clothingItems) {
           ClothingItem clothingItemFinal = new ClothingItem();
           clothingItemFinal.setId(clothingItem.getId().toString());
           clothingItemFinal.setType(clothingItem.getType());
           clothingItemFinal.setSize(clothingItem.getSize());
           clothingItemFinal.setColour(clothingItem.getColour());
           clothingItemFinal.setDateAdded(clothingItem.getDateAdded().toString());
           clothingItemFinal.setImage(clothingItem.getImage());
           clothingItemFinal.setAvailable(clothingItem.getAvailable());
           clothingItemFinal.setUserId(clothingItem.getUserId().toString());

           clothingItemReturnList.add(clothingItemFinal);

       }

       return clothingItemReturnList;
    }

    public ClothingItemDTO addClothingItem(ClothingItem clothingItem, ObjectId userId) {
        ClothingItemDTO clothingItemDto = new ClothingItemDTO();

        clothingItemDto.setType(clothingItem.getType());
        clothingItemDto.setColour(clothingItem.getColour());
        clothingItemDto.setSize(clothingItem.getSize());
        clothingItemDto.setDateAdded(new Date());
        clothingItemDto.setAvailable(true);
        clothingItemDto.setImage(clothingItem.getImage());
        clothingItemDto.setUserId(userId);

        return clothingItemRepository.save(clothingItemDto);

    }


    public void removeClothingItem(ObjectId userId, ObjectId itemId) {
            if(userRepository.findById(userId).isPresent()) {
                Optional<UserDTO> userFound = userService.getUserDetails(userId);
                if(userFound.isPresent()) {
                    ObjectId[] clothingItems = userFound.get().getClothingItems();
                    boolean itemFound = false;
                    ObjectId[] updatedClothingItems = new ObjectId[(clothingItems.length - 1)];
                    int counter = 0;
                    for(int i = 0; i< clothingItems.length; i++) {

                        if(clothingItems[i].equals(itemId)) {
                            itemFound = true;
                        } else {
                            updatedClothingItems[counter] = clothingItems[i];
                            counter++;
                        }
                    }
                    if(itemFound) {
                        userFound.get().setClothingItems(updatedClothingItems);
                        userService.updateUserDetails(userFound.get());
                        clothingItemRepository.deleteById(itemId);
                    }
                }
            }
    }


//
//        public ClothingItemDTO updateItemAvailability(ObjectId id, ClothingItem clothingItem) {
//        if(!clothingItemRepository.existsById(id)) {
//            try {
//                throw new ClothingItemNotFoundException(id);
//            } catch (ClothingItemNotFoundException e) {
//                e.printStackTrace();
//            }
//        }
//        ClothingItemDTO clothingItemDTO = getItem(id);
//        clothingItemDTO.setAvailable(clothingItem.getAvailable());
//        return clothingItemRepository.save(clothingItemDTO);
//
//    }


}
