import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink, useLocation } from 'react-router-dom';
import cn from 'classnames';
import s from './style.module.css';

const AppHeader = () => {
    const { pathname } = useLocation()
    return(
        <header className={cn("pl-10", "pr-10", "pt-10", "pb-10", "text", "text_type_main-default", s.header)}>
            <nav className={s.header__container}>
                <div className={s.nav__container}>
                    <NavLink exact to='/' className={cn(s.nav__element, 'pl-5', 'pr-5', 'pt-4', 'pb-4', 'mt-4', 'mb-4')} activeClassName={s.active}>
                        <BurgerIcon type={pathname === '/' ? "primary" : "secondary"} />
                        <p className={cn("text", "text_type_main-default", "ml-2")}>Конструктор</p>
                    </NavLink>
                    <NavLink to='/feed' className={cn(s.nav__element, 'pl-5', 'pr-5', 'pt-4', 'pb-4', 'mt-4', 'mb-4')} activeClassName={s.active}>
                        <ListIcon type={pathname === '/feed' ? "primary" : "secondary"} />
                        <p className={cn("text", "text_type_main-default", "ml-2")}>Лента заказов</p>
                    </NavLink>
                </div>
                <Logo />
                <NavLink to='/profile' className={cn(s.nav__element, 'pl-5', 'pr-5', 'pt-4', 'pb-4', 'mt-4', 'mb-4')} activeClassName={s.active}>
                    <ProfileIcon type={pathname === '/profile' ? "primary" : "secondary"} />
                    <p className={cn("text", "text_type_main-default", "ml-2")}>Личный кабинет</p>
                </NavLink>
            </nav>
        </header>
    )
}

export default AppHeader;
