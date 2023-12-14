import { PrimaryButton } from "@/components/Button/PrimaryButton";
import { Form } from "@/components/FormElements/Form/Form";
import {
  FormLabelWithField,
  TextField,
} from "@/components/FormElements/Input/Input";
import { MainContentTitle } from "@/components/MainContentTitle/MainContentTitle";
import { NarrowPageContainer } from "@/components/PageContainer/PageContainer";

export default function SignInPage() {
  const signIn = async () => {
    // call signInMutation
  };

  return (
    <NarrowPageContainer>
      <MainContentTitle>Identification</MainContentTitle>
      <Form
        onSubmit={(event) => {
          event.preventDefault();
          signIn();
        }}
      >
        <FormLabelWithField>
          Adresse email
          <TextField type="email" name="email" autoComplete="email" required />
        </FormLabelWithField>
        <FormLabelWithField>
          Mot de passe
          <TextField
            type="password"
            name="new-password"
            autoComplete="current-password"
            required
          />
        </FormLabelWithField>
        <PrimaryButton>M'identifier</PrimaryButton>
        {/* {error && error.message} */}
      </Form>
    </NarrowPageContainer>
  );
}
