import {createFileRoute} from '@tanstack/react-router';
import {ContentPage} from '@/components/academic/content-pages';
import {academicQuery,workspaceQuery} from '@/lib/academic/queries';
import {head} from '@/lib/academic/rules';
export const Route=createFileRoute('/_authenticated/avisos')({head:()=>head('Avisos','Avisos da turma 1º B no RENOVA CLASS.'),loader:async({context})=>{await Promise.all([context.queryClient.ensureQueryData(academicQuery),context.queryClient.ensureQueryData(workspaceQuery)]);},component:()=> <ContentPage kind="announcements"/>});
