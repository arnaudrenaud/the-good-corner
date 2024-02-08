import * as styled from "./ArticleCard.styled";
import { BaseLink } from "../Link/BaseLink";
import { GetAdsForCategoryQuery } from "@/gql/graphql";

export default function ArticleCard({
  id,
  title,
  price,
  currency = "EURO",
}: GetAdsForCategoryQuery["ads"][0] & {
  currency?: "EURO" | "DOLLAR";
}) {
  return (
    <styled.Container>
      <BaseLink href={`/articles/${id}`}>
        <styled.Image src={`/file-hosting/${id}.jpg`} />
        <styled.Text>
          <styled.Title>{title}</styled.Title>
          <styled.Price>
            {price} {currency === "EURO" ? "€" : "$"}
          </styled.Price>
        </styled.Text>
      </BaseLink>
    </styled.Container>
  );
}
