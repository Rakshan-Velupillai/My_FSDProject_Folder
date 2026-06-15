package com.mbacms.controller;


import com.mbacms.DTO.*;
import com.mbacms.model.User;
import com.mbacms.service.*;
import com.mbacms.util.JwtUtility;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {

    private final JwtUtility jwtUtility;
    private final UserService userService;



    @PostMapping("/register")
    public void registerUser(@Valid @RequestBody UserReqDto dto){

        userService.registerUser(dto);
    }

    @PostMapping("/admin/signup")
    public void adminSignup(@Valid @RequestBody UserReqDto dto) {
        userService.adminSignup(dto);
    }



    @GetMapping("/login")
    public TokenDto login(Principal principal){
        String username = principal.getName();
        String token = jwtUtility.generateToken(username);
        return new TokenDto(username,token);
    }

    @GetMapping("/user-details")
    public LoginRespDto getUserDetails(Principal principal){

        String loggedInUsername=principal.getName();
        User user=(User)userService.loadUserByUsername(loggedInUsername);

        return new LoginRespDto(
                user.getId(),
                user.getUsername(),
                user.getRole()
        );

    }



    @PatchMapping("/change-password")
    public void changePassword(Principal principal, @Valid @RequestBody ChangePasswordReqDto dto) {
        userService.changePassword(principal.getName(), dto);
    }


}
