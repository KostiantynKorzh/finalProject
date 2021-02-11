package me.project.SpringProject.exception;

public class NoSuchUserException extends RuntimeException{

    String message;

    public NoSuchUserException(String message) {
        super(message);
        this.message = message;
    }
}
