import {createFileRoute} from '@tanstack/react-router';
import {AuthPage} from '@/components/academic/auth-page';
import {head} from '@/lib/academic/rules';
export const Route=createFileRoute('/cadastro')({head:()=>head('Cadastro','Cadastro da sua conta RENOVA CLASS.'),component:()=> <AuthPage initial="signup"/>});
