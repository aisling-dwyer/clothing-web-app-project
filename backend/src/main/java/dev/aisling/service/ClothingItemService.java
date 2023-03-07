package dev.aisling.service;

import dev.aisling.dto.ClothingItemDTO;
import dev.aisling.dto.ClothingItemRepository;
import dev.aisling.model.ClothingItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;

@Service
public class ClothingItemService {
    @Autowired
    private ClothingItemRepository clothingItemRepository;

    //GET method all clothing items
    public List<ClothingItemDTO> allClothingItems() {
        return clothingItemRepository.findAll();
    }

    //GET method single clothing item by id
    public ClothingItemDTO getItem(ObjectId id) {
        return clothingItemRepository.getItemById(id);
    }

    public ClothingItemDTO addClothingItem(ClothingItem clothingItem) {
        ClothingItemDTO clothingItemDto = new ClothingItemDTO();

        clothingItemDto.setType(clothingItem.getType());
        clothingItemDto.setColour(clothingItem.getColour());
        clothingItemDto.setSize(clothingItem.getSize());
        clothingItemDto.setDateAdded(new Date());
        clothingItemDto.setAvailable(true);
        clothingItemDto.setUrl(clothingItem.getUrl());

        return clothingItemRepository.save(clothingItemDto);

    }


    public String removeClothingItem(ObjectId id) {
        if(!clothingItemRepository.existsById(id)) {
            try {
                throw new ClothingItemNotFoundException(id);
            } catch (ClothingItemNotFoundException e) {
                e.printStackTrace();
            }
        }
        clothingItemRepository.deleteById(id);
        return "Clothing item with id "+id+ " has been successfully deleted.";
    }

    public ClothingItemDTO updateItemAvailability(ObjectId id, ClothingItem clothingItem) {
        if(!clothingItemRepository.existsById(id)) {
            try {
                throw new ClothingItemNotFoundException(id);
            } catch (ClothingItemNotFoundException e) {
                e.printStackTrace();
            }
        }
        ClothingItemDTO clothingItemDTO = getItem(id);
        clothingItemDTO.setAvailable(clothingItem.getAvailable());
        return clothingItemRepository.save(clothingItemDTO);

    }


}
