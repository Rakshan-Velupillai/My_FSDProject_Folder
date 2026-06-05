package com.app.service;

import com.app.dto.JobPagesRespDto;
import com.app.dto.JobReqDto;
import com.app.dto.JobsRespDto;
import com.app.exception.ResourceNotFoundException;
import com.app.mapper.JobMapper;
import com.app.model.Employer;
import com.app.model.Job;
import com.app.repository.JobRepository;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class JobService {

    private final JobRepository jobRepository;
    private final EmployerService employerService;
    private final JobMapper jobMapper;

    public void addJob(String name, @Valid JobReqDto dto) {
        Employer employer=employerService.getEmployerByUsername(name);

        Job job=new Job();
        job.setTitle(dto.title());
        job.setDescription(dto.description());
        job.setLocation(dto.location());
        job.setSalary(dto.salary());
        job.setEmployer(employer);

        jobRepository.save(job);

    }


    public JobPagesRespDto getAllJobs(int page, int size) {
        Pageable pageable= PageRequest.of(page, size);

        Page<Job> list=jobRepository.findAll(pageable);

        List<JobsRespDto> jobsRespDtoList=list.stream()
                .map(jobMapper::mapEntityToDto)
                .toList();

        return new JobPagesRespDto(
                list.getTotalPages(),
                list.getNumberOfElements(),
                list.getTotalElements(),
                jobsRespDtoList
        );

    }

    public Job findById(int id) {
        return jobRepository.findById(id).orElseThrow(
                ()->new ResourceNotFoundException("Job not Found")
        );
    }
}
