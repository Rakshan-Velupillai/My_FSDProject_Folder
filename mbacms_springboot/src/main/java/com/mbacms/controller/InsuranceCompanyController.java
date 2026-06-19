package com.mbacms.controller;

import com.mbacms.DTO.InsuranceCompanyReqDto;
import com.mbacms.DTO.InsurancePlanDto;
import com.mbacms.service.InsuranceCompanyService;
import com.mbacms.service.PatientService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/insurance-company")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173/")

public class InsuranceCompanyController {
    private final PatientService patientService;

    private final InsuranceCompanyService companyService;
    @PostMapping("/user-profile")
    public void completeProfile(@Valid @RequestBody InsuranceCompanyReqDto dto) {
        companyService.completeProfile(dto);
    }


}
