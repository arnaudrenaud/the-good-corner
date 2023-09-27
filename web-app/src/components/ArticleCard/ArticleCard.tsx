import Link from "next/link";

import * as styled from "./ArticleCard.styled";
import { BaseLink } from "../Link/BaseLink";

export default function ArticleCard({
  id,
  name,
  price,
}: {
  id: number;
  name: string;
  price: number;
}) {
  return (
    <styled.Container>
      <BaseLink className="article-card-link" href={`/articles/${id}`}>
        <styled.Image
          className="article-card-image"
          src={`/images/${id}.webp`}
        />
        <styled.Text>
          <styled.Title>{name}</styled.Title>
          <styled.Price>{price} €</styled.Price>
        </styled.Text>
      </BaseLink>
    </styled.Container>
  );
}
