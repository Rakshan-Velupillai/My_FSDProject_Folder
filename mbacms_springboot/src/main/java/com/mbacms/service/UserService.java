package com.mbacms.service;

import com.mbacms.DTO.ChangePasswordReqDto;
import com.mbacms.DTO.UserReqDto;
import com.mbacms.DTO.UserRespDto;
import com.mbacms.enums.Role;
import com.mbacms.exception.ResourceNotFoundException;
import com.mbacms.mapper.UserMapper;
import com.mbacms.model.User;
import com.mbacms.repository.UserRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public void registerUser(UserReqDto dto) {
        if(existsByUsername(dto.username()))
            throw new ResourceNotFoundException("Username already registered in DB!");

        if(existsByEmail(dto.email()))
            throw new ResourceNotFoundException("Email already registered in DB!");


        //1.Extract the password from the dto
        String password= dto.password();

        //2.Encode the password and assign the role
        String encodedPassword=passwordEncoder.encode(password);

        User user=new User();
        user.setFullName(dto.fullName());
        user.setUsername(dto.username());
        user.setEmail(dto.email());
        user.setPassword(encodedPassword);
        user.setPhoneNumber(dto.phoneNumber());
        user.setRole(Role.PATIENT);

        //3.save the user in db
        userRepository.save(user);


    }


    public void adminSignup(@Valid UserReqDto dto) {
        User user = new User();
        user.setFullName(dto.fullName());
        user.setUsername(dto.username());
        user.setEmail(dto.email());
        user.setPassword(passwordEncoder.encode(dto.password()));
        user.setPhoneNumber(dto.phoneNumber());
        user.setRole(Role.ADMIN);
        userRepository.save(user);
    }

    public void changePassword(String name, @Valid ChangePasswordReqDto dto) {

        User user = userRepository.findByUsername(name)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!passwordEncoder.matches(dto.oldPassword(), user.getPassword()))
            throw new ResourceNotFoundException("Old password is incorrect");

        user.setPassword(passwordEncoder.encode(dto.newPassword()));
        userRepository.save(user);
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user=userRepository.findByUsername(username).orElseThrow(
                ()->new ResourceNotFoundException("Invalid Credentials!")
        );

        return user;
    }

    public boolean existsByUsername(@NotNull @NotBlank String username) {
        return userRepository.existsByUsername(username);
    }

    public boolean existsByEmail(@NotNull @NotBlank String email) {
        return userRepository.existsByEmail(email);
    }


    public UserRespDto entityToDto(User user) {
        return userMapper.entityToDto(user);
    }
}
