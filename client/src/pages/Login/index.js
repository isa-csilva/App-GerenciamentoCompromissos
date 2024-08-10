import './login.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Axios from 'axios';
import * as yup from "yup";


const Login = () => {

    const handeClickLogin = (values) => {
        Axios.post("http://localhost:3001/login", {
            email: values.email,
            password: values.password
        }).then((response) => {
            if(response) {
                console.log(response)
            };
        })
    };

    const handeClickSignUp = (values) => {
        Axios.post("http://localhost:3001/signin", {
            email: values.email,
            password: values.password
        }).then((response) => {
            console.log(response);
        });
    };

    const validationLogin = yup.object().shape({
        email: yup.string().email("Não é um e-mail válido.").required("Este campo é obrigatório."),
        password: yup.string().min(8, "A senha deve conter pelo menos 8 caracteres.").required("Este campo é obrigatório.")
    }); 

    const validationSignUp = yup.object().shape({
        email:  yup.string().email("Não é um e-mail válido.").required("Este campo é obrigatório."),
        password: yup.string().min(8, "A senha deve conter pelo menos 8 caracteres.").required("Este campo é obrigatório."),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], "As senhas não são iguais!")
    });

    return (
        <div className='container'>
            <h1>Login</h1>
            <Formik initialValues={{}} onSubmit={handeClickLogin} validationSchema={validationLogin}> 
                <Form className='login-form'>
                    <div className='login-form-group'>
                        <label>E-Mail</label>
                        <Field
                            id='email' 
                            name='email' 
                            className='form-field'
                        />

                        <ErrorMessage
                            component='span'
                            name='email'
                            className='form-error'
                        />
                    </div>
                    <div className='login-form-group'>
                    <label>Senha</label>
                        <Field 
                            id='password'
                            name='password' 
                            className='form-field' 
                        />

                        <ErrorMessage
                            component='span'
                            name='password'
                            className='form-error'
                        />
                    </div>
                    <button type='submit' className='form-button'>Entrar</button>
                </Form>
            </Formik>

            
            <h1>Cadastro</h1>
            <Formik initialValues={{}} onSubmit={handeClickSignUp} validationSchema={validationSignUp}> 
                <Form className='login-form'>
                    <div className='login-form-group'>
                        <label>E-Mail</label>
                        <Field 
                            id='email' 
                            name='email' 
                            className='form-field' 
                        />

                        <ErrorMessage
                            component='span'
                            name='email'
                            className='form-error'
                        />
                    </div>
                    <div className='login-form-group'>
                        <label>Senha</label>
                        <Field 
                            id='password'
                            name='password' 
                            className='form-field' 
                        />

                        <ErrorMessage
                            component='span'
                            name='password'
                            className='form-error'
                        />
                    </div>
                    <div className='login-form-group'>
                        <label>Confirme sua senha</label>
                        <Field 
                            id='confirmPassord'
                            name='confirmPassword' 
                            className='form-field' 
                        />

                        <ErrorMessage
                            component='span'
                            name='confirmPassword'
                            className='form-error'
                        />
                    </div>
                    <button type='submit' className='form-button'>Criar uma conta</button>
                </Form>
            </Formik>


        </div>
    )
};

export default Login;