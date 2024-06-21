package be.ucll.stagebegeleidingteam10.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "opo")
public class OPO {

    @Id
    @Column(unique = true)
    public String code;

    @NotBlank(message = "Name mag niet leeg zijn")
    private String name;

    @NotBlank(message = "Study Code mag niet leeg zijn")
    private String studyCode;

    @Positive(message = "Aantal loops moet tussen 1 en 10 liggen")
    private int loops;

    @OneToMany(mappedBy = "OPO")
    @JsonIgnoreProperties("opo")
    private List<FormTemplate> templates = new ArrayList<>();

    public void addTemplate(FormTemplate template) {
        this.templates.add(template);
    }

}
