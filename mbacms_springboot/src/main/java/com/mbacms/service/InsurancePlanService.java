package com.mbacms.service;

import com.mbacms.model.InsurancePlan;
import com.mbacms.repository.InsurancePlanRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class InsurancePlanService {

    private final InsurancePlanRepository insurancePlanRepository;


    public List<InsurancePlan> getAllPlans() {

        return insurancePlanRepository.findAll();
    }
}
