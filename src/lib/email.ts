import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendAnecdoteNotification(
  to: string, 
  anecdote: { title: string, content: string, author: string }
) {
  try {
    const { data } = await resend.emails.send({
      from: 'Anecdotes App <onboarding@resend.dev>',
      to: [to],
      subject: `Nouvelle anecdote: ${anecdote.title}`,
      html: `
        <h2>Nouvelle anecdote partagée !</h2>
        <h3>${anecdote.title}</h3>
        <p>${anecdote.content}</p>
        <p><em>Par : ${anecdote.author}</em></p>
      `,
    });

    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
}

export { resend };