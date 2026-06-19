package com.mbacms.model;

import com.mbacms.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(precision = 12,scale = 2)
    private BigDecimal paymentAmount;

    private LocalDate paymentDate;
    private String paymentMethod;

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus; // e.g., Processed, Pending

    @OneToOne
    private Claim claim;

    @ManyToOne
    private InsuranceCompany insuranceCompany;

    @ManyToOne
    private Patient patient;
}