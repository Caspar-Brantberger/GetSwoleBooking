package com.CasparBrantberger.getSwoleBooking.controller;



import com.CasparBrantberger.getSwoleBooking.dto.AccesOptionDTO;
import com.CasparBrantberger.getSwoleBooking.dto.GymDTO;
import org.springframework.web.bind.annotation.*;
import com.CasparBrantberger.getSwoleBooking.service.GymService;

import java.util.List;

@RestController
@RequestMapping("/gyms")
public class GymController {

    private final GymService gymService;

    public GymController(GymService gymService) {
        this.gymService = gymService;
    }

    //All gym crud functions for gym

    @GetMapping("/{id}")
    public GymDTO getGym(@PathVariable("id") Long gymId){
        return gymService.getGym(gymId);
    }

    @GetMapping
    public List<GymDTO> getAllGyms(){
        return gymService.getAllGyms();
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

    @GetMapping("/access-options")
    public List<AccesOptionDTO> getAllAccessOptions() {
        return gymService.getAllAccesOption();
    }

    // Read single
    @GetMapping("/{gymId}/access-options/{optionId}")
    public AccesOptionDTO getAccessOption(@PathVariable("gymId") Long gymId,
                                          @PathVariable("optionId") Long optionId){
        return gymService.getAccesOption(gymId, optionId);
    }

    // Update
    @PutMapping("/{gymId}/access-options/{optionId}")
    public AccesOptionDTO updateAccessOption(@PathVariable("gymId") Long gymId,
                                             @PathVariable("optionId") Long optionId,
                                             @RequestBody AccesOptionDTO dto){
        return gymService.updateAccesOption(gymId, optionId, dto);
    }

    // Delete
    @DeleteMapping("/{gymId}/access-options/{optionId}")
    public void deleteAccessOption(@PathVariable("gymId") Long gymId,
                                   @PathVariable("optionId") Long optionId){
        gymService.deleteAccesOptionFromGym(gymId, optionId);
    }


}
