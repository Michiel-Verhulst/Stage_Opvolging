package be.ucll.stagebegeleidingteam10.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonView;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Getter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Table(name = "users", uniqueConstraints = {@UniqueConstraint(columnNames = {"email"})})
public class User {

    @NotBlank(message = "Naam mag niet leeg zijn")
    private String name;

    @Id
    @Column(unique = true)
    @Email(regexp = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}", message = "Ongeldige email")
    private String email;

    @NotBlank(message = "Password mag niet leeg zijn")
    private String password;

    @Pattern(regexp = "^[A-Za-z][0-9]+$", message= "Ongeldige nummer")
    @Column(unique = true, nullable = false)
    private String nummer;

    @Pattern(regexp = "^[A-Za-z][0-9]+$", message= "Ongeldige nummer")
    @Column(unique = true)
    private String secondNumber;

    @Past
    @NotNull
    private LocalDate birthDate;

    @NotBlank
    private String nationality;

    @NotNull(message = "Role mag niet null zijn")
    private UserType role;

    private String studyCode;

    @ManyToMany(mappedBy = "users")
    @JsonIgnore
    private List<Internship> internships = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Answer> answers = new ArrayList<>();

    @JsonIgnore
    public String getPassword() {
        return password;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setNummer(String nummer) {
        this.nummer = nummer;
    }

    public void setRole(UserType role) {
        this.role = role;
    }

    public void setStudyCode(String studyCode) {
        this.studyCode = studyCode;
    }

    public void setInternship(Internship internship) {
        this.internships.add(internship);
    }

    public void addAnswer(Answer answer) {
        this.answers.add(answer);
        answer.setUser(this);
    }
}