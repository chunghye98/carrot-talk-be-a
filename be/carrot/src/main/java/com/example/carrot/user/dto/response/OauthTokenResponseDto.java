package com.example.carrot.user.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class OauthTokenResponseDto {
	@JsonProperty("access_token")
	private String accessToken;

	private String scope;

	@Builder
	public OauthTokenResponseDto(String accessToken, String scope) {
		this.accessToken = accessToken;
		this.scope = scope;
	}

}
