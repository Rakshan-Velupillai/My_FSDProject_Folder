package com.service;

import com.enums.ActiveStatus;
import com.exception.ResourceNotFoundException;
import com.model.InsurancePlan;
import com.model.Patient;
import jakarta.persistence.NoResultException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import java.util.List;

public class PatientService {

    private final Session session;

    public PatientService(Session session) {
        this.session = session;
    }


    public Patient viewProfile(int id) {
        return session.createQuery(
                        "from Patient p WHERE p.user.id = :userId", Patient.class)
                .setParameter("userId", id)
                .getSingleResult();


    }

    public void updateProfile(int id, Patient uPatient) {

        Transaction tx=session.beginTransaction();
        Patient patient=viewProfile(id);


        patient.setAddress(uPatient.getAddress());
        patient.setSymptomsDesc(uPatient.getSymptomsDesc());
        patient.setTreatmentDesc(uPatient.getTreatmentDesc());

        tx.commit();
    }

    public void selectInsurancePlan(int id, int planId) {

        Transaction tx = session.beginTransaction();

        Patient patient = viewProfile(id);
        InsurancePlan plan = session.get(InsurancePlan.class, planId);

        if (plan == null)
            throw new ResourceNotFoundException("Invalid plan id!");

        patient.setInsurancePlan(plan);

        tx.commit();
    }

    public List<InsurancePlan> viewAllPlans() {
        return session.createQuery(
                        "from InsurancePlan ip where ip.activeStatus = :status", InsurancePlan.class)
                .setParameter("status", ActiveStatus.ACTIVE)
                .list();
    }
}
