package com.config;

import com.model.*;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class HibernateConfig {
private static SessionFactory sessionFactory;

    public static SessionFactory getSessionFactory() {

        if(sessionFactory==null){
            Configuration configuration=new Configuration();

            configuration.setProperty("hibernate.connection.url","jdbc:mysql://localhost:3306/myMedicalInsurance_db?createDatabaseIfNotExist=true");
            configuration.setProperty("hibernate.connection.username","root");
            configuration.setProperty("hibernate.connection.password","Fangs@123");
            configuration.setProperty("hibernate.connection.driver_class","com.mysql.cj.jdbc.Driver");

            configuration.setProperty("hibernate.dialect","org.hibernate.dialect.MySQLDialect");

            configuration.setProperty("hibernate.hbm2ddl.auto","update");

            configuration.addAnnotatedClass(User.class);
            configuration.addAnnotatedClass(Patient.class);
            configuration.addAnnotatedClass(InsuranceCompany.class);
            configuration.addAnnotatedClass(InsurancePlan.class);
            configuration.addAnnotatedClass(Healthcare.class);

            sessionFactory=configuration.buildSessionFactory();
        }


        return sessionFactory;
    }
}
