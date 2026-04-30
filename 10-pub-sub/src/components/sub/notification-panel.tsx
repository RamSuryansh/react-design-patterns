import { useCallback, useEffect, useState } from 'react'
import { useEvent } from '../../hooks/use-event'
import type { Notification, NotificationCategory } from '../../types/events'

const STORAGE_KEY = 'pub-sub-notifications'

const notificationStyles: Record<
  NotificationCategory,
  { border: string; label: string; pill: string }
> = {
  success: {
    border: 'border-l-emerald-500',
    label: 'text-emerald-700',
    pill: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  },
  error: {
    border: 'border-l-rose-500',
    label: 'text-rose-700',
    pill: 'bg-rose-50 text-rose-700 ring-rose-200',
  },
  warning: {
    border: 'border-l-amber-500',
    label: 'text-amber-800',
    pill: 'bg-amber-50 text-amber-800 ring-amber-200',
  },
  info: {
    border: 'border-l-sky-500',
    label: 'text-sky-700',
    pill: 'bg-sky-50 text-sky-700 ring-sky-200',
  },
}

function isNotification(value: unknown): value is Notification {
  if (!value || typeof value !== 'object') {
    return false
  }

  const notification = value as Notification

  return (
    typeof notification.id === 'string' &&
    typeof notification.title === 'string' &&
    typeof notification.message === 'string' &&
    ['success', 'error', 'warning', 'info'].includes(notification.category) &&
    typeof notification.createdAt === 'number' &&
    typeof notification.autoHideMs === 'number'
  )
}

function isActiveNotification(notification: Notification) {
  return Date.now() - notification.createdAt < notification.autoHideMs
}

function getStoredNotifications() {
  try {
    const storedValue = localStorage.getItem(STORAGE_KEY)

    if (!storedValue) {
      return []
    }

    const parsedValue = JSON.parse(storedValue)

    if (!Array.isArray(parsedValue)) {
      return []
    }

    return parsedValue.filter(isNotification).filter(isActiveNotification)
  } catch {
    return []
  }
}

function saveNotifications(notifications: Notification[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications))
  } catch {
    localStorage.removeItem(STORAGE_KEY)
  }
}

export default function NotificationPanel() {
  const [notifications, setNotifications] = useState<Notification[]>(
    getStoredNotifications,
  )

  const dismissNotification = useCallback((id: string) => {
    setNotifications((currentNotifications) =>
      currentNotifications.filter((notification) => notification.id !== id),
    )
  }, [])

  const handleNotification = useCallback((notification: Notification) => {
    setNotifications((currentNotifications) => [
      notification,
      ...currentNotifications,
    ])
  }, [])

  useEvent('notification:add', handleNotification)

  useEffect(() => {
    saveNotifications(notifications)
  }, [notifications])

  useEffect(() => {
    const timers = notifications.map((notification) => {
      const elapsedMs = Date.now() - notification.createdAt
      const remainingMs = Math.max(notification.autoHideMs - elapsedMs, 0)

      return window.setTimeout(() => {
        dismissNotification(notification.id)
      }, remainingMs)
    })

    return () => {
      timers.forEach(window.clearTimeout)
    }
  }, [dismissNotification, notifications])

  return (
    <section className='rounded-lg border border-slate-200 bg-white p-5 shadow-sm'>
      <div className='mb-5 flex items-start justify-between gap-4'>
        <div>
          <p className='text-sm font-semibold uppercase tracking-wide text-slate-500'>
            Subscriber
          </p>
          <h2 className='text-2xl font-semibold text-slate-950'>
            Notification panel
          </h2>
        </div>
        <span className='rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700'>
          {notifications.length}
        </span>
      </div>

      <div className='space-y-3'>
        {notifications.length === 0 ? (
          <div className='rounded-md border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500'>
            No notifications yet.
          </div>
        ) : (
          notifications.map((notification) => {
            const styles = notificationStyles[notification.category]

            return (
              <article
                className={`rounded-md border border-l-4 border-slate-200 bg-white p-4 shadow-sm ${styles.border}`}
                key={notification.id}
              >
                <div className='flex items-start justify-between gap-4'>
                  <div>
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ring-1 ${styles.pill}`}
                    >
                      {notification.category}
                    </span>
                    <h3 className={`mt-3 font-semibold ${styles.label}`}>
                      {notification.title}
                    </h3>
                    <p className='mt-1 text-sm leading-6 text-slate-600'>
                      {notification.message}
                    </p>
                  </div>
                  <button
                    aria-label={`Dismiss ${notification.title}`}
                    className='rounded-md px-2 py-1 text-lg leading-none text-slate-400 transition hover:bg-slate-100 hover:text-slate-700'
                    onClick={() => dismissNotification(notification.id)}
                    type='button'
                  >
                    x
                  </button>
                </div>
              </article>
            )
          })
        )}
      </div>
    </section>
  )
}
