package com.app.dto;

public record JobsRespDto(

        int id,
        String title,
        String location,
        double salary,
        String companyName

) {
}
