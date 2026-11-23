import {createFileRoute} from '@tanstack/react-router';
import {Admin} from '@/components/academic/admin';
import {academicQuery,workspaceQuery} from '@/lib/academic/queries';
import {head} from '@/lib/academic/rules';
export const Route=createFileRoute('/_authenticated/admin_/disciplinas')({head:()=>head('Gerenciar disciplinas','Gerenciar disciplinas da turma no RENOVA CLASS.'),loader:async({context})=>{await Promise.all([context.queryClient.ensureQueryData(academicQuery),context.queryClient.ensureQueryData(workspaceQuery)]);},component:()=> <Admin view="subjects"/>});
