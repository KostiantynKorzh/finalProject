package me.project.SpringProject.exception;

import lombok.Data;

@Data
public class NoSuchUserException extends RuntimeException{

    private static String message = "No such user";

    public NoSuchUserException() {
        super(message);
    }

    public NoSuchUserException(String message) {
        super(message);
        this.message = message;
    }
}
