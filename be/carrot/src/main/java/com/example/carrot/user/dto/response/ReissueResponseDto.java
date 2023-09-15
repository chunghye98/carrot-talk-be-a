package com.example.carrot.user.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ReissueResponseDto {
	private String accessToken;

	@Builder
	public ReissueResponseDto(String accessToken) {
		this.accessToken = accessToken;
	}

	public static ReissueResponseDto from(String accessToken) {
		return ReissueResponseDto.builder()
			.accessToken(accessToken)
			.build();
	}
}
