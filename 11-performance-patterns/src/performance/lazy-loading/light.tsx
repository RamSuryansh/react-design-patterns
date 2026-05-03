export default function Light() {
  console.log('[Light] rendered')
  return (
    <div className='p-5 border rounded'>
      <h2 className='font-mono'>Light Component</h2>
      <p>This component is small and always included in the initial bundle.</p>
    </div>
  )
}
