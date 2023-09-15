package com.example.carrot.location.dto.response;

import com.example.carrot.location.entity.Location;

import lombok.Builder;
import lombok.Getter;

@Getter
public class MainLocationResponseDto {
	private Long mainLocationId;

	@Builder
	public MainLocationResponseDto(Long mainLocationId) {
		this.mainLocationId = mainLocationId;
	}

	public static MainLocationResponseDto from(Location location) {
		return MainLocationResponseDto.builder()
			.mainLocationId(location.getLocationId())
			.build();
	}
}
