package com.app.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String title;
    @Column(length = 1000)
    private String description;
    private String location;
    private Double salary;

    @ManyToOne
    private Employer employer;
}
