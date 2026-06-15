package com.mbacms.controller;

import com.mbacms.DTO.*;
import com.mbacms.service.PatientService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/patient")
@AllArgsConstructor
public class PatientController {

    private final PatientService patientService;


    @PostMapping("/profile")
    public void patientProfile(@Valid @RequestBody PatientReqDto dto, Principal principal) {
        patientService.patientProfile(dto,principal);
    }

    @GetMapping("/getPatient")
    public PatientRespDto getPatient(Principal principal){

        return patientService.getPatient(principal.getName());
    }

    @PatchMapping("/patient-update")
    public PatientRespDto patientUpdate(Principal principal,
                                        @RequestBody PatientUpdateReqDto dto){

        return patientService.patientUpdate(principal.getName(), dto);

    }

//    @PatchMapping("/insurance-plan/select")
//    public PatientProfileRespDTO selectInsurancePlan(Principal principal, @Valid @RequestBody SelectPlanReqDTO dto) {
//        return patientService.selectInsurancePlan(principal.getName(), dto);
//
//    }

    @PostMapping("/insurance-plan/select")
    public void selectPlan(@Valid @RequestBody SelectPlanReqDto dto, Principal principal){
            patientService.selectPlan(dto,principal.getName());
    }
}
