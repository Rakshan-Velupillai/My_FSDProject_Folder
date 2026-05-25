package com.service;

import com.model.InsuranceCompany;
import com.model.InsurancePlan;
import org.hibernate.Session;
import org.hibernate.Transaction;

public class InsuranceCompanyService {
    private final Session session;

    public InsuranceCompanyService(Session session) {
        this.session = session;
    }

    public InsuranceCompany viewProfile(int id) {

        return session.createQuery(
                        "FROM InsuranceCompany c WHERE c.user.id = :userId", InsuranceCompany.class)
                .setParameter("userId", id)
                .getSingleResult();
    }


    public InsuranceCompany getById(int id) {
        return session.get(InsuranceCompany.class,id);
    }
}
