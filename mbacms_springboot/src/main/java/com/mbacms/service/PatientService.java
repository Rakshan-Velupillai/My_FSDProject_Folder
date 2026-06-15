package com.mbacms.service;

import com.mbacms.DTO.*;
import com.mbacms.enums.ActiveStatus;
import com.mbacms.exception.ResourceNotFoundException;
import com.mbacms.mapper.PatientMapper;
import com.mbacms.model.InsurancePlan;
import com.mbacms.model.Patient;
import com.mbacms.model.PatientInsurancePlan;
import com.mbacms.model.User;
import com.mbacms.repository.PatientRepository;
import com.mbacms.repository.PlanRepository;
import com.mbacms.repository.UserRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
@AllArgsConstructor
public class PatientService {
    private final UserService userService;
    private final PatientRepository patientRepository;
    private final PatientMapper patientMapper;
    private final UserRepository userRepository;
    private final PlanRepository planRepository;
    private final PatientInsurancePlanService patientInsurancePlanService;

    public void patientProfile(@Valid PatientReqDto dto, Principal principal) {
        User user=(User)userService.loadUserByUsername(principal.getName());
        Patient patient=new Patient();
        patient.setDob(dto.dob());
        patient.setGender(dto.gender());
        patient.setAddress(dto.address());
        patient.setSymptomsDesc(dto.symptomsDesc());
        patient.setTreatmentDesc(dto.treatmentDesc());

        patient.setUser(user);

        patientRepository.save(patient);

    }


    public PatientRespDto getPatient(String name) {
     User user=(User) userService.loadUserByUsername(name);
     Patient patient=patientRepository.findByUser(user).orElseThrow(() ->
             new RuntimeException("Patient profile not found"));


        return patientMapper.entityToDto(patient,user);
    }

    public PatientRespDto patientUpdate(String name, PatientUpdateReqDto dto) {

        User user=(User) userService.loadUserByUsername(name);

        if(dto.name()!=null) {
            user.setFullName(dto.name());
        }
        if(dto.phoneNumber()!=null){
            user.setPhoneNumber(dto.phoneNumber());
        }
        Patient patient=patientRepository.findByUser(user).orElseThrow(() ->
                new ResourceNotFoundException("Patient profile not found"));
        if (dto.address()!=null){
        patient.setAddress(dto.address());
        }
        if(dto.dob()!=null){
        patient.setDob(dto.dob());
        }
        if(dto.symptomsDesc()!=null){
        patient.setSymptomsDesc(dto.symptomsDesc());
        }
        if(dto.treatmentDesc()!=null){
        patient.setTreatmentDesc(dto.treatmentDesc());
        }


        return patientMapper.entityToDto(patientRepository.save(patient),userRepository.save(user));


    }

    public Patient getPatientById(@NotNull int id) {

        return patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found"));
    }

//    public PatientProfileRespDTO selectInsurancePlan(String name, @Valid SelectPlanReqDTO dto) {
//
//        Patient patient = patientRepository.findByUserUsername(name)
//                .orElseThrow(() -> new ResourceNotFoundException("Patient not found"));
//        InsurancePlan plan = planRepository.findById(dto.insurancePlanId())
//                .orElseThrow(() -> new ResourceNotFoundException("Insurance plan not found"));
//        patient.setInsurancePlan(plan);
//        return patientMapper.entityToPatientDto(patientRepository.save(patient));
//    }

    public void selectPlan(SelectPlanReqDto dto, String name) {
        User user = userRepository.findByUsername(name)
                .orElseThrow(()->new ResourceNotFoundException("User not found"));

        Patient patient = patientRepository.findByUser(user)
                .orElseThrow(()->new ResourceNotFoundException("Patient not found"));

        InsurancePlan insurancePlan = planRepository.findById(dto.insurancePlanId())
                        .orElseThrow(()->new ResourceNotFoundException("Insurance Plan not found"));


        PatientInsurancePlan patientInsurance = new PatientInsurancePlan();
        patientInsurance.setPatient(patient);
        patientInsurance.setInsurancePlan(insurancePlan);
        patientInsurance.setPolicyNumber(dto.policyNumber());
        patientInsurance.setStartDate(dto.startDate());
        patientInsurance.setEndDate(dto.endDate());
        patientInsurance.setActiveStatus(ActiveStatus.ACTIVE);
        patientInsurancePlanService.save(patientInsurance);


    }

    public Patient getPatientByUsername(String name) {
        return patientRepository.findByUserUsername(name)
                .orElseThrow(()->new ResourceNotFoundException("Patient not found"));
    }
}
