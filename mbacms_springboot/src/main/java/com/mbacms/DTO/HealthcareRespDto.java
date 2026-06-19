package com.mbacms.DTO;

public record HealthcareRespDto(
        int id,
        String healthcareName,
        String specialization,
        String licenseNumber,
        String address
) {
}
