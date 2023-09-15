package com.example.carrot.user.dto.response;

import com.example.carrot.global.jwt.Jwt;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserResponseDto {
	@JsonProperty("accessToken")
	private String accessToken;
	@JsonProperty("refreshToken")
	private String refreshToken;

	@JsonProperty("isUser")
	private boolean isUser;

	@JsonProperty("user")
	private LoginUserResponseDto loginUserResponseDto;

	@Builder
	public UserResponseDto(String accessToken, String refreshToken, boolean isUser,
		LoginUserResponseDto loginUserResponseDto) {
		this.accessToken = accessToken;
		this.refreshToken = refreshToken;
		this.isUser = isUser;
		this.loginUserResponseDto = loginUserResponseDto;
	}

	public static UserResponseDto of(String accessToken, boolean isUser) {
		return UserResponseDto.builder()
			.accessToken(accessToken)
			.isUser(isUser)
			.build();
	}

	public static UserResponseDto of(Jwt jwt, LoginUserResponseDto loginUserResponseDto, boolean isUser) {
		return UserResponseDto.builder()
			.accessToken(jwt.getAccessToken())
			.refreshToken(jwt.getRefreshToken())
			.loginUserResponseDto(loginUserResponseDto)
			.isUser(isUser)
			.build();
	}
}
