package com.mbacms.DTO;

import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record InvoiceReqDto(
        @NotNull int patientId,
        @NotNull LocalDate dueDate,
        @NotNull BigDecimal taxRate,
        @NotNull List<MedicalServiceInvoiceItemDto> services
) {
}
