package com.mbacms.service;

import com.mbacms.DTO.*;
import com.mbacms.enums.ActiveStatus;
import com.mbacms.exception.ResourceNotFoundException;
import com.mbacms.mapper.InsurancePlanMapper;
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
import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
public class PatientService {
    private final UserService userService;
    private final PatientRepository patientRepository;
    private final PatientMapper patientMapper;
    private final UserRepository userRepository;
    private final PlanRepository planRepository;
    private final PatientInsurancePlanService patientInsurancePlanService;
    private final InsurancePlanService insurancePlanService;
    private final InsurancePlanMapper insurancePlanMapper;


    private static final Set<String> mockInsurance = Set.of(
            "POL-10001", "POL-10002", "POL-10003", "POL-10004", "POL-10005",
            "POL-10006", "POL-10007", "POL-10008", "POL-10009", "POL-10010",
            "POL-10011", "POL-10012", "POL-10013", "POL-10014", "POL-10015",
            "POL-10016", "POL-10017", "POL-10018", "POL-10019", "POL-10020"
    );

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

        List<PatientInsurancePlan> plans =
                patientInsurancePlanService.findByPatient(patient);

        return patientMapper.entityToDto(patient,user,plans.size());
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


        patientRepository.save(patient);
        userRepository.save(user);

        List<PatientInsurancePlan> plans = patientInsurancePlanService.findByPatient(patient);
        return patientMapper.entityToDto(patient, user, plans.size());

    }

    public Patient getPatientById(@NotNull int id) {

        return patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found"));
    }

    public void selectPlan(SelectPlanReqDto dto, String name) {
        User user = userRepository.findByUsername(name)
                .orElseThrow(()->new ResourceNotFoundException("User not found"));

        Patient patient=patientRepository.findByUser(user)
                .orElseThrow(()->new ResourceNotFoundException("Patient not found"));

        InsurancePlan insurancePlan=planRepository.findById(dto.insurancePlanId())
                        .orElseThrow(()->new ResourceNotFoundException("Insurance Plan not found"));

        boolean alreadySelected=patientInsurancePlanService
                        .existsByPatientAndInsurancePlan(patient.getId(), insurancePlan.getId());

        if(alreadySelected) {
            throw new ResourceNotFoundException(
                    "Patient has already selected this insurance plan");
        }
        //mock insurer db check
        if (!mockInsurance.contains(dto.policyNumber())) {
            throw new ResourceNotFoundException("Insurance verification failed: Policy number does not exist in the Insurer's Database.");
        }


        PatientInsurancePlan patientInsurance = new PatientInsurancePlan();
        patientInsurance.setPatient(patient);
        patientInsurance.setInsurancePlan(insurancePlan);
        patientInsurance.setPolicyNumber(dto.policyNumber());
        patientInsurance.setStartDate(dto.startDate());
        patientInsurance.setEndDate(dto.endDate());
        patientInsurance.setPriorityOrder(dto.priorityOrder());
        patientInsurance.setActiveStatus(ActiveStatus.ACTIVE);
        patientInsurancePlanService.save(patientInsurance);


    }

    public Patient getPatientByUsername(String name) {
        return patientRepository.findByUserUsername(name)
                .orElseThrow(()->new ResourceNotFoundException("Patient not found"));
    }

    public List<InsurancePlanDto> getAllInsurancePlans() {
        List<InsurancePlan> planList=insurancePlanService.getAllPlans();
        return planList.stream().map(insurancePlanMapper::entityToDto).toList();
    }



    public List<PatientRespDto> getAllPatients() {
        List<Patient> patients = patientRepository.findAll();
        return patients.stream().map(patient -> {
            User user = patient.getUser();
            List<PatientInsurancePlan> plans = patientInsurancePlanService.findByPatient(patient);
            return patientMapper.entityToDto(patient, user, plans.size());
        }).toList();
    }
}
