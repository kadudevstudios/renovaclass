import {createFileRoute} from '@tanstack/react-router';
import {AuthPage} from '@/components/academic/auth-page';
import {head} from '@/lib/academic/rules';
export const Route=createFileRoute('/login')({head:()=>head('Login','Entre na sua conta RENOVA CLASS.'),component:AuthPage});
