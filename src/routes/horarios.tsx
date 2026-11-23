import { createFileRoute } from '@tanstack/react-router';
import { Schedules } from '@/components/academic/schedules';
import { head } from '@/lib/academic/rules';
import { academicQuery } from '@/lib/academic/queries';
export const Route=createFileRoute('/horarios')({head:()=>head('Horários','Grade semanal oficial do 1º B de Energias Renováveis.'),loader:({context})=>context.queryClient.ensureQueryData(academicQuery),component:Schedules});
