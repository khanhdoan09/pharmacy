package com.project.pharmacy.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
    @Column(name = "comment_id")
    private int commentId;
    private String createDate;
    @Column(name = "user_id")
    private int userId;

    public Likes(int id, int commentId, String createDate, int userId) {
        this.id = id;
        this.commentId = commentId;
        this.createDate = createDate;
        this.userId = userId;
    }

    @ManyToOne
    @JoinColumn(name = "comment_id", insertable = false, updatable = false)
    @JsonBackReference
    private Comment comment;

    @ManyToOne
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    @JsonBackReference
    private User user;


}
