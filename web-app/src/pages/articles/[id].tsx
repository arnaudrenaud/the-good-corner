import { useParams } from "next/navigation";
import { MailIcon } from "@/components/Icons/MailIcon";

export default function Article() {
  const params = useParams();
  const id = params?.id;

  if (!id) {
    return "Loading…";
  }

  return (
    <main className="main-content">
      <h2 className="article-details-title">Table</h2>
      <section className="article-details">
        <div className="article-details-image-container">
          <img className="article-details-image" src={`/images/${id}.webp`} />
        </div>
        <div className="article-details-info">
          <div className="article-details-price">120 €</div>
          <div className="article-details-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, iusto!
            Voluptates repudiandae asperiores quia. Blanditiis repellat minima
            adipisci, aliquam nulla unde quam architecto eligendi, voluptatum,
            perspiciatis laudantium sed eos voluptates?
          </div>
          <hr className="separator" />
          <div className="article-details-owner">
            Annoncée publiée par <b>Serge</b> aujourd'hui (9:32).
          </div>
          <a
            href="mailto:serge@serge.com"
            className="button button-primary link-button"
          >
            <MailIcon />
            Envoyer un email
          </a>
        </div>
      </section>
    </main>
  );
}
