package com.example.valentines;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class InvitationController {

    @GetMapping("/health")
    public Map<String, String> health() {
        Map<String, String> response = new LinkedHashMap<>();
        response.put("status", "UP");
        response.put("application", "valentines-invitation");
        return response;
    }

    @GetMapping("/message")
    public Map<String, String> message() {
        Map<String, String> response = new LinkedHashMap<>();
        response.put("couple", "Kishore ❤️ Sai Swaroopa");
        response.put("relationshipStartDate", "2022-06-02");
        response.put("title", "Every Love Story Is Beautiful, But Ours Is My Favorite.");
        response.put("invitation", "Sai, Will You Be My Valentine?");
        return response;
    }
}
