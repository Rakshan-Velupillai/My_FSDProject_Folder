package com.app.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record JobReqDto(
        @NotBlank
        String title,
        @NotBlank
        String description,
        @NotBlank
        String location,
        @NotNull
        Double salary
) {
}
