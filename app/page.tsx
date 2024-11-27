import Chat from '@/components/chat';
import UserSwitch from '@/components/user-switch';

export default async function Index() {
  return (
    <main className="flex-1 flex flex-col gap-6 px-4">
      <UserSwitch />
      <Chat />
    </main>
  );
}
