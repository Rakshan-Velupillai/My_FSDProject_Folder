package com.app.dto;

import jakarta.validation.constraints.NotBlank;

public record BookReqDto(

        @NotBlank
        String title,
        @NotBlank
        String summary
) {
}
