import {createFileRoute} from '@tanstack/react-router';
import {Dashboard} from '@/components/academic/dashboard';
import {academicQuery,workspaceQuery} from '@/lib/academic/queries';
import {head} from '@/lib/academic/rules';
export const Route=createFileRoute('/_authenticated/dashboard')({head:()=>head('Meu dashboard','Seus prazos, aulas e comunicados no RENOVA CLASS.'),loader:async({context})=>{await Promise.all([context.queryClient.ensureQueryData(academicQuery),context.queryClient.ensureQueryData(workspaceQuery)]);},component:Dashboard});
