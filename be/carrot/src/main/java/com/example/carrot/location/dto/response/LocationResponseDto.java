package com.example.carrot.location.dto.response;

import com.example.carrot.location.entity.Location;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class LocationResponseDto {

	private Long id;
	private String name;

	@Builder
	public LocationResponseDto(Long id, String name) {
		this.id = id;
		this.name = name;
	}

	public static LocationResponseDto of(Location location) {
		return LocationResponseDto.builder()
			.id(location.getLocationId())
			.name(location.getName())
			.build();
	}
}
