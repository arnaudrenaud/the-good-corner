import PrimaryButton from "@/components/PrimaryButton";
import React from "react";

function PublishArticle() {
  const createArticle = () => {
    // call POST /articles on API
  };

  return (
    <main className="main-content">
      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();
          createArticle();
        }}
      >
        <label className="form-label-with-field">
          Photo
          <input className="text-field" type="file" />
        </label>
        <label className="form-label-with-field">
          Titre
          <input className="text-field" type="text" required minLength={4} />
        </label>
        <label className="form-label-with-field">
          Prix
          <input className="text-field" type="number" required min={0} />
        </label>
        <label className="form-label-with-field">
          Description
          <textarea className="text-field text-area" />
        </label>
        <label className="form-label-with-field">
          Propriétaire
          <input className="text-field" type="email" required />
        </label>
        <PrimaryButton>Publier l'annonce</PrimaryButton>
      </form>
    </main>
  );
}

export default PublishArticle;
