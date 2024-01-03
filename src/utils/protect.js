// ProtectedPage.js
import { authOptions } from '../[...nextauth]'
import { getServerSession } from "next-auth/next"

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}

function ProtectedPage({ session }) {
  // Your protected page content...
  return (
    <div>
      {/* Your protected content */}
    </div>
  )
}

export default ProtectedPage
