package com.app.dto;

import java.time.Instant;

public record ApplicationRespDto(
 int id,
 Instant appliedAt,
 String jobTitle,
 String companyName
) {
}
