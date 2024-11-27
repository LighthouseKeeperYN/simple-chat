import { signInAction } from '@/app/actions';
import { Button } from "@/components/ui/button"
import { createClient } from '@/utils/supabase/server';

export default async function UserSwitch() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex gap-6 px-4">
      <form>
        <input className='hidden' name="email" defaultValue={process.env.USER_JOHNDOE_EMAIL} />
        <input className='hidden' name="password" defaultValue={process.env.USER_JOHNDOE_PASSWORD} />

        <Button
          className={`bg-blue-800 text-white ${user?.email !== process.env.USER_JOHNDOE_EMAIL && 'opacity-60'}`}
          formAction={signInAction}
        >
          Impersonate John Doe
        </Button>
      </form>

      <form>
        <input className='hidden' name="email" defaultValue={process.env.USER_MARYSUE_EMAIL} />
        <input className='hidden' name="password" defaultValue={process.env.USER_MARYSUE_PASSWORD} />

        <Button
          className={`bg-red-800 text-white ${user?.email !== process.env.USER_MARYSUE_EMAIL && 'opacity-60'}`}
          formAction={signInAction}
        >
          Impersonate Mary Sue
        </Button>
      </form>
    </div>
  );
}
