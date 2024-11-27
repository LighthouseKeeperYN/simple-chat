import { signInAction } from '@/app/actions';
import { Button } from "@/components/ui/button"

export default async function UserSwitch() {
  return (
    <div className="flex gap-6 px-4 justify-center">
      <form>
        <input className='hidden' name="email" defaultValue={process.env.USER_JOHNDOE_EMAIL} />
        <input className='hidden' name="password" defaultValue={process.env.USER_JOHNDOE_PASSWORD} />

        <Button
          className='bg-blue-300'
          formAction={signInAction}
        >
          Impersonate John Doe
        </Button>
      </form>

      <form>
        <input className='hidden' name="email" defaultValue={process.env.USER_MARYSUE_EMAIL} />
        <input className='hidden' name="password" defaultValue={process.env.USER_MARYSUE_PASSWORD} />

        <Button
          className='bg-red-300'
          formAction={signInAction}
        >
          Impersonate Mary Sue
        </Button>
      </form>
    </div>
  );
}
