import { supabase } from '@/lib/supabase';
import { redirect } from 'react-router-dom';

export async function requireUser() {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/login');
    return null;
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profile) {
    redirect('/profile');
    return null;
  }

  return { user, profile };
}