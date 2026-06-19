package com.mbacms.service;

import com.mbacms.DTO.InsuranceCompanyReqDto;
import com.mbacms.DTO.UserReqDto;
import com.mbacms.DTO.UserRespDto;
import com.mbacms.enums.Role;
import com.mbacms.mapper.InsuranceCompanyMapper;
import com.mbacms.model.InsuranceCompany;
import com.mbacms.model.User;
import com.mbacms.repository.InsuranceCompanyRepository;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class InsuranceCompanyService {


    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private final AuthService authService;
    private final InsuranceCompanyMapper companyMapper;
    private final InsuranceCompanyRepository companyRepository;

    public void completeProfile(@Valid InsuranceCompanyReqDto dto) {

        User user=new User();
        user.setFullName(dto.fullName());
        user.setUsername(dto.username());
        user.setEmail(dto.email());
        user.setPassword(passwordEncoder.encode(dto.password()));
        user.setPhoneNumber(dto.phoneNumber());
        user.setRole(Role.INSURANCE_COMPANY);

        UserRespDto userRespDTO=userService.entityToDto(user);
//        UserReqDto userReqDTO=companyMapper.insuranceDtoToUserDto(userRespDTO);

        user=authService.registerActorUser(userRespDTO);

        InsuranceCompany insuranceCompany=new InsuranceCompany();

        insuranceCompany.setCompanyName(dto.companyName());
        insuranceCompany.setRegNo(dto.regNo());
        insuranceCompany.setAddress(dto.address());
        insuranceCompany.setUser(user);

        companyRepository.save(insuranceCompany);
    }
}


