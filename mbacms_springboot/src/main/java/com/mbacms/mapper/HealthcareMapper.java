package com.mbacms.mapper;


import com.mbacms.DTO.HealthcareRespDto;
import com.mbacms.DTO.UserReqDto;
import com.mbacms.DTO.UserRespDto;
import com.mbacms.model.Healthcare;
import org.springframework.stereotype.Component;

@Component
public class HealthcareMapper {

    public HealthcareRespDto entityToDto(Healthcare healthcare){
        return new HealthcareRespDto(
                healthcare.getId(),
                healthcare.getHealthcareName(),
                healthcare.getSpecialization(),
                healthcare.getLicenseNumber(),
                healthcare.getAddress()
        );
    }

    public UserReqDto healthcareDtoToUserDto(UserRespDto dto){
        return new UserReqDto(
                dto.fullName(),
                dto.username(),
                dto.email(),
                dto.password(),
                dto.phoneNumber()
        );
    }

}
