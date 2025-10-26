import { UserProfile } from "@/components/profile/user-profile"
import { MainLayout } from "@/components/layout/main-layout"

interface ProfilePageProps {
  params: {
    username: string
  }
}

export default function ProfilePage({ params }: ProfilePageProps) {
  return (
    <MainLayout>
      <div className="flex-1 flex">
        <main className="flex-1 flex flex-col">
          <UserProfile username={params.username} />
        </main>
      </div>
    </MainLayout>
  )
}
