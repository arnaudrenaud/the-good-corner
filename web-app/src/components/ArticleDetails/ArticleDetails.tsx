import { ButtonLikeLink } from "../Link/ButtonLikeLink";
import { MailIcon } from "../Icons/MailIcon";

import * as styled from "./ArticleDetails.styled";

export default function ArticleDetails() {
  return (
    <>
      <h2>Table</h2>
      <styled.Container>
        <styled.ImageContainer>
          <styled.Image
            className="article-details-image"
            src={`/images/1.webp`}
          />
        </styled.ImageContainer>
        <styled.Info>
          <styled.Price>120 €</styled.Price>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, iusto!
            Voluptates repudiandae asperiores quia. Blanditiis repellat minima
            adipisci, aliquam nulla unde quam architecto eligendi, voluptatum,
            perspiciatis laudantium sed eos voluptates?
          </div>
          <hr className="separator" />
          <div>
            Annoncée publiée par <b>Serge</b> aujourd'hui (9:32).
          </div>
          <ButtonLikeLink href="mailto:serge@serge.com">
            <MailIcon />
            Envoyer un email
          </ButtonLikeLink>
        </styled.Info>
      </styled.Container>
    </>
  );
}
