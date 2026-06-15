package com.mbacms.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record HealthcareReqDto(
        //user account
        @NotNull
        @NotBlank
        String fullName,
        @NotNull
        @NotBlank
        String username,
        @NotNull
        @NotBlank
        String email,
        @NotNull
        @NotBlank
        String password,
        @NotNull
        @NotBlank
        String phoneNumber,
        //healthcare profile
        @NotNull
        String healthcareName,
        @NotNull
        String specialization,
        @NotNull
        String licenseNumber,
        @NotNull
        String address
) {
}
