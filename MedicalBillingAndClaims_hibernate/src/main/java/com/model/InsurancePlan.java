package com.model;

import com.enums.ActiveStatus;
import com.enums.PlanType;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "insurance_plan")
public class InsurancePlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;


    @Column(name = "plan_name",nullable = false)
    private String planName;

    @Enumerated(EnumType.STRING)
    @Column(name="plan_type",nullable = false)
    private PlanType planType;

    @Column(name="plan_description",nullable = false)
    private String planDesc;

    @Column(name = "coverage_amount",nullable = false,precision = 12,scale = 2)
    private BigDecimal coverageAmount;

    @Column(name = "premium_amount",nullable = false,precision = 10,scale = 2)
    private BigDecimal premiumAmount;

    @Column(name = "duration_months",nullable = false)
    private int durationMonths;


    @Enumerated(EnumType.STRING)
    @Column(name = "active_status",nullable = false)
    private ActiveStatus activeStatus;


    @ManyToOne
    @JoinColumn(name = "insurance_company_id", nullable = false)
    private InsuranceCompany insuranceCompany;


    public InsurancePlan() {
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPlanName() {
        return planName;
    }

    public void setPlanName(String planName) {
        this.planName = planName;
    }

    public PlanType getPlanType() {
        return planType;
    }

    public void setPlanType(PlanType planType) {
        this.planType = planType;
    }

    public String getPlanDesc() {
        return planDesc;
    }

    public void setPlanDesc(String planDesc) {
        this.planDesc = planDesc;
    }

    public BigDecimal getCoverageAmount() {
        return coverageAmount;
    }

    public void setCoverageAmount(BigDecimal coverageAmount) {
        this.coverageAmount = coverageAmount;
    }

    public BigDecimal getPremiumAmount() {
        return premiumAmount;
    }

    public void setPremiumAmount(BigDecimal premiumAmount) {
        this.premiumAmount = premiumAmount;
    }

    public int getDurationMonths() {
        return durationMonths;
    }

    public void setDurationMonths(int durationMonths) {
        this.durationMonths = durationMonths;
    }

    public ActiveStatus getActiveStatus() {
        return activeStatus;
    }

    public void setActiveStatus(ActiveStatus activeStatus) {
        this.activeStatus = activeStatus;
    }

    public InsuranceCompany getInsuranceCompany() {
        return insuranceCompany;
    }

    public void setInsuranceCompany(InsuranceCompany insuranceCompany) {
        this.insuranceCompany = insuranceCompany;
    }


    @Override
    public String toString() {
        return "InsurancePlan{" +
                "id=" + id +
                ", planName='" + planName + '\'' +
                ", planType=" + planType +
                ", planDesc='" + planDesc + '\'' +
                ", coverageAmount=" + coverageAmount +
                ", premiumAmount=" + premiumAmount +
                ", durationMonths=" + durationMonths +
                ", activeStatus=" + activeStatus +
                ", insuranceCompany=" + insuranceCompany +
                '}';
    }
}
