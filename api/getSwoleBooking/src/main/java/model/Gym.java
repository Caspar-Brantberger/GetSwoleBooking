package model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import model.AccesOption;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Gym {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "gym", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<AccesOption> accesOptions = new ArrayList<>();

    public void addAccesOption(AccesOption accesOption) {
        accesOptions.add(accesOption);
        accesOption.setGym(this);
    }
    public void removeAccesOption(AccesOption accesOption) {
        accesOptions.remove(accesOption);
        accesOption.setGym(null);
    }


}
