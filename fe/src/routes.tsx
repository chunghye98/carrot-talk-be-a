import { css } from '@emotion/react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { PATH } from './constants/path';
import { useAuth } from './hooks/useAuth';
import { Layout } from './layout/Layout';
import { Account } from './pages/Account';
import { Chat } from './pages/Chat';
import { Home } from './pages/Home';
import { Interests } from './pages/Interests';
import { NewProduct } from './pages/NewProduct';
import { NotFound } from './pages/NotFound';
import { OauthLoading } from './pages/OauthLoading';
import { ProductDetail } from './pages/ProductDetail';
import { Sales } from './pages/Sales';
import { Signup } from './pages/Signup';
import { useTokenRefresh } from './queries/auth';

export const AppRoutes: React.FC = () => {
  useTokenRefresh();

  return (
    <div css={globalStyle} id="app-layout">
      <Routes>
        {/* TODO: 하단바 X - 카테고리 페이지 */}
        {/* TODO: 하단바 X - 회원가입 페이지(리다이렉트) */}
        {/* TODO: 하단바 O - 등록페이지 / 인증 필요 */}
        {/* TODO: 하단바 O - 상세페이지 / 인증 필요*/}
        {/* TODO: 하단바 O - 채팅페이지 / 인증 필요 */}
        <Route element={<OnlyLoginUserRoute />}>
          <Route element={<Layout />}>
            <Route path={PATH.sales} element={<Sales />} />
            <Route path={PATH.interests} element={<Interests />} />
            <Route path={PATH.chat} element={<Chat />} />
          </Route>
        </Route>

        <Route element={<Layout />}>
          <Route path={PATH.home} element={<Home />} />
          <Route path={PATH.account} element={<Account />} />
          <Route path={PATH.notFound} element={<NotFound />} />
        </Route>

        <Route path={PATH.newProduct} element={<NewProduct />} />

        <Route element={<OnlyNotLoginUserRoute />}>
          <Route path={PATH.redirect} element={<OauthLoading />} />
          <Route path={PATH.signup} element={<Signup />} />
        </Route>
        <Route path={`${PATH.detail}/:id`} element={<ProductDetail />} />
      </Routes>
    </div>
  );
};

const OnlyLoginUserRoute: React.FC = () => {
  const { isLogin } = useAuth();
  return isLogin ? <Outlet /> : <Navigate to={PATH.account} />;
};

const OnlyNotLoginUserRoute: React.FC = () => {
  const { isLogin } = useAuth();
  return isLogin ? <Navigate to={PATH.home} /> : <Outlet />;
};

const globalStyle = css`
  display: flex;
  flex-direction: column;
  width: 393px;
  height: 100vh;
  margin: auto;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;
