import Link from "next/link";

import * as styled from "./ArticleCard.styled";
import { BaseLink } from "../Link/BaseLink";

export default function ArticleCard({
  id,
  name,
  price,
  currency = "EURO",
}: {
  id: number;
  name: string;
  price: number;
  currency?: "EURO" | "DOLLAR";
}) {
  return (
    <styled.Container>
      <BaseLink href={`/articles/${id}`}>
        <styled.Image src={`/images/${id}.webp`} />
        <styled.Text>
          <styled.Title>{name}</styled.Title>
          <styled.Price>
            {price} {currency === "EURO" ? "€" : "$"}
          </styled.Price>
        </styled.Text>
      </BaseLink>
    </styled.Container>
  );
}
