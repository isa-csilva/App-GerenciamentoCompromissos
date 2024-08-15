import './login.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Axios from 'axios';
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';

import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

const Login = () => {
    const navigate = useNavigate();

    const handeClickLogin = (values) => {
        Axios.post("http://localhost:3001/login", {
            email: values.email,
            password: values.password
        }).then((response) => {
            if(response.status != 200) {
                alert(response.data.msg);
            } else {
                navigate('/home')
            }
        })
    };

    const handeClickSignUp = (values) => {
        Axios.post("http://localhost:3001/signin", {
            email: values.email,
            password: values.password
        }).then((response) => {
            alert(response.data.msg)
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
            <p>Faça seu login para continuar.</p>
            <Formik initialValues={{}} onSubmit={handeClickLogin} validationSchema={validationLogin}> 
                <Form className='login-form'>
                    <div className='login-form-group'>
                        <FaUser size={20}/>
                        <Field
                            id='email' 
                            name='email' 
                            className='form-field'
                            placeholder='E-Mail'
                        />

                        <ErrorMessage
                            component='span'
                            name='email'
                            className='form-error'
                        />
                    </div>
                    <div className='login-form-group'>
                        <RiLockPasswordFill size={20}/>
                        <Field 
                            id='password'
                            name='password' 
                            type='password'
                            className='form-field'
                            placeholder='Senha' 
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
            <p>Cadastre-se para continuar.</p>
            <Formik initialValues={{}} onSubmit={handeClickSignUp} validationSchema={validationSignUp}> 
                <Form className='login-form'>
                    <div className='login-form-group'>
                        <FaUser size={20}/>
                        <Field
                            id='email' 
                            name='email' 
                            className='form-field'
                            placeholder='E-Mail'
                        />

                        <ErrorMessage
                            component='span'
                            name='email'
                            className='form-error'
                        />
                    </div>
                    <div className='login-form-group'>
                        <RiLockPasswordFill size={20}/>
                        <Field 
                            id='password'
                            name='password'
                            type='password' 
                            className='form-field'
                            placeholder='Senha' 
                        />
                        
                        <ErrorMessage
                            component='span'
                            name='password'
                            className='form-error'
                        />
                    </div>
                    <div className='login-form-group'>
                        <RiLockPasswordFill size={20}/>
                        <Field 
                            id='password'
                            name='confirmPassword' 
                            type='password'
                            className='form-field'
                            placeholder='Confirme sua senha' 
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