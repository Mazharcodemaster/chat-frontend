import { SettingsPage } from "@/components/settings/settings-page"
import { MainLayout } from "@/components/layout/main-layout"

export default function Settings() {
  return (
    <MainLayout>
      <div className="flex-1 flex">
        <main className="flex-1 flex flex-col">
          <SettingsPage />
        </main>
      </div>
    </MainLayout>
  )
}
