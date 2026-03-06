import { useTina } from 'tinacms/dist/react';
import { useMarkdown } from '@tinacms/contexts';

export interface TinaEditProps {
  query: string;
  variables: any;
  data: any;
  children: (data: any) => React.ReactNode;
}

export default function TinaEdit({ query, variables, data, children }: TinaEditProps) {
  const { data: tinaData } = useTina({
    query,
    variables,
    data,
  });

  return <>{children(tinaData)}</>;
}
