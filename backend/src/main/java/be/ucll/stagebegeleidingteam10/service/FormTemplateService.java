package be.ucll.stagebegeleidingteam10.service;

import be.ucll.stagebegeleidingteam10.model.FormTemplate;
import be.ucll.stagebegeleidingteam10.model.OPO;
import be.ucll.stagebegeleidingteam10.model.Question;
import be.ucll.stagebegeleidingteam10.repo.FormTemplateRepository;
import be.ucll.stagebegeleidingteam10.repo.OPORepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FormTemplateService {

    @Autowired
    private FormTemplateRepository formTemplateRepository;

    @Autowired
    private OPORepository opoRepository;

    public FormTemplate createFormTemplate(FormTemplate form, String opoCode) {
        OPO opo = opoRepository.findById(opoCode).orElseThrow(() -> new ServiceException("notfound", "OPO not found"));
        form.addOPO(opo);

        return formTemplateRepository.save(form);
    }

    public FormTemplate addQuestion(long templateId, Question question) {
        FormTemplate template = formTemplateRepository.findById(templateId).orElseThrow(() -> new ServiceException("notfound", "Template not found"));
        template.addQuestion(question);
        return formTemplateRepository.save(template);
    }

    public List<FormTemplate> getActiveTemplates() {
        return formTemplateRepository.findFormTemplateByActive(true);
    }
    public List<FormTemplate> getNonActiveTemplates() {
        return formTemplateRepository.findFormTemplateByActive(false);
    }
    public FormTemplate getTemplateWithId(long id) {
        return formTemplateRepository.findById(id).orElseThrow(() -> new ServiceException("notfound", "Template not found"));
    }
    public FormTemplate edit(FormTemplate formTemplate, long id) {
    FormTemplate f = formTemplateRepository.findById(id).orElseThrow(() -> new ServiceException("notfound", "Template not found"));

    f.setType(formTemplate.getType());
    f.setTitle(formTemplate.getTitle());
    return formTemplateRepository.save(f);
    }
    public FormTemplate disable(long templateId) {
        FormTemplate template = formTemplateRepository.findById(templateId).orElseThrow(() -> new ServiceException("notfound", "Template not found"));
        template.setActive(false);
        return formTemplateRepository.save(template);
    }

    public FormTemplate deleteTemplate(long templateId) {
    FormTemplate template = formTemplateRepository.findById(templateId).orElseThrow(() -> new ServiceException("notfound", "Template not found"));
    formTemplateRepository.delete(template);
    return template;
    }
}
