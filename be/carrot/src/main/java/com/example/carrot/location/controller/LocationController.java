package com.example.carrot.location.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.carrot.global.common.ApiResponse;
import com.example.carrot.location.dto.response.LocationResponseDto;
import com.example.carrot.location.service.LocationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class LocationController {

	private final LocationService locationService;

	/**
	 * 동네 검색 API
	 */
	@GetMapping("/locations")
	public ApiResponse<List<LocationResponseDto>> searchLocations(@RequestParam String keyword) {
		List<LocationResponseDto> locationResponseDtos = locationService.searchLocations(keyword);
		return ApiResponse.success(locationResponseDtos);
	}
}
