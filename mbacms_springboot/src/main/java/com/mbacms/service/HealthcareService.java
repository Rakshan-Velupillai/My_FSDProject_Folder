package com.mbacms.service;

import com.mbacms.DTO.HealthcareReqDto;
import com.mbacms.DTO.HealthcareRespDto;
import com.mbacms.DTO.UserReqDto;
import com.mbacms.DTO.UserRespDto;
import com.mbacms.enums.Role;
import com.mbacms.exception.ResourceNotFoundException;
import com.mbacms.mapper.HealthcareMapper;
import com.mbacms.model.Healthcare;
import com.mbacms.model.User;
import com.mbacms.repository.HealthcareRepository;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class HealthcareService {
    private final HealthcareRepository healthcareRepository;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final HealthcareMapper healthcareMapper;

    public void healthcareProfile(@Valid HealthcareReqDto dto) {
        User user=new User();
        user.setFullName(dto.fullName());
        user.setUsername(dto.username());
        user.setEmail(dto.email());
        user.setPassword(passwordEncoder.encode(dto.password()));
        user.setPhoneNumber(dto.phoneNumber());
        user.setRole(Role.HEALTHCARE);

        UserRespDto userRespDTO=userService.entityToDto(user);
        UserReqDto userReqDTO=healthcareMapper.healthcareDtoToUserDto(userRespDTO);

        userService.registerUser(userReqDTO);

        Healthcare healthcare=new Healthcare();

        healthcare.setHealthcareName(dto.healthcareName());
        healthcare.setSpecialization(dto.specialization());
        healthcare.setLicenseNumber(dto.licenseNumber());
        healthcare.setAddress(dto.address());

        healthcare.setUser(user);

        healthcareRepository.save(healthcare);


    }


    public HealthcareRespDto getHealthcare(String name) {

        Healthcare healthcare=healthcareRepository.findByUserUsername(name).orElseThrow(() ->
                new RuntimeException("Healthcare profile not found"));

        return healthcareMapper.entityToDto(healthcare);
    }

    public Healthcare getHealthcareByName(String name) {
        Healthcare healthcare = healthcareRepository.findByUserUsername(name).orElseThrow(
                ()->new ResourceNotFoundException("Healthcare profile not found")
        );
        return healthcare;
    }
}
