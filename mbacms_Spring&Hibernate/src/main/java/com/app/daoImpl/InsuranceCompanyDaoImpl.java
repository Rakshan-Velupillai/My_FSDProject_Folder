package com.app.daoImpl;

import com.app.dao.InsuranceCompanyDao;
import com.app.model.InsuranceCompany;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Component;

@Component
@Transactional
public class InsuranceCompanyDaoImpl implements InsuranceCompanyDao {

    @PersistenceContext
    private EntityManager em;

    @Override
    public InsuranceCompany viewProfile(int id) {
        return em.createQuery(
                        "select c from InsuranceCompany c where c.user.id = :id", InsuranceCompany.class
                )
                .setParameter("id", id)
                .getSingleResult();
    }

}
