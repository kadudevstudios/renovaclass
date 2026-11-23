import { useSuspenseQuery } from '@tanstack/react-query';
import { workspaceQuery, academicQuery } from '@/lib/academic/queries';
export function useWorkspace() { const {data: workspace}=useSuspenseQuery(workspaceQuery);const {data: academic}=useSuspenseQuery(academicQuery);return {workspace,academic}; }
