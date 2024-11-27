"use client"

import { FormEvent, useEffect, useState } from 'react';
import { useRef } from 'react';
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { createClient } from "@/utils/supabase/client";
import ChatMessage from './chat-message';
import { Database } from '@/database.types';

export default function Chat() {
  const supabase = createClient();

  const [currentMessage, setCurrentMessage] = useState('')
  const [messages, setMessages] = useState<Database['public']['Tables']['messages']['Row'][]>([])
  const scrollContainerRef = useRef<null | HTMLDivElement>(null);

  const fetchMessages = async () => {
    const { data } = await supabase.from('messages').select()

    if (!data) return;

    setMessages(data)
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  useEffect(() => {
    scrollContainerRef.current?.scrollIntoView(false)
  },[messages])

  supabase
    .channel('messages')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, fetchMessages)
    .subscribe()


  const submitMessage = async (e: FormEvent) => {
    e.preventDefault()

    const { data } = await supabase.auth.getUser();

    const { data: user } = await supabase.from('users')
      .select()
      .eq('id', data.user?.id)
      .maybeSingle()

    await supabase.from('messages')
      .insert({ content: currentMessage, user_id: user.id, user_name: user.name })
  }

  return (
    <Card className='w-[800px] p-3'>
      <ScrollArea className='p-3 h-[280px]'>
        <div className='flex flex-1 flex-col h-full' ref={scrollContainerRef}>
          {messages.map((message) => (
            <ChatMessage key={message.id} text={message.content ?? ''} userName={message.user_name ?? ''} createdAt={message.created_at} />
          ))}
        </div>
      </ScrollArea>

      <form className='flex gap-3 mt-3' onSubmit={submitMessage}>
        <Input onChange={(e) => setCurrentMessage(e.target.value)} />
        <Button type='submit'>Send</Button>
      </form>
    </Card>
  );
}
