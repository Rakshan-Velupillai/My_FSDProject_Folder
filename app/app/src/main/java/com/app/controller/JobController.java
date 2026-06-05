package com.app.controller;

import com.app.dto.JobPagesRespDto;
import com.app.dto.JobReqDto;
import com.app.dto.JobsRespDto;
import com.app.service.JobService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/jobs")
public class JobController {

    private final JobService jobservice;
    //Employer posts a new job
    @PostMapping("/postJob")
    public void addJob(Principal principal, @Valid @RequestBody JobReqDto dto){

        jobservice.addJob(principal.getName(),dto);
    }

    //Get all Jobs
    @GetMapping("/getAllJobs")
    public JobPagesRespDto getAllJobs(@RequestParam(defaultValue = "0",required = false) int page,
                                      @RequestParam(defaultValue = "5",required = false) int size){

        return jobservice.getAllJobs(page,size);

    }
}
