import { createFileRoute } from '@tanstack/react-router';
import { AuthPage } from '@/components/academic/auth-page';
import { head } from '@/lib/academic/rules';
import { academicQuery } from '@/lib/academic/queries';
export const Route=createFileRoute('/auth')({head:()=>head('Entrar','Acesse sua conta acadêmica no RENOVA CLASS.'),component:AuthPage});
