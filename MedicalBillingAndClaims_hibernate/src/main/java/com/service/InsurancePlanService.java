package com.service;

import com.exception.ResourceNotFoundException;
import com.model.InsuranceCompany;
import com.model.InsurancePlan;
import org.hibernate.Session;
import org.hibernate.Transaction;

import java.util.List;

public class InsurancePlanService {

    private final Session session;

    private final InsuranceCompanyService companyService;
    public InsurancePlanService(Session session) {
        this.session = session;
        companyService=new InsuranceCompanyService(session);

    }

    public void addPlan(InsurancePlan insurancePlan, int id) {


        InsuranceCompany insuranceCompany=companyService.getById(id);

        insurancePlan.setInsuranceCompany(insuranceCompany);


        Transaction tx=session.beginTransaction();
        session.persist(insurancePlan);

        tx.commit();
    }

    public List<InsurancePlan> viewAllPlans(int id) {
        Transaction tx = session.beginTransaction();
        List<InsurancePlan> list = session
                .createQuery("from InsurancePlan ip where ip.insuranceCompany.id=:id", InsurancePlan.class)
                .setParameter("id",id)
                .list();
        tx.commit();
        return list;

    }

    public InsurancePlan getById(int id){
        return session.get(InsurancePlan.class,id);
    }

    public void update(InsurancePlan insurancePlan, int id) {

        Transaction tx=session.beginTransaction();
        InsurancePlan exPlan=getById(id);
        if(exPlan==null)
            throw new ResourceNotFoundException("Invalid id for updation!");

        exPlan.setPlanName(insurancePlan.getPlanName());
        exPlan.setPlanDesc(insurancePlan.getPlanDesc());
        exPlan.setCoverageAmount(insurancePlan.getCoverageAmount());
        exPlan.setPremiumAmount(insurancePlan.getPremiumAmount());

        tx.commit();
    }

    public void deleteById(int id, int insuranceCompanyId) {

        Transaction tx=session.beginTransaction();
        InsurancePlan plan= session.createQuery(
                        "from InsurancePlan ip where ip.id = :planId AND ip.insuranceCompany.id = :companyId",
                        InsurancePlan.class
                )
                .setParameter("planId", id)
                .setParameter("companyId", insuranceCompanyId)
                .uniqueResult();
        if(plan==null)
            throw new ResourceNotFoundException("Invalid id for deletion!");

        session.remove(plan);
        tx.commit();
    }
}
