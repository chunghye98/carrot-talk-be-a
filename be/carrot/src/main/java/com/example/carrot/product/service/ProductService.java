package com.example.carrot.product.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.carrot.category.entity.Category;
import com.example.carrot.category.repository.CategoryRepository;
import com.example.carrot.global.exception.CustomException;
import com.example.carrot.global.exception.StatusCode;
import com.example.carrot.image.entity.Image;
import com.example.carrot.image.repository.ImageRepository;
import com.example.carrot.like.entity.Like;
import com.example.carrot.location.entity.Location;
import com.example.carrot.location.repository.LocationRepository;
import com.example.carrot.product.dto.request.ModifyProductRequestDto;
import com.example.carrot.product.dto.request.ModifyProductStatusRequestDto;
import com.example.carrot.product.dto.request.SaveProductRequestDto;
import com.example.carrot.product.dto.response.MainPageResponseDto;
import com.example.carrot.product.dto.response.ModifyProductResponseDto;
import com.example.carrot.product.dto.response.ProductDetailResponseDto;
import com.example.carrot.product.dto.response.ProductDetailSellerResponseDto;
import com.example.carrot.product.dto.response.ProductsResponseDto;
import com.example.carrot.product.dto.response.ReadProductDetailResponseDto;
import com.example.carrot.product.dto.response.SaveProductResponseDto;
import com.example.carrot.product.entity.Product;
import com.example.carrot.product.entity.ProductStatus;
import com.example.carrot.product.repository.ProductRepository;
import com.example.carrot.product_image.entity.ProductImage;
import com.example.carrot.product_image.repository.ProductImageRepository;
import com.example.carrot.user.entity.User;
import com.example.carrot.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ProductService {

	private final ProductRepository productRepository;
	private final ProductImageRepository productImageRepository;
	private final ImageRepository imageRepository;
	private final LocationRepository locationRepository;
	private final CategoryRepository categoryRepository;
	private final UserRepository userRepository;

	public MainPageResponseDto getMainPage(Long locationId, Long categoryId, Long next, int size) {
		Slice<ProductsResponseDto> products = productRepository.findProducts(locationId, categoryId, next, size);
		List<ProductsResponseDto> contents = products.getContent();

		if (hasNextProductId(contents, size)) {
			return MainPageResponseDto.of(removeLastProduct(contents, size), getNextProductId(contents, size));
		}
		return MainPageResponseDto.of(contents);
	}

	private List<ProductsResponseDto> removeLastProduct(List<ProductsResponseDto> contents, int size) {
		return contents.subList(0, size);
	}

	private Long getNextProductId(List<ProductsResponseDto> contents, int size) {
		return contents.get(size).getId();
	}

	private boolean hasNextProductId(List<ProductsResponseDto> contents, int size) {
		if (contents.size() == size + 1) {
			return true;
		}
		return false;
	}

	@Transactional
	public ModifyProductResponseDto modifyProduct(ModifyProductRequestDto modifyProductRequestDto, Long userId,
		Long productId) {

		Product product = getProduct(productId);

		product.validateEditAccess(userId);

		List<ProductImage> productImages = product.getProductImages();

		productImageRepository.deleteAllInBatch(productImages);

		List<Long> imageIds = modifyProductRequestDto.getImages();

		Image mainImage = getImage(imageIds.get(0));
		List<Image> images = imageRepository.findAllById(imageIds.subList(1, imageIds.size()));

		List<ProductImage> updatedProductImages = new ArrayList<>();
		updatedProductImages.add(ProductImage.of(product, mainImage, true));

		for (Image image : images) {
			updatedProductImages.add(ProductImage.of(product, image, false));
		}

		productImageRepository.saveAll(updatedProductImages);

		Category category = getCategory(modifyProductRequestDto);
		Location location = getLocation(modifyProductRequestDto);

		product.update(
			modifyProductRequestDto.getTitle(), modifyProductRequestDto.getContent(),
			modifyProductRequestDto.getPrice(), category, location);

		return ModifyProductResponseDto.of(product);
	}

	private Image getImage(Long imageId) {
		return imageRepository.findById(imageId)
			.orElseThrow(() -> new CustomException(StatusCode.NOT_FOUND_IMAGE));
	}

	private Location getLocation(ModifyProductRequestDto modifyProductRequestDto) {
		return locationRepository.findById(modifyProductRequestDto.getLocationId())
			.orElseThrow(() -> new CustomException(StatusCode.NOT_FOUND_LOCATION));
	}

	private Category getCategory(ModifyProductRequestDto modifyProductRequestDto) {
		return categoryRepository.findById(modifyProductRequestDto.getCategoryId())
			.orElseThrow(() -> new CustomException(StatusCode.NOT_FOUND_CATEGORY));
	}

	private Product getProduct(Long productId) {
		return productRepository.findById(productId)
			.orElseThrow(() -> new CustomException(StatusCode.NOT_FOUND_PRODUCT));
	}

	@Transactional
	public SaveProductResponseDto saveProduct(SaveProductRequestDto saveProductRequestDto, Long userId) {
		if (userId == null) {
			throw new CustomException(StatusCode.MALFORMED_JWT_EXCEPTION);
		}
		User user = userRepository.findById(userId)
			.orElseThrow(() -> new CustomException(StatusCode.NOT_FOUND_USER));

		String name = saveProductRequestDto.getName();
		Category category = categoryRepository.findById(saveProductRequestDto.getCategoryId())
			.orElseThrow(() -> new CustomException(StatusCode.NOT_FOUND_CATEGORY));
		Location location = locationRepository.findById(saveProductRequestDto.getLocationId())
			.orElseThrow(() -> new CustomException(StatusCode.NOT_FOUND_LOCATION));
		String content = saveProductRequestDto.getContent();
		Long price = saveProductRequestDto.getPrice();

		Product product = productRepository.save(
			Product.builder()
				.name(name)
				.price(price)
				.content(content)
				.hits(0L)
				.status(ProductStatus.ON_SALE)
				.user(user)
				.category(category)
				.location(location)
				.build()
		);

		List<ProductImage> productImages = makeProductImages(
			saveProductRequestDto, product);

		productImageRepository.saveAll(productImages);

		return SaveProductResponseDto.of(product.getProductId());
	}

	private List<ProductImage> makeProductImages(SaveProductRequestDto saveProductRequestDto, Product product) {
		List<Long> images = saveProductRequestDto.getImages();
		List<ProductImage> productImages = new ArrayList<>();
		for (int i = 0; i < images.size(); i++) {
			Long imageId = images.get(i);
			Image image = getImage(imageId);

			if (i == 0) {
				buildProductImagesForIndex0(product, image, productImages);
				continue;
			}

			buildProductImages(product, image, productImages);
		}
		return productImages;
	}

	private void buildProductImagesForIndex0(Product product, Image image, List<ProductImage> productImages) {
		productImages.add(
			ProductImage.builder()
			.product(product)
			.isMain(true)
			.image(image)
			.build()
		);
	}

	private void buildProductImages(Product product, Image image, List<ProductImage> productImages) {
		productImages.add(
			ProductImage.builder()
			.product(product)
			.image(image)
			.build()
		);
	}

	@Transactional
	public void deleteProduct(Long userId, Long productId) {
		Product product = getProduct(productId);
		product.validateEditAccess(userId);

		productRepository.delete(product);
	}

	@Transactional
	public ModifyProductResponseDto updateProductStatus(ModifyProductStatusRequestDto modifyProductStatusRequestDto,
		Long userId, Long productId) {

		Product product = getProduct(productId);
		product.validateEditAccess(userId);

		Product updateProduct = product.updateStatus(
			ProductStatus.chooseStatus(modifyProductStatusRequestDto.getStatus()));

		return ModifyProductResponseDto.of(updateProduct);
	}

	@Transactional
	public ReadProductDetailResponseDto getProductDetail(Long productId, Long userId) {
		Product product = getProduct(productId);
		return ReadProductDetailResponseDto.of(makeImageUrls(product),
			makeSeller(product), makeProduct(product, userId));
	}

	private List<String> makeImageUrls(Product product) {
		// ProductImage의 List 형태가 가장 첫번째로 오는 것이
		// 이미 대표 이미지의 것이라는 보장이 있어야 함 (이미지 API에서 그렇게 만들어야 함)
		List<ProductImage> productImages = product.getProductImages();

		catchMainImageException(productImages);

		return productImages.stream()
			.map(productImage -> productImage.getImage().getImageUrl())
			.collect(Collectors.toUnmodifiableList());
	}

	private void catchMainImageException(List<ProductImage> productImages) {
		if (!productImages.get(0).isMain()) {
			throw new CustomException(StatusCode.NOT_FOUND_MAIN_IMAGE);
		}
	}

	private ProductDetailSellerResponseDto makeSeller(Product product) {
		User user = product.getUser();
		return ProductDetailSellerResponseDto.of(user.getUserId(), user.getNickName());
	}

	private ProductDetailResponseDto makeProduct(Product product, Long userId) {
		String location = product.getLocation().getName();

		String status = product.getStatus().getValue();
		String title = product.getName();
		String category = product.getCategory().getName();
		Long price = product.getPrice();
		String content = product.getContent();
		LocalDateTime createdAt = product.getCreatedAt();

		// TODO: 채팅 기능 완료 후 추가
		Long chatCount = 0L;

		// 상품 조회할 때마다 조회수 1 증가 (이거 때문에 @Transactional 사용)
		product.increaseHit();
		Long hits = product.getHits();

		List<Like> likes = product.getLikes();
		Long likeCount = (long)likes.size();

		boolean isLiked = false;
		if (userId != null) {
			isLiked = findIsLiked(likes, userId);
		}

		return ProductDetailResponseDto.of(location, status, title, category,
			createdAt, content, chatCount, likeCount, hits, price, isLiked);
	}

	private boolean findIsLiked(List<Like> likes, Long userId) {
		return likes.stream()
			.anyMatch(like -> Objects.equals(like.getUser().getUserId(), userId));
	}

}
