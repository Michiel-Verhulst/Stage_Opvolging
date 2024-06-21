package be.ucll.stagebegeleidingteam10.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "questions")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long id;

    @NotBlank
    private String question;

    private String description;

    @NotNull
    private QuestionType type;

    @ManyToOne
    @JoinColumn(name = "template_id")
    @JsonIgnore
    private FormTemplate template;

    @OneToMany(mappedBy = "question")
    private List<Answer> answers = new ArrayList<>();

    public void addAnswer(Answer answer) {
        this.answers.add(answer);
        answer.setQuestion(this);
    }
}
