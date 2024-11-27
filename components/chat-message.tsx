import dayjs from 'dayjs';

type Props = {
  text: string
  userName: string
  createdAt: string
}

export default function ChatMessage({ text, userName, createdAt }: Props) {
  return (
    <div className='flex items-center gap-2 m-1'>
      <span className='font-bold w-20 shrink-0 self-start'>{userName}:</span>
      <span className='text-stone-200 break-all'>{text}</span>
      <span className='text-sm ml-auto text-stone-400 w-20 shrink-0 self-start'> {dayjs(createdAt).format('h:mm A')}</span>
    </div>
  );
}
