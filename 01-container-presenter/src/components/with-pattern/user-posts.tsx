import type { ApiPost } from './types'

const UserPosts = ({ posts }: { posts: ApiPost[] }) => {
  return (
    <div className='mt-8 rounded-lg border border-slate-200 bg-white p-6 shadow-xs sm:p-8'>
      <h2 className='text-2xl font-semibold tracking-tight text-slate-900'>
        Recent Posts ({posts.length})
      </h2>

      {posts.length === 0 ? (
        <p className='mt-4 text-slate-600'>No posts yet.</p>
      ) : (
        <div className='mt-6 grid gap-4'>
          {posts.map((post) => (
            <div
              key={post.id}
              className='rounded-lg border border-slate-200 bg-slate-50 p-5'
            >
              <h3 className='text-lg font-semibold text-slate-900'>
                {post.title}
              </h3>
              <p className='mt-2 text-slate-700'>
                {post.body.length > 150
                  ? `${post.body.substring(0, 150)}...`
                  : post.body}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default UserPosts
