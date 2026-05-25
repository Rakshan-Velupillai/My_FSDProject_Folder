package com.model;

import com.enums.Gender;
import jakarta.persistence.*;

import java.time.LocalDate;


@Entity
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "date_of_birth",nullable = false)
    private LocalDate dob;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gender gender;

    @Column(length = 1000,nullable = false)
    private String address;

    @Column(name="symptoms_description",length = 1000)
    private String symptomsDesc;

    @Column(name="treatment_description",length = 1000)
    private String treatmentDesc;

    @OneToOne
    @JoinColumn(name = "user_id",nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "insurance_plan_id",nullable = false)
    private InsurancePlan insurancePlan;


    public Patient() {
    }

    public InsurancePlan getInsurancePlan() {
        return insurancePlan;
    }

    public void setInsurancePlan(InsurancePlan insurancePlan) {
        this.insurancePlan = insurancePlan;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getSymptomsDesc() {
        return symptomsDesc;
    }

    public void setSymptomsDesc(String symptomsDesc) {
        this.symptomsDesc = symptomsDesc;
    }

    public String getTreatmentDesc() {
        return treatmentDesc;
    }

    public void setTreatmentDesc(String treatmentDesc) {
        this.treatmentDesc = treatmentDesc;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Patient{" +
                "id=" + id +
                ", dob=" + dob +
                ", gender=" + gender +
                ", address='" + address + '\'' +
                ", symptomsDesc='" + symptomsDesc + '\'' +
                ", treatmentDesc='" + treatmentDesc + '\'' +
                ", user=" + user +
                ", insurancePlan=" + insurancePlan +
                '}';
    }
}
