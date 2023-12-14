import { PrimaryButton } from "@/components/Button/PrimaryButton";
import { Form } from "@/components/FormElements/Form/Form";
import {
  FormLabelWithField,
  TextField,
} from "@/components/FormElements/Input/Input";
import { MainContentTitle } from "@/components/MainContentTitle/MainContentTitle";
import { NarrowPageContainer } from "@/components/PageContainer/PageContainer";

export default function SignUpPage() {
  const signUp = async () => {
    // call signUpMutation
  };

  return (
    <NarrowPageContainer>
      <MainContentTitle>Inscription</MainContentTitle>
      <Form
        onSubmit={(event) => {
          event.preventDefault();
          signUp();
        }}
      >
        <FormLabelWithField>
          Prénom
          <TextField
            type="text"
            name="first-name"
            autoComplete="first-name"
            required
          />
        </FormLabelWithField>
        <FormLabelWithField>
          Nom
          <TextField
            type="text"
            name="family-name"
            autoComplete="family-name"
            required
          />
        </FormLabelWithField>
        <FormLabelWithField>
          Adresse email
          <TextField type="email" name="email" autoComplete="email" required />
        </FormLabelWithField>
        <FormLabelWithField>
          Mot de passe
          <TextField
            type="password"
            name="new-password"
            autoComplete="new-password"
            required
          />
        </FormLabelWithField>
        <FormLabelWithField>
          Confirmation du mot de passe
          <TextField
            type="password"
            name="new-password"
            autoComplete="new-password"
            required
          />
        </FormLabelWithField>
        <PrimaryButton>M'inscrire</PrimaryButton>
        {/* {error && error.message} */}
      </Form>
    </NarrowPageContainer>
  );
}
