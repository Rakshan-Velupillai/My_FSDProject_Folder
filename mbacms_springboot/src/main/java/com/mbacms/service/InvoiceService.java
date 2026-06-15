package com.mbacms.service;

import com.mbacms.DTO.InvoiceReqDto;
import com.mbacms.DTO.InvoiceRespDto;
import com.mbacms.DTO.MedicalServiceInvoiceItemDto;
import com.mbacms.enums.InvoiceStatus;
import com.mbacms.exception.OwnershipInvalidException;
import com.mbacms.exception.ResourceNotFoundException;
import com.mbacms.mapper.InvoiceMapper;
import com.mbacms.mapper.MedicalServiceInvoiceMapper;
import com.mbacms.model.*;
import com.mbacms.repository.InvoiceRepository;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class InvoiceService {

    private final HealthcareService healthcareService;
    private final PatientService patientService;
    private final InvoiceRepository invoiceRepository;
    private final MedicalServiceService medicalServiceService;
    private final MedicalServiceInvoiceService medicalServiceInvoiceService;
    private final MedicalServiceInvoiceMapper medicalServiceInvoiceMapper;
    private final InvoiceMapper invoiceMapper;

    public InvoiceRespDto generateInvoice(String name, @Valid InvoiceReqDto dto) {
        Healthcare healthcare=healthcareService.getHealthcareByName(name);

        Patient patient=patientService.getPatientById(dto.patientId());

        BigDecimal subtotal=BigDecimal.ZERO;
        for(MedicalServiceInvoiceItemDto item:dto.services()) {
            subtotal=subtotal.add(item.actualAmount());
        }
        BigDecimal taxAmount=subtotal.multiply(dto.taxRate())
                        .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);

        BigDecimal totalAmount=subtotal.add(taxAmount);

        Invoice invoice = new Invoice();

        invoice.setInvoiceNumber("INV-"+UUID.randomUUID().toString().substring(0,8));

        invoice.setInvoiceDate(LocalDate.now());
        invoice.setDueDate(dto.dueDate());
        invoice.setSubtotal(subtotal);
        invoice.setTaxRate(dto.taxRate());
        invoice.setTaxAmount(taxAmount);
        invoice.setTotalDueAmount(totalAmount);
        invoice.setInvoiceStatus(InvoiceStatus.UNPAID);
        invoice.setPatient(patient);
        invoice.setHealthcare(healthcare);

        invoiceRepository.save(invoice);

        List<MedicalServiceInvoice> invoiceItems = new ArrayList<>();

        for(MedicalServiceInvoiceItemDto item:dto.services()) {
            MedicalService service = medicalServiceService.getMedicalServiceById(item.medicalServiceId());

            MedicalServiceInvoice msi=new MedicalServiceInvoice();

            msi.setInvoice(invoice);
            msi.setMedicalService(service);
            msi.setActualAmount(item.actualAmount());

            invoiceItems.add(msi);
        }
        medicalServiceInvoiceService.saveAll(invoiceItems);

        List<String> services = invoiceItems
                .stream()
                .map(a->a.getMedicalService().getServiceName())
                .toList();

        return invoiceMapper.entityToDto(invoice,services);
    }

    public InvoiceRespDto getInvoiceById(int invoiceId, String name) {

        Invoice invoice = invoiceRepository.findById(invoiceId)
                .orElseThrow(()->new ResourceNotFoundException("Invoice Not Found"));

        Patient patient=patientService.getPatientByUsername(name);

        if(invoice.getPatient().getId()!=patient.getId()){
            throw new OwnershipInvalidException("You cannot view this invoice");
        }

        List<String> services = medicalServiceInvoiceService
                        .getByInvoiceId(invoiceId)
                        .stream()
                        .map(a->a.getMedicalService().getServiceName())
                        .toList();

        return invoiceMapper.entityToDto(invoice,services);

    }


    public List<InvoiceRespDto> getHealthcareInvoiceById(String name, int page, int size) {
        Pageable pageable =  PageRequest.of(page,size);

        List<Invoice> invoices = invoiceRepository.getInvoicesByHealthcare(name,pageable);

        List<InvoiceRespDto> invoiceDtos = new ArrayList<>();

        for (Invoice invoice : invoices) {
            List<MedicalServiceInvoice> medicalServiceInvoices=medicalServiceInvoiceService
                    .getByInvoiceId(invoice.getId());

            List<String> services=medicalServiceInvoices
                            .stream()
                            .map(a->a.getMedicalService().getServiceName())
                            .toList();

            InvoiceRespDto invoiceRespDTO=invoiceMapper.entityToDto(invoice,services);

            invoiceDtos.add(invoiceRespDTO);
        }
        return invoiceDtos;
    }

    public Invoice findByInvoiceId(int id) {
        return invoiceRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Invoice not found"));
    }
}
