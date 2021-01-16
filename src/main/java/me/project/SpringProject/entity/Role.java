package me.project.SpringProject.entity;

import lombok.Data;

import javax.persistence.*;

@Data

@Entity
@Table(name = "roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(length=20)
    private RoleType name;

    public RoleType getName() {
        return name;
    }

}
