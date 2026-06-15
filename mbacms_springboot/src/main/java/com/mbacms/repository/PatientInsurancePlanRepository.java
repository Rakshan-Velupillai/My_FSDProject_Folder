package com.mbacms.repository;

import com.mbacms.model.PatientInsurancePlan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientInsurancePlanRepository extends JpaRepository<PatientInsurancePlan,Integer> {

    boolean existsByPatientIdAndInsurancePlanId(int patientId, int insurancePlanId);

    boolean existsByPolicyNumber(String policyNumber);
}
