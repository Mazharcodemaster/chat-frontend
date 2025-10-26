"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { PostsFeed } from "@/components/posts/posts-feed";
import { selectUser } from "@/store/slice/userSlice";
import { useAppSelector } from "@/store/storeHooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { RootState } from "@/store/store";

export default function HomePage() {
  const router = useRouter();
  const userData = useAppSelector(selectUser);
  const isRehydrated = useAppSelector((state: RootState) => state._persist?.rehydrated);
  const persistedState :any= localStorage.getItem("persist:root");
  
  useEffect(() => {
    const parsedState = JSON.parse(persistedState);
    const data = JSON.parse(parsedState.userData);
    console.log('parsedState', data);
  }, [persistedState]);


  useEffect(() => {
    // Only run redirect after rehydration is complete
    if (isRehydrated && !userData) {

      router.push("/auth/login");
    }

  }, [userData, isRehydrated, router]);

  if (!isRehydrated) return <div>Loading...</div>; // optional loading UI

  return (
    <MainLayout>
      <div className="flex-1 flex">
        <main className="flex-1 flex flex-col">
          <PostsFeed />
        </main>
      </div>
    </MainLayout>
  );
}
