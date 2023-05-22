package com.project.pharmacy.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "verification_code")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class VerificationCode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String code;
    @Column(name = "expiry_date_time")
    private LocalDateTime expiryDateTime;

    @Column(name = "created_date")
    private LocalDateTime createdDate;

    private boolean used;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public boolean isExpired() {
        return LocalDateTime.now().isAfter(expiryDateTime);
    }
}
