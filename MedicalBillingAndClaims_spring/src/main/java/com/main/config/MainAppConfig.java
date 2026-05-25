package com.main.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;

@Configuration
@ComponentScan("com.main")
public class MainAppConfig {

        @Bean
        public DataSource getConnection(){
            DriverManagerDataSource dataSource=new DriverManagerDataSource();
            dataSource.setUrl("jdbc:mysql://localhost:3306/myMedicalInsurance_db");
            dataSource.setUsername("root");
            dataSource.setPassword("Fangs@123");
            dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");


        return dataSource;
        }

        @Bean
        public JdbcTemplate jdbcTemplate(DataSource dataSource){
                return  new JdbcTemplate(dataSource);
        }
}
