package dev.aisling.service;

import org.bson.types.ObjectId;

public class ClothingItemNotFoundException extends Throwable {
    public ClothingItemNotFoundException(ObjectId id) {
    }
}
