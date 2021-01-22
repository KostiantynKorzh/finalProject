package me.project.SpringProject.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Set;

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


    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Difficulties difficulty;

    @OneToMany(mappedBy = "test")
    private Set<Question> questions;

    @Column(nullable = false)
    private Integer duration;

//    @OneToMany(mappedBy = "test")
//    private Set<RequiredTest> requiredTests;

    @Basic
    @Temporal(TemporalType.TIMESTAMP)
    private Date created;

}
