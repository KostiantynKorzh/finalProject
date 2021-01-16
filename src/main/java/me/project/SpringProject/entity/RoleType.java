package me.project.SpringProject.entity;

public enum RoleType {
    ROLE_SUPERADMIN,
    ROLE_ADMIN,
    ROLE_USER,
    ROLE_USER_WEB;

    public String getName() {
        return name();
    }
}


