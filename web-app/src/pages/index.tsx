import ArticleCard from "@/components/ArticleCard/ArticleCard";
import { CardGrid } from "@/components/CardGrid/CardGrid";
import { useState } from "react";
import styled from "styled-components";
import { CheckboxLabel } from "../components/FormElements/CheckBoxLabel/CheckboxLabel";

const ARTICLES = [
  { id: 1, name: "Table", price: 120 },
  { id: 2, name: "Dame-jeanne", price: 75 },
  { id: 3, name: "Vide-poche", price: 4 },
  { id: 4, name: "Vaisselier", price: 900 },
  { id: 5, name: "Bougie", price: 8 },
  { id: 6, name: "Porte-magazine", price: 45 },
];

const DOLLAR_IN_EURO = 1.06;

const Checkbox = styled.input`
  margin: 6px 0 12px;
`;

export default function Home() {
  const [currency, setCurrency] = useState<"EURO" | "DOLLAR">("EURO");

  function toggleCurrency() {
    return setCurrency(currency === "EURO" ? "DOLLAR" : "EURO");
  }

  return (
    <>
      <h2>Annonces récentes</h2>
      <CheckboxLabel>
        <Checkbox type="checkbox" onChange={toggleCurrency} />
        Afficher les prix en dollars
      </CheckboxLabel>
      <CardGrid>
        {ARTICLES.map((article) => (
          <ArticleCard
            key={article.id}
            id={article.id}
            name={article.name}
            price={
              currency === "EURO"
                ? article.price
                : article.price * DOLLAR_IN_EURO
            }
            currency={currency}
          />
        ))}
      </CardGrid>
    </>
  );
}
