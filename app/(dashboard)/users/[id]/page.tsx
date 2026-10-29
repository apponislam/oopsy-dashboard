import { UserDetailView } from "@/components/dashboard/Users/UserDetailView";

interface UserPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function UserPage({ params }: UserPageProps) {
    const { id } = await params;
    return <UserDetailView userId={id} />;
}
