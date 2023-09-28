import ArticleDetails from "@/components/ArticleDetails/ArticleDetails";
import { Article } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ArticlePage() {
  const params = useParams();
  const id = params?.id as string;

  const [article, setArticle] = useState<Article | null>(null);

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

  return article ? <ArticleDetails {...article} /> : "Chargement de l'article…";
}
