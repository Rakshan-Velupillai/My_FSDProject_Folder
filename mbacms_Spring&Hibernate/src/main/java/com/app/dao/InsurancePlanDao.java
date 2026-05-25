package com.app.dao;

import com.app.model.InsurancePlan;

import java.util.List;

public interface InsurancePlanDao {
    void addPlan(InsurancePlan insurancePlan, int id);

    List<InsurancePlan> viewAllPlans(int id);

    void update(InsurancePlan insurancePlan,int id);

    void delete(int id);

    InsurancePlan getById(int id);
}
