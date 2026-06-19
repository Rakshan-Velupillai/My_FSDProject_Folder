package com.mbacms.DTO;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record SelectPlanReqDto(

        @NotNull
        int insurancePlanId,
        @NotNull
        String policyNumber,
        @NotNull
        LocalDate startDate,
        @NotNull
        LocalDate endDate,
        @NotNull
        @Min(1)
        int priorityOrder
) {
}
