import { render, screen } from "@testing-library/react";
import ArticleCard from "./ArticleCard";

describe("ArticleCard", () => {
  describe("when passed no currency", () => {
    it("displays title and price in euros", () => {
      render(<ArticleCard id="1234" title="Meuble" price={100} />);

      expect(screen.getByText("Meuble")).toBeInTheDocument();
      expect(screen.getByText("100 €")).toBeInTheDocument();
    });
  });

  describe("when passed dollar as currency", () => {
    it("displays title and price in dollars", () => {
      render(
        <ArticleCard id="1234" title="Meuble" price={100} currency="DOLLAR" />
      );

      expect(screen.getByText("Meuble")).toBeInTheDocument();
      expect(screen.getByText("100 $")).toBeInTheDocument();
    });
  });
});
