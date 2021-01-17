package me.project.SpringProject.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Set;

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

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_required_tests",
            joinColumns = @JoinColumn(name = "test_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<User> users;

    @Basic
    @Temporal(TemporalType.TIMESTAMP)
    private Date created;

}
