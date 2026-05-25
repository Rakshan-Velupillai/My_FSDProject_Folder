package com.app.model;


import jakarta.persistence.*;

@Entity
@Table(name = "insurance_company")
public class InsuranceCompany {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;


    @Column(name = "company_name",nullable = false)
    private String companyName;

    @Column(name = "registration_no",nullable = false,unique = true)
    private  String regNo;

    @Column(length = 1000,nullable = false)
    private String address;

    @OneToOne
    @JoinColumn(name = "user_id",nullable = false,unique = true)
    private User user;

    public InsuranceCompany() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getRegNo() {
        return regNo;
    }

    public void setRegNo(String regNo) {
        this.regNo = regNo;
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
        return "InsuranceCompany{" +
                "id=" + id +
                ", companyName='" + companyName + '\'' +
                ", regNo='" + regNo + '\'' +
                ", address='" + address + '\'' +
                ", user=" + user +
                '}';
    }
}
