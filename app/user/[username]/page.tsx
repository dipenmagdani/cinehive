import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  return (
    <div className="flex min-h-screen flex-col bg-cine-background">
      <Navbar />
      <main className="flex-1 container px-4 py-10 md:px-6">
        <h1 className="text-2xl md:text-3xl font-bold text-cine-text-primary">
          {username}
        </h1>
        <p className="text-cine-text-secondary">Member since 2024</p>
        <div className="mt-6 rounded-2xl bg-cine-surface p-6">
          <Tabs defaultValue="reviews">
            <TabsList className="rounded-full">
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
              <TabsTrigger value="followers">Followers</TabsTrigger>
              <TabsTrigger value="following">Following</TabsTrigger>
            </TabsList>
            <TabsContent value="reviews" className="text-cine-text-secondary">
              No reviews yet.
            </TabsContent>
            <TabsContent value="watchlist" className="text-cine-text-secondary">
              Empty watchlist.
            </TabsContent>
            <TabsContent value="followers" className="text-cine-text-secondary">
              No followers.
            </TabsContent>
            <TabsContent value="following" className="text-cine-text-secondary">
              Not following anyone.
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
