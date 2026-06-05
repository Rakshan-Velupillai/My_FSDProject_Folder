package com.app.controller;


import com.app.dto.ApplicationRespDto;
import com.app.dto.ApplyPagesRespDto;
import com.app.service.ApplicationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    //apply for a job
    @PostMapping("/apply/{jobId}")
    public void applyJob(Principal principal, @PathVariable int jobId){

        applicationService.applyJob(principal.getName(),jobId);
    }

    //view my job applications
    @GetMapping("/my-applications")
    public ApplyPagesRespDto getApplicationBySeeker(Principal principal,
                                                    @RequestParam(defaultValue = "0",required = false) int page,
                                                    @RequestParam(defaultValue = "5",required = false) int size){

        return applicationService.getApplicationBySeeker(principal.getName(),page,size);

    }

}
