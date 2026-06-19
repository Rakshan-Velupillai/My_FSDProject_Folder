package com.mbacms.DTO;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record PatientUpdateReqDto(

        @NotNull
        String name,
        @NotNull
        String address,
        @NotNull
        LocalDate dob,
        @NotNull
        String phoneNumber,
        @NotNull
        String symptomsDesc,
        @NotNull
        String treatmentDesc
) {
}
