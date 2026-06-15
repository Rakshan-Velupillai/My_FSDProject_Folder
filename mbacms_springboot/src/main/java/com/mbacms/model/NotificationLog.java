package com.mbacms.model;


import com.mbacms.enums.NotificationType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NotificationLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String message;
    @Enumerated(EnumType.STRING)
    private NotificationType notificationType;
     private boolean isRead;

     private Instant createdAt;

     @ManyToOne
     private User User;

}
