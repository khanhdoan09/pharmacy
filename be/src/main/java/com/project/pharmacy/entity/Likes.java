package com.project.pharmacy.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "likes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Likes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int commentId;
    private String createDate;
    private int userId;


}
