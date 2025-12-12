package controller;


import dto.AccesOptionDTO;
import dto.GymDTO;
import org.springframework.web.bind.annotation.*;
import service.GymService;

@RestController
@RequestMapping("/gym")
public class GymController {

    private final GymService gymService;

    public GymController(GymService gymService) {
        this.gymService = gymService;
    }

    //All gym crud functions for gym

    @GetMapping
    public GymDTO getGym(@PathVariable ("id") Long gymId){
        return gymService.getGym(gymId);
    }

    @PostMapping
    public GymDTO addGym(@RequestBody GymDTO gymDTO){
        return gymService.createGym(gymDTO);
    }

    @PutMapping("/{id}")
    public GymDTO updateGym(@PathVariable("id") Long gymId, @RequestBody GymDTO gymDTO){
        return gymService.updateGym(gymId, gymDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteGym(@PathVariable("id") Long gymId){
        gymService.deleteGym(gymId);
    }

    // All crud functions for AccessOptions

    @PostMapping("/{id}/access-options")
    public AccesOptionDTO addAccessOption(@PathVariable("id") Long gymId, @RequestBody AccesOptionDTO dto){
        return gymService.addAccesOptionToGym(gymId, dto);
    }

    @DeleteMapping("/{gymId}/access-option/{optionId}")
    public void deleteAccessOption(@PathVariable("gymId") Long gymId, @PathVariable("optionId") Long optionId){
        gymService.deleteAccesOptionFromGym(gymId, optionId);
    }

    @PutMapping("/{id}/access-options")
    public AccesOptionDTO updateAccessOption(@PathVariable Long gymId,@PathVariable Long optionId, @RequestBody AccesOptionDTO dto){
        return gymService.updateAccesOption(gymId,optionId,dto);
    }

    @GetMapping("/{id}/access-options")
    public AccesOptionDTO getAccessOption(@PathVariable("id") Long gymId, @PathVariable("optionId") Long accesOptionId){
        return gymService.getAccesOption(gymId,accesOptionId);
    }


}
