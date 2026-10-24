package com.example.valentines;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class InvitationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void healthEndpointReturnsUp() throws Exception {
        mockMvc.perform(get("/api/health"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("UP"))
                .andExpect(jsonPath("$.application").value("valentines-invitation"));
    }

    @Test
    void messageEndpointReturnsInvitationDetails() throws Exception {
        mockMvc.perform(get("/api/message"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.couple").value("Kishore ❤️ Sai Swaroopa"))
                .andExpect(jsonPath("$.relationshipStartDate").value("2022-06-02"))
                .andExpect(jsonPath("$.title").value(
                        "Every Love Story Is Beautiful, But Ours Is My Favorite."))
                .andExpect(jsonPath("$.invitation").value("Sai, Will You Be My Valentine?"));
    }
}
