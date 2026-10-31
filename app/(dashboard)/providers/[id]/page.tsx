import { ProviderDetailView } from "@/components/dashboard/providers/ProviderDetailView";

interface ProviderPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function ProviderPage({ params }: ProviderPageProps) {
    const { id } = await params;
    return <ProviderDetailView providerId={id} />;
}
