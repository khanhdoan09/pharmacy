package com.project.pharmacy.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "comment")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name="user_id")
    private int userId;
    @Column(name="medicine_id")
    private int medicineId;
    private String content;
    private int replyId;
    private String createDate;
    private int likeNumber;


    public Comment(int id, int userId, int medicineId, String content, int replyId, String createDate, int likeNumber) {
        this.id = id;
        this.userId = userId;
        this.medicineId = medicineId;
        this.content = content;
        this.replyId = replyId;
        this.createDate = createDate;
        this.likeNumber = likeNumber;
    }

    @ManyToOne
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
//    @JsonManagedReference
    @JsonBackReference
    private User user;

    @OneToMany(mappedBy = "comment",cascade =  CascadeType.ALL)
    @JsonManagedReference
    private List<Likes> likes;

    @ManyToOne
    @JoinColumn(name = "medicine_id", insertable = false, updatable = false)
    @JsonBackReference
    private Medicine medicine;

}
