package dev.aisling.service;

import org.bson.types.ObjectId;

public class UserNotFoundException extends Throwable {
    public UserNotFoundException(ObjectId id) {
    }
}
