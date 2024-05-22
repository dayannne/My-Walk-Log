import ClientOnly from './_component/common/ClientOnly';
import Container from './_component/common/Container';
import SearchLayout from './_component/common/SearchLayout';
import SearchForm from './_component/search/SearchForm';

export default function Home() {
  const isEmpty = false;

  if (isEmpty) {
  }
  return (
    <ClientOnly>
      <Container>
        ㅇㅇ
        <SearchForm />
      </Container>
    </ClientOnly>
  );
}
