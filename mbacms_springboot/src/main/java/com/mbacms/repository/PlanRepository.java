package com.mbacms.repository;

import com.mbacms.model.InsurancePlan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlanRepository extends JpaRepository<InsurancePlan,Integer> {

}
