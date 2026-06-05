package com.app.controller;

import com.app.dto.EmpReqDto;
import com.app.dto.SeekerReqDto;
import com.app.dto.TokenDto;
import com.app.service.AuthService;
import com.app.util.JwtUtility;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;


@RestController
@AllArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final JwtUtility jwtUtility;
    private final AuthService authService;


    //Employer signup
    @PostMapping("/empRegister")
    public void addUser(@Valid @RequestBody EmpReqDto dto){
        authService.addEmpUser(dto);
    }

    //Job Seeker signup
    @PostMapping("/seeRegister")
    public void addUser(@Valid @RequestBody SeekerReqDto dto){
        authService.addSeekerUser(dto);
    }

    //login
    @GetMapping("/login")
    public TokenDto login(Principal principal){
        String username = principal.getName();
        String token = jwtUtility.generateToken(username);
        return new TokenDto(username,token);
    }
}
