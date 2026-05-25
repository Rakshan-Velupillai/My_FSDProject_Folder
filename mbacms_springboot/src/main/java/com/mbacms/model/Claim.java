package com.mbacms.model;


import com.mbacms.enums.ClaimStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Getter
@Setter
public class Claim{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "claim_amount",nullable = false,precision = 10,scale = 2)
    private BigDecimal claimAmount;

    @Column(nullable = false)
    private String diagnosis;

    @Column(nullable = false)
    private String treatment;

    @CreationTimestamp
    @Column(name = "submission_date",updatable = false,nullable = false)
    private Instant submissionDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ClaimStatus status;




}
