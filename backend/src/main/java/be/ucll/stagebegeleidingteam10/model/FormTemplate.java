package be.ucll.stagebegeleidingteam10.model;

import com.fasterxml.jackson.annotation.*;
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
@Table(name = "form_templates")
public class FormTemplate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long id;

    @NotBlank
    private String title;

    @NotNull
    private FormTemplateType type;

    @OneToMany(mappedBy = "template")
    private List<Question> questions = new ArrayList<>();

    @OneToMany(mappedBy = "template")
    @JsonIgnore
    private List<Form> forms = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "opo_code")
    @JsonIgnoreProperties("templates")
    private OPO OPO;

    @JsonIgnore
    private boolean active = true;

    public void addForm(Form form) {
        forms.add(form);
        form.setTemplate(this);
    }

    public void addQuestion(Question question) {
        this.questions.add(question);
        question.setTemplate(this);
    }

    public void addOPO(OPO opo) {
        this.setOPO(opo);
        opo.addTemplate(this);
    }

    public void removeQuestion(Question question) {
        this.questions.remove(question);
        question.setTemplate(null);
    }
}
