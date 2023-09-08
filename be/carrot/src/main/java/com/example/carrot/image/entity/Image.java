package com.example.carrot.image.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.example.carrot.global.common.BaseCreatedTimeEntity;
import com.example.carrot.product_image.entity.ProductImage;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Image extends BaseCreatedTimeEntity {

	@Id
	@GeneratedValue
	private Long imageId;

	@Column(nullable = false, length = 500)
	private String imageUrl;

	@OneToMany(mappedBy = "image", cascade = CascadeType.ALL)
	private List<ProductImage> productImages = new ArrayList<>();

	@Builder
	public Image(String imageUrl) {
		this.imageUrl = imageUrl;
	}
}
