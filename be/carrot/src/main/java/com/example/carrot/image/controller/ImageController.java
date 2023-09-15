package com.example.carrot.image.controller;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.carrot.global.common.ApiResponse;
import com.example.carrot.image.dto.response.ImageResponse;
import com.example.carrot.image.service.ImageService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/api")
@RestController
public class ImageController {

	private final ImageService imageService;

	@PostMapping("/images")
	public ApiResponse<List<ImageResponse>> uploadImages(@RequestPart List<MultipartFile> images) {
		return ApiResponse.success(imageService.uploadImages(images));
	}

}
