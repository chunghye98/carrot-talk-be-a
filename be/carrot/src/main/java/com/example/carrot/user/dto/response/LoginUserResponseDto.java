package com.example.carrot.user.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LoginUserResponseDto {
	private Long id;
	private String nickname;
	private String imageUrl;

	@Builder
	public LoginUserResponseDto(Long id, String nickname, String imageUrl) {
		this.id = id;
		this.nickname = nickname;
		this.imageUrl = imageUrl;
	}

	public static LoginUserResponseDto of(Long userId, String nickname, String imageUrl) {
		return LoginUserResponseDto.builder()
			.id(userId)
			.nickname(nickname)
			.imageUrl(imageUrl)
			.build();
	}
}
