import type { PostComment, TechPost } from '../types/feed'

const now = new Date('2026-04-26T12:00:00.000Z')

export const techPostsDb: TechPost[] = [
  {
    id: 1,
    title: 'AI Agents Are Becoming Team Members, Not Just Tools',
    summary:
      'Modern agent frameworks now coordinate planning, memory, and execution. Teams are designing workflows where agents draft code, test, and report outcomes in near real-time.',
    category: 'AI',
    author: 'Sara Kim',
    readMinutes: 6,
    publishedAt: new Date(now.getTime() - 1000 * 60 * 70).toISOString(),
    likeCount: 138,
  },
  {
    id: 2,
    title: 'Serverless GPU Bursts Are Changing ML Deployment Economics',
    summary:
      'Teams can now spin up inference-grade GPU nodes by the second. This reduces idle costs and enables event-driven ML pipelines for product features.',
    category: 'Cloud',
    author: 'Ibrahim Noor',
    readMinutes: 4,
    publishedAt: new Date(now.getTime() - 1000 * 60 * 130).toISOString(),
    likeCount: 94,
  },
  {
    id: 3,
    title: 'Passkeys + Device Trust Is Replacing Password-First Security',
    summary:
      'Security programs are moving toward phishing-resistant authentication with adaptive trust signals. Password resets and MFA fatigue attacks drop sharply.',
    category: 'Security',
    author: 'Monica Lane',
    readMinutes: 7,
    publishedAt: new Date(now.getTime() - 1000 * 60 * 190).toISOString(),
    likeCount: 112,
  },
  {
    id: 4,
    title: 'Partial Hydration Is Finally Mainstream in React Architectures',
    summary:
      'Hybrid rendering patterns let apps ship interactive islands faster. Teams are combining server components, streaming, and targeted hydration for better UX.',
    category: 'Frontend',
    author: 'Reza Ahmed',
    readMinutes: 5,
    publishedAt: new Date(now.getTime() - 1000 * 60 * 250).toISOString(),
    likeCount: 86,
  },
  {
    id: 5,
    title: 'Warehouse Robots Now Learn Layout Changes in Hours',
    summary:
      'Vision-language robotics stacks are reducing the hand-tuning needed for new facilities. The result is faster deployment and safer autonomous routing.',
    category: 'Robotics',
    author: 'Tina Voss',
    readMinutes: 8,
    publishedAt: new Date(now.getTime() - 1000 * 60 * 320).toISOString(),
    likeCount: 167,
  },
]

export const commentsDb: PostComment[] = [
  {
    id: 1,
    postId: 1,
    author: 'Alex',
    body: 'The jump from automation scripts to collaborative agents is very real now.',
    createdAt: new Date(now.getTime() - 1000 * 60 * 32).toISOString(),
  },
  {
    id: 2,
    postId: 1,
    author: 'Nora',
    body: 'Would love to see benchmarks for multi-agent review workflows.',
    createdAt: new Date(now.getTime() - 1000 * 60 * 20).toISOString(),
  },
  {
    id: 3,
    postId: 2,
    author: 'Dev',
    body: 'Burst GPU pricing helped us cut staging costs by almost half.',
    createdAt: new Date(now.getTime() - 1000 * 60 * 44).toISOString(),
  },
  {
    id: 4,
    postId: 3,
    author: 'Chen',
    body: 'Passkeys reduced our support tickets faster than expected.',
    createdAt: new Date(now.getTime() - 1000 * 60 * 18).toISOString(),
  },
  {
    id: 5,
    postId: 4,
    author: 'Mira',
    body: 'Selective hydration made mobile startup noticeably smoother.',
    createdAt: new Date(now.getTime() - 1000 * 60 * 14).toISOString(),
  },
  {
    id: 6,
    postId: 5,
    author: 'Rohan',
    body: 'Layout adaptation speed is the key metric for robotics rollouts.',
    createdAt: new Date(now.getTime() - 1000 * 60 * 9).toISOString(),
  },
]

export let nextCommentId = 7

export const bumpCommentId = () => {
  const id = nextCommentId
  nextCommentId += 1
  return id
}
