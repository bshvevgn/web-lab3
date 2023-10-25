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
public class RBean implements Serializable {
    private Double value;

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    public void validateSelectR(FacesContext facesContext,
                                UIComponent uiComponent, Object o) {
        if (o == null) {
            FacesMessage message = new FacesMessage("Введите значение R");
            throw new ValidatorException(message);
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof RBean)) return false;
        RBean that = (RBean) o;
        return Double.compare(getValue(), that.getValue()) == 0;
    }

    @Override
    public int hashCode() {
        return Objects.hash(getValue());
    }

    @Override
    public String toString() {
        return "SelectRBean{" +
                "value=" + value +
                '}';
    }
}