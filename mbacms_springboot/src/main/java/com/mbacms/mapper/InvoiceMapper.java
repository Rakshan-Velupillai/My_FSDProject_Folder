package com.mbacms.mapper;

import com.mbacms.DTO.InvoiceRespDto;
import com.mbacms.model.Invoice;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class InvoiceMapper {
    public InvoiceRespDto entityToDto(Invoice invoice, List<String> services){
        return new InvoiceRespDto(
                invoice.getId(),
                invoice.getInvoiceNumber(),
                invoice.getInvoiceDate(),
                invoice.getDueDate(),
                invoice.getSubtotal(),
                invoice.getTaxRate(),
                invoice.getTaxAmount(),
                invoice.getTotalDueAmount(),
                invoice.getInvoiceStatus(),
                invoice.getInvoicePdfPath(),
                invoice.getPatient().getUser().getFullName(),
                invoice.getHealthcare().getHealthcareName(),
                services
        );
    }
}
