import { eventBus } from '../../libs/event-bus'
import type { Notification, NotificationCategory } from '../../types/events'

type NotificationTemplate = {
  category: NotificationCategory
  title: string
  message: string
}

const notificationTemplates: NotificationTemplate[] = [
  {
    category: 'success',
    title: 'Deployment complete',
    message: 'The production build finished and is ready for review.',
  },
  {
    category: 'error',
    title: 'Payment failed',
    message: 'The card processor rejected the latest billing attempt.',
  },
  {
    category: 'warning',
    title: 'Storage almost full',
    message: 'The workspace has used more than 80% of its storage quota.',
  },
  {
    category: 'info',
    title: 'New teammate joined',
    message: 'A collaborator was added to the dashboard project.',
  },
]

const categoryButtonClasses: Record<NotificationCategory, string> = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100',
  error: 'border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100',
  warning: 'border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100',
  info: 'border-sky-200 bg-sky-50 text-sky-700 hover:bg-sky-100',
}

function createNotification(template: NotificationTemplate): Notification {
  return {
    id: crypto.randomUUID(),
    title: template.title,
    message: template.message,
    category: template.category,
    createdAt: Date.now(),
    autoHideMs: 5000,
  }
}

export default function NotificationPublisher() {
  const handlePublish = (template: NotificationTemplate) => {
    eventBus.publish('notification:add', createNotification(template))
  }

  return (
    <section className='rounded-lg border border-slate-200 bg-white p-5 shadow-sm'>
      <div className='mb-5'>
        <p className='text-sm font-semibold uppercase tracking-wide text-slate-500'>
          Publisher
        </p>
        <h2 className='text-2xl font-semibold text-slate-950'>
          Emit notifications
        </h2>
      </div>

      <div className='grid gap-3 sm:grid-cols-2'>
        {notificationTemplates.map((template) => (
          <button
            className={`rounded-md border px-4 py-3 text-left transition ${categoryButtonClasses[template.category]}`}
            key={template.category}
            onClick={() => handlePublish(template)}
            type='button'
          >
            <span className='block text-sm font-semibold capitalize'>
              {template.category}
            </span>
            <span className='mt-1 block text-sm'>{template.title}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
