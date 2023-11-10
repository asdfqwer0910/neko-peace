import { NextPage } from "next";
import SingUp from "../components/SignUp"
import { useRouter } from "next/router";
import { useFormState } from "react-dom";

interface SignUpForm {
  email: string;
  password: string;
}

const page: NextPage = () => {
  const router = useRouter();
  const { onSubmit } = SingUp();
  const { register, handleSubmit } = useForm<SignUpForm>({
    defaultValues: {
      email: '',
      password: '',
    },     
  });

  return ( 
    <SingUp />
  )
}

export default page