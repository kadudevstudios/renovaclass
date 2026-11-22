import { queryOptions } from '@tanstack/react-query';
import { getAcademic, getWorkspace } from './data.functions';
export const academicQuery = queryOptions({ queryKey: ['academic'], queryFn: () => getAcademic(), staleTime: 300000 });
export const workspaceQuery = queryOptions({ queryKey: ['workspace'], queryFn: () => getWorkspace(), staleTime: 30000 });
export type Academic = Awaited<ReturnType<typeof getAcademic>>;
export type Workspace = Awaited<ReturnType<typeof getWorkspace>>;
