import ArticleCard from "@/components/ArticleCard/ArticleCard";
import { CardGrid } from "@/components/CardGrid/CardGrid";
import { useState } from "react";
import styled from "styled-components";
import { CheckboxLabel } from "../components/FormElements/CheckBoxLabel/CheckboxLabel";
import { PrimaryButton } from "@/components/Button/PrimaryButton";
import Modal from "@/components/Modal/Modal";

const ARTICLES = [
  { id: 1, name: "Table", price: 120 },
  { id: 2, name: "Dame-jeanne", price: 75 },
  { id: 3, name: "Vide-poche", price: 4 },
  { id: 4, name: "Vaisselier", price: 900 },
  { id: 5, name: "Bougie", price: 8 },
  { id: 6, name: "Porte-magazine", price: 45 },
];

const DOLLAR_IN_EURO = 1.06;

const Container = styled.div`
  display: grid;
  gap: 12px;
`;

const MainContentTitle = styled.h2`
  margin: 0 0 4px;
`;

export default function Home() {
  const [currency, setCurrency] = useState<"EURO" | "DOLLAR">("EURO");
  const [isModalOpen, setIsModalOpen] = useState(false);

  function toggleCurrency() {
    return setCurrency(currency === "EURO" ? "DOLLAR" : "EURO");
  }

  function toggleModal() {
    return setIsModalOpen(!isModalOpen);
  }

  return (
    <Container>
      <MainContentTitle>Annonces récentes</MainContentTitle>
      <CheckboxLabel>
        <input type="checkbox" onChange={toggleCurrency} />
        Afficher les prix en dollars
      </CheckboxLabel>
      <PrimaryButton onClick={toggleModal}>Afficher la modale</PrimaryButton>
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
      {isModalOpen && <Modal onClose={toggleModal}>Contenu de la modale</Modal>}
    </Container>
  );
}
