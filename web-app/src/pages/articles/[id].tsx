import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

import { removeQueryParameter } from "@/utils";
import { Article } from "@/types";
import Modal from "@/components/Modal/Modal";
import { PrimaryButton } from "@/components/Button/PrimaryButton";
import ArticleDetails from "@/components/ArticleDetails/ArticleDetails";

const AlertBox = styled.div`
  padding: 8px;
  display: grid;
  gap: 8px;
`;

export default function ArticlePage() {
  const router = useRouter();
  const { id, publishConfirmation } = router.query as {
    id: string;
    publishConfirmation: string | undefined;
  };

  const [article, setArticle] = useState<Article | null>(null);
  const [showPublishConfirmation, setShowPublishConfirmation] = useState(false);

  const showModal = () => {
    setShowPublishConfirmation(true);
  };
  const hideModal = () => {
    setShowPublishConfirmation(false);
  };

  useEffect(() => {
    if (publishConfirmation) {
      showModal();
      removeQueryParameter("publishConfirmation");
    }
  }, [publishConfirmation]);

  useEffect(() => {
    const fetchAd = async (articleId: string) => {
      const response = await fetch(`/api/ads/${articleId}`);
      const { ad } = (await response.json()) as { ad: Article };
      setArticle(ad);
    };

    if (id) {
      fetchAd(id);
    }
  }, [id]);

  return article ? (
    <>
      <ArticleDetails {...article} />
      {showPublishConfirmation && (
        <Modal onClose={hideModal}>
          <AlertBox>
            L'article {article.title} a bien été créé.
            <PrimaryButton onClick={hideModal}>OK</PrimaryButton>
          </AlertBox>
        </Modal>
      )}
    </>
  ) : (
    "Chargement de l'article…"
  );
}
