import { PrimaryButton } from "@/components/Button/PrimaryButton";
import { Form } from "@/components/FormElements/Form/Form";
import {
  FormLabelWithField,
  TextArea,
  TextField,
} from "@/components/FormElements/Input/Input";
import { useRouter } from "next/router";
import React, { useState } from "react";

type PublishArticleFormData = {
  title: string;
  price: number | null;
  description: string;
  owner: string;
};

export default function PublishArticlePage() {
  const [formData, setFormData] = useState<PublishArticleFormData>({
    title: "",
    price: null,
    description: "",
    owner: "",
  });
  const router = useRouter();

  const updateFormData = (partialFormData: Partial<PublishArticleFormData>) => {
    setFormData({ ...formData, ...partialFormData });
  };

  const createArticle = async () => {
    const response = await fetch("/api/ads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const { ad } = await response.json();

    if (response.ok && ad.id) {
      router.push(`/articles/${ad.id}?publishConfirmation=true`);
    }
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
          <TextField
            type="text"
            required
            minLength={4}
            onChange={(event) => {
              updateFormData({ title: event.target.value });
            }}
          />
        </FormLabelWithField>
        <FormLabelWithField>
          Prix
          <TextField
            type="number"
            required
            min={0}
            onChange={(event) => {
              updateFormData({ price: parseInt(event.target.value) });
            }}
          />
        </FormLabelWithField>
        <FormLabelWithField>
          Description
          <TextArea
            onChange={(event) => {
              updateFormData({ description: event.target.value });
            }}
          />
        </FormLabelWithField>
        <FormLabelWithField>
          Propriétaire
          <TextField
            type="email"
            required
            onChange={(event) => {
              updateFormData({ owner: event.target.value });
            }}
          />
        </FormLabelWithField>
        <PrimaryButton>Publier l'annonce</PrimaryButton>
      </Form>
    </>
  );
}
