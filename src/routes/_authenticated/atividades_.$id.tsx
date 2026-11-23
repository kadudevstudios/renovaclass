import {createFileRoute} from '@tanstack/react-router';
import {AssignmentDetail} from '@/components/academic/assignment-detail';
import {academicQuery,workspaceQuery} from '@/lib/academic/queries';
import {head} from '@/lib/academic/rules';
export const Route=createFileRoute('/_authenticated/atividades_/$id')({head:()=>head('Detalhes da atividade','Instruções e entrega do seu trabalho no RENOVA CLASS.'),loader:async({context})=>{await Promise.all([context.queryClient.ensureQueryData(academicQuery),context.queryClient.ensureQueryData(workspaceQuery)]);},component:()=>{const {id}=Route.useParams();return <AssignmentDetail id={id}/>;}});
