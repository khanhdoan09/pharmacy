package com.project.pharmacy.entity;


import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "comment")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int userId;
    private int medicineId;
    private String content;
    private int replyId;
    private String createDate;
    private int likeNumber;


    @ManyToOne
    @JoinColumn(name = "userId", insertable = false, updatable = false)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private User user;

    @OneToMany(mappedBy = "commentId",cascade =  CascadeType.ALL)
    private List<Likes> likes;

}
