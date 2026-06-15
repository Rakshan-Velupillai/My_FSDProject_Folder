package com.mbacms.mapper;

import com.mbacms.DTO.ClaimRespDto;
import com.mbacms.model.Claim;
import org.springframework.stereotype.Component;

@Component
public class ClaimMapper {

    public ClaimRespDto entityToDto(
            Claim claim){

        return new ClaimRespDto(
                claim.getId(),
                claim.getPatientInsurancePlan().getPatient().getUser().getFullName(),
                claim.getPatientInsurancePlan().getInsurancePlan().getPlanName(),
                claim.getClaimNumber(),
                claim.getInvoice().getInvoiceNumber(),
                claim.getPatientInsurancePlan().getPolicyNumber(),
                claim.getClaimAmount(),
                claim.getDiagnosis(),
                claim.getTreatment(),
                claim.getSubmissionDate(),
                claim.getApprovedDate(),
                claim.getStatus(),
                claim.getRejectionReason(),
                claim.getDocumentUrl()

        );

    }
}
