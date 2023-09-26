import { useParams } from "next/navigation";

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
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              className="styled__BaseIcon-sc-1jsm4qr-0 llmHhT"
              stroke="currentcolor"
              strokeWidth="2.5"
              fill="none"
            >
              <path d="M25 4H7a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h18a5 5 0 0 0 5-5V9a5 5 0 0 0-5-5ZM7 6h18a3 3 0 0 1 2.4 1.22s0 0-.08 0L18 15.79a3 3 0 0 1-4.06 0L4.68 7.26H4.6A3 3 0 0 1 7 6Zm18 20H7a3 3 0 0 1-3-3V9.36l8.62 7.9a5 5 0 0 0 6.76 0L28 9.36V23a3 3 0 0 1-3 3Z"></path>
            </svg>
            Envoyer un email
          </a>
        </div>
      </section>
    </main>
  );
}
