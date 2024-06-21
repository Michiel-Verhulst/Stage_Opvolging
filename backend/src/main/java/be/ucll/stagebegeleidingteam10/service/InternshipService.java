package be.ucll.stagebegeleidingteam10.service;

import be.ucll.stagebegeleidingteam10.model.*;
import be.ucll.stagebegeleidingteam10.repo.FormRepository;
import be.ucll.stagebegeleidingteam10.repo.FormTemplateRepository;
import be.ucll.stagebegeleidingteam10.repo.InternshipRepository;
import be.ucll.stagebegeleidingteam10.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class InternshipService {
    @Autowired
    private InternshipRepository internshipRepository;

    @Autowired
    private FormTemplateRepository formTemplateRepository;

    @Autowired
    private FormRepository formRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Internship> getAllInterships() {
        return internshipRepository.findAll();
    }

    public Form addForm(long internshipId, long formId) {
        Internship internship = internshipRepository.findById(internshipId).orElseThrow(() -> new ServiceException("notfound", "Internship not found"));
        FormTemplate formTemplate = formTemplateRepository.findById(formId).orElseThrow(() -> new ServiceException("notfound", "Form not found"));
        Form form = new Form();
        form.setCurrentPhase(CurrentPhase.PHASE1);
        internship.addForm(form);
        formTemplate.addForm(form);

        return formRepository.save(form);
    }


    public List<Internship> getAllIntershipsFromUser(String rnummer) {
        List<Internship> all = internshipRepository.findAll();
        if(all.isEmpty()) throw new ServiceException("notfound", "Found no internships");

        List<Internship> internshipsForUser = all.stream()
                .filter(internship -> internship.getUsers().stream()
                        .anyMatch(user -> user.getNummer().equals(rnummer)))
                .collect(Collectors.toList());

        if(internshipsForUser.isEmpty()) throw new ServiceException("notfound", "Found no user with rnummer");
        return internshipsForUser;
    }


    public List<Internship> getAllIntershipsFromBegeleider() {
        List<User> begeleiders = userRepository.findUsersByRole(UserType.COACH);

        return internshipRepository.findAll()
            .stream()
            .filter(internship -> hasBegeleider(internship, begeleiders))
            .collect(Collectors.toList());
    }

    private boolean hasBegeleider(Internship internship, List<User> begeleiders) {
        for (User user : internship.getUsers()) {
            if (begeleiders.contains(user)) {
                return true;
            }
        }
        return false;
    }

    public Internship addUser(long internshipId, User user) {
        Internship internship = internshipRepository.findById(internshipId).orElseThrow(() -> new ServiceException("notfound", "Internship not found"));

        internship.addUser(user);
        return internshipRepository.save(internship);
    }

    public List<Form> getFormsOfInternship(long id) {
        Internship internship = internshipRepository.findById(id).orElseThrow(() -> new ServiceException("notfound", "Internship not found"));
        return internship.getForms();
    }

    public Internship updateInternship(Internship internship) {
      Internship internshipToUpdate = internshipRepository.findById(internship.getId()).orElseThrow(() -> new ServiceException("notfound", "Internship not found"));
      internshipToUpdate.setCompanyName(internship.getCompanyName());
      internshipToUpdate.setLocation(internship.getLocation());
      internshipToUpdate.setUsers(internship.getUsers());

      return internshipRepository.save(internshipToUpdate);
    }

    public String getInternshipLocationById(long id) {
        Internship internship = internshipRepository.findById(id).orElseThrow(() -> new ServiceException("notfound", "Internship not found"));
        return internship.getLocation();
    }
}