package com.example.carrot.product_image.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.example.carrot.category.entity.Category;
import com.example.carrot.global.common.BaseCreatedTimeEntity;
import com.example.carrot.image.entity.Image;
import com.example.carrot.product.entity.Product;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProductImage extends BaseCreatedTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long productImageId;

	@Column(nullable = false)
	private boolean isMain;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "product_id")
	private Product product;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "image_id")
	private Image image;

	@Builder
	public ProductImage(boolean isMain, Product product, Image image) {
		this.isMain = isMain;
		this.product = product;
		this.image = image;
	}

	public static ProductImage of(Product product, Image image, boolean isMain) {
		return ProductImage.builder()
			.product(product)
			.image(image)
			.isMain(isMain)
			.build();
	}

	public void addImage(Image image) {
		this.image = image;
		image.getProductImages().add(this);
	}

	public void addProduct(Product product) {
		this.product = product;
		product.getProductImages().add(this);
	}
}
