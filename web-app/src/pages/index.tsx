import { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";

import ArticleCard from "@/components/ArticleCard/ArticleCard";
import { CardGrid } from "@/components/CardGrid/CardGrid";
import { MainContentTitle } from "../components/MainContentTitle/MainContentTitle";
import { PageContainer } from "../components/PageContainer/PageContainer";
import { CheckboxLabel } from "../components/FormElements/CheckBoxLabel/CheckboxLabel";
import Modal from "@/components/Modal/Modal";
import { Article } from "@/types";
import Loader from "@/components/Loader/Loader";

const DOLLAR_IN_EURO = 1.06;

const GET_ADS_HOME_PAGE = gql`
  query GetAdsHomePage {
    ads {
      id
      title
      price
    }
  }
`;

export default function HomePage() {
  const [currency, setCurrency] = useState<"EURO" | "DOLLAR">("EURO");
  const [isModalOpen, setIsModalOpen] = useState(false);

  function toggleCurrency() {
    return setCurrency(currency === "EURO" ? "DOLLAR" : "EURO");
  }

  function toggleModal() {
    return setIsModalOpen(!isModalOpen);
  }

  const { data, loading, error } = useQuery(GET_ADS_HOME_PAGE);
  console.log({ data, loading, error });

  return (
    <PageContainer>
      <MainContentTitle>Annonces récentes</MainContentTitle>
      <CheckboxLabel>
        <input type="checkbox" onChange={toggleCurrency} />
        Afficher les prix en dollars
      </CheckboxLabel>
      {/* <PrimaryButton onClick={toggleModal}>Afficher la modale</PrimaryButton> */}
      <CardGrid>
        {/* {articles ? (
          articles.map((article) => (
            <ArticleCard
              key={article.id}
              id={article.id}
              name={article.title}
              price={
                currency === "EURO"
                  ? article.price
                  : article.price * DOLLAR_IN_EURO
              }
              currency={currency}
            />
          ))
        ) : (
          <Loader global />
        )} */}
      </CardGrid>
      {isModalOpen && <Modal onClose={toggleModal}>Contenu de la modale</Modal>}
    </PageContainer>
  );
}
