/**
 * Filter Utils Tests
 *
 * Unit tests for filter utility functions
 *
 * @module __tests__/utils/filterUtils
 */

import {
  filterByLocation,
  filterByKeywords,
  applyFilters,
  getUniqueLocations,
} from "../../utils/filterUtils";

describe("filterUtils", () => {
  const mockArticles = [
    {
      id: "1",
      title: "Climate Change in Paris",
      abstract: "A story about climate change",
      geoFacet: ["Paris", "France"],
      desFacet: ["Climate Change", "Environment"],
    },
    {
      id: "2",
      title: "Technology Innovation in New York",
      abstract: "Tech companies are innovating",
      geoFacet: ["New York", "United States"],
      desFacet: ["Technology", "Innovation"],
    },
    {
      id: "3",
      title: "Sports News from London",
      abstract: "Latest sports updates",
      geoFacet: ["London", "United Kingdom"],
      desFacet: ["Sports", "Soccer"],
    },
  ];

  describe("filterByLocation", () => {
    it("should filter articles by exact location match", () => {
      const result = filterByLocation(mockArticles, "Paris");
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("1");
    });

    it("should return all articles when location is empty", () => {
      const result = filterByLocation(mockArticles, "");
      expect(result).toHaveLength(3);
    });

    it("should require exact match (case-sensitive)", () => {
      const result = filterByLocation(mockArticles, "paris");
      expect(result).toHaveLength(0);
    });

    it("should require exact match (no partial matches)", () => {
      const result = filterByLocation(mockArticles, "York");
      expect(result).toHaveLength(0);

      // But exact match should work
      const exactResult = filterByLocation(mockArticles, "New York");
      expect(exactResult).toHaveLength(1);
      expect(exactResult[0].id).toBe("2");
    });
  });

  describe("filterByKeywords", () => {
    it("should filter articles by exact keyword match in desFacet", () => {
      const result = filterByKeywords(mockArticles, "Climate Change");
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("1");
    });

    it("should require exact match (case-sensitive)", () => {
      const result = filterByKeywords(mockArticles, "climate change");
      expect(result).toHaveLength(0);
    });

    it("should filter by exact keyword in description facets", () => {
      const result = filterByKeywords(mockArticles, "Sports");
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("3");
    });

    it("should return all articles when keywords is empty", () => {
      const result = filterByKeywords(mockArticles, "");
      expect(result).toHaveLength(3);
    });

    it("should filter by exact single keyword", () => {
      const result = filterByKeywords(mockArticles, "Technology");
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("2");
    });
  });

  describe("applyFilters", () => {
    it("should apply both location and keywords filters with exact match", () => {
      const filters = {
        location: "Paris",
        keywords: "Climate Change",
      };
      const result = applyFilters(mockArticles, filters);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("1");
    });

    it("should return all articles when no filters are applied", () => {
      const filters = {
        location: "",
        keywords: "",
      };
      const result = applyFilters(mockArticles, filters);
      expect(result).toHaveLength(3);
    });

    it("should apply only location filter when keywords is empty", () => {
      const filters = {
        location: "New York",
        keywords: "",
      };
      const result = applyFilters(mockArticles, filters);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("2");
    });

    it("should apply only keywords filter when location is empty", () => {
      const filters = {
        location: "",
        keywords: "Sports",
      };
      const result = applyFilters(mockArticles, filters);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("3");
    });
  });

  describe("getUniqueLocations", () => {
    it("should return unique locations from articles", () => {
      const result = getUniqueLocations(mockArticles);
      expect(result).toContain("Paris");
      expect(result).toContain("France");
      expect(result).toContain("New York");
      expect(result).toContain("United States");
      expect(result).toContain("London");
      expect(result).toContain("United Kingdom");
    });

    it("should return sorted locations", () => {
      const result = getUniqueLocations(mockArticles);
      const sorted = [...result].sort();
      expect(result).toEqual(sorted);
    });
  });
});
