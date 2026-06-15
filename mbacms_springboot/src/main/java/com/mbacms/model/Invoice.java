package com.mbacms.model;

import com.mbacms.enums.InvoiceStatus;
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
public class Invoice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(unique = true)
    private String invoiceNumber;

    private LocalDate invoiceDate;
    private LocalDate dueDate;

    @Column(precision = 12, scale = 2)
    private BigDecimal subtotal;

    @Column(precision = 5, scale = 2)
    private BigDecimal taxRate;

    @Column(precision = 12, scale = 2)
    private BigDecimal taxAmount;

    // formula: subtotal+taxAmount
    @Column(precision = 12, scale = 2)
    private BigDecimal totalDueAmount;

    @Column(precision = 12, scale = 2)
    private BigDecimal balanceRemaining;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private InvoiceStatus invoiceStatus;

    private String invoicePdfPath;

    @ManyToOne
    private Patient patient;

    @ManyToOne
    private Healthcare healthcare;
}