package me.project.SpringProject.exception;

public class NoSuchTestException extends RuntimeException{

    private static String message = "No such test";

    public NoSuchTestException() {
        super(message);
    }

    public NoSuchTestException(String message) {
        super(message);
        this.message = message;
    }

}
