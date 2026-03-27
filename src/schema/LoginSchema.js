 import * as Yup from 'yup';


export const SignupSchema = Yup.object().shape({
  username: Yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Required'),
   email: Yup.string().email('Invalid email').required('Required'),
   password: Yup.string()
   .min(8, 'Password must be at least 8 characters long')
   .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
   .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
   .matches(/[0-9]/, 'Password must contain at least one number')
   .matches(/[^a-zA-Z0-9]/, 'Password must contain at least one special character')
   .required('Required'),
   
 });