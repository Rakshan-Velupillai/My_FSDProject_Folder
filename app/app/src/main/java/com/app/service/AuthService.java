package com.app.service;


import com.app.dto.EmpReqDto;
import com.app.dto.SeekerReqDto;
import com.app.enums.Role;
import com.app.model.Employer;
import com.app.model.Seeker;
import com.app.model.User;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthService {

    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private final EmployerService employerService;
    private final SeekerService seekerService;

    public void addEmpUser(EmpReqDto dto) {

        String username=dto.username();
        String password=dto.password();
        Role role= dto.role();
        String companyName= dto.companyName();

        String encodedPassword=passwordEncoder.encode(password);
        User user=new User();
        user.setUsername(username);
        user.setPassword(encodedPassword);
        user.setRole(role);

        userService.save(user);

        Employer employer=new Employer();
        employer.setCompanyName(companyName);
        employer.setUser(user);

        employerService.save(employer);

    }

    public void addSeekerUser(@Valid SeekerReqDto dto) {

        String username=dto.username();
        String password=dto.password();
        Role role= dto.role();
        String name= dto.name();
        String resumeSummary=dto.resumeSummary();

        String encodedPassword=passwordEncoder.encode(password);
        User user=new User();
        user.setUsername(username);
        user.setPassword(encodedPassword);
        user.setRole(role);

        userService.save(user);

        Seeker seeker=new Seeker();

        seeker.setName(name);
        seeker.setResumeSummary(resumeSummary);
        seeker.setUser(user);

        seekerService.save(seeker);
    }
}
