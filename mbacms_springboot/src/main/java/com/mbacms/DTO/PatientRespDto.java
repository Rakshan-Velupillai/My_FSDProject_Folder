package com.mbacms.DTO;

import java.time.LocalDate;

public record PatientRespDto(

        int id,
        String username,
        String name,
        String address,
        LocalDate dob,
        String phoneNumber,
        String symptomsDesc,
        String treatmentDesc
) {
}
