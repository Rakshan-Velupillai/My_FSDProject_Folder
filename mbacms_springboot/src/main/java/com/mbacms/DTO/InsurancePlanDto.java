package com.mbacms.DTO;

public record InsurancePlanDto(
        int id,
        String planName,
        String planType,
        String planDescription
) {
}
