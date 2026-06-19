package com.mbacms.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UserReqDto(
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
        String phoneNumber
) {
}
