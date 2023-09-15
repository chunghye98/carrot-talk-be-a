package com.example.carrot.image.entity;

import java.util.Arrays;

import com.example.carrot.global.exception.CustomException;
import com.example.carrot.global.exception.StatusCode;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum ImageFormat {
	PNG(".png"),
	JPG(".jpg"),
	JPEG(".jpeg");

	private final String extension;

	public static void validate(String key) {
		String keyLowerCase = key.toLowerCase();
		if (Arrays.stream(values()).anyMatch(imageFormat -> keyLowerCase.endsWith(imageFormat.extension))) {
			return;
		}

		throw new CustomException(StatusCode.UPLOAD_IMAGE_EXCEPTION);
	}
}
