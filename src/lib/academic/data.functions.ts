import { createServerFn } from '@tanstack/react-start';
import { createClient } from '@supabase/supabase-js';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import type { Database } from '@/integrations/supabase/types';

export const getAcademic = createServerFn({ method: 'GET' }).handler(async () => {
  const url = process.env['SUPABASE_URL'];
  const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
  if (!url || !key) throw new Error('Conexão indisponível. Tente novamente.');
  const client = createClient<Database>(url, key, { auth: { persistSession: false, autoRefreshToken: false }, global: { fetch: (input, init) => {
    const headers = new Headers(init?.headers);
    if (key.startsWith('sb_') && headers.get('Authorization') === `Bearer ${key}`) headers.delete('Authorization');
    headers.set('apikey', key);
    return fetch(input, { ...init, headers });
  } } });
  const [classes, subjects, teachers, schedules] = await Promise.all([
    client.from('classes').select('*').limit(1), client.from('subjects').select('*').order('name'),
    client.from('teachers').select('*').order('name'), client.from('class_schedules').select('*').order('start_time'),
  ]);
  for (const result of [classes, subjects, teachers, schedules]) if (result.error) throw new Error('Não foi possível carregar a grade oficial.');
  return { class: classes.data?.[0] ?? null, subjects: subjects.data ?? [], teachers: teachers.data ?? [], schedules: schedules.data ?? [] };
});

export const getWorkspace = createServerFn({ method: 'GET' }).middleware([requireSupabaseAuth]).handler(async ({ context }) => {
  const client = context.supabase;
  const [profile, role, assignments, submissions, events, notices, materials, notifications, suggestions, users, roles, logs] = await Promise.all([
    client.from('profiles').select('*').eq('id', context.userId).single(),
    client.from('user_roles').select('role').eq('user_id', context.userId).single(),
    client.from('assignments').select('*').order('due_at'),
    client.from('assignment_submissions').select('*').order('created_at', { ascending: false }),
    client.from('calendar_events').select('*').order('starts_at'),
    client.from('announcements').select('*').order('pinned', { ascending: false }).order('created_at', { ascending: false }),
    client.from('study_materials').select('*').order('created_at', { ascending: false }),
    client.from('notifications').select('*').order('created_at', { ascending: false }).limit(100),
    client.from('student_suggestions').select('*').order('created_at', { ascending: false }),
    client.from('profiles').select('*').order('full_name'),
    client.from('user_roles').select('*'), client.from('audit_logs').select('*').order('created_at', { ascending: false }).limit(100),
  ]);
  for (const result of [profile, role, assignments, submissions, events, notices, materials, notifications, suggestions, users, roles, logs]) if (result.error) throw new Error('Não foi possível carregar seus dados. Tente novamente.');
  return { userId: context.userId, profile: profile.data, role: role.data?.role ?? 'student', assignments: assignments.data ?? [], submissions: submissions.data ?? [], events: events.data ?? [], notices: notices.data ?? [], materials: materials.data ?? [], notifications: notifications.data ?? [], suggestions: suggestions.data ?? [], users: users.data ?? [], roles: roles.data ?? [], logs: logs.data ?? [] };
});
