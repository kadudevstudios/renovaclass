INSERT INTO public.teachers(name) SELECT 'Clemilson' WHERE NOT EXISTS (SELECT 1 FROM public.teachers WHERE name='Clemilson');
UPDATE public.subjects SET teacher_id=(SELECT id FROM public.teachers WHERE name='Clemilson' LIMIT 1) WHERE id='ab79aa44-7722-4954-947a-24ad1cb38928';
UPDATE public.subjects SET teacher_id=(SELECT id FROM public.teachers WHERE name='Fernanda' LIMIT 1) WHERE id='121e8996-0f7d-4a88-a6cd-82ca3d1a3dee';
CREATE OR REPLACE FUNCTION public.on_signup() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $f$ BEGIN
INSERT INTO public.profiles(id,full_name) VALUES(NEW.id,COALESCE(NEW.raw_user_meta_data->>'full_name',NEW.raw_user_meta_data->>'name',''));
INSERT INTO public.user_roles(user_id,role) VALUES(NEW.id, CASE WHEN lower(NEW.email)='karllos.oliveira@aluno.edu.pi.gov.br' THEN 'admin'::app_role ELSE 'student'::app_role END);
INSERT INTO public.class_members(class_id,user_id) SELECT id,NEW.id FROM public.classes; RETURN NEW; END $f$;
UPDATE public.user_roles SET role='admin' WHERE user_id IN (SELECT id FROM auth.users WHERE lower(email)='karllos.oliveira@aluno.edu.pi.gov.br');