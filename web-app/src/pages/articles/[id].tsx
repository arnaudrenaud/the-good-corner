import ArticleDetails from "@/components/ArticleDetails/ArticleDetails";
import { useParams } from "next/navigation";

export default function Article() {
  const params = useParams();
  const id = params?.id;

  if (!id) {
    return "Loading…";
  }

  return <ArticleDetails />;
}
