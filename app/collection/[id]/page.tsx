import CollectionDetail from "@/app/components/CollectionDetail";

interface CollectionPageProps {
  params: {
    id: string;
  };
}

export default function CollectionPage({ params }: CollectionPageProps) {
  return <CollectionDetail collectionId={Number.parseInt(params.id)} />;
}
