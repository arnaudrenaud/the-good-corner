import { PrimaryButton } from "@/components/Button/PrimaryButton";
import { Form } from "@/components/FormElements/Form/Form";
import {
  FormLabelWithField,
  TextArea,
  TextField,
} from "@/components/FormElements/Input/Input";
import React from "react";

export default function PublishArticlePage() {
  const createArticle = () => {
    // call POST /articles on API
  };

  return (
    <>
      <Form
        onSubmit={(event) => {
          event.preventDefault();
          createArticle();
        }}
      >
        <FormLabelWithField>
          Photo
          <TextField type="file" />
        </FormLabelWithField>
        <FormLabelWithField>
          Titre
          <TextField type="text" required minLength={4} />
        </FormLabelWithField>
        <FormLabelWithField>
          Prix
          <TextField type="number" required min={0} />
        </FormLabelWithField>
        <FormLabelWithField>
          Description
          <TextArea />
        </FormLabelWithField>
        <FormLabelWithField>
          Propriétaire
          <TextField type="email" required />
        </FormLabelWithField>
        <PrimaryButton>Publier l'annonce</PrimaryButton>
      </Form>
    </>
  );
}
