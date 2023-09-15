package com.example.carrot.image.service;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.example.carrot.global.exception.CustomException;
import com.example.carrot.global.exception.StatusCode;
import com.example.carrot.image.component.ImageS3Uploader;
import com.example.carrot.image.dto.response.ImageResponse;
import com.example.carrot.image.entity.Image;
import com.example.carrot.image.repository.ImageRepository;

import lombok.RequiredArgsConstructor;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class ImageService {

	private static final String EXTENSION_SEPARATOR = ".";
	private static final String DIRECTORY_SEPARATOR = "/";

	@Value("${upload.image.directory}")
	private String uploadDirectory;

	@Value("${upload.image.width}")
	private int imageWidth;

	@Value("${upload.image.height}")
	private int imageHeight;

	private final ImageRepository imageRepository;
	private final ImageS3Uploader imageS3Uploader;

	@Transactional
	public List<ImageResponse> uploadImages(List<MultipartFile> multipartFiles) {
		List<String> imagesUrls = new ArrayList<>();

		for (MultipartFile file : multipartFiles) {
			imagesUrls.add(uploadImage(file));
		}

		List<Image> images = Image.makeImages(imagesUrls);
		imageRepository.saveAll(images);

		return images.stream()
			.map(ImageResponse::of)
			.collect(Collectors.toUnmodifiableList());
	}

	private String uploadImage(MultipartFile file) {
		if (file == null || file.isEmpty()) {
			throw new CustomException(StatusCode.NOT_FOUND_IMAGE);
		}

		try (var imageInputStream = file.getInputStream()) {
			BufferedImage image = ImageIO.read(imageInputStream);
			return imageS3Uploader.upload(image, generateKey(file.getOriginalFilename()), imageHeight, imageWidth);
		} catch (IOException e) {
			throw new CustomException(StatusCode.UPLOAD_IMAGE_EXCEPTION);
		}
	}

	private String generateKey(String originFileName) {
		String fileName = UUID.randomUUID().toString();
		String extension = StringUtils.getFilenameExtension(originFileName);
		fixDirectory();
		return uploadDirectory + fileName + EXTENSION_SEPARATOR + extension;
	}

	private void fixDirectory() {
		if (!uploadDirectory.endsWith(DIRECTORY_SEPARATOR)) {
			uploadDirectory += DIRECTORY_SEPARATOR;
		}
	}
}
