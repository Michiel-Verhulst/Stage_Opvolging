package be.ucll.stagebegeleidingteam10.form;

import be.ucll.stagebegeleidingteam10.model.FormTemplate;
import be.ucll.stagebegeleidingteam10.model.FormTemplateType;
import be.ucll.stagebegeleidingteam10.repo.FormTemplateRepository;
import be.ucll.stagebegeleidingteam10.service.FormTemplateService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class FormTemplateServiceTest {
    @Mock
    FormTemplateRepository formRepository;

    @InjectMocks
    FormTemplateService formService;

    @Test
    public void givenValidForm_whenCreatingForm_thenFormIsAdded() {
        //given
        FormTemplate template = new FormTemplate();
        template.setId(1);
        template.setTitle("begeleiding");
        template.setType(FormTemplateType.EVALUATION);
        when(formRepository.save(template)).thenReturn(template);

        //when
        //FormTemplate added = formService.createFormTemplate(template);

        //then
        //assertEquals(template.getId(), added.getId());
        //assertEquals(template.getTitle(), added.getTitle());
        //assertEquals(template.getType(), added.getType());
    }
}

