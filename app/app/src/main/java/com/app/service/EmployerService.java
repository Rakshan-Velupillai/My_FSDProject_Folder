package com.app.service;


import com.app.model.Employer;
import com.app.repository.EmployerRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EmployerService {


    private final EmployerRepository employerRepository;


    public Employer getEmployerByUsername(String name) {
        return employerRepository.getEmployerByUsername(name);
    }

    public void save(Employer employer) {
        employerRepository.save(employer);
    }
}
