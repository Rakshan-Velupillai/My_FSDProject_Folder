package com.app.config;

import com.app.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    private final UserService userService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http

                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorize -> authorize
                                .requestMatchers(HttpMethod.POST,"/api/auth/empRegister").permitAll()
                                .requestMatchers(HttpMethod.POST,"/api/auth/seeRegister").permitAll()
                                .requestMatchers(HttpMethod.GET,"/api/auth/login").authenticated()
                                .requestMatchers(HttpMethod.POST,"/api/jobs/postJob").hasAuthority("EMPLOYER")
                                .requestMatchers(HttpMethod.GET,"/api/jobs/getAllJobs").authenticated()
                                .requestMatchers(HttpMethod.POST,"/api/applications/apply/{jobId}").hasAuthority("SEEKER")
                                .requestMatchers(HttpMethod.GET,"/api/applications/my-applications").hasAuthority("SEEKER")

                        .requestMatchers(HttpMethod.GET,"/api/book/addBook/{authorId}").permitAll()


                                .anyRequest().authenticated()
                );
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        http.httpBasic(Customizer.withDefaults());
        return http.build();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider dao=new DaoAuthenticationProvider(userService);
        dao.setPasswordEncoder(passwordEncoder());
        return dao;

    }
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
