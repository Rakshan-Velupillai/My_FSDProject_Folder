package com.app.dto;

import com.app.enums.Role;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record EmpReqDto(


        @NotBlank
        @Size(min = 5)
        String username,
        @NotBlank
        String password,
        @NotNull
        Role role,
        @NotBlank
        String companyName
) {
}
