package com.app.dto;

import java.util.List;

public record JobPagesRespDto(
        int pageCount,
        int numberOfRecordsInCurrent,
        long numberOfRecords,
        List<JobsRespDto> jobList
) {
}
