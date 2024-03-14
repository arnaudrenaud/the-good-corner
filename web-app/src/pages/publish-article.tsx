import { PrimaryButton } from "@/components/Button/PrimaryButton";
import { Form } from "@/components/FormElements/Form/Form";
import {
  FormLabelWithField,
  TextArea,
  TextField,
} from "@/components/FormElements/Input/Input";
import { InlineLink } from "@/components/Link/InlineLink";
import Loader from "@/components/Loader/Loader";
import { MainContentTitle } from "@/components/MainContentTitle/MainContentTitle";
import { NarrowPageContainer } from "@/components/PageContainer/PageContainer";
import {
  CreateAdFormMutation,
  CreateAdFormMutationVariables,
  GetMyProfilePublishArticleQuery,
} from "@/gql/graphql";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useState } from "react";

const CREATE_AD_FORM = gql`
  mutation CreateAdForm(
    $title: String!
    $price: Float!
    $categoryId: Int!
    $description: String!
  ) {
    createAd(
      title: $title
      price: $price
      categoryId: $categoryId
      description: $description
    ) {
      id
    }
  }
`;

export const GET_MY_PROFILE_PUBLISH_ARTICLE = gql`
  query GetMyProfilePublishArticle {
    myProfile {
      id
    }
  }
`;

export default function PublishArticlePage() {
  const { data, loading: loadingMyProfile } =
    useQuery<GetMyProfilePublishArticleQuery>(GET_MY_PROFILE_PUBLISH_ARTICLE);

  // track file state
  const [fileInForm, setFileInForm] = useState<File | null>(null);
  const [formData, setFormData] = useState<CreateAdFormMutationVariables>({
    title: "",
    price: 0,
    description: "",
    categoryId: 1,
  });
  const router = useRouter();

  const updateFormData = (
    partialFormData: Partial<CreateAdFormMutationVariables>,
  ) => {
    setFormData({ ...formData, ...partialFormData });
  };

  const [createAdMutation, { loading, error }] = useMutation<
    CreateAdFormMutation,
    CreateAdFormMutationVariables
  >(CREATE_AD_FORM);

  const uploadImage = async (id: string) => {
    const { readAndCompressImage } = await import("browser-image-resizer");
    if (fileInForm) {
      const resizedJpgFile = await readAndCompressImage(fileInForm, {
        quality: 0.75,
        maxWidth: 1440,
      });
      const body = new FormData();
      body.append("file", resizedJpgFile, `${id}.jpg`);
      await fetch("/file-hosting", {
        method: "POST",
        body,
      });
    }
  };

  const createArticle = async () => {
    const { data } = await createAdMutation({
      variables: {
        title: formData.title,
        price: formData.price as number,
        categoryId: formData.categoryId,
        description: formData.description,
      },
    });

    if (data && data.createAd.id) {
      const { id } = data.createAd;
      await uploadImage(id);
      router.push(`/articles/${data.createAd.id}?publishConfirmation=true`);
    }
  };

  return loadingMyProfile ? (
    <Loader global />
  ) : data?.myProfile ? (
    <NarrowPageContainer>
      <MainContentTitle>Publier une annonce</MainContentTitle>
      <Form
        // TODO: add ARIA label to reusable Form component
        aria-label="form"
        onSubmit={(event) => {
          event.preventDefault();
          createArticle();
        }}
      >
        <FormLabelWithField>
          Photo
          <TextField
            type="file"
            onChange={(event) => {
              const { files } = event.target;
              if (files) {
                setFileInForm(files[0]);
              }
            }}
          />
        </FormLabelWithField>
        <FormLabelWithField>
          Titre
          <TextField
            type="text"
            required
            minLength={2}
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
        <PrimaryButton disabled={loading}>
          {loading ? (
            <Loader size="SMALL" onBackground={true} />
          ) : (
            "Publier l'annonce"
          )}
        </PrimaryButton>
        {error && error.message}
      </Form>
    </NarrowPageContainer>
  ) : (
    <NarrowPageContainer>
      <p>
        <InlineLink href="/sign-up">Inscrivez-vous</InlineLink> ou{" "}
        <InlineLink href="/sign-in">connectez-vous</InlineLink> pour pouvoir
        publier une annonce.
      </p>
    </NarrowPageContainer>
  );
}
