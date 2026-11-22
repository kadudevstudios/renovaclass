import { createFileRoute } from '@tanstack/react-router';
import { academicQuery } from '@/lib/academic/queries';
import { head } from '@/lib/academic/rules';
import { Dashboard } from '@/components/academic/dashboard';
import campus from '@/assets/renewable-campus.asset.json';
export const Route = createFileRoute('/')({ head: () => ({ ...head('Início', 'Organização acadêmica inteligente para o 1º B de Energias Renováveis do CETI Jeanete Souza.'), meta:[...head('Início','Organização acadêmica inteligente para o 1º B de Energias Renováveis do CETI Jeanete Souza.').meta,{property:'og:image',content:campus.url},{name:'twitter:image',content:campus.url}] }), loader:({context})=>context.queryClient.ensureQueryData(academicQuery), component:Dashboard });
