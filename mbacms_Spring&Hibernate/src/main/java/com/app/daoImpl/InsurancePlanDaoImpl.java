package com.app.daoImpl;

import com.app.dao.InsuranceCompanyDao;
import com.app.dao.InsurancePlanDao;
import com.app.exception.ResourceNotFoundException;
import com.app.model.InsuranceCompany;
import com.app.model.InsurancePlan;
import jakarta.persistence.Access;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Transactional
public class InsurancePlanDaoImpl implements InsurancePlanDao {

    @PersistenceContext
    private EntityManager em;

//   private InsuranceCompanyDao companyDao;
//
//   @Autowired
//public void setCompanyDao(InsuranceCompanyDao companyDao){
//    this.companyDao=companyDao;
//   }

    @Override
    public void addPlan(InsurancePlan insurancePlan, int id) {

        InsuranceCompany insuranceCompany = em.find(InsuranceCompany.class, id);
        insurancePlan.setInsuranceCompany(insuranceCompany);
        em.persist(insurancePlan);
    }

    @Override
    public List<InsurancePlan> viewAllPlans(int id) {
        return em.createQuery(
                "from InsurancePlan p where p.insuranceCompany.user.id = :id",
                InsurancePlan.class
        )
                .setParameter("id", id)
                .getResultList();
    }



    @Override
    public void update(InsurancePlan insurancePlan,int id) {

        InsurancePlan exPlan=getById(id);

        if (exPlan==null)
            throw new ResourceNotFoundException("Invalid id!");

        exPlan.setPlanName(insurancePlan.getPlanName());
        exPlan.setPlanType(insurancePlan.getPlanType());
        exPlan.setPlanDesc(insurancePlan.getPlanDesc());
        exPlan.setCoverageAmount(insurancePlan.getCoverageAmount());
        exPlan.setPremiumAmount(insurancePlan.getPremiumAmount());
        exPlan.setDurationMonths(insurancePlan.getDurationMonths());
        exPlan.setActiveStatus(insurancePlan.getActiveStatus());
    }

    @Override
    public void delete(int id) {
        InsurancePlan insurancePlan = getById(id);
        if (insurancePlan == null)
            throw new ResourceNotFoundException("Invalid id!");

        em.remove(insurancePlan);
    }

    @Override
    public InsurancePlan getById(int id) {
        InsurancePlan insurancePlan = em.find(InsurancePlan.class, id);

        if (insurancePlan == null)
            throw new ResourceNotFoundException("Invalid Plan ID!");
        return insurancePlan;
    }


}
