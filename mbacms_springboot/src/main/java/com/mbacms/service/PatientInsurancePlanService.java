package com.mbacms.service;

import com.mbacms.exception.ResourceNotFoundException;
import com.mbacms.model.PatientInsurancePlan;
import com.mbacms.repository.PatientInsurancePlanRepository;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class PatientInsurancePlanService {
        private final PatientInsurancePlanRepository planRepository;
    public void save(PatientInsurancePlan patientInsurance) {
        planRepository.save(patientInsurance);
    }

    public boolean existsByPolicyNumber(@NotNull String s) {
        return planRepository.existsByPolicyNumber(s);
    }

    public boolean existsByPatientIdAndInsurancePlanId(int pId, int inId) {
        return planRepository.existsByPatientIdAndInsurancePlanId(pId,inId);
    }

    public PatientInsurancePlan getById(int id) {
        return planRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("No policy found"));

    }
}
