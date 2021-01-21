package me.project.SpringProject.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
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
    @Column
    private Subjects subject;


    @Enumerated(EnumType.STRING)
    @Column
    private Difficulties difficulty;

    @OneToMany(mappedBy = "test")
    private Set<Question> questions;

    @Basic
    @Temporal(TemporalType.TIMESTAMP)
    private Date created;

}
