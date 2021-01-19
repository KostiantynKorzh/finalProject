package me.project.SpringProject.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
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

    @Enumerated(EnumType.STRING)
    @Column
    private Subjects subject;


    @Enumerated(EnumType.STRING)
    @Column
    private Difficulties difficulty;

//    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
//    @JoinTable(name = "user_required_tests",
//            joinColumns = @JoinColumn(name = "test_id"),
//            inverseJoinColumns = @JoinColumn(name = "user_id"))
//    private Set<User> usersRequired;
//
//    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
//    @JoinTable(name = "user_passed_tests",
//            joinColumns = @JoinColumn(name = "test_id"),
//            inverseJoinColumns = @JoinColumn(name = "user_id"))
//    private Set<User> usersPassed;

    @Basic
    @Temporal(TemporalType.TIMESTAMP)
    private Date created;

}
