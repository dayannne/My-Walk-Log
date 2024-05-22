'use client';

import { ReactNode, useEffect, useState } from 'react';

interface ClientOnlyProps {
  children: ReactNode;
}

/* 컴포넌트가 마운트되었는지 여부를 추적 */
const ClientOnly = ({ children }: ClientOnlyProps) => {
  const [hasMounted, setHasMounted] = useState(false);

  // 컴포넌트가 마운트되면
  // (즉, 클라이언트 사이드에서 렌더링이 시작되면) true로 설정
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // 마운트되지 않았다면,아무것도 렌더링하지 않고 null을 반환
  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
};

export default ClientOnly;
