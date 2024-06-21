package be.ucll.stagebegeleidingteam10.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "forms")
public class Form {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreationTimestamp
    private LocalDateTime creationDate;

    @UpdateTimestamp
    private LocalDateTime updateDate;

    @NotNull
    private CurrentPhase currentPhase;

    @OneToMany(mappedBy = "form")
    @JsonIgnore
    private List<Answer> answers = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "internship_id")
    @JsonIgnore
    private Internship internship;

    @ManyToOne
    @JoinColumn(name = "template_id")
    private FormTemplate template;

    public void addAnswer(Answer answer) {
        this.answers.add(answer);
        answer.setForm(this);
    }

}
