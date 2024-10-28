// Food.java
package com.example.foodfetcher.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class Food {
    private List<String> searchKeywords;
    private Nutrient calories;
    private List<Portion> portions;
    private EdiblePart ediblePart;
    private List<String> langualCodes;
    private Nutrient energy;
    private String foodName;
    private String latinName;
    private List<Nutrient> constituents;
    private String uri;
    private String foodGroupId;
    private String foodId;

    // getters and setters
}