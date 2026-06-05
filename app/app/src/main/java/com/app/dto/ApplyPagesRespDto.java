package com.app.dto;

import java.util.List;

public record ApplyPagesRespDto(
        int pageCount,
        int numberOfRecordsInCurrent,
        long numberOfRecords,
        List<ApplicationRespDto> applicationRespDtoList
) {
}
