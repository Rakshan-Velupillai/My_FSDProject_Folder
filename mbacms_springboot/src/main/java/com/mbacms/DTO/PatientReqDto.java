package com.mbacms.DTO;

import com.mbacms.enums.Gender;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record PatientReqDto(
        @NotNull
        LocalDate dob,
        @NotNull
        Gender gender,
        @NotNull
        String address,
        @NotNull
        String symptomsDesc,
        @NotNull
        String treatmentDesc

) {
}
