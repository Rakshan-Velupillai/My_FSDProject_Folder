package com.app.mapper;


import com.app.dto.ApplicationRespDto;
import com.app.model.Application;
import org.springframework.stereotype.Component;

@Component
public class ApplicationMapper {

    public ApplicationRespDto mapEntityToDto(Application application){
        return new ApplicationRespDto(
                application.getId(),
                application.getAppliedAt(),
                application.getJob().getTitle(),
                application.getJob().getEmployer().getCompanyName()
        );
    }
}
