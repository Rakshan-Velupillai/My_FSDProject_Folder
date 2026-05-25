package com.controller;

import com.config.HibernateConfig;
import com.enums.ActiveStatus;
import com.enums.PlanType;
import com.exception.ResourceNotFoundException;
import com.model.*;
import com.service.*;
import jakarta.persistence.NoResultException;
import org.hibernate.Session;


import java.util.List;
import java.util.Scanner;

public class MainController {

    public static void main(String[] args) {
        Scanner s=new Scanner(System.in);

        Session session=HibernateConfig.getSessionFactory().openSession();
        System.out.println("Connected Successfully");
        AuthService authService = new AuthService(session);
        PatientService patientService=new PatientService(session);
        HealthcareService healthcareService = new HealthcareService(session);
        InsuranceCompanyService companyService = new InsuranceCompanyService(session);
        InsurancePlanService planService = new InsurancePlanService(session);
        System.out.println("------------Insurance Plan : LOGIN--------------");

        System.out.println("Enter Username ");
        String username = s.next();
        System.out.println("Enter Password ");
        String password = s.next();


        try{
            User user = authService.login(username,password);
            switch (user.getRole().name()){

                case "PATIENT":
                    System.out.println("Patient Menu : WELCOME "+user.getFullName());

                    while(true){
                        System.out.println("1. View Patient Profile");
                        System.out.println("2. Update Profile");
                        System.out.println("3. View Insurance Plans");
                        System.out.println("4. Select Insurance Plan");
                        System.out.println("0. Exit");
                        int ch=s.nextInt();
                        if (ch == 0)
                            break;


                        switch (ch){
                            case 1:
                                try {
                    Patient patient = patientService.viewProfile(user.getId());
                                    System.out.println(patient);
                                }
                                catch (NoResultException e) {
                                    System.out.println("Patient profile not found!");
                                }

                                break;

                            case 2:

                                    Patient uPatient = new Patient();
                                    s.nextLine();

                                    System.out.println("Enter new Address:");
                                    uPatient.setAddress(s.nextLine());

                                    System.out.println("Enter new Symptoms:");
                                    uPatient.setSymptomsDesc(s.nextLine());

                                    System.out.println("Enter new Treatment:");
                                    uPatient.setTreatmentDesc(s.nextLine());

                                    patientService.updateProfile(user.getId(), uPatient);
                                    System.out.println("Profile updated successfully");

                                break;

                            case 3:
                                List<InsurancePlan> planList = patientService.viewAllPlans();
                                planList.forEach(System.out::println);
                                break;

                            case 4:
                                s.nextLine();
                                System.out.println("Enter Plan ID to select:");
                                int planId = s.nextInt();
                                patientService.selectInsurancePlan(user.getId(), planId);
                                System.out.println("Insurance plan selected successfully....");
                                break;

                        }
                    }

                    break;

                case "HEALTHCARE":
                    System.out.println("Healthcare Menu : WELCOME "+user.getFullName());
                    while(true){
                    System.out.println("1. View Healthcare Profile");
                    System.out.println("3. Update Profile");
                    System.out.println("3. Delete Profile");
                    System.out.println("0. Exit");

                        int ch=s.nextInt();
                        if (ch == 0)
                            break;


                        switch (ch){
                            case 1:
                                try {
                    Healthcare healthcare =healthcareService.viewProfile(user.getId());
                                System.out.println(healthcare);
                                }
                                catch (NoResultException e) {
                                    System.out.println("Healthcare profile not found!");
                                }


                                break;

                            case 2:
                                    Healthcare uHealthcare = new Healthcare();
                                    s.nextLine();

                                    System.out.println("Healthcare Name:");
                                    uHealthcare.setHealthcareName(s.nextLine());

                                    System.out.println("Specialization:");
                                    uHealthcare.setSpecialization(s.nextLine());

                                    System.out.println("Address:");
                                    uHealthcare.setAddress(s.nextLine());

                                    healthcareService.updateProfile(user.getId(), uHealthcare);
                                    System.out.println("Healthcare profile updated successfully");

                                break;

                            case 3:

                                try {
                                    healthcareService.deleteProfile(user.getId());
                                    System.out.println("Healthcare profile deleted successfully....");
                                    return;
                                } catch (ResourceNotFoundException e) {
                                    System.out.println(e.getMessage());
                                }
                                break;
                        }
                    }
                    break;

                case "INSURANCE_COMPANY":
                    System.out.println("Insurance Company Menu : WELCOME "+user.getFullName());
                    while(true){
                    System.out.println("1. View Company Profile");
                    System.out.println("2. Add Insurance Plan");
                    System.out.println("3. View Insurance Plans");
                    System.out.println("4. Update Insurance Plan");
                    System.out.println("5. Delete Insurance Plan");
                    System.out.println("0. Exit");


                        int ch=s.nextInt();
                        if (ch == 0)
                            break;


                    InsuranceCompany insuranceCompany=companyService.viewProfile(user.getId());
                        switch (ch){
                            case 1:
                                try {
                                    System.out.println(insuranceCompany);
                                }
                                catch (NoResultException e){
                                    System.out.println("Company profile not found!");
                                }
                                break;

                            case 2:
                                InsurancePlan insurancePlan=new InsurancePlan();
                                s.nextLine();
                                System.out.println("Plan Name: ");
                                insurancePlan.setPlanName(s.nextLine());
                                System.out.println("Plan Type (INDIVIDUAL/FAMILY/SENIOR_CITIZEN/CORPORATE): ");
                                insurancePlan.setPlanType(PlanType.valueOf(s.nextLine().toUpperCase()));
                                System.out.println("Plan Description: ");
                                insurancePlan.setPlanDesc(s.nextLine());
                                System.out.println("Coverage Amount: ");
                                insurancePlan.setCoverageAmount(s.nextBigDecimal());
                                System.out.println("Premium Amount: ");
                                insurancePlan.setPremiumAmount(s.nextBigDecimal());
                                System.out.println("Duration Months: ");
                                insurancePlan.setDurationMonths(s.nextInt());
                                System.out.println("Active Status (ACTIVE/INACTIVE): ");
                                insurancePlan.setActiveStatus(ActiveStatus.valueOf(s.next().toUpperCase()));

                                planService.addPlan(insurancePlan,insuranceCompany.getId());
                                System.out.println("Plan Added successfully......");
                                break;

                            case 3:
                                System.out.println("----------Insurance Plans created by : "+user.getFullName()+" ----------");
                                List<InsurancePlan> planList=planService.viewAllPlans(insuranceCompany.getId());
                                planList.forEach(System.out::println);
                                break;

                            case 4:
                                try {
                                    System.out.println("Enter Plan ID to update: ");
                                    int id = s.nextInt();
                                    s.nextLine();
                                    insurancePlan = new InsurancePlan();
                                    System.out.println("Plan Name:");
                                    insurancePlan.setPlanName(s.nextLine());
                                    System.out.println("New Plan Description:");
                                    insurancePlan.setPlanDesc(s.nextLine());
                                    System.out.println("New Coverage Amount:");
                                    insurancePlan.setCoverageAmount(s.nextBigDecimal());
                                    System.out.println("New Premium Amount:");
                                    insurancePlan.setPremiumAmount(s.nextBigDecimal());

                                    planService.update(insurancePlan, id);
                                    System.out.println("Plan Updated successfully.....");
                                }
                                catch (ResourceNotFoundException e){
                                    System.out.println(e.getMessage());
                                }
                                break;

                            case 5:
                                try {
                                    System.out.println("Enter Plan ID to delete:");
                                    int id = s.nextInt();
                                    planService.deleteById(id, insuranceCompany.getId());
                                    System.out.println("Plan Deleted successfully.....");
                                }
                                catch (ResourceNotFoundException e){
                                    System.out.println(e.getMessage());
                                }
                                break;


                        }
                    }
                    break;



            }
        }
        catch (NoResultException e){
            System.out.println("Invalid Credentials!");
        }
        s.close();
        session.close();
    }


}
