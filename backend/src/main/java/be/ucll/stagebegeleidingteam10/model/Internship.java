package be.ucll.stagebegeleidingteam10.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "internship")
public class Internship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long id;

    private LocalDate StartDate;

    private LocalDate EndDate;

    @NotBlank
    private String description_short;

    @NotBlank
    private String description_long;

    @NotBlank
    private String department;

    @NotBlank
    private String tasks;

    @NotBlank
    private String language;

    @NotBlank
    private String contactperson_code;

    private boolean active = true;

    @NotNull
    @Positive
    private int academyYear;

    @NotBlank
    private String CompanyName;

    @NotBlank
    private String Location;

    @ManyToMany
    @JoinTable(name = "internship_user",
            joinColumns = @JoinColumn(name = "internship_id"),
            inverseJoinColumns = @JoinColumn(name = "user_email"),
            uniqueConstraints = @UniqueConstraint(columnNames = {"internship_id", "user_email"}))
    private List<User> users = new ArrayList<>();

    @OneToMany(mappedBy = "internship")
    @JsonIgnore
    private List<Form> forms = new ArrayList<>();

    public void addUser(User user) {
        this.users.add(user);
        user.setInternship(this);
    }

    public void addForm(Form form) {
        this.forms.add(form);
        form.setInternship(this);
    }
}
