import { createFileRoute } from '@tanstack/react-router';
import { ClassPage } from '@/components/academic/class-page';
import { head } from '@/lib/academic/rules';
import { academicQuery } from '@/lib/academic/queries';
export const Route=createFileRoute('/turma')({head:()=>head('Nossa Turma','Professores, disciplinas e representação do 1º B no CETI Jeanete Souza.'),loader:({context})=>context.queryClient.ensureQueryData(academicQuery),component:ClassPage});
