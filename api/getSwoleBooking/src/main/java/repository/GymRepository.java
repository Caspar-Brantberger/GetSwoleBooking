package repository;

import dto.AccesOptionDTO;
import model.Gym;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GymRepository extends JpaRepository<Gym, Long> {

    Optional<Gym> findByName(String name);

    @Query("SELECT g FROM Gym g JOIN g.accesOptions a WHERE a.type = :type")
    List<Gym> findByAccesOptions(@Param("type") String type);

    @Query("SELECT g FROM Gym g LEFT JOIN FETCH g.accesOptions WHERE g.id = :id")
    Optional<Gym> findGymWithAccesOptions(@Param("id") Long id);
}
