package com.app.mapper;

import com.app.dto.JobsRespDto;
import com.app.model.Job;
import org.springframework.stereotype.Component;

@Component
public class JobMapper {

    public JobsRespDto mapEntityToDto(Job job){

        return new JobsRespDto(
                job.getId(),
                job.getTitle(),
                job.getLocation(),
                job.getSalary(),
                job.getEmployer().getCompanyName()
        );
    }
}
