package com.capstone.Exercise_Rec.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExerciseResponseDTO {
    private String id;
    private String bodyPart;
    private String equipment;
    private String gifUrl;
    private String name;
    private String target;
    private List<String> secondaryMuscles;
    private List<String> instructions;
}
