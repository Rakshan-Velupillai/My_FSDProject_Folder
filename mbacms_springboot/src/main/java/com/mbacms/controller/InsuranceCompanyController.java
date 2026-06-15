package com.mbacms.controller;

import com.mbacms.DTO.InsuranceCompanyReqDto;
import com.mbacms.service.InsuranceCompanyService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/insurance-company")
@AllArgsConstructor
public class InsuranceCompanyController {

    private final InsuranceCompanyService companyService;
    @PostMapping("/user-profile")
    public void completeProfile(@Valid @RequestBody InsuranceCompanyReqDto dto) {
        companyService.completeProfile(dto);
    }
}
