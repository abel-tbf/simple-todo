import React, {useContext, useState} from 'react';
import styled, {ThemeContext, DefaultTheme} from 'styled-components';
import LightTheme from '../../themes/light';
import Toggle from './Toggle';
import {Link as ReactRouterDomLink, useLocation} from 'react-router-dom';

const HeaderWrapper = styled.header`
  height: 60px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  padding: 0 16px;
  position: fixed;
  top: 0;
  background: linear-gradient(to right, ${p => p.theme.primaryColor}, ${p => p.theme.secondaryColor});
  border-bottom: 3px solid ${p => p.theme.secondaryColor};
`;

const Menu: any = styled.nav`
  display: ${(p: any) => p.open ? 'block' : 'none'};
  font-family: 'Open Sans';
  position: absolute;
  width: 100%;
  top: 60px;
  left: 0;
  padding: 8px;
  box-sizing: border_box;
  border-bottom: 3px solid ${p => p.theme.secondaryColor};
  background: ${(p: any) => p.theme.bodyBackgroundColor};

  @media(min-width: 768px) {
    display: flex;
    position: relative;
    width: initial;
    border-bottom: none;
    margin: auto 0 auto auto;
    background: none;
    left: initial;
    top: initial;
  }
`;

const Link: any = ({isActive, children, ...props}: any) => {
  return (
    <ReactRouterDomLink {...props}>
      {children}
    </ReactRouterDomLink>
     
  );
};

const StyledLink = styled(Link)`
  padding: 4px 8px;
  display: block;
  text-align: center;
  box-sizing: border-box;
  margin: auto 0;
  font-weight: ${(p: any) => p.isActive ? 'bold': 'normal'};
  color: ${(p: any) => p.theme.bodyFontColor};
`;

const MobileMenuIcon = styled.div`
  margin: auto 0 auto auto;
  width: 25px;
  min-width: 25px;
  padding: 5px;

  >div{
    height: 3px;
    background: ${(p: any) => p.theme.bodyBackgroundColor};
    margin: 5px 0;
    width: 100%;
  }
  
  @media(min-width: 768px) {
    display: none;
  }
`;

export default function Header() {
  const {pathname} = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const {id, setTheme} = useContext(ThemeContext)!; // exclamation always defined

  return(
    <HeaderWrapper>
      <MobileMenuIcon onClick={() => setMenuOpen(s => !s)}>
        <div />
        <div />
        <div />
      </MobileMenuIcon>
      <Menu open={menuOpen}>
        <StyledLink to="/" isActive={pathname === '/'}>
          Home
        </StyledLink>
        <Toggle isActive={id === 'dark'} onToggle={setTheme} />)
      </Menu>
    </HeaderWrapper>
  );
}
