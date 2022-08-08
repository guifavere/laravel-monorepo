import Link from 'next/link'
import { useAuth } from '@hooks/auth'

export default function Home() {
  const { user } = useAuth({ middleware: 'guest' })

  return (
    <div>
      {user ?
        <Link href="/dashboard">
          Dashboard
        </Link>
        :
          <>
            <Link href="/login">
              Login
            </Link>
            <Link href="/register">
              Register
            </Link>
          </>
      }
    </div>
  )
}
