package com.service;

import com.exception.ResourceNotFoundException;
import com.model.Healthcare;
import com.model.Patient;
import org.hibernate.Session;
import org.hibernate.Transaction;

public class HealthcareService {
    private final Session session;

    public HealthcareService(Session session) {
        this.session = session;
    }

    public Healthcare viewProfile(int id) {
        return session.createQuery(
                        "from Healthcare h WHERE h.user.id = :userId", Healthcare.class)
                .setParameter("userId", id)
                .getSingleResult();
    }

    public void updateProfile(int id, Healthcare uHealthcare) {

        Transaction tx=session.beginTransaction();
        Healthcare healthcare =viewProfile(id);


        healthcare.setHealthcareName(uHealthcare.getHealthcareName());
        healthcare.setSpecialization(uHealthcare.getSpecialization());
        healthcare.setAddress(uHealthcare.getAddress());

        tx.commit();
    }

    public void deleteProfile(int id) {

        Transaction tx = session.beginTransaction();

        Healthcare healthcare = session.createQuery(
                        "FROM Healthcare h WHERE h.user.id = :userId", Healthcare.class
                )
                .setParameter("userId", id)
                .uniqueResult();
        if (healthcare == null)
            throw new ResourceNotFoundException("Invalid id for deletion!");

        session.remove(healthcare);

        tx.commit();
    }
}
