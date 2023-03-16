import { FormEvent } from "react";
type FormLoginProps = {
  onSubmitLogin: (event: FormEvent<HTMLFormElement>) => void;
}
const FormLogin = ({onSubmitLogin}: FormLoginProps) => {
    return (
      <form
        onSubmit={(e) => onSubmitLogin(e) } action="">
        <label htmlFor="login">Login</label>
        <input  type="text" id="login" />
        <label htmlFor="pwd">Mot de passe</label>
        <input  type="password" id="pwd"/>
        <input type="submit" value="Se connecter" />
      </form>
    );
  }
  
  export default FormLogin;