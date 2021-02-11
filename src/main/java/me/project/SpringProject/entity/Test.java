package me.project.SpringProject.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor


@Entity
@Table(name = "tests")
public class Test {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Subjects subject;

    @Enumerated(EnumType.ORDINAL)
    @Column(nullable = false)
    private Difficulty difficulty;

    @Column(nullable = false)
    private Integer duration;

    @Basic
    @Temporal(TemporalType.TIMESTAMP)
    private Date created;

}
