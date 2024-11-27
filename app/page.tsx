import Chat from '@/components/chat';
import UserSwitch from '@/components/user-switch';
import { createClient } from '@/utils/supabase/server';

export default async function Index() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="flex-1 flex flex-col gap-6 px-4">
      <UserSwitch />
      {user && <Chat />}
    </main>
  );
}
