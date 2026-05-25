package com.model;

import jakarta.persistence.*;

@Entity
public class Healthcare {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  @Column(name = "healthcare_name",nullable = false)
  private String healthcareName;

  @Column(nullable = false)
  private String specialization;

  @Column(name = "license_number",nullable = false,unique = true)
  private  String licenseNumber;

  @Column(length = 1000,nullable = false)
  private String address;

  @OneToOne
  @JoinColumn(name = "user_id",nullable = false)
  private User user;

  public Healthcare() {
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getHealthcareName() {
    return healthcareName;
  }

  public void setHealthcareName(String healthcareName) {
    this.healthcareName = healthcareName;
  }

  public String getSpecialization() {
    return specialization;
  }

  public void setSpecialization(String specialization) {
    this.specialization = specialization;
  }

  public String getLicenseNumber() {
    return licenseNumber;
  }

  public void setLicenseNumber(String licenseNumber) {
    this.licenseNumber = licenseNumber;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }


  @Override
  public String toString() {
    return "Healthcare{" +
            "id=" + id +
            ", healthcareName='" + healthcareName + '\'' +
            ", specialization='" + specialization + '\'' +
            ", licenseNumber='" + licenseNumber + '\'' +
            ", address='" + address + '\'' +
            ", user=" + user +
            '}';
  }
}
