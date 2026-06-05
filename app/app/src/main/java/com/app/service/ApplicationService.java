package com.app.service;


import com.app.dto.ApplicationRespDto;
import com.app.dto.ApplyPagesRespDto;
import com.app.mapper.ApplicationMapper;
import com.app.model.Application;
import com.app.model.Job;
import com.app.model.Seeker;
import com.app.repository.ApplicationRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@AllArgsConstructor
public class ApplicationService {

    private final SeekerService seekerService;
    private final JobService jobservice;
    private final ApplicationRepository applicationRepository;
    private final ApplicationMapper applicationMapper;

    public void applyJob(String name, int id) {
        Seeker seeker=seekerService.getByUserName(name);
        Job job=jobservice.findById(id);

        Application application=new Application();
        application.setJob(job);
        application.setSeeker(seeker);

        applicationRepository.save(application);
    }

    public ApplyPagesRespDto getApplicationBySeeker(String name,int page,int size) {
        Seeker seeker=seekerService.getByUserName(name);

        Pageable pageable= PageRequest.of(page,size);

        Page<Application> list=applicationRepository.findBySeeker(seeker,pageable);



        List<ApplicationRespDto> applicationRespDto=list.stream()
                .map(applicationMapper::mapEntityToDto)
                .toList();

        return new ApplyPagesRespDto(
                list.getTotalPages(),
                list.getNumberOfElements(),
                list.getTotalElements(),
                applicationRespDto
        );
    }
}
