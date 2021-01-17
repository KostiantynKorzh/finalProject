package me.project.SpringProject.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name = "tests")
public class Test {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String title;

//    @OneToMany(mappedBy = "question")
//    private List<Question> answers;

    @Enumerated(EnumType.STRING)
    @Column
    private Subjects subject;


    @Enumerated(EnumType.STRING)
    @Column
    private Difficulties difficulty;

    @ManyToMany(mappedBy = "requiredTests")
    private List<User> users;

    @Basic
    @Temporal(TemporalType.TIMESTAMP)
    private Date created;

}
