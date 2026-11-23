import {createFileRoute} from '@tanstack/react-router';
import {AuthPage} from '@/components/academic/auth-page';
import {head} from '@/lib/academic/rules';
export const Route=createFileRoute('/reset-password')({head:()=>head('Redefinir senha','Redefinir senha da sua conta RENOVA CLASS.'),component:()=> <AuthPage initial="reset"/>});
