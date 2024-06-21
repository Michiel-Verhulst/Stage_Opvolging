package be.ucll.stagebegeleidingteam10.service;

import be.ucll.stagebegeleidingteam10.model.CurrentPhase;
import be.ucll.stagebegeleidingteam10.model.Form;
import be.ucll.stagebegeleidingteam10.repo.FormRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FormService {

    @Autowired
    private FormRepository formRepository;


    public Form editPhase(long formId, CurrentPhase phase) {
        Form form = formRepository.findById(formId).orElseThrow(() -> new ServiceException("notfound", "Form not found"));
        form.setCurrentPhase(phase);
        return formRepository.save(form);
    }
}
