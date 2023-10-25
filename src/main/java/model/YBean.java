package model;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.faces.application.FacesMessage;
import jakarta.faces.component.UIComponent;
import jakarta.faces.context.FacesContext;
import jakarta.faces.validator.ValidatorException;
import jakarta.inject.Named;

import java.io.Serializable;
import java.util.Objects;

@Named
@ApplicationScoped
public class YBean implements Serializable {
    private Double value;

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    public void validateSelectY(FacesContext facesContext,
                                UIComponent uiComponent, Object o) {
        if (o == null) {
            FacesMessage message = new FacesMessage("Введите значение Y");
            throw new ValidatorException(message);
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof YBean)) return false;
        YBean that = (YBean) o;
        return Double.compare(getValue(), that.getValue()) == 0;
    }

    @Override
    public int hashCode() {
        return Objects.hash(getValue());
    }

    @Override
    public String toString() {
        return "SelectYBean{" +
                "value=" + value +
                '}';
    }
}