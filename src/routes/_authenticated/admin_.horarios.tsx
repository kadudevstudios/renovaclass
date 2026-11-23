import {createFileRoute} from '@tanstack/react-router';
import {Admin} from '@/components/academic/admin';
import {academicQuery,workspaceQuery} from '@/lib/academic/queries';
import {head} from '@/lib/academic/rules';
export const Route=createFileRoute('/_authenticated/admin_/horarios')({head:()=>head('Gerenciar horários','Gerenciar horários da turma no RENOVA CLASS.'),loader:async({context})=>{await Promise.all([context.queryClient.ensureQueryData(academicQuery),context.queryClient.ensureQueryData(workspaceQuery)]);},component:()=> <Admin view="schedules"/>});
