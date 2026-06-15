package com.mbacms.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record InsuranceCompanyReqDto(
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
        //insurance company
        @NotNull @NotBlank String companyName,
        @NotNull @NotBlank String regNo,
        @NotNull @NotBlank String address
) {
}
