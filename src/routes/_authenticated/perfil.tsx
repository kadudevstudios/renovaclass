import {createFileRoute} from '@tanstack/react-router';
import {Profile} from '@/components/academic/profile';
import {academicQuery,workspaceQuery} from '@/lib/academic/queries';
import {head} from '@/lib/academic/rules';
export const Route=createFileRoute('/_authenticated/perfil')({head:()=>head('Meu Perfil','Gerencie seu perfil e a segurança da sua conta RENOVA CLASS.'),loader:async({context})=>{await Promise.all([context.queryClient.ensureQueryData(academicQuery),context.queryClient.ensureQueryData(workspaceQuery)]);},component:Profile});
