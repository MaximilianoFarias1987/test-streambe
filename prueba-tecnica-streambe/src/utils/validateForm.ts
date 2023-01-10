import * as yup from 'yup';

export const LoginValidate = yup.object().shape({
    username: yup.string().trim().required('El campo username no puede estar vacío.').email('Debe ingresar un email correcto, formato (ejamplo@test.com)'),
    password: yup.string().trim().required('El campo password no puede estar vacío.').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/, 'Password: minimo 8 caracteres, maximo 15, al menos 1 caracter especial, al menos 1 Mayúscula,al menos 1 minuscula, al menos 1 digito, no espacios en blanco')
})