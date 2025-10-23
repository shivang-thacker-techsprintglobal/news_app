/**
 * ArticleCard Component Tests
 *
 * Unit tests for ArticleCard component
 *
 * @module __tests__/components/ArticleCard
 */

import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ArticleCard from "../../components/ArticleCard";

// TODO: Fix React 19 compatibility with react-test-renderer
// Currently skipped due to actImplementation issues with React 19.x
describe.skip("ArticleCard", () => {
  const mockArticle = {
    id: "1",
    title: "Test Article Title",
    byline: "By: John Doe",
    publishedDate: "2023-10-20T12:00:00Z",
    imageUrl: "https://example.com/image.jpg",
  };

  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render article information correctly", () => {
    const { getByText } = render(
      <ArticleCard article={mockArticle} onPress={mockOnPress} />
    );

    expect(getByText("Test Article Title")).toBeTruthy();
    expect(getByText("By: John Doe")).toBeTruthy();
  });

  it("should call onPress when card is pressed", () => {
    const { getByText } = render(
      <ArticleCard article={mockArticle} onPress={mockOnPress} />
    );

    fireEvent.press(getByText("Test Article Title"));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it("should display placeholder when no image URL is provided", () => {
    const articleWithoutImage = { ...mockArticle, imageUrl: null };
    const { queryByTestId } = render(
      <ArticleCard article={articleWithoutImage} onPress={mockOnPress} />
    );

    // The placeholder view should be rendered instead of image
    expect(queryByTestId("article-image")).toBeNull();
  });

  it('should display "Unknown Author" when byline is not provided', () => {
    const articleWithoutByline = { ...mockArticle, byline: null };
    const { getByText } = render(
      <ArticleCard article={articleWithoutByline} onPress={mockOnPress} />
    );

    expect(getByText("Unknown Author")).toBeTruthy();
  });
});
