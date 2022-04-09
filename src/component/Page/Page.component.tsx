import CssBaseline from '@mui/material/CssBaseline';
import {
  PageContainer, PageHeader, PageContent, HomeLink,
} from './Page.styles';

interface PageProps {
    children: React.ReactNode;
}

function Page({ children }: PageProps) {
  return (
    <PageContainer>
      <CssBaseline />
      <PageHeader>
        <HomeLink to="/">
          Crypto currency Dashboard
        </HomeLink>
      </PageHeader>
      <PageContent>
        {children}
      </PageContent>
    </PageContainer>
  );
}

export default Page;
