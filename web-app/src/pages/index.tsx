import ArticleCard from "@/components/ArticleCard/ArticleCard";
import { CardGrid } from "@/components/CardGrid/CardGrid";
import { useEffect, useState } from "react";
import { CheckboxLabel } from "../components/FormElements/CheckBoxLabel/CheckboxLabel";
import { PrimaryButton } from "@/components/Button/PrimaryButton";
import Modal from "@/components/Modal/Modal";
import { Article } from "@/types";
import Loader from "@/components/Loader/Loader";
import { MainContentTitle } from "../components/MainContentTitle/MainContentTitle";
import { PageContainer } from "../components/PageContainer/PageContainer";

const DOLLAR_IN_EURO = 1.06;

export default function HomePage() {
  const [currency, setCurrency] = useState<"EURO" | "DOLLAR">("EURO");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articles, setArticles] = useState<Article[] | null>(null);

  function toggleCurrency() {
    return setCurrency(currency === "EURO" ? "DOLLAR" : "EURO");
  }

  function toggleModal() {
    return setIsModalOpen(!isModalOpen);
  }

  useEffect(() => {
    const fetchAds = async () => {
      const response = await fetch("/api/ads");
      const { ads } = (await response.json()) as { ads: Article[] };
      setArticles(ads);
    };

    fetchAds();
  }, []);

  return (
    <PageContainer>
      <MainContentTitle>Annonces récentes</MainContentTitle>
      <CheckboxLabel>
        <input type="checkbox" onChange={toggleCurrency} />
        Afficher les prix en dollars
      </CheckboxLabel>
      <PrimaryButton onClick={toggleModal}>Afficher la modale</PrimaryButton>
      <CardGrid>
        {articles ? (
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
        )}
      </CardGrid>
      {isModalOpen && <Modal onClose={toggleModal}>Contenu de la modale</Modal>}
    </PageContainer>
  );
}
