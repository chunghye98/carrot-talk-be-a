package com.example.carrot.image.entity;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.example.carrot.global.common.BaseCreatedTimeEntity;
import com.example.carrot.product_image.entity.ProductImage;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Image extends BaseCreatedTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long imageId;

	@Column(nullable = false, length = 500)
	private String imageUrl;

	@OneToMany(mappedBy = "image", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<ProductImage> productImages = new ArrayList<>();

	public Image(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public static List<Image> makeImages(List<String> imageUrls) {
		return imageUrls.stream()
			.map(Image::new)
			.collect(Collectors.toUnmodifiableList());
	}

}
