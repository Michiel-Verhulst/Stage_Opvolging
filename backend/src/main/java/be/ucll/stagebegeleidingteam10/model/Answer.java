package be.ucll.stagebegeleidingteam10.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "answers")
public class Answer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long id;

    private String answer;

    @Positive
    @Max(5)
    private Integer rating;

    @ManyToOne
    @JoinColumn(name = "user_email")
    private User user;

    @ManyToOne
    @JoinColumn(name = "form_id")
    @JsonIgnore
    private Form form;

    @ManyToOne
    @JoinColumn(name = "question_id")
    @JsonIgnore
    private Question question;
}
