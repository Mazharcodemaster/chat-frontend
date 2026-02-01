import { UserProfile } from "@/components/profile/user-profile"
import { MainLayout } from "@/components/layout/main-layout"

interface ProfilePageProps {
  params: {
    userId: string
  }
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const { userId } = params
  return (
    <MainLayout>
      <div className="flex-1 flex">
        <main className="flex-1 flex flex-col">
          <UserProfile userId={userId} />
        </main>
      </div>
    </MainLayout>
  )
}
